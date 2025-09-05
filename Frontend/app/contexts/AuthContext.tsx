"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  uid: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  photoURL: string | null;
}

interface AuthResult {
  success: boolean;
  error?: string;
  user?: User;
}

interface UserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (userData: UserData) => Promise<AuthResult>;
  loginWithGoogle: () => Promise<AuthResult>;
  logout: () => Promise<AuthResult>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Mock authentication functions
const mockSignUpWithEmail = async (email: string, password: string, userData: UserData): Promise<AuthResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }
  
  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters' };
  }
  
  // Mock successful signup
  const mockUser: User = {
    uid: `user_${Date.now()}`,
    email: email,
    displayName: `${userData.firstName} ${userData.lastName}`,
    firstName: userData.firstName,
    lastName: userData.lastName,
    photoURL: null
  };
  
  return { success: true, user: mockUser };
};

const mockSignInWithEmail = async (email: string, password: string): Promise<AuthResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }
  
  // Mock successful login
  const mockUser: User = {
    uid: `user_${Date.now()}`,
    email: email,
    displayName: 'Mock User',
    firstName: 'Mock',
    lastName: 'User',
    photoURL: null
  };
  
  return { success: true, user: mockUser };
};

const mockSignInWithGoogle = async (): Promise<AuthResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock successful Google login
  const mockUser: User = {
    uid: `google_user_${Date.now()}`,
    email: 'mockuser@gmail.com',
    displayName: 'Google Mock User',
    firstName: 'Google',
    lastName: 'User',
    photoURL: 'https://via.placeholder.com/150'
  };
  
  return { success: true, user: mockUser };
};

const mockSignOutUser = async (): Promise<AuthResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
    const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
        setAuthModalMode(mode);
        setIsAuthModalOpen(true);
    };

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
    };

    const login = async (email: string, password: string): Promise<AuthResult> => {
        setLoading(true);
        try {
            const result = await mockSignInWithEmail(email, password);
            if (result.success) {
                setUser(result.user as User);
                closeAuthModal();
                // Redirect to homepage after successful login
                router.push('/');
                return { success: true };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error instanceof Error ? error.message : 'An error occurred' };
        } finally {
            setLoading(false);
        }
    };

    const signup = async (userData: UserData): Promise<AuthResult> => {
        setLoading(true);
        try {
            const result = await mockSignUpWithEmail(userData.email, userData.password, userData);
            if (result.success) {
                setUser(result.user as User);
                closeAuthModal();
                // Redirect to homepage after successful signup
                router.push('/');
                return { success: true };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, error: error instanceof Error ? error.message : 'An error occurred' };
        } finally {
            setLoading(false);
        }
    };

    const loginWithGoogle = async (): Promise<AuthResult> => {
        setLoading(true);
        try {
            const result = await mockSignInWithGoogle();
            if (result.success) {
                setUser(result.user as User);
                closeAuthModal();
                // Redirect to homepage after successful Google login
                router.push('/');
                return { success: true };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('Google login error:', error);
            return { success: false, error: error instanceof Error ? error.message : 'An error occurred' };
        } finally {
            setLoading(false);
        }
    };

    const logout = async (): Promise<AuthResult> => {
        setLoading(true);
        try {
            await mockSignOutUser();
            setUser(null);
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, error: error instanceof Error ? error.message : 'An error occurred' };
        } finally {
            setLoading(false);
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        signup,
        loginWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
