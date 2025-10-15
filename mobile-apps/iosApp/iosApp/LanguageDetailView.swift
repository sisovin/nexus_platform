import SwiftUI
import shared

struct LanguageDetailView: View {
    let language: CachedLanguage
    @ObservedObject var viewModel: LanguageListViewModel
    @Binding var isPresented: Bool

    @State private var isBookmarked = false
    @State private var isLoading = false

    var body: some View {
        NavigationView {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    // Title
                    Text(language.name)
                        .font(.largeTitle)
                        .fontWeight(.bold)

                    // Ranking
                    if let ranking = language.ranking {
                        Text("Ranking: #\(ranking)")
                            .font(.title2)
                            .foregroundColor(.secondary)
                    }

                    // Summary
                    if let summary = language.summary {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Summary")
                                .font(.title3)
                                .fontWeight(.semibold)
                            Text(summary)
                                .font(.body)
                        }
                    }

                    // Resources
                    if let resourcesJson = language.resources {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Resources")
                                .font(.title3)
                                .fontWeight(.semibold)

                            if let resources = try? JSONDecoder().decode([String].self, from: Data(resourcesJson.utf8)) {
                                ForEach(resources, id: \.self) { resource in
                                    Text("• \(resource)")
                                        .font(.body)
                                }
                            }
                        }
                    }

                    // Images
                    if let imagesJson = language.images {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Images")
                                .font(.title3)
                                .fontWeight(.semibold)

                            if let images = try? JSONDecoder().decode([String].self, from: Data(imagesJson.utf8)) {
                                ForEach(images, id: \.self) { image in
                                    Text("• \(image)")
                                        .font(.body)
                                }
                            }
                        }
                    }

                    Spacer()
                }
                .padding()
            }
            .navigationBarItems(
                leading: Button("Close") {
                    isPresented = false
                },
                trailing: Button(action: toggleBookmark) {
                    if isLoading {
                        ProgressView()
                    } else {
                        Text(isBookmarked ? "Remove Bookmark" : "Add Bookmark")
                    }
                }
                .disabled(isLoading)
            )
            .navigationTitle(language.name)
        }
        .onAppear {
            checkBookmarkStatus()
        }
    }

    private func checkBookmarkStatus() {
        // In a real app, you'd get the current user ID
        let userId = "current-user-id"
        Task {
            do {
                let bookmarked = try await viewModel.database?.isBookmarked(userId: userId, languageId: language.id) ?? false
                DispatchQueue.main.async {
                    self.isBookmarked = bookmarked
                }
            } catch {
                print("Failed to check bookmark status: \(error)")
            }
        }
    }

    private func toggleBookmark() {
        isLoading = true
        let userId = "current-user-id" // In real app, get from auth

        Task {
            do {
                if isBookmarked {
                    _ = try await viewModel.apiClient?.removeBookmark(languageId: language.id)
                    try await viewModel.database?.removeBookmark(userId: userId, languageId: language.id)
                } else {
                    _ = try await viewModel.apiClient?.addBookmark(languageId: language.id)
                    // Local database update would be handled by sync
                }
                DispatchQueue.main.async {
                    self.isBookmarked.toggle()
                    self.isLoading = false
                }
            } catch {
                print("Failed to toggle bookmark: \(error)")
                DispatchQueue.main.async {
                    self.isLoading = false
                }
            }
        }
    }
}
