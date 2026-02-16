import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opcionesRuletaConsumo } from '../data/menu';
import { playSpinStart, playSpinEnd, playSpinLoop } from '../utils/ruletaSound';
import { TEMA_CONSUMO_GREEN, TEMA_CONSUMO_DOMINGO } from '../utils/temas';

const RuletaConsumo = ({ isDomingo }) => {
  const t = isDomingo ? TEMA_CONSUMO_DOMINGO : TEMA_CONSUMO_GREEN;

  const [girando, setGirando] = useState(false);
  const [decision, setDecision] = useState(null);
  const [rotacionActual, setRotacionActual] = useState(0);

  const girarRuleta = () => {
    if (girando) return;
    setGirando(true);
    setDecision(null);
    const indiceOpcion = Math.floor(Math.random() * opcionesRuletaConsumo.length);
    const opcionAleatoria = opcionesRuletaConsumo[indiceOpcion];
    const anguloSegmento = 360 / opcionesRuletaConsumo.length;
    const centroSegmento = indiceOpcion * anguloSegmento + anguloSegmento / 2;
    const posicionActual = (centroSegmento + (rotacionActual % 360) + 360) % 360;
    const ajuste = (360 - posicionActual) % 360;
    const vueltas = Math.floor(6 + Math.random() * 3);
    const rotacionTotal = rotacionActual + (vueltas * 360) + ajuste;
    playSpinStart();
    const stopSpinSound = playSpinLoop({ durationMs: 4000, totalRotationDeg: rotacionTotal });
    setRotacionActual(rotacionTotal);
    setTimeout(() => {
      stopSpinSound();
      playSpinEnd();
      setDecision(opcionAleatoria);
      setGirando(false);
    }, 4000);
  };

  const reiniciar = () => setDecision(null);

  const numSegmentos = opcionesRuletaConsumo.length;
  const anguloSegmento = 360 / numSegmentos;
  const tamanoRuleta = 280;
  const radioTexto = tamanoRuleta * 0.38;

  return (
    <div className={`min-h-[calc(100vh-68px)] ${t.bgPage} flex flex-col items-center justify-start px-4 pt-6 pb-8 transition-colors duration-300`}>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h1 className={`text-xl md:text-2xl font-bold tracking-wide ${t.titulo}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
          ¿No saben qué tomar?
        </h1>
        <p className={`text-sm mt-1 ${t.tituloSub}`}>¡Deja que la suerte decida la siguiente ronda!</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-5xl">

        {/* Panel izquierdo - Desktop */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`hidden lg:block rounded-xl p-4 shadow-lg border-2 ${t.panel} ${t.panelBorde}`}
          style={{ minWidth: '180px' }}
        >
          <h3 className={`font-bold text-xs uppercase tracking-wider mb-3 text-center border-b pb-2 ${t.panelTitulo} ${t.panelBorde}`}>
            Opciones
          </h3>
          <div className="space-y-2">
            {opcionesRuletaConsumo.slice(0, 4).map((opcion, i) => (
              <div key={opcion.id + '-l-' + i} className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded flex items-center justify-center ${t.numeroTexto} text-sm font-bold shadow`}
                  style={{ backgroundColor: t.numeroBg(i) }}>
                  {i + 1}
                </span>
                <span className={`text-sm font-medium ${t.panelTexto}`}>{opcion.corto}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Ruleta central */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
          style={{ width: tamanoRuleta + 40, height: tamanoRuleta + 40 }}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
            <div
              className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[28px] border-l-transparent border-r-transparent"
              style={{ borderTopColor: t.flecha, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
            />
          </div>

          <div className="absolute inset-0 rounded-full shadow-2xl" style={{ background: t.gradiente, padding: '8px' }}>
            <div className={`w-full h-full rounded-full ${t.bordeInterior} p-2`}>
              <motion.div
                className="w-full h-full rounded-full overflow-hidden relative"
                animate={{ rotate: rotacionActual }}
                transition={{ duration: girando ? 4 : 0, ease: [0.2, 0.8, 0.3, 1] }}
                style={{
                  background: `conic-gradient(${opcionesRuletaConsumo.map((_, i) => {
                    const color = t.numeroBg(i);
                    return `${color} ${i * anguloSegmento}deg ${(i + 1) * anguloSegmento}deg`;
                  }).join(', ')})`,
                }}
              >
                <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${tamanoRuleta} ${tamanoRuleta}`}>
                  {opcionesRuletaConsumo.map((_, i) => {
                    const angulo = i * anguloSegmento;
                    const rad = (angulo - 90) * (Math.PI / 180);
                    const x2 = tamanoRuleta / 2 + Math.cos(rad) * (tamanoRuleta / 2);
                    const y2 = tamanoRuleta / 2 + Math.sin(rad) * (tamanoRuleta / 2);
                    return <line key={i} x1={tamanoRuleta / 2} y1={tamanoRuleta / 2} x2={x2} y2={y2} stroke={t.linea} strokeWidth="2" opacity="0.5" />;
                  })}
                </svg>

                <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${tamanoRuleta} ${tamanoRuleta}`}>
                  {opcionesRuletaConsumo.map((_, index) => {
                    const angulo = index * anguloSegmento + anguloSegmento / 2 - 90;
                    const rad = (angulo * Math.PI) / 180;
                    const cx = tamanoRuleta / 2 + Math.cos(rad) * radioTexto;
                    const cy = tamanoRuleta / 2 + Math.sin(rad) * radioTexto;
                    return (
                      <text key={index} x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
                        fill={t.textoSvg} fontSize="32" fontWeight="800" fontFamily="Montserrat, sans-serif"
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.4)' }}>
                        {index + 1}
                      </text>
                    );
                  })}
                </svg>
              </motion.div>

              <button
                onClick={girarRuleta}
                disabled={girando}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 z-20"
                style={{
                  backgroundColor: girando ? t.spinDisabled : t.spinBg,
                  border: `4px solid ${t.spinBorde}`,
                  boxShadow: `0 6px 20px ${t.spinSombra}, inset 0 2px 4px rgba(255,255,255,0.1)`,
                  cursor: girando ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => { if (!girando) e.target.style.backgroundColor = t.spinHover; }}
                onMouseLeave={(e) => { if (!girando) e.target.style.backgroundColor = t.spinBg; }}
              >
                <span className={`${t.spinTexto} font-bold text-lg tracking-wider`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {girando ? '...' : 'SPIN'}
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Panel derecho - Desktop */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`hidden lg:block rounded-xl p-4 shadow-lg border-2 ${t.panel} ${t.panelBorde}`}
          style={{ minWidth: '180px' }}
        >
          <h3 className={`font-bold text-xs uppercase tracking-wider mb-3 text-center border-b pb-2 ${t.panelTitulo} ${t.panelBorde}`}>
            Opciones
          </h3>
          <div className="space-y-2">
            {opcionesRuletaConsumo.slice(4).map((opcion, i) => (
              <div key={opcion.id + '-r-' + i} className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded flex items-center justify-center ${t.numeroTexto} text-sm font-bold shadow`}
                  style={{ backgroundColor: t.numeroBg(i + 4) }}>
                  {i + 5}
                </span>
                <span className={`text-sm font-medium ${t.panelTexto}`}>{opcion.corto}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Resultado */}
      <div className="mt-4 w-full max-w-sm">
        <AnimatePresence mode="wait">
          {decision && !girando && (
            <motion.div key="resultado" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
              className="p-5 rounded-xl text-center shadow-xl border-2"
              style={{ backgroundColor: t.resultadoBg, borderColor: t.resultadoBorde }}>
              <div className="text-3xl mb-2">🎲</div>
              <p className={`font-bold text-lg mb-1 ${t.resultadoTexto}`}>Decisión de la Mesa</p>
              <p className={`font-semibold text-lg ${t.resultadoTexto2}`}>{decision.texto}</p>
              <button
                onClick={reiniciar}
                className="mt-4 px-6 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{ backgroundColor: t.reiniciarBg, color: t.reiniciarTexto, border: `2px solid ${t.reiniciarBorde}` }}
                onMouseEnter={(e) => e.target.style.backgroundColor = t.reiniciarHover}
                onMouseLeave={(e) => e.target.style.backgroundColor = t.reiniciarBg}
              >
                Girar de nuevo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Leyenda móvil */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="lg:hidden mt-4 w-full max-w-md"
      >
        <div className={`rounded-xl p-4 shadow-lg border-2 ${t.panel} ${t.panelBorde}`}>
          <h3 className={`font-bold text-xs uppercase tracking-wider mb-3 text-center ${t.panelTitulo}`}>Opciones</h3>
          <div className="grid grid-cols-2 gap-2">
            {opcionesRuletaConsumo.map((opcion, i) => (
              <div key={opcion.id + '-m-' + i} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${t.legendaItem}`}>
                <span className={`w-6 h-6 rounded flex items-center justify-center ${t.numeroTexto} text-xs font-bold`}
                  style={{ backgroundColor: t.numeroBg(i) }}>
                  {i + 1}
                </span>
                <span className={`text-sm font-medium truncate ${t.panelTexto}`}>{opcion.corto}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RuletaConsumo;
