import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuData, seccionesMenu } from '../data/menu';
import FondoHojas from './FondoHojas';

const Menu = ({ onAbrirTransferencia }) => {
  const [seccionActiva, setSeccionActiva] = useState('bebidas');
  const seccion = seccionesMenu.find((s) => s.id === seccionActiva);

  // Respetar orden de las fotos del menú (categoriaIds)
  const categoriasEnSeccion = useMemo(() => {
    if (!seccion) return [];
    return seccion.categoriaIds
      .map((id) => menuData.categorias.find((c) => c.id === id))
      .filter(Boolean);
  }, [seccion]);

  const formatPrecio = (n) => `$${Number(n).toFixed(2)}`;

  const PrecioDisplay = ({ producto }) => {
    const abrirTransferencia = (e) => {
      e.stopPropagation();
      onAbrirTransferencia?.();
    };
    const clasePrecio = 'inline-flex items-center px-2.5 py-1 rounded-lg bg-menu-cream text-menu-green-dark text-xs font-bold border border-menu-green-dark/40 cursor-pointer hover:bg-menu-green-dark/15 active:scale-[0.98] transition-colors';
    if (producto.precios && producto.precios.length > 0) {
      return (
        <div className="flex flex-wrap gap-1.5 justify-end">
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
    const esClara = index % 2 === 0;
    return (
      <section className="space-y-2">
        <div className="px-3 py-2 rounded-lg flex items-center gap-2 bg-menu-cream">
          <span className="text-sm text-menu-green-dark">🍃</span>
          <h2 className="font-slab text-base font-bold uppercase tracking-wide text-menu-green-dark">
            {cat.nombre}
          </h2>
        </div>
        {cat.descripcionCategoria && (
          <p className="text-xs italic text-menu-green-dark/75">{cat.descripcionCategoria}</p>
        )}
        <div className="space-y-2">
          {cat.productos.map((producto, indexProd) => (
            <motion.div
              key={producto.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: indexProd * 0.03, duration: 0.25 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className={`flex flex-wrap items-start justify-between gap-2 p-3 rounded-lg border ${esClara ? 'bg-menu-cream/50 border-menu-green-dark/20' : 'bg-menu-green-dark/60 border-menu-cream/15'}`}
            >
              <div className="flex-1 min-w-0">
                <h3 className={`font-body font-semibold text-sm ${esClara ? 'text-menu-green-dark' : 'text-menu-cream'}`}>{producto.nombre}</h3>
                {producto.descripcion && (
                  <p className={`text-xs mt-0.5 ${esClara ? 'text-menu-green-dark/80' : 'text-menu-cream/75'}`}>{producto.descripcion}</p>
                )}
              </div>
              <PrecioDisplay producto={producto} />
            </motion.div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-menu-green-dark pt-24 pb-28 relative overflow-hidden">
      <FondoHojas />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Portada estilo menú: logo + MENU + redes */}
        <motion.div
          className="text-center mb-6"
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
          className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {seccionesMenu.map((sec, i) => {
            const estaActiva = seccionActiva === sec.id;
            return (
              <motion.button
                key={sec.id}
                onClick={() => setSeccionActiva(sec.id)}
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
              {/* Imagen de la sección: comida/bebida sin fondos cargados */}
              {seccion.imagen && (
                <motion.div
                  className="rounded-2xl overflow-hidden border-2 border-menu-cream/25 shadow-xl"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.35 }}
                >
                  <img
                    src={seccion.imagen}
                    alt={seccion.nombre}
                    className="w-full h-48 sm:h-56 object-cover object-center"
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
      </div>
    </div>
  );
};

export default Menu;
