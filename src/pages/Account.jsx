import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Package,
  MapPin,
  Bell,
  LogOut,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export default function Account() {
  const {
    user,
    isAuthenticated,
    isAdmin,
    login,
    signup,
    logout,
    demoLogin,
    updateProfile,
    isLoading,
    authError,
  } = useAuth();

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [activeProfileTab, setActiveProfileTab] = useState('orders'); // 'orders' | 'addresses' | 'preferences' | 'profile'

  // Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [newsletterOptIn, setNewsletterOptIn] = useState(true);

  // Edit Profile State
  const [editName, setEditName] = useState(user?.full_name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [profileSaved, setProfileSaved] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;
    await login(loginEmail, loginPassword);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword) return;
    await signup(signupName, signupEmail, signupPassword);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ full_name: editName, phone: editPhone });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-offwhite text-charcoal flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-6 sm:px-12 py-12 w-full space-y-12">
        {!isAuthenticated ? (
          /* ============================================== */
          /* AUTHENTICATION FORM: LOGIN / SIGNUP */
          /* ============================================== */
          <div className="max-w-md mx-auto space-y-8 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-botanical font-semibold block">
                The Living Circle
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-forest tracking-tight">
                {authMode === 'login' ? 'Welcome Back' : 'Create Botanical Profile'}
              </h1>
              <p className="font-sans text-xs sm:text-sm text-charcoal/70">
                {authMode === 'login'
                  ? 'Access your orders, saved addresses, and botanical care schedules.'
                  : 'Join the VERDORA community for exclusive rare drops and complimentary diagnostic support.'}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex border-b border-forest/15">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-3 text-xs uppercase font-sans tracking-widest font-semibold transition-colors border-b-2 ${
                  authMode === 'login'
                    ? 'border-forest text-forest'
                    : 'border-transparent text-charcoal/40 hover:text-forest'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-3 text-xs uppercase font-sans tracking-widest font-semibold transition-colors border-b-2 ${
                  authMode === 'signup'
                    ? 'border-forest text-forest'
                    : 'border-transparent text-charcoal/40 hover:text-forest'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-editorial">
                {authError}
              </div>
            )}

            {/* Forms */}
            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4 bg-white p-6 sm:p-8 rounded-editorial border border-forest/15 shadow-subtle">
                <Input
                  label="Email Address"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="your.email@botanical.com"
                  icon={Mail}
                  required
                />

                <Input
                  label="Password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  icon={Lock}
                  required
                />

                <div className="flex items-center justify-between text-xs font-sans text-charcoal/70 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-forest" />
                    <span>Remember me</span>
                  </label>
                  <a href="#forgot" className="text-forest hover:underline">
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth={true}
                  size="md"
                  isLoading={isLoading}
                >
                  Sign In to VERDORA
                </Button>

                {/* Quick 1-Click Demo Logins for Pair Programming & Testing */}
                <div className="pt-4 border-t border-forest/10 space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-charcoal/50 block text-center">
                    Quick Demo Evaluation Logins
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => demoLogin('customer')}
                      className="p-2 bg-cream text-forest rounded-editorial text-xs font-sans font-medium hover:bg-forest hover:text-cream transition-colors text-center border border-forest/10"
                    >
                      Demo Customer
                    </button>
                    <button
                      type="button"
                      onClick={() => demoLogin('admin')}
                      className="p-2 bg-forest-900 text-sage rounded-editorial text-xs font-sans font-medium hover:bg-forest hover:text-cream transition-colors text-center border border-forest-700"
                    >
                      Demo Admin
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit} className="space-y-4 bg-white p-6 sm:p-8 rounded-editorial border border-forest/15 shadow-subtle">
                <Input
                  label="Full Name"
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="Arya Sharma"
                  icon={User}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="your.email@botanical.com"
                  icon={Mail}
                  required
                />

                <Input
                  label="Create Password"
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="••••••••"
                  icon={Lock}
                  required
                />

                <label className="flex items-start gap-2 text-xs font-sans text-charcoal/70 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={newsletterOptIn}
                    onChange={(e) => setNewsletterOptIn(e.target.checked)}
                    className="accent-forest mt-0.5"
                  />
                  <span>
                    Enroll in The Green Dispatch for weekly watering alerts and VIP drop notices.
                  </span>
                </label>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth={true}
                  size="md"
                  isLoading={isLoading}
                >
                  Create Account
                </Button>
              </form>
            )}
          </div>
        ) : (
          /* ============================================== */
          /* AUTHENTICATED PROFILE & DASHBOARD */
          /* ============================================== */
          <div className="space-y-10 animate-fadeIn">
            {/* Profile Overview Header Card */}
            <div className="p-8 bg-forest text-cream rounded-editorial border border-forest-800 shadow-floating flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-subtle-pattern-light opacity-30 pointer-events-none" />

              <div className="flex items-center gap-5 relative z-10">
                <div className="w-16 h-16 rounded-full bg-sage/20 border-2 border-sage/40 flex items-center justify-center font-serif text-2xl text-sage font-medium overflow-hidden shrink-0">
                  {user.avatar_url ? (
                    <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
                  ) : (
                    user.full_name?.charAt(0) || 'V'
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h1 className="font-serif text-2xl sm:text-3xl text-cream font-medium">
                      {user.full_name}
                    </h1>
                    {isAdmin && (
                      <span className="text-[10px] uppercase font-mono tracking-widest bg-sage text-forest px-2.5 py-0.5 rounded font-bold">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-sage/80 font-mono">{user.email}</p>
                  <p className="text-xs text-cream/70 font-sans">
                    Tier: <strong className="text-sage">{user.membership_tier || 'Botanical Collector'}</strong> · Member since {user.member_since || '2024'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 relative z-10 self-start md:self-auto">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-sage text-forest rounded-editorial text-xs font-sans tracking-editorial uppercase font-semibold hover:bg-cream transition-colors"
                  >
                    <span>Admin Dashboard</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                )}

                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-cream/30 hover:border-cream rounded-editorial text-xs font-sans tracking-editorial uppercase text-cream/90 hover:text-cream transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Profile Tab Navigation */}
            <div className="flex border-b border-forest/15 font-sans text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => setActiveProfileTab('orders')}
                className={`py-3 px-4 font-medium transition-colors border-b-2 flex items-center gap-2 ${
                  activeProfileTab === 'orders'
                    ? 'border-forest text-forest font-semibold'
                    : 'border-transparent text-charcoal/50 hover:text-forest'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Recent Orders</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveProfileTab('addresses')}
                className={`py-3 px-4 font-medium transition-colors border-b-2 flex items-center gap-2 ${
                  activeProfileTab === 'addresses'
                    ? 'border-forest text-forest font-semibold'
                    : 'border-transparent text-charcoal/50 hover:text-forest'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveProfileTab('preferences')}
                className={`py-3 px-4 font-medium transition-colors border-b-2 flex items-center gap-2 ${
                  activeProfileTab === 'preferences'
                    ? 'border-forest text-forest font-semibold'
                    : 'border-transparent text-charcoal/50 hover:text-forest'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>Care Alerts</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveProfileTab('profile')}
                className={`py-3 px-4 font-medium transition-colors border-b-2 flex items-center gap-2 ${
                  activeProfileTab === 'profile'
                    ? 'border-forest text-forest font-semibold'
                    : 'border-transparent text-charcoal/50 hover:text-forest'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Account Settings</span>
              </button>
            </div>

            {/* Profile Tab Content */}
            <div className="space-y-6">
              {/* TAB 1: RECENT ORDERS */}
              {activeProfileTab === 'orders' && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl text-forest">Order History</h3>
                  {user.orders && user.orders.length > 0 ? (
                    user.orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-6 bg-white rounded-editorial border border-forest/15 shadow-subtle space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-forest/10 gap-2">
                          <div>
                            <span className="font-mono text-xs uppercase tracking-widest text-forest font-bold">
                              Order #{ord.id}
                            </span>
                            <span className="text-xs text-charcoal/50 font-sans ml-3">
                              Placed on {ord.date}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="px-2.5 py-0.5 rounded-pill text-[10px] uppercase font-mono tracking-wider font-semibold bg-botanical/15 text-botanical border border-botanical/25">
                              {ord.status}
                            </span>
                            <span className="font-sans font-bold text-sm text-forest">
                              ₹{ord.total.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-xs font-sans text-charcoal/80">
                              <span>
                                {item.quantity}× {item.name}
                              </span>
                              <span className="font-mono">₹{item.price.toLocaleString('en-IN')}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 flex justify-between items-center text-xs font-sans text-charcoal/60">
                          <span className="font-mono text-[11px]">
                            Tracking ID: {ord.trackingNumber}
                          </span>
                          <Link
                            to="/track-order"
                            className="text-forest hover:text-botanical underline font-medium"
                          >
                            Track Live Parcel &rarr;
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 bg-white rounded-editorial border border-forest/10 text-center space-y-3">
                      <p className="font-serif text-lg text-forest">No orders recorded yet</p>
                      <p className="text-xs text-charcoal/60">
                        Explore our botanical catalog and acquire your first living companion.
                      </p>
                      <Button to="/shop" variant="secondary" size="sm">
                        Browse Plants
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: SAVED ADDRESSES */}
              {activeProfileTab === 'addresses' && (
                <div className="space-y-4 max-w-2xl">
                  <h3 className="font-serif text-xl text-forest">Saved Delivery Locations</h3>
                  {user.addresses && user.addresses.length > 0 ? (
                    user.addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="p-6 bg-white rounded-editorial border border-forest/15 shadow-subtle space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono uppercase tracking-wider text-botanical font-bold">
                            {addr.type} · {addr.isDefault ? 'Default' : ''}
                          </span>
                          <button type="button" className="text-xs text-forest hover:underline">
                            Edit
                          </button>
                        </div>
                        <p className="font-serif text-base text-forest">{addr.recipient}</p>
                        <p className="text-xs font-sans text-charcoal/70 leading-relaxed">
                          {addr.street}, {addr.city}, {addr.state} — {addr.pincode}
                        </p>
                        <p className="text-xs font-mono text-charcoal/50">Phone: {addr.phone}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 bg-white rounded-editorial border border-forest/10 text-center text-xs text-charcoal/60">
                      No addresses saved yet. They will be added automatically during checkout.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: CARE ALERTS */}
              {activeProfileTab === 'preferences' && (
                <div className="p-6 sm:p-8 bg-white rounded-editorial border border-forest/15 shadow-subtle space-y-6 max-w-2xl">
                  <h3 className="font-serif text-xl text-forest">Plant Diagnostic & Notification Settings</h3>

                  <div className="space-y-4">
                    <label className="flex items-start justify-between gap-4 p-3 rounded-editorial border border-forest/10 cursor-pointer hover:bg-offwhite">
                      <div>
                        <span className="block font-serif text-sm text-forest font-medium">
                          Weekly Seasonal Watering Regimen
                        </span>
                        <span className="block text-xs text-charcoal/60 font-sans mt-0.5">
                          Receive weather-adjusted watering prompts based on your local humidity.
                        </span>
                      </div>
                      <input type="checkbox" defaultChecked className="accent-forest mt-1 w-4 h-4" />
                    </label>

                    <label className="flex items-start justify-between gap-4 p-3 rounded-editorial border border-forest/10 cursor-pointer hover:bg-offwhite">
                      <div>
                        <span className="block font-serif text-sm text-forest font-medium">
                          Rare Variegated Collector Drops
                        </span>
                        <span className="block text-xs text-charcoal/60 font-sans mt-0.5">
                          24-hour priority email access before rare cultivars are released publicly.
                        </span>
                      </div>
                      <input type="checkbox" defaultChecked className="accent-forest mt-1 w-4 h-4" />
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 4: ACCOUNT SETTINGS */}
              {activeProfileTab === 'profile' && (
                <form
                  onSubmit={handleSaveProfile}
                  className="p-6 sm:p-8 bg-white rounded-editorial border border-forest/15 shadow-subtle space-y-4 max-w-xl"
                >
                  <h3 className="font-serif text-xl text-forest">Edit Profile Details</h3>

                  <Input
                    label="Full Name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />

                  <Input
                    label="Phone Number"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="+91 98000 00000"
                  />

                  {profileSaved && (
                    <p className="text-xs text-botanical font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Profile updated successfully!
                    </p>
                  )}

                  <div className="pt-2">
                    <Button type="submit" variant="primary" size="md">
                      Save Profile Changes
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

