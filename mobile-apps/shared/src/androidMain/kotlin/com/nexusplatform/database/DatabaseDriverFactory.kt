package com.nexusplatform.database

import android.content.Context
import com.nexusplatform.NexusPlatformDatabase
import com.squareup.sqldelight.android.AndroidSqliteDriver
import com.squareup.sqldelight.db.SqlDriver

actual class DatabaseDriverFactory(private val context: Context) {
    actual fun createDriver(): SqlDriver {
        return AndroidSqliteDriver(NexusPlatformDatabase.Schema, context, "nexus_platform.db")
    }
}
