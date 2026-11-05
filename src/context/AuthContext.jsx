import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext();

const DEMO_USERS = {
  customer: {
    id: 'usr-demo-01',
    email: 'arya@verdora.in',
    full_name: 'Arya Sharma',
    role: 'customer',
    phone: '+91 98201 44521',
    membership_tier: 'Botanical Connoisseur',
    member_since: 'March 2024',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    addresses: [
      {
        id: 'addr-01',
        isDefault: true,
        type: 'Home',
        recipient: 'Arya Sharma',
        street: 'Penthouse 4B, Silver Oak Heights, 14th Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
        phone: '+91 98201 44521',
      },
    ],
    orders: [
      {
        id: 'ord-8492',
        date: '28 October 2024',
        status: 'Delivered',
        items: [
          { name: 'Monstera Deliciosa', quantity: 1, price: 1899 },
          { name: 'Crassula Jade', quantity: 1, price: 799 },
        ],
        total: 2698,
        trackingNumber: 'VRD-8492-IN',
      },
      {
        id: 'ord-7310',
        date: '12 September 2024',
        status: 'Delivered',
        items: [{ name: 'Philodendron Birkin', quantity: 1, price: 1649 }],
        total: 1649,
        trackingNumber: 'VRD-7310-IN',
      },
    ],
  },
  admin: {
    id: 'usr-admin-01',
    email: 'admin@verdora.in',
    full_name: 'Elena Vance',
    role: 'admin',
    phone: '+91 99300 11223',
    membership_tier: 'Head Botanist & Admin',
    member_since: 'January 2024',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    addresses: [],
    orders: [],
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('verdora_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Persist local demo user session
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('verdora_auth_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('verdora_auth_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  // Sync with real Supabase Auth if credentials provided
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          full_name: session.user.user_metadata?.full_name || 'Botanical Member',
          role: 'customer',
        });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          full_name: session.user.user_metadata?.full_name || 'Botanical Member',
          role: 'customer',
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setAuthError('');

    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setUser({
          id: data.user.id,
          email: data.user.email,
          full_name: data.user.user_metadata?.full_name || 'Botanical Member',
          role: 'customer',
        });
        setIsLoading(false);
        return { success: true };
      }

      // Demo Auth Mode
      await new Promise((r) => setTimeout(r, 600));

      const normalized = email.toLowerCase().trim();
      if (normalized === 'admin@verdora.in' || normalized === 'admin') {
        setUser(DEMO_USERS.admin);
      } else {
        // Any valid customer login or demo customer
        setUser({
          ...DEMO_USERS.customer,
          email: normalized,
          full_name: normalized.includes('arya') ? 'Arya Sharma' : email.split('@')[0],
        });
      }

      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setAuthError(err.message || 'Invalid botanical login credentials.');
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  const signup = async (fullName, email, password) => {
    setIsLoading(true);
    setAuthError('');

    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (error) throw error;
        setUser({
          id: data.user.id,
          email: data.user.email,
          full_name: fullName,
          role: 'customer',
        });
        setIsLoading(false);
        return { success: true };
      }

      // Demo Signup
      await new Promise((r) => setTimeout(r, 600));
      const newUser = {
        id: `usr-${Date.now()}`,
        email,
        full_name: fullName,
        role: 'customer',
        phone: '+91 98000 00000',
        membership_tier: 'Botanical Enthusiast',
        member_since: 'Just now',
        avatar_url: null,
        addresses: [],
        orders: [],
      };

      setUser(newUser);
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setAuthError(err.message || 'Failed to initialize botanical profile.');
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('verdora_auth_user');
  };

  const demoLogin = (role = 'customer') => {
    setUser(DEMO_USERS[role] || DEMO_USERS.customer);
  };

  const updateProfile = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isAdmin: user?.role === 'admin',
        isLoading,
        authError,
        login,
        signup,
        logout,
        demoLogin,
        updateProfile,
        isSupabaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

