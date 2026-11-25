import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Package,
  Megaphone,
  Plus,
  Trash2,
  Edit3,
  Upload,
  CheckCircle2,
  X,
  ImagePlus,
  ShoppingBag,
  Award,
  Eye,
  EyeOff
} from 'lucide-react';
import { VERTICALS, QUALITY_FILTER_STAGES } from '../data/apexEcosystemData';

const MAX_PHOTOS = 10;

const PHOTO_PRESETS = [
  'https://images.unsplash.com/photo-1635437536607-b8572f443763?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=80'
];

export default function AdminEcosystemPanel({
  allies = [],
  items = [],
  ads = [],
  ordersHistory = [],
  onSaveAlly,
  onToggleAuditStage,
  onDeleteAlly,
  onSaveItem,
  onDeleteItem,
  onCreateAd,
  onToggleAd,
  onDeleteAd,
  onToast
}) {
  const [section, setSection] = useState('allies'); // 'allies' | 'catalog' | 'ads' | 'orders'

  // --- ESTADO PARA CREAR / EDITAR PERFIL DE ALIADO (FILTRO DE CALIDAD ÁPEX) ---
  const [editingAllyId, setEditingAllyId] = useState(null);
  const firstVertical = VERTICALS[0];
  const [allyForm, setAllyForm] = useState({
    brandName: '',
    handle: '',
    verticalId: firstVertical.id,
    subcategory: firstVertical.subcategories[0],
    specialtyRole: firstVertical.affiliateRoles[0],
    city: 'Maracay, Aragua',
    bio: '',
    phone: '',
    email: '',
    logoUrl: PHOTO_PRESETS[0],
    bannerUrl: PHOTO_PRESETS[2],
    interview: true,
    technical: true,
    warranty: true,
    seal: true,
    auditorNote: 'Evaluado y aprobado por el equipo técnico de calidad ÁPEX.'
  });

  // --- ESTADO PARA CREAR / EDITAR PRODUCTO O SERVICIO (HASTA 10 FOTOS) ---
  const [editingItemId, setEditingItemId] = useState(null);
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [itemForm, setItemForm] = useState({
    allyId: allies[0]?.id || 'ally-megafreeze',
    verticalId: allies[0]?.verticalId || firstVertical.id,
    subcategory: allies[0]?.subcategory || firstVertical.subcategories[0],
    itemType: 'product',
    name: '',
    spec: '',
    price: '',
    consumerPromoPercent: '10',
    dealerDiscountPercent: '25',
    stock: '20',
    buyerPoints: '100',
    sellerPoints: '50',
    qrSerial: '',
    images: [PHOTO_PRESETS[0]],
    gradeOrMaterial: '',
    normOrCert: '',
    presentation: '',
    lifespan: '',
    idealFor: '',
    difference: '',
    trackingEnabled: true,
    intervalDays: '120',
    intervalKm: '7500',
    reminderLabel: 'Próximo mantenimiento y revisión',
    checkupQuestion: '¿Cómo ha sido el rendimiento del producto tras su aplicación?'
  });

  // --- ESTADO PARA PUBLICIDAD GRÁFICA Y LANZAMIENTOS ---
  const [adForm, setAdForm] = useState({
    advertiser: '',
    tag: 'Publicidad Oficial ÁPEX',
    title: '',
    description: '',
    image: PHOTO_PRESETS[3],
    ctaText: 'Ver Aliado',
    targetSection: 'allies',
    isLaunch: false,
    launchNote: ''
  });

  const handleFileToBase64 = (e, onResult) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onResult(reader.result);
        onToast?.('Imagen cargada');
      }
    };
    reader.readAsDataURL(file);
  };

  const resetAllyForm = () => {
    setEditingAllyId(null);
    setAllyForm({
      brandName: '',
      handle: '',
      verticalId: firstVertical.id,
      subcategory: firstVertical.subcategories[0],
      specialtyRole: firstVertical.affiliateRoles[0],
      city: 'Maracay, Aragua',
      bio: '',
      phone: '',
      email: '',
      logoUrl: PHOTO_PRESETS[0],
      bannerUrl: PHOTO_PRESETS[2],
      interview: true,
      technical: true,
      warranty: true,
      seal: true,
      auditorNote: 'Evaluado y aprobado por el equipo técnico de calidad ÁPEX.'
    });
  };

  const startEditAlly = (ally) => {
    setEditingAllyId(ally.id);
    setAllyForm({
      brandName: ally.brandName || '',
      handle: ally.handle || '',
      verticalId: ally.verticalId || firstVertical.id,
      subcategory: ally.subcategory || firstVertical.subcategories[0],
      specialtyRole: ally.specialtyRole || firstVertical.affiliateRoles[0],
      city: ally.city || 'Maracay, Aragua',
      bio: ally.bio || '',
      phone: ally.phone || '',
      email: ally.email || '',
      logoUrl: ally.logoUrl || PHOTO_PRESETS[0],
      bannerUrl: ally.bannerUrl || PHOTO_PRESETS[2],
      interview: Boolean(ally.qualityAudit?.interview),
      technical: Boolean(ally.qualityAudit?.technical),
      warranty: Boolean(ally.qualityAudit?.warranty),
      seal: Boolean(ally.qualityAudit?.seal),
      auditorNote: ally.qualityAudit?.auditorNote || ''
    });
  };

  const handleAllySubmit = (e) => {
    e.preventDefault();
    if (!allyForm.brandName.trim()) {
      onToast?.('Indica el nombre del aliado o marca', 'error');
      return;
    }
    const passedAll =
      allyForm.interview && allyForm.technical && allyForm.warranty && allyForm.seal;

    const cleanHandle = (allyForm.handle.trim() || `@${allyForm.brandName.trim()}`)
      .toLowerCase()
      .replace(/\s+/g, '');
    const formattedHandle = cleanHandle.startsWith('@') ? cleanHandle : `@${cleanHandle}`;

    onSaveAlly?.({
      id: editingAllyId || `ally-${Date.now()}`,
      brandName: allyForm.brandName.trim(),
      handle: formattedHandle,
      verticalId: allyForm.verticalId,
      subcategory: allyForm.subcategory,
      specialtyRole: allyForm.specialtyRole,
      city: allyForm.city.trim() || 'Venezuela',
      bio: allyForm.bio.trim() || 'Aliado verificado dentro del ecosistema ÁPEX.',
      phone: allyForm.phone.trim(),
      email: allyForm.email.trim(),
      logoUrl: allyForm.logoUrl,
      bannerUrl: allyForm.bannerUrl,
      status: passedAll ? 'approved' : 'pending',
      qualityApproved: passedAll,
      qualityAudit: {
        interview: allyForm.interview,
        technical: allyForm.technical,
        warranty: allyForm.warranty,
        seal: allyForm.seal,
        auditorNote: allyForm.auditorNote.trim()
      }
    });

    resetAllyForm();
    onToast?.(
      passedAll
        ? 'Perfil de aliado guardado con Sello de Calidad ÁPEX'
        : 'Perfil guardado en revisión de calidad'
    );
  };

  const addPhotoToItemForm = (url) => {
    const clean = (url || '').trim();
    if (!clean) return;
    setItemForm((prev) => {
      if (prev.images.length >= MAX_PHOTOS) {
        onToast?.(`Máximo ${MAX_PHOTOS} fotos por producto`, 'error');
        return prev;
      }
      return { ...prev, images: [...prev.images, clean] };
    });
    setPhotoUrlInput('');
  };

  const removePhotoFromItemForm = (index) => {
    setItemForm((prev) => {
      const next = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: next.length > 0 ? next : [PHOTO_PRESETS[0]] };
    });
  };

  const resetItemForm = () => {
    setEditingItemId(null);
    const defaultAlly = allies[0];
    setItemForm({
      allyId: defaultAlly?.id || 'ally-megafreeze',
      verticalId: defaultAlly?.verticalId || firstVertical.id,
      subcategory: defaultAlly?.subcategory || firstVertical.subcategories[0],
      itemType: 'product',
      name: '',
      spec: '',
      price: '',
      consumerPromoPercent: '10',
      dealerDiscountPercent: '25',
      stock: '20',
      buyerPoints: '100',
      sellerPoints: '50',
      qrSerial: '',
      images: [PHOTO_PRESETS[0]],
      gradeOrMaterial: '',
      normOrCert: '',
      presentation: '',
      lifespan: '',
      idealFor: '',
      difference: '',
      trackingEnabled: true,
      intervalDays: '120',
      intervalKm: '7500',
      reminderLabel: 'Próximo mantenimiento y revisión',
      checkupQuestion: '¿Cómo ha sido el rendimiento del producto tras su aplicación?'
    });
  };

  const startEditItem = (item) => {
    setEditingItemId(item.id);
    setItemForm({
      allyId: item.allyId || allies[0]?.id || 'ally-megafreeze',
      verticalId: item.verticalId || firstVertical.id,
      subcategory: item.subcategory || firstVertical.subcategories[0],
      itemType: item.itemType || 'product',
      name: item.name || '',
      spec: item.spec || '',
      price: String(item.price || ''),
      consumerPromoPercent: String(item.consumerPromoPercent ?? 0),
      dealerDiscountPercent: String(item.dealerDiscountPercent ?? 20),
      stock: String(item.stock ?? 10),
      buyerPoints: String(item.buyerPoints ?? 100),
      sellerPoints: String(item.sellerPoints ?? 50),
      qrSerial: item.qrSerial || '',
      images:
        Array.isArray(item.images) && item.images.length > 0
          ? item.images.slice(0, MAX_PHOTOS)
          : [PHOTO_PRESETS[0]],
      gradeOrMaterial: item.techSpecs?.gradeOrMaterial || '',
      normOrCert: item.techSpecs?.normOrCert || '',
      presentation: item.techSpecs?.presentation || '',
      lifespan: item.techSpecs?.lifespan || '',
      idealFor: item.recommendation?.idealFor || '',
      difference: item.recommendation?.difference || '',
      trackingEnabled: Boolean(item.trackingRule?.enabled),
      intervalDays: String(item.trackingRule?.intervalDays ?? 120),
      intervalKm: String(item.trackingRule?.intervalKm ?? 7500),
      reminderLabel: item.trackingRule?.reminderLabel || 'Próximo mantenimiento',
      checkupQuestion:
        item.trackingRule?.checkupQuestion || '¿Cómo te ha resultado este producto?'
    });
  };

  const handleItemSubmit = (e) => {
    e.preventDefault();
    if (!itemForm.name.trim() || !itemForm.price) {
      onToast?.('Completa el nombre y el precio del producto/servicio', 'error');
      return;
    }
    const priceNum = parseFloat(itemForm.price) || 0;
    const stockNum = parseInt(itemForm.stock || '1', 10);
    const buyerPts = parseInt(itemForm.buyerPoints || '0', 10) || Math.round(priceNum * 5);
    const sellerPts = parseInt(itemForm.sellerPoints || '0', 10) || Math.max(15, Math.round(buyerPts * 0.45));
    const chosenAlly = allies.find((a) => a.id === itemForm.allyId);

    onSaveItem?.({
      id: editingItemId || `item-${Date.now()}`,
      allyId: itemForm.allyId,
      verticalId: itemForm.verticalId,
      subcategory: itemForm.subcategory,
      itemType: itemForm.itemType,
      name: itemForm.name.trim(),
      spec: itemForm.spec.trim() || `${chosenAlly?.brandName || 'ÁPEX'} • Calidad Verificada`,
      images: itemForm.images.slice(0, MAX_PHOTOS),
      price: priceNum,
      consumerPromoPercent: parseInt(itemForm.consumerPromoPercent || '0', 10) || 0,
      dealerDiscountPercent: parseInt(itemForm.dealerDiscountPercent || '20', 10) || 0,
      stock: Math.max(0, stockNum),
      buyerPoints: buyerPts,
      sellerPoints: sellerPts,
      qrSerial:
        itemForm.qrSerial.trim() ||
        `APX-${(itemForm.verticalId || 'ECO').slice(0, 3).toUpperCase()}-${Math.floor(
          1000 + Math.random() * 8999
        )}`,
      qualityApproved: true,
      trackingRule: {
        enabled: itemForm.trackingEnabled,
        intervalDays: parseInt(itemForm.intervalDays || '90', 10) || 90,
        intervalKm: parseInt(itemForm.intervalKm || '0', 10) || 0,
        reminderLabel: itemForm.reminderLabel.trim() || 'Recordatorio de mantenimiento ÁPEX',
        checkupQuestion:
          itemForm.checkupQuestion.trim() || '¿Cómo ha sido tu experiencia tras la compra?'
      },
      techSpecs: {
        gradeOrMaterial: itemForm.gradeOrMaterial.trim() || 'Especificación verificada ÁPEX',
        normOrCert: itemForm.normOrCert.trim() || 'Aprobado en auditoría de calidad',
        presentation: itemForm.presentation.trim() || 'Presentación oficial del aliado',
        lifespan: itemForm.lifespan.trim() || 'Garantía y respaldo ÁPEX'
      },
      recommendation: {
        idealFor:
          itemForm.idealFor.trim() ||
          `Clientes y comercios que buscan ${itemForm.subcategory.toLowerCase()}.`,
        difference:
          itemForm.difference.trim() ||
          'Filtrado y aprobado por el equipo técnico ÁPEX con doble acumulación de puntos.'
      }
    });

    resetItemForm();
    onToast?.(editingItemId ? 'Stock y ficha actualizados' : 'Producto/servicio publicado en catálogo');
  };

  const handleAdSubmit = (e) => {
    e.preventDefault();
    if (!adForm.advertiser.trim() || !adForm.title.trim()) {
      onToast?.('Completa anunciante y título de publicidad', 'error');
      return;
    }
    onCreateAd?.({
      id: `ad-${Date.now()}`,
      ...adForm,
      advertiser: adForm.advertiser.trim(),
      title: adForm.title.trim(),
      description: adForm.description.trim() || 'Campaña oficial dentro del ecosistema ÁPEX.',
      launchNote: adForm.isLaunch
        ? adForm.launchNote.trim() || `Lanzamiento de ${adForm.advertiser.trim()}`
        : '',
      active: true
    });
    setAdForm({
      advertiser: '',
      tag: 'Publicidad Oficial ÁPEX',
      title: '',
      description: '',
      image: PHOTO_PRESETS[3],
      ctaText: 'Ver Aliado',
      targetSection: 'allies',
      isLaunch: false,
      launchNote: ''
    });
    onToast?.('Publicidad cargada en la app');
  };

  const selectedVerticalObj =
    VERTICALS.find((v) => v.id === allyForm.verticalId) || VERTICALS[0];
  const selectedItemVerticalObj =
    VERTICALS.find((v) => v.id === itemForm.verticalId) || VERTICALS[0];

  return (
    <div className="space-y-5 text-xs">
      {/* Pestañas maestras del equipo ÁPEX */}
      <div className="grid grid-cols-4 gap-1 bg-[#141418] border border-zinc-800 p-1 rounded-2xl">
        <button
          onClick={() => setSection('allies')}
          className={`py-2 rounded-xl font-extrabold text-[10px] flex flex-col items-center gap-0.5 ${
            section === 'allies' ? 'bg-orange-500 text-white' : 'text-zinc-400'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Aliados/Calidad</span>
        </button>
        <button
          onClick={() => setSection('catalog')}
          className={`py-2 rounded-xl font-extrabold text-[10px] flex flex-col items-center gap-0.5 ${
            section === 'catalog' ? 'bg-orange-500 text-white' : 'text-zinc-400'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Stock (10 fotos)</span>
        </button>
        <button
          onClick={() => setSection('ads')}
          className={`py-2 rounded-xl font-extrabold text-[10px] flex flex-col items-center gap-0.5 ${
            section === 'ads' ? 'bg-orange-500 text-white' : 'text-zinc-400'
          }`}
        >
          <Megaphone className="w-3.5 h-3.5" />
          <span>Publicidad</span>
        </button>
        <button
          onClick={() => setSection('orders')}
          className={`py-2 rounded-xl font-extrabold text-[10px] flex flex-col items-center gap-0.5 ${
            section === 'orders' ? 'bg-orange-500 text-white' : 'text-zinc-400'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Pedidos/Pts</span>
        </button>
      </div>

      {/* =========================================================
          1. ALIADOS, FILTRO DE CALIDAD TOTAL Y SELLO ÁPEX
      ========================================================= */}
      {section === 'allies' && (
        <div className="space-y-4">
          <form
            onSubmit={handleAllySubmit}
            className="bg-[#141418] border border-zinc-800 rounded-3xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {editingAllyId ? 'Editar Aliado y Auditoría' : 'Crear Perfil de Aliado Verificado'}
              </span>
              {editingAllyId && (
                <button
                  type="button"
                  onClick={resetAllyForm}
                  className="text-[11px] text-zinc-400 underline"
                >
                  Cancelar edición
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={allyForm.brandName}
                onChange={(e) => setAllyForm({ ...allyForm, brandName: e.target.value })}
                placeholder="Nombre de marca/taller/médico *"
                className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
              />
              <input
                type="text"
                value={allyForm.handle}
                onChange={(e) => setAllyForm({ ...allyForm, handle: e.target.value })}
                placeholder="@usuario_aliado"
                className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">Sección Principal</label>
                <select
                  value={allyForm.verticalId}
                  onChange={(e) => {
                    const v = VERTICALS.find((item) => item.id === e.target.value) || VERTICALS[0];
                    setAllyForm({
                      ...allyForm,
                      verticalId: v.id,
                      subcategory: v.subcategories[0],
                      specialtyRole: v.affiliateRoles[0]
                    });
                  }}
                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-2.5 py-2 text-white outline-none"
                >
                  {VERTICALS.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">Subsección</label>
                <select
                  value={allyForm.subcategory}
                  onChange={(e) => setAllyForm({ ...allyForm, subcategory: e.target.value })}
                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-2.5 py-2 text-white outline-none"
                >
                  {selectedVerticalObj.subcategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <select
                value={allyForm.specialtyRole}
                onChange={(e) => setAllyForm({ ...allyForm, specialtyRole: e.target.value })}
                className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-2.5 py-2 text-white outline-none"
              >
                {selectedVerticalObj.affiliateRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={allyForm.city}
                onChange={(e) => setAllyForm({ ...allyForm, city: e.target.value })}
                placeholder="Ciudad / Zona"
                className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
              />
            </div>

            <textarea
              rows={2}
              value={allyForm.bio}
              onChange={(e) => setAllyForm({ ...allyForm, bio: e.target.value })}
              placeholder="Descripción del aliado, servicios, cobertura o productos..."
              className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
            />

            {/* Checklist del Filtro de Calidad Total ÁPEX */}
            <div className="bg-[#0A0A0C] border border-zinc-800 rounded-2xl p-3 space-y-2">
              <span className="text-[10px] font-extrabold text-emerald-400 uppercase block">
                Filtro de Calidad y Sello ÁPEX
              </span>
              {QUALITY_FILTER_STAGES.map((st) => (
                <label
                  key={st.id}
                  className="flex items-center justify-between gap-2 text-[11px] text-zinc-200 cursor-pointer"
                >
                  <span>{st.label}</span>
                  <input
                    type="checkbox"
                    checked={Boolean(allyForm[st.id])}
                    onChange={(e) =>
                      setAllyForm({ ...allyForm, [st.id]: e.target.checked })
                    }
                  />
                </label>
              ))}
              <input
                type="text"
                value={allyForm.auditorNote}
                onChange={(e) => setAllyForm({ ...allyForm, auditorNote: e.target.value })}
                placeholder="Dictamen técnico del evaluador ÁPEX"
                className="w-full bg-[#141418] border border-zinc-800 rounded-xl px-2.5 py-1.5 text-[11px] text-white outline-none mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-extrabold"
            >
              {editingAllyId ? 'Guardar Cambios del Aliado' : 'Crear Perfil de Aliado'}
            </button>
          </form>

          {/* Listado de aliados */}
          <div className="space-y-3">
            {allies.map((ally) => {
              const vertical = VERTICALS.find((v) => v.id === ally.verticalId);
              return (
                <div
                  key={ally.id}
                  className="bg-[#141418] border border-zinc-800 rounded-2xl p-4 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="font-extrabold text-white">{ally.brandName}</h4>
                        {ally.qualityApproved ? (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                            ✓ Sello Calidad ÁPEX
                          </span>
                        ) : (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                            En evaluación
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-orange-400 mt-0.5">
                        {vertical?.name || 'Sección'} • {ally.subcategory}
                      </p>
                      <p className="text-[10px] text-zinc-400">
                        {ally.handle} • Puntos acumulados como aliado:{' '}
                        <strong className="text-amber-300">{ally.pointsEarnedByAlly || 0} pts</strong>
                      </p>
                    </div>

                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => startEditAlly(ally)}
                        className="p-2 rounded-xl bg-[#0A0A0C] border border-zinc-800 text-orange-400"
                        title="Editar"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          onDeleteAlly?.(ally.id);
                          onToast?.('Aliado eliminado');
                        }}
                        className="p-2 rounded-xl bg-[#0A0A0C] border border-zinc-800 text-red-400"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Botones rápidos para marcar cada etapa de auditoría */}
                  <div className="grid grid-cols-4 gap-1 pt-1">
                    {QUALITY_FILTER_STAGES.map((st, idx) => {
                      const ok = Boolean(ally.qualityAudit?.[st.id]);
                      return (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => onToggleAuditStage?.(ally.id, st.id)}
                          className={`py-1 px-1.5 rounded-lg text-[10px] font-bold border ${
                            ok
                              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                              : 'bg-[#0A0A0C] border-zinc-800 text-zinc-500'
                          }`}
                        >
                          Filtro {idx + 1} {ok ? '✓' : '○'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================
          2. STOCK DE ALIADOS Y PRODUCTOS (HASTA 10 FOTOS)
      ========================================================= */}
      {section === 'catalog' && (
        <div className="space-y-4">
          <form
            onSubmit={handleItemSubmit}
            className="bg-[#141418] border border-zinc-800 rounded-3xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-white flex items-center gap-1.5">
                <ImagePlus className="w-4 h-4 text-orange-400" />
                {editingItemId ? 'Editar Producto / Stock' : 'Cargar Stock de Aliado (Hasta 10 Fotos)'}
              </span>
              {editingItemId && (
                <button
                  type="button"
                  onClick={resetItemForm}
                  className="text-[11px] text-zinc-400 underline"
                >
                  Nuevo
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">Aliado / Marca</label>
                <select
                  value={itemForm.allyId}
                  onChange={(e) => {
                    const foundAlly = allies.find((a) => a.id === e.target.value);
                    setItemForm({
                      ...itemForm,
                      allyId: e.target.value,
                      verticalId: foundAlly?.verticalId || itemForm.verticalId,
                      subcategory: foundAlly?.subcategory || itemForm.subcategory
                    });
                  }}
                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-2.5 py-2 text-white outline-none"
                >
                  {allies.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.brandName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">Tipo</label>
                <select
                  value={itemForm.itemType}
                  onChange={(e) => setItemForm({ ...itemForm, itemType: e.target.value })}
                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-2.5 py-2 text-white outline-none"
                >
                  <option value="product">Producto físico</option>
                  <option value="service">Servicio / Alquiler / Consulta</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <select
                value={itemForm.verticalId}
                onChange={(e) => {
                  const v = VERTICALS.find((item) => item.id === e.target.value) || VERTICALS[0];
                  setItemForm({
                    ...itemForm,
                    verticalId: v.id,
                    subcategory: v.subcategories[0]
                  });
                }}
                className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-2.5 py-2 text-white outline-none"
              >
                {VERTICALS.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>

              <select
                value={itemForm.subcategory}
                onChange={(e) => setItemForm({ ...itemForm, subcategory: e.target.value })}
                className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-2.5 py-2 text-white outline-none"
              >
                {selectedItemVerticalObj.subcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              required
              value={itemForm.name}
              onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
              placeholder="Nombre del producto o servicio *"
              className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
            />

            <input
              type="text"
              value={itemForm.spec}
              onChange={(e) => setItemForm({ ...itemForm, spec: e.target.value })}
              placeholder="Resumen técnico breve (ej: API SP • Garrafa 4L)"
              className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
            />

            {/* Galería de hasta 10 fotos */}
            <div className="bg-[#0A0A0C] border border-zinc-800 rounded-2xl p-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-orange-400">
                  Fotos del producto ({itemForm.images.length}/{MAX_PHOTOS})
                </span>
                <label className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer">
                  <Upload className="w-3 h-3 text-orange-400" /> Subir foto
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileToBase64(e, (url) => addPhotoToItemForm(url))
                    }
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={photoUrlInput}
                  onChange={(e) => setPhotoUrlInput(e.target.value)}
                  placeholder="O pega URL de imagen..."
                  className="flex-1 bg-[#141418] border border-zinc-800 rounded-xl px-2.5 py-1.5 text-[11px] text-white outline-none"
                />
                <button
                  type="button"
                  onClick={() => addPhotoToItemForm(photoUrlInput)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 text-white font-bold text-[11px]"
                >
                  + Foto
                </button>
              </div>

              <div className="grid grid-cols-5 gap-1.5">
                {itemForm.images.map((imgUrl, idx) => (
                  <div
                    key={`${idx}-${imgUrl.slice(-8)}`}
                    className="relative aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-zinc-700"
                  >
                    <img
                      src={imgUrl}
                      alt={`Foto ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhotoFromItemForm(idx)}
                      className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/80 text-red-400 flex items-center justify-center"
                      title="Quitar foto"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">Precio ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={itemForm.price}
                  onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-2.5 py-2 text-white outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">Stock *</label>
                <input
                  type="number"
                  required
                  value={itemForm.stock}
                  onChange={(e) => setItemForm({ ...itemForm, stock: e.target.value })}
                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-2.5 py-2 text-white outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">Desc. Tienda %</label>
                <input
                  type="number"
                  value={itemForm.dealerDiscountPercent}
                  onChange={(e) =>
                    setItemForm({ ...itemForm, dealerDiscountPercent: e.target.value })
                  }
                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-2.5 py-2 text-white outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-amber-400 block mb-1">Puntos Comprador</label>
                <input
                  type="number"
                  value={itemForm.buyerPoints}
                  onChange={(e) => setItemForm({ ...itemForm, buyerPoints: e.target.value })}
                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-2.5 py-2 text-white outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-emerald-400 block mb-1">
                  Puntos Aliado Vendedor
                </label>
                <input
                  type="number"
                  value={itemForm.sellerPoints}
                  onChange={(e) => setItemForm({ ...itemForm, sellerPoints: e.target.value })}
                  className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-2.5 py-2 text-white outline-none"
                />
              </div>
            </div>

            <input
              type="text"
              value={itemForm.gradeOrMaterial}
              onChange={(e) => setItemForm({ ...itemForm, gradeOrMaterial: e.target.value })}
              placeholder="Ficha técnica: material / viscosidad / especificación"
              className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
            />

            <input
              type="text"
              value={itemForm.difference}
              onChange={(e) => setItemForm({ ...itemForm, difference: e.target.value })}
              placeholder="Ventaja o diferencia aprobada por ÁPEX"
              className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
            />

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" />
              {editingItemId ? 'Guardar Cambios' : 'Publicar en Stock del Aliado'}
            </button>
          </form>

          <div className="space-y-2.5">
            {items.map((it) => {
              const ally = allies.find((a) => a.id === it.allyId);
              const photoCount = Array.isArray(it.images) ? it.images.length : 1;
              return (
                <div
                  key={it.id}
                  className="bg-[#141418] border border-zinc-800 rounded-2xl p-3 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={it.images?.[0] || PHOTO_PRESETS[0]}
                      alt={it.name}
                      className="w-11 h-11 rounded-xl object-cover bg-zinc-900 shrink-0"
                    />
                    <div className="min-w-0">
                      <h5 className="font-bold text-white truncate">{it.name}</h5>
                      <p className="text-[10px] text-zinc-400 truncate">
                        {ally?.brandName || 'ÁPEX'} • ${Number(it.price).toFixed(2)} • Stock:{' '}
                        {it.stock} • {photoCount} foto(s)
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => startEditItem(it)}
                      className="p-2 rounded-xl bg-[#0A0A0C] text-orange-400"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onDeleteItem?.(it.id);
                        onToast?.('Ítem eliminado');
                      }}
                      className="p-2 rounded-xl bg-[#0A0A0C] text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================
          3. PUBLICIDAD GRÁFICA Y LANZAMIENTOS (SUBIDOS POR ADMIN)
      ========================================================= */}
      {section === 'ads' && (
        <div className="space-y-4">
          <form
            onSubmit={handleAdSubmit}
            className="bg-[#141418] border border-zinc-800 rounded-3xl p-4 space-y-3"
          >
            <span className="font-extrabold text-white flex items-center gap-1.5">
              <Megaphone className="w-4 h-4 text-orange-400" /> Subir Publicidad Propia en la App
            </span>

            <input
              type="text"
              required
              value={adForm.advertiser}
              onChange={(e) => setAdForm({ ...adForm, advertiser: e.target.value })}
              placeholder="Marca / Anunciante *"
              className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
            />
            <input
              type="text"
              required
              value={adForm.title}
              onChange={(e) => setAdForm({ ...adForm, title: e.target.value })}
              placeholder="Título de campaña o lanzamiento *"
              className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
            />
            <input
              type="text"
              value={adForm.description}
              onChange={(e) => setAdForm({ ...adForm, description: e.target.value })}
              placeholder="Mensaje breve"
              className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
            />

            <label className="w-full py-2.5 px-3 rounded-xl bg-[#0A0A0C] border border-dashed border-zinc-700 text-zinc-200 flex items-center justify-center gap-2 cursor-pointer">
              <Upload className="w-4 h-4 text-orange-400" />
              <span>Subir imagen publicitaria diseñada</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileToBase64(e, (url) => setAdForm((prev) => ({ ...prev, image: url })))
                }
                className="hidden"
              />
            </label>

            <label className="flex items-center gap-2 bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 cursor-pointer">
              <input
                type="checkbox"
                checked={adForm.isLaunch}
                onChange={(e) => setAdForm({ ...adForm, isLaunch: e.target.checked })}
              />
              <span className="text-amber-300 font-bold">
                Mostrar como Aviso de Lanzamiento en toda la app
              </span>
            </label>

            {adForm.isLaunch && (
              <input
                type="text"
                value={adForm.launchNote}
                onChange={(e) => setAdForm({ ...adForm, launchNote: e.target.value })}
                placeholder="Texto del lanzamiento (Ej: Nuevo producto disponible hoy)"
                className="w-full bg-[#0A0A0C] border border-amber-500/40 rounded-xl px-3 py-2 text-white outline-none"
              />
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-orange-500 text-white font-extrabold"
            >
              Publicar Anuncio en la App
            </button>
          </form>

          <div className="space-y-2.5">
            {ads.map((ad) => (
              <div
                key={ad.id}
                className="bg-[#141418] border border-zinc-800 rounded-2xl p-3 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {ad.image && (
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-11 h-11 rounded-xl object-cover bg-zinc-900 shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-orange-400 block truncate">
                      {ad.advertiser}
                    </span>
                    <h5 className="font-bold text-white truncate">{ad.title}</h5>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => onToggleAd?.(ad.id)}
                    className={`p-2 rounded-xl border ${
                      ad.active
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                        : 'bg-[#0A0A0C] border-zinc-800 text-zinc-500'
                    }`}
                  >
                    {ad.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => onDeleteAd?.(ad.id)}
                    className="p-2 rounded-xl bg-[#0A0A0C] text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          4. PEDIDOS Y DOBLE ACUMULACIÓN DE PUNTOS (COMPRADOR + ALIADO)
      ========================================================= */}
      {section === 'orders' && (
        <div className="space-y-3">
          {ordersHistory.length === 0 ? (
            <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-5 text-center text-zinc-400">
              Aún no hay pedidos registrados.
            </div>
          ) : (
            ordersHistory.map((ord) => (
              <div
                key={ord.id}
                className="bg-[#141418] border border-zinc-800 rounded-2xl p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-white">{ord.id}</span>
                  <span className="text-sm font-black text-emerald-400">
                    ${Number(ord.total || 0).toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-300">
                  Comprador: <strong>{ord.customerName}</strong> • Aliado:{' '}
                  <strong className="text-orange-300">{ord.allyName || 'Ecosistema ÁPEX'}</strong>
                </p>
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-zinc-800/80">
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> Comprador: +{ord.buyerPoints || 0} pts
                  </span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Aliado: +{ord.sellerPoints || 0} pts
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
