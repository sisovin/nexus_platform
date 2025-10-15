package com.nexusplatform.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.nexusplatform.database.LanguageCacheDatabase
import com.nexusplatform.model.CachedLanguage
import com.nexusplatform.network.ApiClient
import kotlinx.coroutines.launch
import kotlinx.serialization.json.Json

@Composable
fun LanguageDetailScreen(
    language: CachedLanguage,
    onDismiss: () -> Unit,
    database: LanguageCacheDatabase,
    apiClient: ApiClient
) {
    val scope = rememberCoroutineScope()
    var isBookmarked by remember { mutableStateOf(false) }
    var isLoading by remember { mutableStateOf(false) }

    // Check bookmark status
    LaunchedEffect(language.id) {
        // In a real app, you'd get the current user ID
        val userId = "current-user-id"
        isBookmarked = database.isBookmarked(userId, language.id)
    }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(language.name, style = MaterialTheme.typography.h6)
                IconButton(onClick = onDismiss) {
                    Text("✕")
                }
            }
        },
        text = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .verticalScroll(rememberScrollState())
            ) {
                // Ranking
                language.ranking?.let {
                    Text("Ranking: #$it", style = MaterialTheme.typography.subtitle1)
                    Spacer(modifier = Modifier.height(8.dp))
                }

                // Summary
                language.summary?.let {
                    Text("Summary:", style = MaterialTheme.typography.subtitle2)
                    Text(it, style = MaterialTheme.typography.body1)
                    Spacer(modifier = Modifier.height(16.dp))
                }

                // Resources
                language.resources?.let { resourcesJson ->
                    try {
                        val resources = Json.decodeFromString<List<String>>(resourcesJson)
                        if (resources.isNotEmpty()) {
                            Text("Resources:", style = MaterialTheme.typography.subtitle2)
                            resources.forEach { resource ->
                                Text("• $resource", style = MaterialTheme.typography.body2)
                            }
                            Spacer(modifier = Modifier.height(16.dp))
                        }
                    } catch (e: Exception) {
                        // Handle JSON parsing error
                    }
                }

                // Images
                language.images?.let { imagesJson ->
                    try {
                        val images = Json.decodeFromString<List<String>>(imagesJson)
                        if (images.isNotEmpty()) {
                            Text("Images:", style = MaterialTheme.typography.subtitle2)
                            images.forEach { image ->
                                Text("• $image", style = MaterialTheme.typography.body2)
                            }
                        }
                    } catch (e: Exception) {
                        // Handle JSON parsing error
                    }
                }
            }
        },
        buttons = {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                // Bookmark button
                Button(
                    onClick = {
                        scope.launch {
                            isLoading = true
                            try {
                                val userId = "current-user-id" // In real app, get from auth
                                if (isBookmarked) {
                                    apiClient.removeBookmark(language.id)
                                    database.removeBookmark(userId, language.id)
                                } else {
                                    apiClient.addBookmark(language.id)
                                    // Add to local database would be handled by sync
                                }
                                isBookmarked = !isBookmarked
                            } catch (e: Exception) {
                                // Handle error
                            } finally {
                                isLoading = false
                            }
                        }
                    },
                    enabled = !isLoading
                ) {
                    Text(if (isBookmarked) "Remove Bookmark" else "Add Bookmark")
                }

                // Close button
                Button(onClick = onDismiss) {
                    Text("Close")
                }
            }
        }
    )
}
