import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Menu from './components/Menu';
import RuletaPremios from './components/RuletaPremios';
import RuletaConsumo from './components/RuletaConsumo';
import Visitar from './components/Visitar';

function App() {
  const [vistaActiva, setVistaActiva] = useState('menu');

  const navegacionItems = [
    { id: 'menu', label: 'Menú', icono: '📋' },
    { id: 'ruleta-premios', label: 'Premios', icono: '🎁' },
    { id: 'ruleta-consumo', label: 'Ruleta', icono: '🎲' },
    { id: 'visitar', label: 'Visitar', icono: '📍' },
  ];

  return (
    <div className="min-h-screen bg-bar-dark">
      <Header vistaActiva={vistaActiva} onNavigate={setVistaActiva} />

      <AnimatePresence mode="wait">
        {vistaActiva === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Menu />
          </motion.div>
        )}
        {vistaActiva === 'ruleta-premios' && (
          <motion.div
            key="ruleta-premios"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <RuletaPremios />
          </motion.div>
        )}
        {vistaActiva === 'ruleta-consumo' && (
          <motion.div
            key="ruleta-consumo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <RuletaConsumo />
          </motion.div>
        )}
        {vistaActiva === 'visitar' && (
          <motion.div
            key="visitar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Visitar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navegación inferior fija */}
      <div className="fixed bottom-0 left-0 right-0 bg-menu-green-dark/95 backdrop-blur-md border-t border-menu-cream/20 p-2 z-40">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navegacionItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setVistaActiva(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                vistaActiva === item.id
                  ? 'text-menu-cream'
                  : 'text-menu-cream/60 hover:text-menu-cream/90'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl">{item.icono}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

