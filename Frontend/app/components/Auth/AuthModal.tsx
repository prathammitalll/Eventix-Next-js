"use client"
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  agreeToTerms: boolean;
}

interface Errors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  agreeToTerms?: string;
  general?: string;
}

interface SocialLoading {
  google: boolean;
  github: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
    const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        agreeToTerms: false
    });
    const [errors, setErrors] = useState<Errors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [socialLoading, setSocialLoading] = useState<SocialLoading>({ google: false, github: false });
    const { login, signup, loginWithGoogle } = useAuth();

    useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        if (errors[name as keyof Errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Errors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (mode === 'signup') {
            // Confirm password validation
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }

            // Name validation
            if (!formData.firstName.trim()) {
                newErrors.firstName = 'First name is required';
            }
            if (!formData.lastName.trim()) {
                newErrors.lastName = 'Last name is required';
            }

            // Terms validation
            if (!formData.agreeToTerms) {
                newErrors.agreeToTerms = 'You must agree to the terms and conditions';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        
        try {
            let result;
            if (mode === 'signup') {
                result = await signup(formData);
            } else {
                result = await login(formData.email, formData.password);
            }

            if (result.success) {
                // Success - modal will be closed by AuthContext
                console.log(`${mode} successful`);
            } else {
                // Handle error
                setErrors({ general: result.error });
            }
        } catch (error) {
            setErrors({ general: error instanceof Error ? error.message : 'An error occurred' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setSocialLoading(prev => ({ ...prev, google: true }));
        
        try {
            const result = await loginWithGoogle();
            if (!result.success) {
                setErrors({ general: result.error });
            }
        } catch (error) {
            setErrors({ general: error instanceof Error ? error.message : 'An error occurred' });
        } finally {
            setSocialLoading(prev => ({ ...prev, google: false }));
        }
    };

    const handleGitHubSignIn = async () => {
        setSocialLoading(prev => ({ ...prev, github: true }));
        console.log('GitHub sign in clicked');
        // TODO: Implement GitHub authentication
        setTimeout(() => {
            setSocialLoading(prev => ({ ...prev, github: false }));
        }, 2000);
    };

    const switchMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login');
        setErrors({});
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            agreeToTerms: false
        });
    };

    const modalVariants = {
        hidden: { 
            opacity: 0,
            scale: 0.8,
            y: 50
        },
        visible: { 
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 25
            }
        },
        exit: { 
            opacity: 0,
            scale: 0.8,
            y: 50,
            transition: {
                duration: 0.2
            }
        }
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    const inputVariants: Variants = {
        focus: { 
            scale: 1.02,
            transition: { type: "spring" as const, stiffness: 300 }
        }
    };

    if (!isOpen) return null;

    // The rest of the component remains the same, just with proper TypeScript types for event handlers
    // ... [Rest of the JSX remains unchanged]

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal */}
                    <motion.div
                        className="relative w-full max-w-4xl h-[85vh] bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                            background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        {/* Close Button */}
                        <motion.button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white hover:text-[#f2f862] transition-all duration-300 border border-white/20"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>

                        {/* Content */}
                        <div className="relative flex h-full">
                            {/* Left Side - Branding (Login) / Form (Signup) */}
                            <div className={`${mode === 'login' ? 'hidden lg:flex lg:w-2/5' : 'w-full lg:w-3/5'} ${mode === 'login' ? 'bg-gradient-to-br from-[#f2f862]/5 via-[#f2f862]/3 to-transparent' : ''} ${mode === 'login' ? 'flex-col justify-center items-center relative overflow-hidden' : 'p-4 lg:p-6 flex flex-col justify-center overflow-y-auto'} transition-all duration-500 ease-in-out`}>
                                {mode === 'login' ? (
                                    // Login - Branding on Left
                                    <div className="relative z-10 text-center">
                                        <motion.div
                                            className="mb-6"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                            >
                                            <h1 
                                                className="text-4xl font-black mb-2 text-white"
                                                style={{ 
                                                    fontFamily: "'General Sans', sans-serif",
                                                }}
                                            >
                                                EVENTIX
                                            </h1>
                                            <h1 
                                                className="text-8xl font-black"
                                                style={{ 
                                                    fontFamily: "'General Sans', sans-serif",
                                                    color: '#f2f862',
                                                    textShadow: '0 0 30px rgba(242, 248, 98, 0.5)'
                                                }}
                                            >
                                                360
                                            </h1>
                                        </motion.div>
                                        
                                        <motion.p 
                                            className="text-lg text-white/80 font-medium"
                                            style={{ fontFamily: "'Inter', sans-serif" }}
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            Campus Events
                                            <br />
                                            <span className="text-base text-white/60">Redefined</span>
                                        </motion.p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
                                        {errors.general && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
                                            >
                                                {errors.general}
                                            </motion.div>
                                        )}

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-white/60 mb-1">First Name</label>
                                                <motion.input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-2 bg-white/5 border ${errors.firstName ? 'border-red-500/50' : 'border-white/10'} rounded-lg focus:outline-none focus:border-[#f2f862]/50 text-white`}
                                                    variants={inputVariants}
                                                    whileFocus="focus"
                                                />
                                                {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-white/60 mb-1">Last Name</label>
                                                <motion.input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-2 bg-white/5 border ${errors.lastName ? 'border-red-500/50' : 'border-white/10'} rounded-lg focus:outline-none focus:border-[#f2f862]/50 text-white`}
                                                    variants={inputVariants}
                                                    whileFocus="focus"
                                                />
                                                {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white/60 mb-1">Email</label>
                                            <motion.input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-lg focus:outline-none focus:border-[#f2f862]/50 text-white`}
                                                variants={inputVariants}
                                                whileFocus="focus"
                                            />
                                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white/60 mb-1">Password</label>
                                            <motion.input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 bg-white/5 border ${errors.password ? 'border-red-500/50' : 'border-white/10'} rounded-lg focus:outline-none focus:border-[#f2f862]/50 text-white`}
                                                variants={inputVariants}
                                                whileFocus="focus"
                                            />
                                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white/60 mb-1">Confirm Password</label>
                                            <motion.input
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 bg-white/5 border ${errors.confirmPassword ? 'border-red-500/50' : 'border-white/10'} rounded-lg focus:outline-none focus:border-[#f2f862]/50 text-white`}
                                                variants={inputVariants}
                                                whileFocus="focus"
                                            />
                                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    type="checkbox"
                                                    name="agreeToTerms"
                                                    checked={formData.agreeToTerms}
                                                    onChange={handleInputChange}
                                                    className="w-4 h-4 border border-white/10 rounded bg-white/5 focus:ring-[#f2f862] focus:ring-1"
                                                />
                                            </div>
                                            <label className="ml-2 text-sm text-white/60">
                                                I agree to the <a href="/terms-of-service" className="text-[#f2f862] hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-[#f2f862] hover:underline">Privacy Policy</a>
                                            </label>
                                        </div>
                                        {errors.agreeToTerms && <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>}

                                        <motion.button
                                            type="submit"
                                            disabled={isLoading}
                                            className={`w-full py-3 rounded-lg text-black font-semibold bg-[#f2f862] hover:bg-[#f2f862]/90 transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {isLoading ? 'Creating Account...' : 'Create Account'}
                                        </motion.button>

                                        <div className="relative my-6">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-white/10"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-black/95 text-white/60">Or continue with</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <motion.button
                                                type="button"
                                                onClick={handleGoogleSignIn}
                                                disabled={socialLoading.google}
                                                className={`flex items-center justify-center w-full px-4 py-2 border border-white/10 rounded-lg text-white hover:bg-white/5 transition-all duration-200 ${socialLoading.google ? 'opacity-70 cursor-not-allowed' : ''}`}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {socialLoading.google ? 'Connecting...' : 'Google'}
                                            </motion.button>
                                            <motion.button
                                                type="button"
                                                onClick={handleGitHubSignIn}
                                                disabled={socialLoading.github}
                                                className={`flex items-center justify-center w-full px-4 py-2 border border-white/10 rounded-lg text-white hover:bg-white/5 transition-all duration-200 ${socialLoading.github ? 'opacity-70 cursor-not-allowed' : ''}`}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {socialLoading.github ? 'Connecting...' : 'GitHub'}
                                            </motion.button>
                                        </div>
                                    </form>
                                )}
                            </div>

                            {/* Right Side - Form (Login) / Branding (Signup) */}
                            <div className={`${mode === 'login' ? 'w-full lg:w-3/5' : 'hidden lg:flex lg:w-2/5'} ${mode === 'signup' ? 'bg-gradient-to-br from-[#f2f862]/5 via-[#f2f862]/3 to-transparent' : ''} ${mode === 'signup' ? 'flex-col justify-center items-center relative overflow-hidden' : 'p-4 lg:p-6 flex flex-col justify-center'}`}>
                                {mode === 'signup' ? (
                                    // Signup - Branding on Right
                                    <div className="relative z-10 text-center">
                                        <motion.div
                                            className="mb-6"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                        >
                                            <h1 
                                                className="text-4xl font-black mb-2 text-white"
                                                style={{ fontFamily: "'General Sans', sans-serif" }}
                                            >
                                                EVENTIX
                                            </h1>
                                            <h1 
                                                className="text-8xl font-black"
                                                style={{ 
                                                    fontFamily: "'General Sans', sans-serif",
                                                    color: '#f2f862',
                                                    textShadow: '0 0 30px rgba(242, 248, 98, 0.5)'
                                                }}
                                            >
                                                360
                                            </h1>
                                        </motion.div>
                                        
                                        <motion.p 
                                            className="text-lg text-white/80 font-medium"
                                            style={{ fontFamily: "'Inter', sans-serif" }}
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            Campus Events
                                            <br />
                                            <span className="text-base text-white/60">Redefined</span>
                                        </motion.p>
                                    </div>
                                ) : (
                                    // Login Form
                                    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
                                        {errors.general && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
                                            >
                                                {errors.general}
                                            </motion.div>
                                        )}

                                        <div>
                                            <label className="block text-sm font-medium text-white/60 mb-1">Email</label>
                                            <motion.input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-lg focus:outline-none focus:border-[#f2f862]/50 text-white`}
                                                variants={inputVariants}
                                                whileFocus="focus"
                                            />
                                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white/60 mb-1">Password</label>
                                            <motion.input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 bg-white/5 border ${errors.password ? 'border-red-500/50' : 'border-white/10'} rounded-lg focus:outline-none focus:border-[#f2f862]/50 text-white`}
                                                variants={inputVariants}
                                                whileFocus="focus"
                                            />
                                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                                        </div>

                                        <motion.button
                                            type="submit"
                                            disabled={isLoading}
                                            className={`w-full py-3 rounded-lg text-black font-semibold bg-[#f2f862] hover:bg-[#f2f862]/90 transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {isLoading ? 'Signing In...' : 'Sign In'}
                                        </motion.button>

                                        <div className="relative my-6">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-white/10"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-black/95 text-white/60">Or continue with</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <motion.button
                                                type="button"
                                                onClick={handleGoogleSignIn}
                                                disabled={socialLoading.google}
                                                className={`flex items-center justify-center w-full px-4 py-2 border border-white/10 rounded-lg text-white hover:bg-white/5 transition-all duration-200 ${socialLoading.google ? 'opacity-70 cursor-not-allowed' : ''}`}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {socialLoading.google ? 'Connecting...' : 'Google'}
                                            </motion.button>
                                            <motion.button
                                                type="button"
                                                onClick={handleGitHubSignIn}
                                                disabled={socialLoading.github}
                                                className={`flex items-center justify-center w-full px-4 py-2 border border-white/10 rounded-lg text-white hover:bg-white/5 transition-all duration-200 ${socialLoading.github ? 'opacity-70 cursor-not-allowed' : ''}`}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {socialLoading.github ? 'Connecting...' : 'GitHub'}
                                            </motion.button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
