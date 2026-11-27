import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag,
  User,
  ShieldCheck,
  Search,
  MessageCircle,
  Sparkles,
  X,
  Plus,
  Minus,
  Trash2,
  Award,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Car,
  HeartPulse,
  Stethoscope,
  Building2,
  Home,
  Cpu,
  Shirt,
  PawPrint,
  Wine,
  Ticket,
  Hotel,
  Utensils,
  Compass,
  Navigation,
  Recycle,
  LayoutGrid,
  Users
} from 'lucide-react';
import {
  VERTICALS,
  INITIAL_ALLIES_PROFILES,
  INITIAL_ECOSYSTEM_ITEMS,
  INITIAL_VERIFIED_POSTS
} from './data/apexEcosystemData';
import SocialAndTracking from './components/SocialAndTracking';
import AdminEcosystemPanel from './components/AdminEcosystemPanel';

const STORAGE_KEYS = {
  items: 'apex_eco_items_v1',
  allies: 'apex_eco_allies_v1',
  ads: 'apex_eco_ads_v1',
  posts: 'apex_eco_posts_v1',
  users: 'apex_eco_users_v1',
  session: 'apex_eco_session_v1',
  orders: 'apex_eco_orders_v1',
  settings: 'apex_eco_settings_v1'
};

const DEFAULT_SETTINGS = {
  brandName: 'ÁPEX',
  tagline: 'Ecosistema Curado • Sello de Calidad',
  whatsappPhone: '584141470773',
  exchangeRateBs: 52.0,
  pointsPerDollar: 5,
  adminPin: '2026'
};

const DEFAULT_ADS = [
  {
    id: 'ad-megafreeze-launch',
    advertiser: 'Megafreeze Venezuela',
    tag: 'Aliado Oficial',
    title: 'Refrigerantes Orgánicos y Lubricantes',
    description: 'Calidad certificada y puntos cruzados en cada compra.',
    image:
      'https://images.unsplash.com/photo-1635437536607-b8572f443763?auto=format&fit=crop&w=1000&q=80',
    ctaText: 'Ver Aliado',
    targetSection: 'allies',
    isLaunch: true,
    launchNote: 'Lanzamiento ÁPEX: Megafreeze disponible en stock',
    active: true
  }
];

function getVerticalIcon(verticalId) {
  const map = {
    automotriz: Car,
    belleza: HeartPulse,
    medico: Stethoscope,
    'bienes-raices': Building2,
    hogar: Home,
    electronica: Cpu,
    'ropa-zapatos': Shirt,
    mascotas: PawPrint,
    licores: Wine,
    entretenimiento: Ticket,
    'hoteles-hospedaje': Hotel,
    'restaurantes-comida-rapida': Utensils,
    turismo: Compass,
    'viajes-taxi': Navigation,
    'reciclaje-ecologia': Recycle
  };
  return map[verticalId] || LayoutGrid;
}

function safeLoad(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [settings, setSettings] = useState(() =>
    safeLoad(STORAGE_KEYS.settings, DEFAULT_SETTINGS)
  );
  const [allies, setAllies] = useState(() =>
    safeLoad(STORAGE_KEYS.allies, INITIAL_ALLIES_PROFILES)
  );
  const [items, setItems] = useState(() =>
    safeLoad(STORAGE_KEYS.items, INITIAL_ECOSYSTEM_ITEMS)
  );
  const [ads, setAds] = useState(() => safeLoad(STORAGE_KEYS.ads, DEFAULT_ADS));
  const [posts, setPosts] = useState(() =>
    safeLoad(STORAGE_KEYS.posts, INITIAL_VERIFIED_POSTS)
  );
  const [users, setUsers] = useState(() =>
    safeLoad(STORAGE_KEYS.users, [
      {
        id: 'usr-1',
        name: 'Carlos Mendoza',
        handle: '@carlosm_apex',
        email: 'carlos@ejemplo.com',
        role: 'consumer',
        points: 240,
        referralCode: 'CARLOS-APEX',
        currentMileage: 78200,
        following: ['ally-megafreeze'],
        followers: []
      }
    ])
  );
  const [currentUserId, setCurrentUserId] = useState(() =>
    safeLoad(STORAGE_KEYS.session, null)
  );
  const [ordersHistory, setOrdersHistory] = useState(() =>
    safeLoad(STORAGE_KEYS.orders, [])
  );

  // --- NAVEGACIÓN Y MENÚ DE CATEGORÍAS A PANTALLA COMPLETA ---
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'social' | 'cart' | 'profile' | 'admin'
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [expandedVerticalId, setExpandedVerticalId] = useState(null);
  const [selectedVertical, setSelectedVertical] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedAllyFilter, setSelectedAllyFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRole, setPriceRole] = useState('consumer');

  // --- MODALES Y CARRITO ---
  const [detailItem, setDetailItem] = useState(null);
  const [detailPhotoIdx, setDetailPhotoIdx] = useState(0);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Pago Móvil');
  const [paymentRef, setPaymentRef] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  // --- AUTH & ADMIN ---
  const [authModalMode, setAuthModalMode] = useState(null);
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    role: 'consumer',
    referralInput: ''
  });
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState('');
  const [adminSubView, setAdminSubView] = useState('ecosystem');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
      localStorage.setItem(STORAGE_KEYS.allies, JSON.stringify(allies));
      localStorage.setItem(STORAGE_KEYS.items, JSON.stringify(items));
      localStorage.setItem(STORAGE_KEYS.ads, JSON.stringify(ads));
      localStorage.setItem(STORAGE_KEYS.posts, JSON.stringify(posts));
      localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
      localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(currentUserId));
      localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(ordersHistory));
    } catch {
      // Ignora errores de cuota
    }
  }, [settings, allies, items, ads, posts, users, currentUserId, ordersHistory]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3000);
  };

  const currentUser = useMemo(
    () => users.find((u) => u.id === currentUserId) || null,
    [users, currentUserId]
  );

  const activeVerticalObj = useMemo(
    () => VERTICALS.find((v) => v.id === selectedVertical) || null,
    [selectedVertical]
  );

  const activeAds = useMemo(() => ads.filter((a) => a.active !== false), [ads]);
  const launchAd = useMemo(
    () => activeAds.find((a) => a.isLaunch && a.launchNote),
    [activeAds]
  );

  const getUnitPrice = (item) => {
    const base = Number(item.price || 0);
    if (priceRole === 'dealer') {
      const disc = Number(item.dealerDiscountPercent || 20) / 100;
      return Math.max(0.5, base * (1 - disc));
    }
    const promo = Number(item.consumerPromoPercent || 0) / 100;
    return Math.max(0.5, base * (1 - promo));
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (selectedVertical !== 'all' && item.verticalId !== selectedVertical) {
        return false;
      }
      if (
        selectedVertical !== 'all' &&
        selectedSubcategory !== 'all' &&
        item.subcategory !== selectedSubcategory
      ) {
        return false;
      }
      if (selectedAllyFilter !== 'all' && item.allyId !== selectedAllyFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const allyName =
          allies.find((a) => a.id === item.allyId)?.brandName?.toLowerCase() || '';
        return (
          item.name.toLowerCase().includes(q) ||
          (item.spec || '').toLowerCase().includes(q) ||
          (item.subcategory || '').toLowerCase().includes(q) ||
          allyName.includes(q)
        );
      }
      return true;
    });
  }, [items, allies, selectedVertical, selectedSubcategory, selectedAllyFilter, searchQuery]);

  const visibleAllies = useMemo(() => {
    const approvedOnly = allies.filter((a) => a.qualityApproved !== false);
    if (selectedVertical === 'all') return approvedOnly;
    return approvedOnly.filter((a) => a.verticalId === selectedVertical);
  }, [allies, selectedVertical]);

  const addToCart = (item, qty = 1) => {
    if (Number(item.stock || 0) <= 0) {
      showToast('Sin stock disponible', 'error');
      return;
    }
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        const nextQty = Math.min(Number(item.stock), existing.qty + qty);
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, qty: nextQty } : c
        );
      }
      return [...prev, { item, qty: Math.min(Number(item.stock), qty) }];
    });
    showToast(`Agregado: ${item.name}`);
  };

  const updateCartQty = (itemId, delta) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.item.id !== itemId) return c;
          const next = c.qty + delta;
          if (next <= 0) return null;
          return { ...c, qty: Math.min(Number(c.item.stock || 99), next) };
        })
        .filter(Boolean)
    );
  };

  const cartTotals = useMemo(() => {
    let subtotal = 0;
    let buyerPoints = 0;
    let sellerPoints = 0;
    for (const row of cart) {
      const unit = getUnitPrice(row.item);
      subtotal += unit * row.qty;
      const bPts =
        Number(row.item.buyerPoints) ||
        Math.max(10, Math.round(unit * row.qty * (settings.pointsPerDollar || 5)));
      const sPts =
        Number(row.item.sellerPoints) || Math.max(10, Math.round(bPts * 0.45));
      buyerPoints += bPts * row.qty;
      sellerPoints += sPts * row.qty;
    }
    return {
      subtotal,
      totalBs: subtotal * Number(settings.exchangeRateBs || 52),
      buyerPoints,
      sellerPoints
    };
  }, [cart, priceRole, settings]);

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const firstAllyId = cart[0]?.item?.allyId;
    const allyObj = allies.find((a) => a.id === firstAllyId);
    const orderId = `APX-${Math.floor(100000 + Math.random() * 899999)}`;
    const summaryText = cart.map((c) => `${c.qty}x ${c.item.name}`).join(', ');

    const newOrder = {
      id: orderId,
      userId: currentUser?.id || 'guest',
      customerName: currentUser?.name || 'Cliente ÁPEX',
      customerPhone: customerPhone.trim() || 'No indicado',
      allyId: allyObj?.id || null,
      allyName: allyObj?.brandName || 'Ecosistema ÁPEX',
      itemsSummary: summaryText,
      total: cartTotals.subtotal,
      totalBs: cartTotals.totalBs,
      buyerPoints: cartTotals.buyerPoints,
      sellerPoints: cartTotals.sellerPoints,
      paymentMethod,
      paymentRef: paymentRef.trim() || 'Por confirmar',
      notes: customerNotes.trim(),
      createdAt: new Date().toLocaleString('es-VE')
    };

    setOrdersHistory((prev) => [newOrder, ...prev]);

    setItems((prev) =>
      prev.map((it) => {
        const bought = cart.find((c) => c.item.id === it.id);
        if (!bought) return it;
        return { ...it, stock: Math.max(0, Number(it.stock || 0) - bought.qty) };
      })
    );

    if (currentUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === currentUser.id
            ? { ...u, points: Number(u.points || 0) + cartTotals.buyerPoints }
            : u
        )
      );
    }

    if (allyObj) {
      setAllies((prev) =>
        prev.map((a) =>
          a.id === allyObj.id
            ? {
                ...a,
                pointsEarnedByAlly:
                  Number(a.pointsEarnedByAlly || 0) + cartTotals.sellerPoints
              }
            : a
        )
      );
    }

    const waText = encodeURIComponent(
      `Hola ${settings.brandName}, confirmo pedido *${orderId}*:\n` +
        `• Aliado: ${newOrder.allyName}\n` +
        `• Detalle: ${summaryText}\n` +
        `• Total: $${cartTotals.subtotal.toFixed(2)} (Bs. ${cartTotals.totalBs.toFixed(2)})\n` +
        `• Pago: ${paymentMethod} | Ref: ${newOrder.paymentRef}`
    );
    window.open(
      `https://wa.me/${settings.whatsappPhone}?text=${waText}`,
      '_blank',
      'noopener,noreferrer'
    );

    setCart([]);
    setPaymentRef('');
    setCustomerNotes('');
    showToast(`Pedido ${orderId} confirmado (+${cartTotals.buyerPoints} pts)`);
    setActiveTab('social');
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = authForm.email.trim().toLowerCase();
    if (!cleanEmail) return;

    if (authModalMode === 'login') {
      const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
      if (!found) {
        showToast('Correo no registrado', 'error');
        return;
      }
      setCurrentUserId(found.id);
      setAuthModalMode(null);
      showToast(`Hola, ${found.name}`);
      return;
    }

    const cleanName = (authForm.name.trim() || cleanEmail.split('@')[0]).slice(0, 40);
    const cleanHandle = `@${cleanName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .slice(0, 12)}_apex`;

    const newUser = {
      id: `usr-${Date.now()}`,
      name: cleanName,
      handle: cleanHandle,
      email: cleanEmail,
      role: 'consumer',
      points: 50,
      referralCode: `${cleanName.replace(/[^A-Z0-9]/gi, '').toUpperCase().slice(0, 6) || 'APEX'}-${Math.floor(
        100 + Math.random() * 899
      )}`,
      currentMileage: null,
      following: [],
      followers: []
    };

    setUsers((prev) => [newUser, ...prev]);
    setCurrentUserId(newUser.id);
    setAuthModalMode(null);
    setAuthForm({ name: '', email: '', role: 'consumer', referralInput: '' });
    showToast('Cuenta creada (+50 pts)');
  };

  const handleToggleFollow = ({ type, id, label }) => {
    if (!currentUser) return;
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== currentUser.id) return u;
        const list = u.following || [];
        const exists = list.includes(id);
        showToast(exists ? `Dejaste de seguir a ${label}` : `Siguiendo a ${label}`);
        return {
          ...u,
          following: exists ? list.filter((x) => x !== id) : [...list, id]
        };
      })
    );
  };

  const handleCreateVerifiedPost = (payload) => {
    if (!currentUser) return;
    setPosts((prev) => [
      {
        id: `post-${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        userHandle: currentUser.handle || '@miembro_apex',
        likes: [],
        baseLikes: 0,
        createdAt: 'Justo ahora',
        ...payload
      },
      ...prev
    ]);
  };

  const handleToggleLikePost = (postId) => {
    if (!currentUser) {
      setAuthModalMode('login');
      return;
    }
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const likes = p.likes || [];
        const liked = likes.includes(currentUser.id);
        return {
          ...p,
          likes: liked ? likes.filter((id) => id !== currentUser.id) : [...likes, currentUser.id]
        };
      })
    );
  };

  const handleUpdateMileage = (km) => {
    if (!currentUser || !km) return;
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, currentMileage: km } : u))
    );
    showToast(`Kilometraje: ${Number(km).toLocaleString()} km`);
  };

  const handleSaveAlly = (allyData) => {
    setAllies((prev) => {
      const exists = prev.some((a) => a.id === allyData.id);
      if (exists) {
        return prev.map((a) => (a.id === allyData.id ? { ...a, ...allyData } : a));
      }
      return [{ ...allyData, pointsEarnedByAlly: 0, followers: [] }, ...prev];
    });
  };

  const handleToggleAuditStage = (allyId, stageKey) => {
    setAllies((prev) =>
      prev.map((a) => {
        if (a.id !== allyId) return a;
        const audit = { ...(a.qualityAudit || {}), [stageKey]: !a.qualityAudit?.[stageKey] };
        const allApproved =
          Boolean(audit.interview) &&
          Boolean(audit.technical) &&
          Boolean(audit.warranty) &&
          Boolean(audit.seal);
        return {
          ...a,
          qualityAudit: audit,
          qualityApproved: allApproved,
          status: allApproved ? 'approved' : 'pending'
        };
      })
    );
  };

  const handleSaveItem = (itemData) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === itemData.id);
      if (exists) {
        return prev.map((i) => (i.id === itemData.id ? itemData : i));
      }
      return [itemData, ...prev];
    });
  };

  const detailPhotos = useMemo(() => {
    if (!detailItem) return [];
    return Array.isArray(detailItem.images) && detailItem.images.length > 0
      ? detailItem.images
      : ['https://images.unsplash.com/photo-1635437536607-b8572f443763?auto=format&fit=crop&w=800&q=80'];
  }, [detailItem]);

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-zinc-100 pb-28">
      {toast && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl text-xs font-extrabold shadow-xl border ${
            toast.type === 'error'
              ? 'bg-red-950/95 border-red-500/50 text-red-200'
              : 'bg-zinc-900/95 border-orange-500/50 text-white'
          }`}
        >
          {toast.message}
        </div>
      )}

      {launchAd && (
        <div className="bg-orange-500 text-zinc-950 px-4 py-1.5 text-center text-[11px] font-black">
          {launchAd.launchNote}
        </div>
      )}

      {/* Encabezado limpio */}
      <header className="sticky top-0 z-30 bg-[#0A0A0C]/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div
            onClick={() => {
              setActiveTab('catalog');
              setSelectedVertical('all');
              setSelectedSubcategory('all');
              setSelectedAllyFilter('all');
            }}
            className="cursor-pointer flex items-center gap-2"
          >
            <span className="text-lg font-black tracking-tight text-white">
              {settings.brandName}
            </span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
              ✓ Calidad
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href={`https://wa.me/${settings.whatsappPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#141418] border border-zinc-800 text-emerald-400"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={() => setActiveTab('cart')}
              className="relative p-2 rounded-xl bg-[#141418] border border-zinc-800 text-white"
              title="Pedido"
            >
              <ShoppingBag className="w-4 h-4 text-orange-400" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] font-black flex items-center justify-center">
                  {cart.reduce((acc, c) => acc + c.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {/* =======================================================
            PESTAÑA CATÁLOGO (LIMPIA Y FLUIDA)
        ======================================================= */}
        {activeTab === 'catalog' && (
          <div className="space-y-4">
            {/* Buscador y Rol */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar..."
                  className="w-full bg-[#141418] border border-zinc-800 rounded-2xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-orange-500"
                />
              </div>

              <button
                onClick={() =>
                  setPriceRole((r) => (r === 'consumer' ? 'dealer' : 'consumer'))
                }
                className={`px-3 py-2 rounded-2xl text-[11px] font-extrabold border shrink-0 ${
                  priceRole === 'dealer'
                    ? 'bg-amber-400 border-amber-400 text-zinc-950'
                    : 'bg-[#141418] border-zinc-800 text-zinc-200'
                }`}
              >
                {priceRole === 'dealer' ? 'Mayorista' : 'Particular'}
              </button>
            </div>

            {/* Filtro activo si se eligió una categoría desde el menú */}
            {(selectedVertical !== 'all' || selectedAllyFilter !== 'all') && (
              <div className="flex items-center justify-between bg-[#141418] border border-orange-500/30 rounded-2xl px-3.5 py-2 text-xs">
                <span className="font-bold text-orange-300 truncate">
                  {activeVerticalObj ? activeVerticalObj.name : 'Aliado seleccionado'}
                  {selectedSubcategory !== 'all' ? ` • ${selectedSubcategory}` : ''}
                </span>
                <button
                  onClick={() => {
                    setSelectedVertical('all');
                    setSelectedSubcategory('all');
                    setSelectedAllyFilter('all');
                  }}
                  className="text-[11px] font-extrabold text-zinc-300 underline ml-2 shrink-0"
                >
                  Limpiar
                </button>
              </div>
            )}

            {/* Banner visual */}
            {activeAds[0]?.image && (
              <div className="rounded-3xl overflow-hidden border border-zinc-800 bg-[#141418]">
                <img
                  src={activeAds[0].image}
                  alt={activeAds[0].title}
                  className="w-full h-32 object-cover"
                />
                <div className="px-4 py-2.5 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-white truncate">
                      {activeAds[0].title}
                    </p>
                    <p className="text-[11px] text-zinc-400 truncate">
                      {activeAds[0].advertiser}
                    </p>
                  </div>
                  <button
                    onClick={() => setCategoryMenuOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-orange-500/15 text-orange-400 text-[11px] font-extrabold shrink-0"
                  >
                    15 Secciones
                  </button>
                </div>
              </div>
            )}

            {/* Fila compacta de aliados verificados */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {visibleAllies.map((ally) => {
                const active = selectedAllyFilter === ally.id;
                return (
                  <button
                    key={ally.id}
                    onClick={() =>
                      setSelectedAllyFilter(active ? 'all' : ally.id)
                    }
                    className={`px-3 py-2 rounded-2xl border text-left whitespace-nowrap transition ${
                      active
                        ? 'bg-orange-500 border-orange-500 text-white'
                        : 'bg-[#141418] border-zinc-800 text-zinc-200'
                    }`}
                  >
                    <span className="text-xs font-extrabold block">
                      {ally.brandName}
                    </span>
                    <span className="text-[10px] opacity-75">
                      {ally.shortName || ally.subcategory}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tarjetas de productos y servicios */}
            <div className="space-y-3">
              {filteredItems.map((item) => {
                const ally = allies.find((a) => a.id === item.allyId);
                const unitPrice = getUnitPrice(item);
                const photoCount = Array.isArray(item.images) ? item.images.length : 1;
                const coverImg =
                  item.images?.[0] ||
                  'https://images.unsplash.com/photo-1635437536607-b8572f443763?auto=format&fit=crop&w=800&q=80';

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setDetailItem(item);
                      setDetailPhotoIdx(0);
                    }}
                    className="bg-[#141418] border border-zinc-800 hover:border-orange-500/40 rounded-3xl p-3 flex gap-3 cursor-pointer transition"
                  >
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-zinc-900 shrink-0">
                      <img
                        src={coverImg}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {photoCount > 1 && (
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-bold text-white">
                          {photoCount} fotos
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-orange-400 block truncate">
                          {ally?.brandName || 'ÁPEX'}
                        </span>
                        <h3 className="text-xs font-extrabold text-white line-clamp-1">
                          {item.name}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <span className="text-sm font-black text-white">
                            ${unitPrice.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-amber-400 font-bold ml-2">
                            +{item.buyerPoints || Math.round(unitPrice * 5)} pts
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(item, 1);
                          }}
                          className="px-3 py-1 rounded-xl bg-orange-500 text-white text-[11px] font-extrabold"
                        >
                          + Pedir
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <SocialAndTracking
            currentUser={currentUser}
            allUsers={users}
            allies={allies}
            ordersHistory={ordersHistory}
            posts={posts}
            onToggleFollow={handleToggleFollow}
            onCreateVerifiedPost={handleCreateVerifiedPost}
            onToggleLikePost={handleToggleLikePost}
            onUpdateMileage={handleUpdateMileage}
            onOpenAuth={(mode) => setAuthModalMode(mode)}
            onToast={showToast}
          />
        )}

        {activeTab === 'cart' && (
          <div className="space-y-4 text-xs">
            <h2 className="text-base font-black text-white">Tu Pedido</h2>
            {cart.length === 0 ? (
              <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-6 text-center space-y-3">
                <p className="text-zinc-400">Tu carrito está vacío.</p>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-4 py-2 rounded-xl bg-orange-500 text-white font-extrabold"
                >
                  Ir al catálogo
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {cart.map(({ item, qty }) => (
                    <div
                      key={item.id}
                      className="bg-[#141418] border border-zinc-800 rounded-2xl p-3 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <h4 className="font-bold text-white truncate">{item.name}</h4>
                        <p className="text-[11px] text-zinc-400">
                          ${(getUnitPrice(item) * qty).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateCartQty(item.id, -1)}
                          className="p-1.5 rounded-lg bg-[#0A0A0C] text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-black">{qty}</span>
                        <button
                          onClick={() => updateCartQty(item.id, 1)}
                          className="p-1.5 rounded-lg bg-[#0A0A0C] text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => updateCartQty(item.id, -qty)}
                          className="p-1.5 rounded-lg bg-[#0A0A0C] text-red-400"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-4 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Total USD</span>
                    <span className="font-black text-white">
                      ${cartTotals.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Total Bs.</span>
                    <span className="font-bold text-emerald-400">
                      Bs. {cartTotals.totalBs.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1.5 border-t border-zinc-800 text-[11px]">
                    <span className="text-amber-400 font-bold">
                      +{cartTotals.buyerPoints} pts comprador
                    </span>
                    <span className="text-emerald-400 font-bold">
                      +{cartTotals.sellerPoints} pts aliado
                    </span>
                  </div>
                </div>

                <form
                  onSubmit={handleConfirmOrder}
                  className="bg-[#141418] border border-zinc-800 rounded-3xl p-4 space-y-2.5"
                >
                  <input
                    type="text"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Teléfono de contacto *"
                    className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                  />
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                  >
                    <option value="Pago Móvil">Pago Móvil</option>
                    <option value="Transferencia">Transferencia</option>
                    <option value="Efectivo">Efectivo</option>
                  </select>
                  <input
                    type="text"
                    value={paymentRef}
                    onChange={(e) => setPaymentRef(e.target.value)}
                    placeholder="Referencia (opcional)"
                    className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                  />
                  <input
                    type="text"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="Nota de entrega (opcional)"
                    className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-emerald-500 text-zinc-950 font-black"
                  >
                    Confirmar Pedido
                  </button>
                </form>
              </>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-4 text-xs">
            {!currentUser ? (
              <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-6 text-center space-y-3">
                <User className="w-8 h-8 text-orange-400 mx-auto" />
                <h2 className="text-base font-black text-white">Tu Perfil ÁPEX</h2>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setAuthModalMode('register')}
                    className="px-4 py-2 rounded-xl bg-orange-500 text-white font-extrabold"
                  >
                    Crear Cuenta
                  </button>
                  <button
                    onClick={() => setAuthModalMode('login')}
                    className="px-4 py-2 rounded-xl bg-zinc-800 text-white font-extrabold"
                  >
                    Entrar
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-black text-white">{currentUser.name}</h2>
                    <p className="text-zinc-400">{currentUser.handle}</p>
                  </div>
                  <button
                    onClick={() => setCurrentUserId(null)}
                    className="p-2 rounded-xl bg-[#0A0A0C] text-zinc-400"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-[#0A0A0C] border border-zinc-800 rounded-2xl p-3.5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-400 block">Puntos ÁPEX</span>
                    <span className="text-xl font-black text-amber-400">
                      {Number(currentUser.points || 0)} pts
                    </span>
                  </div>
                  <Award className="w-6 h-6 text-amber-400" />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="space-y-4 text-xs">
            {!adminUnlocked ? (
              <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-6 space-y-3 text-center">
                <ShieldCheck className="w-8 h-8 text-orange-400 mx-auto" />
                <h2 className="text-base font-black text-white">Equipo Administrador ÁPEX</h2>
                <input
                  type="password"
                  value={adminPinInput}
                  onChange={(e) => setAdminPinInput(e.target.value)}
                  placeholder="PIN (2026)"
                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-center text-white outline-none"
                />
                <button
                  onClick={() => {
                    if (adminPinInput.trim() === String(settings.adminPin || '2026')) {
                      setAdminUnlocked(true);
                      setAdminPinInput('');
                    } else {
                      showToast('PIN incorrecto', 'error');
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-orange-500 text-white font-extrabold"
                >
                  Desbloquear
                </button>
              </div>
            ) : (
              <>
                <div className="flex gap-2 bg-[#141418] border border-zinc-800 p-1.5 rounded-2xl">
                  <button
                    onClick={() => setAdminSubView('ecosystem')}
                    className={`flex-1 py-2 rounded-xl font-extrabold ${
                      adminSubView === 'ecosystem'
                        ? 'bg-orange-500 text-white'
                        : 'text-zinc-400'
                    }`}
                  >
                    Aliados y Stock
                  </button>
                  <button
                    onClick={() => setAdminSubView('settings')}
                    className={`flex-1 py-2 rounded-xl font-extrabold ${
                      adminSubView === 'settings'
                        ? 'bg-orange-500 text-white'
                        : 'text-zinc-400'
                    }`}
                  >
                    Ajustes
                  </button>
                </div>

                {adminSubView === 'ecosystem' ? (
                  <AdminEcosystemPanel
                    allies={allies}
                    items={items}
                    ads={ads}
                    ordersHistory={ordersHistory}
                    onSaveAlly={handleSaveAlly}
                    onToggleAuditStage={handleToggleAuditStage}
                    onDeleteAlly={(id) =>
                      setAllies((prev) => prev.filter((a) => a.id !== id))
                    }
                    onSaveItem={handleSaveItem}
                    onDeleteItem={(id) =>
                      setItems((prev) => prev.filter((i) => i.id !== id))
                    }
                    onCreateAd={(ad) => setAds((prev) => [ad, ...prev])}
                    onToggleAd={(id) =>
                      setAds((prev) =>
                        prev.map((a) =>
                          a.id === id ? { ...a, active: a.active === false ? true : false } : a
                        )
                      )
                    }
                    onDeleteAd={(id) => setAds((prev) => prev.filter((a) => a.id !== id))}
                    onToast={showToast}
                  />
                ) : (
                  <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-4 space-y-3">
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1">WhatsApp</label>
                      <input
                        type="text"
                        value={settings.whatsappPhone}
                        onChange={(e) =>
                          setSettings({ ...settings, whatsappPhone: e.target.value })
                        }
                        className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1">Tasa Bs.</label>
                      <input
                        type="number"
                        step="0.01"
                        value={settings.exchangeRateBs}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            exchangeRateBs: parseFloat(e.target.value) || 52
                          })
                        }
                        className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                      />
                    </div>
                    <button
                      onClick={() => setAdminUnlocked(false)}
                      className="w-full py-2 rounded-xl bg-zinc-800 text-zinc-200 font-bold"
                    >
                      Bloquear
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      {/* =======================================================
          MENÚ DE CATEGORÍAS A PANTALLA COMPLETA (15 SECCIONES)
      ======================================================= */}
      {categoryMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0C] text-white flex flex-col">
          <div className="px-4 py-3.5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-black">Categorías ÁPEX</span>
            </div>
            <button
              onClick={() => setCategoryMenuOpen(false)}
              className="p-2 rounded-xl bg-[#141418] border border-zinc-800 text-zinc-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 max-w-md w-full mx-auto">
            <button
              onClick={() => {
                setSelectedVertical('all');
                setSelectedSubcategory('all');
                setActiveTab('catalog');
                setCategoryMenuOpen(false);
              }}
              className={`w-full px-4 py-3 rounded-2xl border flex items-center justify-between text-xs font-extrabold ${
                selectedVertical === 'all'
                  ? 'bg-orange-500 border-orange-500 text-white'
                  : 'bg-[#141418] border-zinc-800 text-zinc-200'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <LayoutGrid className="w-4 h-4" />
                <span>Todas las secciones</span>
              </span>
            </button>

            {VERTICALS.map((v) => {
              const IconComp = getVerticalIcon(v.id);
              const isExpanded = expandedVerticalId === v.id;
              const isSelected = selectedVertical === v.id;

              return (
                <div
                  key={v.id}
                  className="bg-[#141418] border border-zinc-800 rounded-2xl overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3">
                    <button
                      onClick={() => {
                        setSelectedVertical(v.id);
                        setSelectedSubcategory('all');
                        setActiveTab('catalog');
                        setCategoryMenuOpen(false);
                      }}
                      className="flex items-center gap-3 text-left flex-1 min-w-0"
                    >
                      <IconComp
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? 'text-orange-400' : 'text-zinc-300'
                        }`}
                      />
                      <span className="text-xs font-extrabold text-white truncate">
                        {v.name}
                      </span>
                    </button>

                    <button
                      onClick={() =>
                        setExpandedVerticalId(isExpanded ? null : v.id)
                      }
                      className="text-[11px] font-bold text-zinc-400 hover:text-orange-400 px-2 py-1"
                    >
                      {isExpanded ? '−' : '+'}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-3 pt-1 border-t border-zinc-800/70 flex flex-wrap gap-1.5">
                      {v.subcategories.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => {
                            setSelectedVertical(v.id);
                            setSelectedSubcategory(sub);
                            setActiveTab('catalog');
                            setCategoryMenuOpen(false);
                          }}
                          className="px-2.5 py-1 rounded-xl bg-[#0A0A0C] border border-zinc-800 text-[11px] font-semibold text-zinc-200 hover:border-orange-500"
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =======================================================
          MODAL DETALLE CON GALERÍA DE HASTA 10 FOTOS
      ======================================================= */}
      {detailItem && (
        <div
          onClick={() => setDetailItem(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-3"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#141418] border border-zinc-800 rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto p-4 space-y-3.5 text-xs"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-extrabold text-emerald-400">
                  ✓ Sello Calidad ÁPEX
                </span>
                <h3 className="text-sm font-black text-white mt-0.5">{detailItem.name}</h3>
              </div>
              <button
                onClick={() => setDetailItem(null)}
                className="p-1.5 rounded-xl bg-[#0A0A0C] text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative h-56 rounded-2xl overflow-hidden bg-zinc-900">
              <img
                src={detailPhotos[detailPhotoIdx] || detailPhotos[0]}
                alt={detailItem.name}
                className="w-full h-full object-cover"
              />
              {detailPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setDetailPhotoIdx((prev) =>
                        prev === 0 ? detailPhotos.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 text-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setDetailPhotoIdx((prev) => (prev + 1) % detailPhotos.length)
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 text-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-black/75 text-[10px] font-bold">
                {detailPhotoIdx + 1} / {detailPhotos.length}
              </span>
            </div>

            <div className="bg-[#0A0A0C] border border-zinc-800 rounded-2xl p-3 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-zinc-400">Especificación</span>
                <span className="text-white font-semibold">
                  {detailItem.techSpecs?.gradeOrMaterial || detailItem.spec}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Stock</span>
                <span className="text-white font-bold">{detailItem.stock}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-lg font-black text-white block">
                  ${getUnitPrice(detailItem).toFixed(2)}
                </span>
                <span className="text-[10px] text-amber-400 font-bold">
                  +{detailItem.buyerPoints || Math.round(getUnitPrice(detailItem) * 5)} pts
                </span>
              </div>
              <button
                onClick={() => {
                  addToCart(detailItem, 1);
                  setDetailItem(null);
                }}
                className="px-5 py-2.5 rounded-2xl bg-orange-500 text-white font-black"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL LOGIN / REGISTRO */}
      {authModalMode && (
        <div
          onClick={() => setAuthModalMode(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleAuthSubmit}
            className="bg-[#141418] border border-zinc-800 rounded-3xl w-full max-w-sm p-5 space-y-3 text-xs"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-white">
                {authModalMode === 'login' ? 'Entrar' : 'Crear Cuenta'}
              </h3>
              <button
                type="button"
                onClick={() => setAuthModalMode(null)}
                className="text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {authModalMode === 'register' && (
              <input
                type="text"
                required
                value={authForm.name}
                onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                placeholder="Nombre completo *"
                className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
              />
            )}

            <input
              type="email"
              required
              value={authForm.email}
              onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
              placeholder="Correo *"
              className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
            />

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-orange-500 text-white font-extrabold"
            >
              Continuar
            </button>
          </form>
        </div>
      )}

      {/* BOTÓN FLOTANTE DE CATEGORÍAS ABAJO A LA IZQUIERDA */}
      <button
        onClick={() => setCategoryMenuOpen(true)}
        className="fixed bottom-16 left-4 z-40 px-3.5 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white shadow-xl flex items-center gap-2 text-xs font-black transition"
      >
        <LayoutGrid className="w-4 h-4" />
        <span>Categorías</span>
      </button>

      {/* BARRA INFERIOR PRINCIPAL */}
      <nav className="fixed bottom-0 inset-x-0 z-30 bg-[#0A0A0C]/95 backdrop-blur-md border-t border-zinc-800">
        <div className="max-w-md mx-auto grid grid-cols-4 px-2 py-1.5 text-[10px] font-extrabold">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`py-1.5 rounded-xl flex flex-col items-center gap-0.5 ${
              activeTab === 'catalog' ? 'text-orange-400' : 'text-zinc-500'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Inicio</span>
          </button>

          <button
            onClick={() => setActiveTab('social')}
            className={`py-1.5 rounded-xl flex flex-col items-center gap-0.5 ${
              activeTab === 'social' ? 'text-orange-400' : 'text-zinc-500'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Red / QR</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-1.5 rounded-xl flex flex-col items-center gap-0.5 ${
              activeTab === 'profile' ? 'text-orange-400' : 'text-zinc-500'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Perfil</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`py-1.5 rounded-xl flex flex-col items-center gap-0.5 ${
              activeTab === 'admin' ? 'text-orange-400' : 'text-zinc-500'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
