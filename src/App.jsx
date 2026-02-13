import { useState } from 'react';
import { UtensilsCrossed, Dice5, Gift, MapPin } from 'lucide-react';
import Header from './components/Header';
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
    { id: 'menu', label: 'Menú', Icono: UtensilsCrossed },
    { id: 'ruleta-consumo', label: 'Juegos', Icono: Dice5 },
    { id: 'ruleta-premios', label: 'Premios', Icono: Gift },
    { id: 'visitar', label: 'Visitar', Icono: MapPin },
  ];

  const esRuleta = vistaActiva === 'ruleta-premios' || vistaActiva === 'ruleta-consumo';

  return (
    <div className="min-h-screen">
      <FondoTropical />
      <Header onNavigate={setVistaActiva} esRuleta={esRuleta} />

      <main className={`pt-[68px] pb-28 relative z-10 ${esRuleta ? 'bg-arena' : ''}`}>
        {vistaActiva === 'menu' && (
          <Menu
            initialSeccion={seccionMenuActiva}
            onAbrirTransferencia={() => setBurbujaAbierta(true)}
            onSeccionChange={setSeccionMenuActiva}
          />
        )}
        {vistaActiva === 'ruleta-premios' && <RuletaPremios />}
        {vistaActiva === 'ruleta-consumo' && <RuletaConsumo />}
        {vistaActiva === 'visitar' && <Visitar />}
      </main>

      {!esRuleta && (
        <BurbujaTransferencia abierto={burbujaAbierta} onToggle={setBurbujaAbierta} />
      )}

      {/* Barra de navegación inferior */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100]">
        <div className={`border-t border-menu-cream/20 pb-[env(safe-area-inset-bottom)] ${
          esRuleta ? 'bg-menu-green' : 'bg-menu-green/55 backdrop-blur-xl'
        }`}>
          <div className="flex justify-around items-center px-1 py-1">
            {navegacionItems.map((item) => {
              const activo = vistaActiva === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setVistaActiva(item.id)}
                  className={`flex flex-col items-center justify-center py-3 px-5 rounded-2xl transition-colors min-w-[72px] active:scale-95 ${
                    activo
                      ? 'bg-menu-cream text-menu-green-dark'
                      : 'text-menu-cream/70 active:bg-white/20'
                  }`}
                >
                  <item.Icono size={22} strokeWidth={activo ? 2.5 : 1.8} className="mb-1" />
                  <span className={`text-xs tracking-wide ${activo ? 'font-semibold' : 'font-medium'}`}>
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
