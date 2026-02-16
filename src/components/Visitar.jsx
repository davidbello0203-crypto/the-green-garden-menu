import { motion } from 'framer-motion';

const NUMERO_WHATSAPP = '527472544725';
const MENSAJE_PEDIDO = 'Hola, quiero hacer un pedido a domicilio de cocina.';

const Visitar = ({ isDomingo }) => {
  const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(MENSAJE_PEDIDO)}`;

  const textPrimary = isDomingo ? 'text-amber-100' : 'text-white';
  const textSecondary = isDomingo ? 'text-amber-200/90' : 'text-menu-cream/90';
  const textMuted = isDomingo ? 'text-amber-200/70' : 'text-white/70';
  const textMuted2 = isDomingo ? 'text-amber-100/90' : 'text-white/90';
  const linkColor = isDomingo ? 'text-amber-100/90 hover:text-amber-100' : 'text-white/90 hover:text-white';
  const pinColor = isDomingo ? 'text-amber-400' : 'text-red-500';
  const socialBg = isDomingo ? 'bg-amber-900 text-amber-100' : 'bg-menu-green-bar text-white';
  const cardBg = isDomingo
    ? 'border-amber-300/30 bg-amber-950/80 backdrop-blur-sm'
    : 'border-menu-cream/30 bg-menu-green-dark/80 backdrop-blur-sm';
  const cardTitle = isDomingo ? 'text-amber-100' : 'text-menu-cream';
  const cardText = isDomingo ? 'text-amber-200/80' : 'text-menu-cream/80';
  const cardSub = isDomingo ? 'text-amber-300/70' : 'text-menu-cream/70';
  const whatsappBg = isDomingo ? 'bg-amber-700 hover:bg-amber-600' : 'bg-green-600 hover:bg-green-500';

  return (
    <div className="min-h-[calc(100vh-9rem)] p-6 pb-8 relative flex flex-col justify-center">
      <div className="max-w-lg mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`font-elegant text-3xl md:text-4xl font-semibold mb-2 ${textPrimary}`}
        >
          Visítanos
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.35 }}
          className={`text-sm font-medium mb-8 italic ${textSecondary}`}
        >
          {isDomingo
            ? 'Birria de Borrego Estilo Jalisco — Domingo Crudon'
            : 'Tu rincón verde en Tixtla — The Green Garden'}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          className={`font-body text-lg tracking-wide space-y-2 ${textMuted2}`}
        >
          <a
            href="https://maps.app.goo.gl/z1Q2YHbbNQjwTpNs8"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-start justify-center gap-2 transition-colors underline underline-offset-4 ${linkColor}`}
          >
            <svg
              className={`w-5 h-5 shrink-0 mt-[3px] ${pinColor}`}
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
            <span>Miguel Negrete S/N, Tixtla de Guerrero, Gro.</span>
          </a>
          {isDomingo ? (
            <div className="mt-5 space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-400/30 bg-amber-900/40">
                <span className="text-lg">📅</span>
                <span className={`text-sm font-semibold ${textPrimary}`}>Solo Domingos</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-400/30 bg-amber-900/40">
                <span className="text-lg">🕗</span>
                <span className={`text-sm font-semibold ${textPrimary}`}>8:00 AM — 3:00 PM</span>
              </div>
              <p className={`text-xs mt-2 ${textMuted}`}>
                Auténtica birria de borrego estilo Jalisco, cada domingo en The Green Garden
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-menu-cream/20 bg-menu-green/30">
                <span className="text-lg">🕖</span>
                <span className={`text-sm font-semibold ${textPrimary}`}>Vie — Sáb: 7:00 PM — 2:00 AM</span>
              </div>
              <p className={`text-xs mt-2 ${textMuted}`}>
                Horarios y más en redes
              </p>
            </div>
          )}
        </motion.div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <motion.a
            href="https://www.facebook.com/share/1PnibQuPRF/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.28, duration: 0.3 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity ${socialBg}`}
          >
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            TheGreenGarden0
          </motion.a>
          <motion.a
            href="https://www.instagram.com/thegreen_garden1"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity ${socialBg}`}
          >
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            @thegreen_garden1
          </motion.a>
        </div>

        {/* Bloque dedicado: Envíos a domicilio */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.35 }}
          className="mt-10 max-w-sm mx-auto"
        >
          <div className={`rounded-2xl border-2 overflow-hidden shadow-xl ${cardBg}`}>
            <div className="px-5 py-4 text-center">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-menu-cream/20 text-2xl mb-3" aria-hidden>
                🛵
              </span>
              <h3 className={`font-slab text-lg font-bold uppercase tracking-wide mb-1 ${cardTitle}`}>
                Envíos a domicilio
              </h3>
              <p className={`text-sm mb-4 ${cardText}`}>
                Pide por WhatsApp y te llevamos
              </p>
              <a
                href={urlWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all active:scale-[0.98] ${whatsappBg}`}
              >
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                747 254 4725 — Pedir por WhatsApp
              </a>
              <p className={`mt-3 text-xs font-medium ${cardSub}`}>
                {isDomingo ? '#DomingoCrudon' : '#Todosagreen'}
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Visitar;
