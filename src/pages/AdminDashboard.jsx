import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { Users, CheckCircle, XCircle, Clock, ShieldCheck, UserPlus, Eye, Download, TrendingUp, Activity, Server, Database, Lock, Megaphone, Send, Trash2 } from 'lucide-react'

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('verifications') // verifications, members, withdrawals, announcements
    const [broadcastMsg, setBroadcastMsg] = useState({ title: '', message: '' })

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

    const announcements = [
        { id: 1, title: 'SYSTEM UPGRADE COMPLETED', message: 'Migration to new infrastructure is live.', status: 'active', date: '2026-03-13' },
    ]

    const handleBroadcast = () => {
        if (!broadcastMsg.title || !broadcastMsg.message) {
            toast.error('Identity and Message required')
            return
        }
        toast.success('Broadcast transmitted sequence: DEP_77X')
        setBroadcastMsg({ title: '', message: '' })
    }

    return (
        <div className="animate-fade-in admin-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '2.5rem' }}>

            {/* Admin Header */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)' }}></div>
                            <span style={{ fontSize: '0.65rem', fontWeight: '900', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Node_ID: MC_101 // SECURED</span>
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '900', letterSpacing: '-0.06em', textTransform: 'uppercase' }}>Command Console</h2>
                    </div>

                    <div className="desktop-only" style={{ display: 'flex', gap: '0.75rem' }}>
                        <div className="glass-card" style={{ padding: '0.6rem 1.25rem', border: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Server size={12} color="var(--primary)" />
                            <div style={{ fontSize: '0.75rem', fontWeight: '900' }}>12.4% LOAD</div>
                        </div>
                        <div className="glass-card" style={{ padding: '0.6rem 1.25rem', border: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Lock size={12} color="var(--success)" />
                            <div style={{ fontSize: '0.75rem', fontWeight: '900' }}>AES_256</div>
                        </div>
                    </div>
                </div>

                {/* Navigation Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>

                    <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                            <Activity size={14} color="var(--primary)" />
                            <h3 style={{ fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Core Protocols</h3>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                            {['Verifications', 'Members', 'Withdrawals', 'Announcements'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab.toLowerCase())}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '4px',
                                        fontWeight: '800',
                                        fontSize: '0.65rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        color: activeTab === tab.toLowerCase() ? 'var(--text)' : 'var(--text-muted)',
                                        background: activeTab === tab.toLowerCase() ? 'var(--surface)' : 'var(--background)',
                                        border: '1px solid ' + (activeTab === tab.toLowerCase() ? 'var(--primary)' : 'var(--border)'),
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid var(--border)', background: 'var(--surface)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                            <Database size={14} color="var(--primary)" />
                            <h3 style={{ fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>System Metrics</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div className="flex-between" style={{ fontSize: '0.65rem', fontWeight: '800' }}>
                                <span style={{ color: 'var(--text-muted)' }}>DATABASE_SYNC</span>
                                <span style={{ color: 'var(--success)' }}>OPTIMAL</span>
                            </div>
                            <div className="flex-between" style={{ fontSize: '0.65rem', fontWeight: '800' }}>
                                <span style={{ color: 'var(--text-muted)' }}>UPTIME_LOG</span>
                                <span>1,250 HRS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '900', letterSpacing: '-0.04em', textTransform: 'uppercase' }}>
                        {activeTab} // AUTH_READY
                    </h3>
                </div>

                {activeTab === 'verifications' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem' }}>
                        {pendingPayments.map(payment => (
                            <div key={payment.id} className="glass-card" style={{ padding: '1.5rem', border: '1px solid var(--border)', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '1rem', right: '1.5rem', fontSize: '0.55rem', fontWeight: '900', color: 'var(--text-muted)' }}>ID_{payment.id}</div>
                                <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
                                    <div>
                                        <div style={{ fontWeight: '900', fontSize: '0.9375rem' }}>{payment.name.toUpperCase()}</div>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '700' }}>{payment.date}</div>
                                    </div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white' }}>₦{payment.amount.toLocaleString()}</div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 50px 50px', gap: '0.75rem' }}>
                                    <button className="btn-outline" style={{ fontSize: '0.65rem', fontWeight: '900' }}>VIEW_BLOB</button>
                                    <button onClick={() => toast.success('Verified')} className="btn-primary" style={{ background: 'var(--success)', border: 'none' }}><CheckCircle size={18} /></button>
                                    <button onClick={() => toast.error('Rejected')} className="btn-primary" style={{ background: 'var(--error)', border: 'none' }}><XCircle size={18} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'announcements' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
                        {/* Broadcast Form */}
                        <div className="glass-card" style={{ padding: '2rem', border: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
                                <Megaphone size={16} color="var(--primary)" />
                                <h3 style={{ fontSize: '0.75rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>New System Broadcast</h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.6rem', fontWeight: '900', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Broadcast Title</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. MAINTENANCE_WINDOW"
                                        value={broadcastMsg.title}
                                        onChange={(e) => setBroadcastMsg({ ...broadcastMsg, title: e.target.value })}
                                        style={{ background: 'var(--background)', border: '1px solid var(--border)', padding: '1rem', borderRadius: '4px', color: 'white', fontWeight: '700', fontSize: '0.875rem' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.6rem', fontWeight: '900', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Signal Content</label>
                                    <textarea
                                        placeholder="Enter the message to be transmitted to all nodes..."
                                        value={broadcastMsg.message}
                                        onChange={(e) => setBroadcastMsg({ ...broadcastMsg, message: e.target.value })}
                                        style={{ background: 'var(--background)', border: '1px solid var(--border)', padding: '1rem', borderRadius: '4px', color: 'white', fontWeight: '500', fontSize: '0.875rem', minHeight: '120px', resize: 'none' }}
                                    ></textarea>
                                </div>
                                <button onClick={handleBroadcast} className="btn-primary" style={{ width: '100%', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontWeight: '900', fontSize: '0.75rem' }}>
                                    <Send size={16} /> TRANSMIT_SIGNAL
                                </button>
                            </div>
                        </div>

                        {/* Recent Archives */}
                        <div className="glass-card" style={{ padding: '2rem', border: '1px solid var(--border)', background: 'var(--surface)' }}>
                            <h3 style={{ fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem' }}>Broadcast Archives</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {announcements.map(ann => (
                                    <div key={ann.id} style={{ padding: '1.25rem', background: 'var(--background)', border: '1px solid var(--border)', borderRadius: '4px' }}>
                                        <div className="flex-between" style={{ marginBottom: '8px' }}>
                                            <span style={{ fontSize: '0.65rem', fontWeight: '900', color: 'var(--primary)' }}>{ann.status.toUpperCase()}</span>
                                            <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{ann.date}</span>
                                        </div>
                                        <div style={{ fontWeight: '800', fontSize: '0.875rem', marginBottom: '4px' }}>{ann.title}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{ann.message}</div>
                                        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                                            <button style={{ color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Other tabs remain similar but refined as needed... */}
                {activeTab === 'members' && (
                    <div className="glass-card" style={{ padding: '0', border: '1px solid var(--border)', overflow: 'hidden' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr', padding: '1rem 1.5rem', background: 'var(--surface)', borderBottom: '1px solid var(--border)', fontSize: '0.6rem', fontWeight: '900', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                            <span>NAME</span>
                            <span>EMAIL</span>
                            <span style={{ textAlign: 'right' }}>ROLE</span>
                        </div>
                        {members.map(member => (
                            <div key={member.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
                                <div style={{ fontWeight: '800', fontSize: '0.8125rem' }}>{member.name.toUpperCase()}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{member.email}</div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ fontSize: '0.55rem', padding: '3px 8px', border: '1px solid var(--primary)', color: 'var(--primary)', borderRadius: '2px', fontWeight: '900' }}>{member.role.toUpperCase()}</span>
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
