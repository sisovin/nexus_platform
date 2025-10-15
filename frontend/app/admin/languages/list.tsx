'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { apiClient } from '../../../lib/api-client'

interface Language {
    id: string
    name: string
    summary: string | null
    ranking: number | null
    createdAt: string
}

export default function AdminLanguagesList() {
    const [languages, setLanguages] = useState<Language[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const fetchLanguages = async () => {
        try {
            const data = await apiClient.get('/admin/languages')
            setLanguages(data)
            setError(null)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
            return
        }

        setDeletingId(id)
        try {
            await apiClient.delete(`/admin/languages/${id}`)
            await fetchLanguages() // Refresh list
        } catch (err: any) {
            setError(err.message)
        } finally {
            setDeletingId(null)
        }
    }

    useEffect(() => {
        fetchLanguages()
    }, [])

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Language Management</h1>
                <div>Loading languages...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Language Management</h1>
                <div className="text-red-600">Error: {error}</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Language Management</h1>
                <Link
                    href="/admin/languages/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Add New Language
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ranking
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Summary
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {languages.map((language) => (
                            <tr key={language.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {language.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {language.ranking ? `#${language.ranking}` : 'N/A'}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900 max-w-xs truncate">
                                        {language.summary || 'No summary'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Link
                                        href={`/admin/languages/${language.id}/edit`}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(language.id, language.name)}
                                        disabled={deletingId === language.id}
                                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                    >
                                        {deletingId === language.id ? 'Deleting...' : 'Delete'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {languages.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No languages found.</p>
                        <Link
                            href="/admin/languages/create"
                            className="text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                        >
                            Add the first language
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
