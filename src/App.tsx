import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { DailyMenuSection } from './components/DailyMenuSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TakeAwayCartDrawer } from './components/TakeAwayCartDrawer';
import { DownloadMenuModal } from './components/DownloadMenuModal';
import { MenuItem, RESTAURANT_INFO } from './data/menuData';
import { CartItem } from './types/cart';
import { MessageCircle, ShoppingBag } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('celeste_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('carta');

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('celeste_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Section observer for header active indicator
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['carta', 'menu-del-dia', 'nuestro-local', 'contacto'];
      const scrollPos = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add standard dish to cart
  const handleAddToCart = (item: MenuItem, selectedOption?: string) => {
    setCart((prev) => {
      const cartItemId = `${item.id}${selectedOption ? `-${selectedOption}` : ''}`;
      const existing = prev.find((ci) => ci.id === cartItemId);

      if (existing) {
        return prev.map((ci) =>
          ci.id === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            item: item,
            quantity: 1,
            selectedOption: selectedOption,
          },
        ];
      }
    });
  };

  // Add customized daily menu to cart
  const handleAddCustomDailyMenu = (menuDetails: {
    dayName: string;
    firstCourse: string;
    secondCourse: string;
    beverage: string;
    dessert: string;
    price: number;
  }) => {
    const dailyMenuItem: MenuItem = {
      id: `menu-dia-${menuDetails.dayName.toLowerCase()}-${Date.now()}`,
      name: `Menú del Día (${menuDetails.dayName})`,
      category: 'milanesas',
      description: `1º: ${menuDetails.firstCourse} · 2º: ${menuDetails.secondCourse} · Bebida: ${menuDetails.beverage} · Postre: ${menuDetails.dessert}`,
      price: menuDetails.price,
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    };

    setCart((prev) => [
      ...prev,
      {
        id: `daily-menu-${Date.now()}`,
        item: dailyMenuItem,
        quantity: 1,
        selectedOption: `${menuDetails.dayName} Take Away`,
        customDetails: {
          firstCourse: menuDetails.firstCourse,
          secondCourse: menuDetails.secondCourse,
          beverage: menuDetails.beverage,
          dessert: menuDetails.dessert,
        },
      },
    ]);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.id === id) {
            const newQ = ci.quantity + delta;
            return newQ > 0 ? { ...ci, quantity: newQ } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);
  const cartTotal = cart.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-sky-200 selection:text-sky-950 font-sans">
      {/* Top Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenuModal={() => setIsMenuModalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenMenuModal={() => setIsMenuModalOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* La Carta Section */}
        <MenuSection
          onAddToCart={handleAddToCart}
          onOpenMenuModal={() => setIsMenuModalOpen(true)}
        />

        {/* Menú del Día Section */}
        <DailyMenuSection
          onAddCustomDailyMenu={handleAddCustomDailyMenu}
        />

        {/* Nuestro Local Section */}
        <AboutSection />

        {/* Contacto & Ubicación Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenMenuModal={() => setIsMenuModalOpen(true)} />

      {/* Slide-in Take Away Cart Drawer */}
      <TakeAwayCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Printable / Downloadable Full Menu Modal */}
      <DownloadMenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />

      {/* Floating Action Button for Mobile Cart / WhatsApp */}
      {cartCount > 0 && (
        <div className="fixed bottom-5 right-5 z-40 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-stone-900 text-white font-bold text-xs shadow-2xl border border-stone-700 active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-sky-400" />
            <span>Ver Pedido ({cartCount})</span>
            <span className="bg-sky-500 text-stone-950 text-[11px] font-extrabold px-2 py-0.5 rounded-full">
              {cartTotal.toFixed(2)}€
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
