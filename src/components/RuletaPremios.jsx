import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { premiosRuletaBienvenida } from '../data/menu';

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
        const indice = premiosRuletaBienvenida.findIndex(p => p.id === premio.id);
        if (indice !== -1) {
          setIndicePremioGanado(indice);
        }
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
    const rotacionesCompletas = 5 + Math.random() * 3;
    const rotacionTotal = rotacionesCompletas * 360 + (360 - anguloPremio) + anguloSegmento / 2;
    
    setRotacionFinal(rotacionFinal + rotacionTotal);

    const duracionRotacion = 3000 + Math.random() * 2000;

    setTimeout(() => {
      setPremioGanado(premioAleatorio);
      setIndicePremioGanado(indicePremio);
      setGirando(false);
      setYaGiro(true);
      localStorage.setItem('ruletaBienvenidaGiro', 'true');
      localStorage.setItem('ruletaBienvenidaPremio', JSON.stringify(premioAleatorio));
    }, duracionRotacion);
  };

  const mostrarMensajeLegal = () => {
    setMostrarMensaje(true);
    setTimeout(() => setMostrarMensaje(false), 3000);
  };

  const anguloSegmento = 360 / premiosRuletaBienvenida.length;
  const radio = 140;
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
          🌿 Ruleta de Bienvenida
        </h2>
        <p className="text-white/70 text-sm">
          Gira y gana un descuento especial
        </p>
      </motion.div>

      <div className="relative mb-8 z-10" style={{ width: `${tamañoRuleta}px`, height: `${tamañoRuleta}px` }}>
        <motion.div
          className="relative w-full h-full rounded-full overflow-visible border-4 border-green-primary shadow-2xl"
          animate={{
            rotate: rotacionFinal,
            scale: indicePremioGanado !== null && !girando ? [1, 1.1, 1] : 1,
          }}
          transition={{
            rotate: {
              duration: girando ? 3 + Math.random() * 2 : 0,
              ease: 'easeOut',
            },
            scale: {
              duration: 0.5,
              times: [0, 0.5, 1],
            },
          }}
          style={{
            background: `conic-gradient(
              ${premiosRuletaBienvenida.map((premio, index) => {
                const esGanador = indicePremioGanado === index && !girando;
                const colorBase = index % 2 === 0 ? '#1a1a1a' : '#2a2a2a';
                const colorSegmento = esGanador ? '#22c55e' : colorBase;
                return `${colorSegmento} ${index * anguloSegmento}deg ${(index + 1) * anguloSegmento}deg`;
              }).join(', ')}
            )`,
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${tamañoRuleta} ${tamañoRuleta}`}
          >
            {premiosRuletaBienvenida.map((premio, index) => {
              const anguloRad = (index * anguloSegmento + anguloSegmento / 2) * (Math.PI / 180);
              const centroX = tamañoRuleta / 2;
              const centroY = tamañoRuleta / 2;
              const radioTexto = radio;
              const x = centroX + Math.cos(anguloRad) * radioTexto;
              const y = centroY + Math.sin(anguloRad) * radioTexto;
              const anguloGrados = (anguloRad * 180) / Math.PI;
              const esGanador = indicePremioGanado === index && !girando;

              return (
                <g key={premio.id} transform={`translate(${x}, ${y}) rotate(${anguloGrados + 90})`}>
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    style={{
                      fontSize: esGanador ? '13px' : '11px',
                      fontWeight: esGanador ? '700' : '600',
                      filter: esGanador 
                        ? 'drop-shadow(0 0 6px rgba(34, 197, 94, 0.9)) drop-shadow(0 0 12px rgba(34, 197, 94, 0.5))' 
                        : 'drop-shadow(1px 1px 3px rgba(0,0,0,0.9))',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {premio.texto}
                  </text>
                </g>
              );
            })}
          </svg>

          {indicePremioGanado !== null && !girando && (
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
              className="absolute rounded-full border-4 border-green-primary"
              style={{
                width: `${tamañoRuleta + 20}px`,
                height: `${tamañoRuleta + 20}px`,
                top: '-10px',
                left: '-10px',
                boxShadow: '0 0 30px rgba(34, 197, 94, 0.6)',
              }}
            />
          )}
        </motion.div>

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <motion.div
            animate={indicePremioGanado !== null && !girando ? {
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0],
            } : {}}
            transition={{
              duration: 0.6,
              repeat: indicePremioGanado !== null && !girando ? 2 : 0,
            }}
            className="w-0 h-0 border-transparent"
            style={{
              borderLeftWidth: '10px',
              borderRightWidth: '10px',
              borderTopWidth: '16px',
              borderTopColor: '#22c55e',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
            }}
          />
        </div>
      </div>

      <motion.button
        onClick={girarRuleta}
        disabled={yaGiro || girando}
        className={`px-8 py-4 rounded-full font-bold text-lg ${
          yaGiro || girando
            ? 'bg-white/20 text-white/50 cursor-not-allowed'
            : 'bg-green-primary text-bar-dark hover:bg-green-light'
        } transition-all shadow-lg relative z-10`}
        whileTap={!yaGiro && !girando ? { scale: 0.95 } : {}}
        whileHover={!yaGiro && !girando ? { scale: 1.05 } : {}}
      >
        {girando ? 'Girando...' : yaGiro ? 'Ya giraste la ruleta' : 'Girar Ruleta'}
      </motion.button>

      <button
        onClick={mostrarMensajeLegal}
        className="mt-4 text-xs text-white/50 underline relative z-10"
      >
        Ver términos y condiciones
      </button>

      <AnimatePresence>
        {mostrarMensaje && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-4 p-4 bg-white/10 rounded-lg border border-green-primary/30 max-w-sm relative z-10"
          >
            <p className="text-xs text-center text-white/80">
              ⚖️ Solo una promoción válida por cuenta/mesa. 
              Válido solo para consumo en el establecimiento.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {premioGanado && !girando && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="mt-8 p-6 border-2 border-green-primary rounded-lg text-center shadow-2xl relative z-10"
            style={{
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.25) 100%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h3 className="text-2xl font-elegant font-bold text-green-light mb-2">
              🌿 ¡Felicidades!
            </h3>
            <p className="text-xl font-semibold mb-1 text-white">{premioGanado.texto}</p>
            <p className="text-sm text-white/90">
              Muestra este mensaje al mesero para aplicar tu promoción
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RuletaPremios;

