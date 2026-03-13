import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Banknote, Upload, CheckCircle, Info } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const ContributionModal = ({ isOpen, onClose }) => {
    const { profile } = useAuth()
    const [step, setStep] = useState(1) // 1: Info/Amount, 2: Method selection, 3: Payment/Upload
    const [method, setMethod] = useState(null) // 'paystack' or 'manual'
    const [formData, setFormData] = useState({
        amount: '',
        reason: '',
        onBehalfOf: false,
        behalfName: '',
        receipt: null
    })

    const reset = () => {
        setStep(1)
        setMethod(null)
        setFormData({ amount: '', reason: '', onBehalfOf: false, behalfName: '', receipt: null })
    }

    const handleClose = () => {
        reset()
        onClose()
    }

    if (!isOpen) return null

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
                style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
            />

            {/* Drawer */}
            <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="glass"
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '500px',
                    maxHeight: '90vh',
                    background: 'var(--background)',
                    borderTopLeftRadius: '24px',
                    borderTopRightRadius: '24px',
                    padding: '1.5rem',
                    paddingBottom: '3rem',
                    overflowY: 'auto',
                    border: '1px solid var(--glass-border)'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Make Contribution</h2>
                    <button onClick={handleClose} style={{ color: 'var(--text-muted)' }}><X size={24} /></button>
                </div>

                {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Amount (₦)</label>
                            <input
                                type="number"
                                placeholder="50,000"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Reason for Contribution</label>
                            <select
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                            >
                                <option value="">Select a reason</option>
                                <option value="General Monthly">General Monthly</option>
                                <option value="Reunion 2026">Reunion 2026</option>
                                <option value="Hospital Bills">Emergency Fund (Hospital)</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.03)' }}>
                            <input
                                type="checkbox"
                                id="behalf"
                                style={{ width: '20px' }}
                                checked={formData.onBehalfOf}
                                onChange={(e) => setFormData({ ...formData, onBehalfOf: e.target.checked })}
                            />
                            <label htmlFor="behalf" style={{ marginBottom: 0 }}>Paying on behalf of someone else?</label>
                        </div>

                        {formData.onBehalfOf && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ marginBottom: '1.5rem' }}>
                                <label>Contributor's Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter their full name"
                                    value={formData.behalfName}
                                    onChange={(e) => setFormData({ ...formData, behalfName: e.target.value })}
                                />
                            </motion.div>
                        )}

                        <button
                            onClick={() => setStep(2)}
                            disabled={!formData.amount || !formData.reason}
                            style={{ width: '100%', padding: '1rem', background: 'var(--primary)', borderRadius: 'var(--radius-md)', fontWeight: '700' }}
                        >
                            Continue
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Choose your preferred payment method</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button
                                onClick={() => { setMethod('paystack'); setStep(3); }}
                                className="glass-card flex-between"
                                style={{ padding: '1.25rem', border: '1px solid var(--glass-border)' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px', color: 'var(--success)' }}>
                                        <CreditCard size={24} />
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontWeight: '600' }}>Pay Online (Paystack)</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Automated instant confirmation</div>
                                    </div>
                                </div>
                            </button>

                            <button
                                onClick={() => { setMethod('manual'); setStep(3); }}
                                className="glass-card flex-between"
                                style={{ padding: '1.25rem', border: '1px solid var(--glass-border)' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ padding: '8px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                                        <Banknote size={24} />
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontWeight: '600' }}>Direct Bank Transfer</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Upload receipt for admin approval</div>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <button
                            onClick={() => setStep(1)}
                            style={{ width: '100%', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}
                        >
                            Back to details
                        </button>
                    </motion.div>
                )}

                {step === 3 && method === 'manual' && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="glass-card" style={{ marginBottom: '1.5rem', border: '1px dashed var(--primary)', background: 'rgba(99, 102, 241, 0.05)' }}>
                            <h4 style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>Transfer to:</h4>
                            <div style={{ fontWeight: '700', fontSize: '1.125rem' }}>GTBank - 0123456789</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Famtribute Family Fund</div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label>Upload Payment Receipt</label>
                            <div
                                style={{
                                    height: '150px',
                                    border: '2px dashed var(--glass-border)',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer'
                                }}
                                onClick={() => document.getElementById('receipt-upload').click()}
                            >
                                <Upload size={32} />
                                <span style={{ fontSize: '0.875rem' }}>{formData.receipt ? formData.receipt.name : 'Tap to upload screenshot'}</span>
                                <input
                                    type="file"
                                    id="receipt-upload"
                                    hidden
                                    onChange={(e) => setFormData({ ...formData, receipt: e.target.files[0] })}
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => setStep(4)}
                            disabled={!formData.receipt}
                            style={{ width: '100%', padding: '1rem', background: 'var(--primary)', borderRadius: 'var(--radius-md)', fontWeight: '700' }}
                        >
                            Submit for Verification
                        </button>
                    </motion.div>
                )}

                {step === 3 && method === 'paystack' && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ textAlign: 'center' }}>
                        <div style={{ padding: '2rem 0' }}>
                            <CreditCard size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                            <h3>Pay ₦{formData.amount} via Paystack</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Redirecting to secure payment portal...</p>
                        </div>
                        <button
                            onClick={() => setStep(4)}
                            style={{ width: '100%', padding: '1rem', background: 'var(--primary)', borderRadius: 'var(--radius-md)', fontWeight: '700' }}
                        >
                            Authorize Payment (Mock)
                        </button>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <CheckCircle size={64} color="var(--success)" style={{ marginBottom: '1.5rem' }} />
                        <h2 style={{ marginBottom: '0.5rem' }}>{method === 'manual' ? 'Submitted!' : 'Payment Success!'}</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            {method === 'manual'
                                ? 'Your transaction is being verified by the admin.'
                                : 'Your contribution has been recorded and the balance updated.'}
                        </p>
                        <button
                            onClick={handleClose}
                            style={{ width: '100%', padding: '1rem', background: 'var(--primary)', borderRadius: 'var(--radius-md)', fontWeight: '700' }}
                        >
                            Back to Dashboard
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    )
}

export default ContributionModal
