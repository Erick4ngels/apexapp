import React, { useState, useMemo, useEffect } from 'react';
import {
  ShoppingBag,
  Compass,
  Award,
  User,
  Grid,
  Search,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Zap,
  Truck,
  MapPin,
  CreditCard,
  Package,
  Droplets,
  Wrench,
  Ticket,
  QrCode,
  Smartphone,
  Download,
  FileCheck2,
  ExternalLink,
  Scale,
  Lightbulb,
  X,
  Layers,
  SlidersHorizontal,
  Lock,
  LogOut,
  Edit3,
  Upload,
  UserPlus,
  LogIn,
  ShieldCheck,
  Building2,
  Megaphone,
  Trophy,
  Radio,
  Calendar,
  Handshake,
  ChevronRight,
  Star,
  Eye,
  EyeOff,
  MessageCircle,
  Mail,
  Users,
  Gift,
  Rocket,
  AlertTriangle,
  Copy
} from 'lucide-react';

// --- CLAVE DE PERSISTENCIA ---
const STORAGE_KEY = 'apex_ecosystem_full_v5';

// --- FOTOS DE RESPALDO / PRESETS ---
const PRESET_PHOTOS = [
  {
    label: 'Refrigerante',
    url: 'https://images.unsplash.com/photo-1635437536607-b8572f443763?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Lubricante',
    url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Grasa / Mecánica',
    url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Limpiador / Detailing',
    url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'Herramientas / Taller',
    url: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80'
  }
];

const CATEGORIES = ['Todos', 'Refrigerantes', 'Lubricantes', 'Grasas', 'Limpiadores'];

const USAGE_PROFILES = [
  { id: 'all', label: 'Todos los usos' },
  { id: 'diario', label: 'Uso Diario' },
  { id: 'rendimiento', label: 'Alto Rendimiento' },
  { id: 'mantenimiento', label: 'Mantenimiento' },
  { id: 'estetica', label: 'Estética' }
];

const SPONSOR_PACKAGES = [
  {
    id: 'pkg-1',
    name: 'Pack Banner en Tienda - 15 días',
    price: '$45 / quincena',
    detail: 'Banner visible en todos los apartados + tarjeta destacada en catálogo.'
  },
  {
    id: 'pkg-2',
    name: 'Pack Lanzamiento + Evento Tuning - 30 días',
    price: '$95 / mes',
    detail: 'Aviso de lanzamiento, presencia en válidas y sello Patrocinante.'
  },
  {
    id: 'pkg-3',
    name: 'Aliado Directorio & Herramientas',
    price: '$60 / mes',
    detail: 'Perfil verificado en el Directorio de Aliados + tarifas preferenciales.'
  }
];

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Refrigerante Orgánico Ápex OAT 50/50 (Galón)',
    category: 'Refrigerantes',
    spec: 'Premezclado listo para usar • -37°C a 129°C',
    image: 'https://images.unsplash.com/photo-1635437536607-b8572f443763?auto=format&fit=crop&w=800&q=80',
    price: 18.5,
    consumerPromoPercent: 10,
    dealerDiscountPercent: 26,
    stock: 34,
    points: 95,
    qrSerial: 'APX-REF-5050-8841',
    usageProfiles: ['diario', 'mantenimiento'],
    techSpecs: {
      gradeOrMaterial: 'Etilenglicol Orgánico OAT 50/50',
      normOrCert: 'ASTM D3306 / Libre de Silicatos y Nitritos',
      presentation: 'Galón 3.785 Litros (Listo para aplicar)',
      lifespan: 'Hasta 80,000 km o 3 años',
      oemSku: 'APX-RF-5050'
    },
    recommendation: {
      idealFor: 'Radiadores de aluminio, motores modernos a gasolina y diésel ligero.',
      tip: 'No diluir con agua común; purgar el sistema antes de rellenar.',
      difference: 'Evita cavitación en la bomba de agua y eleva el punto de ebullición a 129°C.'
    }
  },
  {
    id: 'prod-2',
    name: 'Lubricante Full Sintético Ápex 5W-30 SP (4L)',
    category: 'Lubricantes',
    spec: 'API SP / ILSAC GF-6A • Protección Turbo',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    price: 39.0,
    consumerPromoPercent: 8,
    dealerDiscountPercent: 25,
    stock: 22,
    points: 200,
    qrSerial: 'APX-LUB-5W30-3109',
    usageProfiles: ['diario', 'rendimiento'],
    techSpecs: {
      gradeOrMaterial: 'SAE 5W-30 100% Sintético Grupo IV',
      normOrCert: 'API SP / ILSAC GF-6A / Dexos1 Gen3',
      presentation: 'Garrafa 4 Litros con sello hermético',
      lifespan: '10,000 km o 6 meses',
      oemSku: 'APX-LB-5W30'
    },
    recommendation: {
      idealFor: 'Vehículos modernos, inyección directa (GDI) y motores turbocargados.',
      tip: 'Reemplaza el filtro de aceite en cada servicio para máxima limpieza.',
      difference: 'Reduce fricción en arranque en frío y previene pre-ignición a baja velocidad (LSPI).'
    }
  },
  {
    id: 'prod-3',
    name: 'Grasa Automotriz Complejo de Litio EP-2 (1 Kg)',
    category: 'Grasas',
    spec: 'Extrema Presión • Punto de goteo 260°C',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
    price: 14.0,
    consumerPromoPercent: 5,
    dealerDiscountPercent: 28,
    stock: 40,
    points: 75,
    qrSerial: 'APX-GRS-EP2-5520',
    usageProfiles: ['mantenimiento', 'rendimiento'],
    techSpecs: {
      gradeOrMaterial: 'Complejo de Litio NLGI-2 con aditivos EP',
      normOrCert: 'DIN 51502 KP2P-30 / Alta resistencia al agua',
      presentation: 'Envase 1 Kilogramo (Color Azul Alta Temp)',
      lifespan: 'Servicio pesado de rodamientos y crucetas',
      oemSku: 'APX-GR-EP2-1K'
    },
    recommendation: {
      idealFor: 'Rodamientos de rueda, juntas homocinéticas, tren delantero y maquinaria.',
      tip: 'Limpiar restos de grasa vieja antes de engrasar para evitar incompatibilidad.',
      difference: 'No se lava con agua ni se licúa bajo altas temperaturas de frenado.'
    }
  },
  {
    id: 'prod-4',
    name: 'Limpiador Desengrasante de Motor y Chasis (1L)',
    category: 'Limpiadores',
    spec: 'Fórmula biodegradable • Seguro en gomas y sensores',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80',
    price: 12.5,
    consumerPromoPercent: 12,
    dealerDiscountPercent: 22,
    stock: 28,
    points: 65,
    qrSerial: 'APX-CLN-MTR-7742',
    usageProfiles: ['estetica', 'mantenimiento'],
    techSpecs: {
      gradeOrMaterial: 'Surfactantes alcalinos controlados pH balanceado',
      normOrCert: 'Biodegradable • Libre de solventes clorados',
      presentation: 'Atomizador Industrial 1 Litro',
      lifespan: 'Rinde hasta 8 lavados completos de bahía de motor',
      oemSku: 'APX-CL-1000'
    },
    recommendation: {
      idealFor: 'Limpieza de bloques de motor, suspensión, rines y talleres mecánicos.',
      tip: 'Aplicar con el motor tibio (no caliente), dejar actuar 3 minutos y enjuagar.',
      difference: 'Disuelve grasa pesada sin resecar mangueras ni dañar conectores eléctricos.'
    }
  },
  {
    id: 'prod-5',
    name: 'Lubricante Semi-Sintético Ápex 15W-40 Alto Kilometraje',
    category: 'Lubricantes',
    spec: 'API SN/CF • Selladores activos +100,000 km',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    price: 27.0,
    consumerPromoPercent: 10,
    dealerDiscountPercent: 24,
    stock: 30,
    points: 140,
    qrSerial: 'APX-LUB-1540-9023',
    usageProfiles: ['diario', 'mantenimiento'],
    techSpecs: {
      gradeOrMaterial: 'SAE 15W-40 Base Hidroprocesada + Ésteres',
      normOrCert: 'API SN / ACEA A3/B4',
      presentation: 'Garrafa 4 Litros',
      lifespan: '7,000 km o 5 meses',
      oemSku: 'APX-LB-1540'
    },
    recommendation: {
      idealFor: 'Motores con más de 100,000 km, camionetas de trabajo y flotas.',
      tip: 'Ideal para reducir consumo de aceite y mantener compresión estable.',
      difference: 'Acondicionadores de sellos que revitalizan empacaduras envejecidas.'
    }
  },
  {
    id: 'prod-6',
    name: 'Limpiador de Inyectores y Cámara Ápex Boost (350ml)',
    category: 'Limpiadores',
    spec: 'Base PEA concentrada • Recupera potencia',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80',
    price: 15.0,
    consumerPromoPercent: 0,
    dealerDiscountPercent: 25,
    stock: 19,
    points: 80,
    qrSerial: 'APX-CLN-INJ-4418',
    usageProfiles: ['rendimiento', 'mantenimiento'],
    techSpecs: {
      gradeOrMaterial: 'Polieteramina (PEA) de alta concentración',
      normOrCert: 'Seguro para catalizadores y sensores de oxígeno',
      presentation: 'Botella cuello largo 350 ml (Trata hasta 65L)',
      lifespan: 'Aplicar cada 5,000 km en tanque lleno',
      oemSku: 'APX-CL-INJ350'
    },
    recommendation: {
      idealFor: 'Autos con ralentí inestable, pérdida de respuesta o preparación de válida.',
      tip: 'Verter en el tanque justo antes de surtir combustible.',
      difference: 'Limpia depósitos de carbón en inyectores y válvulas en un solo tanque.'
    }
  }
];

const INITIAL_ADS = [
  {
    id: 'ad-1',
    advertiser: 'Herramientas ProTorque',
    tag: 'Patrocinado • Ecosistema Ápex',
    title: 'Torquímetros y Juegos de Dados Cr-V con 15% OFF',
    description: 'Equipamiento profesional para talleres y entusiastas con envío nacional.',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80',
    ctaText: 'Ver Aliado',
    targetSection: 'allies',
    isLaunch: false,
    launchNote: '',
    active: true
  },
  {
    id: 'ad-2',
    advertiser: 'Copa Tuning & Piques',
    tag: 'Lanzamiento Oficial',
    title: 'Preventa de Entradas y Pits • 4ta Válida Nocturna',
    description: 'Lanzamiento oficial del cronograma y exhibición multimarca con Ápex.',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80',
    ctaText: 'Ver Evento',
    targetSection: 'events',
    isLaunch: true,
    launchNote: '¡Nuevo lanzamiento! Cupos de exhibición y carril habilitados.',
    active: true
  }
];

const INITIAL_EVENTS = [
  {
    id: 'evt-1',
    title: '4ta Válida Nacional de Piques & Time Attack',
    date: 'Sábado 12 Dic • 5:00 PM',
    location: 'Autódromo Internacional',
    status: 'EN VIVO / STREAMING',
    category: 'Válida Automotriz',
    sponsors: ['Ápex Lubricantes', 'ProTorque Tools'],
    description: 'Transmisión oficial en directo, zona de pits y stand de diagnóstico Ápex.'
  },
  {
    id: 'evt-2',
    title: 'Expo Tuning Show & Car Audio Night',
    date: 'Domingo 20 Dic • 2:00 PM',
    location: 'Centro de Convenciones Motor',
    status: 'PRÓXIMO EVENTO',
    category: 'Tuning Show',
    sponsors: ['Ápex Detailing', 'Rines Performance'],
    description: 'Competencia de estética, sonido, iluminación y premios para miembros del club.'
  }
];

const INITIAL_ALLIES = [
  {
    id: 'ally-1',
    brandName: 'Herramientas ProTorque',
    modality: 'Aliado Comercial (Vendedor de Herramientas / Tienda)',
    category: 'Herramientas',
    packagePlan: 'Aliado Directorio & Herramientas',
    contactName: 'Ing. Roberto Díaz',
    phone: '+58 412-7749012',
    email: 'ventas@protorque.com',
    notes: 'Distribuidor de herramientas neumáticas y manuales para talleres aliados.',
    status: 'approved'
  },
  {
    id: 'ally-2',
    brandName: 'Rines & Suspensión ApexGrip',
    modality: 'Patrocinante (Paquetes Publicitarios)',
    category: 'Tienda de Repuestos/Accesorios',
    packagePlan: 'Pack Lanzamiento + Evento Tuning - 30 días',
    contactName: 'Laura Méndez',
    phone: '+58 414-3321098',
    email: 'contacto@apexgrip.com',
    notes: 'Patrocinador oficial de válidas y exhibiciones tuning.',
    status: 'approved'
  }
];

const INITIAL_USERS = [
  {
    id: 'usr-1',
    name: 'Carlos Mendoza',
    email: 'carlos@cliente.com',
    emailVerified: true,
    verificationCode: '482910',
    referralCode: 'CARLOS-APEX',
    phone: '+58 412-5550192',
    password: '123',
    address: 'Urb. El Castaño, Av. Principal, Casa #14',
    role: 'consumer',
    dealerStatus: 'none',
    points: 680,
    lifetimePoints: 1280
  },
  {
    id: 'usr-2',
    name: 'Lubricentro & Taller TurboPro',
    email: 'ventas@turbopro.com',
    emailVerified: true,
    verificationCode: '910345',
    referralCode: 'TURBO-APEX',
    phone: '+58 414-8884321',
    password: '123',
    address: 'Av. Bolívar Oeste, Local 8-B, Zona Industrial',
    role: 'dealer',
    dealerStatus: 'approved',
    points: 2350,
    lifetimePoints: 3600
  }
];

const INITIAL_REWARDS = [
  {
    id: 'rew-1',
    title: 'Cupón 10% OFF Extra',
    description: 'Aplicable sobre tu pedido en refrigerantes, lubricantes o grasas.',
    cost: 300,
    type: 'discount',
    discountPercent: 10,
    code: 'APEX10EXTRA',
    active: true
  },
  {
    id: 'rew-2',
    title: 'Limpiador de Inyectores Gratis',
    description: 'Canjea una botella de Ápex Boost 350ml en tu próximo envío.',
    cost: 550,
    type: 'gift',
    code: 'BOOST-FREE',
    active: true
  },
  {
    id: 'rew-3',
    title: 'Bono $15 USD en Compras',
    description: 'Descuento directo en pedidos mayores a $45 USD.',
    cost: 850,
    type: 'discount_fixed',
    discountAmount: 15,
    code: 'APEX15USD',
    active: true
  }
];

function normalizeWhatsAppNumber(raw) {
  const digits = String(raw || '').replace(/\D/g, '');
  if (!digits) return '584141470773';
  if (digits.startsWith('0')) {
    return `58${digits.slice(1)}`;
  }
  return digits;
}

function loadSavedData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function App() {
  const saved = useMemo(() => loadSavedData(), []);

  // --- CONFIGURACIÓN DE MARCA Y WHATSAPP TÉCNICO ---
  const [brandConfig, setBrandConfig] = useState(
    saved?.brandConfig || {
      name: 'ÁPEX',
      tagline: 'Refrigerantes • Lubricantes • Ecosistema Motor',
      logoUrl: '',
      adminPin: '2026',
      pointsPerDollar: 5,
      referralBonusPoints: 150,
      techSupportWhatsapp: '04141470773'
    }
  );

  // --- ESTADO PRINCIPAL PERSISTIDO ---
  const [users, setUsers] = useState(saved?.users || INITIAL_USERS);
  const [currentUserId, setCurrentUserId] = useState(
    saved?.currentUserId !== undefined ? saved.currentUserId : null
  );
  const [products, setProducts] = useState(saved?.products || INITIAL_PRODUCTS);
  const [ads, setAds] = useState(saved?.ads || INITIAL_ADS);
  const [events, setEvents] = useState(saved?.events || INITIAL_EVENTS);
  const [allies, setAllies] = useState(saved?.allies || INITIAL_ALLIES);
  const [rewardsCatalog, setRewardsCatalog] = useState(saved?.rewardsCatalog || INITIAL_REWARDS);
  const [cart, setCart] = useState(saved?.cart || [{ productId: 'prod-1', quantity: 1 }]);
  const [redeemedRewards, setRedeemedRewards] = useState(saved?.redeemedRewards || []);
  const [ordersHistory, setOrdersHistory] = useState(
    saved?.ordersHistory || [
      {
        id: 'ORD-4012',
        userId: 'usr-1',
        customerName: 'Carlos Mendoza',
        roleLabel: 'Consumidor Final',
        itemsCount: 2,
        total: 52.53,
        method: 'Pago Móvil',
        address: 'Urb. El Castaño, Casa #14',
        status: 'Entregado'
      }
    ]
  );
  const [registeredWarranties, setRegisteredWarranties] = useState(
    saved?.registeredWarranties || [
      {
        id: 'GAR-7810',
        userId: 'usr-1',
        productName: 'Refrigerante Orgánico Ápex OAT 50/50 (Galón)',
        qrSerial: 'APX-REF-5050-8841',
        customerName: 'Carlos Mendoza',
        vehicleInfo: 'Toyota Corolla 2019',
        expiryMonths: 12
      }
    ]
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          brandConfig,
          users,
          currentUserId,
          products,
          ads,
          events,
          allies,
          rewardsCatalog,
          cart,
          redeemedRewards,
          ordersHistory,
          registeredWarranties
        })
      );
    } catch {
      // Fallback silencioso en memoria
    }
  }, [
    brandConfig,
    users,
    currentUserId,
    products,
    ads,
    events,
    allies,
    rewardsCatalog,
    cart,
    redeemedRewards,
    ordersHistory,
    registeredWarranties
  ]);

  const currentUser = useMemo(
    () => users.find((u) => u.id === currentUserId) || null,
    [users, currentUserId]
  );

  const isApprovedDealer =
    currentUser?.role === 'dealer' && currentUser?.dealerStatus === 'approved';
  const isApprovedAllyUser = currentUser?.role === 'ally';
  const effectiveRole = isApprovedDealer ? 'dealer' : isApprovedAllyUser ? 'ally' : 'consumer';

  // --- NAVEGACIÓN ---
  // 'store' | 'cart' | 'rewards' | 'profile' | 'more'
  const [activeTab, setActiveTab] = useState('store');
  // Subvistas dentro de 'more': 'hub' | 'support' | 'events' | 'allies' | 'qr' | 'admin'
  const [moreView, setMoreView] = useState('hub');
  // Sub-pestañas de Admin: 'products' | 'ads' | 'allies' | 'events' | 'rewards' | 'users' | 'brand'
  const [adminTab, setAdminTab] = useState('products');

  // --- BANNER GLOBAL Y LANZAMIENTOS ---
  const [dismissedBannerId, setDismissedBannerId] = useState(null);
  const [currentBannerIdx, setCurrentBannerIdx] = useState(0);

  // --- ASESORÍA TÉCNICA POR WHATSAPP ---
  const [supportForm, setSupportForm] = useState({
    vehicle: '',
    issueType: 'Temperatura / Refrigerante',
    description: ''
  });

  // --- ESTADOS DE TIENDA ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedUsage, setSelectedUsage] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const [compareIds, setCompareIds] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [failedImages, setFailedImages] = useState({});

  // --- MODAL PATROCINANTE / ALIADO ---
  const [sponsorModalOpen, setSponsorModalOpen] = useState(false);
  const [sponsorForm, setSponsorForm] = useState({
    modality: 'Patrocinante (Paquetes Publicitarios)',
    packagePlan: SPONSOR_PACKAGES[0].name,
    brandName: '',
    category: 'Herramientas',
    contactName: '',
    phone: '',
    email: '',
    notes: ''
  });

  // --- AUTENTICACIÓN, VERIFICACIÓN DE CORREO Y REFERIDOS ---
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register'); // 'register' | 'login'
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    accountType: 'consumer',
    vipCode: '',
    referredBy: ''
  });
  const [verifyCodeInput, setVerifyCodeInput] = useState('');
  const [editingAddress, setEditingAddress] = useState(false);
  const [addressDraft, setAddressDraft] = useState('');

  // --- CARRITO Y CHECKOUT ---
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [guestAddress, setGuestAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Pago Móvil');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [orderSuccessModal, setOrderSuccessModal] = useState(null);

  // --- QR & GARANTÍA ---
  const [selectedQrProductId, setSelectedQrProductId] = useState('prod-1');
  const [manualQrInput, setManualQrInput] = useState('');
  const [storeModal, setStoreModal] = useState(null);
  const [warrantyForm, setWarrantyForm] = useState({
    customerName: '',
    contact: '',
    vehicleInfo: ''
  });

  // --- ADMIN (SIN BOTÓN NI PISTA DE PIN 1234) ---
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [failedPinAttempts, setFailedPinAttempts] = useState(0);
  const [lockUntil, setLockUntil] = useState(0);

  const [editingProductId, setEditingProductId] = useState(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Refrigerantes',
    spec: '',
    image: PRESET_PHOTOS[0].url,
    price: '',
    consumerPromoPercent: '10',
    dealerDiscountPercent: '25',
    stock: '',
    qrSerial: '',
    gradeOrMaterial: '',
    normOrCert: '',
    presentation: '',
    lifespan: '',
    idealFor: '',
    difference: '',
    usageProfile: 'diario'
  });

  const [newAdForm, setNewAdForm] = useState({
    advertiser: '',
    tag: 'Patrocinado • Ecosistema Ápex',
    title: '',
    description: '',
    image: PRESET_PHOTOS[4].url,
    ctaText: 'Conocer Más',
    targetSection: 'allies',
    isLaunch: false,
    launchNote: ''
  });

  const [newEventForm, setNewEventForm] = useState({
    title: '',
    date: '',
    location: '',
    category: 'Tuning Show',
    status: 'PRÓXIMO EVENTO',
    sponsorsText: 'Ápex Lubricantes',
    description: ''
  });

  const [newAllyForm, setNewAllyForm] = useState({
    brandName: '',
    category: 'Herramientas',
    packagePlan: SPONSOR_PACKAGES[2].name,
    contactName: '',
    phone: '',
    email: '',
    notes: ''
  });

  const [newRewardForm, setNewRewardForm] = useState({
    title: '',
    description: '',
    cost: '400',
    type: 'discount',
    discountPercent: '15',
    discountAmount: '10',
    code: 'APEXVIP'
  });

  // --- TOAST ---
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2600);
  };

  // --- CÁLCULO DE PRECIOS POR ROL ---
  const getProductPricing = useMemo(() => {
    return (product) => {
      let discountPercent = product.consumerPromoPercent || 0;
      if (effectiveRole === 'dealer') {
        discountPercent = product.dealerDiscountPercent || 25;
      } else if (effectiveRole === 'ally') {
        discountPercent = Math.max(15, Math.round((product.dealerDiscountPercent || 24) * 0.8));
      }
      const finalPrice = Number((product.price * (1 - discountPercent / 100)).toFixed(2));
      const savings = Number((product.price - finalPrice).toFixed(2));
      const effectivePoints = Math.round(
        (product.points || Math.round(product.price * brandConfig.pointsPerDollar)) *
          (effectiveRole === 'dealer' ? 1.2 : 1)
      );
      return {
        originalPrice: product.price,
        discountPercent,
        finalPrice,
        savings,
        effectivePoints
      };
    };
  }, [effectiveRole, brandConfig.pointsPerDollar]);

  // --- NIVEL DEL USUARIO ---
  const lifetimePoints = currentUser ? currentUser.lifetimePoints : 0;
  const userTier = useMemo(() => {
    if (lifetimePoints >= 3000) return { name: 'Élite Ápex', next: null, progress: 100 };
    if (lifetimePoints >= 1000) {
      return {
        name: 'Pro Ápex',
        next: '3,000 pts',
        progress: Math.min(100, Math.round(((lifetimePoints - 1000) / 2000) * 100))
      };
    }
    return {
      name: 'Piloto Ápex',
      next: '1,000 pts',
      progress: Math.min(100, Math.round((lifetimePoints / 1000) * 100))
    };
  }, [lifetimePoints]);

  // --- ANUNCIOS ACTIVOS Y LANZAMIENTOS ---
  const activeAds = useMemo(() => ads.filter((a) => a.active), [ads]);
  const activeLaunches = useMemo(() => activeAds.filter((a) => a.isLaunch), [activeAds]);
  const currentMiniBanner = useMemo(() => {
    if (activeAds.length === 0) return null;
    const candidate = activeAds[currentBannerIdx % activeAds.length];
    if (candidate.id === dismissedBannerId) {
      return activeAds.find((a) => a.id !== dismissedBannerId) || null;
    }
    return candidate;
  }, [activeAds, currentBannerIdx, dismissedBannerId]);

  useEffect(() => {
    if (activeAds.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentBannerIdx((prev) => prev + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeAds.length]);

  // --- FILTRADO DE TIENDA ---
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'Todos' || p.category === selectedCategory;
      const matchUse =
        selectedUsage === 'all' || (p.usageProfiles && p.usageProfiles.includes(selectedUsage));
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.spec.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchUse && matchSearch;
    });
  }, [products, selectedCategory, selectedUsage, searchQuery]);

  const comparedProducts = useMemo(
    () => compareIds.map((id) => products.find((p) => p.id === id)).filter(Boolean),
    [compareIds, products]
  );

  const activeQrProduct = useMemo(
    () => products.find((p) => p.id === selectedQrProductId) || products[0],
    [products, selectedQrProductId]
  );

  // --- ACCIONES DE USUARIO, VERIFICACIÓN DE CORREO Y REFERIDOS ---
  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerForm.name.trim() || !registerForm.email.trim() || !registerForm.password.trim()) {
      showToast('Completa nombre, correo y contraseña', 'error');
      return;
    }
    if (users.some((u) => u.email.toLowerCase() === registerForm.email.trim().toLowerCase())) {
      showToast('Ese correo ya está registrado', 'error');
      return;
    }

    const wantsDealer = registerForm.accountType === 'dealer';
    const hasVip = registerForm.vipCode.trim().toUpperCase() === 'APEXPRO';
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const cleanNameSlug = registerForm.name
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 6) || 'APEX';
    const refCode = `${cleanNameSlug}-${Math.floor(10 + Math.random() * 89)}`;

    const referrerInput = registerForm.referredBy.trim().toUpperCase();
    const validReferrer = referrerInput
      ? users.find((u) => u.referralCode.toUpperCase() === referrerInput)
      : null;

    const bonusPts = brandConfig.referralBonusPoints || 150;
    const initialPts = validReferrer ? 200 + bonusPts : 200;

    const newUser = {
      id: `usr-${Date.now()}`,
      name: registerForm.name.trim(),
      email: registerForm.email.trim(),
      emailVerified: false,
      verificationCode: code,
      referralCode: refCode,
      referredByCode: validReferrer ? validReferrer.referralCode : '',
      phone: registerForm.phone.trim() || '+58 412-0000000',
      password: registerForm.password.trim(),
      address: registerForm.address.trim() || 'Dirección por definir',
      role: wantsDealer ? 'dealer' : 'consumer',
      dealerStatus: wantsDealer ? (hasVip ? 'approved' : 'pending') : 'none',
      points: initialPts,
      lifetimePoints: initialPts
    };

    setUsers((prev) => [newUser, ...prev]);
    setCurrentUserId(newUser.id);
    setAuthModalOpen(false);
    setActiveTab('profile');
    setRegisterForm({
      name: '',
      email: '',
      phone: '',
      password: '',
      address: '',
      accountType: 'consumer',
      vipCode: '',
      referredBy: ''
    });
    showToast(`Cuenta creada • Código de correo: ${code}`);
  };

  const handleVerifyEmail = (e) => {
    e.preventDefault();
    if (!currentUser) return;
    if (verifyCodeInput.trim() !== currentUser.verificationCode) {
      showToast('Código de verificación incorrecto', 'error');
      return;
    }

    const bonusPts = brandConfig.referralBonusPoints || 150;
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === currentUser.id) {
          return { ...u, emailVerified: true };
        }
        if (
          currentUser.referredByCode &&
          u.referralCode.toUpperCase() === currentUser.referredByCode.toUpperCase()
        ) {
          return {
            ...u,
            points: u.points + bonusPts,
            lifetimePoints: u.lifetimePoints + bonusPts
          };
        }
        return u;
      })
    );
    setVerifyCodeInput('');
    showToast(
      currentUser.referredByCode
        ? `Correo verificado • +${bonusPts} pts enviados a tu recomendador`
        : 'Correo electrónico verificado'
    );
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === loginForm.email.trim().toLowerCase() &&
        u.password === loginForm.password.trim()
    );
    if (!found) {
      showToast('Credenciales incorrectas', 'error');
      return;
    }
    setCurrentUserId(found.id);
    setAuthModalOpen(false);
    setLoginForm({ email: '', password: '' });
    showToast(`Hola de nuevo, ${found.name}`);
  };

  const handleLogout = () => {
    setCurrentUserId(null);
    setAppliedCoupon(null);
    showToast('Sesión cerrada');
  };

  // --- ASESORÍA TÉCNICA POR WHATSAPP (04141470773) ---
  const handleSendWhatsAppSupport = (e) => {
    e.preventDefault();
    if (!supportForm.vehicle.trim() || !supportForm.description.trim()) {
      showToast('Indica el vehículo y qué falla presenta', 'error');
      return;
    }
    const targetWa = normalizeWhatsAppNumber(brandConfig.techSupportWhatsapp);
    const lines = [
      `Hola equipo ${brandConfig.name}, necesito asesoría técnica:`,
      `• Cliente: ${currentUser ? currentUser.name : 'Visitante / No registrado'}`,
      `• Vehículo: ${supportForm.vehicle.trim()}`,
      `• Área: ${supportForm.issueType}`,
      `• Detalle: ${supportForm.description.trim()}`
    ];
    const url = `https://wa.me/${targetWa}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast('Abriendo WhatsApp de asesoría técnica...');
  };

  // --- SOLICITUD PATROCINANTE / ALIADO ---
  const openSponsorModal = (presetModality) => {
    if (presetModality) {
      setSponsorForm((prev) => ({ ...prev, modality: presetModality }));
    }
    setSponsorModalOpen(true);
  };

  const handleSponsorSubmit = (e) => {
    e.preventDefault();
    if (!sponsorForm.brandName.trim() || !sponsorForm.phone.trim()) {
      showToast('Completa el nombre de tu marca/tienda y teléfono', 'error');
      return;
    }
    const newAlly = {
      id: `ally-${Date.now()}`,
      brandName: sponsorForm.brandName.trim(),
      modality: sponsorForm.modality,
      category: sponsorForm.category,
      packagePlan: sponsorForm.packagePlan,
      contactName: sponsorForm.contactName.trim() || currentUser?.name || 'Representante',
      phone: sponsorForm.phone.trim(),
      email: sponsorForm.email.trim() || currentUser?.email || 'sin-correo@apex.com',
      notes: sponsorForm.notes.trim(),
      status: 'pending'
    };
    setAllies((prev) => [newAlly, ...prev]);
    setSponsorModalOpen(false);
    setSponsorForm({
      modality: 'Patrocinante (Paquetes Publicitarios)',
      packagePlan: SPONSOR_PACKAGES[0].name,
      brandName: '',
      category: 'Herramientas',
      contactName: '',
      phone: '',
      email: '',
      notes: ''
    });
    showToast('¡Solicitud enviada! El equipo Ápex la revisará pronto.');
  };

  // --- CARRITO ---
  const resolvedCart = useMemo(() => {
    return cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return product ? { product, quantity: item.quantity } : null;
      })
      .filter(Boolean);
  }, [cart, products]);

  const addToCart = (product) => {
    if (product.stock <= 0) {
      showToast('Producto sin stock', 'error');
      return;
    }
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          showToast('Stock máximo alcanzado', 'error');
          return prev;
        }
        return prev.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { productId: product.id, quantity: 1 }];
    });
    const pricing = getProductPricing(product);
    showToast(`Agregado • +${pricing.effectivePoints} pts`);
  };

  const updateCartQuantity = (productId, delta) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.productId !== productId) return item;
          const next = item.quantity + delta;
          if (next > product.stock) {
            showToast('Stock máximo alcanzado', 'error');
            return item;
          }
          return next > 0 ? { ...item, quantity: next } : null;
        })
        .filter(Boolean)
    );
  };

  const cartSummary = useMemo(() => {
    let rawSubtotal = 0;
    let roleDiscountTotal = 0;
    let subtotal = 0;
    let totalItems = 0;
    let basePoints = 0;

    resolvedCart.forEach(({ product, quantity }) => {
      const pricing = getProductPricing(product);
      rawSubtotal += pricing.originalPrice * quantity;
      roleDiscountTotal += pricing.savings * quantity;
      subtotal += pricing.finalPrice * quantity;
      totalItems += quantity;
      basePoints += pricing.effectivePoints * quantity;
    });

    const tierMultiplier = lifetimePoints >= 3000 ? 1.5 : lifetimePoints >= 1000 ? 1.2 : 1;
    const totalPoints = Math.round(basePoints * tierMultiplier);

    let couponDiscount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.type === 'discount') {
        couponDiscount = subtotal * (appliedCoupon.discountPercent / 100);
      } else if (appliedCoupon.type === 'discount_fixed' && subtotal >= 45) {
        couponDiscount = appliedCoupon.discountAmount;
      }
    }

    const freeThreshold = effectiveRole === 'dealer' ? 90 : 65;
    const deliveryFee =
      deliveryMethod === 'delivery' && subtotal > 0 && subtotal < freeThreshold ? 5.0 : 0;
    const total = Math.max(0, subtotal - couponDiscount + deliveryFee);

    return {
      rawSubtotal,
      roleDiscountTotal,
      subtotal,
      totalItems,
      totalPoints,
      couponDiscount,
      deliveryFee,
      freeThreshold,
      total
    };
  }, [resolvedCart, appliedCoupon, deliveryMethod, lifetimePoints, getProductPricing, effectiveRole]);

  const effectiveCheckoutAddress = currentUser ? currentUser.address : guestAddress;

  const handleCheckout = () => {
    if (resolvedCart.length === 0) return;
    if (!currentUser) {
      setAuthMode('register');
      setAuthModalOpen(true);
      showToast('Inicia sesión o regístrate para confirmar tu pedido', 'error');
      return;
    }
    if (deliveryMethod === 'delivery' && !effectiveCheckoutAddress.trim()) {
      showToast('Ingresa tu dirección de entrega', 'error');
      return;
    }

    setProducts((prev) =>
      prev.map((prod) => {
        const item = resolvedCart.find((c) => c.product.id === prod.id);
        return item ? { ...prod, stock: Math.max(0, prod.stock - item.quantity) } : prod;
      })
    );

    const earned = cartSummary.totalPoints;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === currentUser.id
          ? { ...u, points: u.points + earned, lifetimePoints: u.lifetimePoints + earned }
          : u
      )
    );

    const roleLabel =
      effectiveRole === 'dealer'
        ? 'Comercializador'
        : effectiveRole === 'ally'
        ? 'Aliado Ápex'
        : 'Consumidor Final';

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser.id,
      customerName: currentUser.name,
      roleLabel,
      itemsCount: cartSummary.totalItems,
      total: cartSummary.total,
      method: paymentMethod,
      address: deliveryMethod === 'delivery' ? effectiveCheckoutAddress : 'Retiro en Punto Ápex',
      status: 'Confirmado'
    };

    setOrdersHistory((prev) => [newOrder, ...prev]);
    if (appliedCoupon && cartSummary.couponDiscount > 0) {
      setRedeemedRewards((prev) => prev.filter((r) => r.instanceId !== appliedCoupon.instanceId));
      setAppliedCoupon(null);
    }

    setOrderSuccessModal({
      orderId: newOrder.id,
      total: cartSummary.total,
      pointsEarned: earned
    });
    setCart([]);
  };

  // --- PREMIOS ---
  const userCoupons = useMemo(
    () => (currentUser ? redeemedRewards.filter((r) => r.userId === currentUser.id) : []),
    [redeemedRewards, currentUser]
  );

  const handleRedeemReward = (reward) => {
    if (!currentUser) {
      setAuthMode('login');
      setAuthModalOpen(true);
      showToast('Inicia sesión para canjear premios', 'error');
      return;
    }
    if (currentUser.points < reward.cost) {
      showToast('Puntos insuficientes', 'error');
      return;
    }
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, points: u.points - reward.cost } : u))
    );
    setRedeemedRewards((prev) => [
      { ...reward, userId: currentUser.id, instanceId: `${reward.id}-${Date.now()}` },
      ...prev
    ]);
    showToast(`Canjeado: ${reward.title}`);
  };

  // --- QR Y GARANTÍA ---
  const handleManualQrVerify = (e) => {
    e.preventDefault();
    if (!manualQrInput.trim()) return;
    const found = products.find(
      (p) => p.qrSerial.toLowerCase() === manualQrInput.trim().toLowerCase()
    );
    if (found) {
      setSelectedQrProductId(found.id);
      setManualQrInput('');
      showToast(`✓ Autenticado: ${found.name}`);
    } else {
      showToast('Código QR no encontrado en base oficial', 'error');
    }
  };

  const handleActivateWarranty = (e) => {
    e.preventDefault();
    const holderName = currentUser ? currentUser.name : warrantyForm.customerName.trim();
    const holderContact = currentUser ? currentUser.phone : warrantyForm.contact.trim();
    if (!holderName || !holderContact) {
      showToast('Completa nombre y teléfono', 'error');
      return;
    }
    const newWar = {
      id: `GAR-${Math.floor(3000 + Math.random() * 6999)}`,
      userId: currentUser ? currentUser.id : 'guest',
      productName: activeQrProduct.name,
      qrSerial: activeQrProduct.qrSerial,
      customerName: holderName,
      vehicleInfo: warrantyForm.vehicleInfo.trim() || 'Vehículo particular',
      expiryMonths: effectiveRole === 'dealer' ? 18 : 12
    };
    setRegisteredWarranties((prev) => [newWar, ...prev]);
    if (currentUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === currentUser.id
            ? { ...u, points: u.points + 150, lifetimePoints: u.lifetimePoints + 150 }
            : u
        )
      );
    }
    setWarrantyForm({ customerName: '', contact: '', vehicleInfo: '' });
    showToast(
      currentUser
        ? `Garantía ${newWar.id} activada (+150 pts)`
        : `Garantía ${newWar.id} registrada`
    );
  };

  // --- COMPARADOR ---
  const toggleCompareProduct = (productId) => {
    setCompareIds((prev) => {
      if (prev.includes(productId)) return prev.filter((id) => id !== productId);
      if (prev.length >= 3) {
        showToast('Máximo 3 productos para comparar', 'error');
        return prev;
      }
      showToast('Añadido al comparador');
      return [...prev, productId];
    });
  };

  // --- SUBIDA DE IMÁGENES DESDE DISPOSITIVO ---
  const handleFileUpload = (e, onLoaded) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onLoaded(reader.result);
        showToast('Imagen cargada');
      }
    };
    reader.readAsDataURL(file);
  };

  // --- ADMIN: PRODUCTOS ---
  const openNewProductModal = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      category: 'Refrigerantes',
      spec: '',
      image: PRESET_PHOTOS[0].url,
      price: '',
      consumerPromoPercent: '10',
      dealerDiscountPercent: '25',
      stock: '',
      qrSerial: '',
      gradeOrMaterial: '',
      normOrCert: '',
      presentation: '',
      lifespan: '',
      idealFor: '',
      difference: '',
      usageProfile: 'diario'
    });
    setProductModalOpen(true);
  };

  const openEditProductModal = (prod) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name,
      category: prod.category,
      spec: prod.spec || '',
      image: prod.image || PRESET_PHOTOS[0].url,
      price: String(prod.price),
      consumerPromoPercent: String(prod.consumerPromoPercent || 0),
      dealerDiscountPercent: String(prod.dealerDiscountPercent || 25),
      stock: String(prod.stock),
      qrSerial: prod.qrSerial || '',
      gradeOrMaterial: prod.techSpecs?.gradeOrMaterial || '',
      normOrCert: prod.techSpecs?.normOrCert || '',
      presentation: prod.techSpecs?.presentation || '',
      lifespan: prod.techSpecs?.lifespan || '',
      idealFor: prod.recommendation?.idealFor || '',
      difference: prod.recommendation?.difference || '',
      usageProfile: (prod.usageProfiles && prod.usageProfiles[0]) || 'diario'
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name.trim() || !productForm.price || !productForm.stock) {
      showToast('Completa nombre, precio y stock', 'error');
      return;
    }
    const priceNum = parseFloat(productForm.price);
    const stockNum = parseInt(productForm.stock, 10);
    const consumerPromo = Math.max(0, Math.min(80, parseInt(productForm.consumerPromoPercent || '0', 10)));
    const dealerDisc = Math.max(0, Math.min(80, parseInt(productForm.dealerDiscountPercent || '25', 10)));
    const pts = Math.round(priceNum * brandConfig.pointsPerDollar);

    if (editingProductId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProductId
            ? {
                ...p,
                name: productForm.name.trim(),
                category: productForm.category,
                spec: productForm.spec.trim() || p.spec,
                image: productForm.image,
                price: priceNum,
                consumerPromoPercent: consumerPromo,
                dealerDiscountPercent: dealerDisc,
                stock: stockNum,
                points: pts,
                qrSerial: productForm.qrSerial.trim() || p.qrSerial,
                usageProfiles: [productForm.usageProfile],
                techSpecs: {
                  gradeOrMaterial: productForm.gradeOrMaterial.trim() || p.techSpecs?.gradeOrMaterial,
                  normOrCert: productForm.normOrCert.trim() || p.techSpecs?.normOrCert,
                  presentation: productForm.presentation.trim() || p.techSpecs?.presentation,
                  lifespan: productForm.lifespan.trim() || p.techSpecs?.lifespan,
                  oemSku: p.techSpecs?.oemSku || `APX-${Date.now().toString().slice(-4)}`
                },
                recommendation: {
                  idealFor: productForm.idealFor.trim() || p.recommendation?.idealFor,
                  tip: p.recommendation?.tip || 'Verifica compatibilidad antes de aplicar.',
                  difference: productForm.difference.trim() || p.recommendation?.difference
                }
              }
            : p
        )
      );
      showToast('Producto actualizado');
    } else {
      const code = Math.floor(1000 + Math.random() * 8999);
      setProducts((prev) => [
        {
          id: `prod-${Date.now()}`,
          name: productForm.name.trim(),
          category: productForm.category,
          spec: productForm.spec.trim() || 'Fórmula Original Ápex • QR Verificado',
          image: productForm.image,
          price: priceNum,
          consumerPromoPercent: consumerPromo,
          dealerDiscountPercent: dealerDisc,
          stock: stockNum,
          points: pts,
          qrSerial: productForm.qrSerial.trim() || `APX-PRD-${code}`,
          usageProfiles: [productForm.usageProfile],
          techSpecs: {
            gradeOrMaterial: productForm.gradeOrMaterial.trim() || 'Formulación Original Ápex',
            normOrCert: productForm.normOrCert.trim() || 'Norma Internacional OEM',
            presentation: productForm.presentation.trim() || 'Envase sellado de fábrica',
            lifespan: productForm.lifespan.trim() || 'Alto rendimiento garantizado',
            oemSku: `APX-${code}`
          },
          recommendation: {
            idealFor: productForm.idealFor.trim() || 'Mantenimiento preventivo y uso exigente.',
            tip: 'Escanea el código QR del envase para registrar garantía.',
            difference: productForm.difference.trim() || 'Protección superior certificada por Ápex.'
          }
        },
        ...prev
      ]);
      showToast('Producto publicado en tienda');
    }
    setProductModalOpen(false);
  };

  // --- ADMIN: ANUNCIOS Y LANZAMIENTOS ---
  const handleCreateAd = (e) => {
    e.preventDefault();
    if (!newAdForm.advertiser.trim() || !newAdForm.title.trim()) {
      showToast('Completa marca anunciante y título', 'error');
      return;
    }
    setAds((prev) => [
      {
        id: `ad-${Date.now()}`,
        ...newAdForm,
        advertiser: newAdForm.advertiser.trim(),
        title: newAdForm.title.trim(),
        description: newAdForm.description.trim() || 'Patrocinador oficial del ecosistema Ápex.',
        launchNote: newAdForm.isLaunch
          ? newAdForm.launchNote.trim() || `Lanzamiento oficial de ${newAdForm.advertiser.trim()}`
          : '',
        active: true
      },
      ...prev
    ]);
    setDismissedBannerId(null);
    setNewAdForm({
      advertiser: '',
      tag: 'Patrocinado • Ecosistema Ápex',
      title: '',
      description: '',
      image: PRESET_PHOTOS[4].url,
      ctaText: 'Conocer Más',
      targetSection: 'allies',
      isLaunch: false,
      launchNote: ''
    });
    showToast('Anuncio / lanzamiento publicado en toda la app');
  };

  // --- ADMIN: EVENTOS & VÁLIDAS ---
  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEventForm.title.trim() || !newEventForm.date.trim()) {
      showToast('Completa título y fecha del evento', 'error');
      return;
    }
    setEvents((prev) => [
      {
        id: `evt-${Date.now()}`,
        title: newEventForm.title.trim(),
        date: newEventForm.date.trim(),
        location: newEventForm.location.trim() || 'Sede por confirmar',
        category: newEventForm.category,
        status: newEventForm.status,
        sponsors: newEventForm.sponsorsText
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        description:
          newEventForm.description.trim() || 'Evento oficial de la comunidad motor Ápex.'
      },
      ...prev
    ]);
    setNewEventForm({
      title: '',
      date: '',
      location: '',
      category: 'Tuning Show',
      status: 'PRÓXIMO EVENTO',
      sponsorsText: 'Ápex Lubricantes',
      description: ''
    });
    showToast('Evento agregado a cartelera');
  };

  // --- ADMIN: INCLUIR ALIADO DIRECTO ---
  const handleAddAllyDirect = (e) => {
    e.preventDefault();
    if (!newAllyForm.brandName.trim() || !newAllyForm.phone.trim()) {
      showToast('Completa nombre de marca y teléfono', 'error');
      return;
    }
    setAllies((prev) => [
      {
        id: `ally-${Date.now()}`,
        brandName: newAllyForm.brandName.trim(),
        modality: 'Aliado Comercial',
        category: newAllyForm.category,
        packagePlan: newAllyForm.packagePlan,
        contactName: newAllyForm.contactName.trim() || 'Representante Comercial',
        phone: newAllyForm.phone.trim(),
        email: newAllyForm.email.trim() || 'aliado@apex.com',
        notes: newAllyForm.notes.trim() || 'Aliado verificado del ecosistema Ápex.',
        status: 'approved'
      },
      ...prev
    ]);
    setNewAllyForm({
      brandName: '',
      category: 'Herramientas',
      packagePlan: SPONSOR_PACKAGES[2].name,
      contactName: '',
      phone: '',
      email: '',
      notes: ''
    });
    showToast('Aliado incluido en el directorio');
  };

  // --- ADMIN: INCLUIR RECOMPENSA ---
  const handleAddReward = (e) => {
    e.preventDefault();
    if (!newRewardForm.title.trim() || !newRewardForm.cost) {
      showToast('Completa título y costo en puntos', 'error');
      return;
    }
    setRewardsCatalog((prev) => [
      {
        id: `rew-${Date.now()}`,
        title: newRewardForm.title.trim(),
        description:
          newRewardForm.description.trim() || 'Beneficio canjeable con tus puntos Ápex.',
        cost: Math.max(50, parseInt(newRewardForm.cost, 10) || 300),
        type: newRewardForm.type,
        discountPercent: parseInt(newRewardForm.discountPercent || '10', 10),
        discountAmount: parseInt(newRewardForm.discountAmount || '10', 10),
        code: (newRewardForm.code.trim() || 'APEXPREMIO').toUpperCase(),
        active: true
      },
      ...prev
    ]);
    setNewRewardForm({
      title: '',
      description: '',
      cost: '400',
      type: 'discount',
      discountPercent: '15',
      discountAmount: '10',
      code: 'APEXVIP'
    });
    showToast('Recompensa agregada');
  };

  // --- RENDERIZADO DE FOTO CON FALLBACK AUTOMÁTICO ---
  const renderPhoto = (id, src, alt, className = 'w-full h-44') => {
    const valid = src && !failedImages[id];
    if (valid) {
      return (
        <img
          src={src}
          alt={alt}
          onError={() => setFailedImages((prev) => ({ ...prev, [id]: true }))}
          className={`${className} object-cover`}
        />
      );
    }
    return (
      <div
        className={`${className} bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950 flex flex-col items-center justify-center gap-1.5`}
      >
        <Droplets className="w-8 h-8 text-orange-500/80" />
        <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase">
          {brandConfig.name}
        </span>
      </div>
    );
  };

  const getUserInitials = (name) =>
    (name || 'U')
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  const pendingAlliesCount = allies.filter((a) => a.status === 'pending').length;
  const pendingDealersCount = users.filter(
    (u) => u.role === 'dealer' && u.dealerStatus === 'pending'
  ).length;
  const totalAdminBadges = pendingAlliesCount + pendingDealersCount;

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 flex flex-col items-center justify-center p-0 sm:p-6 font-sans selection:bg-orange-500 selection:text-white">
      <div className="w-full sm:w-[412px] h-screen sm:h-[836px] bg-[#0A0A0C] sm:rounded-[2.75rem] sm:border sm:border-zinc-800/90 shadow-2xl flex flex-col overflow-hidden relative">
        {/* =========================================================
            1. ENCABEZADO COMPACTO
        ========================================================= */}
        <header className="px-5 pt-4 pb-2.5 bg-[#0A0A0C]/95 backdrop-blur-md flex items-center justify-between gap-3 shrink-0 z-20">
          <div className="flex items-center gap-2.5 min-w-0">
            {brandConfig.logoUrl ? (
              <img
                src={brandConfig.logoUrl}
                alt={brandConfig.name}
                className="w-8 h-8 rounded-xl object-cover border border-zinc-800 shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
                <Droplets className="w-4 h-4 text-white" />
              </div>
            )}
            <span className="font-black tracking-tight text-base text-white truncate">
              {brandConfig.name}
            </span>
          </div>

          <div className="shrink-0">
            {currentUser ? (
              <button
                onClick={() => setActiveTab('profile')}
                className="bg-[#141418] hover:bg-zinc-800 border border-zinc-800 rounded-full pl-3 pr-1.5 py-1 flex items-center gap-2 transition"
              >
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-[11px] font-extrabold text-white">
                    {currentUser.points.toLocaleString()}
                  </span>
                </div>
                <span
                  className={`w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center ${
                    isApprovedDealer
                      ? 'bg-emerald-500 text-zinc-950'
                      : 'bg-orange-500 text-white'
                  }`}
                >
                  {getUserInitials(currentUser.name)}
                </span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setAuthMode('register');
                  setAuthModalOpen(true);
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-3.5 py-1.5 text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-orange-500/20 transition"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Entrar</span>
              </button>
            )}
          </div>
        </header>

        {/* =========================================================
            2. BANNER MINIATURA GLOBAL + AVISO DE LANZAMIENTOS
        ========================================================= */}
        {(currentMiniBanner || activeLaunches.length > 0) && (
          <div className="px-5 pb-2 space-y-1.5 shrink-0 z-20">
            {activeLaunches.length > 0 && (
              <button
                onClick={() => {
                  setActiveTab('more');
                  setMoreView(activeLaunches[0].targetSection || 'events');
                }}
                className="w-full bg-amber-500/15 border border-amber-400/35 rounded-xl px-3 py-1.5 flex items-center justify-between gap-2 text-left"
              >
                <span className="text-[10px] font-extrabold text-amber-300 flex items-center gap-1.5 truncate">
                  <Rocket className="w-3 h-3 shrink-0" />
                  <span className="truncate">
                    {activeLaunches[0].launchNote ||
                      `Lanzamiento de ${activeLaunches[0].advertiser}: ${activeLaunches[0].title}`}
                  </span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              </button>
            )}

            {currentMiniBanner && (
              <div className="bg-[#141418] border border-zinc-800/90 rounded-2xl p-1.5 pr-2.5 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setActiveTab('more');
                    setMoreView(currentMiniBanner.targetSection || 'allies');
                  }}
                  className="flex items-center gap-2.5 min-w-0 flex-1 text-left"
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-zinc-950 shrink-0">
                    {renderPhoto(
                      `mini-${currentMiniBanner.id}`,
                      currentMiniBanner.image,
                      currentMiniBanner.title,
                      'w-10 h-10'
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-extrabold text-orange-400 uppercase block truncate">
                      {currentMiniBanner.advertiser}
                    </span>
                    <p className="text-[11px] font-bold text-white truncate">
                      {currentMiniBanner.title}
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setDismissedBannerId(currentMiniBanner.id)}
                  className="p-1 text-zinc-500 hover:text-zinc-300 shrink-0"
                  title="Ocultar anuncio"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- TOAST NOTIFICACIÓN --- */}
        {toast && (
          <div className="absolute top-20 left-5 right-5 z-50 pointer-events-none flex justify-center">
            <div
              className={`px-4 py-2 rounded-full shadow-xl border text-xs font-semibold flex items-center gap-2 ${
                toast.type === 'error'
                  ? 'bg-red-950/95 border-red-800 text-red-200'
                  : 'bg-[#141418]/95 border-zinc-700 text-white'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  toast.type === 'error' ? 'bg-red-400' : 'bg-orange-500'
                }`}
              />
              <span>{toast.message}</span>
            </div>
          </div>
        )}

        {/* =========================================================
            CONTENIDO PRINCIPAL
        ========================================================= */}
        <main className="flex-1 overflow-y-auto px-5 pt-2 pb-28 space-y-6">
          {/* =========================================================
              PESTAÑA 1: TIENDA
          ========================================================= */}
          {activeTab === 'store' && (
            <>
              <div className="space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar refrigerantes, lubricantes..."
                      className="w-full bg-[#141418] border border-zinc-800/90 focus:border-orange-500/60 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition"
                    />
                  </div>

                  {compareIds.length > 0 && (
                    <button
                      onClick={() => setShowCompareModal(true)}
                      className="px-3 py-2.5 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-extrabold flex items-center gap-1 shrink-0"
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>{compareIds.length}</span>
                    </button>
                  )}

                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-2.5 rounded-2xl border transition shrink-0 ${
                      showFilters || selectedUsage !== 'all'
                        ? 'bg-[#141418] border-orange-500 text-orange-400'
                        : 'bg-[#141418] border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                    title="Filtrar por uso"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {showFilters && (
                  <div className="bg-[#141418] border border-zinc-800 rounded-2xl p-4 space-y-2.5">
                    <span className="text-[11px] font-bold text-zinc-400 block">
                      Filtrar por tipo de uso
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {USAGE_PROFILES.map((u) => (
                        <button
                          key={u.id}
                          onClick={() => setSelectedUsage(u.id)}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition ${
                            selectedUsage === u.id
                              ? 'bg-orange-500 text-white'
                              : 'bg-[#0A0A0C] text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          {u.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                        selectedCategory === cat
                          ? 'bg-white text-zinc-950'
                          : 'bg-[#141418] text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-14 space-y-2">
                    <Package className="w-9 h-9 text-zinc-700 mx-auto" />
                    <p className="text-xs text-zinc-400">No encontramos productos con ese filtro.</p>
                  </div>
                ) : (
                  filteredProducts.map((product, index) => {
                    const pricing = getProductPricing(product);
                    const adToShow =
                      index === 2 && activeAds.length > 0 ? activeAds[0] : null;

                    return (
                      <React.Fragment key={product.id}>
                        <article
                          onClick={() => setDetailProduct(product)}
                          className="bg-[#141418] border border-zinc-800/80 hover:border-zinc-700 rounded-3xl overflow-hidden cursor-pointer transition group"
                        >
                          <div className="relative h-44 bg-zinc-950 overflow-hidden">
                            {renderPhoto(
                              product.id,
                              product.image,
                              product.name,
                              'w-full h-44 group-hover:scale-105 transition duration-500'
                            )}
                            {pricing.discountPercent > 0 && (
                              <span
                                className={`absolute top-3.5 left-3.5 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm ${
                                  effectiveRole === 'dealer'
                                    ? 'bg-emerald-500 text-zinc-950'
                                    : effectiveRole === 'ally'
                                    ? 'bg-cyan-400 text-zinc-950'
                                    : 'bg-orange-500 text-white'
                                }`}
                              >
                                -{pricing.discountPercent}%{' '}
                                {effectiveRole === 'dealer'
                                  ? 'Distribuidor'
                                  : effectiveRole === 'ally'
                                  ? 'Aliado'
                                  : 'Promo'}
                              </span>
                            )}
                          </div>

                          <div className="p-5 space-y-4">
                            <div>
                              <h3 className="text-sm font-bold text-white leading-snug">
                                {product.name}
                              </h3>
                              <p className="text-[11px] text-zinc-500 mt-1">
                                Toca para ver ficha técnica y recomendaciones
                              </p>
                            </div>

                            <div className="flex items-center justify-between gap-3 pt-1">
                              <div className="flex items-baseline gap-2">
                                <span className="text-xl font-black text-white">
                                  ${pricing.finalPrice.toFixed(2)}
                                </span>
                                {pricing.discountPercent > 0 && (
                                  <span className="text-xs line-through text-zinc-500">
                                    ${pricing.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(product);
                                }}
                                disabled={product.stock === 0}
                                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition active:scale-95 ${
                                  product.stock === 0
                                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                    : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20'
                                }`}
                              >
                                <Plus className="w-3.5 h-3.5" />
                                {product.stock === 0 ? 'Agotado' : 'Agregar'}
                              </button>
                            </div>
                          </div>
                        </article>

                        {adToShow && (
                          <div className="bg-[#141418] border border-orange-500/25 rounded-3xl overflow-hidden">
                            <div className="relative h-32 bg-zinc-950">
                              {renderPhoto(adToShow.id, adToShow.image, adToShow.title, 'w-full h-32')}
                              <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-zinc-700 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full">
                                {adToShow.tag}
                              </span>
                            </div>
                            <div className="p-4 flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                                  {adToShow.advertiser}
                                </span>
                                <h4 className="text-xs font-bold text-white truncate mt-0.5">
                                  {adToShow.title}
                                </h4>
                                <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                                  {adToShow.description}
                                </p>
                              </div>
                              <button
                                onClick={() => {
                                  setActiveTab('more');
                                  setMoreView(adToShow.targetSection || 'allies');
                                }}
                                className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold shrink-0"
                              >
                                {adToShow.ctaText}
                              </button>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })
                )}

                <div className="bg-gradient-to-br from-[#141418] to-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-orange-400">
                    <Handshake className="w-4 h-4" />
                    <span className="text-[11px] font-extrabold uppercase tracking-wider">
                      Ecosistema Motor {brandConfig.name}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-white">
                    ¿Vendes herramientas, tienes tienda o quieres patrocinar válidas?
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Únete como aliado comercial o contrata paquetes publicitarios y lanzamientos dentro de nuestra comunidad.
                  </p>
                  <button
                    onClick={() => openSponsorModal('Patrocinante (Paquetes Publicitarios)')}
                    className="w-full py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs transition"
                  >
                    Quiero ser Patrocinante / Aliado
                  </button>
                </div>
              </div>
            </>
          )}

          {/* =========================================================
              PESTAÑA 2: PEDIDO / CARRITO
          ========================================================= */}
          {activeTab === 'cart' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-white">Tu Pedido</h2>
                  <span className="text-[11px] text-zinc-400">
                    Tarifa activa:{' '}
                    <strong className="text-orange-400">
                      {effectiveRole === 'dealer'
                        ? 'Comercializador / Distribuidor'
                        : effectiveRole === 'ally'
                        ? 'Aliado Ecosistema'
                        : 'Consumidor Final'}
                    </strong>
                  </span>
                </div>
                <span className="text-xs text-zinc-400">{cartSummary.totalItems} art.</span>
              </div>

              {resolvedCart.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <ShoppingBag className="w-11 h-11 text-zinc-700 mx-auto" />
                  <p className="text-xs text-zinc-400">Tu bolsa de pedidos está vacía.</p>
                  <button
                    onClick={() => setActiveTab('store')}
                    className="px-5 py-2.5 rounded-2xl bg-white text-zinc-950 text-xs font-extrabold"
                  >
                    Ir a la Tienda
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {resolvedCart.map(({ product, quantity }) => {
                      const pricing = getProductPricing(product);
                      return (
                        <div
                          key={product.id}
                          className="bg-[#141418] border border-zinc-800/80 rounded-2xl p-4 flex items-center justify-between gap-3"
                        >
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-white truncate">
                              {product.name}
                            </h4>
                            <span className="text-sm font-black text-orange-400 mt-1 block">
                              ${(pricing.finalPrice * quantity).toFixed(2)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 bg-[#0A0A0C] border border-zinc-800 rounded-xl p-1">
                            <button
                              onClick={() => updateCartQuantity(product.id, -1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-300 hover:bg-zinc-900"
                            >
                              {quantity === 1 ? (
                                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                              ) : (
                                <Minus className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(product.id, 1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-300 hover:bg-zinc-900"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {userCoupons.filter((r) => r.type.startsWith('discount')).length > 0 && (
                    <div className="bg-[#141418] border border-zinc-800 rounded-2xl p-4 space-y-2.5">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <Ticket className="w-3.5 h-3.5" /> Cupones Canjeados
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {userCoupons
                          .filter((r) => r.type.startsWith('discount'))
                          .map((coupon) => {
                            const active = appliedCoupon?.instanceId === coupon.instanceId;
                            return (
                              <button
                                key={coupon.instanceId}
                                onClick={() => setAppliedCoupon(active ? null : coupon)}
                                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition ${
                                  active
                                    ? 'bg-amber-500 text-zinc-950'
                                    : 'bg-[#0A0A0C] text-zinc-300 border border-zinc-800'
                                }`}
                              >
                                {active ? `✓ ${coupon.code}` : coupon.code}
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  )}

                  <div className="bg-[#141418] border border-zinc-800/80 rounded-2xl p-4 space-y-3.5">
                    <span className="text-xs font-bold text-zinc-300 block">Modalidad de Entrega</span>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => setDeliveryMethod('delivery')}
                        className={`p-3 rounded-xl border text-left transition ${
                          deliveryMethod === 'delivery'
                            ? 'bg-[#0A0A0C] border-orange-500 text-white'
                            : 'bg-[#0A0A0C]/50 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        <Truck className="w-4 h-4 text-orange-400 mb-1" />
                        <div className="text-xs font-bold">A Domicilio</div>
                      </button>
                      <button
                        onClick={() => setDeliveryMethod('pickup')}
                        className={`p-3 rounded-xl border text-left transition ${
                          deliveryMethod === 'pickup'
                            ? 'bg-[#0A0A0C] border-orange-500 text-white'
                            : 'bg-[#0A0A0C]/50 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        <MapPin className="w-4 h-4 text-orange-400 mb-1" />
                        <div className="text-xs font-bold">Punto Ápex</div>
                      </button>
                    </div>

                    {deliveryMethod === 'delivery' && (
                      <input
                        type="text"
                        value={effectiveCheckoutAddress}
                        onChange={(e) => {
                          if (currentUser) {
                            setUsers((prev) =>
                              prev.map((u) =>
                                u.id === currentUser.id ? { ...u, address: e.target.value } : u
                              )
                            );
                          } else {
                            setGuestAddress(e.target.value);
                          }
                        }}
                        placeholder="Dirección de entrega en casa o taller..."
                        className="w-full bg-[#0A0A0C] border border-zinc-800 focus:border-zinc-600 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                      />
                    )}
                  </div>

                  <div className="bg-[#141418] border border-zinc-800/80 rounded-2xl p-4 space-y-3">
                    <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-orange-400" /> Método de Pago
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {['Pago Móvil', 'Zelle', 'Efectivo USD', 'Transferencia'].map((m) => (
                        <button
                          key={m}
                          onClick={() => setPaymentMethod(m)}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                            paymentMethod === m
                              ? 'bg-[#0A0A0C] border-orange-500 text-white'
                              : 'bg-[#0A0A0C]/40 border-zinc-800 text-zinc-400'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-5 space-y-3">
                    {cartSummary.roleDiscountTotal > 0 && (
                      <div className="flex justify-between text-xs text-emerald-400">
                        <span>Ahorro por tarifa activa</span>
                        <span>-${cartSummary.roleDiscountTotal.toFixed(2)}</span>
                      </div>
                    )}
                    {cartSummary.couponDiscount > 0 && (
                      <div className="flex justify-between text-xs text-amber-400">
                        <span>Descuento de cupón</span>
                        <span>-${cartSummary.couponDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Envío (Gratis desde ${cartSummary.freeThreshold})</span>
                      <span>
                        {cartSummary.deliveryFee === 0
                          ? 'Gratis'
                          : `$${cartSummary.deliveryFee.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-zinc-800 flex justify-between items-baseline">
                      <span className="text-sm font-bold text-white">Total a Pagar</span>
                      <span className="text-2xl font-black text-white">
                        ${cartSummary.total.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-[11px] text-amber-400 font-semibold">
                      {currentUser
                        ? `Sumarás +${cartSummary.totalPoints} puntos en tu cuenta`
                        : `Inicia sesión para ganar +${cartSummary.totalPoints} puntos`}
                    </p>

                    <button
                      onClick={handleCheckout}
                      className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm shadow-lg shadow-orange-500/20 active:scale-95 transition"
                    >
                      {currentUser ? 'Confirmar Pedido' : 'Crear Cuenta y Pedir'}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* =========================================================
              PESTAÑA 3: PREMIOS Y FIDELIZACIÓN + REFERIDOS
          ========================================================= */}
          {activeTab === 'rewards' && (
            <div className="space-y-6">
              {!currentUser ? (
                <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-6 text-center space-y-4">
                  <Award className="w-10 h-10 text-amber-400 mx-auto" />
                  <div>
                    <h2 className="text-base font-black text-white">
                      Club de Puntos {brandConfig.name}
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                      Acumula puntos con cada compra, garantía o recomendado y canjéalos por cupones o premios.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setAuthMode('register');
                      setAuthModalOpen(true);
                    }}
                    className="w-full py-3 rounded-2xl bg-orange-500 text-white font-extrabold text-xs"
                  >
                    Crear Cuenta (+200 pts regalo)
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-5 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] text-zinc-400 block">Nivel Actual</span>
                        <h2 className="text-lg font-black text-white mt-0.5">{userTier.name}</h2>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-zinc-400 block">Disponibles</span>
                        <span className="text-2xl font-black text-amber-400">
                          {currentUser.points.toLocaleString()}{' '}
                          <span className="text-xs font-bold">pts</span>
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="w-full h-2 bg-[#0A0A0C] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full transition-all duration-500"
                          style={{ width: `${userTier.progress}%` }}
                        />
                      </div>
                      {userTier.next && (
                        <span className="text-[11px] text-zinc-500 block text-right">
                          Siguiente nivel: {userTier.next}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tarjeta de Puntos por Recomendación */}
                  <div className="bg-[#141418] border border-amber-500/25 rounded-3xl p-4 flex items-center justify-between gap-3">
                    <div className="min-w-0 space-y-0.5">
                      <span className="text-[10px] font-extrabold text-amber-400 uppercase flex items-center gap-1">
                        <Users className="w-3 h-3" /> Recomienda y Gana +{brandConfig.referralBonusPoints} pts
                      </span>
                      <p className="text-xs font-mono font-bold text-white truncate">
                        Código: {currentUser.referralCode}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(currentUser.referralCode);
                        showToast('Código de referido copiado');
                      }}
                      className="px-3 py-2 rounded-xl bg-[#0A0A0C] border border-zinc-700 text-xs font-bold text-white flex items-center gap-1 shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5 text-orange-400" /> Copiar
                    </button>
                  </div>
                </>
              )}

              {userCoupons.length > 0 && (
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold text-zinc-400">Tus Cupones Activos</h3>
                  {userCoupons.map((item) => (
                    <div
                      key={item.instanceId}
                      className="bg-[#141418] border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{item.title}</div>
                        <div className="text-[11px] font-mono text-emerald-400 mt-0.5">
                          {item.code}
                        </div>
                      </div>
                      {item.type.startsWith('discount') && (
                        <button
                          onClick={() => {
                            setAppliedCoupon(item);
                            setActiveTab('cart');
                            showToast('Cupón aplicado al pedido');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-extrabold"
                        >
                          Usar
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-zinc-400">Recompensas Disponibles</h3>
                {rewardsCatalog
                  .filter((r) => r.active !== false)
                  .map((reward) => {
                    const canAfford = currentUser && currentUser.points >= reward.cost;
                    return (
                      <div
                        key={reward.id}
                        className="bg-[#141418] border border-zinc-800/80 rounded-2xl p-4 flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <span className="text-[11px] font-extrabold text-amber-400">
                            {reward.cost} pts
                          </span>
                          <h4 className="text-sm font-bold text-white">{reward.title}</h4>
                          <p className="text-xs text-zinc-400 leading-relaxed">
                            {reward.description}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRedeemReward(reward)}
                          className={`px-4 py-2 rounded-xl text-xs font-extrabold shrink-0 transition ${
                            canAfford
                              ? 'bg-white text-zinc-950 hover:bg-zinc-200'
                              : 'bg-[#0A0A0C] text-zinc-500 border border-zinc-800'
                          }`}
                        >
                          Canjear
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* =========================================================
              PESTAÑA 4: PERFIL, VERIFICACIÓN DE CORREO Y REFERIDOS
          ========================================================= */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {!currentUser ? (
                <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-6 space-y-5">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center mx-auto">
                      <User className="w-6 h-6 text-orange-400" />
                    </div>
                    <h2 className="text-base font-black text-white">Tu Cuenta {brandConfig.name}</h2>
                    <p className="text-xs text-zinc-400">
                      Crea tu cuenta con verificación de correo y código de referido para sumar puntos.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => {
                        setAuthMode('register');
                        setAuthModalOpen(true);
                      }}
                      className="py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5"
                    >
                      <UserPlus className="w-4 h-4" /> Crear Cuenta
                    </button>
                    <button
                      onClick={() => {
                        setAuthMode('login');
                        setAuthModalOpen(true);
                      }}
                      className="py-3 rounded-2xl bg-[#0A0A0C] border border-zinc-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5"
                    >
                      <LogIn className="w-4 h-4" /> Iniciar Sesión
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Verificación de Correo Pendiente */}
                  {!currentUser.emailVerified && (
                    <form
                      onSubmit={handleVerifyEmail}
                      className="bg-amber-500/10 border border-amber-400/40 rounded-3xl p-4 space-y-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-amber-300 flex items-center gap-1.5">
                          <Mail className="w-4 h-4" /> Verifica tu correo ({currentUser.email})
                        </span>
                        <span className="font-mono text-[11px] bg-black/40 px-2 py-0.5 rounded-lg text-amber-200">
                          Código: {currentUser.verificationCode}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={verifyCodeInput}
                          onChange={(e) => setVerifyCodeInput(e.target.value)}
                          placeholder="Ingresa el código de 6 dígitos"
                          className="flex-1 bg-[#0A0A0C] border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-amber-400 text-zinc-950 font-extrabold"
                        >
                          Verificar
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Tarjeta Principal de Perfil */}
                  <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-5 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-12 h-12 rounded-2xl font-black text-base flex items-center justify-center shrink-0 ${
                            isApprovedDealer
                              ? 'bg-emerald-500 text-zinc-950'
                              : 'bg-orange-500 text-white'
                          }`}
                        >
                          {getUserInitials(currentUser.name)}
                        </div>
                        <div className="min-w-0">
                          <h2 className="text-base font-black text-white truncate">
                            {currentUser.name}
                          </h2>
                          <p className="text-xs text-zinc-400 truncate">{currentUser.email}</p>
                        </div>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="p-2.5 rounded-xl bg-[#0A0A0C] border border-zinc-800 text-zinc-400 hover:text-red-400 transition"
                        title="Cerrar sesión"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {isApprovedDealer ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5" /> Comercializador Verificado (-22% a -28%)
                        </span>
                      ) : currentUser.dealerStatus === 'pending' ? (
                        <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[11px] font-bold">
                          Solicitud Comercializador en Revisión
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-[11px] font-bold flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" /> Consumidor Final • {userTier.name}
                        </span>
                      )}

                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          currentUser.emailVerified
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {currentUser.emailVerified ? 'Correo Verificado' : 'Correo sin verificar'}
                      </span>
                    </div>

                    {/* Código de referido */}
                    <div className="bg-[#0A0A0C] border border-zinc-800 rounded-2xl p-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-zinc-400 block">
                          Tu código de recomendación (+{brandConfig.referralBonusPoints} pts)
                        </span>
                        <span className="font-mono font-bold text-amber-400">
                          {currentUser.referralCode}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(currentUser.referralCode);
                          showToast('Código copiado');
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-zinc-800 text-white text-[11px] font-bold"
                      >
                        Copiar
                      </button>
                    </div>

                    {/* Dirección editable */}
                    <div className="pt-3 border-t border-zinc-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-orange-400" /> Dirección de entrega
                        </span>
                        <button
                          onClick={() => {
                            if (editingAddress) {
                              setUsers((prev) =>
                                prev.map((u) =>
                                  u.id === currentUser.id
                                    ? { ...u, address: addressDraft.trim() || u.address }
                                    : u
                                )
                              );
                              setEditingAddress(false);
                              showToast('Dirección guardada');
                            } else {
                              setAddressDraft(currentUser.address);
                              setEditingAddress(true);
                            }
                          }}
                          className="text-[11px] font-bold text-orange-400"
                        >
                          {editingAddress ? 'Guardar' : 'Editar'}
                        </button>
                      </div>

                      {editingAddress ? (
                        <input
                          type="text"
                          value={addressDraft}
                          onChange={(e) => setAddressDraft(e.target.value)}
                          className="w-full bg-[#0A0A0C] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                        />
                      ) : (
                        <p className="text-xs text-zinc-200">{currentUser.address}</p>
                      )}
                    </div>
                  </div>

                  {/* Historial de Pedidos */}
                  <div className="space-y-2.5">
                    <h3 className="text-xs font-bold text-zinc-400">Mis Pedidos</h3>
                    {ordersHistory.filter((o) => o.userId === currentUser.id).length === 0 ? (
                      <p className="text-xs text-zinc-500 bg-[#141418] border border-zinc-800/70 rounded-2xl p-4">
                        Aún no has realizado pedidos con esta cuenta.
                      </p>
                    ) : (
                      ordersHistory
                        .filter((o) => o.userId === currentUser.id)
                        .map((ord) => (
                          <div
                            key={ord.id}
                            className="bg-[#141418] border border-zinc-800 rounded-2xl p-4 flex items-center justify-between"
                          >
                            <div>
                              <span className="text-xs font-mono font-bold text-white">
                                {ord.id}
                              </span>
                              <p className="text-[11px] text-zinc-400 mt-0.5">
                                {ord.itemsCount} art. • {ord.method}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-black text-emerald-400 block">
                                ${ord.total.toFixed(2)}
                              </span>
                              <span className="text-[10px] text-zinc-500">{ord.status}</span>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </>
              )}

              <div className="bg-[#141418] border border-orange-500/30 rounded-3xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-orange-400" />
                  <h3 className="text-xs font-black text-white uppercase tracking-wider">
                    Membresía Comercial y Publicidad
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Postula tu marca, tienda de herramientas o lanzamiento dentro de {brandConfig.name}.
                </p>
                <button
                  onClick={() => openSponsorModal('Patrocinante (Paquetes Publicitarios)')}
                  className="w-full py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs transition"
                >
                  Quiero ser Patrocinante / Aliado
                </button>
              </div>
            </div>
          )}

          {/* =========================================================
              PESTAÑA 5: MÁS (HUB + ASESORÍA WHATSAPP + EVENTOS + ALIADOS + QR + ADMIN)
          ========================================================= */}
          {activeTab === 'more' && (
            <div className="space-y-5">
              {moreView !== 'hub' && (
                <button
                  onClick={() => setMoreView('hub')}
                  className="text-xs font-bold text-orange-400 flex items-center gap-1"
                >
                  ← Volver a Ecosistema {brandConfig.name}
                </button>
              )}

              {moreView === 'hub' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-black text-white">Ecosistema {brandConfig.name}</h2>

                  <button
                    onClick={() => openSponsorModal('Patrocinante (Paquetes Publicitarios)')}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-3xl p-5 text-left flex items-center justify-between shadow-lg shadow-orange-500/15 transition active:scale-[0.99]"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full">
                        Alianzas & Lanzamientos
                      </span>
                      <h3 className="text-base font-black">Quiero ser Patrocinante / Aliado</h3>
                      <p className="text-xs text-orange-50/90">
                        Publicidad en toda la app, lanzamientos y válidas
                      </p>
                    </div>
                    <Handshake className="w-7 h-7 shrink-0" />
                  </button>

                  <div className="space-y-3">
                    <button
                      onClick={() => setMoreView('support')}
                      className="w-full bg-[#141418] hover:bg-zinc-900 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between text-left transition"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                          <MessageCircle className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            Asesoría Técnica (WhatsApp)
                          </h4>
                          <p className="text-[11px] text-emerald-400 font-semibold">
                            Atención directa • {brandConfig.techSupportWhatsapp}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-500" />
                    </button>

                    <button
                      onClick={() => setMoreView('events')}
                      className="w-full bg-[#141418] hover:bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between text-left transition"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center shrink-0">
                          <Trophy className="w-5 h-5 text-rose-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            Eventos, Tuning Shows y Válidas
                          </h4>
                          <p className="text-[11px] text-zinc-400">
                            Transmisiones en vivo y cartelera motor
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-500" />
                    </button>

                    <button
                      onClick={() => setMoreView('allies')}
                      className="w-full bg-[#141418] hover:bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between text-left transition"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                          <Wrench className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            Aliados y Patrocinadores
                          </h4>
                          <p className="text-[11px] text-zinc-400">
                            Tiendas de herramientas y marcas verificadas
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-500" />
                    </button>

                    <button
                      onClick={() => setMoreView('qr')}
                      className="w-full bg-[#141418] hover:bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between text-left transition"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                          <QrCode className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            QR Autenticidad, Garantía y App
                          </h4>
                          <p className="text-[11px] text-zinc-400">
                            Valida tu envase Ápex y descarga en tiendas
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-500" />
                    </button>

                    <button
                      onClick={() => setMoreView('admin')}
                      className="w-full bg-[#141418] hover:bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between text-left transition"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shrink-0">
                          <Lock className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">Panel de Administración</h4>
                            {totalAdminBadges > 0 && (
                              <span className="px-2 py-0.5 rounded-full bg-orange-500 text-white text-[10px] font-black">
                                {totalAdminBadges}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-400">
                            Incluir, editar, pausar y eliminar en toda la app
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-500" />
                    </button>
                  </div>
                </div>
              )}

              {/* --- SUBVISTA ASESORÍA TÉCNICA POR WHATSAPP --- */}
              {moreView === 'support' && (
                <form
                  onSubmit={handleSendWhatsAppSupport}
                  className="bg-[#141418] border border-zinc-800 rounded-3xl p-5 space-y-4 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="text-base font-black text-white">Asesoría Técnica</h2>
                      <p className="text-[11px] text-emerald-400 font-semibold">
                        WhatsApp directo: {brandConfig.techSupportWhatsapp}
                      </p>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl p-3 flex items-start gap-2 text-[11px] text-amber-200">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      Si el motor presenta recalentamiento severo o pérdida de aceite, detén el vehículo en un lugar seguro antes de abrir el capó.
                    </span>
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">
                      Vehículo, modelo y año *
                    </label>
                    <input
                      type="text"
                      required
                      value={supportForm.vehicle}
                      onChange={(e) => setSupportForm({ ...supportForm, vehicle: e.target.value })}
                      placeholder="Ej: Chevrolet Silverado 1998 5.7L"
                      className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Tipo de consulta</label>
                    <select
                      value={supportForm.issueType}
                      onChange={(e) => setSupportForm({ ...supportForm, issueType: e.target.value })}
                      className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none"
                    >
                      <option>Temperatura / Refrigerante</option>
                      <option>Lubricación / Aceite / Ruidos</option>
                      <option>Encendido / Batería / Sensores</option>
                      <option>Frenos / Tren Delantero / Grasas</option>
                      <option>Limpieza / Inyectores / Mantenimiento</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">
                      Describe la falla o síntoma *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={supportForm.description}
                      onChange={(e) =>
                        setSupportForm({ ...supportForm, description: e.target.value })
                      }
                      placeholder="Explica qué ocurre, cuándo pasa y qué has revisado..."
                      className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-extrabold text-xs flex items-center justify-center gap-2 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enviar Reporte a WhatsApp ({brandConfig.techSupportWhatsapp})
                  </button>
                </form>
              )}

              {/* --- SUBVISTA EVENTOS, TUNING SHOWS Y VÁLIDAS --- */}
              {moreView === 'events' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-black text-white">Eventos y Válidas</h2>
                    <button
                      onClick={() => openSponsorModal('Patrocinio de Eventos y Válidas')}
                      className="px-3 py-1.5 rounded-full bg-orange-500 text-white text-[11px] font-extrabold"
                    >
                      + Patrocinar
                    </button>
                  </div>

                  <div className="space-y-4">
                    {events.map((evt) => (
                      <div
                        key={evt.id}
                        className="bg-[#141418] border border-zinc-800 rounded-3xl p-5 space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 flex items-center gap-1">
                            <Radio className="w-3 h-3" /> {evt.status}
                          </span>
                          <span className="text-[11px] text-zinc-400">{evt.category}</span>
                        </div>

                        <h3 className="text-sm font-black text-white">{evt.title}</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">{evt.description}</p>

                        <div className="flex items-center justify-between text-[11px] text-zinc-300 pt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-orange-400" /> {evt.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-orange-400" /> {evt.location}
                          </span>
                        </div>

                        {evt.sponsors && evt.sponsors.length > 0 && (
                          <div className="pt-2 border-t border-zinc-800 flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] text-zinc-500">Patrocinan:</span>
                            {evt.sponsors.map((sp, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#0A0A0C] text-amber-300 border border-zinc-800"
                              >
                                {sp}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- SUBVISTA DIRECTORIO DE ALIADOS Y PATROCINADORES --- */}
              {moreView === 'allies' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-black text-white">Aliados y Patrocinadores</h2>
                    <button
                      onClick={() => openSponsorModal('Aliado Comercial (Vendedor de Herramientas / Tienda)')}
                      className="px-3 py-1.5 rounded-full bg-orange-500 text-white text-[11px] font-extrabold"
                    >
                      Unirme
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    {allies
                      .filter((a) => a.status === 'approved')
                      .map((ally) => (
                        <div
                          key={ally.id}
                          className="bg-[#141418] border border-zinc-800 rounded-3xl p-5 space-y-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300">
                              {ally.category}
                            </span>
                            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                              <Star className="w-3 h-3 fill-emerald-400" /> Aliado Oficial
                            </span>
                          </div>
                          <h3 className="text-sm font-black text-white">{ally.brandName}</h3>
                          <p className="text-xs text-zinc-400 leading-relaxed">{ally.notes}</p>
                          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-300">
                            <span>{ally.contactName}</span>
                            <span className="font-mono text-orange-400">{ally.phone}</span>
                          </div>
                        </div>
                      ))}
                  </div>

                  <button
                    onClick={() => openSponsorModal('Patrocinante (Paquetes Publicitarios)')}
                    className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs"
                  >
                    Quiero ser Patrocinante / Aliado
                  </button>
                </div>
              )}

              {/* --- SUBVISTA QR AUTENTICIDAD, GARANTÍA Y DESCARGA APP --- */}
              {moreView === 'qr' && (
                <div className="space-y-5">
                  <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-emerald-400">
                          Sello de Autenticidad
                        </span>
                        <h3 className="text-base font-black text-white">Verificar Envase Ápex</h3>
                      </div>
                      <FileCheck2 className="w-5 h-5 text-emerald-400" />
                    </div>

                    <form onSubmit={handleManualQrVerify} className="flex gap-2">
                      <input
                        type="text"
                        value={manualQrInput}
                        onChange={(e) => setManualQrInput(e.target.value)}
                        placeholder="Ej: APX-REF-5050-8841"
                        className="flex-1 bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-extrabold text-xs"
                      >
                        Validar
                      </button>
                    </form>

                    <select
                      value={selectedQrProductId}
                      onChange={(e) => setSelectedQrProductId(e.target.value)}
                      className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>

                    <div className="bg-[#0A0A0C] border border-zinc-800 rounded-2xl p-4 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-white p-1.5 shrink-0">
                        <svg
                          viewBox="0 0 64 64"
                          className="w-full h-full text-zinc-950"
                          fill="currentColor"
                        >
                          <rect x="4" y="4" width="18" height="18" rx="3" />
                          <rect x="8" y="8" width="10" height="10" fill="white" />
                          <rect x="11" y="11" width="4" height="4" />
                          <rect x="42" y="4" width="18" height="18" rx="3" />
                          <rect x="46" y="8" width="10" height="10" fill="white" />
                          <rect x="49" y="11" width="4" height="4" />
                          <rect x="4" y="42" width="18" height="18" rx="3" />
                          <rect x="8" y="46" width="10" height="10" fill="white" />
                          <rect x="11" y="49" width="4" height="4" />
                          <rect x="28" y="8" width="8" height="8" />
                          <rect x="20" y="28" width="10" height="10" />
                          <rect x="38" y="28" width="10" height="8" />
                          <rect x="28" y="44" width="8" height="12" />
                          <rect x="44" y="44" width="12" height="12" />
                        </svg>
                      </div>
                      <div className="min-w-0 space-y-1">
                        <span className="text-[10px] font-extrabold text-emerald-400 uppercase">
                          ✓ Producto Original Certificado
                        </span>
                        <p className="text-xs font-mono text-white truncate">
                          {activeQrProduct.qrSerial}
                        </p>
                        <p className="text-[11px] text-zinc-500">{activeQrProduct.category}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => setStoreModal('playstore')}
                        className="bg-[#0A0A0C] hover:bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex items-center justify-between transition"
                      >
                        <span className="text-xs font-bold text-white">Google Play</span>
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                      </button>
                      <button
                        onClick={() => setStoreModal('appstore')}
                        className="bg-[#0A0A0C] hover:bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex items-center justify-between transition"
                      >
                        <span className="text-xs font-bold text-white">App Store</span>
                        <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
                      </button>
                    </div>
                  </div>

                  <form
                    onSubmit={handleActivateWarranty}
                    className="bg-[#141418] border border-zinc-800 rounded-3xl p-5 space-y-3.5"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-white">Activar Garantía</h3>
                      <span className="text-[11px] font-bold text-amber-400">+150 pts</span>
                    </div>

                    {currentUser ? (
                      <div className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-300">
                        Titular: <strong className="text-white">{currentUser.name}</strong>
                      </div>
                    ) : (
                      <>
                        <input
                          type="text"
                          required
                          value={warrantyForm.customerName}
                          onChange={(e) =>
                            setWarrantyForm({ ...warrantyForm, customerName: e.target.value })
                          }
                          placeholder="Nombre o taller *"
                          className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                        />
                        <input
                          type="text"
                          required
                          value={warrantyForm.contact}
                          onChange={(e) =>
                            setWarrantyForm({ ...warrantyForm, contact: e.target.value })
                          }
                          placeholder="Teléfono o WhatsApp *"
                          className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                        />
                      </>
                    )}

                    <input
                      type="text"
                      value={warrantyForm.vehicleInfo}
                      onChange={(e) =>
                        setWarrantyForm({ ...warrantyForm, vehicleInfo: e.target.value })
                      }
                      placeholder="Vehículo y año (Ej: Toyota Hilux 2021)"
                      className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                    />

                    <button
                      type="submit"
                      className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-extrabold text-xs transition"
                    >
                      Registrar Garantía ({effectiveRole === 'dealer' ? '18 meses' : '12 meses'})
                    </button>
                  </form>
                </div>
              )}

              {/* --- SUBVISTA PANEL DE ADMINISTRACIÓN (SIN BOTÓN NI PISTA DE PIN) --- */}
              {moreView === 'admin' && (
                <>
                  {!isAdminUnlocked ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const now = Date.now();
                        if (now < lockUntil) {
                          const seg = Math.ceil((lockUntil - now) / 1000);
                          showToast(`Bloqueado temporalmente (${seg}s)`, 'error');
                          return;
                        }
                        if (pinInput.trim() === brandConfig.adminPin) {
                          setIsAdminUnlocked(true);
                          setPinInput('');
                          setFailedPinAttempts(0);
                          showToast('Panel Admin desbloqueado');
                        } else {
                          const nextFails = failedPinAttempts + 1;
                          setFailedPinAttempts(nextFails);
                          setPinInput('');
                          if (nextFails >= 3) {
                            setLockUntil(Date.now() + 30000);
                            setFailedPinAttempts(0);
                            showToast('3 intentos fallidos • Espera 30s', 'error');
                          } else {
                            showToast('Clave de administrador incorrecta', 'error');
                          }
                        }
                      }}
                      className="bg-[#141418] border border-zinc-800 rounded-3xl p-6 text-center space-y-4"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-[#0A0A0C] border border-zinc-800 flex items-center justify-center mx-auto">
                        <Lock className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white">Panel Administrador</h3>
                        <p className="text-xs text-zinc-400 mt-1">
                          Ingresa tu clave maestra para incluir, editar o excluir elementos.
                        </p>
                      </div>
                      <input
                        type="password"
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        placeholder="Clave de acceso"
                        className="w-48 mx-auto block text-center tracking-widest text-sm font-bold bg-[#0A0A0C] border border-zinc-800 rounded-2xl py-2.5 px-3 text-white outline-none"
                      />
                      <button
                        type="submit"
                        className="w-full py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs transition"
                      >
                        Entrar
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-5">
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                          {[
                            { id: 'products', label: 'Productos' },
                            { id: 'ads', label: 'Anuncios/Lanz.' },
                            {
                              id: 'allies',
                              label: `Aliados${pendingAlliesCount > 0 ? ` (${pendingAlliesCount})` : ''}`
                            },
                            { id: 'events', label: 'Eventos' },
                            { id: 'rewards', label: 'Premios' },
                            {
                              id: 'users',
                              label: `Usuarios${pendingDealersCount > 0 ? ` (${pendingDealersCount})` : ''}`
                            },
                            { id: 'brand', label: 'WhatsApp/Marca' }
                          ].map((t) => (
                            <button
                              key={t.id}
                              onClick={() => setAdminTab(t.id)}
                              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition ${
                                adminTab === t.id
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-[#141418] text-zinc-400'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => setIsAdminUnlocked(false)}
                          className="p-2 rounded-xl bg-[#141418] text-zinc-400 hover:text-white shrink-0"
                          title="Bloquear"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      </div>

                      {/* ADMIN 1: PRODUCTOS (INCLUIR, EDITAR, ELIMINAR) */}
                      {adminTab === 'products' && (
                        <div className="space-y-4">
                          <button
                            onClick={openNewProductModal}
                            className="w-full py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5"
                          >
                            <Plus className="w-4 h-4" /> Incluir Producto Ápex
                          </button>

                          <div className="space-y-3">
                            {products.map((prod) => (
                              <div
                                key={prod.id}
                                className="bg-[#141418] border border-zinc-800 rounded-2xl p-3.5 flex items-center justify-between gap-2"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-950 shrink-0">
                                    {renderPhoto(prod.id, prod.image, prod.name, 'w-12 h-12')}
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="text-xs font-bold text-white truncate">
                                      {prod.name}
                                    </h4>
                                    <p className="text-[11px] text-zinc-400 mt-0.5">
                                      ${prod.price.toFixed(2)} • Stock: {prod.stock}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button
                                    onClick={() => openEditProductModal(prod)}
                                    className="px-2.5 py-1.5 rounded-xl bg-[#0A0A0C] border border-zinc-700 text-xs font-bold text-white flex items-center gap-1"
                                  >
                                    <Edit3 className="w-3 h-3 text-orange-400" /> Editar
                                  </button>
                                  <button
                                    onClick={() => {
                                      setProducts((prev) => prev.filter((p) => p.id !== prod.id));
                                      showToast('Producto excluido del catálogo');
                                    }}
                                    className="p-2 rounded-xl bg-[#0A0A0C] border border-zinc-800 text-red-400"
                                    title="Eliminar producto"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ADMIN 2: ANUNCIOS Y LANZAMIENTOS (INCLUIR, PAUSAR, ELIMINAR) */}
                      {adminTab === 'ads' && (
                        <div className="space-y-5">
                          <form
                            onSubmit={handleCreateAd}
                            className="bg-[#141418] border border-zinc-800 rounded-3xl p-4 space-y-3 text-xs"
                          >
                            <h4 className="font-extrabold text-white flex items-center gap-1.5">
                              <Megaphone className="w-4 h-4 text-orange-400" /> Incluir Publicidad o Lanzamiento
                            </h4>
                            <input
                              type="text"
                              required
                              value={newAdForm.advertiser}
                              onChange={(e) =>
                                setNewAdForm({ ...newAdForm, advertiser: e.target.value })
                              }
                              placeholder="Marca o anunciante *"
                              className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                            />
                            <input
                              type="text"
                              required
                              value={newAdForm.title}
                              onChange={(e) =>
                                setNewAdForm({ ...newAdForm, title: e.target.value })
                              }
                              placeholder="Título del anuncio o lanzamiento *"
                              className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                            />
                            <input
                              type="text"
                              value={newAdForm.description}
                              onChange={(e) =>
                                setNewAdForm({ ...newAdForm, description: e.target.value })
                              }
                              placeholder="Descripción corta"
                              className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                            />

                            <label className="flex items-center gap-2 bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={newAdForm.isLaunch}
                                onChange={(e) =>
                                  setNewAdForm({ ...newAdForm, isLaunch: e.target.checked })
                                }
                              />
                              <span className="text-amber-300 font-bold flex items-center gap-1">
                                <Rocket className="w-3.5 h-3.5" /> Marcar como Lanzamiento de Anunciante
                              </span>
                            </label>

                            {newAdForm.isLaunch && (
                              <input
                                type="text"
                                value={newAdForm.launchNote}
                                onChange={(e) =>
                                  setNewAdForm({ ...newAdForm, launchNote: e.target.value })
                                }
                                placeholder="Aviso de lanzamiento (Ej: Preventa este viernes)"
                                className="w-full bg-[#0A0A0C] border border-amber-500/40 rounded-xl px-3 py-2 text-white outline-none"
                              />
                            )}

                            <div className="flex gap-2">
                              <label className="flex-1 py-2 px-3 rounded-xl bg-[#0A0A0C] border border-dashed border-zinc-700 text-zinc-300 flex items-center justify-center gap-1.5 cursor-pointer">
                                <Upload className="w-3.5 h-3.5 text-orange-400" />
                                Subir arte diseñado
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleFileUpload(e, (url) =>
                                      setNewAdForm((prev) => ({ ...prev, image: url }))
                                    )
                                  }
                                  className="hidden"
                                />
                              </label>
                              <select
                                value={newAdForm.targetSection}
                                onChange={(e) =>
                                  setNewAdForm({ ...newAdForm, targetSection: e.target.value })
                                }
                                className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                              >
                                <option value="allies">Ir a Aliados</option>
                                <option value="events">Ir a Eventos</option>
                              </select>
                            </div>
                            <button
                              type="submit"
                              className="w-full py-2.5 rounded-xl bg-orange-500 text-white font-extrabold"
                            >
                              Publicar en Toda la App
                            </button>
                          </form>

                          <div className="space-y-2.5">
                            {ads.map((ad) => (
                              <div
                                key={ad.id}
                                className="bg-[#141418] border border-zinc-800 rounded-2xl p-3.5 flex items-center justify-between gap-2"
                              >
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-bold text-orange-400 truncate">
                                      {ad.advertiser}
                                    </span>
                                    {ad.isLaunch && (
                                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                                        LANZAMIENTO
                                      </span>
                                    )}
                                  </div>
                                  <h5 className="text-xs font-bold text-white truncate">
                                    {ad.title}
                                  </h5>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button
                                    onClick={() =>
                                      setAds((prev) =>
                                        prev.map((a) =>
                                          a.id === ad.id ? { ...a, active: !a.active } : a
                                        )
                                      )
                                    }
                                    className={`p-2 rounded-xl border ${
                                      ad.active
                                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                                        : 'bg-[#0A0A0C] border-zinc-800 text-zinc-500'
                                    }`}
                                    title={ad.active ? 'Pausar' : 'Activar'}
                                  >
                                    {ad.active ? (
                                      <Eye className="w-3.5 h-3.5" />
                                    ) : (
                                      <EyeOff className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => {
                                      setAds((prev) => prev.filter((a) => a.id !== ad.id));
                                      showToast('Anuncio excluido');
                                    }}
                                    className="p-2 rounded-xl bg-[#0A0A0C] border border-zinc-800 text-red-400"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ADMIN 3: ALIADOS (INCLUIR DIRECTO, APROBAR, EXCLUIR) */}
                      {adminTab === 'allies' && (
                        <div className="space-y-4">
                          <form
                            onSubmit={handleAddAllyDirect}
                            className="bg-[#141418] border border-zinc-800 rounded-3xl p-4 space-y-2.5 text-xs"
                          >
                            <h4 className="font-extrabold text-white">Incluir Aliado Directo</h4>
                            <input
                              type="text"
                              required
                              value={newAllyForm.brandName}
                              onChange={(e) =>
                                setNewAllyForm({ ...newAllyForm, brandName: e.target.value })
                              }
                              placeholder="Nombre de tienda o aliado *"
                              className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={newAllyForm.category}
                                onChange={(e) =>
                                  setNewAllyForm({ ...newAllyForm, category: e.target.value })
                                }
                                placeholder="Rubro (Ej: Herramientas)"
                                className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                              />
                              <input
                                type="text"
                                required
                                value={newAllyForm.phone}
                                onChange={(e) =>
                                  setNewAllyForm({ ...newAllyForm, phone: e.target.value })
                                }
                                placeholder="Teléfono *"
                                className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                              />
                            </div>
                            <input
                              type="text"
                              value={newAllyForm.notes}
                              onChange={(e) =>
                                setNewAllyForm({ ...newAllyForm, notes: e.target.value })
                              }
                              placeholder="Descripción o beneficio para miembros"
                              className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                            />
                            <button
                              type="submit"
                              className="w-full py-2.5 rounded-xl bg-orange-500 text-white font-extrabold"
                            >
                              + Incluir Aliado
                            </button>
                          </form>

                          <div className="space-y-3">
                            {allies.map((ally) => (
                              <div
                                key={ally.id}
                                className="bg-[#141418] border border-zinc-800 rounded-2xl p-4 space-y-2.5"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <h4 className="text-xs font-bold text-white">{ally.brandName}</h4>
                                    <p className="text-[11px] text-orange-400">{ally.packagePlan}</p>
                                    <p className="text-[11px] text-zinc-400 mt-0.5">
                                      {ally.contactName} • {ally.phone}
                                    </p>
                                  </div>
                                  <span
                                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                      ally.status === 'approved'
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'bg-amber-500/20 text-amber-400'
                                    }`}
                                  >
                                    {ally.status === 'approved' ? 'Activo' : 'Pendiente'}
                                  </span>
                                </div>

                                <div className="flex gap-2">
                                  {ally.status !== 'approved' && (
                                    <button
                                      onClick={() => {
                                        setAllies((prev) =>
                                          prev.map((a) =>
                                            a.id === ally.id ? { ...a, status: 'approved' } : a
                                          )
                                        );
                                        showToast('Aliado aprobado y publicado');
                                      }}
                                      className="flex-1 py-1.5 rounded-xl bg-emerald-500 text-zinc-950 text-[11px] font-extrabold"
                                    >
                                      Aprobar Aliado
                                    </button>
                                  )}
                                  <button
                                    onClick={() => {
                                      setAllies((prev) => prev.filter((a) => a.id !== ally.id));
                                      showToast('Aliado excluido');
                                    }}
                                    className="px-3 py-1.5 rounded-xl bg-[#0A0A0C] border border-zinc-800 text-[11px] text-red-400 font-bold"
                                  >
                                    Excluir
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ADMIN 4: EVENTOS Y VÁLIDAS (INCLUIR Y ELIMINAR) */}
                      {adminTab === 'events' && (
                        <div className="space-y-4">
                          <form
                            onSubmit={handleCreateEvent}
                            className="bg-[#141418] border border-zinc-800 rounded-3xl p-4 space-y-3 text-xs"
                          >
                            <h4 className="font-extrabold text-white">Incluir Evento / Válida</h4>
                            <input
                              type="text"
                              required
                              value={newEventForm.title}
                              onChange={(e) =>
                                setNewEventForm({ ...newEventForm, title: e.target.value })
                              }
                              placeholder="Nombre del Tuning Show o Válida *"
                              className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                required
                                value={newEventForm.date}
                                onChange={(e) =>
                                  setNewEventForm({ ...newEventForm, date: e.target.value })
                                }
                                placeholder="Fecha y hora *"
                                className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                              />
                              <input
                                type="text"
                                value={newEventForm.location}
                                onChange={(e) =>
                                  setNewEventForm({ ...newEventForm, location: e.target.value })
                                }
                                placeholder="Lugar / Pista"
                                className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                              />
                            </div>
                            <input
                              type="text"
                              value={newEventForm.sponsorsText}
                              onChange={(e) =>
                                setNewEventForm({ ...newEventForm, sponsorsText: e.target.value })
                              }
                              placeholder="Patrocinantes (separados por coma)"
                              className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                            />
                            <button
                              type="submit"
                              className="w-full py-2.5 rounded-xl bg-orange-500 text-white font-extrabold"
                            >
                              + Agregar a Cartelera
                            </button>
                          </form>

                          <div className="space-y-2.5">
                            {events.map((ev) => (
                              <div
                                key={ev.id}
                                className="bg-[#141418] border border-zinc-800 rounded-2xl p-3.5 flex items-center justify-between gap-2"
                              >
                                <div className="min-w-0">
                                  <h5 className="text-xs font-bold text-white truncate">
                                    {ev.title}
                                  </h5>
                                  <p className="text-[11px] text-zinc-400">{ev.date}</p>
                                </div>
                                <button
                                  onClick={() => {
                                    setEvents((prev) => prev.filter((item) => item.id !== ev.id));
                                    showToast('Evento excluido');
                                  }}
                                  className="p-2 rounded-xl bg-[#0A0A0C] text-red-400"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ADMIN 5: PREMIOS Y RECOMPENSAS (INCLUIR Y ELIMINAR) */}
                      {adminTab === 'rewards' && (
                        <div className="space-y-4">
                          <form
                            onSubmit={handleAddReward}
                            className="bg-[#141418] border border-zinc-800 rounded-3xl p-4 space-y-2.5 text-xs"
                          >
                            <h4 className="font-extrabold text-white flex items-center gap-1.5">
                              <Gift className="w-4 h-4 text-amber-400" /> Incluir Recompensa
                            </h4>
                            <input
                              type="text"
                              required
                              value={newRewardForm.title}
                              onChange={(e) =>
                                setNewRewardForm({ ...newRewardForm, title: e.target.value })
                              }
                              placeholder="Nombre del premio o cupón *"
                              className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                            />
                            <input
                              type="text"
                              value={newRewardForm.description}
                              onChange={(e) =>
                                setNewRewardForm({ ...newRewardForm, description: e.target.value })
                              }
                              placeholder="Condición o detalle"
                              className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="number"
                                required
                                value={newRewardForm.cost}
                                onChange={(e) =>
                                  setNewRewardForm({ ...newRewardForm, cost: e.target.value })
                                }
                                placeholder="Costo en pts *"
                                className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                              />
                              <select
                                value={newRewardForm.type}
                                onChange={(e) =>
                                  setNewRewardForm({ ...newRewardForm, type: e.target.value })
                                }
                                className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                              >
                                <option value="discount">Cupón % OFF</option>
                                <option value="discount_fixed">Bono $ Fijo</option>
                                <option value="gift">Regalo / Insumo</option>
                              </select>
                            </div>
                            <button
                              type="submit"
                              className="w-full py-2.5 rounded-xl bg-amber-400 text-zinc-950 font-extrabold"
                            >
                              + Guardar Recompensa
                            </button>
                          </form>

                          <div className="space-y-2.5">
                            {rewardsCatalog.map((rew) => (
                              <div
                                key={rew.id}
                                className="bg-[#141418] border border-zinc-800 rounded-2xl p-3.5 flex items-center justify-between gap-2"
                              >
                                <div className="min-w-0">
                                  <span className="text-[10px] font-bold text-amber-400">
                                    {rew.cost} pts
                                  </span>
                                  <h5 className="text-xs font-bold text-white truncate">
                                    {rew.title}
                                  </h5>
                                </div>
                                <button
                                  onClick={() => {
                                    setRewardsCatalog((prev) =>
                                      prev.filter((r) => r.id !== rew.id)
                                    );
                                    showToast('Recompensa excluida');
                                  }}
                                  className="p-2 rounded-xl bg-[#0A0A0C] text-red-400"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ADMIN 6: USUARIOS Y ROLES */}
                      {adminTab === 'users' && (
                        <div className="space-y-3">
                          {users.map((u) => {
                            const isDealer = u.role === 'dealer' && u.dealerStatus === 'approved';
                            const isPending = u.role === 'dealer' && u.dealerStatus === 'pending';
                            return (
                              <div
                                key={u.id}
                                className="bg-[#141418] border border-zinc-800 rounded-2xl p-4 space-y-2.5"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="text-xs font-bold text-white">{u.name}</h4>
                                    <p className="text-[11px] text-zinc-400">
                                      {u.email} • {u.points} pts
                                    </p>
                                  </div>
                                  <span
                                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                      isDealer
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : isPending
                                        ? 'bg-amber-500/20 text-amber-400'
                                        : 'bg-zinc-800 text-zinc-300'
                                    }`}
                                  >
                                    {isDealer
                                      ? 'Comercializador'
                                      : isPending
                                      ? 'Pendiente'
                                      : 'Consumidor'}
                                  </span>
                                </div>
                                <button
                                  onClick={() => {
                                    setUsers((prev) =>
                                      prev.map((item) => {
                                        if (item.id !== u.id) return item;
                                        const makeDealer = !isDealer;
                                        return {
                                          ...item,
                                          role: makeDealer ? 'dealer' : 'consumer',
                                          dealerStatus: makeDealer ? 'approved' : 'none'
                                        };
                                      })
                                    );
                                    showToast('Rol actualizado');
                                  }}
                                  className="w-full py-1.5 rounded-xl bg-[#0A0A0C] border border-zinc-700 text-[11px] font-bold text-zinc-200"
                                >
                                  {isDealer
                                    ? 'Cambiar a Consumidor Final'
                                    : 'Activar Tarifa Comercializador'}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* ADMIN 7: WHATSAPP TÉCNICO, MARCA Y SEGURIDAD */}
                      {adminTab === 'brand' && (
                        <div className="space-y-4">
                          <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-5 space-y-3.5 text-xs">
                            <div>
                              <label className="text-[11px] text-emerald-400 font-bold block mb-1">
                                WhatsApp de Asesoría Técnica
                              </label>
                              <input
                                type="text"
                                value={brandConfig.techSupportWhatsapp}
                                onChange={(e) =>
                                  setBrandConfig({
                                    ...brandConfig,
                                    techSupportWhatsapp: e.target.value
                                  })
                                }
                                className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white font-mono outline-none"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] text-zinc-400 block mb-1">
                                Nombre de la App / Empresa
                              </label>
                              <input
                                type="text"
                                value={brandConfig.name}
                                onChange={(e) =>
                                  setBrandConfig({ ...brandConfig, name: e.target.value })
                                }
                                className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] text-zinc-400 block mb-1">
                                Logo de la Marca
                              </label>
                              <label className="w-full py-2.5 px-3 rounded-xl bg-[#0A0A0C] border border-dashed border-zinc-700 text-zinc-300 flex items-center justify-center gap-2 cursor-pointer">
                                <Upload className="w-4 h-4 text-orange-400" />
                                Subir logo propio
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleFileUpload(e, (url) =>
                                      setBrandConfig((prev) => ({ ...prev, logoUrl: url }))
                                    )
                                  }
                                  className="hidden"
                                />
                              </label>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <label className="text-[10px] text-zinc-400 block mb-1">
                                  Clave Admin
                                </label>
                                <input
                                  type="text"
                                  value={brandConfig.adminPin}
                                  onChange={(e) =>
                                    setBrandConfig({ ...brandConfig, adminPin: e.target.value })
                                  }
                                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-2.5 py-2 text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-zinc-400 block mb-1">
                                  Pts por $1
                                </label>
                                <input
                                  type="number"
                                  value={brandConfig.pointsPerDollar}
                                  onChange={(e) =>
                                    setBrandConfig({
                                      ...brandConfig,
                                      pointsPerDollar: parseInt(e.target.value || '5', 10)
                                    })
                                  }
                                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-2.5 py-2 text-white outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-zinc-400 block mb-1">
                                  Bono Referido
                                </label>
                                <input
                                  type="number"
                                  value={brandConfig.referralBonusPoints}
                                  onChange={(e) =>
                                    setBrandConfig({
                                      ...brandConfig,
                                      referralBonusPoints: parseInt(e.target.value || '150', 10)
                                    })
                                  }
                                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-2.5 py-2 text-white outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </main>

        {/* =========================================================
            BARRA DE NAVEGACIÓN INFERIOR FIJA (5 PESTAÑAS LIMPIAS)
        ========================================================= */}
        <nav className="bg-[#0A0A0C]/95 backdrop-blur-md border-t border-zinc-800/80 px-2 py-3 flex items-center justify-around shrink-0 z-20">
          <button
            onClick={() => setActiveTab('store')}
            className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl transition ${
              activeTab === 'store' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Compass className={`w-5 h-5 ${activeTab === 'store' ? 'text-orange-500' : ''}`} />
            <span className="text-[10px] font-bold">Tienda</span>
          </button>

          <button
            onClick={() => setActiveTab('cart')}
            className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl relative transition ${
              activeTab === 'cart' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <div className="relative">
              <ShoppingBag
                className={`w-5 h-5 ${activeTab === 'cart' ? 'text-orange-500' : ''}`}
              />
              {cartSummary.totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartSummary.totalItems}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold">Pedido</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl transition ${
              activeTab === 'rewards' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Award className={`w-5 h-5 ${activeTab === 'rewards' ? 'text-amber-400' : ''}`} />
            <span className="text-[10px] font-bold">Premios</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl relative transition ${
              activeTab === 'profile' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <div className="relative">
              <User className={`w-5 h-5 ${activeTab === 'profile' ? 'text-orange-500' : ''}`} />
              {!currentUser && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-orange-500" />
              )}
            </div>
            <span className="text-[10px] font-bold">Perfil</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('more');
              setMoreView('hub');
            }}
            className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl relative transition ${
              activeTab === 'more' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <div className="relative">
              <Grid className={`w-5 h-5 ${activeTab === 'more' ? 'text-orange-500' : ''}`} />
              {totalAdminBadges > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400" />
              )}
            </div>
            <span className="text-[10px] font-bold">Más</span>
          </button>
        </nav>

        {/* =========================================================
            MODALES CONTEXTUALES
        ========================================================= */}

        {/* MODAL: QUIERO SER PATROCINANTE / ALIADO */}
        {sponsorModalOpen && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col justify-end">
            <div className="bg-[#141418] border-t border-zinc-800 rounded-t-3xl max-h-[92%] flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 shrink-0">
                <span className="text-xs font-black text-white flex items-center gap-1.5">
                  <Handshake className="w-4 h-4 text-orange-400" /> Quiero ser Patrocinante / Aliado
                </span>
                <button
                  onClick={() => setSponsorModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSponsorSubmit} className="overflow-y-auto p-5 space-y-3.5 text-xs">
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1.5">Modalidad</label>
                  <select
                    value={sponsorForm.modality}
                    onChange={(e) => setSponsorForm({ ...sponsorForm, modality: e.target.value })}
                    className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none"
                  >
                    <option>Patrocinante (Paquetes Publicitarios)</option>
                    <option>Aliado Comercial (Vendedor de Herramientas / Tienda)</option>
                    <option>Patrocinio de Eventos y Válidas</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1.5">
                    Paquete Publicitario / Plan
                  </label>
                  <div className="space-y-2">
                    {SPONSOR_PACKAGES.map((pkg) => (
                      <button
                        type="button"
                        key={pkg.id}
                        onClick={() => setSponsorForm({ ...sponsorForm, packagePlan: pkg.name })}
                        className={`w-full p-3 rounded-2xl border text-left transition ${
                          sponsorForm.packagePlan === pkg.name
                            ? 'bg-[#0A0A0C] border-orange-500 text-white'
                            : 'bg-[#0A0A0C]/50 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        <div className="flex justify-between font-bold">
                          <span>{pkg.name}</span>
                          <span className="text-orange-400">{pkg.price}</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{pkg.detail}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  required
                  value={sponsorForm.brandName}
                  onChange={(e) => setSponsorForm({ ...sponsorForm, brandName: e.target.value })}
                  placeholder="Nombre de tu marca, tienda o empresa *"
                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none"
                />

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={sponsorForm.category}
                    onChange={(e) => setSponsorForm({ ...sponsorForm, category: e.target.value })}
                    className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none"
                  >
                    <option>Herramientas</option>
                    <option>Tienda de Repuestos/Accesorios</option>
                    <option>Lubricentro/Taller</option>
                    <option>Marca Patrocinadora</option>
                    <option>Evento/Tuning</option>
                  </select>
                  <input
                    type="tel"
                    required
                    value={sponsorForm.phone}
                    onChange={(e) => setSponsorForm({ ...sponsorForm, phone: e.target.value })}
                    placeholder="Teléfono / WhatsApp *"
                    className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none"
                  />
                </div>

                <input
                  type="email"
                  value={sponsorForm.email}
                  onChange={(e) => setSponsorForm({ ...sponsorForm, email: e.target.value })}
                  placeholder="Correo electrónico"
                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none"
                />

                <textarea
                  rows={2}
                  value={sponsorForm.notes}
                  onChange={(e) => setSponsorForm({ ...sponsorForm, notes: e.target.value })}
                  placeholder="Cuéntanos qué productos, promoción o lanzamiento deseas destacar..."
                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2 text-white outline-none"
                />

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold"
                >
                  Enviar Solicitud de Alianza
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: REGISTRO E INICIO DE SESIÓN */}
        {authModalOpen && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col justify-end">
            <div className="bg-[#141418] border-t border-zinc-800 rounded-t-3xl max-h-[92%] flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 shrink-0">
                <div className="flex gap-2">
                  <button
                    onClick={() => setAuthMode('register')}
                    className={`px-3 py-1 rounded-full text-xs font-extrabold transition ${
                      authMode === 'register'
                        ? 'bg-orange-500 text-white'
                        : 'bg-[#0A0A0C] text-zinc-400'
                    }`}
                  >
                    Crear Cuenta
                  </button>
                  <button
                    onClick={() => setAuthMode('login')}
                    className={`px-3 py-1 rounded-full text-xs font-extrabold transition ${
                      authMode === 'login'
                        ? 'bg-orange-500 text-white'
                        : 'bg-[#0A0A0C] text-zinc-400'
                    }`}
                  >
                    Iniciar Sesión
                  </button>
                </div>
                <button
                  onClick={() => setAuthModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto p-5 space-y-4">
                {authMode === 'register' ? (
                  <form onSubmit={handleRegister} className="space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setRegisterForm({ ...registerForm, accountType: 'consumer' })
                        }
                        className={`p-3 rounded-2xl border text-left transition ${
                          registerForm.accountType === 'consumer'
                            ? 'bg-[#0A0A0C] border-orange-500 text-white'
                            : 'bg-[#0A0A0C]/50 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        <User className="w-4 h-4 text-orange-400 mb-1" />
                        <div className="font-bold">Consumidor Final</div>
                        <div className="text-[10px] text-zinc-500">Promos y puntos</div>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setRegisterForm({ ...registerForm, accountType: 'dealer' })
                        }
                        className={`p-3 rounded-2xl border text-left transition ${
                          registerForm.accountType === 'dealer'
                            ? 'bg-[#0A0A0C] border-emerald-500 text-white'
                            : 'bg-[#0A0A0C]/50 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        <Building2 className="w-4 h-4 text-emerald-400 mb-1" />
                        <div className="font-bold">Comerciante / Tienda</div>
                        <div className="text-[10px] text-zinc-500">-22% a -28% taller</div>
                      </button>
                    </div>

                    <input
                      type="text"
                      required
                      value={registerForm.name}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, name: e.target.value })
                      }
                      placeholder="Nombre completo, tienda o taller *"
                      className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none"
                    />
                    <input
                      type="email"
                      required
                      value={registerForm.email}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, email: e.target.value })
                      }
                      placeholder="Correo electrónico para verificación *"
                      className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        value={registerForm.phone}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, phone: e.target.value })
                        }
                        placeholder="Teléfono"
                        className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none"
                      />
                      <input
                        type="password"
                        required
                        value={registerForm.password}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, password: e.target.value })
                        }
                        placeholder="Contraseña *"
                        className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none"
                      />
                    </div>
                    <input
                      type="text"
                      value={registerForm.address}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, address: e.target.value })
                      }
                      placeholder="Dirección de entrega"
                      className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none"
                    />

                    <input
                      type="text"
                      value={registerForm.referredBy}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, referredBy: e.target.value })
                      }
                      placeholder="Código de quien te recomendó (Ej: CARLOS-APEX)"
                      className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-amber-300 outline-none"
                    />

                    {registerForm.accountType === 'dealer' && (
                      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3 space-y-2">
                        <p className="text-[11px] text-emerald-300">
                          Usa el código <strong>APEXPRO</strong> para aprobación inmediata o déjalo vacío para revisión del Admin.
                        </p>
                        <input
                          type="text"
                          value={registerForm.vipCode}
                          onChange={(e) =>
                            setRegisterForm({ ...registerForm, vipCode: e.target.value })
                          }
                          placeholder="Código VIP opcional (APEXPRO)"
                          className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold"
                    >
                      Crear Cuenta (+200 pts)
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleLogin} className="space-y-3.5 text-xs">
                    <input
                      type="email"
                      required
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      placeholder="Correo electrónico"
                      className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-3 text-white outline-none"
                    />
                    <input
                      type="password"
                      required
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
                      placeholder="Contraseña"
                      className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-3 text-white outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl bg-orange-500 text-white font-extrabold"
                    >
                      Iniciar Sesión
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODAL: FICHA TÉCNICA, RECOMENDACIONES Y COMPARADOR */}
        {detailProduct && (() => {
          const pricing = getProductPricing(detailProduct);
          const isCompared = compareIds.includes(detailProduct.id);
          return (
            <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col justify-end">
              <div className="bg-[#141418] border-t border-zinc-800 rounded-t-3xl max-h-[90%] flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 shrink-0">
                  <span className="text-xs font-extrabold text-zinc-400">Ficha Técnica y Uso</span>
                  <button
                    onClick={() => setDetailProduct(null)}
                    className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="overflow-y-auto p-5 space-y-5">
                  <div className="rounded-2xl overflow-hidden h-44 bg-zinc-950">
                    {renderPhoto(
                      detailProduct.id,
                      detailProduct.image,
                      detailProduct.name,
                      'w-full h-44'
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="font-bold text-orange-400">{detailProduct.category}</span>
                      <span className="text-amber-400 font-bold">
                        • +{pricing.effectivePoints} pts
                      </span>
                      <span className="text-emerald-400">• {detailProduct.stock} disp.</span>
                    </div>
                    <h3 className="text-lg font-black text-white leading-snug">
                      {detailProduct.name}
                    </h3>
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-2xl font-black text-white">
                        ${pricing.finalPrice.toFixed(2)}
                      </span>
                      {pricing.discountPercent > 0 && (
                        <span className="text-sm line-through text-zinc-500">
                          ${pricing.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#0A0A0C] border border-zinc-800 rounded-2xl p-4 space-y-2.5 text-xs">
                    <h4 className="font-extrabold text-white flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-orange-400" /> Especificaciones Técnicas
                    </h4>
                    <div className="flex justify-between py-1 border-b border-zinc-900 gap-2">
                      <span className="text-zinc-400">Formulación</span>
                      <span className="text-white font-semibold text-right">
                        {detailProduct.techSpecs?.gradeOrMaterial}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-zinc-900 gap-2">
                      <span className="text-zinc-400">Norma / Cert.</span>
                      <span className="text-white font-semibold text-right">
                        {detailProduct.techSpecs?.normOrCert}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-zinc-900 gap-2">
                      <span className="text-zinc-400">Presentación</span>
                      <span className="text-white font-semibold text-right">
                        {detailProduct.techSpecs?.presentation}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 gap-2">
                      <span className="text-zinc-400">Rendimiento</span>
                      <span className="text-emerald-400 font-bold text-right">
                        {detailProduct.techSpecs?.lifespan}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#0A0A0C] border border-zinc-800 rounded-2xl p-4 space-y-2.5 text-xs">
                    <h4 className="font-extrabold text-amber-400 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4" /> Recomendaciones y Diferencias
                    </h4>
                    <p className="text-zinc-300 leading-relaxed">
                      <strong className="text-white">Ideal para: </strong>
                      {detailProduct.recommendation?.idealFor}
                    </p>
                    <p className="text-zinc-300 leading-relaxed">
                      <strong className="text-emerald-400">Diferencia clave: </strong>
                      {detailProduct.recommendation?.difference}
                    </p>
                    <p className="text-zinc-400 leading-relaxed">
                      <strong className="text-orange-400">Consejo de uso: </strong>
                      {detailProduct.recommendation?.tip}
                    </p>
                  </div>
                </div>

                <div className="p-4 border-t border-zinc-800 bg-[#0A0A0C] flex gap-3 shrink-0">
                  <button
                    onClick={() => toggleCompareProduct(detailProduct.id)}
                    className={`px-4 py-3 rounded-2xl border text-xs font-bold flex items-center gap-1.5 ${
                      isCompared
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                        : 'bg-[#141418] border-zinc-800 text-zinc-300'
                    }`}
                  >
                    <Scale className="w-4 h-4" />
                    {isCompared ? 'En lista' : 'Comparar'}
                  </button>

                  <button
                    onClick={() => {
                      addToCart(detailProduct);
                      setDetailProduct(null);
                    }}
                    disabled={detailProduct.stock === 0}
                    className="flex-1 py-3 rounded-2xl bg-orange-500 text-white font-extrabold text-xs"
                  >
                    + Agregar • ${pricing.finalPrice.toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* MODAL: COMPARADOR LADO A LADO */}
        {showCompareModal && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col justify-end">
            <div className="bg-[#141418] border-t border-zinc-800 rounded-t-3xl max-h-[85%] flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
                <span className="text-xs font-extrabold text-white">
                  Comparador ({comparedProducts.length}/3)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCompareIds([]);
                      setShowCompareModal(false);
                    }}
                    className="text-[11px] text-zinc-400"
                  >
                    Limpiar
                  </button>
                  <button
                    onClick={() => setShowCompareModal(false)}
                    className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto p-5">
                {comparedProducts.length < 2 ? (
                  <p className="text-xs text-zinc-400 text-center py-8">
                    Marca al menos 2 productos desde su ficha técnica para comparar sus diferencias.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr>
                          <th className="p-2.5 text-zinc-500 border-b border-zinc-800">Criterio</th>
                          {comparedProducts.map((cp) => (
                            <th
                              key={cp.id}
                              className="p-2.5 text-white font-bold border-b border-zinc-800 min-w-[130px]"
                            >
                              {cp.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/80">
                        <tr>
                          <td className="p-2.5 text-zinc-400">Precio</td>
                          {comparedProducts.map((cp) => (
                            <td key={cp.id} className="p-2.5 font-black text-orange-400">
                              ${getProductPricing(cp).finalPrice.toFixed(2)}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-2.5 text-zinc-400">Formulación</td>
                          {comparedProducts.map((cp) => (
                            <td key={cp.id} className="p-2.5 text-white">
                              {cp.techSpecs?.gradeOrMaterial}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-2.5 text-zinc-400">Duración</td>
                          {comparedProducts.map((cp) => (
                            <td key={cp.id} className="p-2.5 text-emerald-400 font-semibold">
                              {cp.techSpecs?.lifespan}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-2.5 text-zinc-400">Diferencia</td>
                          {comparedProducts.map((cp) => (
                            <td key={cp.id} className="p-2.5 text-zinc-300">
                              {cp.recommendation?.difference}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODAL: CREAR / EDITAR PRODUCTO EN ADMIN */}
        {productModalOpen && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col justify-end">
            <div className="bg-[#141418] border-t border-zinc-800 rounded-t-3xl max-h-[92%] flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
                <span className="text-xs font-extrabold text-white">
                  {editingProductId ? 'Editar Producto' : 'Nuevo Producto'}
                </span>
                <button
                  onClick={() => setProductModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="overflow-y-auto p-5 space-y-3 text-xs">
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="Nombre del producto *"
                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none"
                />

                <div className="flex gap-2">
                  <label className="flex-1 py-2.5 px-3 rounded-xl bg-[#0A0A0C] border border-dashed border-zinc-700 text-zinc-300 flex items-center justify-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-orange-400" />
                    Subir foto propia
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileUpload(e, (url) =>
                          setProductForm((prev) => ({ ...prev, image: url }))
                        )
                      }
                      className="hidden"
                    />
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none"
                  >
                    {CATEGORIES.filter((c) => c !== 'Todos').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {PRESET_PHOTOS.map((p) => (
                    <button
                      type="button"
                      key={p.label}
                      onClick={() => setProductForm({ ...productForm, image: p.url })}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap ${
                        productForm.image === p.url
                          ? 'bg-orange-500 text-white'
                          : 'bg-[#0A0A0C] text-zinc-400'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">Precio Base ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">Stock *</label>
                    <input
                      type="number"
                      required
                      value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                      className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">Promo Cliente %</label>
                    <input
                      type="number"
                      value={productForm.consumerPromoPercent}
                      onChange={(e) =>
                        setProductForm({ ...productForm, consumerPromoPercent: e.target.value })
                      }
                      className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">
                      Desc. Comercializador %
                    </label>
                    <input
                      type="number"
                      value={productForm.dealerDiscountPercent}
                      onChange={(e) =>
                        setProductForm({ ...productForm, dealerDiscountPercent: e.target.value })
                      }
                      className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                    />
                  </div>
                </div>

                <input
                  type="text"
                  value={productForm.gradeOrMaterial}
                  onChange={(e) =>
                    setProductForm({ ...productForm, gradeOrMaterial: e.target.value })
                  }
                  placeholder="Formulación / Viscosidad (Ficha Técnica)"
                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2 text-white outline-none"
                />

                <input
                  type="text"
                  value={productForm.difference}
                  onChange={(e) => setProductForm({ ...productForm, difference: e.target.value })}
                  placeholder="Diferencia clave frente a otros productos"
                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2 text-white outline-none"
                />

                <input
                  type="text"
                  value={productForm.idealFor}
                  onChange={(e) => setProductForm({ ...productForm, idealFor: e.target.value })}
                  placeholder="Recomendación de aplicación"
                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3.5 py-2 text-white outline-none"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-orange-500 text-white font-extrabold"
                >
                  Guardar Producto
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: DESCARGA EN PLAY STORE / APP STORE */}
        {storeModal && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-6 w-full space-y-4">
              <div className="flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-orange-400" />
                <h3 className="text-sm font-black text-white">
                  {storeModal === 'playstore' ? 'Google Play Store' : 'Apple App Store'}
                </h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Descarga oficial vinculada al sello QR{' '}
                <strong className="text-white">{activeQrProduct.qrSerial}</strong> para validar
                autenticidad y activar tu garantía {brandConfig.name}.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setStoreModal(null);
                    showToast('Enlace oficial listo');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-extrabold text-xs flex items-center justify-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Descargar
                </button>
                <button
                  onClick={() => setStoreModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-bold text-xs"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: CONFIRMACIÓN DE PEDIDO */}
        {orderSuccessModal && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-6 w-full text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <div>
                <h3 className="text-base font-black text-white">¡Pedido Confirmado!</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Orden {orderSuccessModal.orderId} • +{orderSuccessModal.pointsEarned} pts ganados
                </p>
              </div>
              <button
                onClick={() => {
                  setOrderSuccessModal(null);
                  setActiveTab('store');
                }}
                className="w-full py-3 rounded-2xl bg-white text-zinc-950 font-extrabold text-xs"
              >
                Volver a la Tienda
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
