'use client'

import { useEffect, useState } from 'react'

interface Language {
    id: string
    name: string
    summary: string | null
    ranking: number | null
    trendData: any | null
    resources: string[]
    images: string[]
}

interface LanguageDetailProps {
    id: string
}

export default function LanguageDetail({ id }: LanguageDetailProps) {
    const [language, setLanguage] = useState<Language | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/languages/${id}`)
            .then(res => res.json())
            .then(data => {
                setLanguage(data)
                setLoading(false)
            })
            .catch(err => {
                console.error('Failed to fetch language:', err)
                setLoading(false)
            })
    }, [id])

    if (loading) {
        return <div>Loading language details...</div>
    }

    if (!language) {
        return <div>Language not found</div>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">{language.name}</h1>
            {language.ranking && (
                <p className="text-lg mb-4">Ranking: #{language.ranking}</p>
            )}
            {language.summary && (
                <p className="text-base mb-6">{language.summary}</p>
            )}
            {language.resources && language.resources.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Resources</h2>
                    <ul className="list-disc list-inside">
                        {language.resources.map((resource, index) => (
                            <li key={index}>
                                <a href={resource} className="text-blue-600 hover:text-blue-800">
                                    {resource}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {/* Placeholder for trend visualization */}
            <div className="bg-gray-100 p-4 rounded">
                <p>Trend visualization coming soon...</p>
            </div>
        </div>
    )
}
