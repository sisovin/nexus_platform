package com.nexusplatform.database

import com.nexusplatform.NexusPlatformDatabase
import com.squareup.sqldelight.db.SqlDriver
import com.squareup.sqldelight.drivers.native.NativeSqliteDriver

actual class DatabaseDriverFactory {
    actual fun createDriver(): SqlDriver {
        return NativeSqliteDriver(NexusPlatformDatabase.Schema, "nexus_platform.db")
    }
}
