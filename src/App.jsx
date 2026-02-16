import { useState, useMemo } from 'react';
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
  // Auto-detectar si es domingo por la mañana (antes de las 3pm)
  const modoInicial = useMemo(() => {
    const ahora = new Date();
    const esDomingo = ahora.getDay() === 0;
    const esManana = ahora.getHours() < 15;
    return (esDomingo && esManana) ? 'domingo' : 'green';
  }, []);
  const [menuActivo, setMenuActivo] = useState(modoInicial);

  const navegacionItems = [
    { id: 'menu', label: 'Menú', Icono: UtensilsCrossed },
    { id: 'ruleta-consumo', label: 'Juegos', Icono: Dice5 },
    { id: 'ruleta-premios', label: 'Premios', Icono: Gift },
    { id: 'visitar', label: 'Visitar', Icono: MapPin },
  ];

  const esRuleta = vistaActiva === 'ruleta-premios' || vistaActiva === 'ruleta-consumo';
  const isDomingo = menuActivo === 'domingo';

  return (
    <div className="min-h-screen">
      {!isDomingo && <FondoTropical />}
      <Header onNavigate={setVistaActiva} esRuleta={esRuleta} isDomingo={isDomingo} />

      <main className={`pt-[68px] pb-28 relative z-10 ${esRuleta ? (isDomingo ? 'bg-amber-950' : 'bg-arena') : ''}`}>
        {vistaActiva === 'menu' && (
          <Menu
            initialSeccion={seccionMenuActiva}
            onAbrirTransferencia={() => setBurbujaAbierta(true)}
            onSeccionChange={setSeccionMenuActiva}
            onMenuChange={setMenuActivo}
            menuActivo={menuActivo}
          />
        )}
        {vistaActiva === 'ruleta-premios' && <RuletaPremios isDomingo={isDomingo} />}
        {vistaActiva === 'ruleta-consumo' && <RuletaConsumo isDomingo={isDomingo} />}
        {vistaActiva === 'visitar' && <Visitar isDomingo={isDomingo} />}
      </main>

      {!esRuleta && (
        <BurbujaTransferencia abierto={burbujaAbierta} onToggle={setBurbujaAbierta} isDomingo={isDomingo} />
      )}

      {/* Barra de navegación inferior */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100]">
        <div className={`border-t pb-[env(safe-area-inset-bottom)] transition-colors duration-300 ${
          isDomingo
            ? 'border-amber-300/20 bg-amber-950/80 backdrop-blur-xl'
            : esRuleta
              ? 'border-menu-cream/20 bg-menu-green'
              : 'border-menu-cream/20 bg-menu-green/55 backdrop-blur-xl'
        }`}>
          <div className="flex justify-around items-center px-1 py-1">
            {navegacionItems.map((item) => {
              const activo = vistaActiva === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setVistaActiva(item.id)}
                  className={`flex flex-col items-center justify-center py-3 px-5 rounded-2xl transition-all duration-300 min-w-[72px] active:scale-95 ${
                    activo
                      ? isDomingo
                        ? 'bg-amber-200 text-amber-900'
                        : 'bg-menu-cream text-menu-green-dark'
                      : isDomingo
                        ? 'text-amber-200/70 active:bg-amber-300/20'
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
