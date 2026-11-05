import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Droplets,
  AlertCircle,
  PhoneCall,
  ExternalLink,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

// Default mock orders for demonstration if localStorage is empty
const MOCK_ORDERS = [
  {
    orderId: 'VRD-8421-IN',
    paymentId: 'pay_demo_842199',
    customerName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98201 44521',
    address: 'Flat 402, Sea Green Heights, Worli Sea Face, Mumbai, Maharashtra — 400018',
    date: '4 November 2026',
    estimatedDelivery: 'Tomorrow by 4:00 PM',
    status: 'In Transit',
    currentStep: 3, // 1: Confirmed, 2: Conditioning, 3: In Transit, 4: Delivered
    carrier: 'VERDORA Climate-Controlled Logistics',
    trackingNumber: 'VCL-99201-MUM',
    total: 3898,
    items: [
      {
        id: 'monstera-deliciosa',
        name: 'Monstera Deliciosa',
        botanicalName: 'Monstera deliciosa',
        price: 1899,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'fiddle-leaf-fig',
        name: 'Fiddle Leaf Fig',
        botanicalName: 'Ficus lyrata',
        price: 1999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
      },
    ],
    timeline: [
      {
        title: 'Order Confirmed & Nursery Selection',
        time: 'Nov 4, 10:30 AM',
        desc: 'Horticulturist hand-inspected specimen at Pune Botanical Nursery.',
        completed: true,
      },
      {
        title: 'Hydration Conditioning & Root Insulation',
        time: 'Nov 4, 02:45 PM',
        desc: 'Coir-shield moisture wrap applied with breathable shock-absorbent cocoon.',
        completed: true,
      },
      {
        title: 'Climate-Controlled Specialized Transit',
        time: 'Nov 5, 08:15 AM',
        desc: 'In transit via 22°C ambient humidity-regulated botanical carrier.',
        completed: true,
        current: true,
      },
      {
        title: 'White-Glove Safe Delivery & Unboxing',
        time: 'Expected Nov 6, 04:00 PM',
        desc: 'Specialist delivery with inspection check and placement advice.',
        completed: false,
      },
    ],
  },
  {
    orderId: 'VRD-7104-IN',
    paymentId: 'pay_demo_710452',
    customerName: 'Ananya Roy',
    email: 'ananya.roy@example.com',
    phone: '+91 97112 30891',
    address: 'B-12/4, Safdarjung Enclave, New Delhi — 110029',
    date: '2 November 2026',
    estimatedDelivery: 'Delivered on 4 November',
    status: 'Delivered',
    currentStep: 4,
    carrier: 'VERDORA Express Green Logistics',
    trackingNumber: 'VCL-84102-DEL',
    total: 2499,
    items: [
      {
        id: 'variegated-monstera-albo',
        name: 'Monstera Albo Borsigiana',
        botanicalName: 'Monstera deliciosa var. borsigiana albo',
        price: 2499,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=800&q=80',
      },
    ],
    timeline: [
      {
        title: 'Order Confirmed & Specimen Selected',
        time: 'Nov 2, 09:10 AM',
        desc: 'Master botanist verified chimera variegation pattern.',
        completed: true,
      },
      {
        title: 'Root Insulation & Custom Crate Pack',
        time: 'Nov 2, 01:20 PM',
        desc: 'Secured inside reinforced eco-bamboo suspension crate.',
        completed: true,
      },
      {
        title: 'Air Transit to Delhi Hub',
        time: 'Nov 3, 06:40 PM',
        desc: 'Temperature regulated transit completed.',
        completed: true,
      },
      {
        title: 'Delivered to Customer Doorstep',
        time: 'Nov 4, 11:20 AM',
        desc: 'Safely handed over to resident in perfect botanical health.',
        completed: true,
      },
    ],
  },
];

export default function TrackOrder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('id') || 'VRD-8421-IN';

  const [orderQuery, setOrderQuery] = useState(initialQuery);
  const [activeOrder, setActiveOrder] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [allRecentOrders, setAllRecentOrders] = useState([]);

  // Load orders from localStorage + merge with mocks
  useEffect(() => {
    let stored = [];
    try {
      stored = JSON.parse(localStorage.getItem('verdora_orders') || '[]');
    } catch (e) {
      stored = [];
    }

    // Adapt stored orders to include tracking details if not present
    const adaptedStored = stored.map((o) => ({
      ...o,
      currentStep: o.currentStep || 2,
      status: o.status || 'Processing & Nursery Packed',
      carrier: o.carrier || 'VERDORA Climate-Controlled Logistics',
      trackingNumber: o.trackingNumber || `VCL-${Math.floor(10000 + Math.random() * 90000)}-IN`,
      timeline: o.timeline || [
        {
          title: 'Order Received & Nursery Selection',
          time: o.date || 'Today',
          desc: 'Specimen tagged in botanical greenhouse.',
          completed: true,
        },
        {
          title: 'Hydration Conditioning & Root Insulation',
          time: 'In Progress',
          desc: 'Conditioning substrate and securing root ball in cocoon wrap.',
          completed: true,
          current: true,
        },
        {
          title: 'Climate-Controlled Specialized Transit',
          time: 'Upcoming',
          desc: 'Transfer to specialized humidity-monitored vehicle.',
          completed: false,
        },
        {
          title: 'Delivered to Your Doorstep',
          time: o.estimatedDelivery || 'In 3-5 days',
          desc: 'Care inspection upon handover.',
          completed: false,
        },
      ],
    }));

    const combined = [...adaptedStored, ...MOCK_ORDERS];
    setAllRecentOrders(combined);

    // Look for requested ID or default to first
    findAndSetOrder(initialQuery, combined);
  }, [initialQuery]);

  const findAndSetOrder = (queryId, orderList) => {
    const list = orderList || allRecentOrders;
    if (!queryId) {
      if (list.length > 0) setActiveOrder(list[0]);
      return;
    }
    const cleanId = queryId.trim().toUpperCase();
    const found = list.find((o) => o.orderId.toUpperCase() === cleanId);
    if (found) {
      setActiveOrder(found);
      setSearchError('');
    } else {
      setSearchError(`No botanical order found for ID "${cleanId}". Showing demonstration order.`);
      if (list.length > 0) setActiveOrder(list[0]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    setSearchParams({ id: orderQuery.trim().toUpperCase() });
    findAndSetOrder(orderQuery, allRecentOrders);
  };

  const selectOrder = (order) => {
    setOrderQuery(order.orderId);
    setSearchParams({ id: order.orderId });
    setActiveOrder(order);
    setSearchError('');
  };

  return (
    <div className="min-h-screen bg-offwhite text-charcoal flex flex-col font-sans">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Header Breadcrumbs & Title */}
        <div className="mb-8 sm:mb-12 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-botanical uppercase tracking-wider mb-2">
            <Package className="w-3.5 h-3.5" />
            <span>Botanical Logistics Live Telemetry</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-forest tracking-tight mb-3">
            Track Your Greenery
          </h1>
          <p className="font-sans text-sm sm:text-base text-charcoal/70 leading-relaxed">
            Every VERDORA plant is shipped inside custom climate-controlled chambers with insulated root hydration cocoons. Follow your living specimen's safe journey from our nursery to your sanctuary.
          </p>
        </div>

        {/* Search Bar Card */}
        <div className="bg-cream/60 border border-forest/10 rounded-2xl p-4 sm:p-6 mb-10 max-w-3xl mx-auto shadow-subtle backdrop-blur-sm">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-forest/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. VRD-8421-IN)..."
                className="w-full bg-white border border-forest/15 rounded-editorial pl-11 pr-4 py-3 text-sm text-forest placeholder:text-charcoal/40 focus:outline-none focus:border-botanical focus:ring-1 focus:ring-botanical transition-all"
              />
            </div>
            <Button type="submit" variant="primary" size="md" icon={Search}>
              Locate Order
            </Button>
          </form>

          {searchError && (
            <p className="text-xs text-amber-700 mt-3 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{searchError}</span>
            </p>
          )}

          {/* Quick select chip bar */}
          <div className="mt-4 pt-4 border-t border-forest/10 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-charcoal/60 mr-1">
              Sample Orders:
            </span>
            {allRecentOrders.slice(0, 4).map((ord) => (
              <button
                key={ord.orderId}
                onClick={() => selectOrder(ord)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  activeOrder?.orderId === ord.orderId
                    ? 'bg-forest text-cream border-forest font-medium shadow-sm'
                    : 'bg-white/80 text-forest border-forest/20 hover:border-forest/40'
                }`}
              >
                {ord.orderId} ({ord.status || 'Active'})
              </button>
            ))}
          </div>
        </div>

        {activeOrder && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Journey Timeline & Status Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* Order Status Badge Card */}
              <div className="bg-white border border-forest/10 rounded-2xl p-6 sm:p-8 shadow-subtle">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-forest/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-botanical uppercase tracking-wider font-semibold">
                        Order ID
                      </span>
                      <Badge variant="primary" size="sm">
                        {activeOrder.status || 'In Transit'}
                      </Badge>
                    </div>
                    <h2 className="font-serif text-2xl text-forest font-bold">
                      {activeOrder.orderId}
                    </h2>
                    <p className="text-xs text-charcoal/60 mt-0.5">
                      Placed on {activeOrder.date} • Courier:{' '}
                      <span className="text-forest font-medium">{activeOrder.carrier}</span>
                    </p>
                  </div>

                  <div className="text-left sm:text-right bg-cream/50 p-3 sm:p-4 rounded-xl border border-forest/10">
                    <span className="text-[10px] font-mono uppercase text-charcoal/60 block">
                      Estimated Arrival
                    </span>
                    <span className="font-serif text-base sm:text-lg text-forest font-bold block">
                      {activeOrder.estimatedDelivery || 'In 2-3 business days'}
                    </span>
                    <span className="text-[10px] text-botanical font-mono flex items-center gap-1 sm:justify-end">
                      <Clock className="w-3 h-3" />
                      On Schedule
                    </span>
                  </div>
                </div>

                {/* Tracking Progress Bar */}
                <div className="py-8">
                  <div className="relative">
                    {/* Track line */}
                    <div className="absolute top-5 left-6 right-6 h-0.5 bg-forest/10 hidden sm:block" />
                    <div
                      className="absolute top-5 left-6 h-0.5 bg-botanical transition-all duration-700 hidden sm:block"
                      style={{
                        width: `${
                          activeOrder.status === 'Delivered'
                            ? 100
                            : activeOrder.status === 'In Transit'
                            ? 66
                            : 33
                        }%`,
                      }}
                    />

                    {/* Step Nodes */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative">
                      {[
                        { title: 'Ordered', label: 'Confirmed' },
                        { title: 'Hydrated', label: 'Insulated' },
                        { title: 'In Transit', label: 'Chamber 22°C' },
                        { title: 'Delivered', label: 'Sanctuary' },
                      ].map((step, idx) => {
                        const stepNum = idx + 1;
                        const isDone =
                          activeOrder.status === 'Delivered'
                            ? true
                            : activeOrder.status === 'In Transit'
                            ? stepNum <= 3
                            : stepNum <= 2;
                        const isCurrent =
                          activeOrder.status === 'Delivered'
                            ? stepNum === 4
                            : activeOrder.status === 'In Transit'
                            ? stepNum === 3
                            : stepNum === 2;

                        return (
                          <div
                            key={idx}
                            className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2"
                          >
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                                isDone
                                  ? 'bg-botanical text-cream border-botanical shadow-sm'
                                  : 'bg-white text-charcoal/40 border-forest/20'
                              } ${isCurrent ? 'ring-4 ring-botanical/20' : ''}`}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                <span className="font-mono text-xs">{stepNum}</span>
                              )}
                            </div>
                            <div className="text-left sm:text-center">
                              <span
                                className={`text-xs block font-semibold ${
                                  isDone ? 'text-forest' : 'text-charcoal/50'
                                }`}
                              >
                                {step.title}
                              </span>
                              <span className="text-[10px] text-charcoal/50 font-mono">
                                {step.label}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Detailed Timeline Entries */}
                <div className="border-t border-forest/10 pt-6">
                  <h3 className="font-serif text-lg text-forest mb-4 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-botanical" />
                    <span>Botanical Dispatch Milestones</span>
                  </h3>

                  <div className="space-y-6 relative pl-6 border-l-2 border-forest/15 ml-2">
                    {(activeOrder.timeline || []).map((ev, i) => (
                      <div key={i} className="relative">
                        {/* Dot */}
                        <div
                          className={`absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 bg-white ${
                            ev.completed
                              ? 'border-botanical bg-botanical'
                              : 'border-forest/30'
                          } ${ev.current ? 'ring-4 ring-botanical/30 animate-pulse' : ''}`}
                        />
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                          <span
                            className={`text-sm font-medium ${
                              ev.completed ? 'text-forest' : 'text-charcoal/60'
                            }`}
                          >
                            {ev.title}
                          </span>
                          <span className="font-mono text-[11px] text-charcoal/50">
                            {ev.time}
                          </span>
                        </div>
                        <p className="text-xs text-charcoal/70 leading-relaxed">{ev.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Transit Care Pledge */}
              <div className="bg-cream/40 border border-forest/15 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-botanical/10 flex items-center justify-center text-botanical shrink-0">
                  <Droplets className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-base text-forest font-semibold mb-1">
                    Specialized Root Coco-Peat Cocooning
                  </h4>
                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    Your plants are watered 6 hours prior to packaging with organic kelp extract to boost stress-resilience during motion. If any branch sustains transit distress, our 14-Day Free Replacement is automatically triggered.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Order Summary & Package Contents */}
            <div className="lg:col-span-5 space-y-6">
              {/* Package Contents */}
              <div className="bg-white border border-forest/10 rounded-2xl p-6 shadow-subtle">
                <h3 className="font-serif text-lg text-forest pb-3 border-b border-forest/10 mb-4 flex items-center justify-between">
                  <span>Botanical Consignment</span>
                  <span className="text-xs font-mono text-botanical">
                    {activeOrder.items?.length || 0} {activeOrder.items?.length === 1 ? 'Specimen' : 'Specimens'}
                  </span>
                </h3>

                <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                  {(activeOrder.items || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3.5 pb-4 border-b border-forest/5 last:border-b-0 last:pb-0"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-cream shrink-0 border border-forest/10">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm text-forest truncate font-medium">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-charcoal/50 italic truncate">
                          {item.botanicalName || 'Living Houseplant'}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-charcoal/70">Qty: {item.quantity}</span>
                          <span className="text-xs text-forest font-semibold">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Financial Summary */}
                <div className="pt-4 mt-4 border-t border-forest/10 space-y-2 text-xs font-sans">
                  <div className="flex justify-between text-charcoal/70">
                    <span>Order Value</span>
                    <span className="font-semibold text-charcoal">
                      ₹{activeOrder.total?.toLocaleString('en-IN') || '0'}
                    </span>
                  </div>
                  <div className="flex justify-between text-charcoal/70">
                    <span>Shipping Method</span>
                    <span className="text-botanical font-medium">Eco Climate Express</span>
                  </div>
                  <div className="flex justify-between text-charcoal/70">
                    <span>Tracking ID</span>
                    <span className="font-mono text-forest">
                      {activeOrder.trackingNumber || 'VCL-84210'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Destination Address */}
              <div className="bg-white border border-forest/10 rounded-2xl p-6 shadow-subtle">
                <h3 className="font-serif text-base text-forest mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-botanical" />
                  <span>Delivery Destination</span>
                </h3>
                <p className="text-sm font-semibold text-forest mb-1">
                  {activeOrder.customerName}
                </p>
                <p className="text-xs text-charcoal/70 leading-relaxed mb-3">
                  {activeOrder.address}
                </p>
                <div className="text-xs text-charcoal/60 font-mono space-y-1 pt-2 border-t border-forest/10">
                  <p>Contact: {activeOrder.phone || '+91 98201 44521'}</p>
                  <p>Email: {activeOrder.email || 'customer@verdora.in'}</p>
                </div>
              </div>

              {/* Plant Arrival Care Tips */}
              <div className="bg-forest text-cream rounded-2xl p-6 shadow-editorial relative overflow-hidden">
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-2 text-sage text-xs uppercase tracking-wider font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Arrival Day Protocol</span>
                  </div>
                  <h4 className="font-serif text-lg text-cream">
                    Prepare for Your Plant's Homecoming
                  </h4>
                  <ul className="text-xs text-cream/80 space-y-2 leading-relaxed">
                    <li>• <strong>Unbox gently</strong> within 2 hours of arrival and remove coir hydration wrap.</li>
                    <li>• <strong>Do not repot</strong> for 14-21 days while the roots acclimate to your ambient humidity.</li>
                    <li>• Keep in <strong>bright, indirect light</strong> away from direct air conditioning vents.</li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      to="/plant-care"
                      className="inline-flex items-center gap-1.5 text-xs text-sage hover:text-cream transition-colors font-medium underline underline-offset-4"
                    >
                      Read our Plant Care Guidebook <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
