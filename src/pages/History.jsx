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
        <div className="animate-fade-in">
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Transaction History</h2>
                <button
                    onClick={downloadCSV}
                    className="flex-center"
                    style={{ gap: '6px', fontSize: '0.875rem', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}
                >
                    <Download size={16} />
                    Export
                </button>
            </div>

            {/* Search & Filter */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search contributor or reason..."
                        style={{ paddingLeft: '2.5rem' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={{ position: 'relative' }}>
                    <select
                        style={{ width: 'auto', paddingRight: '2rem', appearance: 'none' }}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="contribution">In</option>
                        <option value="withdrawal">Out</option>
                    </select>
                    <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }} />
                </div>
            </div>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {filteredTransactions.map((tx) => (
                    <motion.div
                        layout
                        key={tx.id}
                        className="glass-card"
                        style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
                    >
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '14px',
                            background: tx.type === 'contribution' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            {tx.type === 'contribution' ? (
                                <ArrowDownLeft size={22} color="var(--success)" />
                            ) : (
                                <ArrowUpRight size={22} color="var(--error)" />
                            )}
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '1rem' }}>{tx.name}</div>
                                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>{tx.reason}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{
                                        fontWeight: '700',
                                        fontSize: '1rem',
                                        color: tx.type === 'contribution' ? 'var(--success)' : 'var(--error)'
                                    }}>
                                        {tx.type === 'contribution' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{tx.date}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {filteredTransactions.length === 0 && (
                    <div style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <FileText size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                        <p>No transactions found</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default History
