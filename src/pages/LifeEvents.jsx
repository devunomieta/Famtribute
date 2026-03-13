import React from 'react'
import { motion } from 'framer-motion'
import { Cake, Heart, Award, Home, Star, Calendar, MapPin, Plus } from 'lucide-react'

const LifeEvents = () => {
    const events = [
        {
            id: 1,
            title: 'Grandpa\'s 80th Birthday',
            date: 'December 20, 2025',
            description: 'The entire family gathered at the country club for a night of stories and dancing.',
            location: 'Lagos, Nigeria',
            type: 'birthday',
            image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 2,
            title: 'Tobi & Sola Wedding',
            date: 'August 15, 2025',
            description: 'A beautiful summer wedding celebrating the union of our favorite couple.',
            location: 'Ibadan',
            type: 'wedding'
        },
        {
            id: 3,
            title: 'New Family Property Purchased',
            date: 'March 10, 2025',
            description: 'We officially acquired the beach house for family holidays.',
            location: 'Lekki Phase 1',
            type: 'milestone'
        },
        {
            id: 4,
            title: 'Ayo Johnson - PhD Graduation',
            date: 'November 12, 2024',
            description: 'Ayo officially became Dr. Johnson! Proudest moment for the family.',
            location: 'University of Lagos',
            type: 'achievement'
        }
    ]

    const getIcon = (type) => {
        switch (type) {
            case 'birthday': return <Cake size={18} />;
            case 'wedding': return <Heart size={18} />;
            case 'milestone': return <Home size={18} />;
            case 'achievement': return <Award size={18} />;
            default: return <Star size={18} />;
        }
    }

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div className="flex-between">
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.04em' }}>LIFE EVENTS<span style={{ color: 'var(--primary)' }}>.</span></h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', marginTop: '4px' }}>Chronicle of family milestones and memories</p>
                </div>
                <button className="btn-primary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.8125rem' }}>
                    <Plus size={16} /> ADD EVENT
                </button>
            </div>

            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {/* Visual Timeline Connector (Desktop) */}
                <div className="desktop-only" style={{
                    position: 'absolute',
                    left: '50%',
                    top: '2rem',
                    bottom: '2rem',
                    width: '1px',
                    background: 'var(--border)',
                    transform: 'translateX(-0.5px)',
                    zIndex: 0
                }} />

                {events.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        style={{
                            display: 'flex',
                            justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                            width: '100%',
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        {/* Timeline Node (Desktop) */}
                        <div className="desktop-only" style={{
                            position: 'absolute',
                            left: '50%',
                            top: '2.5rem',
                            width: '10px',
                            height: '10px',
                            borderRadius: '2px',
                            background: 'var(--background)',
                            border: '2px solid var(--primary)',
                            transform: 'translateX(-50%)',
                            zIndex: 2
                        }} />

                        <div className="glass-card" style={{
                            width: '100%',
                            maxWidth: '480px',
                            padding: '0',
                            overflow: 'hidden',
                            border: '1px solid var(--border)'
                        }}>
                            {event.image && (
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderBottom: '1px solid var(--border)' }}
                                />
                            )}
                            <div style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '1.25rem' }}>
                                    <div style={{ color: 'var(--primary)', background: 'var(--background)', width: '36px', height: '36px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                                        {getIcon(event.type)}
                                    </div>
                                    <span style={{ fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                                        {event.type}
                                    </span>
                                </div>

                                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{event.title}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                                    {event.description}
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text)', fontWeight: '700' }}>
                                        <Calendar size={14} color="var(--primary)" />
                                        {event.date}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text)', fontWeight: '700' }}>
                                        <MapPin size={14} color="var(--primary)" />
                                        {event.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="btn-outline" style={{ width: '100%', borderStyle: 'dashed', height: '4rem', fontSize: '0.8125rem', fontWeight: '800', color: 'var(--text-muted)' }}>
                <Plus size={20} /> RECORD NEW MILESTONE
            </button>
        </div>
    )
}

export default LifeEvents
