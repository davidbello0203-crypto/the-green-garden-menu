import { motion } from 'framer-motion';

// Patio / jardín con zona verde, madera y luces cálidas
const HERO_BG =
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&q=80';

const Hero = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Imagen de fondo: patio, zona verde, madera, iluminación cálida */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BG}
          alt="Patio The Green Garden - mesas de madera y zona verde con iluminación cálida"
          className="w-full h-full object-cover scale-105"
        />
        {/* Overlay oscuro + tinte verde + luces cálidas para legibilidad y atmósfera */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,20,10,0.75) 0%, rgba(5,25,12,0.85) 40%, rgba(10,30,15,0.9) 100%), radial-gradient(ellipse 80% 50% at 50% 80%, rgba(251,191,36,0.15) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 70% 30%, rgba(34,197,94,0.12) 0%, transparent 45%)',
          }}
        />
        {/* Bokeh suave de luces cálidas */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-60">
          <div className="absolute top-[20%] left-[15%] w-32 h-32 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="absolute top-[30%] right-[20%] w-40 h-40 rounded-full bg-yellow-500/15 blur-3xl" />
          <div className="absolute bottom-[25%] left-[25%] w-28 h-28 rounded-full bg-green-400/15 blur-2xl" />
          <div className="absolute bottom-[35%] right-[30%] w-36 h-36 rounded-full bg-amber-300/20 blur-3xl" />
        </div>
      </div>

      {/* Contenido tipo JUNIPER: COMER · BEBER · VISITAR */}
      <div className="relative z-30 px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-1 mb-8"
        >
          {['COMER', 'BEBER', 'VISITAR'].map((word, i) => (
            <div key={word} className="flex flex-col items-center">
              <button
                onClick={() => {
                  if (word === 'COMER' || word === 'BEBER') onNavigate('menu');
                  else onNavigate('visitar');
                }}
                className="font-elegant text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[0.2em] text-white/95 hover:text-amber-100 transition-colors uppercase"
              >
                {word}
              </button>
              <span className="block w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-green-primary/80 to-transparent mt-1" />
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-body text-sm sm:text-base text-white/80 tracking-widest"
        >
          PATIO · ZONA VERDE · MADERA · LUZ CÁLIDA
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-4 font-body text-white/90 text-base sm:text-lg tracking-wide"
        >
          Ven a disfrutar en nuestro jardín — mesas de madera, mucha verde y ambiente acogedor.
        </motion.p>
        <motion.a
          href="https://www.instagram.com/thegreen_garden1"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="inline-flex items-center gap-2 mt-6 text-green-primary hover:text-amber-200 transition-colors text-sm font-medium"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
          </svg>
          @thegreen_garden1
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
