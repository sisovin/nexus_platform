'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiClient } from '../../../lib/api-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CreateLanguage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        summary: '',
        ranking: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await apiClient.post('/admin/languages', {
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

    return (
        <div className="container mx-auto py-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Create New Language</CardTitle>
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
                                {loading ? 'Creating...' : 'Create Language'}
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
