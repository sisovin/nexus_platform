import TestimonialForm from '../components/sections/TestimonialForm'

export default function TestimonialsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Share Your Testimonial
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Help others discover great programming languages by sharing your experience.
                        Your feedback makes a difference in the developer community.
                    </p>
                </div>

                <TestimonialForm />
            </div>
        </div>
    )
}
