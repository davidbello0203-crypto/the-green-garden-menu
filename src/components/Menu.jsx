import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuData, seccionesMenu } from '../data/menu';

const Menu = () => {
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
    if (producto.precios && producto.precios.length > 0) {
      return (
        <div className="flex flex-wrap gap-1.5 justify-end">
          {producto.precios.map((p, i) => (
            <span
              key={i}
              className="inline-flex items-center px-2.5 py-1 rounded-lg bg-menu-cream text-menu-green-dark text-xs font-bold border border-menu-green-dark/20"
            >
              {p.etiqueta} {formatPrecio(p.precio)}
            </span>
          ))}
        </div>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-menu-cream text-menu-green-dark font-bold whitespace-nowrap text-xs border border-menu-green-dark/20">
        {formatPrecio(producto.precio)}
      </span>
    );
  };

  const mitad = Math.ceil(categoriasEnSeccion.length / 2);
  const colIzq = categoriasEnSeccion.slice(0, mitad);
  const colDer = categoriasEnSeccion.slice(mitad);
  const usarDosColumnas = seccionActiva === 'bebidas' && categoriasEnSeccion.length > 4;

  const BloqueCategoria = ({ cat }) => (
    <section className="space-y-2">
      <div className="bg-menu-green-bar px-3 py-2 rounded-lg flex items-center gap-2">
        <span className="text-green-light/90 text-sm">🍃</span>
        <h2 className="font-slab text-base font-bold text-menu-cream uppercase tracking-wide">
          {cat.nombre}
        </h2>
      </div>
      {cat.descripcionCategoria && (
        <p className="text-menu-cream/80 text-xs italic">{cat.descripcionCategoria}</p>
      )}
      <div className="space-y-2">
        {cat.productos.map((producto, index) => (
          <motion.div
            key={producto.id}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.02 }}
            className="flex flex-wrap items-start justify-between gap-2 p-3 rounded-lg bg-menu-green-dark/60 border border-menu-cream/15"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-body font-semibold text-menu-cream text-sm">{producto.nombre}</h3>
              {producto.descripcion && (
                <p className="text-menu-cream/75 text-xs mt-0.5">{producto.descripcion}</p>
              )}
            </div>
            <PrecioDisplay producto={producto} />
          </motion.div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-menu-green-dark pt-24 pb-28 relative overflow-hidden">
      {/* Toque tropical: hojas sutiles de fondo */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.06]">
        <span className="absolute top-24 left-6 text-4xl">🍃</span>
        <span className="absolute top-40 right-8 text-3xl">🌿</span>
        <span className="absolute bottom-48 left-10 text-3xl">🌱</span>
        <span className="absolute bottom-32 right-6 text-4xl">🍃</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Portada estilo menú: logo + MENU + redes */}
        <div className="text-center mb-6">
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

        {/* Tabs: se abre aquí mismo, transición suave */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {seccionesMenu.map((sec) => {
            const estaActiva = seccionActiva === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setSeccionActiva(sec.id)}
                className={`px-4 py-2.5 rounded-lg whitespace-nowrap font-slab font-semibold text-sm transition-all shrink-0 ${
                  estaActiva
                    ? 'bg-menu-cream text-menu-green-dark shadow-md'
                    : 'bg-menu-green-bar/90 text-menu-cream hover:bg-menu-cream/25 hover:text-menu-cream'
                }`}
              >
                {sec.icono} {sec.nombre}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {seccion && (
            <motion.div
              key={seccionActiva}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Imagen de la sección: comida/bebida sin fondos cargados */}
              {seccion.imagen && (
                <div className="rounded-2xl overflow-hidden border-2 border-menu-cream/25 shadow-xl">
                  <img
                    src={seccion.imagen}
                    alt={seccion.nombre}
                    className="w-full h-48 sm:h-56 object-cover object-center"
                  />
                </div>
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

        {/* Pie como en la portada del menú */}
        <footer className="mt-12 pt-6 border-t border-menu-cream/20 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-menu-cream/80 text-sm font-body">
          <a href="https://www.facebook.com/The_GreenGarden" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-menu-cream transition-colors">
            <span className="font-semibold">f</span>
            <span>The_GreenGarden</span>
          </a>
          <span className="flex items-center gap-2">
            <span>📍</span>
            <span>Tixtla Gro.</span>
          </span>
          <span className="text-menu-cream font-medium">#todosagreen</span>
        </footer>
      </div>
    </div>
  );
};

export default Menu;
