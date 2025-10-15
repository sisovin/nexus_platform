package com.nexusplatform.model

import kotlinx.serialization.Serializable

@Serializable
data class CachedLanguage(
    val id: String,
    val name: String,
    val summary: String?,
    val ranking: Long?,
    val trendData: String?, // JSON string
    val resources: String?, // JSON array
    val images: String?, // JSON array
    val cachedAt: Long,
    val lastSyncedAt: Long?
)

@Serializable
data class CachedBookmark(
    val id: String,
    val userId: String,
    val languageId: String,
    val createdAt: Long
)

// Network models (for API communication)
@Serializable
data class LanguageDto(
    val id: String,
    val name: String,
    val summary: String?,
    val ranking: Int?,
    val trendData: Map<String, Any>?,
    val resources: List<String>,
    val images: List<String>
)

@Serializable
data class BookmarkDto(
    val id: String,
    val userId: String,
    val languageId: String,
    val createdAt: String
)

// Extension functions to convert between network and cache models
fun LanguageDto.toCachedLanguage(): CachedLanguage {
    return CachedLanguage(
        id = id,
        name = name,
        summary = summary,
        ranking = ranking?.toLong(),
        trendData = trendData?.let { kotlinx.serialization.json.Json.encodeToString(MapSerializer, it) },
        resources = kotlinx.serialization.json.Json.encodeToString(kotlinx.serialization.builtins.ListSerializer(kotlinx.serialization.builtins.serializer<String>()), resources),
        images = kotlinx.serialization.json.Json.encodeToString(kotlinx.serialization.builtins.ListSerializer(kotlinx.serialization.builtins.serializer<String>()), images),
        cachedAt = kotlinx.datetime.Clock.System.now().toEpochMilliseconds(),
        lastSyncedAt = null
    )
}

fun CachedLanguage.toLanguageDto(): LanguageDto {
    return LanguageDto(
        id = id,
        name = name,
        summary = summary,
        ranking = ranking?.toInt(),
        trendData = trendData?.let { kotlinx.serialization.json.Json.decodeFromString(MapSerializer, it) },
        resources = resources?.let { kotlinx.serialization.json.Json.decodeFromString(kotlinx.serialization.builtins.ListSerializer(kotlinx.serialization.builtins.serializer<String>()), it) } ?: emptyList(),
        images = images?.let { kotlinx.serialization.json.Json.decodeFromString(kotlinx.serialization.builtins.ListSerializer(kotlinx.serialization.builtins.serializer<String>()), it) } ?: emptyList()
    )
}
