import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Heart, Share2, Send, Image as ImageIcon, MoreHorizontal, User } from 'lucide-react'
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
            image: 'https://images.unsplash.com/photo-1632759145351-1d592919f507?auto=format&fit=crop&q=80&w=800',
            likes: 12,
            comments: 3,
            date: '2 hours ago'
        },
        {
            id: 2,
            author: 'Mama Tolu',
            content: 'Check out these flowers from the garden! Looking forward to seeing everyone at the reunion.',
            image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=800',
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
        <div className="animate-fade-in constrained-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '2rem' }}>

            <div className="flex-between">
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.04em' }}>SOCIETY<span style={{ color: 'var(--primary)' }}>.</span></h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', marginTop: '4px' }}>Family feed and real-time communication</p>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '2px' }}>
                <button
                    onClick={() => setActiveTab('posts')}
                    style={{
                        padding: '0.75rem 1.25rem',
                        fontWeight: '700',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: activeTab === 'posts' ? 'var(--text)' : 'var(--text-muted)',
                        position: 'relative',
                        transition: 'color 0.2s'
                    }}
                >
                    Updates
                    {activeTab === 'posts' && <motion.div layoutId="social-tab-active" style={{ position: 'absolute', bottom: '-2px', left: 0, right: 0, height: '2px', background: 'var(--primary)' }} />}
                </button>
                <button
                    onClick={() => setActiveTab('chat')}
                    style={{
                        padding: '0.75rem 1.25rem',
                        fontWeight: '700',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: activeTab === 'chat' ? 'var(--text)' : 'var(--text-muted)',
                        position: 'relative',
                        transition: 'color 0.2s'
                    }}
                >
                    Family Chat
                    {activeTab === 'chat' && <motion.div layoutId="social-tab-active" style={{ position: 'absolute', bottom: '-2px', left: 0, right: 0, height: '2px', background: 'var(--primary)' }} />}
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
                {activeTab === 'posts' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Create Post */}
                        <div className="glass-card" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'var(--primary)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                    <User size={20} />
                                </div>
                                <textarea
                                    placeholder="Draft an update for the family..."
                                    style={{ background: 'transparent', border: 'none', padding: '0.5rem 0', resize: 'none', minHeight: '60px', fontSize: '0.9375rem' }}
                                    value={newPost}
                                    onChange={(e) => setNewPost(e.target.value)}
                                />
                            </div>
                            <div className="flex-between" style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                                <button style={{ color: 'var(--text-muted)', display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.75rem', fontWeight: '800' }}>
                                    <ImageIcon size={16} /> ATTACH MEDIA
                                </button>
                                <button
                                    disabled={!newPost}
                                    className="btn-primary"
                                    style={{ padding: '0.5rem 1.5rem', fontSize: '0.8125rem', opacity: newPost ? 1 : 0.5 }}
                                >
                                    PUBLISH
                                </button>
                            </div>
                        </div>

                        {/* Posts List */}
                        {posts.map(post => (
                            <div key={post.id} className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                                <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '4px', background: 'var(--background)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <User size={18} color="var(--primary)" />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '700', fontSize: '0.925rem' }}>{post.author}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{post.date}</div>
                                        </div>
                                    </div>
                                    <button style={{ color: 'var(--text-muted)' }}><MoreHorizontal size={18} /></button>
                                </div>

                                <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', fontSize: '0.9375rem', lineHeight: '1.7', color: 'var(--text)' }}>
                                    {post.content}
                                </div>

                                {post.image && (
                                    <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
                                        <img
                                            src={post.image}
                                            alt="Update asset"
                                            style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                                        />
                                    </div>
                                )}

                                <div className="flex-between" style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
                                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                                        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '700' }}>
                                            <Heart size={16} /> {post.likes}
                                        </button>
                                        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '700' }}>
                                            <MessageSquare size={16} /> {post.comments}
                                        </button>
                                    </div>
                                    <button style={{ color: 'var(--text-muted)' }}><Share2 size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Chat Interface */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '0.5rem' }}>
                        {chatMessages.map(msg => (
                            <div
                                key={msg.id}
                                style={{
                                    alignSelf: msg.self ? 'flex-end' : 'flex-start',
                                    maxWidth: '85%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: msg.self ? 'flex-end' : 'flex-start',
                                    gap: '6px'
                                }}
                            >
                                {!msg.self && <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{msg.user}</span>}
                                <div style={{
                                    padding: '12px 16px',
                                    borderRadius: msg.self ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                                    background: msg.self ? 'var(--primary)' : 'var(--surface)',
                                    color: msg.self ? 'white' : 'var(--text)',
                                    fontSize: '0.9375rem',
                                    border: msg.self ? 'none' : '1px solid var(--border)',
                                    lineHeight: '1.5'
                                }}>
                                    {msg.text}
                                </div>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '500' }}>{msg.time}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Chat Input */}
            {activeTab === 'chat' && (
                <div style={{ padding: '1rem 0', display: 'flex', gap: '0.75rem' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Type a message to the family..."
                            style={{ padding: '1rem 1.5rem', background: 'var(--surface)' }}
                        />
                    </div>
                    <button className="btn-primary" style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: 'var(--radius-md)',
                        padding: '0'
                    }}>
                        <Send size={20} />
                    </button>
                </div>
            )}
        </div>
    )
}

export default Social
