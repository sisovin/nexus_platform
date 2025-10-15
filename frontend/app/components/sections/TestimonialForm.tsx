'use client'

import { useState } from 'react'
import { apiClient } from '../../lib/api-client'

interface TestimonialFormData {
    name: string
    email: string
    message: string
}

export default function TestimonialForm() {
    const [formData, setFormData] = useState<TestimonialFormData>({
        name: '',
        email: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null
        message: string
    }>({ type: null, message: '' })

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus({ type: null, message: '' })

        try {
            await apiClient.post('/testimonials', formData)

            setSubmitStatus({
                type: 'success',
                message: 'Thank you for your testimonial! It will be reviewed before being published.',
            })

            // Reset form
            setFormData({ name: '', email: '', message: '' })
        } catch (error: any) {
            setSubmitStatus({
                type: 'error',
                message: error.message || 'Failed to submit testimonial. Please try again.',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Share Your Experience</h2>
            <p className="text-gray-600 mb-6 text-center">
                We'd love to hear about your experience with programming languages.
                Your testimonial helps others in their learning journey.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                        minLength={2}
                        maxLength={100}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your full name"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Testimonial *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        minLength={10}
                        maxLength={1000}
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                        placeholder="Share your experience with programming languages..."
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        {formData.message.length}/1000 characters
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
                </button>
            </form>

            {submitStatus.type && (
                <div
                    className={`mt-4 p-4 rounded-md ${submitStatus.type === 'success'
                            ? 'bg-green-50 text-green-800 border border-green-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                        }`}
                >
                    {submitStatus.message}
                </div>
            )}
        </div>
    )
}
