package com.nexusplatform.database

import com.nexusplatform.NexusPlatformDatabase
import com.squareup.sqldelight.db.SqlDriver
import com.squareup.sqldelight.runtime.coroutines.asFlow
import com.squareup.sqldelight.runtime.coroutines.mapToList
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.serialization.json.Json

class LanguageCacheDatabase(
    sqlDriver: SqlDriver
) {
    private val database = NexusPlatformDatabase(sqlDriver)
    private val languageQueries = database.languageQueries
    private val bookmarkQueries = database.bookmarkQueries

    // Language operations
    suspend fun insertOrUpdateLanguage(language: CachedLanguage) {
        languageQueries.insertOrReplaceLanguage(
            id = language.id,
            name = language.name,
            summary = language.summary,
            ranking = language.ranking,
            trend_data = language.trendData,
            resources = language.resources,
            images = language.images,
            cached_at = language.cachedAt,
            last_synced_at = language.lastSyncedAt
        )
    }

    suspend fun getLanguageById(id: String): CachedLanguage? {
        return languageQueries.getLanguageById(id).executeAsOneOrNull()?.toCachedLanguage()
    }

    fun getAllLanguages(): Flow<List<CachedLanguage>> {
        return languageQueries.getAllLanguages()
            .asFlow()
            .mapToList()
            .map { entities -> entities.map { it.toCachedLanguage() } }
    }

    fun getLanguagesByRanking(limit: Long = 50): Flow<List<CachedLanguage>> {
        return languageQueries.getLanguagesByRanking(limit)
            .asFlow()
            .mapToList()
            .map { entities -> entities.map { it.toCachedLanguage() } }
    }

    suspend fun deleteLanguage(id: String) {
        languageQueries.deleteLanguage(id)
    }

    suspend fun clearOldCache(olderThan: Long) {
        languageQueries.clearOldCache(olderThan)
    }

    // Bookmark operations
    suspend fun insertBookmark(bookmark: CachedBookmark) {
        bookmarkQueries.insertBookmark(
            id = bookmark.id,
            user_id = bookmark.userId,
            language_id = bookmark.languageId,
            created_at = bookmark.createdAt
        )
    }

    suspend fun removeBookmark(userId: String, languageId: String) {
        bookmarkQueries.removeBookmark(userId, languageId)
    }

    fun getBookmarksForUser(userId: String): Flow<List<CachedBookmark>> {
        return bookmarkQueries.getBookmarksForUser(userId)
            .asFlow()
            .mapToList()
            .map { entities -> entities.map { it.toCachedBookmark() } }
    }

    suspend fun isBookmarked(userId: String, languageId: String): Boolean {
        return bookmarkQueries.isBookmarked(userId, languageId).executeAsOneOrNull() != null
    }

    suspend fun clearAllData() {
        bookmarkQueries.clearAllBookmarks()
        languageQueries.clearAllLanguages()
    }
}

// Extension functions to convert between database entities and domain models
private fun com.nexusplatform.Language.toCachedLanguage(): CachedLanguage {
    return CachedLanguage(
        id = id,
        name = name,
        summary = summary,
        ranking = ranking,
        trendData = trend_data,
        resources = resources,
        images = images,
        cachedAt = cached_at,
        lastSyncedAt = last_synced_at
    )
}

private fun com.nexusplatform.Bookmark.toCachedBookmark(): CachedBookmark {
    return CachedBookmark(
        id = id,
        userId = user_id,
        languageId = language_id,
        createdAt = created_at
    )
}
