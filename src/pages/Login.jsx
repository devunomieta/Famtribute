import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
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
                toast.success('Access Granted')
                navigate('/dashboard')
            } else {
                const { error: signUpError } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.fullName,
                            birthday: formData.birthday,
                        },
                        redirectTo: `${window.location.origin}/dashboard`
                    }
                })
                if (signUpError) throw signUpError
                toast.success('Verification signal sent. Check inbox.', { duration: 5000 })
                setIsLogin(true)
            }
        } catch (err) {
            toast.error(err.message)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container flex-center" style={{ minHeight: '100vh', padding: '2rem 1rem', background: 'var(--background)' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card"
                style={{ width: '100%', maxWidth: '420px', padding: '3rem', border: '1px solid var(--border)' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '48px',
                        height: '48px',
                        background: 'var(--primary)',
                        borderRadius: '4px',
                        marginBottom: '1.5rem',
                        color: 'white'
                    }}>
                        <LogIn size={24} />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-0.05em' }}>
                        FAMTRIBUTE<span style={{ color: 'var(--primary)' }}>.</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {isLogin ? 'Authentication Protocol' : 'Registration Protocol'}
                    </p>
                </div>

                {error && (
                    <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid var(--error)', borderRadius: '4px', color: 'var(--error)', fontSize: '0.75rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center' }}>
                        ERROR: {error.toUpperCase()}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {!isLogin && (
                        <>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px', color: 'var(--text-muted)' }}>
                                    <User size={12} color="var(--primary)" /> Full Name
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter legal name"
                                    required
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px', color: 'var(--text-muted)' }}>
                                    <Calendar size={12} color="var(--primary)" /> Birthday
                                </label>
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

                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px', color: 'var(--text-muted)' }}>
                            <Mail size={12} color="var(--primary)" /> Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="user@network.com"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px', color: 'var(--text-muted)' }}>
                            <Lock size={12} color="var(--primary)" /> Password
                        </label>
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
                        className="btn-primary"
                        style={{
                            marginTop: '1rem',
                            height: '3.5rem',
                            fontSize: '0.875rem',
                            fontWeight: '800',
                            letterSpacing: '0.05em'
                        }}
                    >
                        {loading ? 'PROCESSING...' : (isLogin ? 'INITIALIZE LOGIN' : 'CREATE ACCOUNT')}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <div style={{ marginTop: '2.5rem', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                        {isLogin ? "NEW TO THE NETWORK?" : "ALREADY REGISTERED?"}
                    </p>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.8125rem', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                    >
                        {isLogin ? 'Request Access' : 'Return to Login'}
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default Login
