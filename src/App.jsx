import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag,
  User,
  ShieldCheck,
  Search,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  X,
  Plus,
  Minus,
  Trash2,
  Award,
  Layers,
  LogOut,
  Building2,
  Users,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal
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
  tagline: 'Ecosistema Comercial y Red Social Curada • Sello de Calidad',
  whatsappPhone: '584141470773',
  exchangeRateBs: 52.0,
  pointsPerDollar: 5,
  adminPin: '2026'
};

const DEFAULT_ADS = [
  {
    id: 'ad-megafreeze-launch',
    advertiser: 'Megafreeze Venezuela',
    tag: 'Aliado Oficial • Calidad Certificada',
    title: 'Refrigerantes Orgánicos y Lubricantes Sintéticos',
    description:
      'Protección térmica y de motor auditada por ÁPEX. Gana puntos cruzados en cada compra.',
    image:
      'https://images.unsplash.com/photo-1635437536607-b8572f443763?auto=format&fit=crop&w=1000&q=80',
    ctaText: 'Ver Aliado',
    targetSection: 'allies',
    isLaunch: true,
    launchNote: 'Lanzamiento Oficial: Línea Megafreeze disponible en stock ÁPEX',
    active: true
  }
];

function safeLoad(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  // --- ESTADOS PRINCIPALES DEL ECOSISTEMA ---
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

  // --- NAVEGACIÓN Y FILTROS ---
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'social' | 'cart' | 'profile' | 'admin'
  const [selectedVertical, setSelectedVertical] = useState('all'); // 'all' o id de VERTICALS
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedAllyFilter, setSelectedAllyFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRole, setPriceRole] = useState('consumer'); // 'consumer' | 'dealer'

  // --- MODALES Y CARRITO ---
  const [detailItem, setDetailItem] = useState(null);
  const [detailPhotoIdx, setDetailPhotoIdx] = useState(0);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Pago Móvil');
  const [paymentRef, setPaymentRef] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  // --- AUTENTICACIÓN Y ADMIN ---
  const [authModalMode, setAuthModalMode] = useState(null); // 'login' | 'register' | null
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    role: 'consumer',
    referralInput: ''
  });
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState('');
  const [adminSubView, setAdminSubView] = useState('ecosystem'); // 'ecosystem' | 'settings'
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
      // Ignora errores de cuota en almacenamiento local
    }
  }, [settings, allies, items, ads, posts, users, currentUserId, ordersHistory]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3200);
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

  // --- CÁLCULO DE PRECIOS Y PUNTOS ---
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

  // --- CARRITO ---
  const addToCart = (item, qty = 1) => {
    if (Number(item.stock || 0) <= 0) {
      showToast('Producto sin stock disponible por ahora', 'error');
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
    if (cart.length === 0) {
      showToast('Tu carrito está vacío', 'error');
      return;
    }

    const firstAllyId = cart[0]?.item?.allyId;
    const allyObj = allies.find((a) => a.id === firstAllyId);
    const orderId = `APX-${Math.floor(100000 + Math.random() * 899999)}`;
    const summaryText = cart
      .map((c) => `${c.qty}x ${c.item.name}`)
      .join(', ');

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

    // Descontar stock
    setItems((prev) =>
      prev.map((it) => {
        const bought = cart.find((c) => c.item.id === it.id);
        if (!bought) return it;
        return { ...it, stock: Math.max(0, Number(it.stock || 0) - bought.qty) };
      })
    );

    // Sumar puntos al comprador
    if (currentUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === currentUser.id
            ? { ...u, points: Number(u.points || 0) + cartTotals.buyerPoints }
            : u
        )
      );
    }

    // Sumar puntos al aliado vendedor
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

    // Enviar mensaje estructurado por WhatsApp
    const waText = encodeURIComponent(
      `Hola equipo ${settings.brandName}, confirmo pedido *${orderId}*:\n` +
        `• Aliado: ${newOrder.allyName}\n` +
        `• Detalle: ${summaryText}\n` +
        `• Total: $${cartTotals.subtotal.toFixed(2)} (Bs. ${cartTotals.totalBs.toFixed(2)})\n` +
        `• Pago: ${paymentMethod} | Ref: ${newOrder.paymentRef}\n` +
        `• Cliente: ${newOrder.customerName} (${newOrder.customerPhone})`
    );
    window.open(
      `https://wa.me/${settings.whatsappPhone}?text=${waText}`,
      '_blank',
      'noopener,noreferrer'
    );

    setCart([]);
    setPaymentRef('');
    setCustomerNotes('');
    showToast(
      `Pedido ${orderId} registrado: +${cartTotals.buyerPoints} pts comprador y +${cartTotals.sellerPoints} pts aliado`
    );
    setActiveTab('social');
  };

  // --- AUTENTICACIÓN ---
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = authForm.email.trim().toLowerCase();
    if (!cleanEmail) return;

    if (authModalMode === 'login') {
      const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
      if (!found) {
        showToast('No existe una cuenta con ese correo. Regístrate primero.', 'error');
        return;
      }
      setCurrentUserId(found.id);
      setAuthModalMode(null);
      showToast(`Bienvenido de nuevo, ${found.name}`);
      return;
    }

    const cleanName = (authForm.name.trim() || cleanEmail.split('@')[0]).slice(0, 40);
    const cleanHandle = `@${cleanName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .slice(0, 12)}_apex`;

    let bonus = 50;
    const refCode = authForm.referralInput.trim().toUpperCase();
    if (refCode) {
      bonus += 25;
      setUsers((prev) =>
        prev.map((u) =>
          u.referralCode === refCode ? { ...u, points: Number(u.points || 0) + 25 } : u
        )
      );
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: cleanName,
      handle: cleanHandle,
      email: cleanEmail,
      role: authForm.role || 'consumer',
      points: bonus,
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
    showToast(`Cuenta creada en ÁPEX (+${bonus} pts iniciales)`);
  };

  // --- ACCIONES SOCIALES ---
  const handleToggleFollow = ({ type, id, label }) => {
    if (!currentUser) return;
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== currentUser.id) return u;
        const list = u.following || [];
        const exists = list.includes(id);
        const nextFollowing = exists ? list.filter((x) => x !== id) : [...list, id];
        showToast(exists ? `Dejaste de seguir a ${label}` : `Ahora sigues a ${label}`);
        return { ...u, following: nextFollowing };
      })
    );
    if (type === 'ally') {
      setAllies((prev) =>
        prev.map((a) => {
          if (a.id !== id) return a;
          const followers = a.followers || [];
          const has = followers.includes(currentUser.id);
          return {
            ...a,
            followers: has
              ? followers.filter((x) => x !== currentUser.id)
              : [...followers, currentUser.id]
          };
        })
      );
    }
  };

  const handleCreateVerifiedPost = (payload) => {
    if (!currentUser) return;
    const newPost = {
      id: `post-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userHandle: currentUser.handle || '@miembro_apex',
      likes: [],
      baseLikes: 0,
      createdAt: 'Justo ahora',
      ...payload
    };
    setPosts((prev) => [newPost, ...prev]);
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
    showToast(`Kilometraje actualizado a ${Number(km).toLocaleString()} km`);
  };

  // --- ACCIONES DEL PANEL ADMIN ---
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
    <div className="min-h-screen bg-[#0A0A0C] text-zinc-100 pb-24 selection:bg-orange-500/30">
      {/* Notificación flotante */}
      {toast && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl text-xs font-extrabold shadow-xl border ${
            toast.type === 'error'
              ? 'bg-red-950/95 border-red-500/50 text-red-200'
              : 'bg-zinc-900/95 border-orange-500/50 text-white'
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Aviso superior de lanzamiento si está activo */}
      {launchAd && (
        <div className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 text-zinc-950 px-4 py-2 text-center text-[11px] font-black tracking-wide">
          {launchAd.launchNote}
        </div>
      )}

      {/* Encabezado principal */}
      <header className="sticky top-0 z-30 bg-[#0A0A0C]/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div
            onClick={() => {
              setActiveTab('catalog');
              setSelectedVertical('all');
              setSelectedSubcategory('all');
              setSelectedAllyFilter('all');
            }}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-white">
                {settings.brandName}
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
                CALIDAD ÁPEX
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 truncate max-w-[210px]">
              {settings.tagline}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href={`https://wa.me/${settings.whatsappPhone}?text=${encodeURIComponent(
                'Hola equipo ÁPEX, necesito asesoría técnica o información para ser aliado.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25"
              title="Asesoría técnica por WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={() => setActiveTab('cart')}
              className="relative p-2 rounded-xl bg-[#141418] border border-zinc-800 text-white hover:border-orange-500/50"
              title="Carrito"
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

      {/* Contenedor principal tipo móvil */}
      <main className="max-w-md mx-auto px-4 pt-4 space-y-5">
        {/* =======================================================
            PESTAÑA 1: CATÁLOGO DE 10 SECCIONES + ALIADOS ÁPEX
        ======================================================= */}
        {activeTab === 'catalog' && (
          <div className="space-y-5">
            {/* Buscador + Selector de Rol de Precio */}
            <div className="space-y-2.5">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar producto, aliado, taller, médico o servicio..."
                  className="w-full bg-[#141418] border border-zinc-800 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center justify-between gap-2 bg-[#141418] border border-zinc-800 rounded-2xl p-1.5 text-[11px]">
                <span className="text-zinc-400 pl-2 font-semibold">Lista de precios:</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setPriceRole('consumer')}
                    className={`px-3 py-1 rounded-xl font-extrabold transition ${
                      priceRole === 'consumer'
                        ? 'bg-orange-500 text-white'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Particular
                  </button>
                  <button
                    onClick={() => setPriceRole('dealer')}
                    className={`px-3 py-1 rounded-xl font-extrabold transition ${
                      priceRole === 'dealer'
                        ? 'bg-amber-400 text-zinc-950'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Tienda / Mayor
                  </button>
                </div>
              </div>
            </div>

            {/* Banner publicitario activo */}
            {activeAds[0] && (
              <div className="bg-[#141418] border border-zinc-800 rounded-3xl overflow-hidden">
                {activeAds[0].image && (
                  <img
                    src={activeAds[0].image}
                    alt={activeAds[0].title}
                    className="w-full h-36 object-cover"
                  />
                )}
                <div className="p-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-orange-400">
                      {activeAds[0].tag || 'Publicidad'} • {activeAds[0].advertiser}
                    </span>
                    <h2 className="text-sm font-black text-white mt-0.5">
                      {activeAds[0].title}
                    </h2>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      {activeAds[0].description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 10 SECCIONES EN EL ORDEN EXACTO DEFINIDO */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-orange-400" /> Secciones del Ecosistema (10)
                </span>
                {selectedVertical !== 'all' && (
                  <button
                    onClick={() => {
                      setSelectedVertical('all');
                      setSelectedSubcategory('all');
                      setSelectedAllyFilter('all');
                    }}
                    className="text-[11px] font-bold text-orange-400 underline"
                  >
                    Ver todas
                  </button>
                )}
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                <button
                  onClick={() => {
                    setSelectedVertical('all');
                    setSelectedSubcategory('all');
                  }}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap border transition ${
                    selectedVertical === 'all'
                      ? 'bg-orange-500 border-orange-500 text-white'
                      : 'bg-[#141418] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  Todas (10)
                </button>

                {VERTICALS.map((v, index) => {
                  const active = selectedVertical === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => {
                        setSelectedVertical(v.id);
                        setSelectedSubcategory('all');
                      }}
                      className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap border transition ${
                        active
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'bg-[#141418] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      {index + 1}. {v.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subcategorías de la sección elegida */}
            {activeVerticalObj && (
              <div className="bg-[#141418] border border-zinc-800 rounded-2xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-white">
                    {activeVerticalObj.name}
                  </span>
                  <span className="text-[10px] text-zinc-400">Subsecciones</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  {activeVerticalObj.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button
                    onClick={() => setSelectedSubcategory('all')}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold ${
                      selectedSubcategory === 'all'
                        ? 'bg-white text-zinc-950'
                        : 'bg-[#0A0A0C] text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    Todo
                  </button>
                  {activeVerticalObj.subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(sub)}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold ${
                        selectedSubcategory === sub
                          ? 'bg-orange-500 text-white'
                          : 'bg-[#0A0A0C] text-zinc-300 border border-zinc-800'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ALIADOS VERIFICADOS CON SELLO DE CALIDAD ÁPEX */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" /> Aliados con Sello Calidad ÁPEX
                </span>
                {selectedAllyFilter !== 'all' && (
                  <button
                    onClick={() => setSelectedAllyFilter('all')}
                    className="text-[11px] font-bold text-orange-400 underline"
                  >
                    Mostrar todos
                  </button>
                )}
              </div>

              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {visibleAllies.map((ally) => {
                  const isSelected = selectedAllyFilter === ally.id;
                  return (
                    <div
                      key={ally.id}
                      onClick={() =>
                        setSelectedAllyFilter(isSelected ? 'all' : ally.id)
                      }
                      className={`min-w-[225px] rounded-2xl p-3 border cursor-pointer transition space-y-1.5 ${
                        isSelected
                          ? 'bg-orange-500/15 border-orange-500'
                          : 'bg-[#141418] border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-extrabold text-xs text-white truncate">
                          {ally.brandName}
                        </span>
                        <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                          ✓ ÁPEX
                        </span>
                      </div>
                      <p className="text-[10px] text-orange-300 font-semibold truncate">
                        {ally.subcategory} • {ally.city}
                      </p>
                      <p className="text-[10px] text-zinc-400 line-clamp-2">
                        {ally.bio}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* LISTADO DE PRODUCTOS Y SERVICIOS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-white">
                  Stock y Servicios ({filteredItems.length})
                </span>
                <span className="text-[10px] text-zinc-400">
                  Toca una tarjeta para ver fotos y ficha
                </span>
              </div>

              {filteredItems.length === 0 ? (
                <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-6 text-center space-y-2">
                  <SlidersHorizontal className="w-6 h-6 text-zinc-500 mx-auto" />
                  <p className="text-xs font-bold text-white">
                    No hay ítems con ese filtro todavía
                  </p>
                  <button
                    onClick={() => {
                      setSelectedVertical('all');
                      setSelectedSubcategory('all');
                      setSelectedAllyFilter('all');
                      setSearchQuery('');
                    }}
                    className="px-4 py-1.5 rounded-xl bg-orange-500 text-white text-xs font-extrabold"
                  >
                    Restablecer filtros
                  </button>
                </div>
              ) : (
                filteredItems.map((item) => {
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
                      className="bg-[#141418] border border-zinc-800 hover:border-orange-500/40 rounded-3xl p-3.5 flex gap-3.5 cursor-pointer transition"
                    >
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-zinc-900 shrink-0">
                        <img
                          src={coverImg}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {photoCount > 1 && (
                          <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-black/80 text-[10px] font-bold text-white">
                            1/{photoCount}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-extrabold text-orange-400 truncate">
                              {ally?.brandName || 'Aliado ÁPEX'}
                            </span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 shrink-0">
                              Sello ÁPEX
                            </span>
                          </div>
                          <h3 className="text-xs font-extrabold text-white line-clamp-2 mt-0.5">
                            {item.name}
                          </h3>
                          <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                            {item.spec}
                          </p>
                        </div>

                        <div className="flex items-end justify-between gap-2 pt-2">
                          <div>
                            <div className="text-sm font-black text-white">
                              ${unitPrice.toFixed(2)}
                            </div>
                            <div className="text-[10px] text-amber-400 font-bold">
                              +{item.buyerPoints || Math.round(unitPrice * 5)} pts comprador
                            </div>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(item, 1);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-extrabold"
                          >
                            + Pedir
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* =======================================================
            PESTAÑA 2: COMUNIDAD VERIFICADA, SEGUIMIENTO Y QR
        ======================================================= */}
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

        {/* =======================================================
            PESTAÑA 3: CARRITO Y CONFIRMACIÓN DE PEDIDO
        ======================================================= */}
        {activeTab === 'cart' && (
          <div className="space-y-4 text-xs">
            <h2 className="text-base font-black text-white">Tu Pedido en ÁPEX</h2>

            {cart.length === 0 ? (
              <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-6 text-center space-y-3">
                <p className="text-zinc-400">Aún no has agregado productos o servicios.</p>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-4 py-2 rounded-xl bg-orange-500 text-white font-extrabold"
                >
                  Explorar Secciones
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2.5">
                  {cart.map(({ item, qty }) => {
                    const unit = getUnitPrice(item);
                    return (
                      <div
                        key={item.id}
                        className="bg-[#141418] border border-zinc-800 rounded-2xl p-3 flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <h4 className="font-extrabold text-white truncate">{item.name}</h4>
                          <p className="text-[11px] text-zinc-400">
                            ${unit.toFixed(2)} c/u • Subtotal: ${(unit * qty).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => updateCartQty(item.id, -1)}
                            className="p-1.5 rounded-lg bg-[#0A0A0C] border border-zinc-800 text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-black">{qty}</span>
                          <button
                            onClick={() => updateCartQty(item.id, 1)}
                            className="p-1.5 rounded-lg bg-[#0A0A0C] border border-zinc-800 text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => updateCartQty(item.id, -qty)}
                            className="p-1.5 rounded-lg bg-[#0A0A0C] border border-zinc-800 text-red-400"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Resumen de doble acumulación de puntos */}
                <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-4 space-y-2">
                  <div className="flex justify-between text-zinc-300">
                    <span>Total Referencial USD</span>
                    <span className="font-black text-white text-sm">
                      ${cartTotals.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Equivalente Bs. (Tasa {settings.exchangeRateBs})</span>
                    <span className="font-bold text-emerald-400">
                      Bs. {cartTotals.totalBs.toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-zinc-800 flex justify-between text-[11px]">
                    <span className="text-amber-400 font-bold">
                      +{cartTotals.buyerPoints} pts para ti
                    </span>
                    <span className="text-emerald-400 font-bold">
                      +{cartTotals.sellerPoints} pts para el aliado
                    </span>
                  </div>
                </div>

                <form
                  onSubmit={handleConfirmOrder}
                  className="bg-[#141418] border border-zinc-800 rounded-3xl p-4 space-y-3"
                >
                  <input
                    type="text"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Tu teléfono / WhatsApp de contacto *"
                    className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                  />

                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                  >
                    <option value="Pago Móvil">Pago Móvil</option>
                    <option value="Transferencia">Transferencia</option>
                    <option value="Efectivo / Divisas">Efectivo / Divisas</option>
                  </select>

                  <input
                    type="text"
                    value={paymentRef}
                    onChange={(e) => setPaymentRef(e.target.value)}
                    placeholder="Número de referencia o nota de pago (opcional)"
                    className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                  />

                  <input
                    type="text"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="Observaciones o dirección de entrega"
                    className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                  />

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-black"
                  >
                    Confirmar Pedido y Enviar por WhatsApp
                  </button>
                </form>
              </>
            )}
          </div>
        )}

        {/* =======================================================
            PESTAÑA 4: PERFIL DE COMPRADOR Y PUNTOS CRUZADOS
        ======================================================= */}
        {activeTab === 'profile' && (
          <div className="space-y-4 text-xs">
            {!currentUser ? (
              <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-6 text-center space-y-3">
                <User className="w-8 h-8 text-orange-400 mx-auto" />
                <h2 className="text-base font-black text-white">Perfil de Comprador ÁPEX</h2>
                <p className="text-zinc-400">
                  Crea tu perfil para acumular puntos canjeables entre aliados, usar tu QR social,
                  recibir seguimiento de mantenimiento y publicar reseñas de tus compras.
                </p>
                <div className="flex gap-2 justify-center pt-1">
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
                    Iniciar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-base font-black text-white">{currentUser.name}</h2>
                      <p className="text-zinc-400">{currentUser.handle} • {currentUser.email}</p>
                      <p className="text-[11px] font-mono text-orange-400 mt-1">
                        Código de invitación: {currentUser.referralCode}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentUserId(null);
                        showToast('Sesión cerrada');
                      }}
                      className="p-2 rounded-xl bg-[#0A0A0C] border border-zinc-800 text-zinc-400 hover:text-white"
                      title="Cerrar sesión"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-[#0A0A0C] border border-zinc-800 rounded-2xl p-3.5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase font-bold block">
                        Puntos ÁPEX Disponibles
                      </span>
                      <span className="text-xl font-black text-amber-400">
                        {Number(currentUser.points || 0)} pts
                      </span>
                    </div>
                    <Award className="w-7 h-7 text-amber-400" />
                  </div>
                </div>

                {/* Historial de compras del usuario */}
                <div className="space-y-2.5">
                  <h3 className="font-extrabold text-white">Mis Compras Verificadas</h3>
                  {ordersHistory.filter((o) => o.userId === currentUser.id).length === 0 ? (
                    <div className="bg-[#141418] border border-zinc-800 rounded-2xl p-4 text-zinc-400">
                      Aún no tienes pedidos completados.
                    </div>
                  ) : (
                    ordersHistory
                      .filter((o) => o.userId === currentUser.id)
                      .map((ord) => (
                        <div
                          key={ord.id}
                          className="bg-[#141418] border border-zinc-800 rounded-2xl p-3.5 space-y-1"
                        >
                          <div className="flex justify-between font-bold">
                            <span className="font-mono text-white">{ord.id}</span>
                            <span className="text-emerald-400">
                              ${Number(ord.total || 0).toFixed(2)}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-300">{ord.itemsSummary}</p>
                          <p className="text-[10px] text-amber-400 font-bold">
                            +{ord.buyerPoints} pts acumulados • {ord.allyName}
                          </p>
                        </div>
                      ))
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* =======================================================
            PESTAÑA 5: PANEL ADMINISTRADOR ÁPEX
        ======================================================= */}
        {activeTab === 'admin' && (
          <div className="space-y-4 text-xs">
            {!adminUnlocked ? (
              <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-6 space-y-3 text-center">
                <ShieldCheck className="w-8 h-8 text-orange-400 mx-auto" />
                <h2 className="text-base font-black text-white">
                  Acceso del Equipo Administrador ÁPEX
                </h2>
                <p className="text-zinc-400">
                  Solo el equipo técnico y evaluador de ÁPEX puede aprobar aliados, crear
                  perfiles, cargar stock con hasta 10 fotos y subir publicidades.
                </p>
                <input
                  type="password"
                  value={adminPinInput}
                  onChange={(e) => setAdminPinInput(e.target.value)}
                  placeholder="PIN de administrador (por defecto: 2026)"
                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-center text-white outline-none"
                />
                <button
                  onClick={() => {
                    if (adminPinInput.trim() === String(settings.adminPin || '2026')) {
                      setAdminUnlocked(true);
                      setAdminPinInput('');
                      showToast('Panel de administración desbloqueado');
                    } else {
                      showToast('PIN incorrecto', 'error');
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-orange-500 text-white font-extrabold"
                >
                  Entrar al Panel
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
                    Ecosistema, Aliados y 10 Fotos
                  </button>
                  <button
                    onClick={() => setAdminSubView('settings')}
                    className={`flex-1 py-2 rounded-xl font-extrabold ${
                      adminSubView === 'settings'
                        ? 'bg-orange-500 text-white'
                        : 'text-zinc-400'
                    }`}
                  >
                    WhatsApp y Tasa
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
                    <h3 className="font-extrabold text-white">Configuración General ÁPEX</h3>
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1">
                        WhatsApp de pedidos y evaluación (con código país, ej: 584141470773)
                      </label>
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
                      <label className="text-[10px] text-zinc-400 block mb-1">
                        Tasa de cambio referencial (Bs. por $1)
                      </label>
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
                      Bloquear Panel Admin
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      {/* =======================================================
          MODAL DE DETALLE CON CARRUSEL DE HASTA 10 FOTOS
      ======================================================= */}
      {detailItem && (
        <div
          onClick={() => setDetailItem(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-3"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#141418] border border-zinc-800 rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto p-4 space-y-4 text-xs"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-extrabold text-emerald-400 uppercase">
                  ✓ Sello de Calidad Aprobado ÁPEX
                </span>
                <h3 className="text-base font-black text-white mt-0.5">{detailItem.name}</h3>
              </div>
              <button
                onClick={() => setDetailItem(null)}
                className="p-1.5 rounded-xl bg-[#0A0A0C] text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Carrusel de fotos (hasta 10) */}
            <div className="space-y-2">
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
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-black/75 text-[10px] font-bold text-white">
                  Foto {detailPhotoIdx + 1} de {detailPhotos.length}
                </span>
              </div>

              {detailPhotos.length > 1 && (
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {detailPhotos.map((src, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setDetailPhotoIdx(idx)}
                      className={`w-12 h-12 rounded-xl overflow-hidden border shrink-0 ${
                        detailPhotoIdx === idx ? 'border-orange-500' : 'border-zinc-800 opacity-60'
                      }`}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Ficha técnica y respaldo */}
            <div className="bg-[#0A0A0C] border border-zinc-800 rounded-2xl p-3 space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-zinc-400">Especificación:</span>
                <span className="text-white font-semibold text-right">
                  {detailItem.techSpecs?.gradeOrMaterial || detailItem.spec}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Calidad / Norma:</span>
                <span className="text-emerald-400 font-semibold text-right">
                  {detailItem.techSpecs?.normOrCert || 'Verificado ÁPEX'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Stock disponible:</span>
                <span className="text-white font-bold">{detailItem.stock} und.</span>
              </div>
              {detailItem.recommendation?.difference && (
                <p className="text-zinc-300 pt-1.5 border-t border-zinc-800/80">
                  {detailItem.recommendation.difference}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <div className="text-lg font-black text-white">
                  ${getUnitPrice(detailItem).toFixed(2)}
                </div>
                <div className="text-[10px] text-amber-400 font-bold">
                  +{detailItem.buyerPoints || Math.round(getUnitPrice(detailItem) * 5)} pts comprador • +
                  {detailItem.sellerPoints || 25} pts aliado
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(detailItem, 1);
                  setDetailItem(null);
                }}
                className="px-5 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black"
              >
                Agregar al Pedido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================
          MODAL DE LOGIN / REGISTRO DE COMPRADOR
      ======================================================= */}
      {authModalMode && (
        <div
          onClick={() => setAuthModalMode(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleAuthSubmit}
            className="bg-[#141418] border border-zinc-800 rounded-3xl w-full max-w-sm p-5 space-y-3 text-xs"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-white">
                {authModalMode === 'login' ? 'Iniciar Sesión' : 'Crear Perfil en ÁPEX'}
              </h3>
              <button
                type="button"
                onClick={() => setAuthModalMode(null)}
                className="text-zinc-400 hover:text-white"
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
                placeholder="Tu nombre completo *"
                className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
              />
            )}

            <input
              type="email"
              required
              value={authForm.email}
              onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
              placeholder="Correo electrónico *"
              className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
            />

            {authModalMode === 'register' && (
              <input
                type="text"
                value={authForm.referralInput}
                onChange={(e) =>
                  setAuthForm({ ...authForm, referralInput: e.target.value })
                }
                placeholder="Código de invitación (opcional)"
                className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
              />
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-orange-500 text-white font-extrabold"
            >
              {authModalMode === 'login' ? 'Entrar' : 'Registrarme y Ganar Puntos'}
            </button>
          </form>
        </div>
      )}

      {/* =======================================================
          BARRA DE NAVEGACIÓN INFERIOR FIJA
      ======================================================= */}
      <nav className="fixed bottom-0 inset-x-0 z-30 bg-[#0A0A0C]/95 backdrop-blur-md border-t border-zinc-800">
        <div className="max-w-md mx-auto grid grid-cols-4 px-2 py-1.5 text-[10px] font-extrabold">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`py-1.5 rounded-xl flex flex-col items-center gap-0.5 ${
              activeTab === 'catalog' ? 'text-orange-400' : 'text-zinc-500'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Secciones</span>
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
