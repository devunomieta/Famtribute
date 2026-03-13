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
        <div className="animate-fade-in">
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Document Vault</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Secure decentralized storage</p>
                </div>
                <button className="flex-center" style={{ gap: '6px', fontSize: '0.875rem', padding: '0.625rem 1rem', background: 'var(--primary)', borderRadius: 'var(--radius-md)', fontWeight: '600' }}>
                    <Upload size={18} />
                    Upload
                </button>
            </div>

            {/* Security Banner */}
            <div className="glass-card" style={{ marginBottom: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Shield size={20} color="var(--success)" />
                <span style={{ fontSize: '0.8125rem', color: 'var(--success)', fontWeight: '500' }}>Documents are encrypted and only accessible by verified family members.</span>
            </div>

            {/* Search & Categories */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ position: 'relative', marginBottom: '1rem' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search documents..."
                        style={{ paddingLeft: '2.5rem' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    {['All', 'Legal', 'Property', 'Medical', 'Photos'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat.toLowerCase())}
                            style={{
                                padding: '0.5rem 1rem',
                                background: category === cat.toLowerCase() ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.8125rem',
                                whiteSpace: 'nowrap',
                                fontWeight: '600',
                                border: '1px solid var(--glass-border)'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {filteredDocs.map(doc => (
                    <motion.div
                        layout
                        key={doc.id}
                        className="glass-card"
                        style={{ padding: '1rem' }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex-between" style={{ marginBottom: '1rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: 'rgba(255,255,255,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--primary)'
                            }}>
                                <FileText size={24} />
                            </div>
                            <button style={{ color: 'var(--text-muted)' }}><MoreVertical size={18} /></button>
                        </div>

                        <h4 style={{ fontSize: '0.875rem', fontWeight: '700', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {doc.title}
                        </h4>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                            {doc.size} • {doc.type}
                        </div>

                        <div className="flex-between">
                            <span style={{ fontSize: '0.65rem', color: 'var(--accent)', fontWeight: '600' }}>#{doc.category}</span>
                            <button style={{ color: 'var(--primary)' }}><Download size={16} /></button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredDocs.length === 0 && (
                <div style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <Folder size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                    <p>No documents found</p>
                </div>
            )}
        </div>
    )
}

export default DocumentVault
