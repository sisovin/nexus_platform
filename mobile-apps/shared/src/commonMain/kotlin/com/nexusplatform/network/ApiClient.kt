package com.nexusplatform.network

import com.nexusplatform.model.BookmarkDto
import com.nexusplatform.model.LanguageDto
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json

class ApiClient(
    private val baseUrl: String = "https://api.nexusplatform.com",
    private val httpClient: HttpClient = createHttpClient()
) {
    companion object {
        private fun createHttpClient(): HttpClient {
            return HttpClient {
                install(ContentNegotiation) {
                    json(Json {
                        prettyPrint = true
                        isLenient = true
                        ignoreUnknownKeys = true
                    })
                }
                // Add timeout, retry, and other configurations as needed
            }
        }
    }

    suspend fun getLanguages(): Result<List<LanguageDto>> {
        return try {
            val response = httpClient.get("$baseUrl/api/languages")
            if (response.status.isSuccess()) {
                val languages = response.body<List<LanguageDto>>()
                Result.success(languages)
            } else {
                Result.failure(Exception("Failed to fetch languages: ${response.status}"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun getLanguageById(id: String): Result<LanguageDto> {
        return try {
            val response = httpClient.get("$baseUrl/api/languages/$id")
            if (response.status.isSuccess()) {
                val language = response.body<LanguageDto>()
                Result.success(language)
            } else if (response.status == HttpStatusCode.NotFound) {
                Result.failure(Exception("Language not found"))
            } else {
                Result.failure(Exception("Failed to fetch language: ${response.status}"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun getBookmarks(userId: String): Result<List<BookmarkDto>> {
        return try {
            val response = httpClient.get("$baseUrl/api/user/bookmarks") {
                header("Authorization", "Bearer ${getAuthToken()}")
            }
            if (response.status.isSuccess()) {
                val bookmarks = response.body<List<BookmarkDto>>()
                Result.success(bookmarks)
            } else {
                Result.failure(Exception("Failed to fetch bookmarks: ${response.status}"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun addBookmark(languageId: String): Result<BookmarkDto> {
        return try {
            val response = httpClient.post("$baseUrl/api/user/bookmarks") {
                header("Authorization", "Bearer ${getAuthToken()}")
                contentType(ContentType.Application.Json)
                setBody(mapOf("languageId" to languageId))
            }
            if (response.status.isSuccess()) {
                val bookmark = response.body<BookmarkDto>()
                Result.success(bookmark)
            } else {
                Result.failure(Exception("Failed to add bookmark: ${response.status}"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun removeBookmark(languageId: String): Result<Unit> {
        return try {
            val response = httpClient.request("$baseUrl/api/user/bookmarks") {
                method = HttpMethod.Delete
                header("Authorization", "Bearer ${getAuthToken()}")
                contentType(ContentType.Application.Json)
                setBody(mapOf("languageId" to languageId))
            }
            if (response.status.isSuccess()) {
                Result.success(Unit)
            } else {
                Result.failure(Exception("Failed to remove bookmark: ${response.status}"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    // Helper method to get auth token - in real app, this would come from secure storage
    private fun getAuthToken(): String {
        // TODO: Implement proper token retrieval from secure storage
        return "mock-jwt-token"
    }

    fun close() {
        httpClient.close()
    }
}
