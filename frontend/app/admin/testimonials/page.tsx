'use client'

import { useState, useEffect } from 'react'
import { apiClient } from '../../lib/api-client'

interface Testimonial {
    id: string
    name: string
    email: string
    message: string
    status: 'PENDING' | 'APPROVED' | 'REJECTED'
    createdAt: string
    approvedAt?: string
}

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState<string>('')

    const fetchTestimonials = async () => {
        try {
            const params = filter ? `?status=${filter}` : ''
            const data = await apiClient.get(`/admin/testimonials${params}`)
            setTestimonials(data)
            setError(null)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const updateTestimonialStatus = async (id: string, status: string) => {
        try {
            await apiClient.put(`/admin/testimonials/${id}`, { status })
            // Refresh the list
            await fetchTestimonials()
        } catch (err: any) {
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchTestimonials()
    }, [filter])

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800'
            case 'APPROVED':
                return 'bg-green-100 text-green-800'
            case 'REJECTED':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Testimonial Moderation</h1>
                <div>Loading testimonials...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Testimonial Moderation</h1>
                <div className="text-red-600">Error: {error}</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Testimonial Moderation</h1>

            <div className="mb-6">
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Status
                </label>
                <select
                    id="status-filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                </select>
            </div>

            <div className="space-y-4">
                {testimonials.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        No testimonials found.
                    </div>
                ) : (
                    testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                                    <p className="text-gray-600">{testimonial.email}</p>
                                    <p className="text-sm text-gray-500">
                                        Submitted: {new Date(testimonial.createdAt).toLocaleDateString()}
                                    </p>
                                    {testimonial.approvedAt && (
                                        <p className="text-sm text-gray-500">
                                            Approved: {new Date(testimonial.approvedAt).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                        testimonial.status
                                    )}`}
                                >
                                    {testimonial.status}
                                </span>
                            </div>

                            <div className="mb-4">
                                <p className="text-gray-800 whitespace-pre-wrap">
                                    {testimonial.message}
                                </p>
                            </div>

                            {testimonial.status === 'PENDING' && (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => updateTestimonialStatus(testimonial.id, 'APPROVED')}
                                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => updateTestimonialStatus(testimonial.id, 'REJECTED')}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
