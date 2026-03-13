import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, PieChart, History, MessageSquare, Shield, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

const Layout = ({ children }) => {
    const { signOut, profile } = useAuth()
    const location = useLocation()

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
        <div className="layout-grid" style={{ minHeight: '100vh', background: 'var(--background)' }}>

            {/* Desktop Sidebar */}
            <aside className="sidebar desktop-only">
                <div style={{ marginBottom: '1.5rem' }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text)', letterSpacing: '-0.06em' }}>
                        FAMTRIBUTE<span style={{ color: 'var(--primary)' }}>.</span>
                    </h1>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '0.875rem 1.25rem',
                                borderRadius: '4px',
                                color: isActive(item.path) ? 'var(--text)' : 'var(--text-muted)',
                                background: isActive(item.path) ? 'var(--surface)' : 'transparent',
                                border: '1px solid ' + (isActive(item.path) ? 'var(--border)' : 'transparent'),
                                fontWeight: '700',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                transition: 'all 0.15s'
                            }}
                        >
                            <item.icon size={16} strokeWidth={isActive(item.path) ? 2.5 : 2} color={isActive(item.path) ? 'var(--primary)' : 'currentColor'} />
                            {item.label}
                            {isActive(item.path) && (
                                <motion.div layoutId="desktop-nav-active" style={{ marginLeft: 'auto', width: '2px', height: '10px', background: 'var(--primary)', borderRadius: '1px' }} />
                            )}
                        </Link>
                    ))}
                </nav>

                {profile && (
                    <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                        <div style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--surface)' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '4px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '0.875rem', color: 'white' }}>
                                {profile.full_name?.charAt(0) || 'U'}
                            </div>
                            <div style={{ flex: 1, overflow: 'hidden' }}>
                                <div style={{ fontSize: '0.8125rem', fontWeight: '800', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '-0.025em' }}>{profile.full_name.toUpperCase()}</div>
                                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', marginTop: '2px' }}>{profile.role} // AUTH_SECURED</div>
                            </div>
                            <button onClick={signOut} style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} className="hover-blue"><LogOut size={16} /></button>
                        </div>
                    </div>
                )}
            </aside>

            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Top Header (Mobile Only) */}
                <header className="mobile-only" style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'var(--background)',
                    borderBottom: '1px solid var(--border)'
                }}>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text)', letterSpacing: '-0.04em' }}>
                        FAM<span style={{ color: 'var(--primary)' }}>T.</span>
                    </h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button onClick={signOut} style={{ color: 'var(--text-muted)' }}><LogOut size={18} /></button>
                    </div>
                </header>

                {/* Main Content Area */}
                <main style={{ flex: 1, paddingBottom: '6rem', paddingTop: '2.5rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
                    <div className="container" style={{ maxWidth: '960px', width: '100%' }}>
                        {children}
                    </div>
                </main>

                {/* Bottom Navigation (Mobile Only) */}
                <nav className="mobile-only" style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '4rem',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    padding: '0 1rem',
                    zIndex: 40,
                    background: 'var(--background)',
                    borderTop: '1px solid var(--border)'
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
                                color: isActive(item.path) ? 'var(--primary)' : 'var(--text-muted)',
                                transition: 'all 0.2s',
                                position: 'relative'
                            }}
                        >
                            <item.icon size={20} strokeWidth={isActive(item.path) ? 2.5 : 2} />
                            <span style={{ fontSize: '0.6rem', fontWeight: isActive(item.path) ? '700' : '500', textTransform: 'uppercase' }}>
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )
}

export default Layout
