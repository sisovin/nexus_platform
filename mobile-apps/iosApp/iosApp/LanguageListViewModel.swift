import Foundation
import shared

class LanguageListViewModel: ObservableObject {
    @Published var languages: [CachedLanguage] = []
    @Published var isLoading = false
    @Published var syncState: SyncState = SyncStateIdle()

    private var database: LanguageCacheDatabase?
    private var apiClient: ApiClient?
    private var syncManager: SyncManager?

    func initialize() {
        // Initialize database and services
        let driverFactory = DatabaseDriverFactory()
        database = LanguageCacheDatabase(sqlDriver: driverFactory.createDriver())
        apiClient = ApiClient(baseUrl: "https://api.nexusplatform.com")

        if let database = database, let apiClient = apiClient {
            syncManager = SyncManager(database: database, apiClient: apiClient)

            // Observe languages
            syncManager?.getLanguagesFlow().watch { languagesArray in
                DispatchQueue.main.async {
                    self.languages = languagesArray as? [CachedLanguage] ?? []
                }
            }

            // Observe sync state
            syncManager?.syncState.watch { state in
                DispatchQueue.main.async {
                    self.syncState = state
                }
            }
        }
    }

    func syncLanguages() {
        isLoading = true
        Task {
            do {
                _ = try await syncManager?.syncLanguages()
            } catch {
                print("Sync failed: \(error)")
            }
            DispatchQueue.main.async {
                self.isLoading = false
            }
        }
    }

    func getLanguageDetailViewModel(for language: CachedLanguage) -> LanguageDetailViewModel {
        return LanguageDetailViewModel(
            language: language,
            database: database!,
            apiClient: apiClient!
        )
    }
}
