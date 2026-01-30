import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opcionesRuletaConsumo } from '../data/menu';

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
  const radioTexto = 128;
  const coloresSegmentos = [
    '#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784',
    '#66bb6a', '#4caf50', '#43a047', '#2e7d32',
  ];

  return (
    <div className="min-h-screen pt-24 pb-28 px-4 flex flex-col items-center bg-gradient-to-b from-menu-cream/20 to-menu-green-dark/30">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-elegant font-bold text-menu-green-dark mb-1">
          Ruleta de la mesa
        </h1>
        <p className="text-menu-green-dark/80 text-sm">
          La suerte elige tu siguiente ronda
        </p>
      </motion.div>

      <div className="relative mb-8" style={{ width: tamañoRuleta + 24, height: tamañoRuleta + 24 }}>
        <motion.div
          className="absolute inset-0 rounded-full bg-white/90 shadow-xl border-4 border-menu-cream flex items-center justify-center"
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
              const anguloRad = (index * anguloSegmento + anguloSegmento / 2) * (Math.PI / 180);
              const cx = tamañoRuleta / 2 + Math.cos(anguloRad) * radioTexto;
              const cy = tamañoRuleta / 2 + Math.sin(anguloRad) * radioTexto;
              const rot = (anguloRad * 180) / Math.PI + 90;
              const texto = opcion.corto || opcion.texto;
              return (
                <g key={opcion.id} transform={`translate(${cx}, ${cy}) rotate(${rot})`}>
                  <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" fill="#1a3d32" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">
                    {texto}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>

        <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-menu-green-dark drop-shadow-md" />
        </div>
      </div>

      <motion.button
        onClick={girarRuleta}
        disabled={girando}
        className={`relative z-10 w-full max-w-xs py-4 rounded-2xl font-bold text-lg transition-all ${
          girando
            ? 'bg-menu-cream/40 text-menu-green-dark/50 cursor-not-allowed'
            : 'bg-menu-green-dark text-menu-cream hover:bg-menu-green-bar active:scale-[0.98]'
        }`}
        whileTap={!girando ? { scale: 0.98 } : {}}
      >
        {girando ? 'Girando…' : 'Girar ruleta'}
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
  );
};

export default RuletaConsumo;
