import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { premiosRuletaBienvenida } from '../data/menu';
import { playSpinStart, playSpinEnd, playSpinLoop } from '../utils/ruletaSound';
import { TEMA_PREMIOS_GREEN, TEMA_PREMIOS_DOMINGO } from '../utils/temas';

const RuletaPremios = ({ isDomingo }) => {
  const t = isDomingo ? TEMA_PREMIOS_DOMINGO : TEMA_PREMIOS_GREEN;

  const [girando, setGirando] = useState(false);
  const [premioGanado, setPremioGanado] = useState(null);
  const [yaGiro, setYaGiro] = useState(false);
  const [rotacionActual, setRotacionActual] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState('');
  const [mostrarTerminos, setMostrarTerminos] = useState(false);

  const DOCE_HORAS_MS = 12 * 60 * 60 * 1000;

  const calcularTiempoRestante = (timestampUltimoGiro) => {
    const ahora = Date.now();
    const proximoGiro = timestampUltimoGiro + DOCE_HORAS_MS;
    const diff = proximoGiro - ahora;
    if (diff <= 0) return '00:00:00';
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diff % (1000 * 60)) / 1000);
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const timestampGuardado = localStorage.getItem('ruletaBienvenidaTimestamp');
    const ahora = Date.now();
    if (timestampGuardado) {
      const tiempoPasado = ahora - parseInt(timestampGuardado);
      if (tiempoPasado >= DOCE_HORAS_MS) {
        localStorage.removeItem('ruletaBienvenidaGiro');
        localStorage.removeItem('ruletaBienvenidaPremio');
        localStorage.removeItem('ruletaBienvenidaTimestamp');
        setYaGiro(false);
        setPremioGanado(null);
      } else {
        const yaGiroRuleta = localStorage.getItem('ruletaBienvenidaGiro');
        if (yaGiroRuleta === 'true') {
          setYaGiro(true);
          const premioGuardado = localStorage.getItem('ruletaBienvenidaPremio');
          if (premioGuardado) setPremioGanado(JSON.parse(premioGuardado));
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!yaGiro) return;
    const timestampGuardado = parseInt(localStorage.getItem('ruletaBienvenidaTimestamp') || '0');
    const actualizar = () => {
      const tiempo = calcularTiempoRestante(timestampGuardado);
      setTiempoRestante(tiempo);
      if (tiempo === '00:00:00') {
        localStorage.removeItem('ruletaBienvenidaGiro');
        localStorage.removeItem('ruletaBienvenidaPremio');
        localStorage.removeItem('ruletaBienvenidaTimestamp');
        setYaGiro(false);
        setPremioGanado(null);
      }
    };
    actualizar();
    const intervalo = setInterval(actualizar, 1000);
    return () => clearInterval(intervalo);
  }, [yaGiro]);

  const girarRuleta = () => {
    if (yaGiro || girando) return;
    setGirando(true);
    setPremioGanado(null);
    const indicePremio = Math.floor(Math.random() * premiosRuletaBienvenida.length);
    const premioAleatorio = premiosRuletaBienvenida[indicePremio];
    const anguloSegmento = 360 / premiosRuletaBienvenida.length;
    const centroSegmento = indicePremio * anguloSegmento + anguloSegmento / 2;
    const posicionActual = (centroSegmento + (rotacionActual % 360) + 360) % 360;
    const ajuste = (360 - posicionActual) % 360;
    const vueltas = Math.floor(6 + Math.random() * 3);
    const rotacionTotal = rotacionActual + (vueltas * 360) + ajuste;
    playSpinStart();
    const stopSpinSound = playSpinLoop({ durationMs: 4500, totalRotationDeg: rotacionTotal });
    setRotacionActual(rotacionTotal);
    setTimeout(() => {
      stopSpinSound();
      playSpinEnd();
      setPremioGanado(premioAleatorio);
      setGirando(false);
      setYaGiro(true);
      localStorage.setItem('ruletaBienvenidaGiro', 'true');
      localStorage.setItem('ruletaBienvenidaPremio', JSON.stringify(premioAleatorio));
      localStorage.setItem('ruletaBienvenidaTimestamp', Date.now().toString());
    }, 4500);
  };

  const numSegmentos = premiosRuletaBienvenida.length;
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
        <h1 className={`text-2xl md:text-3xl font-bold tracking-wide ${t.titulo}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Ruleta de Bienvenida
        </h1>
        <p className={`text-sm mt-1 ${t.tituloSub}`}>Gira y obtén un premio especial</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-4xl">

        {/* Panel de premios - Desktop */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`hidden lg:block rounded-xl p-5 shadow-lg border-2 ${t.panel} ${t.panelBorde}`}
          style={{ minWidth: '200px' }}
        >
          <h3 className={`font-bold text-sm uppercase tracking-wider mb-4 text-center border-b pb-2 ${t.panelTitulo} ${t.panelBorde}`}>
            Premios
          </h3>
          <div className="space-y-3">
            {premiosRuletaBienvenida.map((premio, i) => (
              <div key={premio.id} className="flex items-center gap-3">
                <span
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${t.numeroTexto} text-base font-bold shadow-md`}
                  style={{ backgroundColor: t.numeroBg(i) }}
                >
                  {i + 1}
                </span>
                <span className={`text-base font-medium ${t.panelTexto}`}>{premio.corto}</span>
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

          <div
            className="absolute inset-0 rounded-full shadow-2xl"
            style={{ background: t.gradiente, padding: '8px' }}
          >
            <div className={`w-full h-full rounded-full ${t.bordeInterior} p-2`}>
              <motion.div
                className="w-full h-full rounded-full overflow-hidden relative"
                animate={{ rotate: rotacionActual }}
                transition={{ duration: girando ? 4.5 : 0, ease: [0.2, 0.8, 0.3, 1] }}
                style={{
                  background: `conic-gradient(${premiosRuletaBienvenida.map((_, i) => {
                    const color = t.numeroBg(i);
                    return `${color} ${i * anguloSegmento}deg ${(i + 1) * anguloSegmento}deg`;
                  }).join(', ')})`,
                }}
              >
                <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${tamanoRuleta} ${tamanoRuleta}`}>
                  {premiosRuletaBienvenida.map((_, i) => {
                    const angulo = i * anguloSegmento;
                    const rad = (angulo - 90) * (Math.PI / 180);
                    const x2 = tamanoRuleta / 2 + Math.cos(rad) * (tamanoRuleta / 2);
                    const y2 = tamanoRuleta / 2 + Math.sin(rad) * (tamanoRuleta / 2);
                    return <line key={i} x1={tamanoRuleta / 2} y1={tamanoRuleta / 2} x2={x2} y2={y2} stroke={t.linea} strokeWidth="2" opacity="0.5" />;
                  })}
                </svg>

                <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${tamanoRuleta} ${tamanoRuleta}`}>
                  {premiosRuletaBienvenida.map((_, index) => {
                    const angulo = index * anguloSegmento + anguloSegmento / 2 - 90;
                    const rad = (angulo * Math.PI) / 180;
                    const cx = tamanoRuleta / 2 + Math.cos(rad) * radioTexto;
                    const cy = tamanoRuleta / 2 + Math.sin(rad) * radioTexto;
                    return (
                      <text key={index} x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
                        fill={t.textoSvg} fontSize="36" fontWeight="800" fontFamily="Montserrat, sans-serif"
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.4)' }}>
                        {index + 1}
                      </text>
                    );
                  })}
                </svg>
              </motion.div>

              <button
                onClick={girarRuleta}
                disabled={yaGiro || girando}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 z-20`}
                style={{
                  backgroundColor: yaGiro || girando ? t.spinDisabled : t.spinBg,
                  border: `4px solid ${t.spinBorde}`,
                  boxShadow: `0 6px 20px ${t.spinSombra}, inset 0 2px 4px rgba(255,255,255,0.1)`,
                  cursor: yaGiro || girando ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => { if (!yaGiro && !girando) e.target.style.backgroundColor = t.spinHover; }}
                onMouseLeave={(e) => { if (!yaGiro && !girando) e.target.style.backgroundColor = t.spinBg; }}
              >
                <span className={`${t.spinTexto} font-bold text-lg tracking-wider`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {girando ? '...' : 'SPIN'}
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        <div className="hidden lg:block" style={{ minWidth: '200px' }} />
      </div>

      {/* Resultado */}
      <div className="mt-4 w-full max-w-sm">
        <AnimatePresence mode="wait">
          {premioGanado && !girando ? (
            <motion.div key="resultado" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
              className="p-5 rounded-xl text-center shadow-xl border-2"
              style={{ backgroundColor: t.resultadoBg, borderColor: t.resultadoBorde }}>
              <div className="text-3xl mb-2">🎉</div>
              <p className={`font-bold text-lg mb-1 ${t.resultadoTexto}`}>¡Felicidades!</p>
              <p className={`font-semibold text-lg ${t.resultadoTexto2}`}>{premioGanado.texto}</p>
              <p className={`text-xs mt-3 ${t.resultadoSubtexto}`}>Muestra este mensaje al mesero</p>
            </motion.div>
          ) : yaGiro && !girando ? (
            <motion.div key="usado" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
              <p className={`text-sm ${t.usadoTexto}`}>Ya utilizaste tu giro de hoy</p>
              <p className={`text-xs mt-2 ${t.usadoSub}`}>Próximo giro en <span className="font-mono">{tiempoRestante}</span></p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Leyenda móvil */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="lg:hidden mt-4 w-full max-w-sm"
      >
        <div className={`rounded-xl p-4 shadow-lg border-2 ${t.panel} ${t.panelBorde}`}>
          <h3 className={`font-bold text-xs uppercase tracking-wider mb-3 text-center ${t.panelTitulo}`}>Premios</h3>
          <div className="grid grid-cols-2 gap-2">
            {premiosRuletaBienvenida.map((premio, i) => (
              <div key={premio.id} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${t.legendaItem}`}>
                <span className={`w-7 h-7 rounded flex items-center justify-center ${t.numeroTexto} text-sm font-bold`}
                  style={{ backgroundColor: t.numeroBg(i) }}>
                  {i + 1}
                </span>
                <span className={`text-sm font-medium truncate ${t.panelTexto}`}>{premio.corto}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <button
        onClick={() => setMostrarTerminos(true)}
        className={`mt-4 text-[10px] text-center underline transition-colors ${t.terminosTexto} ${t.terminosHover}`}
      >
        Términos y condiciones
      </button>

      <AnimatePresence>
        {mostrarTerminos && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            onClick={() => setMostrarTerminos(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ duration: 0.2 }}
              className={`rounded-xl p-5 max-w-sm w-full shadow-2xl border-2 ${t.modalBg} ${t.modalBorde}`}
              onClick={(e) => e.stopPropagation()}>
              <h3 className={`font-bold text-sm uppercase tracking-wider mb-4 text-center ${t.modalTitulo}`}>Términos y Condiciones</h3>
              <ul className={`text-xs space-y-2 ${t.modalTexto}`}>
                <li className="flex gap-2"><span className={t.modalBullet}>•</span><span>Promoción válida únicamente en el establecimiento.</span></li>
                <li className="flex gap-2"><span className={t.modalBullet}>•</span><span>Un giro disponible cada 12 horas por dispositivo.</span></li>
                <li className="flex gap-2"><span className={t.modalBullet}>•</span><span>Aplica un solo premio por mesa.</span></li>
                <li className="flex gap-2"><span className={t.modalBullet}>•</span><span>Al canjear el premio, la cuenta de la mesa no podrá dividirse.</span></li>
                <li className="flex gap-2"><span className={t.modalBullet}>•</span><span>No acumulable con otras promociones.</span></li>
              </ul>
              <button onClick={() => setMostrarTerminos(false)} className={`mt-5 w-full py-2 rounded-lg font-semibold text-sm transition-colors ${t.modalBtn}`}>
                Entendido
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RuletaPremios;
