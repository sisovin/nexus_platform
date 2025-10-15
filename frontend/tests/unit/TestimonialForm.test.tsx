import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TestimonialForm from '../../../app/components/sections/TestimonialForm'

// Mock apiClient
jest.mock('../../../lib/api-client', () => ({
    apiClient: {
        post: jest.fn(),
    },
}))

const mockApiClient = require('../../../lib/api-client').apiClient

describe('TestimonialForm', () => {
    beforeEach(() => {
        mockApiClient.post.mockClear()
    })

    it('renders form fields correctly', () => {
        render(<TestimonialForm />)

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/testimonial/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /submit testimonial/i })).toBeInTheDocument()
    })

    it('shows character count for message', () => {
        render(<TestimonialForm />)

        const textarea = screen.getByLabelText(/testimonial/i)
        const charCount = screen.getByText('0/1000 characters')

        fireEvent.change(textarea, { target: { value: 'Hello world' } })

        expect(screen.getByText('11/1000 characters')).toBeInTheDocument()
    })

    it('submits form successfully', async () => {
        mockApiClient.post.mockResolvedValue({})

        render(<TestimonialForm />)

        const nameInput = screen.getByLabelText(/name/i)
        const emailInput = screen.getByLabelText(/email/i)
        const messageInput = screen.getByLabelText(/testimonial/i)
        const submitButton = screen.getByRole('button', { name: /submit testimonial/i })

        fireEvent.change(nameInput, { target: { value: 'John Doe' } })
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
        fireEvent.change(messageInput, { target: { value: 'Great platform!' } })

        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(mockApiClient.post).toHaveBeenCalledWith('/testimonials', {
                name: 'John Doe',
                email: 'john@example.com',
                message: 'Great platform!',
            })
        })

        expect(screen.getByText(/thank you for your testimonial/i)).toBeInTheDocument()
    })

    it('shows error message on submission failure', async () => {
        mockApiClient.post.mockRejectedValue(new Error('Network error'))

        render(<TestimonialForm />)

        const nameInput = screen.getByLabelText(/name/i)
        const emailInput = screen.getByLabelText(/email/i)
        const messageInput = screen.getByLabelText(/testimonial/i)
        const submitButton = screen.getByRole('button', { name: /submit testimonial/i })

        fireEvent.change(nameInput, { target: { value: 'John Doe' } })
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
        fireEvent.change(messageInput, { target: { value: 'Great platform!' } })

        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(screen.getByText(/failed to submit testimonial/i)).toBeInTheDocument()
        })
    })

    it('resets form after successful submission', async () => {
        mockApiClient.post.mockResolvedValue({})

        render(<TestimonialForm />)

        const nameInput = screen.getByLabelText(/name/i)
        const emailInput = screen.getByLabelText(/email/i)
        const messageInput = screen.getByLabelText(/testimonial/i)

        fireEvent.change(nameInput, { target: { value: 'John Doe' } })
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
        fireEvent.change(messageInput, { target: { value: 'Great platform!' } })

        fireEvent.click(screen.getByRole('button', { name: /submit testimonial/i }))

        await waitFor(() => {
            expect(nameInput).toHaveValue('')
            expect(emailInput).toHaveValue('')
            expect(messageInput).toHaveValue('')
        })
    })

    it('validates required fields', () => {
        render(<TestimonialForm />)

        const submitButton = screen.getByRole('button', { name: /submit testimonial/i })

        fireEvent.click(submitButton)

        // HTML5 validation should prevent submission
        expect(mockApiClient.post).not.toHaveBeenCalled()
    })

    it('disables submit button during submission', async () => {
        mockApiClient.post.mockImplementation(() => new Promise(() => { })) // Never resolves

        render(<TestimonialForm />)

        const nameInput = screen.getByLabelText(/name/i)
        const emailInput = screen.getByLabelText(/email/i)
        const messageInput = screen.getByLabelText(/testimonial/i)
        const submitButton = screen.getByRole('button', { name: /submit testimonial/i })

        fireEvent.change(nameInput, { target: { value: 'John Doe' } })
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
        fireEvent.change(messageInput, { target: { value: 'Great platform!' } })

        fireEvent.click(submitButton)

        expect(submitButton).toBeDisabled()
        expect(submitButton).toHaveTextContent('Submitting...')
    })
})
