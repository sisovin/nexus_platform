package com.nexusplatform.database

import com.squareup.sqldelight.db.SqlDriver
import com.squareup.sqldelight.sqlite.driver.JvmSqliteDriver

class TestDatabaseDriverFactory : DatabaseDriverFactory {
    private val driver: SqlDriver = JvmSqliteDriver(JvmSqliteDriver.IN_MEMORY)

    override fun createDriver(): SqlDriver = driver

    fun close() {
        // Close the driver if needed
    }
}
