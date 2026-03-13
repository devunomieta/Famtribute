import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, PieChart, History, MessageSquare, Shield, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

const Layout = ({ children }) => {
    const { signOut, profile } = useAuth()
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

    const navItems = [
        { label: 'Home', icon: Home, path: '/dashboard' },
        { label: 'Goals', icon: PieChart, path: '/goals' },
        { label: 'History', icon: History, path: '/history' },
        { label: 'Social', icon: MessageSquare, path: '/social' },
    ]

    if (profile?.role === 'admin') {
        navItems.push({ label: 'Admin', icon: Shield, path: '/admin' })
    }

    const isActive = (path) => location.pathname === path

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Top Header */}
            <header className="glass" style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--glass-border)'
            }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '700', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Famtribute
                </h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {profile && (
                        <div className="flex-center" style={{ gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-muted)', display: 'none' }}>
                                {profile.full_name}
                            </span>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: 'var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                fontWeight: '700'
                            }}>
                                {profile.full_name?.charAt(0) || 'U'}
                            </div>
                        </div>
                    )}
                    <button onClick={signOut} style={{ color: 'var(--text-muted)' }}>
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main style={{ flex: 1, paddingBottom: '5rem', paddingTop: '1rem' }}>
                <div className="container">
                    {children}
                </div>
            </main>

            {/* Bottom Navigation for Mobile */}
            <nav className="glass" style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                height: '4.5rem',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '0 1rem',
                zIndex: 40,
                borderTop: '1px solid var(--glass-border)',
                backdropFilter: 'blur(20px)'
            }}>
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '8px',
                            color: isActive(item.path) ? 'var(--primary)' : 'var(--text-muted)',
                            transition: 'all 0.2s'
                        }}
                    >
                        <item.icon size={22} strokeWidth={isActive(item.path) ? 2.5 : 2} />
                        <span style={{ fontSize: '0.65rem', fontWeight: isActive(item.path) ? '700' : '500' }}>
                            {item.label}
                        </span>
                        {isActive(item.path) && (
                            <motion.div
                                layoutId="nav-indicator"
                                style={{
                                    position: 'absolute',
                                    top: '-1px',
                                    width: '20px',
                                    height: '3px',
                                    background: 'var(--primary)',
                                    borderRadius: '0 0 100px 100px'
                                }}
                            />
                        )}
                    </Link>
                ))}
            </nav>
        </div>
    )
}

export default Layout
