/**
 * Fondo con imagen de cócteles
 */

const BG_DRINKS = '/bg-drinks.png';

const FondoTropical = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {/* Imagen de fondo con blur suave */}
    <img
      src={BG_DRINKS}
      alt=""
      className="absolute inset-0 w-full h-full object-cover scale-110"
      style={{ filter: 'blur(2px) brightness(0.25)' }}
    />
  </div>
);

export default FondoTropical;
