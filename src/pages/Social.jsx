import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Heart, Share2, Send, Image as ImageIcon, MoreHorizontal } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Social = () => {
    const { profile } = useAuth()
    const [activeTab, setActiveTab] = useState('posts') // posts or chat
    const [newPost, setNewPost] = useState('')

    const posts = [
        {
            id: 1,
            author: 'Ayo Johnson',
            content: 'Just finished the roof repairs! Thanks everyone for the contributions. Special thanks to Tobi for coordinating.',
            image: 'https://images.unsplash.com/photo-1632759145351-1d592919f507?auto=format&fit=crop&q=80&w=400',
            likes: 12,
            comments: 3,
            date: '2 hours ago'
        },
        {
            id: 2,
            author: 'Mama Tolu',
            content: 'Check out these flowers from the garden! Looking forward to seeing everyone at the reunion.',
            image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=400',
            likes: 24,
            comments: 5,
            date: '5 hours ago'
        },
    ]

    const chatMessages = [
        { id: 1, user: 'Tobi Adebayo', text: 'Has everyone seen the update on the reunion goal?', time: '10:30 AM', self: false },
        { id: 2, user: 'Sola Williams', text: 'Yes! We are almost there.', time: '10:32 AM', self: false },
        { id: 3, user: 'You', text: 'I just made my contribution for this month.', time: '10:35 AM', self: true },
    ]

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 12rem)' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                <button
                    onClick={() => setActiveTab('posts')}
                    style={{
                        padding: '0.5rem 1rem',
                        fontWeight: '600',
                        color: activeTab === 'posts' ? 'var(--primary)' : 'var(--text-muted)',
                        position: 'relative'
                    }}
                >
                    Updates
                    {activeTab === 'posts' && <motion.div layoutId="social-tab" style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '2px', background: 'var(--primary)' }} />}
                </button>
                <button
                    onClick={() => setActiveTab('chat')}
                    style={{
                        padding: '0.5rem 1rem',
                        fontWeight: '600',
                        color: activeTab === 'chat' ? 'var(--primary)' : 'var(--text-muted)',
                        position: 'relative'
                    }}
                >
                    Family Chat
                    {activeTab === 'chat' && <motion.div layoutId="social-tab" style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '2px', background: 'var(--primary)' }} />}
                </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '1rem' }}>
                {activeTab === 'posts' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Create Post */}
                        <div className="glass-card" style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }} />
                                <textarea
                                    placeholder="Share something with the family..."
                                    style={{ background: 'transparent', border: 'none', padding: '0.5rem 0', resize: 'none', minHeight: '60px' }}
                                    value={newPost}
                                    onChange={(e) => setNewPost(e.target.value)}
                                />
                            </div>
                            <div className="flex-between" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '0.75rem' }}>
                                <button style={{ color: 'var(--text-muted)', display: 'flex', gap: '6px', alignItems: 'center', fontSize: '0.875rem' }}>
                                    <ImageIcon size={18} /> Photo
                                </button>
                                <button
                                    disabled={!newPost}
                                    style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '0.875rem' }}
                                >
                                    Post
                                </button>
                            </div>
                        </div>

                        {/* Posts List */}
                        {posts.map(post => (
                            <div key={post.id} className="glass-card" style={{ padding: '0' }}>
                                <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent)' }} />
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '0.925rem' }}>{post.author}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.date}</div>
                                        </div>
                                    </div>
                                    <button style={{ color: 'var(--text-muted)' }}><MoreHorizontal size={20} /></button>
                                </div>

                                <div style={{ padding: '0 1rem 1rem 1rem', fontSize: '0.925rem', lineHeight: '1.6' }}>
                                    {post.content}
                                </div>

                                {post.image && (
                                    <img
                                        src={post.image}
                                        alt="Post attachment"
                                        style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                                    />
                                )}

                                <div className="flex-between" style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--glass-border)' }}>
                                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                                        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                            <Heart size={18} /> {post.likes}
                                        </button>
                                        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                            <MessageSquare size={18} /> {post.comments}
                                        </button>
                                    </div>
                                    <button style={{ color: 'var(--text-muted)' }}><Share2 size={18} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Chat Interface */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0.5rem' }}>
                        {chatMessages.map(msg => (
                            <div
                                key={msg.id}
                                style={{
                                    alignSelf: msg.self ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: msg.self ? 'flex-end' : 'flex-start',
                                    gap: '4px'
                                }}
                            >
                                {!msg.self && <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600' }}>{msg.user}</span>}
                                <div style={{
                                    padding: '10px 14px',
                                    borderRadius: msg.self ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                                    background: msg.self ? 'var(--primary)' : 'var(--surface)',
                                    fontSize: '0.925rem',
                                    boxShadow: 'var(--shadow-sm)'
                                }}>
                                    {msg.text}
                                </div>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{msg.time}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Chat Input (only in chat mode) */}
            {activeTab === 'chat' && (
                <div style={{ padding: '1rem 0', display: 'flex', gap: '0.75rem' }}>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        style={{ padding: '0.875rem 1.25rem', background: 'var(--surface)' }}
                    />
                    <button style={{
                        background: 'var(--primary)',
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        flexShrink: 0
                    }}>
                        <Send size={20} />
                    </button>
                </div>
            )}
        </div>
    )
}

export default Social
