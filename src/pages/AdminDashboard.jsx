import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, CheckCircle, XCircle, Clock, ShieldCheck, UserPlus, Eye, Download } from 'lucide-react'

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('verifications') // verifications, members, withdrawals

    const pendingPayments = [
        { id: 1, name: 'Sola Williams', amount: 50000, date: '2026-03-12', reason: 'General Monthly', receiptUrl: '#' },
        { id: 2, name: 'Uncle Segun', amount: 100000, date: '2026-03-11', reason: 'Emergency Fund', receiptUrl: '#' },
    ]

    const members = [
        { id: 1, name: 'Tobi Adebayo', email: 'tobi@example.com', role: 'Staff', joined: '2026-01-15' },
        { id: 2, name: 'Sola Williams', email: 'sola@example.com', role: 'Member', joined: '2026-01-20' },
        { id: 3, name: 'Admin User', email: 'admin@famtribute.com', role: 'Superadmin', joined: '2026-01-01' },
    ]

    const withdrawalRequests = [
        { id: 1, name: 'Ayo Johnson', amount: 150000, cause: 'Hospital Bills', approvedBy: 5, totalMembers: 12, status: 'voting' },
    ]

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>Admin Console</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Overview and system governance</p>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                <div className="glass-card" style={{ padding: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Pending Verifications</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{pendingPayments.length}</div>
                </div>
                <div className="glass-card" style={{ padding: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Active Members</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{members.length}</div>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                {['Verifications', 'Members', 'Withdrawals'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        style={{
                            padding: '0.5rem 1rem',
                            fontWeight: '600',
                            color: activeTab === tab.toLowerCase() ? 'var(--primary)' : 'var(--text-muted)',
                            position: 'relative',
                            fontSize: '0.875rem'
                        }}
                    >
                        {tab}
                        {activeTab === tab.toLowerCase() && <motion.div layoutId="admin-tab" style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '2px', background: 'var(--primary)' }} />}
                    </button>
                ))}
            </div>

            <div style={{ minHeight: '300px' }}>
                {activeTab === 'verifications' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {pendingPayments.map(payment => (
                            <div key={payment.id} className="glass-card" style={{ padding: '1.25rem' }}>
                                <div className="flex-between" style={{ marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Clock size={20} color="var(--warning)" />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600' }}>{payment.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{payment.date}</div>
                                        </div>
                                    </div>
                                    <div style={{ fontWeight: '700', color: 'var(--primary)' }}>₦{payment.amount.toLocaleString()}</div>
                                </div>

                                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                                    Reason: {payment.reason}
                                </div>

                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <button className="flex-center" style={{ flex: 1, gap: '6px', padding: '0.625rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', fontWeight: '600', border: '1px solid var(--glass-border)' }}>
                                        <Eye size={16} /> View Receipt
                                    </button>
                                    <button style={{ padding: '0.625rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                        <CheckCircle size={18} />
                                    </button>
                                    <button style={{ padding: '0.625rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                        <XCircle size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'members' && (
                    <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                        <div style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 style={{ fontSize: '0.875rem' }}>Family Members</h4>
                            <button className="flex-center" style={{ gap: '4px', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600' }}>
                                <UserPlus size={14} /> Invite
                            </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {members.map(member => (
                                <div key={member.id} style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{member.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{member.email}</div>
                                    </div>
                                    <div style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
                                        {member.role}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'withdrawals' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {withdrawalRequests.map(req => (
                            <div key={req.id} className="glass-card" style={{ padding: '1.25rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <h4 style={{ fontWeight: '700' }}>Withdrawal Request</h4>
                                    <span style={{ fontSize: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', padding: '2px 8px', borderRadius: '10px' }}>Voting Active</span>
                                </div>
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <div style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '4px' }}>₦{req.amount.toLocaleString()}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Requested by {req.name} for <span style={{ color: 'var(--text)' }}>{req.cause}</span></div>
                                </div>

                                <div style={{ marginBottom: '1.25rem' }}>
                                    <div className="flex-between" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                                        <span>Approval Progress</span>
                                        <span>{req.approvedBy}/{req.totalMembers} votes</span>
                                    </div>
                                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${(req.approvedBy / req.totalMembers) * 100}%`, background: 'var(--warning)' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button style={{ flex: 1, padding: '0.75rem', background: 'var(--success)', borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '0.875rem' }}>Approve</button>
                                    <button style={{ flex: 1, padding: '0.75rem', background: 'var(--error)', borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '0.875rem' }}>Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminDashboard
