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
    const rotacionesCompletas = 4 + Math.random() * 2;
    const rotacionTotal = rotacionesCompletas * 360 + (360 - anguloOpcion) + anguloSegmento / 2;
    
    setRotacionFinal(rotacionFinal + rotacionTotal);

    const duracionRotacion = 2500 + Math.random() * 1500;

    setTimeout(() => {
      setDecision(opcionAleatoria);
      setIndiceOpcionGanada(indiceOpcion);
      setGirando(false);
    }, duracionRotacion);
  };

  const anguloSegmento = 360 / opcionesRuletaConsumo.length;
  const radio = 120;
  const tamañoRuleta = 320;

  return (
    <div className="min-h-screen p-4 pt-24 pb-28 flex flex-col items-center justify-center relative">
      {/* Elementos decorativos tropicales */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 text-5xl opacity-10"
          animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          🌿
        </motion.div>
        <motion.div
          className="absolute top-32 right-15 text-4xl opacity-10"
          animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          🌱
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-15 text-4xl opacity-10"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          🍃
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-5xl opacity-10"
          animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          🌴
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 relative z-10"
      >
        <h2 className="text-3xl font-elegant font-bold text-shadow-glow mb-2">
          🌱 La Ruleta de la Mesa
        </h2>
        <p className="text-white/70 text-sm">
          Deja que la suerte decida tu siguiente ronda
        </p>
      </motion.div>

      <div className="relative mb-8 z-10" style={{ width: `${tamañoRuleta}px`, height: `${tamañoRuleta}px` }}>
        <motion.div
          className="relative w-full h-full rounded-full overflow-visible border-4 border-green-accent shadow-2xl"
          animate={{
            rotate: rotacionFinal,
            scale: indiceOpcionGanada !== null && !girando ? [1, 1.1, 1] : 1,
          }}
          transition={{
            rotate: {
              duration: girando ? 2.5 + Math.random() * 1.5 : 0,
              ease: 'easeOut',
            },
            scale: {
              duration: 0.5,
              times: [0, 0.5, 1],
            },
          }}
          style={{
            background: `conic-gradient(
              ${opcionesRuletaConsumo.map((opcion, index) => {
                const esGanador = indiceOpcionGanada === index && !girando;
                const colorBase = index % 2 === 0 ? '#1a1a1a' : '#2a2a2a';
                const colorSegmento = esGanador ? '#10b981' : colorBase;
                return `${colorSegmento} ${index * anguloSegmento}deg ${(index + 1) * anguloSegmento}deg`;
              }).join(', ')}
            )`,
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${tamañoRuleta} ${tamañoRuleta}`}
          >
            {opcionesRuletaConsumo.map((opcion, index) => {
              const anguloRad = (index * anguloSegmento + anguloSegmento / 2) * (Math.PI / 180);
              const centroX = tamañoRuleta / 2;
              const centroY = tamañoRuleta / 2;
              const radioTexto = radio;
              const x = centroX + Math.cos(anguloRad) * radioTexto;
              const y = centroY + Math.sin(anguloRad) * radioTexto;
              const anguloGrados = (anguloRad * 180) / Math.PI;
              const esGanador = indiceOpcionGanada === index && !girando;

              return (
                <g key={opcion.id} transform={`translate(${x}, ${y}) rotate(${anguloGrados + 90})`}>
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    style={{
                      fontSize: esGanador ? '12px' : '10px',
                      fontWeight: esGanador ? '700' : '600',
                      filter: esGanador 
                        ? 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.9)) drop-shadow(0 0 12px rgba(16, 185, 129, 0.5))' 
                        : 'drop-shadow(1px 1px 3px rgba(0,0,0,0.9))',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {opcion.texto}
                  </text>
                </g>
              );
            })}
          </svg>

          {indiceOpcionGanada !== null && !girando && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 1.2, 1.1, 1.2],
              }}
              transition={{
                duration: 1.5,
                times: [0, 0.3, 0.7, 1],
                repeat: 2,
              }}
              className="absolute rounded-full border-4 border-green-accent"
              style={{
                width: `${tamañoRuleta + 20}px`,
                height: `${tamañoRuleta + 20}px`,
                top: '-10px',
                left: '-10px',
                boxShadow: '0 0 30px rgba(16, 185, 129, 0.6)',
              }}
            />
          )}
        </motion.div>

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <motion.div
            animate={indiceOpcionGanada !== null && !girando ? {
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0],
            } : {}}
            transition={{
              duration: 0.6,
              repeat: indiceOpcionGanada !== null && !girando ? 2 : 0,
            }}
            className="w-0 h-0 border-transparent"
            style={{
              borderLeftWidth: '10px',
              borderRightWidth: '10px',
              borderTopWidth: '16px',
              borderTopColor: '#10b981',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
            }}
          />
        </div>
      </div>

      <motion.button
        onClick={girarRuleta}
        disabled={girando}
        className={`px-8 py-4 rounded-full font-bold text-lg ${
          girando
            ? 'bg-white/20 text-white/50 cursor-not-allowed'
            : 'bg-green-accent text-white hover:bg-green-light'
        } transition-all shadow-lg relative z-10`}
        whileTap={!girando ? { scale: 0.95 } : {}}
        whileHover={!girando ? { scale: 1.05 } : {}}
      >
        {girando ? 'Girando...' : 'Girar Ruleta'}
      </motion.button>

      <AnimatePresence>
        {decision && !girando && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="mt-8 p-6 border-2 border-green-accent rounded-lg text-center max-w-sm shadow-2xl relative z-10"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(34, 197, 94, 0.25) 100%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h3 className="text-2xl font-elegant font-bold text-green-light mb-2">
              🌱 Decisión de la Mesa
            </h3>
            <p className="text-xl font-semibold mb-1 text-white">{decision.texto}</p>
            <p className="text-sm text-white/90 mt-2">
              ¡Es hora de disfrutar!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RuletaConsumo;

