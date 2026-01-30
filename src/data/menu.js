export const menuData = {
  categorias: [
    {
      id: 'cervezas',
      nombre: 'Cervezas',
      icono: '🍺',
      productos: [
        {
          id: 1,
          nombre: 'Corona',
          precio: 38,
          descripcion: 'Cerveza mexicana refrescante'
        },
        {
          id: 2,
          nombre: 'Victoria',
          precio: 38,
          descripcion: 'Cerveza clásica mexicana'
        },
        {
          id: 3,
          nombre: 'Michelob Ultra',
          precio: 38,
          descripcion: 'Cerveza ligera premium'
        }
      ]
    },
    {
      id: 'shots',
      nombre: 'Shots',
      icono: '🥃',
      productos: [
        {
          id: 4,
          nombre: 'Tequila Tradicional',
          precio: 45,
          descripcion: 'Tequila 100% agave'
        },
        {
          id: 5,
          nombre: 'Mezcal Artesanal',
          precio: 45,
          descripcion: 'Mezcal premium artesanal'
        },
        {
          id: 6,
          nombre: 'Tequila Baby Mango',
          precio: 45,
          descripcion: 'Tequila con sabor a mango'
        }
      ]
    },
    {
      id: 'comida',
      nombre: 'Comida',
      icono: '🍔',
      productos: [
        {
          id: 7,
          nombre: 'Hamburguesa Sencilla',
          precio: 120,
          descripcion: 'Carne, lechuga, tomate, cebolla y aderezos'
        },
        {
          id: 8,
          nombre: 'Hamburguesa Doble',
          precio: 180,
          descripcion: 'Doble carne, lechuga, tomate, cebolla y aderezos'
        },
        {
          id: 9,
          nombre: 'Hamburguesa Edición The Green',
          precio: 200,
          descripcion: 'Hamburguesa especial con ingredientes frescos del jardín',
          destacado: true
        },
        {
          id: 10,
          nombre: 'Boneless',
          precio: 150,
          descripcion: 'Piezas de pollo empanizadas con salsas'
        },
        {
          id: 11,
          nombre: 'Papas Francesas',
          precio: 80,
          descripcion: 'Papas fritas crujientes'
        }
      ]
    },
    {
      id: 'refrescos',
      nombre: 'Refrescos',
      icono: '🥤',
      productos: [
        {
          id: 12,
          nombre: 'Coca Cola',
          precio: 35,
          descripcion: 'Refresco de cola'
        },
        {
          id: 13,
          nombre: 'Manzanita',
          precio: 35,
          descripcion: 'Refresco de manzana'
        },
        {
          id: 14,
          nombre: 'Mandarina',
          precio: 35,
          descripcion: 'Refresco de mandarina'
        },
        {
          id: 15,
          nombre: 'Sprite',
          precio: 35,
          descripcion: 'Refresco de limón-lima'
        }
      ]
    },
    {
      id: 'promociones',
      nombre: 'Promociones',
      icono: '🎉',
      productos: [
        {
          id: 16,
          nombre: 'Cubetazo',
          precio: 189,
          descripcion: '6 cervezas Corona o Victoria',
          destacado: true
        }
      ]
    }
  ]
};

export const premiosRuletaBienvenida = [
  { id: 1, texto: '10% de descuento', tipo: 'descuento', valor: 10 },
  { id: 2, texto: 'Shot gratis', tipo: 'shot', valor: 1 },
  { id: 3, texto: '15% de descuento', tipo: 'descuento', valor: 15 },
  { id: 4, texto: 'Cerveza gratis', tipo: 'cerveza', valor: 1 },
  { id: 5, texto: '5% de descuento', tipo: 'descuento', valor: 5 },
  { id: 6, texto: 'Shot gratis', tipo: 'shot', valor: 1 },
  { id: 7, texto: '20% de descuento', tipo: 'descuento', valor: 20 },
  { id: 8, texto: 'Cerveza gratis', tipo: 'cerveza', valor: 1 },
];

export const opcionesRuletaConsumo = [
  { id: 1, texto: 'Siguiente ronda: Cubetazo', accion: 'cubetazo' },
  { id: 2, texto: 'Shot de Tequila Baby Mango', accion: 'shot-baby-mango' },
  { id: 3, texto: 'Mezcal para todos', accion: 'mezcal-todos' },
  { id: 4, texto: 'Toma el de la izquierda', accion: 'izquierda' },
  { id: 5, texto: 'Ronda de cervezas', accion: 'cervezas' },
  { id: 6, texto: 'Shot de Tequila Tradicional', accion: 'shot-tradicional' },
  { id: 7, texto: 'Cubetazo especial', accion: 'cubetazo' },
  { id: 8, texto: 'Toma el de la derecha', accion: 'derecha' },
];

