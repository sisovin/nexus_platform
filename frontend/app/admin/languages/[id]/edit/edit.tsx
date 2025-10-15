'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { apiClient } from '../../../../lib/api-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Language {
    id: string
    name: string
    summary: string | null
    ranking: number | null
}

export default function EditLanguage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string

    const [formData, setFormData] = useState({
        name: '',
        summary: '',
        ranking: ''
    })
    const [loading, setLoading] = useState(false)
    const [fetchLoading, setFetchLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchLanguage = async () => {
            try {
                const data: Language = await apiClient.get(`/admin/languages/${id}`)
                setFormData({
                    name: data.name,
                    summary: data.summary || '',
                    ranking: data.ranking?.toString() || ''
                })
            } catch (err: any) {
                setError(err.message)
            } finally {
                setFetchLoading(false)
            }
        }

        if (id) {
            fetchLanguage()
        }
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await apiClient.put(`/admin/languages/${id}`, {
                ...formData,
                ranking: formData.ranking ? parseInt(formData.ranking) : null
            })
            router.push('/admin/languages')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    if (fetchLoading) {
        return <div className="container mx-auto py-8">Loading...</div>
    }

    return (
        <div className="container mx-auto py-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Edit Language</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="summary">Summary</Label>
                            <Textarea
                                id="summary"
                                name="summary"
                                value={formData.summary}
                                onChange={handleChange}
                                rows={4}
                            />
                        </div>

                        <div>
                            <Label htmlFor="ranking">Ranking</Label>
                            <Input
                                id="ranking"
                                name="ranking"
                                type="number"
                                value={formData.ranking}
                                onChange={handleChange}
                            />
                        </div>

                        {error && (
                            <div className="text-red-600 text-sm">{error}</div>
                        )}

                        <div className="flex gap-4">
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Updating...' : 'Update Language'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push('/admin/languages')}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
