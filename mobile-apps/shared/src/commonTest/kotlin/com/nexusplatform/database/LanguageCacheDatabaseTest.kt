package com.nexusplatform.database

import com.nexusplatform.model.CachedLanguage
import com.nexusplatform.model.CachedBookmark
import kotlinx.coroutines.test.runTest
import kotlin.test.*

class LanguageCacheDatabaseTest {

    private lateinit var database: LanguageCacheDatabase
    private lateinit var driverFactory: TestDatabaseDriverFactory

    @BeforeTest
    fun setup() {
        driverFactory = TestDatabaseDriverFactory()
        database = LanguageCacheDatabase(driverFactory.createDriver())
    }

    @AfterTest
    fun tearDown() {
        driverFactory.close()
    }

    @Test
    fun `insert and retrieve language successfully`() = runTest {
        val language = CachedLanguage(
            id = "kotlin",
            name = "Kotlin",
            summary = "Modern programming language",
            ranking = 5,
            trendData = null,
            resources = null,
            images = null,
            cachedAt = 1000L,
            lastSyncedAt = null
        )

        database.insertOrUpdateLanguage(language)
        val retrieved = database.getLanguageById("kotlin")

        assertNotNull(retrieved)
        assertEquals(language.id, retrieved.id)
        assertEquals(language.name, retrieved.name)
        assertEquals(language.summary, retrieved.summary)
        assertEquals(language.ranking, retrieved.ranking)
    }

    @Test
    fun `update existing language`() = runTest {
        val originalLanguage = CachedLanguage(
            id = "kotlin",
            name = "Kotlin",
            summary = "Modern programming language",
            ranking = 5,
            trendData = null,
            resources = null,
            images = null,
            cachedAt = 1000L,
            lastSyncedAt = null
        )

        database.insertOrUpdateLanguage(originalLanguage)

        val updatedLanguage = originalLanguage.copy(
            summary = "Updated description",
            ranking = 3,
            lastSyncedAt = 2000L
        )

        database.insertOrUpdateLanguage(updatedLanguage)
        val retrieved = database.getLanguageById("kotlin")

        assertNotNull(retrieved)
        assertEquals("Updated description", retrieved.summary)
        assertEquals(3L, retrieved.ranking)
        assertEquals(2000L, retrieved.lastSyncedAt)
    }

    @Test
    fun `return null for non-existent language`() = runTest {
        val retrieved = database.getLanguageById("non-existent")
        assertNull(retrieved)
    }

    @Test
    fun `retrieve all languages ordered by ranking`() = runTest {
        val languages = listOf(
            CachedLanguage("kotlin", "Kotlin", null, 5, null, null, null, 1000L, null),
            CachedLanguage("java", "Java", null, 1, null, null, null, 1000L, null),
            CachedLanguage("python", "Python", null, 3, null, null, null, 1000L, null)
        )

        languages.forEach { database.insertOrUpdateLanguage(it) }

        val retrieved = database.getAllLanguages().value
        assertEquals(3, retrieved.size)

        // Should be ordered by ranking (ascending)
        assertEquals("java", retrieved[0].id)
        assertEquals("python", retrieved[1].id)
        assertEquals("kotlin", retrieved[2].id)
    }

    @Test
    fun `retrieve languages by ranking limit`() = runTest {
        val languages = listOf(
            CachedLanguage("kotlin", "Kotlin", null, 5, null, null, null, 1000L, null),
            CachedLanguage("java", "Java", null, 1, null, null, null, 1000L, null),
            CachedLanguage("python", "Python", null, 3, null, null, null, 1000L, null),
            CachedLanguage("javascript", "JavaScript", null, 2, null, null, null, 1000L, null)
        )

        languages.forEach { database.insertOrUpdateLanguage(it) }

        val retrieved = database.getLanguagesByRanking(2).value
        assertEquals(2, retrieved.size)

        // Should return top 2 by ranking
        assertEquals("java", retrieved[0].id)
        assertEquals("javascript", retrieved[1].id)
    }

    @Test
    fun `delete language successfully`() = runTest {
        val language = CachedLanguage("kotlin", "Kotlin", null, 5, null, null, null, 1000L, null)
        database.insertOrUpdateLanguage(language)

        // Verify it exists
        assertNotNull(database.getLanguageById("kotlin"))

        // Delete it
        database.deleteLanguage("kotlin")

        // Verify it's gone
        assertNull(database.getLanguageById("kotlin"))
    }

    @Test
    fun `clear old cache removes expired entries`() = runTest {
        val currentTime = 5000L
        val cutoffTime = 3000L

        val recentLanguage = CachedLanguage("kotlin", "Kotlin", null, 5, null, null, null, 4000L, null)
        val oldLanguage = CachedLanguage("java", "Java", null, 1, null, null, null, 2000L, null)

        database.insertOrUpdateLanguage(recentLanguage)
        database.insertOrUpdateLanguage(oldLanguage)

        // Both should exist initially
        assertNotNull(database.getLanguageById("kotlin"))
        assertNotNull(database.getLanguageById("java"))

        // Clear old cache
        database.clearOldCache(cutoffTime)

        // Recent language should still exist
        assertNotNull(database.getLanguageById("kotlin"))
        // Old language should be removed
        assertNull(database.getLanguageById("java"))
    }

    @Test
    fun `bookmark operations work correctly`() = runTest {
        val bookmark = CachedBookmark(
            id = "bookmark-1",
            userId = "user-123",
            languageId = "kotlin",
            createdAt = 1000L
        )

        // Insert bookmark
        database.insertBookmark(bookmark)

        // Check if bookmarked
        assertTrue(database.isBookmarked("user-123", "kotlin"))

        // Remove bookmark
        database.removeBookmark("user-123", "kotlin")

        // Check if no longer bookmarked
        assertFalse(database.isBookmarked("user-123", "kotlin"))
    }

    @Test
    fun `get bookmarks for user returns correct bookmarks`() = runTest {
        val userId = "user-123"
        val bookmarks = listOf(
            CachedBookmark("b1", userId, "kotlin", 1000L),
            CachedBookmark("b2", userId, "java", 2000L),
            CachedBookmark("b3", "other-user", "python", 3000L) // Different user
        )

        bookmarks.forEach { database.insertBookmark(it) }

        val userBookmarks = database.getBookmarksForUser(userId).value
        assertEquals(2, userBookmarks.size)

        val languageIds = userBookmarks.map { it.languageId }.sorted()
        assertEquals(listOf("java", "kotlin"), languageIds)
    }

    @Test
    fun `clear all data removes everything`() = runTest {
        // Insert some test data
        val language = CachedLanguage("kotlin", "Kotlin", null, 5, null, null, null, 1000L, null)
        val bookmark = CachedBookmark("b1", "user-123", "kotlin", 1000L)

        database.insertOrUpdateLanguage(language)
        database.insertBookmark(bookmark)

        // Verify data exists
        assertNotNull(database.getLanguageById("kotlin"))
        assertTrue(database.isBookmarked("user-123", "kotlin"))

        // Clear all data
        database.clearAllData()

        // Verify data is gone
        assertNull(database.getLanguageById("kotlin"))
        assertFalse(database.isBookmarked("user-123", "kotlin"))
    }
}
