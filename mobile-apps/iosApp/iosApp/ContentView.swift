import SwiftUI
import shared

struct ContentView: View {
    @StateObject private var viewModel = LanguageListViewModel()

    var body: some View {
        NavigationView {
            ZStack {
                if viewModel.languages.isEmpty && !viewModel.isLoading {
                    VStack {
                        Text("No languages cached yet")
                            .font(.headline)
                        Button("Sync Now") {
                            viewModel.syncLanguages()
                        }
                        .padding()
                    }
                } else {
                    List(viewModel.languages, id: \.id) { language in
                        LanguageRow(language: language, viewModel: viewModel)
                    }
                    .navigationTitle("Programming Languages")
                    .navigationBarItems(trailing: Button(action: {
                        viewModel.syncLanguages()
                    }) {
                        if viewModel.isLoading {
                            ProgressView()
                        } else {
                            Image(systemName: "arrow.clockwise")
                        }
                    })
                }

                if viewModel.isLoading {
                    ProgressView()
                        .scaleEffect(1.5)
                }
            }
        }
        .onAppear {
            viewModel.initialize()
        }
    }
}

struct LanguageRow: View {
    let language: CachedLanguage
    @ObservedObject var viewModel: LanguageListViewModel
    @State private var showingDetail = false

    var body: some View {
        VStack(alignment: .leading) {
            HStack {
                Text(language.name)
                    .font(.headline)
                Spacer()
                if let ranking = language.ranking {
                    Text("#\(ranking)")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }

            if let summary = language.summary {
                Text(summary)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .lineLimit(2)
            }
        }
        .padding(.vertical, 4)
        .onTapGesture {
            showingDetail = true
        }
        .sheet(isPresented: $showingDetail) {
            LanguageDetailView(language: language, viewModel: viewModel, isPresented: $showingDetail)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
