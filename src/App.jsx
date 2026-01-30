import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import RuletaPremios from './components/RuletaPremios';
import RuletaConsumo from './components/RuletaConsumo';
import Visitar from './components/Visitar';

function App() {
  const [vistaActiva, setVistaActiva] = useState('inicio');

  const navegacionItems = [
    { id: 'inicio', label: 'Inicio', icono: '🏠' },
    { id: 'menu', label: 'Menú', icono: '📋' },
    { id: 'ruleta-premios', label: 'Premios', icono: '🎁' },
    { id: 'ruleta-consumo', label: 'Ruleta', icono: '🎲' },
  ];

  return (
    <div className="min-h-screen bg-bar-dark">
      <Header vistaActiva={vistaActiva} onNavigate={setVistaActiva} />

      <AnimatePresence mode="wait">
        {vistaActiva === 'inicio' && (
          <motion.div
            key="inicio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero onNavigate={setVistaActiva} />
          </motion.div>
        )}
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
      <div className="fixed bottom-0 left-0 right-0 bg-bar-dark/95 backdrop-blur-md border-t border-white/10 p-2 z-40">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navegacionItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setVistaActiva(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                vistaActiva === item.id
                  ? 'text-green-primary'
                  : 'text-white/60 hover:text-amber-200/80'
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

