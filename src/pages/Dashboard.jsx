import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, CreditCard, Send, TrendingUp, Gift, Calendar, ChevronRight, FolderLock, History as HistoryIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import ContributionModal from '../components/ContributionModal'

const Dashboard = () => {
    const { profile } = useAuth()
    const [isContributionOpen, setIsContributionOpen] = useState(false)
    const [balance, setBalance] = useState(1250000.00)
    const [recentTransactions, setRecentTransactions] = useState([
        { id: 1, name: 'Tobi Adebayo', amount: 50000, reason: 'Family Reunion', date: '2026-03-10', status: 'confirmed' },
        { id: 2, name: 'Sola Williams', amount: 25000, reason: 'Monthly Contribution', date: '2026-03-08', status: 'confirmed' },
    ])
    const [upcomingBirthdays, setUpcomingBirthdays] = useState([
        { name: 'Sola Williams', date: 'March 15', age: 32 },
        { name: 'Uncle Segun', date: 'March 20', age: 55 },
    ])

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Birthday Banner */}
            <AnimatePresence>
                {upcomingBirthdays.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass"
                        style={{
                            padding: '1rem',
                            borderRadius: 'var(--radius-lg)',
                            background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1))',
                            border: '1px solid rgba(236, 72, 153, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}
                    >
                        <div style={{
                            background: 'var(--secondary)',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <Gift size={20} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: '0.875rem', fontWeight: '600' }}>Upcoming Birthdays!</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                {upcomingBirthdays[0].name} turns {upcomingBirthdays[0].age} on {upcomingBirthdays[0].date}.
                            </p>
                        </div>
                        <button style={{ color: 'var(--secondary)', fontSize: '0.75rem', fontWeight: '600' }}>
                            View All
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Balance Card */}
            <div className="glass-card" style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decor */}
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '150px', height: '150px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div className="flex-between">
                        <span style={{ fontSize: '0.875rem', opacity: 0.8, fontWeight: '500' }}>Current Family Balance</span>
                        <TrendingUp size={20} style={{ opacity: 0.8 }} />
                    </div>
                    <div style={{ fontSize: '2.75rem', fontWeight: '700', margin: '0.75rem 0' }}>
                        ₦ {balance.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                        Updated 5 mins ago
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid-cols-2">
                <button
                    onClick={() => setIsContributionOpen(true)}
                    className="glass-card flex-center"
                    style={{ padding: '1rem', gap: '0.5rem', border: '1px solid var(--primary)' }}
                >
                    <CreditCard size={20} color="var(--primary)" />
                    <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>Contribute</span>
                </button>
                <button className="glass-card flex-center" style={{ padding: '1rem', gap: '0.5rem', border: '1px solid var(--secondary)' }}>
                    <Send size={20} color="var(--secondary)" />
                    <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>Withdraw</span>
                </button>
            </div>

            {/* Recent Activity */}
            <div className="glass-card" style={{ padding: '1.25rem' }}>
                <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.125rem' }}>Recent Activity</h3>
                    <button style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: '600' }}>View History</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {recentTransactions.map((tx) => (
                        <div key={tx.id} className="flex-between" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.05)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <User size={18} color="var(--text-muted)" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.925rem', fontWeight: '600' }}>{tx.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tx.reason}</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.925rem', fontWeight: '700', color: 'var(--success)' }}>+₦{tx.amount.toLocaleString()}</div>
                                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{tx.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Links Grid */}
            <div className="grid-cols-2" style={{ marginBottom: '1rem' }}>
                <Link to="/vault" className="glass-card flex-center" style={{ padding: '1rem', gap: '0.5rem', background: 'rgba(255,255,255,0.03)' }}>
                    <FolderLock size={20} color="var(--primary)" />
                    <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>Vault</span>
                </Link>
                <Link to="/timeline" className="glass-card flex-center" style={{ padding: '1rem', gap: '0.5rem', background: 'rgba(255,255,255,0.03)' }}>
                    <HistoryIcon size={20} color="var(--secondary)" />
                    <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>Timeline</span>
                </Link>
            </div>

            {/* Goal Summary (Small card) */}
            <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(139, 92, 246, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent)'
                }}>
                    <PieChart size={24} />
                </div>
                <div style={{ flex: 1 }}>
                    <div className="flex-between">
                        <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>Yearly Reunion Goal</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>75%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '0.5rem', overflow: 'hidden' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '75%' }}
                            style={{ height: '100%', background: 'var(--accent)' }}
                        />
                    </div>
                </div>
                <ChevronRight size={18} color="var(--text-muted)" />
            </div>

            <ContributionModal
                isOpen={isContributionOpen}
                onClose={() => setIsContributionOpen(false)}
            />

        </div>
    )
}

export default Dashboard
