import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opcionesRuletaConsumo } from '../data/menu';
import FondoHojas from './FondoHojas';

const RuletaConsumo = () => {
  const [girando, setGirando] = useState(false);
  const [decision, setDecision] = useState(null);
  const [rotacionFinal, setRotacionFinal] = useState(0);
  const [indiceOpcionGanada, setIndiceOpcionGanada] = useState(null);

  const girarRuleta = () => {
    if (girando) return;
    setGirando(true);
    setDecision(null);
    setIndiceOpcionGanada(null);

    const indiceOpcion = Math.floor(Math.random() * opcionesRuletaConsumo.length);
    const opcionAleatoria = opcionesRuletaConsumo[indiceOpcion];
    const anguloSegmento = 360 / opcionesRuletaConsumo.length;
    const anguloOpcion = indiceOpcion * anguloSegmento;
    const rotacionTotal = (4 + Math.random() * 2) * 360 + (360 - anguloOpcion) + anguloSegmento / 2;
    setRotacionFinal((r) => r + rotacionTotal);

    const duracionRotacion = 2500 + Math.random() * 1200;
    setTimeout(() => {
      setDecision(opcionAleatoria);
      setIndiceOpcionGanada(indiceOpcion);
      setGirando(false);
    }, duracionRotacion);
  };

  const anguloSegmento = 360 / opcionesRuletaConsumo.length;
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
          Juego de la mesa
        </h1>
        <p className="text-menu-cream/80 text-sm">
          La suerte elige tu siguiente ronda
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
            rotate: { duration: girando ? 3 : 0, ease: [0.2, 0.8, 0.2, 1] },
          }}
        >
          <div
            className="w-full h-full rounded-full overflow-hidden"
            style={{
              background: `conic-gradient(
                ${opcionesRuletaConsumo.map((_, i) => {
                  const color = coloresSegmentos[i % coloresSegmentos.length];
                  return `${color} ${i * anguloSegmento}deg ${(i + 1) * anguloSegmento}deg`;
                }).join(', ')}
              )`,
            }}
          />
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${tamañoRuleta} ${tamañoRuleta}`}>
            {opcionesRuletaConsumo.map((opcion, index) => {
              const anguloGrados = index * anguloSegmento + anguloSegmento / 2;
              const anguloRad = anguloGrados * (Math.PI / 180);
              const cx = tamañoRuleta / 2 + Math.cos(anguloRad) * radioTexto;
              const cy = tamañoRuleta / 2 + Math.sin(anguloRad) * radioTexto;
              const rot = anguloGrados + 90 + (anguloGrados > 90 && anguloGrados < 270 ? 180 : 0);
              const labelRuleta = opcion.corto || opcion.texto;
              const fontSize = labelRuleta.length > 18 ? 9 : labelRuleta.length > 14 ? 10 : 12;
              return (
                <g key={opcion.id} transform={`translate(${cx}, ${cy}) rotate(${rot})`}>
                  <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" fill="#1a3d32" fontSize={fontSize} fontWeight="700" fontFamily="Inter, sans-serif">
                    {labelRuleta}
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
        disabled={girando}
        className={`relative z-10 w-full max-w-xs py-4 rounded-2xl font-bold text-lg transition-all ${
          girando
            ? 'bg-menu-cream/40 text-menu-green-dark/50 cursor-not-allowed'
            : 'bg-menu-green-bar text-menu-cream hover:bg-menu-green-bar/90 active:scale-[0.98]'
        }`}
        whileTap={!girando ? { scale: 0.98 } : {}}
      >
        {girando ? 'Girando…' : 'Girar'}
      </motion.button>

      <AnimatePresence>
        {decision && !girando && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-8 w-full max-w-sm p-6 rounded-2xl bg-white shadow-xl border-2 border-menu-cream text-center"
          >
            <span className="text-menu-green-dark font-elegant text-xl font-bold block mb-2">
              Decisión de la mesa
            </span>
            <p className="text-menu-green-dark font-bold text-lg mb-1">{decision.texto}</p>
            <p className="text-menu-green-dark/70 text-sm">
              ¡A disfrutar!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default RuletaConsumo;
