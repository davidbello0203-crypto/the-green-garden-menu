import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import AnuncioEnvios from './components/AnuncioEnvios';
import Menu from './components/Menu';
import RuletaPremios from './components/RuletaPremios';
import RuletaConsumo from './components/RuletaConsumo';
import Visitar from './components/Visitar';
import BurbujaTransferencia from './components/BurbujaTransferencia';
import FondoTropical from './components/FondoTropical';

function App() {
  const [vistaActiva, setVistaActiva] = useState('menu');
  const [burbujaAbierta, setBurbujaAbierta] = useState(false);
  const [seccionMenuActiva, setSeccionMenuActiva] = useState('bebidas');

  const navegacionItems = [
    { id: 'menu', label: 'Menú', icono: '📋' },
    { id: 'ruleta-consumo', label: 'Juegos', icono: '🎲' },
    { id: 'ruleta-premios', label: 'Premios', icono: '🎁' },
    { id: 'visitar', label: 'Visitar', icono: '📍' },
  ];

  const esRuleta = vistaActiva === 'ruleta-premios' || vistaActiva === 'ruleta-consumo';
  const mostrarBarraEnvios = vistaActiva === 'menu' && seccionMenuActiva !== 'botellas';

  // Color de fondo según la vista (transparente para menú, para que se vea el fondo de imagen)
  const fondoVista = esRuleta ? 'bg-arena' : '';

  return (
    <div className="min-h-screen">
      {/* Fondo global */}
      <FondoTropical />
      
      {/* Header fijo - altura ~80px */}
      <Header onNavigate={setVistaActiva} />

      {/* Contenido principal: padding abajo para nav y, si aplica, barra de envíos */}
      <main className={`pt-[68px] pb-28 relative z-10 ${fondoVista}`}>
        <AnimatePresence mode="wait">
          {vistaActiva === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Menu
                initialSeccion={seccionMenuActiva}
                onAbrirTransferencia={() => setBurbujaAbierta(true)}
                onSeccionChange={setSeccionMenuActiva}
              />
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
      </main>

      {!esRuleta && <BurbujaTransferencia abierto={burbujaAbierta} onToggle={setBurbujaAbierta} />}

      {/* Barra de navegación inferior */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100]">
        <div className="bg-menu-green-dark/40 backdrop-blur-xl border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
          <div className="flex justify-around items-center px-1 py-1">
            {navegacionItems.map((item) => {
              const activo = vistaActiva === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setVistaActiva(item.id)}
                  style={{ touchAction: 'manipulation' }}
                  className={`flex flex-col items-center justify-center py-3 px-5 rounded-2xl transition-colors duration-150 min-w-[72px] active:scale-95 ${
                    activo
                      ? 'bg-menu-cream text-menu-green-dark'
                      : 'text-menu-cream/70 active:bg-white/20'
                  }`}
                >
                  <span className="text-xl mb-1">
                    {item.icono}
                  </span>
                  <span className={`text-xs font-medium tracking-wide ${activo ? 'font-semibold' : ''}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;

