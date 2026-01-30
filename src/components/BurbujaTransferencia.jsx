import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Sustituye estos datos por los reales de The Green Garden
const DATOS_TRANSFERENCIA = {
  banco: 'Banco (ej. BBVA, Banorte)',
  numeroCuenta: '012345678901234567',
  clabe: '012 180 001234567890 1',
  titular: 'The Green Garden',
};

const BurbujaTransferencia = ({ abierto: abiertoExterno, onToggle }) => {
  const [abiertoInterno, setAbiertoInterno] = useState(false);
  const esControlado = abiertoExterno !== undefined && typeof onToggle === 'function';
  const abierto = esControlado ? abiertoExterno : abiertoInterno;
  const setAbierto = esControlado ? onToggle : setAbiertoInterno;
  const [copiadoCuenta, setCopiadoCuenta] = useState(false);
  const [copiadoClabe, setCopiadoClabe] = useState(false);
  const refPanel = useRef(null);

  const copiarNumero = () => {
    const texto = DATOS_TRANSFERENCIA.numeroCuenta.replace(/\s/g, '');
    navigator.clipboard.writeText(texto).then(() => {
      setCopiadoCuenta(true);
      setTimeout(() => setCopiadoCuenta(false), 2000);
    });
  };

  const copiarClabe = () => {
    const texto = DATOS_TRANSFERENCIA.clabe.replace(/\s/g, '');
    navigator.clipboard.writeText(texto).then(() => {
      setCopiadoClabe(true);
      setTimeout(() => setCopiadoClabe(false), 2000);
    });
  };

  useEffect(() => {
    const cerrarAlClicFuera = (e) => {
      if (refPanel.current && !refPanel.current.contains(e.target)) setAbierto(false);
    };
    if (abierto) document.addEventListener('click', cerrarAlClicFuera);
    return () => document.removeEventListener('click', cerrarAlClicFuera);
  }, [abierto, setAbierto]);

  return (
    <div ref={refPanel} className="fixed bottom-20 right-4 z-50 flex flex-col items-end">
      <AnimatePresence>
        {abierto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-72 rounded-2xl border-2 border-menu-cream/30 bg-menu-green-dark shadow-xl overflow-hidden"
          >
            <div className="px-4 py-3 bg-menu-green-bar border-b border-menu-cream/20">
              <h3 className="font-slab font-bold text-menu-cream text-sm uppercase tracking-wide">
                Datos de transferencia
              </h3>
            </div>
            <div className="p-4 space-y-3 text-sm font-body">
              <div>
                <p className="text-menu-cream/60 text-xs uppercase tracking-wider">Banco</p>
                <p className="text-menu-cream font-medium">{DATOS_TRANSFERENCIA.banco}</p>
              </div>
              <div>
                <p className="text-menu-cream/60 text-xs uppercase tracking-wider">Número de cuenta</p>
                <p className="text-menu-cream font-mono text-base break-all">{DATOS_TRANSFERENCIA.numeroCuenta}</p>
                <button
                  type="button"
                  onClick={copiarNumero}
                  className="mt-1.5 w-full py-2 rounded-lg bg-menu-cream text-menu-green-dark font-semibold text-xs hover:bg-menu-cream-light transition-colors"
                >
                  {copiadoCuenta ? '¡Copiado!' : 'Copiar número de cuenta'}
                </button>
              </div>
              <div>
                <p className="text-menu-cream/60 text-xs uppercase tracking-wider">CLABE</p>
                <p className="text-menu-cream font-mono text-sm break-all">{DATOS_TRANSFERENCIA.clabe}</p>
                <button
                  type="button"
                  onClick={copiarClabe}
                  className="mt-1.5 w-full py-2 rounded-lg bg-menu-green-bar text-menu-cream font-semibold text-xs hover:bg-menu-green-bar/80 transition-colors border border-menu-cream/20"
                >
                  {copiadoClabe ? '¡Copiado!' : 'Copiar CLABE'}
                </button>
              </div>
              <div>
                <p className="text-menu-cream/60 text-xs uppercase tracking-wider">Titular</p>
                <p className="text-menu-cream font-medium">{DATOS_TRANSFERENCIA.titular}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={(e) => { e.stopPropagation(); setAbierto(!abierto); }}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-menu-cream text-menu-green-dark shadow-lg border-2 border-menu-green-dark/30 hover:bg-menu-cream-light transition-colors"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Ver datos de transferencia"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      </motion.button>
    </div>
  );
};

export default BurbujaTransferencia;
