import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Beer, Utensils, Wine } from 'lucide-react';
import { menuData, seccionesMenu } from '../data/menu';

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

const DATOS_TRANSFERENCIA = {
  banco: 'BBVA',
  numeroTarjeta: '4152 3142 3861 4344',
  titular: 'Carlos Sinai Martinez',
};

const NUMERO_WHATSAPP = '527472544725';
const MENSAJE_COCINA = 'Hola, quisiera hacer una orden de la seccion de cocina';

// Función reutilizable para copiar texto
const copiarTexto = async (texto) => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(texto);
      return true;
    }
  } catch {}
  // Fallback
  try {
    const ta = document.createElement('textarea');
    ta.value = texto;
    ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
};

const formatPrecio = (n) => `$${Number(n).toFixed(2)}`;

// Componente de precio - fuera del render para evitar re-creación
const PrecioDisplay = ({ producto, onAbrirTransferencia, enFilaCompleta }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onAbrirTransferencia?.();
  };

  const claseBtn = 'inline-flex items-center px-3 py-2 rounded-lg bg-menu-cream text-menu-green-bar text-xs font-bold active:scale-95 transition-transform shadow-md';

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
    <button type="button" onClick={handleClick} className={`${claseBtn} whitespace-nowrap`}>
      {formatPrecio(producto.precio)}
    </button>
  );
};

// Bloque de categoría - fuera del render
const BloqueCategoria = ({ cat, onAbrirTransferencia }) => {
  return (
    <section className="space-y-3">
      <div className="px-4 py-2.5 rounded-xl flex items-center gap-2 bg-menu-green/90 border border-menu-cream/20 shadow-lg">
        <span className="text-base">🍃</span>
        <h2 className="font-slab text-base font-bold uppercase tracking-wide text-menu-cream">
          {cat.nombre}
        </h2>
      </div>

      {cat.descripcionCategoria && cat.productos.length > 0 && (
        <p className="text-xs italic text-menu-cream/70 px-1">{cat.descripcionCategoria}</p>
      )}

      {cat.productos.length === 0 && cat.descripcionCategoria && (
        <div className="px-4 py-3 rounded-xl border text-center bg-menu-green/80 border-menu-cream/20">
          <p className="font-slab font-semibold text-sm uppercase tracking-wide mb-1 text-menu-cream">Elige tu salsa</p>
          <p className="text-sm font-medium text-menu-cream/90">{cat.descripcionCategoria}</p>
        </div>
      )}

      <div className="space-y-3">
        {cat.productos.map((producto) => {
          const enFilaCompleta = (producto.precios?.length || 0) >= 3;
          return (
            <div
              key={producto.id}
              className={`rounded-xl p-4 bg-menu-green/80 border border-menu-cream/20 ${
                enFilaCompleta ? 'text-center' : 'flex flex-wrap items-start justify-between gap-3'
              }`}
            >
              <div className={enFilaCompleta ? 'mb-2' : 'flex-1 min-w-0'}>
                <h3 className="font-body font-semibold text-base text-menu-cream">
                  {producto.nombre}
                </h3>
                {producto.descripcion && (
                  <p className="text-xs mt-1 text-menu-cream/65">{producto.descripcion}</p>
                )}
              </div>
              <PrecioDisplay
                producto={producto}
                onAbrirTransferencia={onAbrirTransferencia}
                enFilaCompleta={enFilaCompleta}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

const Menu = ({ onAbrirTransferencia, onSeccionChange, initialSeccion }) => {
  const [seccionActiva, setSeccionActiva] = useState(initialSeccion ?? 'bebidas');
  const seccion = seccionesMenu.find((s) => s.id === seccionActiva);
  const tabsContainerRef = useRef(null);
  const tabRefs = useRef({});
  const [copiadoTarjeta, setCopiadoTarjeta] = useState(false);

  const copiarTarjeta = useCallback(async () => {
    const ok = await copiarTexto(DATOS_TRANSFERENCIA.numeroTarjeta.replace(/\s/g, ''));
    if (ok) {
      setCopiadoTarjeta(true);
      setTimeout(() => setCopiadoTarjeta(false), 2500);
    }
  }, []);

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
    return seccion.categoriaIds
      .map((id) => menuData.categorias.find((c) => c.id === id))
      .filter(Boolean);
  }, [seccion]);

  const esCocina = seccionActiva === 'comida' || seccionActiva === 'snacks';

  return (
    <div className="pt-4 pb-4 min-h-[calc(100vh-68px)] relative">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Logo */}
        <div className="text-center mb-6 mt-2">
          <div className="inline-flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-menu-cream mb-4">
            <span className="text-menu-cream text-[9px] tracking-[0.2em] font-body uppercase">THE</span>
            <span className="text-menu-cream font-script text-2xl font-semibold">Green</span>
            <span className="text-menu-cream text-[9px] tracking-[0.2em] font-body uppercase">GARDEN</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-green-light/80 text-lg">🍃</span>
            <h1 className="font-slab text-4xl md:text-5xl font-bold text-menu-cream tracking-tight uppercase">
              MENU
            </h1>
            <span className="text-green-light/80 text-lg">🍃</span>
          </div>
          <p className="text-menu-cream/70 text-xs font-body mt-2">The Green Garden</p>
        </div>

        {/* Tabs de secciones */}
        <div
          ref={tabsContainerRef}
          className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide"
        >
          {seccionesMenu.map((sec) => {
            const activa = seccionActiva === sec.id;
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
                {(() => { const Ico = iconoMap[sec.icono]; return Ico ? <Ico size={20} strokeWidth={activa ? 2.5 : 1.8} className="inline-block mr-1.5 -mt-0.5" /> : null; })()}{sec.nombre}
              </button>
            );
          })}
        </div>

        {/* Contenido del menú */}
        {seccion && (
          <div className="space-y-6">
            {seccion.imagen && (
              <div className="rounded-2xl overflow-hidden border-2 border-menu-cream/25 shadow-xl relative">
                <img
                  src={seccion.imagen}
                  alt={seccion.nombre}
                  className="w-full h-52 sm:h-64 object-cover object-center"
                  loading="lazy"
                />
              </div>
            )}

            <div className="space-y-8">
              {categoriasEnSeccion.map((cat) => (
                <BloqueCategoria
                  key={cat.id}
                  cat={cat}
                  onAbrirTransferencia={onAbrirTransferencia}
                />
              ))}
            </div>
          </div>
        )}

        {/* WhatsApp - solo para Comida y Snacks */}
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

        {/* Datos de transferencia */}
        <div className={esCocina ? 'mb-4' : 'mt-10 mb-4'}>
          <div className="bg-menu-green/85 rounded-2xl border border-menu-cream/20 p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-menu-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <h3 className="font-slab font-bold text-menu-cream text-sm uppercase tracking-wide">
                Datos para transferencia
              </h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-menu-cream/60">Banco</span>
                <span className="text-menu-cream font-medium">{DATOS_TRANSFERENCIA.banco}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-menu-cream/60">Titular</span>
                <span className="text-menu-cream font-medium">{DATOS_TRANSFERENCIA.titular}</span>
              </div>
              <div>
                <span className="text-menu-cream/60 block mb-2">Número de tarjeta</span>
                <div className="bg-menu-cream/10 rounded-lg px-3 py-2">
                  <span className="text-menu-cream font-mono tracking-wider">
                    {DATOS_TRANSFERENCIA.numeroTarjeta}
                  </span>
                </div>
                <button
                  onClick={copiarTarjeta}
                  className={`mt-2 w-full py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                    copiadoTarjeta
                      ? 'bg-green-500 text-white'
                      : 'bg-menu-cream text-menu-green-dark'
                  }`}
                >
                  {copiadoTarjeta ? '¡Número copiado!' : 'Copiar número de tarjeta'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
