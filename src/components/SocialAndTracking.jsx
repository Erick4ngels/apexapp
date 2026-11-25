import React, { useState } from 'react';
import {
  QrCode,
  Share2,
  UserPlus,
  UserCheck,
  BellRing,
  Camera,
  Video,
  Heart,
  CheckCircle2,
  Sparkles,
  CalendarClock,
  Gauge,
  ShoppingBag
} from 'lucide-react';

export default function SocialAndTracking({
  currentUser,
  allUsers = [],
  allies = [],
  ordersHistory = [],
  posts = [],
  onToggleFollow,
  onCreateVerifiedPost,
  onToggleLikePost,
  onUpdateMileage,
  onOpenAuth,
  onToast
}) {
  const [subTab, setSubTab] = useState('feed'); // 'feed' | 'tracking' | 'qr'
  const [followInput, setFollowInput] = useState('');
  const [mileageDraft, setMileageDraft] = useState('');

  // Formulario de publicación verificada (solo compras reales)
  const userOrders = currentUser
    ? ordersHistory.filter((o) => o.userId === currentUser.id)
    : [];

  const [selectedOrderId, setSelectedOrderId] = useState(
    userOrders[0]?.id || ''
  );
  const [rating, setRating] = useState(5);
  const [caption, setCaption] = useState('');
  const [mediaType, setMediaType] = useState('image');
  const [mediaUrl, setMediaUrl] = useState(
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80'
  );
  const [checkupAnswers, setCheckupAnswers] = useState({});

  const followingList = currentUser?.following || [];
  const followersCount = currentUser?.followers?.length || 0;

  const handleFollowSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth?.('register');
      return;
    }
    const clean = followInput.trim().toLowerCase();
    if (!clean) return;

    const targetAlly = allies.find(
      (a) =>
        a.handle?.toLowerCase() === clean ||
        a.brandName?.toLowerCase().includes(clean)
    );
    if (targetAlly) {
      onToggleFollow?.({ type: 'ally', id: targetAlly.id, label: targetAlly.brandName });
      setFollowInput('');
      return;
    }

    const targetUser = allUsers.find(
      (u) =>
        u.id !== currentUser.id &&
        (u.handle?.toLowerCase() === clean ||
          u.referralCode?.toLowerCase() === clean ||
          u.name?.toLowerCase().includes(clean))
    );
    if (targetUser) {
      onToggleFollow?.({ type: 'user', id: targetUser.id, label: targetUser.name });
      setFollowInput('');
      return;
    }

    onToast?.('No se encontró ese usuario o aliado (@handle o código)', 'error');
  };

  const handlePublishPost = (e) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth?.('login');
      return;
    }
    if (userOrders.length === 0) {
      onToast?.(
        'Solo puedes publicar reseñas con foto o video de productos que hayas comprado en ÁPEX',
        'error'
      );
      return;
    }
    if (!caption.trim()) {
      onToast?.('Cuéntanos qué resultado te dio el producto comprado', 'error');
      return;
    }

    const activeOrder =
      userOrders.find((o) => o.id === selectedOrderId) || userOrders[0];

    onCreateVerifiedPost?.({
      orderId: activeOrder.id,
      itemName: activeOrder.itemsSummary || `Pedido ${activeOrder.id}`,
      allyName: activeOrder.allyName || 'Ecosistema ÁPEX',
      rating,
      caption: caption.trim(),
      mediaType,
      mediaUrl: mediaUrl.trim()
    });

    setCaption('');
    onToast?.('¡Publicación verificada compartida en la comunidad ÁPEX!');
  };

  const handleMediaFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isVideo = file.type.startsWith('video/');
    setMediaType(isVideo ? 'video' : 'image');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setMediaUrl(reader.result);
        onToast?.(isVideo ? 'Video adjuntado' : 'Foto adjuntada');
      }
    };
    reader.readAsDataURL(file);
  };

  // Recordatorios de mantenimiento generados desde compras del usuario
  const trackedPurchases = userOrders.map((ord, idx) => {
    const isOilOrFluid =
      (ord.itemsSummary || '').toLowerCase().includes('aceite') ||
      (ord.itemsSummary || '').toLowerCase().includes('refrigerante') ||
      (ord.itemsSummary || '').toLowerCase().includes('lubricante') ||
      idx === 0;

    return {
      orderId: ord.id,
      title: ord.itemsSummary || 'Producto ÁPEX adquirido',
      reminderTitle: isOilOrFluid
        ? 'Próximo cambio de aceite / revisión de fluidos'
        : 'Revisión periódica de rendimiento y garantía',
      daysLeft: isOilOrFluid ? 45 : 30,
      targetKm: isOilOrFluid ? 7500 : null,
      question: isOilOrFluid
        ? '¿Cómo está respondiendo el motor en temperatura y arranque tras usar este producto?'
        : '¿Cómo ha sido tu experiencia y resultado con este producto/servicio?'
    };
  });

  const userHandle =
    currentUser?.handle ||
    `@${(currentUser?.name || 'invitado')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .slice(0, 12)}_apex`;

  return (
    <div className="space-y-5 text-xs">
      {/* Selector interno: Comunidad Verificada | Seguimiento | Mi QR Social */}
      <div className="grid grid-cols-3 gap-1.5 bg-[#141418] border border-zinc-800 p-1.5 rounded-2xl">
        <button
          onClick={() => setSubTab('feed')}
          className={`py-2 rounded-xl font-extrabold text-[11px] flex items-center justify-center gap-1 transition ${
            subTab === 'feed' ? 'bg-orange-500 text-white' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> Resultados
        </button>
        <button
          onClick={() => setSubTab('tracking')}
          className={`py-2 rounded-xl font-extrabold text-[11px] flex items-center justify-center gap-1 transition ${
            subTab === 'tracking' ? 'bg-orange-500 text-white' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <BellRing className="w-3.5 h-3.5" /> Seguimiento
        </button>
        <button
          onClick={() => setSubTab('qr')}
          className={`py-2 rounded-xl font-extrabold text-[11px] flex items-center justify-center gap-1 transition ${
            subTab === 'qr' ? 'bg-orange-500 text-white' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" /> Mi QR Social
        </button>
      </div>

      {/* =========================================================
          1. FEED SOCIAL DE COMPRAS VERIFICADAS (FOTO / VIDEO)
      ========================================================= */}
      {subTab === 'feed' && (
        <div className="space-y-5">
          {currentUser ? (
            <form
              onSubmit={handlePublishPost}
              className="bg-[#141418] border border-zinc-800 rounded-3xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-white flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-orange-400" /> Publicar Resultado de Compra
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                  Solo Compras Reales
                </span>
              </div>

              {userOrders.length === 0 ? (
                <div className="bg-[#0A0A0C] border border-zinc-800/90 rounded-2xl p-3.5 text-[11px] text-zinc-400 flex items-start gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>
                    Para mantener la comunidad 100% real, solo puedes subir fotos o videos de
                    productos o servicios que ya hayas comprado en ÁPEX.
                  </span>
                </div>
              ) : (
                <>
                  <select
                    value={selectedOrderId || userOrders[0]?.id}
                    onChange={(e) => setSelectedOrderId(e.target.value)}
                    className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                  >
                    {userOrders.map((ord) => (
                      <option key={ord.id} value={ord.id}>
                        Compra {ord.id} • {ord.itemsSummary || 'Producto ÁPEX'}
                      </option>
                    ))}
                  </select>

                  <textarea
                    rows={2}
                    required
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="¿Cómo te funcionó? Comparte tu experiencia real para ayudar a otros..."
                    className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                  />

                  <div className="flex items-center justify-between gap-2">
                    <label className="flex-1 py-2 px-3 rounded-xl bg-[#0A0A0C] border border-dashed border-zinc-700 text-zinc-300 flex items-center justify-center gap-1.5 cursor-pointer">
                      {mediaType === 'video' ? (
                        <Video className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <Camera className="w-3.5 h-3.5 text-orange-400" />
                      )}
                      <span>{mediaType === 'video' ? 'Cambiar video' : 'Subir foto o video'}</span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleMediaFile}
                        className="hidden"
                      />
                    </label>

                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="bg-[#0A0A0C] border border-zinc-800 rounded-xl px-2.5 py-2 text-amber-400 font-bold outline-none"
                    >
                      <option value={5}>★★★★★ (5/5)</option>
                      <option value={4}>★★★★☆ (4/5)</option>
                      <option value={3}>★★★☆☆ (3/5)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold transition"
                  >
                    Publicar Referencia Verificada
                  </button>
                </>
              )}
            </form>
          ) : (
            <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-4 flex items-center justify-between gap-3">
              <p className="text-[11px] text-zinc-400">
                Inicia sesión para ver tus compras y compartir reseñas verificadas.
              </p>
              <button
                onClick={() => onOpenAuth?.('login')}
                className="px-3.5 py-2 rounded-xl bg-orange-500 text-white font-extrabold shrink-0"
              >
                Entrar
              </button>
            </div>
          )}

          <div className="space-y-4">
            {posts.map((post) => {
              const liked = currentUser && post.likes?.includes(currentUser.id);
              return (
                <article
                  key={post.id}
                  className="bg-[#141418] border border-zinc-800 rounded-3xl overflow-hidden space-y-3"
                >
                  <div className="px-4 pt-4 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-white">{post.userName}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Compra Verificada
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-500">
                        {post.userHandle} • {post.createdAt || 'Reciente'}
                      </span>
                    </div>
                    <span className="text-amber-400 text-xs font-bold">
                      {'★'.repeat(post.rating || 5)}
                    </span>
                  </div>

                  <div className="px-4">
                    <div className="bg-[#0A0A0C] border border-zinc-800/80 rounded-xl px-3 py-1.5 text-[11px] text-orange-300 font-semibold">
                      Producto: {post.itemName} • {post.allyName}
                    </div>
                    <p className="text-zinc-200 mt-2 leading-relaxed">{post.caption}</p>
                  </div>

                  {post.mediaUrl && (
                    <div className="bg-black max-h-56 overflow-hidden">
                      {post.mediaType === 'video' ? (
                        <video
                          src={post.mediaUrl}
                          controls
                          className="w-full max-h-56 object-cover"
                        />
                      ) : (
                        <img
                          src={post.mediaUrl}
                          alt={post.itemName}
                          className="w-full max-h-56 object-cover"
                        />
                      )}
                    </div>
                  )}

                  <div className="px-4 pb-3.5 flex items-center justify-between pt-1">
                    <button
                      onClick={() => onToggleLikePost?.(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
                        liked
                          ? 'bg-rose-500/15 border-rose-500/40 text-rose-400'
                          : 'bg-[#0A0A0C] border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-rose-400' : ''}`} />
                      <span>{(post.likes?.length || 0) + (post.baseLikes || 0)}</span>
                    </button>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      Ref: {post.orderId || 'VERIF'}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================
          2. SEGUIMIENTO POST-COMPRA Y RECORDATORIOS DE CAMBIO
      ========================================================= */}
      {subTab === 'tracking' && (
        <div className="space-y-4">
          <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-white flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-orange-400" /> Kilometraje Actual del Vehículo
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {currentUser?.currentMileage
                  ? `${Number(currentUser.currentMileage).toLocaleString()} km`
                  : 'Sin registrar'}
              </span>
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                value={mileageDraft}
                onChange={(e) => setMileageDraft(e.target.value)}
                placeholder="Ej: 84500"
                className="flex-1 bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
              />
              <button
                onClick={() => {
                  if (!currentUser) {
                    onOpenAuth?.('login');
                    return;
                  }
                  if (!mileageDraft.trim()) return;
                  onUpdateMileage?.(Number(mileageDraft));
                  setMileageDraft('');
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 text-white font-extrabold"
              >
                Actualizar
              </button>
            </div>
          </div>

          {!currentUser || trackedPurchases.length === 0 ? (
            <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-5 text-center space-y-2 text-zinc-400">
              <CalendarClock className="w-8 h-8 text-orange-400 mx-auto" />
              <p className="font-bold text-white">Seguimiento Activo ÁPEX</p>
              <p className="text-[11px]">
                Cuando compres un aceite, refrigerante o producto con ciclo de mantenimiento, ÁPEX
                activará aquí tus preguntas de control y recordatorios de próximo cambio.
              </p>
            </div>
          ) : (
            trackedPurchases.map((trk) => {
              const answered = checkupAnswers[trk.orderId];
              return (
                <div
                  key={trk.orderId}
                  className="bg-[#141418] border border-zinc-800 rounded-3xl p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300">
                      Recordatorio en ~{trk.daysLeft} días
                      {trk.targetKm ? ` o +${trk.targetKm.toLocaleString()} km` : ''}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">{trk.orderId}</span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-white">{trk.reminderTitle}</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Compra: {trk.title}</p>
                  </div>

                  <div className="bg-[#0A0A0C] border border-zinc-800/90 rounded-2xl p-3 space-y-2">
                    <p className="text-[11px] text-zinc-200 font-semibold">{trk.question}</p>
                    {answered ? (
                      <span className="text-[11px] text-emerald-400 font-bold block">
                        ✓ Respuesta registrada: "{answered}"
                      </span>
                    ) : (
                      <div className="flex gap-1.5">
                        {['Excelente', 'Todo normal', 'Necesito asesoría'].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setCheckupAnswers((prev) => ({ ...prev, [trk.orderId]: opt }));
                              onToast?.('Seguimiento registrado por ÁPEX');
                            }}
                            className="flex-1 py-1.5 px-2 rounded-lg bg-[#141418] hover:bg-zinc-800 border border-zinc-700 text-[10px] font-bold text-white"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* =========================================================
          3. QR SOCIAL ÚNICO PARA COMPARTIR Y SEGUIRSE
      ========================================================= */}
      {subTab === 'qr' && (
        <div className="space-y-4">
          <div className="bg-[#141418] border border-zinc-800 rounded-3xl p-5 space-y-4 text-center">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-400">
                Identidad Social y Compartir ÁPEX
              </span>
              <h3 className="text-base font-black text-white mt-0.5">
                {currentUser ? currentUser.name : 'Invitado ÁPEX'}
              </h3>
              <p className="text-xs font-mono text-zinc-400">{userHandle}</p>
            </div>

            <div className="w-36 h-36 mx-auto bg-white p-3 rounded-2xl shadow-lg">
              <svg viewBox="0 0 64 64" className="w-full h-full text-zinc-950" fill="currentColor">
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
                <rect x="28" y="24" width="8" height="8" />
                <rect x="44" y="28" width="12" height="8" />
                <rect x="28" y="44" width="10" height="12" />
                <rect x="44" y="44" width="12" height="12" />
              </svg>
            </div>

            <div className="flex justify-center gap-4 text-[11px] text-zinc-300">
              <span>
                <strong className="text-white">{followingList.length}</strong> Siguiendo
              </span>
              <span>•</span>
              <span>
                <strong className="text-white">{followersCount}</strong> Seguidores
              </span>
            </div>

            <button
              onClick={() => {
                const shareText = `Únete a ÁPEX y sígueme como ${userHandle} (Código: ${
                  currentUser?.referralCode || 'APEX2026'
                })`;
                navigator.clipboard?.writeText(shareText);
                onToast?.('Enlace y código social copiados para compartir');
              }}
              className="w-full py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" /> Compartir Mi QR y App ÁPEX
            </button>
          </div>

          {/* Seguir a otro usuario o aliado */}
          <form
            onSubmit={handleFollowSubmit}
            className="bg-[#141418] border border-zinc-800 rounded-3xl p-4 space-y-2.5"
          >
            <label className="font-extrabold text-white block">
              Seguir Usuario o Aliado en ÁPEX
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={followInput}
                onChange={(e) => setFollowInput(e.target.value)}
                placeholder="Ej: @megafreeze o CARLOS-APEX"
                className="flex-1 bg-[#0A0A0C] border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-white text-zinc-950 font-extrabold"
              >
                Seguir
              </button>
            </div>
          </form>

          {/* Aliados destacados para seguir */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold text-zinc-400 block">
              Perfiles Aliados Verificados por ÁPEX
            </span>
            {allies.slice(0, 4).map((ally) => {
              const isFollowing = followingList.includes(ally.id);
              return (
                <div
                  key={ally.id}
                  className="bg-[#141418] border border-zinc-800 rounded-2xl p-3.5 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="font-extrabold text-white truncate">{ally.brandName}</div>
                    <div className="text-[11px] text-zinc-400 truncate">
                      {ally.handle || '@aliado_apex'} • {ally.subcategory}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (!currentUser) {
                        onOpenAuth?.('register');
                        return;
                      }
                      onToggleFollow?.({
                        type: 'ally',
                        id: ally.id,
                        label: ally.brandName
                      });
                    }}
                    className={`px-3 py-1.5 rounded-xl font-extrabold text-[11px] flex items-center gap-1 shrink-0 ${
                      isFollowing
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-orange-500 text-white'
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5" /> Siguiendo
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" /> Seguir
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
