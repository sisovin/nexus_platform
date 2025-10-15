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
import { Checkbox } from '@/components/ui/checkbox'
import { Github, Mail, Eye, EyeOff, Chrome, CheckCircle } from 'lucide-react'

export default function SignupPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // Basic validation
        if (!formData.name || !formData.email || !formData.password) {
            setError('Please fill in all required fields')
            setLoading(false)
            return
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long')
            setLoading(false)
            return
        }

        if (!formData.agreeToTerms) {
            setError('Please agree to the terms and conditions')
            setLoading(false)
            return
        }

        try {
            // TODO: Implement actual signup API call
            console.log('Signup data:', formData)

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            setSuccess(true)
            setTimeout(() => {
                router.push('/signin')
            }, 2000)
        } catch (err) {
            setError('Failed to create account. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleSocialSignup = (provider: 'github' | 'google') => {
        // TODO: Implement social authentication
        console.log(`Signup with ${provider}`)
        // This would typically redirect to OAuth provider
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-4xl md:max-w-md">
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h2>
                            <p className="text-gray-600 mb-4">
                                Your account has been successfully created. Redirecting to sign in...
                            </p>
                            <Button asChild>
                                <Link href="/signin">Go to Sign In</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
                    <CardDescription className="text-center">
                        Join Nexus Platform to start your programming journey
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
                            onClick={() => handleSocialSignup('github')}
                            type="button"
                        >
                            <Github className="h-4 w-4 mr-2" />
                            Continue with GitHub
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handleSocialSignup('google')}
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

                    {/* Email Signup Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

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
                                    placeholder="Create a password"
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

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="agreeToTerms"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onCheckedChange={(checked) =>
                                    setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                                }
                            />
                            <Label htmlFor="agreeToTerms" className="text-sm">
                                I agree to the{' '}
                                <Link href="/terms" className="text-blue-600 hover:underline">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-blue-600 hover:underline">
                                    Privacy Policy
                                </Link>
                            </Label>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Create Account
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="text-center text-sm">
                        <span className="text-gray-600">Already have an account? </span>
                        <Link href="/signin" className="text-blue-600 hover:underline font-medium">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
