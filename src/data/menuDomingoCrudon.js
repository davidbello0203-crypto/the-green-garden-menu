// Menú Domingo Crudon — Birria de Borrego Estilo Jalisco
export const menuDomingoCrudon = {
  categorias: [
    {
      id: 'birria',
      nombre: 'Birria de Borrego',
      descripcion: 'Nuestra especialidad, preparada con receta tradicional de Jalisco',
      productos: [
        { id: 1, nombre: 'Quesataco', precio: 45, descripcion: 'Tortilla de harina o maíz rellena de birria y queso fundido', promo: '3 x $130' },
        { id: 2, nombre: 'Taco', precio: 35, descripcion: 'Tortilla hecha a mano con birria de borrego, cebolla y cilantro', promo: '3 x $100' },
        { id: 3, nombre: 'Tazón', precio: 120, descripcion: 'Consomé con birria de borrego, incluye tortillas de harina o maíz' },
        { id: 4, nombre: 'Tazón de Birriamen', precio: 150, descripcion: 'Ramen estilo birria con fideos, consomé y borrego deshebrado' },
        { id: 5, nombre: 'Huarache', precio: 90, descripcion: 'Masa de maíz crujiente con birria, frijoles, queso y salsa' },
      ],
    },
  ],
  bebidas: [
    {
      id: 'refrescos',
      nombre: 'Refrescos',
      productos: [
        { id: 100, nombre: 'Coca Cola', precio: 25 },
        { id: 101, nombre: 'Fresca', precio: 25 },
        { id: 102, nombre: 'Yoli', precio: 25 },
        { id: 103, nombre: 'Sprite', precio: 25 },
        { id: 104, nombre: 'Electrolit', precio: 35 },
        { id: 105, nombre: 'Agua Natural (1L)', precio: 15 },
      ],
    },
    {
      id: 'cervezas',
      nombre: 'Cervezas',
      productos: [
        { id: 110, nombre: 'Corona', precio: 28 },
        { id: 111, nombre: 'Victoria', precio: 28 },
        { id: 112, nombre: 'XX Lager', precio: 25 },
        { id: 113, nombre: 'Miller', precio: 40 },
        { id: 114, nombre: 'Bohemia oscura', precio: 35 },
        { id: 115, nombre: 'Bohemia clásica', precio: 35 },
        { id: 116, nombre: 'Heineken 0.0', precio: 25 },
        { id: 117, nombre: 'Indio', precio: 25 },
      ],
    },
  ],
};

export const seccionesDomingoCrudon = [
  {
    id: 'birria',
    nombre: 'Birria',
    icono: '🍖',
    categoriaIds: ['birria'],
  },
  {
    id: 'bebidas',
    nombre: 'Bebidas',
    icono: '🥤',
    categoriaIds: ['refrescos', 'cervezas'],
  },
];
