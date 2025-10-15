package com.nexusplatform.sync

import com.nexusplatform.database.LanguageCacheDatabase
import com.nexusplatform.model.CachedLanguage
import com.nexusplatform.model.LanguageDto
import com.nexusplatform.network.ApiClient
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlinx.datetime.Clock

class SyncManager(
    private val database: LanguageCacheDatabase,
    private val apiClient: ApiClient,
    private val scope: CoroutineScope = CoroutineScope(Dispatchers.Default + SupervisorJob())
) {
    private val _syncState = MutableStateFlow<SyncState>(SyncState.Idle)
    val syncState: StateFlow<SyncState> = _syncState.asStateFlow()

    // Configuration
    private val cacheValidityDuration = 24 * 60 * 60 * 1000L // 24 hours in milliseconds
    private val syncInterval = 30 * 60 * 1000L // 30 minutes in milliseconds

    init {
        // Start periodic sync
        startPeriodicSync()
    }

    private fun startPeriodicSync() {
        scope.launch {
            while (isActive) {
                delay(syncInterval)
                syncLanguages()
            }
        }
    }

    suspend fun syncLanguages(): Result<Unit> {
        return withContext(Dispatchers.IO) {
            try {
                _syncState.value = SyncState.Syncing

                // Fetch languages from API
                val languagesResult = apiClient.getLanguages()
                languagesResult.getOrThrow()

                val languages = languagesResult.getOrNull() ?: emptyList()

                // Cache languages in database
                languages.forEach { languageDto ->
                    val cachedLanguage = languageDto.toCachedLanguage().copy(
                        lastSyncedAt = Clock.System.now().toEpochMilliseconds()
                    )
                    database.insertOrUpdateLanguage(cachedLanguage)
                }

                // Clean up old cache entries
                val cutoffTime = Clock.System.now().toEpochMilliseconds() - cacheValidityDuration
                database.clearOldCache(cutoffTime)

                _syncState.value = SyncState.Success
                Result.success(Unit)

            } catch (e: Exception) {
                _syncState.value = SyncState.Error(e.message ?: "Unknown error")
                Result.failure(e)
            }
        }
    }

    suspend fun syncBookmarks(userId: String): Result<Unit> {
        return withContext(Dispatchers.IO) {
            try {
                _syncState.value = SyncState.Syncing

                // Fetch bookmarks from API
                val bookmarksResult = apiClient.getBookmarks(userId)
                bookmarksResult.getOrThrow()

                val bookmarks = bookmarksResult.getOrNull() ?: emptyList()

                // Clear existing bookmarks for this user
                // Note: In a real implementation, we'd do a proper sync with conflict resolution
                database.clearAllData() // Simplified for demo

                // Cache bookmarks in database
                bookmarks.forEach { bookmarkDto ->
                    val cachedBookmark = bookmarkDto.toCachedBookmark()
                    database.insertBookmark(cachedBookmark)
                }

                _syncState.value = SyncState.Success
                Result.success(Unit)

            } catch (e: Exception) {
                _syncState.value = SyncState.Error(e.message ?: "Unknown error")
                Result.failure(e)
            }
        }
    }

    suspend fun getLanguageWithFallback(languageId: String): CachedLanguage? {
        // First try to get from cache
        val cached = database.getLanguageById(languageId)
        if (cached != null) {
            // Check if cache is still valid
            val now = Clock.System.now().toEpochMilliseconds()
            val cacheAge = now - (cached.cachedAt ?: 0)
            if (cacheAge < cacheValidityDuration) {
                return cached
            }
        }

        // If cache is stale or missing, try to sync and get again
        syncLanguages()
        return database.getLanguageById(languageId)
    }

    fun getLanguagesFlow(): Flow<List<CachedLanguage>> {
        return database.getAllLanguages()
    }

    fun getLanguagesByRankingFlow(limit: Long = 50): Flow<List<CachedLanguage>> {
        return database.getLanguagesByRanking(limit)
    }

    suspend fun isOfflineReady(): Boolean {
        // Check if we have cached data
        val languages = database.getAllLanguages().first()
        return languages.isNotEmpty()
    }

    fun stopSync() {
        scope.cancel()
    }
}

sealed class SyncState {
    object Idle : SyncState()
    object Syncing : SyncState()
    object Success : SyncState()
    data class Error(val message: String) : SyncState()
}
