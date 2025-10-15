// API client for frontend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

class ApiClient {
    private baseURL: string

    constructor(baseURL: string = API_BASE_URL) {
        this.baseURL = baseURL
    }

    private async request(endpoint: string, options: RequestInit = {}) {
        const url = `${this.baseURL}${endpoint}`
        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        }

        const response = await fetch(url, config)

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`)
        }

        return response.json()
    }

    async get(endpoint: string) {
        return this.request(endpoint)
    }

    async post(endpoint: string, data: any) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async put(endpoint: string, data: any) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    async delete(endpoint: string) {
        return this.request(endpoint, {
            method: 'DELETE',
        })
    }
}

export const apiClient = new ApiClient()
