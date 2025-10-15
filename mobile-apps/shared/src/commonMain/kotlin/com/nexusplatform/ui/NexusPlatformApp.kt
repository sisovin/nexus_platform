package com.nexusplatform.ui

import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.nexusplatform.database.LanguageCacheDatabase
import com.nexusplatform.network.ApiClient
import com.nexusplatform.sync.SyncManager
import com.nexusplatform.ui.screens.LanguageListScreen
import com.nexusplatform.ui.theme.NexusPlatformTheme

@Composable
fun NexusPlatformApp(
    database: LanguageCacheDatabase,
    apiClient: ApiClient,
    syncManager: SyncManager
) {
    NexusPlatformTheme {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colors.background
        ) {
            LanguageListScreen(database, apiClient, syncManager)
        }
    }
}
