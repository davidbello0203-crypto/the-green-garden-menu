import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { premiosRuletaBienvenida } from '../data/menu';
import FondoHojas from './FondoHojas';

const RuletaPremios = () => {
  const [girando, setGirando] = useState(false);
  const [premioGanado, setPremioGanado] = useState(null);
  const [yaGiro, setYaGiro] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [rotacionFinal, setRotacionFinal] = useState(0);
  const [indicePremioGanado, setIndicePremioGanado] = useState(null);

  useEffect(() => {
    const yaGiroRuleta = localStorage.getItem('ruletaBienvenidaGiro');
    if (yaGiroRuleta === 'true') {
      setYaGiro(true);
      const premioGuardado = localStorage.getItem('ruletaBienvenidaPremio');
      if (premioGuardado) {
        const premio = JSON.parse(premioGuardado);
        setPremioGanado(premio);
        const indice = premiosRuletaBienvenida.findIndex((p) => p.id === premio.id);
        if (indice !== -1) setIndicePremioGanado(indice);
      }
    }
  }, []);

  const girarRuleta = () => {
    if (yaGiro || girando) return;
    setGirando(true);
    setPremioGanado(null);
    setIndicePremioGanado(null);

    const indicePremio = Math.floor(Math.random() * premiosRuletaBienvenida.length);
    const premioAleatorio = premiosRuletaBienvenida[indicePremio];
    const anguloSegmento = 360 / premiosRuletaBienvenida.length;
    const anguloPremio = indicePremio * anguloSegmento;
    const rotacionTotal = (5 + Math.random() * 3) * 360 + (360 - anguloPremio) + anguloSegmento / 2;
    setRotacionFinal((r) => r + rotacionTotal);

    const duracionRotacion = 3000 + Math.random() * 1500;
    setTimeout(() => {
      setPremioGanado(premioAleatorio);
      setIndicePremioGanado(indicePremio);
      setGirando(false);
      setYaGiro(true);
      localStorage.setItem('ruletaBienvenidaGiro', 'true');
      localStorage.setItem('ruletaBienvenidaPremio', JSON.stringify(premioAleatorio));
    }, duracionRotacion);
  };

  const anguloSegmento = 360 / premiosRuletaBienvenida.length;
  const tamañoRuleta = 340;
  const radioTexto = 110;
  const coloresSegmentos = [
    '#ef5350', '#ff9800', '#ffeb3b', '#66bb6a',
    '#42a5f5', '#5c6bc0', '#ab47bc', '#ec407a',
  ];

  return (
    <div className="min-h-screen bg-menu-green-dark pt-24 pb-28 px-4 flex flex-col items-center relative overflow-hidden">
      <FondoHojas />
      <div className="flex flex-col items-center relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-slab font-bold text-menu-cream mb-1">
          Juego de bienvenida
        </h1>
        <p className="text-menu-cream/80 text-sm">
          Gira y gana un descuento especial
        </p>
      </motion.div>

      <motion.div
        className="relative mb-8"
        style={{ width: tamañoRuleta + 24, height: tamañoRuleta + 24 }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.4, ease: 'easeOut' }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-menu-cream shadow-xl border-4 border-menu-cream/80 flex items-center justify-center"
          style={{ padding: 12 }}
          animate={{ rotate: rotacionFinal }}
          transition={{
            rotate: { duration: girando ? 3.5 : 0, ease: [0.2, 0.8, 0.2, 1] },
          }}
        >
          <div
            className="w-full h-full rounded-full overflow-hidden"
            style={{
              background: `conic-gradient(
                ${premiosRuletaBienvenida.map((_, i) => {
                  const color = coloresSegmentos[i % coloresSegmentos.length];
                  return `${color} ${i * anguloSegmento}deg ${(i + 1) * anguloSegmento}deg`;
                }).join(', ')}
              )`,
            }}
          />
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${tamañoRuleta} ${tamañoRuleta}`}>
            {premiosRuletaBienvenida.map((premio, index) => {
              const centroSegmento = index * anguloSegmento + anguloSegmento / 2;
              const anguloGrados = 90 - centroSegmento;
              const anguloRad = (anguloGrados * Math.PI) / 180;
              const cx = tamañoRuleta / 2 + Math.cos(anguloRad) * radioTexto;
              const cy = tamañoRuleta / 2 - Math.sin(anguloRad) * radioTexto;
              const rot = anguloGrados + (anguloGrados > 90 || anguloGrados < -90 ? 180 : 0);
              const label = premio.corto || premio.texto;
              const fontSize = label.length > 14 ? 10 : label.length > 10 ? 11 : 12;
              return (
                <g key={premio.id} transform={`translate(${cx}, ${cy}) rotate(${rot})`}>
                  <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fill="#1a3d32" fontSize={fontSize} fontWeight="700" fontFamily="Inter, sans-serif">
                    {label}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>

        <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-menu-green-dark drop-shadow-md" />
        </div>
      </motion.div>

      <motion.button
        onClick={girarRuleta}
        disabled={yaGiro || girando}
        className={`relative z-10 w-full max-w-xs py-4 rounded-2xl font-bold text-lg transition-all ${
          yaGiro || girando
            ? 'bg-menu-cream/40 text-menu-green-dark/50 cursor-not-allowed'
            : 'bg-menu-green-bar text-menu-cream hover:bg-menu-green-bar/90 active:scale-[0.98]'
        }`}
        whileTap={!yaGiro && !girando ? { scale: 0.98 } : {}}
      >
        {girando ? 'Girando…' : yaGiro ? 'Ya usaste tu giro' : 'Girar'}
      </motion.button>

      <button
        onClick={() => { setMostrarMensaje(true); setTimeout(() => setMostrarMensaje(false), 3500); }}
        className="mt-4 text-xs text-menu-green-dark/60 underline"
      >
        Términos y condiciones
      </button>

      <AnimatePresence>
        {mostrarMensaje && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 rounded-2xl bg-white/95 text-menu-green-dark text-xs text-center max-w-sm shadow-lg border border-menu-cream/30"
          >
            Una promoción por cuenta/mesa. Válido en el establecimiento.
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {premioGanado && !girando && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-8 w-full max-w-sm p-6 rounded-2xl bg-white shadow-xl border-2 border-menu-cream text-center"
          >
            <span className="text-menu-green-dark font-elegant text-xl font-bold block mb-2">
              ¡Felicidades!
            </span>
            <p className="text-menu-green-dark font-bold text-lg mb-1">{premioGanado.texto}</p>
            <p className="text-menu-green-dark/70 text-sm">
              Muestra este mensaje al mesero para aplicar tu promoción
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default RuletaPremios;
