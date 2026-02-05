import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuData, seccionesMenu } from '../data/menu';

const DATOS_TRANSFERENCIA = {
  banco: 'BBVA',
  numeroTarjeta: '4152 3142 3861 4344',
  titular: 'Carlos Sinai Martinez',
};

const NUMERO_WHATSAPP = '527472544725';
const MENSAJE_COCINA = 'Hola, quisiera hacer una orden de la seccion de cocina';

const Menu = ({ onAbrirTransferencia, onSeccionChange, initialSeccion }) => {
  const [seccionActiva, setSeccionActiva] = useState(initialSeccion ?? 'bebidas');
  const seccion = seccionesMenu.find((s) => s.id === seccionActiva);
  const tabsContainerRef = useRef(null);
  const tabRefs = useRef({});
  const [copiadoTarjeta, setCopiadoTarjeta] = useState(false);

  const copiarTarjeta = async () => {
    const texto = DATOS_TRANSFERENCIA.numeroTarjeta.replace(/\s/g, '');

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(texto);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = texto;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiadoTarjeta(true);
      setTimeout(() => setCopiadoTarjeta(false), 2500);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = texto;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiadoTarjeta(true);
        setTimeout(() => setCopiadoTarjeta(false), 2500);
      } catch (e) {
        console.error('Error al copiar:', e);
      }
      document.body.removeChild(textArea);
    }
  };

  // Al volver al menú desde otra vista, el componente se monta de nuevo con initialSeccion;
  // no sincronizar en cada cambio de initialSeccion para no pisar la selección del usuario.

  // Notificar a App la sección activa (para ocultar barra de envíos en Botellas y Copeo)
  useEffect(() => {
    onSeccionChange?.(seccionActiva);
  }, [seccionActiva, onSeccionChange]);

  // Centrar la pestaña seleccionada automáticamente
  useEffect(() => {
    const container = tabsContainerRef.current;
    const activeTab = tabRefs.current[seccionActiva];

    if (container && activeTab) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();

      // Calcular el scroll necesario para centrar la pestaña
      const scrollLeft = activeTab.offsetLeft - (containerRect.width / 2) + (tabRect.width / 2);

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [seccionActiva]);

  // Respetar orden de las fotos del menú (categoriaIds)
  const categoriasEnSeccion = useMemo(() => {
    if (!seccion) return [];
    return seccion.categoriaIds
      .map((id) => menuData.categorias.find((c) => c.id === id))
      .filter(Boolean);
  }, [seccion]);

  const formatPrecio = (n) => `$${Number(n).toFixed(2)}`;

  const PrecioDisplay = ({ producto, enFilaCompleta }) => {
    const abrirTransferencia = (e) => {
      e.stopPropagation();
      onAbrirTransferencia?.();
    };
    const clasePrecio = 'inline-flex items-center px-3 py-2 rounded-lg bg-menu-cream text-menu-green-bar text-xs font-bold cursor-pointer hover:bg-white active:scale-[0.98] transition-all shadow-md';
    
    if (producto.precios && producto.precios.length > 0) {
      return (
        <div className={enFilaCompleta ? 'w-full mt-4' : 'flex flex-wrap gap-2 justify-end'}>
          <div className={`flex flex-wrap ${enFilaCompleta ? 'gap-3 justify-center' : 'gap-2 justify-end'}`}>
            {producto.precios.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={abrirTransferencia}
                className={clasePrecio}
                title="Ver datos para transferencia"
              >
                {p.etiqueta} {formatPrecio(p.precio)}
              </button>
            ))}
          </div>
        </div>
      );
    }
    return (
      <button
        type="button"
        onClick={abrirTransferencia}
        className={clasePrecio + ' whitespace-nowrap'}
        title="Ver datos para transferencia"
      >
        {formatPrecio(producto.precio)}
      </button>
    );
  };

  const mitad = Math.ceil(categoriasEnSeccion.length / 2);
  const colIzq = categoriasEnSeccion.slice(0, mitad);
  const colDer = categoriasEnSeccion.slice(mitad);
  const usarDosColumnas = seccionActiva === 'bebidas' && categoriasEnSeccion.length > 4;

  const BloqueCategoria = ({ cat, index }) => {
    // Alternar colores de fondo para las tarjetas de productos
    const esClara = index % 2 === 0;

    return (
      <section className="space-y-3">
        {/* Header de categoría - mismo verde que tabs activos */}
        <div className="px-4 py-2.5 rounded-xl flex items-center gap-2 bg-menu-green-bar shadow-lg">
          <span className="text-base">🍃</span>
          <h2 className="font-slab text-base font-bold uppercase tracking-wide text-menu-cream">
            {cat.nombre}
          </h2>
        </div>
        {cat.descripcionCategoria && cat.productos.length > 0 && (
          <p className="text-xs italic text-menu-cream/70 px-1">{cat.descripcionCategoria}</p>
        )}
        {cat.productos.length === 0 && cat.descripcionCategoria && (
          <div className={`px-4 py-3 rounded-xl backdrop-blur-sm border text-center ${esClara ? 'bg-menu-cream/50 border-menu-green-dark/20' : 'bg-menu-green-dark/60 border-menu-cream/15'}`}>
            <p className={`font-slab font-semibold text-sm uppercase tracking-wide mb-1 ${esClara ? 'text-menu-green-dark' : 'text-menu-cream'}`}>Elige tu salsa</p>
            <p className={`text-sm font-medium ${esClara ? 'text-menu-green-dark/80' : 'text-menu-cream/90'}`}>{cat.descripcionCategoria}</p>
          </div>
        )}
        <div className="space-y-3">
          {cat.productos.map((producto, indexProd) => {
            const cantidadPrecios = producto.precios?.length || 0;
            const enFilaCompleta = cantidadPrecios >= 3;

            return (
              <div
                key={producto.id}
                className={`rounded-xl p-4 ${
                  esClara
                    ? 'bg-menu-cream/50 border border-menu-green-dark/20'
                    : 'bg-menu-green-dark/60 border border-menu-cream/15'
                } ${enFilaCompleta ? 'text-center' : 'flex flex-wrap items-start justify-between gap-3'}`}
              >
                <div className={enFilaCompleta ? 'mb-2' : 'flex-1 min-w-0'}>
                  <h3 className={`font-body font-semibold text-base ${esClara ? 'text-menu-green-dark' : 'text-menu-cream'}`}>
                    {producto.nombre}
                  </h3>
                  {producto.descripcion && (
                    <p className={`text-xs mt-1 ${esClara ? 'text-menu-green-dark/70' : 'text-menu-cream/65'}`}>
                      {producto.descripcion}
                    </p>
                  )}
                </div>
                <PrecioDisplay producto={producto} enFilaCompleta={enFilaCompleta} />
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <div className="pt-4 pb-4 min-h-[calc(100vh-68px)] relative">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Portada estilo menú: logo + MENU + redes */}
        <motion.div
          className="text-center mb-6 mt-2"
          initial="oculto"
          animate="visible"
          variants={{
            oculto: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
        >
          <motion.div
            variants={{ oculto: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
            transition={{ duration: 0.35 }}
            className="inline-flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-menu-cream mb-4"
          >
            <span className="text-menu-cream text-[9px] tracking-[0.2em] font-body uppercase">THE</span>
            <span className="text-menu-cream font-script text-2xl font-semibold">Green</span>
            <span className="text-menu-cream text-[9px] tracking-[0.2em] font-body uppercase">GARDEN</span>
          </motion.div>
          <motion.div
            variants={{ oculto: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-2 mb-1"
          >
            <span className="text-green-light/80 text-lg">🍃</span>
            <h1 className="font-slab text-4xl md:text-5xl font-bold text-menu-cream tracking-tight uppercase">
              MENU
            </h1>
            <span className="text-green-light/80 text-lg">🍃</span>
          </motion.div>
          <motion.p
            variants={{ oculto: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.3 }}
            className="text-menu-cream/70 text-xs font-body mt-2"
          >
            The Green Garden
          </motion.p>
        </motion.div>

        {/* Tabs: se abre aquí mismo, transición suave */}
        <motion.div
          ref={tabsContainerRef}
          className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {seccionesMenu.map((sec, i) => {
            const estaActiva = seccionActiva === sec.id;
            const idSeccion = sec.id;
            return (
              <motion.button
                type="button"
                key={sec.id}
                ref={(el) => (tabRefs.current[sec.id] = el)}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSeccionActiva(idSeccion);
                }}
                className={`px-6 py-3.5 rounded-xl whitespace-nowrap font-slab font-semibold text-lg transition-colors shrink-0 ${
                  estaActiva
                    ? 'bg-menu-green-bar text-menu-cream shadow-md'
                    : 'bg-menu-cream text-menu-green-dark hover:bg-menu-green-bar/30 hover:text-menu-cream'
                }`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.04 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {sec.icono} {sec.nombre}
              </motion.button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          {seccion && (
            <motion.div
              key={seccionActiva}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="space-y-6"
            >
              {/* Imagen de la sección: formato landscape, overlay estilo página */}
              {seccion.imagen && (
                <motion.div
                  className="rounded-2xl overflow-hidden border-2 border-menu-cream/25 shadow-xl relative"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.35 }}
                >
                  <img
                    src={seccion.imagen}
                    alt={seccion.nombre}
                    className="w-full h-52 sm:h-64 object-cover object-center"
                  />
                  {/* Overlay muy sutil para no tapar la foto */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{ background: 'linear-gradient(180deg, rgba(21, 42, 34, 0.12) 0%, transparent 60%, rgba(21, 42, 34, 0.08) 100%)' }}
                    aria-hidden
                  />
                </motion.div>
              )}

              {usarDosColumnas ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {colIzq.map((cat) => (
                      <BloqueCategoria key={cat.id} cat={cat} />
                    ))}
                  </div>
                  <div className="space-y-6">
                    {colDer.map((cat) => (
                      <BloqueCategoria key={cat.id} cat={cat} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {categoriasEnSeccion.map((cat) => (
                    <BloqueCategoria key={cat.id} cat={cat} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sección de envío a domicilio - solo para Comida y Snacks */}
        {(seccionActiva === 'comida' || seccionActiva === 'snacks') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="mt-10 mb-4"
          >
            <div className="bg-menu-green-dark/80 backdrop-blur-sm rounded-2xl border border-menu-cream/20 p-5 shadow-lg text-center">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-menu-cream/20 text-2xl mb-3">
                🛵
              </span>
              <h3 className="font-slab font-bold text-menu-cream text-sm uppercase tracking-wide mb-1">
                Envíos a domicilio
              </h3>
              <p className="text-menu-cream/70 text-sm mb-4">
                Pide por WhatsApp y te llevamos
              </p>
              <a
                href={`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(MENSAJE_COCINA)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
              >
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                747 254 4725 — Pedir por WhatsApp
              </a>
            </div>
          </motion.div>
        )}

        {/* Sección de datos de transferencia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (seccionActiva === 'comida' || seccionActiva === 'snacks') ? 0.5 : 0.4, duration: 0.3 }}
          className={`${(seccionActiva === 'comida' || seccionActiva === 'snacks') ? 'mb-4' : 'mt-10 mb-4'}`}
        >
          <div className="bg-menu-green-dark/80 backdrop-blur-sm rounded-2xl border border-menu-cream/20 p-5 shadow-lg">
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
                <div className="flex justify-between items-center mb-2">
                  <span className="text-menu-cream/60">Número de tarjeta</span>
                </div>
                <div className="bg-menu-cream/10 rounded-lg px-3 py-2 flex items-center justify-between">
                  <span className="text-menu-cream font-mono tracking-wider">{DATOS_TRANSFERENCIA.numeroTarjeta}</span>
                </div>
                <button
                  onClick={copiarTarjeta}
                  className={`mt-2 w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${
                    copiadoTarjeta
                      ? 'bg-green-500 text-white'
                      : 'bg-menu-cream text-menu-green-dark hover:bg-white'
                  }`}
                >
                  {copiadoTarjeta ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      ¡Número copiado!
                    </span>
                  ) : (
                    'Copiar número de tarjeta'
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;
