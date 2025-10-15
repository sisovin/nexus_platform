import LanguageDetail from '../../components/sections/LanguageDetail'

interface PageProps {
    params: {
        id: string
    }
}

export default function LanguagePage({ params }: PageProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            <LanguageDetail id={params.id} />
        </div>
    )
}
