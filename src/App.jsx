import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import AnuncioEnvios from './components/AnuncioEnvios';
import Menu from './components/Menu';
import RuletaPremios from './components/RuletaPremios';
import RuletaConsumo from './components/RuletaConsumo';
import Visitar from './components/Visitar';
import BurbujaTransferencia from './components/BurbujaTransferencia';

function App() {
  const [vistaActiva, setVistaActiva] = useState('menu');
  const [burbujaAbierta, setBurbujaAbierta] = useState(false);

  const navegacionItems = [
    { id: 'menu', label: 'Menú', icono: '📋' },
    { id: 'ruleta-premios', label: 'Premios', icono: '🎁' },
    { id: 'ruleta-consumo', label: 'Juegos', icono: '🎲' },
    { id: 'visitar', label: 'Visitar', icono: '📍' },
  ];

  return (
    <div className="min-h-screen bg-bar-dark">
      <Header onNavigate={setVistaActiva} />

      <div className="pt-24 pb-24">
        <AnimatePresence mode="wait">
          {vistaActiva === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Menu onAbrirTransferencia={() => setBurbujaAbierta(true)} />
            </motion.div>
          )}
          {vistaActiva === 'ruleta-premios' && (
            <motion.div
              key="ruleta-premios"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <RuletaPremios />
            </motion.div>
          )}
          {vistaActiva === 'ruleta-consumo' && (
            <motion.div
              key="ruleta-consumo"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <RuletaConsumo />
            </motion.div>
          )}
          {vistaActiva === 'visitar' && (
            <motion.div
              key="visitar"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Visitar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pie estático: envíos + WhatsApp + #Todosagreen (solo en pestañas distintas de Visitar) */}
        {vistaActiva !== 'visitar' && <AnuncioEnvios />}
      </div>

      <BurbujaTransferencia abierto={burbujaAbierta} onToggle={setBurbujaAbierta} />

      {/* Barra de pestañas fija (siempre visible, como la burbuja de transferencia) */}
      <div className="fixed bottom-0 left-0 right-0 bg-menu-green-dark/95 backdrop-blur-md border-t border-menu-cream/20 p-2 z-40">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navegacionItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setVistaActiva(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                vistaActiva === item.id
                  ? 'bg-menu-cream/25 text-menu-cream'
                  : 'text-menu-cream/60 hover:text-menu-cream/90'
              }`}
              whileHover={{ scale: 1.05 }}
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

