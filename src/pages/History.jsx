import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft, FileText, ChevronDown } from 'lucide-react'

const History = () => {
    const [filter, setFilter] = useState('all') // all, contribution, withdrawal
    const [searchTerm, setSearchTerm] = useState('')

    const transactions = [
        { id: 1, type: 'contribution', name: 'Tobi Adebayo', amount: 50000, reason: 'Family Reunion', date: '2026-03-10', status: 'confirmed' },
        { id: 2, type: 'contribution', name: 'Sola Williams', amount: 25000, reason: 'Monthly Contribution', date: '2026-03-08', status: 'confirmed' },
        { id: 3, type: 'withdrawal', name: 'Ayo Johnson', amount: 150000, reason: 'Roof Repairs', date: '2026-03-05', status: 'completed' },
        { id: 4, type: 'contribution', name: 'Uncle Segun', amount: 100000, reason: 'General Fund', date: '2026-03-01', status: 'confirmed' },
        { id: 5, type: 'withdrawal', name: 'Mama Tolu', amount: 20000, reason: 'Food Supplies', date: '2026-02-28', status: 'completed' },
    ]

    const filteredTransactions = transactions.filter(tx => {
        const matchesFilter = filter === 'all' || tx.type === filter
        const matchesSearch = tx.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tx.reason.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const downloadCSV = () => {
        const headers = ['S/N', 'Date', 'Type', 'Name', 'Reason', 'Amount', 'Status']
        const rows = filteredTransactions.map((tx, index) => [
            index + 1,
            tx.date,
            tx.type,
            tx.name,
            tx.reason,
            tx.amount,
            tx.status
        ])

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n")
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.setAttribute("href", url)
        link.setAttribute("download", "famtribute_history.csv")
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="flex-between">
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.04em' }}>LEDGER<span style={{ color: 'var(--primary)' }}>.</span></h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', marginTop: '4px' }}>Complete transactional history</p>
                </div>
                <button
                    onClick={downloadCSV}
                    className="btn-outline"
                    style={{ fontSize: '0.75rem', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <Download size={14} />
                    EXPORT CSV
                </button>
            </div>

            {/* Search & Filter */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search records..."
                        style={{ paddingLeft: '3rem' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={{ position: 'relative' }}>
                    <select
                        style={{ width: 'auto', paddingRight: '2.5rem', appearance: 'none', fontWeight: '600' }}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">ALL TYPES</option>
                        <option value="contribution">CREDITS</option>
                        <option value="withdrawal">DEBITS</option>
                    </select>
                    <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }} />
                </div>
            </div>

            {/* Desktop View Table */}
            <div className="desktop-only">
                <table className="desktop-table">
                    <thead>
                        <tr>
                            <th style={{ width: '200px' }}>TYPE</th>
                            <th>RECIPIENT / REASON</th>
                            <th>VALUE</th>
                            <th>TIMESTAMP</th>
                            <th style={{ textAlign: 'right' }}>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map((tx) => (
                            <tr key={tx.id}>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '4px',
                                            background: 'var(--background)',
                                            border: '1px solid var(--border)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {tx.type === 'contribution' ? <ArrowDownLeft size={16} color="var(--success)" /> : <ArrowUpRight size={16} color="var(--error)" />}
                                        </div>
                                        <span style={{ fontWeight: '700', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{tx.type}</span>
                                    </div>
                                </td>
                                <td>
                                    <div style={{ fontWeight: '700', fontSize: '0.9375rem' }}>{tx.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tx.reason}</div>
                                </td>
                                <td>
                                    <div style={{ fontWeight: '800', fontSize: '1rem', color: tx.type === 'contribution' ? 'var(--success)' : 'var(--error)' }}>
                                        {tx.type === 'contribution' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                                    </div>
                                </td>
                                <td>
                                    <div style={{ fontSize: '0.8125rem', fontWeight: '500' }}>{tx.date}</div>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '4px',
                                        fontSize: '0.65rem',
                                        fontWeight: '800',
                                        border: '1px solid var(--border)',
                                        color: 'var(--text-muted)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {tx.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View List */}
            <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredTransactions.map((tx) => (
                    <motion.div
                        layout
                        key={tx.id}
                        className="glass-card"
                        style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
                    >
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '4px',
                            background: 'var(--background)',
                            border: '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            {tx.type === 'contribution' ? (
                                <ArrowDownLeft size={20} color="var(--success)" />
                            ) : (
                                <ArrowUpRight size={20} color="var(--error)" />
                            )}
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: '700', fontSize: '0.9375rem' }}>{tx.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{tx.reason}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{
                                        fontWeight: '800',
                                        fontSize: '0.9375rem',
                                        color: tx.type === 'contribution' ? 'var(--success)' : 'var(--error)'
                                    }}>
                                        {tx.type === 'contribution' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                                    </div>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>{tx.date}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredTransactions.length === 0 && (
                <div style={{ padding: '5rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <FileText size={40} style={{ opacity: 0.1, marginBottom: '1.5rem' }} />
                    <p style={{ fontWeight: '600', fontSize: '0.875rem' }}>No transaction records found</p>
                </div>
            )}
        </div>
    )
}

export default History
