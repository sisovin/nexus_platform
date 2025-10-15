'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { apiClient } from '../../../lib/api-client'

interface Language {
    id: string
    name: string
    summary: string | null
    ranking: number | null
    trendData: any | null
    resources: string[]
    images: string[]
}

interface LanguageFormData {
    name: string
    summary: string
    ranking: string
    resources: string[]
    images: string[]
}

export default function EditLanguage() {
    const router = useRouter()
    const params = useParams()
    const languageId = params.id as string

    const [formData, setFormData] = useState<LanguageFormData>({
        name: '',
        summary: '',
        ranking: '',
        resources: [],
        images: [],
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchLanguage = async () => {
            try {
                const language: Language = await apiClient.get(`/admin/languages/${languageId}`)
                setFormData({
                    name: language.name,
                    summary: language.summary || '',
                    ranking: language.ranking?.toString() || '',
                    resources: language.resources || [],
                    images: language.images || [],
                })
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (languageId) {
            fetchLanguage()
        }
    }, [languageId])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleArrayInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: 'resources' | 'images'
    ) => {
        const value = e.target.value
        const array = value.split(',').map(item => item.trim()).filter(item => item)
        setFormData(prev => ({
            ...prev,
            [field]: array,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            const submitData = {
                ...formData,
                ranking: formData.ranking ? parseInt(formData.ranking) : undefined,
            }

            await apiClient.put(`/admin/languages/${languageId}`, submitData)
            router.push('/admin/languages/list')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Edit Language</h1>
                <div>Loading language...</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Edit Language</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Programming language name"
                    />
                </div>

                <div>
                    <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                        Summary
                    </label>
                    <textarea
                        id="summary"
                        name="summary"
                        value={formData.summary}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Brief description of the language"
                    />
                </div>

                <div>
                    <label htmlFor="ranking" className="block text-sm font-medium text-gray-700 mb-1">
                        Ranking
                    </label>
                    <input
                        type="number"
                        id="ranking"
                        name="ranking"
                        value={formData.ranking}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Popularity ranking (optional)"
                    />
                </div>

                <div>
                    <label htmlFor="resources" className="block text-sm font-medium text-gray-700 mb-1">
                        Resources
                    </label>
                    <input
                        type="text"
                        id="resources"
                        value={formData.resources.join(', ')}
                        onChange={(e) => handleArrayInputChange(e, 'resources')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Comma-separated URLs (optional)"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Enter URLs separated by commas
                    </p>
                </div>

                <div>
                    <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
                        Images
                    </label>
                    <input
                        type="text"
                        id="images"
                        value={formData.images.join(', ')}
                        onChange={(e) => handleArrayInputChange(e, 'images')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Comma-separated image URLs (optional)"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Enter image URLs separated by commas
                    </p>
                </div>

                {error && (
                    <div className="text-red-600 bg-red-50 p-4 rounded-md">
                        {error}
                    </div>
                )}

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Language'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
