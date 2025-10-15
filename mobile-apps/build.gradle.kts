plugins {
    kotlin("multiplatform") version "1.9.22"
    kotlin("native.cocoapods") version "1.9.22"
    id("com.android.library") version "8.1.4"
    id("org.jetbrains.compose") version "1.5.11"
    id("com.squareup.sqldelight") version "2.0.0"
}

kotlin {
    androidTarget()
    iosX64()
    iosArm64()
    iosSimulatorArm64()

    cocoapods {
        summary = "Nexus Platform Mobile"
        homepage = "https://github.com/nexus-platform"
        ios.deploymentTarget = "14.1"
        podfile = project.file("../iosApp/Podfile")
        framework {
            baseName = "shared"
        }
    }

    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation(compose.runtime)
                implementation(compose.foundation)
                implementation(compose.material)

                // SQLDelight
                implementation("com.squareup.sqldelight:runtime:2.0.0")

                // Ktor for networking
                implementation("io.ktor:ktor-client-core:2.3.7")
                implementation("io.ktor:ktor-client-content-negotiation:2.3.7")
                implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.7")

                // KotlinX libraries
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
                implementation("org.jetbrains.kotlinx:kotlinx-datetime:0.5.0")
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.3")
            }
        }
        val commonTest by getting {
            dependencies {
                implementation(kotlin("test"))
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3")

                // Mockative for mocking
                implementation("io.mockative:mockative:2.0.0")
                implementation("io.mockative:mockative-processor:2.0.0")
            }
        }
        val androidMain by getting {
            dependencies {
                implementation("androidx.activity:activity-compose:1.8.2")

                // SQLDelight Android driver
                implementation("com.squareup.sqldelight:android-driver:2.0.0")

                // Ktor Android client
                implementation("io.ktor:ktor-client-android:2.3.7")
            }
        }
        val androidTest by getting {
            dependencies {
                implementation("junit:junit:4.13.2")
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3")
            }
        }
        val iosX64Main by getting {
            dependencies {
                // Ktor iOS client
                implementation("io.ktor:ktor-client-ios:2.3.7")
            }
        }
        val iosArm64Main by getting {
            dependencies {
                // Ktor iOS client
                implementation("io.ktor:ktor-client-ios:2.3.7")
            }
        }
        val iosSimulatorArm64Main by getting {
            dependencies {
                // Ktor iOS client
                implementation("io.ktor:ktor-client-ios:2.3.7")
            }
        }
    }
}

android {
    compileSdk = 34
    sourceSets["main"].manifest.srcFile("src/androidMain/AndroidManifest.xml")
}

sqldelight {
    databases {
        create("NexusPlatformDatabase") {
            packageName.set("com.nexusplatform")
            sourceFolders.set(listOf("sqldelight"))
        }
    }
}
