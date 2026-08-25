'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    _id: string;
    fullName: string;
    avatar: string;
    role: string;
    zaloId: string;
    phoneNumber?: string;
    loyaltyPoints?: number;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
    isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Hydrate state from localStorage on mount
        const storedUser = localStorage.getItem('manxi_user');
        const token = localStorage.getItem('manxi_token');

        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse user data', error);
                localStorage.removeItem('manxi_user');
                localStorage.removeItem('manxi_token');
            }
        }
        setIsLoading(false);
    }, []);

    const login = (token: string, userData: User) => {
        localStorage.setItem('manxi_token', token);
        localStorage.setItem('manxi_user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('manxi_token');
        localStorage.removeItem('manxi_user');
        setUser(null);
        router.refresh();
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
