'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Language {
    id: string
    name: string
    summary: string | null
    ranking: number | null
}

export default function LanguagesGrid() {
    const [languages, setLanguages] = useState<Language[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/languages')
            .then(res => res.json())
            .then(data => {
                setLanguages(data)
                setLoading(false)
            })
            .catch(err => {
                console.error('Failed to fetch languages:', err)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <div>Loading languages...</div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languages.map(language => (
                <div key={language.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold mb-2">{language.name}</h2>
                    {language.ranking && (
                        <p className="text-sm text-gray-600 mb-2">Rank: #{language.ranking}</p>
                    )}
                    {language.summary && (
                        <p className="text-sm mb-4">{language.summary}</p>
                    )}
                    <Link
                        href={`/languages/${language.id}`}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        View Details →
                    </Link>
                </div>
            ))}
        </div>
    )
}
