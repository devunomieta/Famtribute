import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Folder, File, Search, Upload, Download, MoreVertical, Shield, FileText } from 'lucide-react'

const DocumentVault = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [category, setCategory] = useState('all')

    const documents = [
        { id: 1, title: 'Family House Deed', type: 'PDF', category: 'Property', size: '2.4 MB', date: '2026-02-15', uploader: 'Admin' },
        { id: 2, title: 'Grandma Wilson - Will', type: 'PDF', category: 'Legal', size: '1.1 MB', date: '2026-01-10', uploader: 'Tobi' },
        { id: 3, title: 'Wedding Photos - Sola', type: 'ZIP', category: 'Photos', size: '125 MB', date: '2025-12-20', uploader: 'Sola' },
        { id: 4, title: 'Medical Records - Ayo', type: 'PDF', category: 'Medical', size: '4.2 MB', date: '2026-03-01', uploader: 'Ayo' },
    ]

    const filteredDocs = documents.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = category === 'all' || doc.category.toLowerCase() === category.toLowerCase()
        return matchesSearch && matchesCategory
    })

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div className="flex-between">
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.04em' }}>SECURE VAULT<span style={{ color: 'var(--primary)' }}>.</span></h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', marginTop: '4px' }}>End-to-end encrypted family repository</p>
                </div>
                <button className="btn-primary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.8125rem' }}>
                    <Upload size={16} /> UPLOAD FILE
                </button>
            </div>

            {/* Security Banner */}
            <div className="glass-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', gap: '1rem', alignItems: 'center', padding: '1.25rem' }}>
                <Shield size={18} color="var(--primary)" />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Decentralized encryption active • Access restricted to audited accounts</span>
            </div>

            {/* Search & Categories */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Query repository..."
                        style={{ paddingLeft: '3rem' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
                    {['ALL', 'LEGAL', 'PROPERTY', 'MEDICAL', 'PHOTOS'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat.toLowerCase())}
                            style={{
                                padding: '0.5rem 1rem',
                                background: category === cat.toLowerCase() ? 'var(--primary)' : 'var(--background)',
                                borderRadius: '4px',
                                fontSize: '0.65rem',
                                whiteSpace: 'nowrap',
                                fontWeight: '800',
                                border: '1px solid ' + (category === cat.toLowerCase() ? 'var(--primary)' : 'var(--border)'),
                                color: category === cat.toLowerCase() ? 'white' : 'var(--text-muted)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                transition: 'all 0.2s'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {filteredDocs.map(doc => (
                    <motion.div
                        layout
                        key={doc.id}
                        className="glass-card"
                        style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                        whileHover={{ borderColor: 'var(--primary)' }}
                    >
                        <div className="flex-between">
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '4px',
                                background: 'var(--background)',
                                border: '1px solid var(--border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--primary)'
                            }}>
                                <FileText size={20} />
                            </div>
                            <button style={{ color: 'var(--text-muted)' }}><MoreVertical size={18} /></button>
                        </div>

                        <div>
                            <h4 style={{ fontSize: '0.9375rem', fontWeight: '700', marginBottom: '4px', letterSpacing: '-0.01em' }}>
                                {doc.title}
                            </h4>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                                {doc.size} • {doc.type}
                            </div>
                        </div>

                        <div className="flex-between" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                            <span style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>[{doc.category}]</span>
                            <button style={{ color: 'var(--text)', transition: 'color 0.2s' }} className="hover-blue"><Download size={16} /></button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredDocs.length === 0 && (
                <div style={{ padding: '5rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <Folder size={40} style={{ opacity: 0.1, marginBottom: '1.5rem' }} />
                    <p style={{ fontWeight: '600', fontSize: '0.875rem' }}>Zero results found in vault</p>
                </div>
            )}
        </div>
    )
}

export default DocumentVault
