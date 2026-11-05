import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const FREE_SHIPPING_THRESHOLD = 999;
export const STANDARD_SHIPPING_FEE = 149;

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('verdora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [orderNote, setOrderNote] = useState(() => {
    try {
      return localStorage.getItem('verdora_order_note') || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('verdora_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('verdora_order_note', orderNote);
    } catch (e) {
      console.error(e);
    }
  }, [orderNote]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    setNotification({
      type: 'add',
      title: 'Added to Botanical Bag',
      message: `${quantity}× ${product.name}`,
      image: product.images?.[0] || product.image,
    });

    setTimeout(() => setNotification(null), 3500);
  };

  const removeFromCart = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    setCartItems((prev) => prev.filter((i) => i.id !== productId));
    if (item) {
      setNotification({
        type: 'remove',
        title: 'Removed from Bag',
        message: item.name,
        image: item.images?.[0] || item.image,
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscountPercent(0);
    setCouponCode('');
  };

  const applyCoupon = (code) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'GROW10' || cleaned === 'VERDORA10') {
      setCouponCode(cleaned);
      setDiscountPercent(10);
      setCouponError('');
      setNotification({
        type: 'coupon',
        title: 'Coupon Applied!',
        message: '10% Botanical Welcome Discount activated',
      });
      setTimeout(() => setNotification(null), 3500);
      return true;
    } else if (cleaned === 'BOTANICAL20' || cleaned === 'SAVE20') {
      setCouponCode(cleaned);
      setDiscountPercent(20);
      setCouponError('');
      setNotification({
        type: 'coupon',
        title: 'VIP Coupon Applied!',
        message: '20% Collector Discount activated',
      });
      setTimeout(() => setNotification(null), 3500);
      return true;
    } else {
      setCouponError('Invalid voucher code. Try "GROW10" for 10% off.');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
    setCouponError('');
  };

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        discountAmount,
        discountPercent,
        shippingFee,
        grandTotal,
        couponCode,
        couponError,
        applyCoupon,
        removeCoupon,
        orderNote,
        setOrderNote,
        isCartOpen,
        setIsCartOpen,
        notification,
        setNotification,
        freeShippingRemaining,
        freeShippingProgress,
        FREE_SHIPPING_THRESHOLD,
        STANDARD_SHIPPING_FEE,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
