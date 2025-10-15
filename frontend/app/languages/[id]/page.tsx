import LanguageDetail from '../../components/sections/LanguageDetail'

interface PageProps {
    params: Promise<{
        id: string
    }>
}

export default async function LanguagePage({ params }: PageProps) {
    const { id } = await params

    return (
        <div className="container mx-auto px-4 py-8">
            <LanguageDetail id={id} />
        </div>
    )
}
