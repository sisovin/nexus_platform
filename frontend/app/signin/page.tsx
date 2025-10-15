'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Github, Mail, Eye, EyeOff, Chrome } from 'lucide-react'

export default function SigninPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // Basic validation
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields')
            setLoading(false)
            return
        }

        try {
            // TODO: Implement actual signin API call
            console.log('Signin data:', formData)

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Redirect to dashboard or home
            router.push('/')
        } catch (err) {
            setError('Invalid email or password')
        } finally {
            setLoading(false)
        }
    }

    const handleSocialSignin = (provider: 'github' | 'google') => {
        // TODO: Implement social authentication
        console.log(`Signin with ${provider}`)
        // This would typically redirect to OAuth provider
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
                    <CardDescription className="text-center">
                        Sign in to your Nexus Platform account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Social Authentication */}
                    <div className="space-y-3">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handleSocialSignin('github')}
                            type="button"
                        >
                            <Github className="h-4 w-4 mr-2" />
                            Continue with GitHub
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handleSocialSignin('google')}
                            type="button"
                        >
                            <Chrome className="h-4 w-4 mr-2" />
                            Continue with Google
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
                        </div>
                    </div>

                    {/* Email Signin Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Sign In
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="text-center text-sm">
                        <span className="text-gray-600">Don't have an account? </span>
                        <Link href="/signup" className="text-blue-600 hover:underline font-medium">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
