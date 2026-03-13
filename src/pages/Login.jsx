import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { LogIn, UserPlus, Mail, Lock, User, Calendar, ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        birthday: ''
    })

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (isLogin) {
                const { error: authError } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                })
                if (authError) throw authError
                navigate('/dashboard')
            } else {
                const { error: signUpError } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.fullName,
                            birthday: formData.birthday,
                        }
                    }
                })
                if (signUpError) throw signUpError
                alert('Verification email sent! Please check your inbox.')
                setIsLogin(true)
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container flex-center" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{ width: '100%', maxWidth: '400px' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Famtribute
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        {isLogin ? 'Welcome back, family!' : 'Join the family platform'}
                    </p>
                </div>

                {error && (
                    <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error)', borderRadius: 'var(--radius-md)', color: 'var(--error)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div style={{ marginBottom: '1rem' }}>
                                <label><User size={14} style={{ marginRight: '4px' }} /> Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="John Doe"
                                    required
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label><Calendar size={14} style={{ marginRight: '4px' }} /> Birthday</label>
                                <input
                                    type="date"
                                    name="birthday"
                                    required
                                    value={formData.birthday}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    )}

                    <div style={{ marginBottom: '1rem' }}>
                        <label><Mail size={14} style={{ marginRight: '4px' }} /> Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="family@example.com"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label><Lock size={14} style={{ marginRight: '4px' }} /> Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-center"
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            background: 'var(--primary)',
                            color: 'white',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: '600',
                            gap: '8px'
                        }}
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                    </span>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ color: 'var(--secondary)', fontWeight: '600' }}
                    >
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default Login
