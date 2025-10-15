package com.nexusplatform.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.nexusplatform.database.LanguageCacheDatabase
import com.nexusplatform.model.CachedLanguage
import com.nexusplatform.network.ApiClient
import com.nexusplatform.sync.SyncManager
import com.nexusplatform.sync.SyncState
import kotlinx.coroutines.launch

@Composable
fun LanguageListScreen(
    database: LanguageCacheDatabase,
    apiClient: ApiClient,
    syncManager: SyncManager
) {
    val scope = rememberCoroutineScope()
    val scaffoldState = rememberScaffoldState()

    var languages by remember { mutableStateOf<List<CachedLanguage>>(emptyList()) }
    var isLoading by remember { mutableStateOf(false) }
    var selectedLanguage by remember { mutableStateOf<CachedLanguage?>(null) }

    // Observe sync state
    val syncState by syncManager.syncState.collectAsState()

    // Observe languages from database
    LaunchedEffect(Unit) {
        syncManager.getLanguagesFlow().collect { cachedLanguages ->
            languages = cachedLanguages
        }
    }

    // Initial sync
    LaunchedEffect(Unit) {
        isLoading = true
        syncManager.syncLanguages()
        isLoading = false
    }

    Scaffold(
        scaffoldState = scaffoldState,
        topBar = {
            TopAppBar(
                title = { Text("Programming Languages") },
                actions = {
                    IconButton(
                        onClick = {
                            scope.launch {
                                isLoading = true
                                syncManager.syncLanguages()
                                isLoading = false
                            }
                        },
                        enabled = !isLoading
                    ) {
                        if (isLoading) {
                            CircularProgressIndicator(modifier = Modifier.size(24.dp))
                        } else {
                            Text("🔄") // Refresh icon
                        }
                    }
                }
            )
        }
    ) { padding ->
        Box(modifier = Modifier.padding(padding)) {
            when {
                languages.isEmpty() && !isLoading -> {
                    // Show offline message or empty state
                    Column(
                        modifier = Modifier.fillMaxSize(),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.Center
                    ) {
                        Text("No languages cached yet")
                        Spacer(modifier = Modifier.height(16.dp))
                        Button(onClick = {
                            scope.launch {
                                isLoading = true
                                syncManager.syncLanguages()
                                isLoading = false
                            }
                        }) {
                            Text("Sync Now")
                        }
                    }
                }
                else -> {
                    LazyColumn {
                        items(languages) { language ->
                            LanguageListItem(
                                language = language,
                                onClick = { selectedLanguage = language }
                            )
                        }
                    }
                }
            }

            // Sync status indicator
            if (syncState != SyncState.Idle) {
                SyncStatusIndicator(syncState)
            }
        }
    }

    // Language detail dialog/screen would go here
    selectedLanguage?.let { language ->
        LanguageDetailScreen(
            language = language,
            onDismiss = { selectedLanguage = null },
            database = database,
            apiClient = apiClient
        )
    }
}

@Composable
fun LanguageListItem(
    language: CachedLanguage,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
            .clickable(onClick = onClick),
        elevation = 4.dp
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Top
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = language.name,
                        style = MaterialTheme.typography.h6
                    )
                    language.ranking?.let {
                        Text(
                            text = "Rank: #$it",
                            style = MaterialTheme.typography.caption
                        )
                    }
                }
            }

            language.summary?.let {
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = it,
                    style = MaterialTheme.typography.body2,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
            }
        }
    }
}

@Composable
fun SyncStatusIndicator(syncState: SyncState) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        contentAlignment = Alignment.TopCenter
    ) {
        Card(
            backgroundColor = when (syncState) {
                is SyncState.Success -> MaterialTheme.colors.primary
                is SyncState.Error -> MaterialTheme.colors.error
                else -> MaterialTheme.colors.surface
            }
        ) {
            Text(
                text = when (syncState) {
                    SyncState.Syncing -> "Syncing..."
                    SyncState.Success -> "Sync completed"
                    is SyncState.Error -> "Sync failed: ${syncState.message}"
                    else -> ""
                },
                modifier = Modifier.padding(8.dp),
                color = MaterialTheme.colors.onPrimary
            )
        }
    }
}
