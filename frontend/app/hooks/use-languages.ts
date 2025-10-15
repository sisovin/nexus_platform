import { useState, useEffect } from 'react'
import { apiClient } from '../../lib/api-client'

interface Language {
    id: string
    name: string
    summary: string | null
    ranking: number | null
}

export function useLanguages(limit = 50) {
    const [languages, setLanguages] = useState<Language[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        apiClient
            .get(`/api/languages?limit=${limit}`)
            .then(data => {
                setLanguages(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [limit])

    return { languages, loading, error }
}

export function useLanguage(id: string) {
    const [language, setLanguage] = useState<Language | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) return

        apiClient
            .get(`/api/languages/${id}`)
            .then(data => {
                setLanguage(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [id])

    return { language, loading, error }
}
