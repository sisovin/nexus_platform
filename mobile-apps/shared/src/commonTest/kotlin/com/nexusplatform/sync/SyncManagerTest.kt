package com.nexusplatform.sync

import com.nexusplatform.database.LanguageCacheDatabase
import com.nexusplatform.database.TestDatabaseDriverFactory
import com.nexusplatform.model.CachedLanguage
import com.nexusplatform.model.LanguageDto
import com.nexusplatform.network.ApiClient
import io.mockative.*
import kotlinx.coroutines.test.runTest
import kotlin.test.*

class SyncManagerTest {

    @Mock
    private lateinit var mockApiClient: ApiClient

    private lateinit var database: LanguageCacheDatabase
    private lateinit var driverFactory: TestDatabaseDriverFactory
    private lateinit var syncManager: SyncManager

    @BeforeTest
    fun setup() {
        Mockative.init(this)
        driverFactory = TestDatabaseDriverFactory()
        database = LanguageCacheDatabase(driverFactory.createDriver())
        mockApiClient = mock(classOf<ApiClient>())

        syncManager = SyncManager(database, mockApiClient)
    }

    @AfterTest
    fun tearDown() {
        syncManager.stopSync()
        driverFactory.close()
    }

    @Test
    fun `syncLanguages success updates database and sync state`() = runTest {
        val mockLanguages = listOf(
            LanguageDto(
                id = "kotlin",
                name = "Kotlin",
                summary = "Modern language",
                ranking = 5,
                trendData = null,
                resources = emptyList(),
                images = emptyList()
            )
        )

        given(mockApiClient).getLanguages().willReturn { Result.success(mockLanguages) }

        val result = syncManager.syncLanguages()

        assertTrue(result.isSuccess)

        // Check that language was cached
        val cached = database.getLanguageById("kotlin")
        assertNotNull(cached)
        assertEquals("Kotlin", cached.name)
        assertEquals(5L, cached.ranking)
        assertNotNull(cached.lastSyncedAt)
    }

    @Test
    fun `syncLanguages failure returns error result`() = runTest {
        val error = Exception("Network error")
        given(mockApiClient).getLanguages().willReturn { Result.failure(error) }

        val result = syncManager.syncLanguages()

        assertTrue(result.isFailure)
        assertEquals(error, result.exceptionOrNull())
    }

    @Test
    fun `getLanguageWithFallback returns cached language when available`() = runTest {
        val cachedLanguage = CachedLanguage(
            id = "kotlin",
            name = "Kotlin",
            summary = "Cached language",
            ranking = 5,
            trendData = null,
            resources = null,
            images = null,
            cachedAt = System.currentTimeMillis() - 1000, // Recent cache
            lastSyncedAt = null
        )

        database.insertOrUpdateLanguage(cachedLanguage)

        val result = syncManager.getLanguageWithFallback("kotlin")

        assertNotNull(result)
        assertEquals("kotlin", result.id)
        assertEquals("Cached language", result.summary)
    }

    @Test
    fun `getLanguageWithFallback syncs when cache is stale or missing`() = runTest {
        val mockLanguages = listOf(
            LanguageDto(
                id = "kotlin",
                name = "Kotlin",
                summary = "Fresh from API",
                ranking = 3,
                trendData = null,
                resources = emptyList(),
                images = emptyList()
            )
        )

        given(mockApiClient).getLanguages().willReturn { Result.success(mockLanguages) }

        // Language not in cache initially
        val result = syncManager.getLanguageWithFallback("kotlin")

        assertNotNull(result)
        assertEquals("kotlin", result.id)
        assertEquals("Fresh from API", result.summary)
        assertEquals(3L, result.ranking)
    }

    @Test
    fun `isOfflineReady returns true when cache has data`() = runTest {
        val cachedLanguage = CachedLanguage(
            id = "kotlin",
            name = "Kotlin",
            summary = "Cached language",
            ranking = 5,
            trendData = null,
            resources = null,
            images = null,
            cachedAt = System.currentTimeMillis(),
            lastSyncedAt = null
        )

        database.insertOrUpdateLanguage(cachedLanguage)

        val isReady = syncManager.isOfflineReady()

        assertTrue(isReady)
    }

    @Test
    fun `isOfflineReady returns false when cache is empty`() = runTest {
        val isReady = syncManager.isOfflineReady()

        assertFalse(isReady)
    }

    @Test
    fun `syncBookmarks success updates bookmark cache`() = runTest {
        val mockBookmarks = listOf(
            com.nexusplatform.model.BookmarkDto(
                id = "bookmark-1",
                userId = "user-123",
                languageId = "kotlin",
                createdAt = "2023-01-01T00:00:00Z"
            )
        )

        given(mockApiClient).getBookmarks("user-123").willReturn { Result.success(mockBookmarks) }

        val result = syncManager.syncBookmarks("user-123")

        assertTrue(result.isSuccess)

        // Check that bookmark was cached
        val isBookmarked = database.isBookmarked("user-123", "kotlin")
        assertTrue(isBookmarked)
    }

    @Test
    fun `syncBookmarks failure returns error result`() = runTest {
        val error = Exception("Network error")
        given(mockApiClient).getBookmarks("user-123").willReturn { Result.failure(error) }

        val result = syncManager.syncBookmarks("user-123")

        assertTrue(result.isFailure)
        assertEquals(error, result.exceptionOrNull())
    }
}
