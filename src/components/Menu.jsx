import { useState, useMemo, useEffect, useRef } from 'react';
import { Beer, Utensils, Wine } from 'lucide-react';
import { menuData, seccionesMenu } from '../data/menu';
import { menuDomingoCrudon, seccionesDomingoCrudon } from '../data/menuDomingoCrudon';

// Icono custom de papas fritas estilo Lucide
const Fries = ({ size = 24, strokeWidth = 2, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 10l1.5 11h11L19 10" />
    <line x1="8" y1="10" x2="7" y2="3" />
    <line x1="12" y1="10" x2="12" y2="2" />
    <line x1="16" y1="10" x2="17" y2="3" />
    <line x1="10" y1="10" x2="9.5" y2="4" />
    <line x1="14" y1="10" x2="14.5" y2="4" />
  </svg>
);

const iconoMap = { Beer, Utensils, Fries, Wine };

const NUMERO_WHATSAPP = '527472544725';
const MENSAJE_COCINA = 'Hola, quisiera hacer una orden de la seccion de cocina';

const formatPrecio = (n) => `$${Number(n).toFixed(2)}`;

const PrecioDisplay = ({ producto, onAbrirTransferencia, enFilaCompleta, isDomingo }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onAbrirTransferencia?.();
  };

  const claseBtn = isDomingo
    ? 'inline-flex items-center px-3 py-2 rounded-lg bg-amber-100 text-amber-900 text-xs font-bold active:scale-95 transition-transform shadow-md'
    : 'inline-flex items-center px-3 py-2 rounded-lg bg-menu-cream text-menu-green-bar text-xs font-bold active:scale-95 transition-transform shadow-md';

  if (producto.precios?.length > 0) {
    return (
      <div className={enFilaCompleta ? 'w-full mt-4' : ''}>
        <div className={`flex flex-wrap ${enFilaCompleta ? 'gap-3 justify-center' : 'gap-2 justify-end'}`}>
          {producto.precios.map((p, i) => (
            <button key={i} type="button" onClick={handleClick} className={claseBtn}>
              {p.etiqueta} {formatPrecio(p.precio)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={handleClick} className={`${claseBtn} whitespace-nowrap`}>
        {formatPrecio(producto.precio)}
      </button>
      {producto.promo && (
        <span className="relative inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide bg-red-600 text-white shadow-md shadow-red-600/30 animate-pulse">
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full" />
          {producto.promo}
        </span>
      )}
    </div>
  );
};

const BloqueCategoria = ({ cat, onAbrirTransferencia, isDomingo }) => {
  const headerBg = isDomingo
    ? 'bg-amber-900/80 border-amber-200/30'
    : 'bg-menu-green/90 border-menu-cream/20';
  const headerText = isDomingo ? 'text-amber-100' : 'text-menu-cream';
  const cardBg = isDomingo
    ? 'bg-amber-950/70 border-amber-200/20'
    : 'bg-menu-green/80 border-menu-cream/20';
  const textPrimary = isDomingo ? 'text-amber-50' : 'text-menu-cream';
  const textSecondary = isDomingo ? 'text-amber-200/65' : 'text-menu-cream/65';
  const textDesc = isDomingo ? 'text-amber-200/70' : 'text-menu-cream/70';

  return (
    <section className="space-y-3">
      <div className={`px-4 py-2.5 rounded-xl flex items-center gap-2 ${headerBg} shadow-lg`}>
        <span className="text-base">{isDomingo ? '🍖' : '🍃'}</span>
        <h2 className={`font-slab text-base font-bold uppercase tracking-wide ${headerText}`}>
          {cat.nombre}
        </h2>
      </div>

      {cat.descripcionCategoria && cat.productos.length > 0 && (
        <div className={`px-4 py-2.5 rounded-xl border ${cardBg}`}>
          <p className={`text-xs italic ${textDesc}`}>{cat.descripcionCategoria}</p>
        </div>
      )}

      {cat.descripcion && cat.productos.length === 0 && (
        <div className={`px-4 py-3 rounded-xl border text-center ${cardBg}`}>
          <p className={`font-slab font-semibold text-sm uppercase tracking-wide mb-1 ${textPrimary}`}>
            {cat.nombre}
          </p>
          <p className={`text-sm font-medium ${textPrimary} opacity-90`}>{cat.descripcion}</p>
        </div>
      )}

      {cat.descripcionCategoria && cat.productos.length === 0 && (
        <div className={`px-4 py-3 rounded-xl border text-center ${cardBg}`}>
          <p className={`font-slab font-semibold text-sm uppercase tracking-wide mb-1 ${textPrimary}`}>Elige tu salsa</p>
          <p className={`text-sm font-medium ${textPrimary} opacity-90`}>{cat.descripcionCategoria}</p>
        </div>
      )}

      <div className="space-y-3">
        {cat.productos.map((producto) => {
          const enFilaCompleta = (producto.precios?.length || 0) >= 3;
          return (
            <div
              key={producto.id}
              className={`rounded-xl p-4 ${cardBg} ${
                enFilaCompleta ? 'text-center' : 'flex flex-wrap items-start justify-between gap-3'
              }`}
            >
              <div className={enFilaCompleta ? 'mb-2' : 'flex-1 min-w-0'}>
                <h3 className={`font-body font-semibold text-base ${textPrimary}`}>
                  {producto.nombre}
                </h3>
                {producto.descripcion && (
                  <p className={`text-xs mt-1 ${textSecondary}`}>{producto.descripcion}</p>
                )}
              </div>
              <PrecioDisplay
                producto={producto}
                onAbrirTransferencia={onAbrirTransferencia}
                enFilaCompleta={enFilaCompleta}
                isDomingo={isDomingo}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

// Logo The Green Garden
const LogoGreen = () => (
  <div className="inline-flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-menu-cream mb-4">
    <span className="text-menu-cream text-[9px] tracking-[0.2em] font-body uppercase">THE</span>
    <span className="text-menu-cream font-script text-2xl font-semibold">Green</span>
    <span className="text-menu-cream text-[9px] tracking-[0.2em] font-body uppercase">GARDEN</span>
  </div>
);

// Logo Domingo Crudon
const LogoDomingo = () => (
  <div className="inline-flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-amber-300/80 mb-4 bg-amber-950/60">
    <span className="text-amber-200 text-[7px] tracking-[0.15em] font-body uppercase">BIRRIA DE</span>
    <span className="text-amber-100 font-elegant text-lg font-bold leading-tight">Domingo</span>
    <span className="text-amber-200 text-[7px] tracking-[0.15em] font-body uppercase">CRUDON</span>
  </div>
);

const Menu = ({ onAbrirTransferencia, onSeccionChange, initialSeccion, onMenuChange, menuActivo: menuActivoProp }) => {
  const setMenuActivo = (val) => {
    onMenuChange?.(val);
  };
  const menuActivo = menuActivoProp || 'green';
  const [seccionActiva, setSeccionActiva] = useState(initialSeccion ?? 'bebidas');
  const tabsContainerRef = useRef(null);
  const tabRefs = useRef({});
  const isDomingo = menuActivo === 'domingo';

  const seccionesActuales = isDomingo ? seccionesDomingoCrudon : seccionesMenu;
  const seccion = seccionesActuales.find((s) => s.id === seccionActiva);

  // Al cambiar de menú, seleccionar la primera sección
  useEffect(() => {
    const primerSeccion = isDomingo ? 'birria' : 'bebidas';
    setSeccionActiva(primerSeccion);
  }, [menuActivo]);

  useEffect(() => {
    onSeccionChange?.(seccionActiva);
  }, [seccionActiva, onSeccionChange]);

  // Centrar pestaña activa
  useEffect(() => {
    const container = tabsContainerRef.current;
    const activeTab = tabRefs.current[seccionActiva];
    if (container && activeTab) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      container.scrollTo({
        left: activeTab.offsetLeft - containerRect.width / 2 + tabRect.width / 2,
        behavior: 'smooth',
      });
    }
  }, [seccionActiva]);

  const categoriasEnSeccion = useMemo(() => {
    if (!seccion) return [];
    if (isDomingo) {
      // Domingo Crudon tiene estructura diferente: categorias + bebidas
      const todasCategorias = [
        ...menuDomingoCrudon.categorias,
        ...menuDomingoCrudon.bebidas,
      ];
      return seccion.categoriaIds
        .map((id) => todasCategorias.find((c) => c.id === id))
        .filter(Boolean);
    }
    return seccion.categoriaIds
      .map((id) => menuData.categorias.find((c) => c.id === id))
      .filter(Boolean);
  }, [seccion, isDomingo]);

  const esCocina = !isDomingo && (seccionActiva === 'comida' || seccionActiva === 'snacks');

  return (
    <div className="pt-4 pb-4 min-h-[calc(100vh-68px)] relative">
      {/* Fondo especial para Domingo Crudon */}
      {isDomingo && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <img
            src="/imagenes/domingo-crudon-bg.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'blur(1px) brightness(0.2)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/60 via-transparent to-amber-950/80" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Switch de menú + Logo */}
        <div className="text-center mb-6 mt-2">
          {/* Toggle tipo segmented control */}
          <div className="relative inline-flex items-center bg-black/20 backdrop-blur-sm rounded-full p-1 mb-3 border border-white/10 w-[calc(100%-2rem)] max-w-[320px] mx-auto">
            {/* Indicador deslizante */}
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-2px)] rounded-full transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isDomingo
                  ? 'bg-amber-200 shadow-lg shadow-amber-500/20 left-[50%]'
                  : 'bg-menu-cream shadow-lg shadow-green-500/20 left-1'
              }`}
            />
            <button
              type="button"
              onClick={() => setMenuActivo('green')}
              className={`relative z-10 flex-1 py-2 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 text-center ${
                !isDomingo
                  ? 'text-menu-green-dark'
                  : 'text-white/60'
              }`}
            >
              🍃 Green Garden
            </button>
            <button
              type="button"
              onClick={() => setMenuActivo('domingo')}
              className={`relative z-10 flex-1 py-2 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 text-center ${
                isDomingo
                  ? 'text-amber-900'
                  : 'text-white/60'
              }`}
            >
              🍖 Domingo Crudon
            </button>
          </div>

          {/* Logo dinámico */}
          {isDomingo ? <LogoDomingo /> : <LogoGreen />}

          {/* Título MENU */}
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className={isDomingo ? 'text-amber-400/80 text-lg' : 'text-green-light/80 text-lg'}>
              {isDomingo ? '🍖' : '🍃'}
            </span>
            <h1 className={`font-slab text-4xl md:text-5xl font-bold tracking-tight uppercase ${isDomingo ? 'text-amber-100' : 'text-menu-cream'}`}>
              MENU
            </h1>
            <span className={isDomingo ? 'text-amber-400/80 text-lg' : 'text-green-light/80 text-lg'}>
              {isDomingo ? '🍖' : '🍃'}
            </span>
          </div>

          {/* Subtítulo dinámico */}
          {isDomingo ? (
            <div>
              <p className="text-amber-200 text-sm font-elegant font-semibold mt-1">Domingo Crudon</p>
              <p className="text-amber-300/60 text-[10px] font-body mt-1 uppercase tracking-widest">
                Birria de Borrego Estilo Jalisco
              </p>
              <p className="text-amber-200/50 text-[10px] font-body mt-1">
                Domingos por la mañana
              </p>
            </div>
          ) : (
            <p className="text-menu-cream/70 text-xs font-body mt-2">The Green Garden</p>
          )}
        </div>

        {/* Tabs de secciones */}
        <div
          ref={tabsContainerRef}
          className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide"
        >
          {seccionesActuales.map((sec) => {
            const activa = seccionActiva === sec.id;
            if (isDomingo) {
              return (
                <button
                  type="button"
                  key={sec.id}
                  ref={(el) => (tabRefs.current[sec.id] = el)}
                  onClick={() => setSeccionActiva(sec.id)}
                  className={`px-6 py-3.5 rounded-xl whitespace-nowrap font-slab font-semibold text-lg transition-colors shrink-0 active:scale-95 ${
                    activa
                      ? 'bg-amber-200/90 text-amber-900 shadow-md border border-amber-400/40'
                      : 'bg-amber-900/90 text-amber-100 border border-amber-300/20'
                  }`}
                >
                  <span className="mr-1.5">{sec.icono}</span>
                  {sec.nombre}
                </button>
              );
            }
            const Ico = iconoMap[sec.icono];
            return (
              <button
                type="button"
                key={sec.id}
                ref={(el) => (tabRefs.current[sec.id] = el)}
                onClick={() => setSeccionActiva(sec.id)}
                className={`px-6 py-3.5 rounded-xl whitespace-nowrap font-slab font-semibold text-lg transition-colors shrink-0 active:scale-95 ${
                  activa
                    ? 'bg-menu-green/90 text-menu-cream shadow-md border border-menu-cream/20'
                    : 'bg-menu-cream/90 text-menu-green-dark'
                }`}
              >
                {Ico && <Ico size={20} strokeWidth={activa ? 2.5 : 1.8} className="inline-block mr-1.5 -mt-0.5" />}
                {sec.nombre}
              </button>
            );
          })}
        </div>

        {/* Contenido del menú */}
        {seccion && (
          <div className="space-y-6">
            {/* Imagen de sección (solo Green Garden) */}
            {!isDomingo && seccion.imagen && (
              <div className="rounded-2xl overflow-hidden border-2 border-menu-cream/25 shadow-xl relative">
                <img
                  src={seccion.imagen}
                  alt={seccion.nombre}
                  className="w-full h-52 sm:h-64 object-cover object-center"
                  loading="lazy"
                />
              </div>
            )}

            {/* Banner de sección Domingo Crudon - Birria */}
            {isDomingo && seccionActiva === 'birria' && (
              <div className="rounded-2xl overflow-hidden border-2 border-amber-300/25 shadow-xl relative">
                <img
                  src="/imagenes/birria-banner.png"
                  alt="Birria de Borrego"
                  className="w-full h-52 sm:h-64 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/80 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <p className="text-amber-100 font-elegant text-xl font-bold">Auténtica tradición jalisciense</p>
                    <p className="text-amber-200/70 text-xs mt-1">Tortillas hechas a mano y el sabor que nos define</p>
                  </div>
                </div>
              </div>
            )}

            {/* Banner de sección Domingo Crudon - Bebidas */}
            {isDomingo && seccionActiva === 'bebidas' && (
              <div className="rounded-2xl overflow-hidden border-2 border-amber-300/25 shadow-xl relative">
                <img
                  src="/imagenes/bebidas-domingo.png"
                  alt="Bebidas"
                  className="w-full h-52 sm:h-64 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/90 via-amber-950/30 to-transparent flex items-end p-4">
                  <div>
                    <p className="text-amber-100 font-elegant text-xl font-bold">Refrescos y Cervezas</p>
                    <p className="text-amber-200/70 text-xs mt-1">Para acompañar tu birria</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-8">
              {categoriasEnSeccion.map((cat) => (
                <BloqueCategoria
                  key={cat.id}
                  cat={cat}
                  onAbrirTransferencia={onAbrirTransferencia}
                  isDomingo={isDomingo}
                />
              ))}
            </div>
          </div>
        )}

        {/* WhatsApp - solo para Comida y Snacks de Green Garden */}
        {esCocina && (
          <div className="mt-10 mb-4">
            <div className="bg-menu-green/85 rounded-2xl border border-menu-cream/20 p-5 shadow-lg text-center">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-menu-cream/20 text-2xl mb-3">
                🛵
              </span>
              <h3 className="font-slab font-bold text-menu-cream text-sm uppercase tracking-wide mb-1">
                Envíos a domicilio
              </h3>
              <p className="text-menu-cream/70 text-sm mb-4">Pide por WhatsApp y te llevamos</p>
              <a
                href={`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(MENSAJE_COCINA)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-green-600 text-white font-semibold text-sm shadow-lg active:scale-95 transition-transform"
              >
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                747 254 4725 — Pedir por WhatsApp
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Menu;
