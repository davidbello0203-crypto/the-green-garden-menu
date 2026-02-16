import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DATOS_TRANSFERENCIA = {
  banco: 'BBVA',
  numeroTarjeta: '4152 3142 3861 4344',
  titular: 'Carlos Sinai Martinez',
};

const BurbujaTransferencia = ({ abierto: abiertoExterno, onToggle, isDomingo }) => {
  const [abiertoInterno, setAbiertoInterno] = useState(false);
  const esControlado = abiertoExterno !== undefined && typeof onToggle === 'function';
  const abierto = esControlado ? abiertoExterno : abiertoInterno;
  const setAbierto = esControlado ? onToggle : setAbiertoInterno;
  const [copiadoTarjeta, setCopiadoTarjeta] = useState(false);
  const refPanel = useRef(null);

  // Estado para posición de la burbuja
  const [position, setPosition] = useState({ x: 0, y: 0, side: 'right' });
  const [isDragging, setIsDragging] = useState(false);
  const [wasDragged, setWasDragged] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const bubbleRef = useRef(null);

  const copiarTarjeta = async () => {
    const texto = DATOS_TRANSFERENCIA.numeroTarjeta.replace(/\s/g, '');

    try {
      // Intenta usar la API moderna del clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(texto);
      } else {
        // Fallback para navegadores que no soportan clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = texto;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiadoTarjeta(true);
      setTimeout(() => setCopiadoTarjeta(false), 2500);
    } catch (err) {
      // Si falla, intenta el método alternativo
      const textArea = document.createElement('textarea');
      textArea.value = texto;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiadoTarjeta(true);
        setTimeout(() => setCopiadoTarjeta(false), 2500);
      } catch (e) {
        console.error('Error al copiar:', e);
      }
      document.body.removeChild(textArea);
    }
  };

  useEffect(() => {
    const cerrarAlClicFuera = (e) => {
      if (refPanel.current && !refPanel.current.contains(e.target)) setAbierto(false);
    };
    if (abierto) document.addEventListener('click', cerrarAlClicFuera);
    return () => document.removeEventListener('click', cerrarAlClicFuera);
  }, [abierto, setAbierto]);

  // Funciones de drag
  const handleDragStart = (e) => {
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    dragStart.current = {
      x: clientX,
      y: clientY,
      posX: position.x,
      posY: position.y
    };
    setIsDragging(true);
    setWasDragged(false);
  };

  const handleDrag = (e) => {
    if (!isDragging) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - dragStart.current.x;
    const deltaY = clientY - dragStart.current.y;

    // Si se movió más de 5px, consideramos que fue un drag
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      setWasDragged(true);
    }

    const newX = dragStart.current.posX + deltaX;
    const newY = dragStart.current.posY + deltaY;

    // Limitar Y para que no salga de la pantalla
    // La burbuja está posicionada desde bottom: 140px
    // maxY: máximo que puede bajar (hacia el bottom de la pantalla)
    // minY: máximo que puede subir (hacia el top de la pantalla)
    const bubbleSize = 64;
    const bottomBase = 140;
    const safeAreaTop = 100; // Espacio para el header
    const safeAreaBottom = 20; // Espacio del borde inferior

    const maxY = bottomBase - safeAreaBottom - bubbleSize; // No bajar más allá del borde
    const minY = -(window.innerHeight - bottomBase - safeAreaTop - bubbleSize); // No subir más allá del header

    setPosition(prev => ({
      ...prev,
      x: newX,
      y: Math.max(minY, Math.min(maxY, newY))
    }));
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Determinar a qué lado debe ir (izquierda o derecha)
    const bubble = bubbleRef.current;
    if (!bubble) return;

    const rect = bubble.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const screenCenter = window.innerWidth / 2;

    const newSide = centerX < screenCenter ? 'left' : 'right';

    setPosition(prev => ({
      x: 0,
      y: prev.y,
      side: newSide
    }));
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDrag, { passive: false });
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);

  return (
    <>
      {/* Panel centrado - fuera del contenedor de la burbuja */}
      <AnimatePresence>
        {abierto && (
          <>
            {/* Overlay oscuro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55] bg-black/50"
              onClick={() => setAbierto(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={`fixed z-[60] w-80 max-w-[calc(100vw-2rem)] rounded-2xl border-2 shadow-2xl overflow-hidden inset-0 m-auto h-fit transition-colors duration-300 ${
                isDomingo
                  ? 'border-amber-300/30 bg-amber-950'
                  : 'border-menu-cream/30 bg-menu-green-dark'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
            <div className={`px-5 py-4 border-b transition-colors duration-300 ${
              isDomingo
                ? 'bg-amber-900 border-amber-300/20'
                : 'bg-menu-green-bar border-menu-cream/20'
            }`}>
              <h3 className={`font-slab font-bold text-base uppercase tracking-wide ${isDomingo ? 'text-amber-100' : 'text-menu-cream'}`}>
                Datos de transferencia
              </h3>
            </div>
            <div className="p-5 space-y-4 text-base font-body">
              <div>
                <p className={`text-sm uppercase tracking-wider ${isDomingo ? 'text-amber-200/60' : 'text-menu-cream/60'}`}>Banco</p>
                <p className={`font-medium ${isDomingo ? 'text-amber-100' : 'text-menu-cream'}`}>{DATOS_TRANSFERENCIA.banco}</p>
              </div>
              <div>
                <p className={`text-sm uppercase tracking-wider ${isDomingo ? 'text-amber-200/60' : 'text-menu-cream/60'}`}>Número de tarjeta</p>
                <p className={`font-mono text-lg tracking-wider ${isDomingo ? 'text-amber-100' : 'text-menu-cream'}`}>{DATOS_TRANSFERENCIA.numeroTarjeta}</p>
                <button
                  type="button"
                  onClick={copiarTarjeta}
                  className={`mt-2 w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${
                    copiadoTarjeta
                      ? 'bg-green-500 text-white'
                      : isDomingo
                        ? 'bg-amber-200 text-amber-900 hover:bg-amber-300'
                        : 'bg-menu-cream text-menu-green-dark hover:bg-menu-cream-light'
                  }`}
                >
                  {copiadoTarjeta ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      ¡Número copiado!
                    </span>
                  ) : (
                    'Copiar número de tarjeta'
                  )}
                </button>
              </div>
              <div>
                <p className={`text-sm uppercase tracking-wider ${isDomingo ? 'text-amber-200/60' : 'text-menu-cream/60'}`}>Titular</p>
                <p className={`font-medium ${isDomingo ? 'text-amber-100' : 'text-menu-cream'}`}>{DATOS_TRANSFERENCIA.titular}</p>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Burbuja draggable */}
      <div
        ref={refPanel}
        className={`fixed z-50 ${position.side === 'right' ? 'right-3' : 'left-3'}`}
        style={{
          bottom: `calc(140px + env(safe-area-inset-bottom, 0px))`,
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <button
          ref={bubbleRef}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (!wasDragged) {
              setAbierto(!abierto);
            }
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          className={`flex items-center justify-center w-16 h-16 rounded-full shadow-lg border-2 active:scale-95 transition-all duration-300 select-none touch-none ${
            isDomingo
              ? 'bg-amber-200 text-amber-900 border-amber-400/50 hover:bg-amber-300'
              : 'bg-menu-cream text-menu-green-dark border-menu-green-dark/30 hover:bg-menu-cream-light'
          } ${isDragging ? 'cursor-grabbing scale-110' : 'cursor-grab'}`}
          style={{
            animation: abierto || isDragging ? 'none' : 'pulse-slow 2.5s ease-in-out infinite',
          }}
          aria-label="Ver datos de transferencia"
        >
          <svg className="w-7 h-7 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default BurbujaTransferencia;
