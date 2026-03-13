import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, TrendingUp, Calendar, Plus, ChevronRight, AlertCircle, FileText } from 'lucide-react'

const Goals = () => {
    const [goals, setGoals] = useState([
        {
            id: 1,
            title: 'Yearly Family Reunion',
            description: 'Funding for our 2026 family getaway in December.',
            target: 2000000,
            current: 1500000,
            deadline: '2026-11-30',
            category: 'Event'
        },
        {
            id: 2,
            title: 'Emergency Medical Fund',
            description: 'Standing reserve for family medical emergencies.',
            target: 5000000,
            current: 1250000,
            deadline: 'Ongoing',
            category: 'Emergency'
        },
        {
            id: 3,
            title: 'Family Property Maintenance',
            description: 'Annual upkeep of the family house.',
            target: 800000,
            current: 600000,
            deadline: '2026-06-15',
            category: 'Maintenance'
        }
    ])

    const calculateProgress = (current, target) => {
        return Math.min(Math.round((current / target) * 100), 100)
    }

    return (
        <div className="animate-fade-in">
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Family Goals</h2>
                <button className="flex-center" style={{ gap: '6px', fontSize: '0.875rem', padding: '0.5rem 0.75rem', background: 'var(--primary)', borderRadius: 'var(--radius-md)', fontWeight: '600' }}>
                    <Plus size={18} />
                    New Goal
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {goals.map(goal => {
                    const progress = calculateProgress(goal.current, goal.target)
                    return (
                        <motion.div
                            key={goal.id}
                            className="glass-card"
                            style={{ padding: '1.25rem' }}
                            whileHover={{ scale: 1.01 }}
                        >
                            <div className="flex-between" style={{ marginBottom: '1rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{goal.category}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    <Calendar size={14} />
                                    {goal.deadline}
                                </div>
                            </div>

                            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{goal.title}</h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                                {goal.description}
                            </p>

                            <div style={{ marginBottom: '0.75rem' }}>
                                <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '0.875rem', fontWeight: '700' }}>₦ {goal.current.toLocaleString()}</span>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Target: ₦ {goal.target.toLocaleString()}</span>
                                </div>
                                <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1, ease: 'easeOut' }}
                                        style={{
                                            height: '100%',
                                            background: progress === 100 ? 'var(--success)' : 'linear-gradient(to right, var(--primary), var(--accent))',
                                            borderRadius: '4px'
                                        }}
                                    />
                                </div>
                                <div style={{ textAlign: 'right', marginTop: '4px', fontSize: '0.75rem', fontWeight: '600', color: progress === 100 ? 'var(--success)' : 'var(--text-muted)' }}>
                                    {progress}% Funded
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                                <button style={{ flex: 1, padding: '0.625rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', fontWeight: '600', border: '1px solid var(--glass-border)' }}>
                                    Contribute
                                </button>
                                <button style={{ flex: 1, padding: '0.625rem', background: 'rgba(239, 68, 68, 0.05)', color: 'var(--error)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', fontWeight: '600', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                                    Request Withdrawal
                                </button>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Withdrawal Logic Summary */}
            <div className="glass-card" style={{ marginTop: '2rem', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Info size={20} color="var(--warning)" style={{ flexShrink: 0 }} />
                    <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--warning)', marginBottom: '0.25rem' }}>Note on Withdrawals</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                            All withdrawal requests must state a clear cause and are subject to family approval (One member, one vote). Admins will verify the final payout.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Goals
