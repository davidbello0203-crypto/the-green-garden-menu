import { motion } from 'framer-motion';

const Visitar = () => {
  return (
    <div className="min-h-screen p-6 pt-28 pb-28 relative">
      <div className="max-w-lg mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-elegant text-3xl md:text-4xl font-semibold text-white mb-2"
        >
          Visítanos
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-green-primary/90 text-sm font-medium mb-8"
        >
          Patio · Zona verde · Mesas de madera · Iluminación cálida
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-body text-white/90 text-lg tracking-wide space-y-2"
        >
          <p>Dirección — Horarios — Contacto</p>
          <p className="text-white/70 text-base mt-4">
            Consulta nuestra ubicación y horarios en Instagram
          </p>
        </motion.div>
        <motion.a
          href="https://www.instagram.com/thegreen_garden1"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-lg bg-green-primary/20 border border-green-primary/40 text-green-primary hover:bg-green-primary/30 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07z" />
          </svg>
          @thegreen_garden1
        </motion.a>
      </div>
    </div>
  );
};

export default Visitar;
