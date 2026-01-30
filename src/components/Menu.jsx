import { useState } from 'react';
import { motion } from 'framer-motion';
import { menuData } from '../data/menu';

const Menu = () => {
  const [categoriaActiva, setCategoriaActiva] = useState('cervezas');

  const categoria = menuData.categorias.find(cat => cat.id === categoriaActiva);

  return (
    <div className="min-h-screen p-4 pt-24 pb-28 relative">
      {/* Elementos decorativos tropicales */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-5 text-6xl opacity-10"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🌿
        </motion.div>
        <motion.div
          className="absolute top-20 right-10 text-5xl opacity-10"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🌱
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-10 text-4xl opacity-10"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🍃
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-5 text-5xl opacity-10"
          animate={{
            y: [0, 12, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🌴
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-2 text-4xl opacity-10"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 8, 0],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🍀
        </motion.div>
      </div>

      {/* Título de sección */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 relative z-10"
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-2xl">🌿</span>
          <h2 className="text-2xl font-elegant font-semibold text-shadow-glow">
            Menú
          </h2>
          <span className="text-2xl">🌱</span>
        </div>
        <p className="text-green-primary/90 text-sm font-medium">Bebidas y más — ambiente verde y acogedor</p>
      </motion.div>

      {/* Navegación de Categorías */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide relative z-10">
        {menuData.categorias.map((cat) => {
          const estaActiva = categoriaActiva === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.id)}
              className={`px-5 py-3 rounded-xl whitespace-nowrap font-semibold transition-all relative overflow-hidden ${
                estaActiva
                  ? 'text-bar-dark shadow-lg'
                  : 'text-white hover:text-green-light'
              }`}
              animate={{
                scale: estaActiva ? 1.05 : 1,
                backgroundColor: estaActiva 
                  ? '#22c55e' 
                  : 'rgba(255, 255, 255, 0.1)',
                boxShadow: estaActiva 
                  ? '0 0 20px rgba(34, 197, 94, 0.5), 0 4px 12px rgba(34, 197, 94, 0.3)' 
                  : 'none',
              }}
              whileHover={!estaActiva ? {
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                scale: 1.02,
              } : {}}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {estaActiva && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-primary via-green-light to-green-primary"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'linear',
                  }}
                  style={{
                    opacity: 0.3,
                  }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-lg">{cat.icono}</span>
                <span>{cat.nombre}</span>
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Lista de Productos */}
      <motion.div
        key={categoriaActiva}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-4 relative z-10"
      >
        {categoria?.productos.map((producto, index) => (
          <motion.div
            key={producto.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border transition-all ${
              producto.destacado
                ? 'border-green-primary bg-green-gradient shadow-lg shadow-green-primary/20'
                : 'border-white/10 hover:border-green-primary/30'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-elegant font-semibold mb-1">
                  {producto.nombre}
                </h3>
                {producto.descripcion && (
                  <p className="text-white/70 text-sm mb-2">
                    {producto.descripcion}
                  </p>
                )}
              </div>
              <div className="text-right ml-4">
                <p className="text-2xl font-bold text-green-primary">
                  ${producto.precio}
                </p>
              </div>
            </div>
            {producto.destacado && (
              <div className="mt-2 pt-2 border-t border-green-primary/30">
                <span className="text-green-primary text-xs font-semibold">
                  🌿 PROMOCIÓN ESPECIAL
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Menu;

