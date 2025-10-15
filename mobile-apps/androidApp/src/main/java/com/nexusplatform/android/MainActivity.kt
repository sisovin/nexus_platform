package com.nexusplatform.android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.*
import com.nexusplatform.database.DatabaseDriverFactory
import com.nexusplatform.database.LanguageCacheDatabase
import com.nexusplatform.network.ApiClient
import com.nexusplatform.sync.SyncManager
import com.nexusplatform.ui.NexusPlatformApp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Initialize database
        val database = LanguageCacheDatabase(DatabaseDriverFactory(this).createDriver())

        // Initialize API client
        val apiClient = ApiClient()

        // Initialize sync manager
        val syncManager = SyncManager(database, apiClient)

        setContent {
            NexusPlatformApp(database, apiClient, syncManager)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        // Clean up resources
    }
}
