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
  const [seccionMenuActiva, setSeccionMenuActiva] = useState('bebidas');

  const navegacionItems = [
    { id: 'menu', label: 'Menú', icono: '📋' },
    { id: 'ruleta-consumo', label: 'Juegos', icono: '🎲' },
    { id: 'ruleta-premios', label: 'Premios', icono: '🎁' },
    { id: 'visitar', label: 'Visitar', icono: '📍' },
  ];

  const esRuleta = vistaActiva === 'ruleta-premios' || vistaActiva === 'ruleta-consumo';
  const mostrarBarraEnvios = vistaActiva === 'menu' && seccionMenuActiva !== 'botellas';

  // Color de fondo según la vista
  const fondoVista = esRuleta ? 'bg-arena' : 'bg-bar-dark';

  return (
    <div className={`min-h-screen ${fondoVista}`}>
      {/* Header fijo - altura ~80px */}
      <Header onNavigate={setVistaActiva} />

      {/* Contenido principal: padding abajo para nav y, si aplica, barra de envíos */}
      <main className={`pt-[68px] ${fondoVista} ${mostrarBarraEnvios ? 'pb-32' : 'pb-24'}`}>
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

      {/* Contenedor fijo abajo: barra de envíos + navegación */}
      <div className="fixed bottom-0 left-0 right-0 z-40 safe-area-bottom">
        {/* Barra de envíos a domicilio */}
        {mostrarBarraEnvios && <AnuncioEnvios />}

        {/* Barra de navegación */}
        <nav className="bg-menu-green-dark border-t border-menu-cream/20 px-2 pt-3 pb-3">
          <div className="flex justify-around items-center max-w-md mx-auto">
            {navegacionItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setVistaActiva(item.id)}
                className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all ${
                  vistaActiva === item.id
                    ? 'bg-menu-cream/20 text-menu-cream'
                    : 'text-menu-cream/50 hover:text-menu-cream/80'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{item.icono}</span>
                <span className="text-[10px] font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;

