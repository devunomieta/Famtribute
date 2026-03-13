import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, CreditCard, Send, TrendingUp, Gift, Calendar, ChevronRight, FolderLock, User, PieChart, History as HistoryIcon, Activity, Zap, ShieldCheck, Megaphone, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import ContributionModal from '../components/ContributionModal'

const Dashboard = () => {
    const { profile } = useAuth()
    const [isContributionOpen, setIsContributionOpen] = useState(false)
    const [balance, setBalance] = useState(1250000.00)
    const [showNotice, setShowNotice] = useState(true)
    const [notice, setNotice] = useState({
        title: "SYSTEM UPGRADE COMPLETED",
        message: "We have successfully migrated to the new monochrome high-performance infrastructure. Enjoy the new experience!",
        type: "info"
    })

    const [recentTransactions, setRecentTransactions] = useState([
        { id: 1, name: 'Tobi Adebayo', amount: 50000, reason: 'Family Reunion', date: '2026-03-10', status: 'confirmed' },
        { id: 2, name: 'Sola Williams', amount: 25000, reason: 'Monthly Contribution', date: '2026-03-08', status: 'confirmed' },
        { id: 3, name: 'Uncle Segun', amount: 100000, reason: 'Emergency Fund', date: '2026-03-05', status: 'confirmed' },
    ])

    const [upcomingBirthdays, setUpcomingBirthdays] = useState([
        { name: 'Sola Williams', date: 'March 15', age: 32 },
        { name: 'Uncle Segun', date: 'March 20', age: 55 },
    ])

    return (
        <div className="animate-fade-in dashboard-layout">

            {/* Column 1: Primary Content Feed (1fr) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Notice Banner */}
                <AnimatePresence>
                    {showNotice && notice && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            style={{
                                background: 'rgba(59, 130, 246, 0.1)',
                                border: '1px solid var(--primary)',
                                borderRadius: '4px',
                                padding: '1rem 1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                position: 'relative'
                            }}
                        >
                            <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '4px', color: 'white' }}>
                                <Megaphone size={16} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.65rem', fontWeight: '900', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>{notice.title}</div>
                                <div style={{ fontSize: '0.8125rem', color: 'var(--text)', fontWeight: '500' }}>{notice.message}</div>
                            </div>
                            <button onClick={() => setShowNotice(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }} className="hover-blue">
                                <X size={16} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pro Hero Card */}
                <div style={{
                    background: 'var(--primary)',
                    padding: '2.5rem',
                    borderRadius: '4px',
                    position: 'relative',
                    overflow: 'hidden',
                    color: 'white',
                    boxShadow: '0 20px 50px -20px rgba(59, 130, 246, 0.4)'
                }}>
                    <div style={{ position: 'relative', z_index: 1 }}>
                        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <ShieldCheck size={16} />
                                <span style={{ fontSize: '0.6rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Treasury Active</span>
                            </div>
                            <Activity size={16} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
                            <div>
                                <div style={{ fontSize: '0.65rem', opacity: 0.8, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Total Liquidity</div>
                                <div style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-0.05em', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                    <span style={{ fontSize: '1.5rem', opacity: 0.7 }}>₦</span>
                                    {balance.toLocaleString()}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button
                                    onClick={() => setIsContributionOpen(true)}
                                    style={{ background: 'white', color: 'var(--primary)', border: 'none', padding: '0.875rem 1.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                    className="hover-scale"
                                >
                                    <Plus size={14} /> ADD FUNDS
                                </button>
                                <button
                                    style={{ background: 'rgba(0,0,0,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '0.875rem 1.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}
                                    className="hover-border-white"
                                >
                                    PAYOUT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vertical Transaction Stream */}
                <div className="glass-card" style={{ padding: '0', border: '1px solid var(--border)', overflow: 'hidden' }}>
                    <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <TrendingUp size={14} color="var(--primary)" />
                            <h3 style={{ fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contribution Feed</h3>
                        </div>
                        <Link to="/history" style={{ fontSize: '0.6rem', color: 'var(--primary)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Archives</Link>
                    </div>
                    <div>
                        {recentTransactions.map((tx, idx) => (
                            <div key={tx.id} style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 140px 120px',
                                alignItems: 'center',
                                padding: '1.25rem 1.5rem',
                                borderBottom: idx === recentTransactions.length - 1 ? 'none' : '1px solid var(--border)',
                                transition: 'background 0.2s'
                            }} className="hover-surface">
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', minWidth: 0 }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '4px', background: 'var(--background)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <User size={16} color="var(--primary)" />
                                    </div>
                                    <div style={{ overflow: 'hidden' }}>
                                        <div style={{ fontSize: '0.875rem', fontWeight: '800', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.name.toUpperCase()}</div>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em', marginTop: '1px' }}>{tx.reason}</div>
                                    </div>
                                </div>
                                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
                                    T_{tx.id} // OK
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '1rem', fontWeight: '900', color: 'var(--success)', letterSpacing: '-0.02em' }}>+₦{tx.amount.toLocaleString()}</div>
                                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '2px', fontWeight: '800' }}>{tx.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Column 2: Utility Sidebar (340px) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Goal Widget */}
                <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                        <Zap size={14} color="var(--primary)" />
                        <h3 style={{ fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Primary Goal</h3>
                    </div>
                    <div style={{ fontSize: '1.125rem', fontWeight: '900', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>YEARLY REUNION</div>
                    <div style={{ height: '3px', background: 'var(--background)', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '0.75rem' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '75%' }}
                            style={{ height: '100%', background: 'var(--primary)' }}
                        />
                    </div>
                    <div className="flex-between">
                        <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase' }}>75% COMPLETE</span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: '900' }}>FUNDING_OK</span>
                    </div>
                </div>

                {/* Milestone Carousel */}
                <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                        <Gift size={14} color="var(--primary)" />
                        <h3 style={{ fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Milestones</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {upcomingBirthdays.map((bday, i) => (
                            <div key={i} style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '1rem' }}>
                                <div style={{ fontSize: '0.8125rem', fontWeight: '800' }}>{bday.name.toUpperCase()}</div>
                                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '2px', textTransform: 'uppercase', fontWeight: '700' }}>{bday.date} // {bday.age} YRS</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Diagnostics */}
                <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid var(--border)', background: 'var(--surface)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                        <Activity size={12} color="var(--success)" />
                        <h4 style={{ fontSize: '0.55rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Node Status</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div className="flex-between" style={{ fontSize: '0.6rem' }}>
                            <span style={{ color: 'var(--text-muted)', fontWeight: '800' }}>SIGNAL</span>
                            <span style={{ fontWeight: '900', color: 'var(--success)' }}>STABLE</span>
                        </div>
                        <div className="flex-between" style={{ fontSize: '0.6rem' }}>
                            <span style={{ color: 'var(--text-muted)', fontWeight: '800' }}>ENCRYPTION</span>
                            <span style={{ fontWeight: '900' }}>SSL_TLS</span>
                        </div>
                        <div className="flex-between" style={{ fontSize: '0.6rem' }}>
                            <span style={{ color: 'var(--text-muted)', fontWeight: '800' }}>CONNECTED</span>
                            <span style={{ fontWeight: '900' }}>NG_LAG_01</span>
                        </div>
                    </div>
                </div>

                {/* Quick Shortcuts */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                    <Link to="/vault" className="glass-card flex-center" style={{ padding: '1.25rem 0', flexDirection: 'column', gap: '0.4rem', border: '1px solid var(--border)' }}>
                        <FolderLock size={18} color="var(--primary)" />
                        <span style={{ fontSize: '0.55rem', fontWeight: '900', textTransform: 'uppercase' }}>Vault</span>
                    </Link>
                    <Link to="/timeline" className="glass-card flex-center" style={{ padding: '1.25rem 0', flexDirection: 'column', gap: '0.4rem', border: '1px solid var(--border)' }}>
                        <HistoryIcon size={18} color="var(--primary)" />
                        <span style={{ fontSize: '0.55rem', fontWeight: '900', textTransform: 'uppercase' }}>Log</span>
                    </Link>
                </div>
            </div>

            <ContributionModal isOpen={isContributionOpen} onClose={() => setIsContributionOpen(false)} />
        </div>
    )
}

export default Dashboard
