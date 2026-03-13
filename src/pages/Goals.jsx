import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, TrendingUp, Calendar, Plus, ChevronRight, AlertCircle, FileText, Info } from 'lucide-react'

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
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div className="flex-between">
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.04em' }}>FAMILY GOALS<span style={{ color: 'var(--primary)' }}>.</span></h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', marginTop: '4px' }}>Strategic financial targets and progress</p>
                </div>
                <button className="btn-primary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.8125rem' }}>
                    <Plus size={16} /> NEW GOAL
                </button>
            </div>

            <div className="goals-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {goals.map(goal => {
                    const progress = calculateProgress(goal.current, goal.target)
                    return (
                        <motion.div
                            key={goal.id}
                            className="glass-card"
                            style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}
                            whileHover={{ borderColor: 'var(--primary)' }}
                        >
                            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                                <span style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'var(--background)', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border)' }}>{goal.category}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                                    <Calendar size={14} />
                                    {goal.deadline}
                                </div>
                            </div>

                            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{goal.title}</h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                                {goal.description}
                            </p>

                            <div style={{ marginTop: 'auto' }}>
                                <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                                    <span style={{ fontSize: '1.125rem', fontWeight: '800' }}>₦{goal.current.toLocaleString()}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>OF ₦{goal.target.toLocaleString()}</span>
                                </div>
                                <div style={{ height: '6px', background: 'var(--background)', borderRadius: '3px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1, ease: 'easeOut' }}
                                        style={{
                                            height: '100%',
                                            background: progress === 100 ? 'var(--success)' : 'var(--primary)',
                                        }}
                                    />
                                </div>
                                <div className="flex-between" style={{ marginTop: '0.75rem' }}>
                                    <span style={{ fontSize: '0.7rem', fontWeight: '800', color: progress === 100 ? 'var(--success)' : 'var(--primary)', textTransform: 'uppercase' }}>
                                        {progress}% FUNDED
                                    </span>
                                    <TrendingUp size={14} color={progress > 50 ? 'var(--primary)' : 'var(--text-muted)'} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
                                <button className="btn-outline" style={{ flex: 1, padding: '0.75rem', fontSize: '0.75rem', fontWeight: '800' }}>
                                    CONTRIBUTE
                                </button>
                                <button className="btn-outline" style={{ flex: 1, padding: '0.75rem', fontSize: '0.75rem', fontWeight: '800', color: 'var(--error)' }}>
                                    WITHDRAW
                                </button>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Withdrawal Note */}
            <div className="glass-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <Info size={18} color="var(--primary)" style={{ marginTop: '2px' }} />
                    <div style={{ fontSize: '0.8125rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                        <strong style={{ color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Governance Note:</strong> All financial movements within family goals are subject to the democratic voting system. One member, one vote. Final execution is authorized by the Superadmin.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Goals
