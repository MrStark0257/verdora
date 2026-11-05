import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { products as initialProducts } from '../data/products';
import { getAssetUrl } from '../utils/assetUrl';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Logo from '../components/brand/Logo';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Truck,
  Plus,
  Minus,
  Search,
  Filter,
  Save,
  Eye,
  LogOut,
  ArrowUpRight,
  Sparkles,
  Leaf,
  Store,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

const ORDER_STATUS_OPTIONS = [
  'Processing & Nursery Packed',
  'Hydration Conditioning',
  'In Transit',
  'Delivered',
  'Cancelled',
];

export default function Admin() {
  const navigate = useNavigate();
  const { user, isAuthenticated, login, demoLogin, logout } = useAuth();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'orders' | 'inventory' | 'customers' | 'cms'

  // Admin Login Form State for unauthenticated or non-admin users
  const [adminEmail, setAdminEmail] = useState('admin@verdora.in');
  const [adminPassword, setAdminPassword] = useState('verdora123');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data states
  const [orders, setOrders] = useState([]);
  const [orderFilter, setOrderFilter] = useState('All');
  const [products, setProducts] = useState(initialProducts);
  const [productSearch, setProductSearch] = useState('');
  const [cmsSettings, setCmsSettings] = useState({
    announcement: 'Free Shipping on Orders Above ₹999 | Discover Your Green Side.',
    heroHeadline: 'Let Nature Find Its Place.',
    featuredHeadline: 'Bring the Outdoors In.',
  });
  const [saveFeedback, setSaveFeedback] = useState('');

  // Initial Load from localStorage
  useEffect(() => {
    // Load orders
    try {
      const storedOrders = JSON.parse(localStorage.getItem('verdora_orders') || '[]');
      const samples = [
        {
          orderId: 'VRD-8421-IN',
          customerName: 'Aarav Sharma',
          email: 'aarav.sharma@example.com',
          phone: '+91 98201 44521',
          address: 'Worli Sea Face, Mumbai',
          date: '4 November 2026',
          status: 'In Transit',
          total: 3898,
          items: [
            { name: 'Monstera Deliciosa', quantity: 1, price: 1899 },
            { name: 'Fiddle Leaf Fig', quantity: 1, price: 1999 },
          ],
        },
        {
          orderId: 'VRD-7104-IN',
          customerName: 'Ananya Roy',
          email: 'ananya.roy@example.com',
          phone: '+91 97112 30891',
          address: 'Safdarjung Enclave, New Delhi',
          date: '2 November 2026',
          status: 'Delivered',
          total: 2499,
          items: [{ name: 'Monstera Albo Borsigiana', quantity: 1, price: 2499 }],
        },
        {
          orderId: 'VRD-6291-IN',
          customerName: 'Vikram Malhotra',
          email: 'vikram.m@example.com',
          phone: '+91 98450 12894',
          address: 'Indiranagar 100ft Rd, Bengaluru',
          date: '5 November 2026',
          status: 'Processing & Nursery Packed',
          total: 1849,
          items: [{ name: 'Bird of Paradise', quantity: 1, price: 1849 }],
        },
      ];

      const combined = [...storedOrders];
      samples.forEach((s) => {
        if (!combined.some((o) => o.orderId === s.orderId)) {
          combined.push(s);
        }
      });
      setOrders(combined);
    } catch {
      setOrders([]);
    }

    // Load inventory overrides
    try {
      const storedInv = JSON.parse(localStorage.getItem('verdora_inventory') || '{}');
      if (Object.keys(storedInv).length > 0) {
        setProducts((prev) =>
          prev.map((p) => (storedInv[p.id] ? { ...p, ...storedInv[p.id] } : p))
        );
      }
    } catch {
      // ignore
    }

    // Load CMS settings
    try {
      const storedCms = JSON.parse(localStorage.getItem('verdora_cms') || '{}');
      if (storedCms.announcement) {
        setCmsSettings((prev) => ({ ...prev, ...storedCms }));
      }
    } catch {
      // ignore
    }
  }, []);

  // Handle Admin Login submission
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    const res = await login(adminEmail, adminPassword);
    setIsLoggingIn(false);
    if (!res.success) {
      setLoginError(res.error || 'Authentication rejected. Verification failed.');
    }
  };

  // Quick 1-click admin demo login
  const handleQuickAdminLogin = () => {
    demoLogin('admin');
  };

  // Update order status in state & localStorage
  const handleStatusChange = (orderId, newStatus) => {
    const updated = orders.map((ord) => {
      if (ord.orderId === orderId) {
        return { ...ord, status: newStatus };
      }
      return ord;
    });

    setOrders(updated);
    try {
      localStorage.setItem('verdora_orders', JSON.stringify(updated));
      showFeedback(`Order ${orderId} status set to "${newStatus}"`);
    } catch (e) {
      console.error(e);
    }
  };

  // Adjust product stock
  const handleStockChange = (productId, delta) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        const nextStock = Math.max(0, (p.stock ?? 12) + delta);
        return { ...p, stock: nextStock };
      }
      return p;
    });

    setProducts(updated);
    persistInventory(updated);
  };

  // Toggle bestseller or featured
  const handleToggleBadge = (productId, field) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        return { ...p, [field]: !p[field] };
      }
      return p;
    });

    setProducts(updated);
    persistInventory(updated);
    showFeedback(`Product badge updated`);
  };

  // Update price
  const handlePriceChange = (productId, newPrice) => {
    const parsed = parseInt(newPrice, 10);
    if (isNaN(parsed) || parsed < 0) return;

    const updated = products.map((p) => {
      if (p.id === productId) {
        return { ...p, price: parsed };
      }
      return p;
    });

    setProducts(updated);
    persistInventory(updated);
  };

  const persistInventory = (prods) => {
    const invMap = {};
    prods.forEach((p) => {
      invMap[p.id] = {
        stock: p.stock ?? 12,
        price: p.price,
        bestseller: p.bestseller,
        featured: p.featured,
      };
    });
    try {
      localStorage.setItem('verdora_inventory', JSON.stringify(invMap));
    } catch (e) {
      console.error(e);
    }
  };

  // Save CMS Content
  const handleSaveCms = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('verdora_cms', JSON.stringify(cmsSettings));
      showFeedback('Editorial CMS configuration successfully saved.');
    } catch (e) {
      console.error(e);
    }
  };

  const showFeedback = (msg) => {
    setSaveFeedback(msg);
    setTimeout(() => setSaveFeedback(''), 3000);
  };

  // Computed overview figures
  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.total || 0), 24150);
  const totalOrdersCount = orders.length + 12;
  const filteredOrders =
    orderFilter === 'All'
      ? orders
      : orders.filter((o) => (o.status || '').toLowerCase().includes(orderFilter.toLowerCase()));

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  // -------------------------------------------------------------
  // GUARD: If not logged in or not admin, show Protected Lock Screen
  // -------------------------------------------------------------
  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-offwhite flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
        <div className="max-w-md w-full bg-white border border-forest/15 rounded-3xl p-8 sm:p-10 shadow-editorial text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-forest/5 border border-forest/15 flex items-center justify-center mx-auto mb-6 text-forest">
            <ShieldAlert className="w-8 h-8 text-botanical" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-botanical font-semibold block mb-1">
            Restricted Atelier Zone
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-forest font-bold mb-2">
            VERDORA Atelier Management
          </h1>
          <p className="text-xs text-charcoal/70 mb-8 leading-relaxed">
            This dashboard is reserved for VERDORA botanical directors, greenhouse inventory controllers, and logistics dispatchers.
          </p>

          {loginError && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 text-left">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left mb-6">
            <Input
              label="Staff Access Email"
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="admin@verdora.in"
              required
            />
            <Input
              label="Security Keyphrase"
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoggingIn}
              icon={ShieldCheck}
            >
              Verify Administrative Credentials
            </Button>
          </form>

          {/* Quick Demo Access Bypass */}
          <div className="pt-6 border-t border-forest/10 space-y-3">
            <span className="text-[11px] text-charcoal/50 font-mono block">
              Evaluation & Examiner Demonstration Access:
            </span>
            <Button
              type="button"
              variant="outline"
              size="md"
              fullWidth
              onClick={handleQuickAdminLogin}
              icon={Sparkles}
            >
              1-Click Sign In as Head Botanist (Admin)
            </Button>
          </div>

          <div className="mt-6">
            <Link
              to="/"
              className="text-xs text-forest/70 hover:text-forest transition-colors inline-flex items-center gap-1 font-mono"
            >
              <Store className="w-3.5 h-3.5" />
              Return to Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD VIEW
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F6F8F5] text-charcoal flex flex-col font-sans">
      {/* Top Administrative Bar */}
      <header className="bg-forest text-cream border-b border-forest/30 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-subtle">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Logo theme="light" size="sm" showSubline={false} />
            <span className="text-[10px] font-mono uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded text-sage">
              Atelier CMS v2.4
            </span>
          </div>
        </div>

        {/* User Pill & Quick Actions */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            to="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1 text-xs text-sage hover:text-cream transition-colors font-mono"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Live Storefront</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>

          <div className="flex items-center gap-2 pl-3 border-l border-white/15">
            <img
              src={user.avatar_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'}
              alt={user.full_name}
              className="w-7 h-7 rounded-full object-cover border border-sage/40"
            />
            <div className="hidden md:block text-left text-xs leading-none">
              <span className="font-semibold block text-cream">{user.full_name}</span>
              <span className="text-[10px] text-sage font-mono">Head Botanist & Admin</span>
            </div>
            <button
              onClick={logout}
              title="Sign Out of Atelier"
              className="p-1.5 rounded-lg hover:bg-white/10 text-sage hover:text-white transition-colors ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Save / Action Notification */}
      {saveFeedback && (
        <div className="fixed bottom-6 right-6 z-50 bg-forest text-cream px-4 py-2.5 rounded-xl shadow-editorial border border-sage/30 flex items-center gap-2 text-xs font-mono animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-sage" />
          <span>{saveFeedback}</span>
        </div>
      )}

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-forest/10 mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-forest font-bold">
              Atelier Command Center
            </h1>
            <p className="text-xs text-charcoal/60 mt-1">
              Live botanical inventory, nursery dispatch telemetry, and editorial storefront controls.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-cream/70 p-1.5 rounded-xl border border-forest/15 overflow-x-auto max-w-full">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'orders', label: 'Orders & Logistics', icon: Truck },
              { id: 'inventory', label: 'Plant Catalog', icon: Leaf },
              { id: 'customers', label: 'Customers', icon: Users },
              { id: 'cms', label: 'Storefront CMS', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-forest text-cream shadow-sm'
                      : 'text-charcoal/70 hover:text-forest hover:bg-forest/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: OVERVIEW METRICS */}
        {/* ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white border border-forest/10 rounded-2xl p-6 shadow-subtle">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase text-charcoal/60">Gross Botanical Revenue</span>
                  <div className="w-8 h-8 rounded-lg bg-botanical/10 text-botanical flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-forest mb-1">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-botanical font-mono flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +18.4% vs last harvest month
                </span>
              </div>

              <div className="bg-white border border-forest/10 rounded-2xl p-6 shadow-subtle">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase text-charcoal/60">Dispatched Orders</span>
                  <div className="w-8 h-8 rounded-lg bg-forest/10 text-forest flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-forest mb-1">
                  {totalOrdersCount} Shipments
                </div>
                <span className="text-[11px] text-charcoal/60 font-mono">
                  96.8% transit survival rating
                </span>
              </div>

              <div className="bg-white border border-forest/10 rounded-2xl p-6 shadow-subtle">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase text-charcoal/60">Living Cultivars</span>
                  <div className="w-8 h-8 rounded-lg bg-sage/20 text-forest flex items-center justify-center">
                    <Leaf className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-forest mb-1">
                  {products.length} Species
                </div>
                <span className="text-[11px] text-botanical font-mono">
                  6 greenhouse categories
                </span>
              </div>

              <div className="bg-white border border-forest/10 rounded-2xl p-6 shadow-subtle">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase text-charcoal/60">Average Cart Size</span>
                  <div className="w-8 h-8 rounded-lg bg-earth/10 text-earth flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-forest mb-1">
                  ₹2,640
                </div>
                <span className="text-[11px] text-charcoal/60 font-mono">
                  1.8 plants per order
                </span>
              </div>
            </div>

            {/* Quick Status & Nursery Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Recent Orders Overview */}
              <div className="lg:col-span-8 bg-white border border-forest/10 rounded-2xl p-6 shadow-subtle">
                <div className="flex items-center justify-between pb-4 border-b border-forest/10 mb-4">
                  <h3 className="font-serif text-lg text-forest font-bold">
                    Active Nursery Orders
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-botanical hover:underline font-mono"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans">
                    <thead>
                      <tr className="border-b border-forest/10 text-charcoal/50 uppercase font-mono text-[10px]">
                        <th className="pb-3 font-medium">Order ID</th>
                        <th className="pb-3 font-medium">Customer</th>
                        <th className="pb-3 font-medium">Items</th>
                        <th className="pb-3 font-medium">Total</th>
                        <th className="pb-3 font-medium">Fulfillment Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-forest/5">
                      {orders.slice(0, 5).map((ord) => (
                        <tr key={ord.orderId} className="hover:bg-cream/30">
                          <td className="py-3.5 font-mono text-forest font-semibold">
                            {ord.orderId}
                          </td>
                          <td className="py-3.5 font-medium text-charcoal">
                            {ord.customerName}
                          </td>
                          <td className="py-3.5 text-charcoal/70">
                            {ord.items?.length || 1} plant(s)
                          </td>
                          <td className="py-3.5 font-bold text-forest">
                            ₹{ord.total?.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3.5">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-medium ${
                                ord.status === 'Delivered'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : ord.status === 'In Transit'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {ord.status || 'Processing'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Category Breakdown & Warehouse Telemetry */}
              <div className="lg:col-span-4 bg-white border border-forest/10 rounded-2xl p-6 shadow-subtle space-y-6">
                <div>
                  <h3 className="font-serif text-lg text-forest font-bold mb-3">
                    Nursery Species Split
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-charcoal/70 mb-1">
                        <span>Indoor Plants</span>
                        <span className="font-mono">45%</span>
                      </div>
                      <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
                        <div className="h-full bg-forest rounded-full" style={{ width: '45%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-charcoal/70 mb-1">
                        <span>Rare & Variegated</span>
                        <span className="font-mono">25%</span>
                      </div>
                      <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
                        <div className="h-full bg-botanical rounded-full" style={{ width: '25%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-charcoal/70 mb-1">
                        <span>Succulents & Cacti</span>
                        <span className="font-mono">18%</span>
                      </div>
                      <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
                        <div className="h-full bg-sage rounded-full" style={{ width: '18%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-charcoal/70 mb-1">
                        <span>Flowering & Balcony</span>
                        <span className="font-mono">12%</span>
                      </div>
                      <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
                        <div className="h-full bg-earth rounded-full" style={{ width: '12%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Greenhouse Environment Telemetry */}
                <div className="p-4 rounded-xl bg-forest/5 border border-forest/10 space-y-2 text-xs">
                  <span className="font-mono text-[10px] uppercase text-botanical tracking-wider font-semibold block">
                    Pune Master Greenhouse
                  </span>
                  <div className="flex justify-between text-charcoal/80">
                    <span>Chamber Ambient Temp</span>
                    <span className="font-mono font-bold text-forest">23.4°C</span>
                  </div>
                  <div className="flex justify-between text-charcoal/80">
                    <span>Misting Relative Humidity</span>
                    <span className="font-mono font-bold text-forest">68% RH</span>
                  </div>
                  <div className="flex justify-between text-charcoal/80">
                    <span>Irrigation Substrate Sensor</span>
                    <span className="font-mono text-emerald-700 font-bold">Optimal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: ORDERS MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'orders' && (
          <div className="bg-white border border-forest/10 rounded-2xl p-6 shadow-subtle space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-forest/10">
              <div>
                <h2 className="font-serif text-xl text-forest font-bold">
                  Order Management & Carrier Dispatch
                </h2>
                <p className="text-xs text-charcoal/60 mt-0.5">
                  Update parcel logistics steps. Changes immediately reflect on the live customer tracking portal.
                </p>
              </div>

              {/* Status Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {['All', 'Processing', 'In Transit', 'Delivered'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      orderFilter === st
                        ? 'bg-forest text-cream border-forest font-semibold'
                        : 'bg-white text-forest/70 border-forest/20 hover:border-forest/40'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-forest/10 text-charcoal/50 uppercase font-mono text-[10px]">
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Date Placed</th>
                    <th className="pb-3 font-medium">Customer Coordinates</th>
                    <th className="pb-3 font-medium">Consignment Items</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Fulfillment Action</th>
                    <th className="pb-3 font-medium text-right">Track Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/5">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.orderId} className="hover:bg-cream/20 transition-colors">
                      <td className="py-4 font-mono font-bold text-forest">
                        {ord.orderId}
                      </td>
                      <td className="py-4 text-charcoal/70">
                        {ord.date || 'Recent'}
                      </td>
                      <td className="py-4">
                        <div className="font-medium text-charcoal">{ord.customerName}</div>
                        <div className="text-[11px] text-charcoal/50 truncate max-w-xs">
                          {ord.address || ord.email}
                        </div>
                      </td>
                      <td className="py-4 text-charcoal/80">
                        {(ord.items || []).map((it, i) => (
                          <div key={i} className="text-[11px] truncate max-w-[180px]">
                            {it.quantity}x {it.name}
                          </div>
                        ))}
                      </td>
                      <td className="py-4 font-bold text-forest">
                        ₹{ord.total?.toLocaleString('en-IN')}
                      </td>
                      <td className="py-4">
                        {/* Status Select dropdown */}
                        <select
                          value={ord.status || 'Processing & Nursery Packed'}
                          onChange={(e) => handleStatusChange(ord.orderId, e.target.value)}
                          className="text-xs bg-cream/50 border border-forest/20 rounded-lg px-2.5 py-1.5 font-medium text-forest focus:outline-none focus:border-botanical cursor-pointer"
                        >
                          {ORDER_STATUS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 text-right">
                        <Link
                          to={`/track-order?id=${ord.orderId}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-botanical hover:underline"
                        >
                          <span>Live View</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: PLANT CATALOG & INVENTORY */}
        {/* ======================================================== */}
        {activeTab === 'inventory' && (
          <div className="bg-white border border-forest/10 rounded-2xl p-6 shadow-subtle space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-forest/10">
              <div>
                <h2 className="font-serif text-xl text-forest font-bold">
                  Living Botanical Inventory & Stock Control
                </h2>
                <p className="text-xs text-charcoal/60 mt-0.5">
                  Adjust active greenhouse stock numbers, update retail prices in INR, and toggle bestseller badges.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-forest/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter species..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-cream/40 border border-forest/15 rounded-lg pl-9 pr-3 py-1.5 text-xs text-forest placeholder:text-charcoal/40 focus:outline-none focus:border-botanical"
                />
              </div>
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-forest/10 text-charcoal/50 uppercase font-mono text-[10px]">
                    <th className="pb-3 font-medium">Specimen</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Price (₹ INR)</th>
                    <th className="pb-3 font-medium">Available Nursery Stock</th>
                    <th className="pb-3 font-medium">Editorial Badges</th>
                    <th className="pb-3 font-medium text-right">View Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/5">
                  {filteredProducts.map((prod) => {
                    const currentStock = prod.stock ?? 14;
                    const isLowStock = currentStock <= 4;

                    return (
                      <tr key={prod.id} className="hover:bg-cream/20 transition-colors">
                        <td className="py-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={getAssetUrl(prod.image)}
                              alt={prod.name}
                              className="w-10 h-10 rounded-lg object-cover bg-cream border border-forest/10"
                            />
                            <div>
                              <div className="font-semibold text-forest text-xs">{prod.name}</div>
                              <div className="text-[10px] text-charcoal/50 italic">
                                {prod.botanicalName}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 text-charcoal/70 capitalize">
                          {prod.category}
                        </td>

                        <td className="py-3.5">
                          <div className="flex items-center gap-1">
                            <span className="text-forest font-bold">₹</span>
                            <input
                              type="number"
                              value={prod.price}
                              onChange={(e) => handlePriceChange(prod.id, e.target.value)}
                              className="w-20 bg-cream/40 border border-forest/20 rounded px-2 py-1 text-xs font-bold text-forest focus:outline-none focus:border-botanical"
                            />
                          </div>
                        </td>

                        <td className="py-3.5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleStockChange(prod.id, -1)}
                              className="w-6 h-6 rounded bg-cream border border-forest/20 flex items-center justify-center text-forest hover:bg-forest/10"
                            >
                              <Minus className="w-3 h-3" />
                            </button>

                            <span
                              className={`w-8 text-center font-mono font-bold text-xs ${
                                isLowStock ? 'text-amber-700 bg-amber-50 rounded px-1' : 'text-forest'
                              }`}
                            >
                              {currentStock}
                            </span>

                            <button
                              onClick={() => handleStockChange(prod.id, 1)}
                              className="w-6 h-6 rounded bg-cream border border-forest/20 flex items-center justify-center text-forest hover:bg-forest/10"
                            >
                              <Plus className="w-3 h-3" />
                            </button>

                            {isLowStock && (
                              <span className="text-[10px] text-amber-700 font-mono flex items-center gap-0.5">
                                <AlertTriangle className="w-3 h-3" />
                                Low
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleBadge(prod.id, 'bestseller')}
                              className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                                prod.bestseller
                                  ? 'bg-botanical text-cream border-botanical'
                                  : 'bg-white text-charcoal/40 border-forest/20'
                              }`}
                            >
                              Bestseller
                            </button>
                            <button
                              onClick={() => handleToggleBadge(prod.id, 'featured')}
                              className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                                prod.featured
                                  ? 'bg-earth text-cream border-earth'
                                  : 'bg-white text-charcoal/40 border-forest/20'
                              }`}
                            >
                              Featured
                            </button>
                          </div>
                        </td>

                        <td className="py-3.5 text-right">
                          <Link
                            to={`/product/${prod.slug}`}
                            target="_blank"
                            className="text-botanical hover:underline font-mono text-[11px] inline-flex items-center gap-1"
                          >
                            <span>Inspect</span>
                            <Eye className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: CUSTOMERS DIRECTORY */}
        {/* ======================================================== */}
        {activeTab === 'customers' && (
          <div className="bg-white border border-forest/10 rounded-2xl p-6 shadow-subtle space-y-6">
            <div className="pb-4 border-b border-forest/10">
              <h2 className="font-serif text-xl text-forest font-bold">
                Registered Botanical Patrons & Collectors
              </h2>
              <p className="text-xs text-charcoal/60 mt-0.5">
                Directory of VERDORA account holders, tier standings, and lifetime green spend.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-forest/10 text-charcoal/50 uppercase font-mono text-[10px]">
                    <th className="pb-3 font-medium">Patron Name</th>
                    <th className="pb-3 font-medium">Contact Coordinates</th>
                    <th className="pb-3 font-medium">Patron Tier</th>
                    <th className="pb-3 font-medium">Orders</th>
                    <th className="pb-3 font-medium">Lifetime Spend</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/5">
                  {[
                    {
                      name: 'Arya Sharma',
                      email: 'arya@verdora.in',
                      phone: '+91 98201 44521',
                      tier: 'Botanical Connoisseur',
                      orders: 4,
                      spent: '₹14,890',
                      city: 'Mumbai',
                    },
                    {
                      name: 'Aarav Sharma',
                      email: 'aarav.sharma@example.com',
                      phone: '+91 98201 44521',
                      tier: 'Green Thumb Member',
                      orders: 2,
                      spent: '₹5,797',
                      city: 'Mumbai',
                    },
                    {
                      name: 'Ananya Roy',
                      email: 'ananya.roy@example.com',
                      phone: '+91 97112 30891',
                      tier: 'Rare Plant Collector',
                      orders: 3,
                      spent: '₹9,450',
                      city: 'New Delhi',
                    },
                    {
                      name: 'Vikram Malhotra',
                      email: 'vikram.m@example.com',
                      phone: '+91 98450 12894',
                      tier: 'Botanical Enthusiast',
                      orders: 1,
                      spent: '₹1,849',
                      city: 'Bengaluru',
                    },
                    {
                      name: 'Elena Vance',
                      email: 'admin@verdora.in',
                      phone: '+91 99300 11223',
                      tier: 'Head Botanist & Admin',
                      orders: 0,
                      spent: 'Staff Account',
                      city: 'Pune Nursery HQ',
                    },
                  ].map((cust, i) => (
                    <tr key={i} className="hover:bg-cream/20">
                      <td className="py-4 font-semibold text-forest flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-forest/10 text-forest flex items-center justify-center font-bold text-xs">
                          {cust.name[0]}
                        </div>
                        <span>{cust.name}</span>
                      </td>
                      <td className="py-4">
                        <div className="text-charcoal">{cust.email}</div>
                        <div className="text-[10px] text-charcoal/50 font-mono">
                          {cust.city} • {cust.phone}
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-forest/10 text-forest font-semibold">
                          {cust.tier}
                        </span>
                      </td>
                      <td className="py-4 font-mono text-charcoal/80 font-bold">
                        {cust.orders}
                      </td>
                      <td className="py-4 font-bold text-forest">
                        {cust.spent}
                      </td>
                      <td className="py-4">
                        <span className="text-[11px] text-emerald-700 font-mono flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: STOREFRONT CMS & EDITORIAL */}
        {/* ======================================================== */}
        {activeTab === 'cms' && (
          <div className="bg-white border border-forest/10 rounded-2xl p-6 sm:p-8 shadow-subtle max-w-3xl space-y-6">
            <div className="pb-4 border-b border-forest/10">
              <h2 className="font-serif text-xl text-forest font-bold">
                Editorial Storefront Content Management
              </h2>
              <p className="text-xs text-charcoal/60 mt-0.5">
                Customize homepage headlines, marquee announcement banner, and seasonal promotions in real time.
              </p>
            </div>

            <form onSubmit={handleSaveCms} className="space-y-5">
              <Input
                label="Global Announcement Banner"
                value={cmsSettings.announcement}
                onChange={(e) =>
                  setCmsSettings((prev) => ({ ...prev, announcement: e.target.value }))
                }
                helperText="Appears across the very top of all pages."
                required
              />

              <Input
                label="Homepage Main Hero Headline"
                value={cmsSettings.heroHeadline}
                onChange={(e) =>
                  setCmsSettings((prev) => ({ ...prev, heroHeadline: e.target.value }))
                }
                helperText="Primary brand welcoming typography."
                required
              />

              <Input
                label="Featured Collection Title"
                value={cmsSettings.featuredHeadline}
                onChange={(e) =>
                  setCmsSettings((prev) => ({ ...prev, featuredHeadline: e.target.value }))
                }
                helperText="Displays above the editorial indoor styling showcase."
                required
              />

              <div className="pt-4 border-t border-forest/10 flex items-center justify-between">
                <span className="text-xs text-charcoal/50 font-mono">
                  Saved configurations persist in local storage memory.
                </span>
                <Button type="submit" variant="primary" size="md" icon={Save}>
                  Save Storefront Settings
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}