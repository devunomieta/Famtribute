import React from 'react'
import { motion } from 'framer-motion'
import { Cake, Heart, Award, Home, Star, Calendar, MapPin } from 'lucide-react'

const LifeEvents = () => {
    const events = [
        {
            id: 1,
            title: 'Grandpa\'s 80th Birthday',
            date: 'December 20, 2025',
            description: 'The entire family gathered at the country club for a night of stories and dancing.',
            location: 'Lagos, Nigeria',
            type: 'birthday',
            image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&q=80&w=400'
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
            case 'birthday': return <Cake size={20} />;
            case 'wedding': return <Heart size={20} />;
            case 'milestone': return <Home size={20} />;
            case 'achievement': return <Award size={20} />;
            default: return <Star size={20} />;
        }
    }

    const getColor = (type) => {
        switch (type) {
            case 'birthday': return 'var(--secondary)';
            case 'wedding': return '#ef4444';
            case 'milestone': return 'var(--primary)';
            case 'achievement': return '#f59e0b';
            default: return 'var(--accent)';
        }
    }

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Life Events</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Our family's digital history</p>
            </div>

            <div style={{ position: 'relative', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {/* Vertical Line */}
                <div style={{
                    position: 'absolute',
                    left: '7px',
                    top: '0',
                    bottom: '0',
                    width: '2px',
                    background: 'linear-gradient(to bottom, var(--primary), var(--secondary), transparent)',
                    opacity: 0.3
                }} />

                {events.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        style={{ position: 'relative' }}
                    >
                        {/* Timeline Dot */}
                        <div style={{
                            position: 'absolute',
                            left: '-2rem',
                            top: '4px',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: 'var(--background)',
                            border: `3px solid ${getColor(event.type)}`,
                            zIndex: 10
                        }} />

                        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                            {event.image && (
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                                />
                            )}
                            <div style={{ padding: '1.25rem' }}>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <div style={{ color: getColor(event.type) }}>
                                        {getIcon(event.type)}
                                    </div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: getColor(event.type) }}>
                                        {event.type}
                                    </span>
                                </div>

                                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{event.title}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>
                                    {event.description}
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        <Calendar size={14} />
                                        {event.date}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        <MapPin size={14} />
                                        {event.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="glass-card flex-center" style={{ width: '100%', marginTop: '3rem', padding: '1rem', border: '1px dashed var(--glass-border)', color: 'var(--text-muted)', gap: '8px' }}>
                <Plus size={20} /> Add Milestone
            </button>
        </div>
    )
}

export default LifeEvents
