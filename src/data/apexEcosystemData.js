// Base de datos estructurada del Ecosistema Curado y Red Social ÁPEX

export const VERTICALS = [
  {
    id: 'automotriz',
    name: 'Automotriz',
    shortName: 'Automotriz',
    description: 'Lubricantes, fluidos, repuestos, accesorios, talleres, compra/venta y asesoría técnica',
    subcategories: [
      'Lubricantes y fluidos',
      'Repuestos',
      'Accesorios',
      'Talleres y afiliados',
      'Compra y venta de vehículos',
      'Asesoría técnica de emergencia'
    ],
    affiliateRoles: [
      'Taller Certificado',
      'Técnico Especialista en Mecánica',
      'Técnico Especialista en Electrónica Automotriz',
      'Tienda de Repuestos / Accesorios',
      'Concesionario / Vendedor Verificado'
    ]
  },
  {
    id: 'belleza',
    name: 'Mujer y belleza',
    shortName: 'Mujer y belleza',
    description: 'Cosmética, accesorios, spas y profesionales afiliados',
    subcategories: [
      'Cosmética',
      'Accesorios',
      'Spa y Afiliados'
    ],
    affiliateRoles: [
      'Spa Certificado',
      'Salón de Belleza / Peluquería',
      'Cosmetólogo(a) Afiliado',
      'Tienda de Cosmética y Accesorios'
    ]
  },
  {
    id: 'medico',
    name: 'Médico',
    shortName: 'Médico',
    description: 'Insumos médicos, alquiler de equipos médicos, clínicas y médicos afiliados',
    subcategories: [
      'Insumos médicos',
      'Alquiler de equipos médicos',
      'Clínicas y Médicos Afiliados'
    ],
    affiliateRoles: [
      'Clínica Afiliada',
      'Médico Especialista / Consulta',
      'Suplidora de Insumos Médicos',
      'Alquiler de Equipos Médicos'
    ]
  },
  {
    id: 'bienes-raices',
    name: 'Bienes raíces',
    shortName: 'Bienes raíces',
    description: 'Compra y venta de inmuebles, ingenieros, arquitectos y agentes inmobiliarios afiliados',
    subcategories: [
      'Compra y venta de inmuebles',
      'Ingenieros y Arquitectos',
      'Agentes inmobiliarios Afiliados'
    ],
    affiliateRoles: [
      'Agente Inmobiliario Afiliado',
      'Ingeniero Afiliado',
      'Arquitecto Afiliado',
      'Constructora Verificada'
    ]
  },
  {
    id: 'hogar',
    name: 'Hogar',
    shortName: 'Hogar',
    description: 'Supermercado, electrodomésticos, mueblería, ferretería y técnicos profesionales afiliados',
    subcategories: [
      'Supermercado',
      'Electrodomésticos',
      'Mueblería',
      'Ferretería',
      'Técnicos y afiliados'
    ],
    affiliateRoles: [
      'Supermercado Aliado',
      'Tienda de Electrodomésticos',
      'Mueblería',
      'Ferretería',
      'Albañilería Profesional',
      'Electricidad Residencial / Industrial',
      'Plomería',
      'Pintura y Acabados',
      'Reparación de Electrodomésticos'
    ]
  },
  {
    id: 'electronica',
    name: 'Electrónica',
    shortName: 'Electrónica',
    description: 'Equipos electrónicos, audio, computación, telefonía y soporte especializado',
    subcategories: [
      'Telefonía y Accesorios',
      'Computación y Redes',
      'Audio y Video',
      'Servicio Técnico Electrónico'
    ],
    affiliateRoles: [
      'Tienda de Electrónica Verificada',
      'Laboratorio Técnico Electrónico'
    ]
  },
  {
    id: 'ropa-zapatos',
    name: 'Ropa y Zapatos',
    shortName: 'Ropa y Zapatos',
    description: 'Moda y calzado curado para damas y caballeros',
    subcategories: [
      'Damas',
      'Caballeros'
    ],
    affiliateRoles: [
      'Boutique Damas',
      'Tienda Caballeros',
      'Zapatería Aliada'
    ]
  },
  {
    id: 'mascotas',
    name: 'Mascotas',
    shortName: 'Mascotas',
    description: 'Alimentos, accesorios, estética canina y atención veterinaria afiliada',
    subcategories: [
      'Alimentos y Nutrición',
      'Accesorios y Cuidado',
      'Veterinarios y Peluquería Afiliada'
    ],
    affiliateRoles: [
      'Tienda de Mascotas',
      'Médico Veterinario Afiliado',
      'Estética y Guardería Canina'
    ]
  },
  {
    id: 'licores',
    name: 'Licores',
    shortName: 'Licores',
    description: 'Destilados, vinos, cervezas y bodegones aliados verificados (+18)',
    subcategories: [
      'Destilados y Vinos',
      'Cervezas y Coctelería',
      'Bodegones Aliados'
    ],
    affiliateRoles: [
      'Bodegón Aliado Certificado',
      'Distribuidor Oficial de Licores'
    ]
  },
  {
    id: 'entretenimiento',
    name: 'Entretenimiento',
    shortName: 'Entretenimiento',
    description: 'Eventos, válidas tuning, conciertos, experiencias y clubes aliados',
    subcategories: [
      'Eventos y Válidas',
      'Experiencias y Recreación',
      'Clubes y Gastronomía'
    ],
    affiliateRoles: [
      'Productora de Eventos',
      'Club / Centro Recreativo Aliado'
    ]
  }
];

export const QUALITY_FILTER_STAGES = [
  { id: 'interview', label: '1. Entrevista del Equipo Técnico ÁPEX' },
  { id: 'technical', label: '2. Evaluación de Calidad y Origen' },
  { id: 'warranty', label: '3. Compromiso de Garantía Verificada' },
  { id: 'seal', label: '4. Sello de Calidad Aprobado ÁPEX' }
];

export const INITIAL_ALLIES_PROFILES = [
  {
    id: 'ally-megafreeze',
    handle: '@megafreeze',
    brandName: 'Megafreeze Venezuela',
    verticalId: 'automotriz',
    subcategory: 'Lubricantes y fluidos',
    specialtyRole: 'Fabricante y Aliado Oficial',
    city: 'Maracay, Aragua',
    bio: 'Fabricantes de refrigerantes orgánicos, lubricantes sintéticos y fluidos de alto rendimiento con Sello de Calidad ÁPEX.',
    logoUrl: 'https://images.unsplash.com/photo-1635437536607-b8572f443763?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1000&q=80',
    phone: '+58 414-1470773',
    email: 'contacto@megafreeze.com',
    status: 'approved',
    qualityApproved: true,
    qualityAudit: {
      interview: true,
      technical: true,
      warranty: true,
      seal: true,
      auditorNote: 'Aprobado por el equipo técnico ÁPEX: pruebas térmicas y de viscosidad certificadas.'
    },
    pointsEarnedByAlly: 1450,
    followers: ['usr-1', 'usr-2']
  },
  {
    id: 'ally-taller-master',
    handle: '@electromecanicapro',
    brandName: 'Taller & Diagnóstico ElectroPro',
    verticalId: 'automotriz',
    subcategory: 'Talleres y afiliados',
    specialtyRole: 'Técnico Especialista en Mecánica y Electrónica Automotriz',
    city: 'Maracay, Aragua',
    bio: 'Diagnóstico con escáner OEM, reconstrucción de motores, inyección electrónica y mantenimiento preventivo certificado.',
    logoUrl: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1000&q=80',
    phone: '+58 412-5559900',
    email: 'taller@electropro.com',
    status: 'approved',
    qualityApproved: true,
    qualityAudit: {
      interview: true,
      technical: true,
      warranty: true,
      seal: true,
      auditorNote: 'Equipamiento de diagnóstico y garantía de mano de obra verificados.'
    },
    pointsEarnedByAlly: 980,
    followers: ['usr-1']
  },
  {
    id: 'ally-aura-beauty',
    handle: '@aurabeautystudio',
    brandName: 'Aura Spa & Cosmética',
    verticalId: 'belleza',
    subcategory: 'Cosmética',
    specialtyRole: 'Spa Certificado y Tienda Cosmética',
    city: 'Maracay, Aragua',
    bio: 'Cosmética dermatológica, accesorios y tratamientos faciales. Usa aquí tus puntos ganados en cualquier compra ÁPEX.',
    logoUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
    phone: '+58 412-4490122',
    email: 'citas@aurabeauty.com',
    status: 'approved',
    qualityApproved: true,
    qualityAudit: {
      interview: true,
      technical: true,
      warranty: true,
      seal: true,
      auditorNote: 'Productos originales con registro sanitario aprobado.'
    },
    pointsEarnedByAlly: 820,
    followers: ['usr-1']
  },
  {
    id: 'ally-medicare-apex',
    handle: '@medicareapex',
    brandName: 'MediCare Insumos & Clínicas',
    verticalId: 'medico',
    subcategory: 'Alquiler de equipos médicos',
    specialtyRole: 'Clínicas, Insumos y Alquiler de Equipos Médicos',
    city: 'Maracay / Nacional',
    bio: 'Insumos médicos certificados, venta y alquiler de concentradores de oxígeno, camas clínicas y médicos afiliados.',
    logoUrl: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
    phone: '+58 414-9012233',
    email: 'atencion@medicareapex.com',
    status: 'approved',
    qualityApproved: true,
    qualityAudit: {
      interview: true,
      technical: true,
      warranty: true,
      seal: true,
      auditorNote: 'Credenciales médicas y calibración de equipos aprobadas.'
    },
    pointsEarnedByAlly: 940,
    followers: []
  },
  {
    id: 'ally-hogar-tecnicos',
    handle: '@hogartecnicospro',
    brandName: 'Multiservicios Hogar & Ferretería Ápex',
    verticalId: 'hogar',
    subcategory: 'Técnicos y afiliados',
    specialtyRole: 'Albañilería, Electricidad, Plomería, Pintura y Reparación de Electrodomésticos',
    city: 'Maracay, Aragua',
    bio: 'Equipo de técnicos profesionales afiliados con garantía ÁPEX en electricidad, plomería, albañilería, pintura y línea blanca.',
    logoUrl: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1000&q=80',
    phone: '+58 424-3109988',
    email: 'servicios@hogartecnicos.com',
    status: 'approved',
    qualityApproved: true,
    qualityAudit: {
      interview: true,
      technical: true,
      warranty: true,
      seal: true,
      auditorNote: 'Técnicos evaluados en campo con garantía escrita sobre cada trabajo.'
    },
    pointsEarnedByAlly: 610,
    followers: []
  }
];

export const INITIAL_ECOSYSTEM_ITEMS = [
  {
    id: 'item-1',
    allyId: 'ally-megafreeze',
    verticalId: 'automotriz',
    subcategory: 'Lubricantes y fluidos',
    itemType: 'product',
    name: 'Refrigerante Orgánico Megafreeze OAT 50/50 (Galón)',
    spec: 'Premezclado listo para usar • -37°C a 129°C',
    images: [
      'https://images.unsplash.com/photo-1635437536607-b8572f443763?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80'
    ],
    price: 18.5,
    consumerPromoPercent: 10,
    dealerDiscountPercent: 26,
    stock: 45,
    buyerPoints: 95,
    sellerPoints: 45,
    qrSerial: 'APX-MGF-5050-8841',
    qualityApproved: true,
    trackingRule: {
      enabled: true,
      intervalDays: 180,
      intervalKm: 20000,
      checkupQuestion: '¿Cómo se mantiene la temperatura de trabajo de tu motor tras aplicar Megafreeze OAT?',
      reminderLabel: 'Revisión y reposición de refrigerante'
    },
    techSpecs: {
      gradeOrMaterial: 'Etilenglicol Orgánico OAT 50/50',
      normOrCert: 'ASTM D3306 / Libre de Silicatos',
      presentation: 'Galón 3.785 Litros Sellado',
      lifespan: 'Hasta 80,000 km o 3 años'
    },
    recommendation: {
      idealFor: 'Radiadores de aluminio, motores modernos y uso exigente en clima cálido.',
      difference: 'Evita cavitación en bomba de agua y protege contra corrosión interna.'
    }
  },
  {
    id: 'item-2',
    allyId: 'ally-megafreeze',
    verticalId: 'automotriz',
    subcategory: 'Lubricantes y fluidos',
    itemType: 'product',
    name: 'Lubricante Full Sintético Megafreeze 5W-30 SP (4L)',
    spec: 'API SP / ILSAC GF-6A • Protección Turbo',
    images: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1635437536607-b8572f443763?auto=format&fit=crop&w=800&q=80'
    ],
    price: 39.0,
    consumerPromoPercent: 8,
    dealerDiscountPercent: 25,
    stock: 30,
    buyerPoints: 200,
    sellerPoints: 90,
    qrSerial: 'APX-MGF-5W30-3109',
    qualityApproved: true,
    trackingRule: {
      enabled: true,
      intervalDays: 120,
      intervalKm: 7500,
      checkupQuestion: '¿Notas el arranque en frío más suave y silencioso después del cambio de aceite?',
      reminderLabel: 'Próximo cambio de aceite y filtro (7,500 km)'
    },
    techSpecs: {
      gradeOrMaterial: 'SAE 5W-30 100% Sintético',
      normOrCert: 'API SP / ILSAC GF-6A',
      presentation: 'Garrafa 4 Litros con sello QR',
      lifespan: '7,500 a 10,000 km'
    },
    recommendation: {
      idealFor: 'Motores modernos a gasolina, inyección directa y turbocargados.',
      difference: 'Mantiene película lubricante estable a altas temperaturas.'
    }
  },
  {
    id: 'item-3',
    allyId: 'ally-aura-beauty',
    verticalId: 'belleza',
    subcategory: 'Cosmética',
    itemType: 'product',
    name: 'Kit Hidratación Facial Vitamina C + Ácido Hialurónico',
    spec: 'Fórmula dermatológica • Canjeable con puntos Ápex',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
    ],
    price: 28.0,
    consumerPromoPercent: 12,
    dealerDiscountPercent: 22,
    stock: 20,
    buyerPoints: 140,
    sellerPoints: 65,
    qrSerial: 'APX-AUR-VITC-1104',
    qualityApproved: true,
    trackingRule: {
      enabled: true,
      intervalDays: 45,
      intervalKm: 0,
      checkupQuestion: '¿Cómo sientes la luminosidad e hidratación de tu piel tras 2 semanas de uso?',
      reminderLabel: 'Reposición de sérum hidratante'
    },
    techSpecs: {
      gradeOrMaterial: 'Sérum Vitamina C 15% + Hialurónico puro',
      normOrCert: 'Registro Sanitario Vigente • Cruelty Free',
      presentation: 'Estuche 2 frascos gotero 30ml',
      lifespan: 'Tratamiento para 45 días'
    },
    recommendation: {
      idealFor: 'Todo tipo de piel; ideal para uso diario antes del protector solar.',
      difference: 'Producto verificado con sello de calidad ÁPEX; acepta cupones cruzados.'
    }
  },
  {
    id: 'item-4',
    allyId: 'ally-medicare-apex',
    verticalId: 'medico',
    subcategory: 'Alquiler de equipos médicos',
    itemType: 'service',
    name: 'Alquiler Concentrador de Oxígeno 5L (Plan Mensual)',
    spec: 'Incluye cánula, humidificador y soporte técnico 24/7',
    images: [
      'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=80'
    ],
    price: 85.0,
    consumerPromoPercent: 5,
    dealerDiscountPercent: 15,
    stock: 8,
    buyerPoints: 420,
    sellerPoints: 180,
    qrSerial: 'APX-MED-OXY5-9920',
    qualityApproved: true,
    trackingRule: {
      enabled: true,
      intervalDays: 30,
      intervalKm: 0,
      checkupQuestion: '¿El equipo de oxígeno está funcionando silencioso y con flujo estable?',
      reminderLabel: 'Renovación de alquiler o mantenimiento de filtros'
    },
    techSpecs: {
      gradeOrMaterial: 'Flujo continuo 1 a 5 L/min • Pureza 93% ±3%',
      normOrCert: 'Certificación ISO 13485 • Desinfección Hospitalaria',
      presentation: 'Equipo portátil con ruedas + accesorios nuevos',
      lifespan: 'Mantenimiento preventivo incluido cada 30 días'
    },
    recommendation: {
      idealFor: 'Recuperación respiratoria en casa con respaldo médico verificado.',
      difference: 'Entrega a domicilio y garantía de reemplazo inmediato por ÁPEX.'
    }
  },
  {
    id: 'item-5',
    allyId: 'ally-hogar-tecnicos',
    verticalId: 'hogar',
    subcategory: 'Técnicos y afiliados',
    itemType: 'service',
    name: 'Servicio Técnico Integral: Electricidad, Plomería o Electrodomésticos',
    spec: 'Visita técnica evaluada • Albañilería, pintura y reparaciones',
    images: [
      'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=80'
    ],
    price: 25.0,
    consumerPromoPercent: 0,
    dealerDiscountPercent: 15,
    stock: 50,
    buyerPoints: 125,
    sellerPoints: 60,
    qrSerial: 'APX-HGR-SRV-5510',
    qualityApproved: true,
    trackingRule: {
      enabled: true,
      intervalDays: 30,
      intervalKm: 0,
      checkupQuestion: '¿Quedaste satisfecho con la puntualidad y acabado del técnico afiliado ÁPEX?',
      reminderLabel: 'Revisión de garantía del servicio realizado'
    },
    techSpecs: {
      gradeOrMaterial: 'Mano de obra calificada con herramientas certificadas',
      normOrCert: 'Garantía escrita ÁPEX de 30 a 90 días según obra',
      presentation: 'Diagnóstico en sitio + presupuesto transparente',
      lifespan: 'Respaldo directo del equipo evaluador ÁPEX'
    },
    recommendation: {
      idealFor: 'Fallas eléctricas, filtraciones, albañilería, pintura y reparación de neveras/lavadoras.',
      difference: 'Todos los técnicos pasaron filtro de antecedentes y prueba técnica.'
    }
  }
];

export const INITIAL_VERIFIED_POSTS = [
  {
    id: 'post-1',
    userId: 'usr-1',
    userName: 'Carlos Mendoza',
    userHandle: '@carlosm_apex',
    orderId: 'ORD-4012',
    itemId: 'item-1',
    itemName: 'Refrigerante Orgánico Megafreeze OAT 50/50 (Galón)',
    allyName: 'Megafreeze Venezuela',
    rating: 5,
    caption: 'Lo puse hace 3 semanas en mi Corolla y en las colas del mediodía la aguja ni se mueve. Excelente calidad y el QR vino sellado.',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
    likes: ['usr-2'],
    createdAt: 'Hace 2 días'
  }
];
