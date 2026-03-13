import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [initError, setInitError] = useState(null)

    useEffect(() => {
        console.log('AuthContext: Initializing...')

        const fetchSession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession()
                if (error) throw error

                console.log('AuthContext: Session fetched', session ? 'User logged in' : 'No session')
                setUser(session?.user ?? null)
                if (session?.user) {
                    await fetchProfile(session.user.id)
                } else {
                    setLoading(false)
                }
            } catch (err) {
                console.error('AuthContext: Initialization error', err)
                setInitError(err.message)
                setLoading(false)
            }
        }

        fetchSession()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            console.log('AuthContext: Auth state changed', _event)
            setUser(session?.user ?? null)
            if (session?.user) {
                fetchProfile(session.user.id)
            } else {
                setProfile(null)
                setLoading(false)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const fetchProfile = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single()

            if (error) {
                console.warn('AuthContext: Profile fetch error (expected if table missing)', error.message)
            }
            setProfile(data)
        } catch (error) {
            console.error('AuthContext: Profile error', error.message)
        } finally {
            setLoading(false)
        }
    }

    const signOut = () => supabase.auth.signOut()

    if (loading) {
        return (
            <div className="flex-center" style={{ height: '100vh', flexDirection: 'column', gap: '1rem', background: 'var(--background)', color: 'white' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid var(--glass-border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Verifying family access...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        )
    }

    if (initError) {
        return (
            <div className="container flex-center" style={{ height: '100vh', flexDirection: 'column', gap: '1rem', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--error)' }}>Initialization Error</h2>
                <p style={{ color: 'var(--text-muted)' }}>{initError}</p>
                <p style={{ fontSize: '0.875rem' }}>Please check if your Supabase URL and Key are correct in the .env file.</p>
                <button onClick={() => window.location.reload()} style={{ padding: '0.5rem 1rem', background: 'var(--primary)', borderRadius: 'var(--radius-md)', color: 'white', fontWeight: '600' }}>Retry</button>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ user, profile, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
