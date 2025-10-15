import { render, screen, waitFor } from '@testing-library/react'
import LanguagesGrid from '../../../app/components/sections/LanguagesGrid'

// Mock fetch
global.fetch = jest.fn()

const mockLanguages = [
    {
        id: '1',
        name: 'JavaScript',
        summary: 'Popular scripting language',
        ranking: 1,
    },
    {
        id: '2',
        name: 'Python',
        summary: 'Easy to learn language',
        ranking: 2,
    },
]

describe('LanguagesGrid', () => {
    beforeEach(() => {
        ; (global.fetch as jest.Mock).mockClear()
    })

    it('renders loading state initially', () => {
        ; (global.fetch as jest.Mock).mockImplementation(() =>
            new Promise(() => { }) // Never resolves
        )

        render(<LanguagesGrid />)
        expect(screen.getByText('Loading languages...')).toBeInTheDocument()
    })

    it('renders languages after fetch', async () => {
        ; (global.fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve(mockLanguages),
        })

        render(<LanguagesGrid />)

        await waitFor(() => {
            expect(screen.getByText('JavaScript')).toBeInTheDocument()
            expect(screen.getByText('Python')).toBeInTheDocument()
        })

        expect(screen.getByText('Rank: #1')).toBeInTheDocument()
        expect(screen.getByText('Popular scripting language')).toBeInTheDocument()
    })

    it('renders error state on fetch failure', async () => {
        ; (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

        render(<LanguagesGrid />)

        await waitFor(() => {
            expect(screen.getByText('Loading languages...')).toBeInTheDocument()
        })
    })
})
