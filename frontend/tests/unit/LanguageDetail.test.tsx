import { render, screen, waitFor } from '@testing-library/react'
import LanguageDetail from '../../../app/components/sections/LanguageDetail'

// Mock fetch
global.fetch = jest.fn()

const mockLanguage = {
    id: '1',
    name: 'JavaScript',
    summary: 'Popular scripting language',
    ranking: 1,
    trendData: null,
    resources: ['https://example.com'],
    images: [],
}

describe('LanguageDetail', () => {
    beforeEach(() => {
        ; (global.fetch as jest.Mock).mockClear()
    })

    it('renders loading state initially', () => {
        ; (global.fetch as jest.Mock).mockImplementation(() =>
            new Promise(() => { }) // Never resolves
        )

        render(<LanguageDetail id="1" />)
        expect(screen.getByText('Loading language details...')).toBeInTheDocument()
    })

    it('renders language details after fetch', async () => {
        ; (global.fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve(mockLanguage),
        })

        render(<LanguageDetail id="1" />)

        await waitFor(() => {
            expect(screen.getByText('JavaScript')).toBeInTheDocument()
            expect(screen.getByText('Ranking: #1')).toBeInTheDocument()
            expect(screen.getByText('Popular scripting language')).toBeInTheDocument()
        })
    })

    it('renders not found for missing language', async () => {
        ; (global.fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve(null),
        })

        render(<LanguageDetail id="1" />)

        await waitFor(() => {
            expect(screen.getByText('Language not found')).toBeInTheDocument()
        })
    })
})
