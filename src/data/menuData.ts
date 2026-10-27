export interface MenuItem {
  id: string;
  name: string;
  category: 'pizzas' | 'empanadas' | 'milanesas' | 'chivitos' | 'postres' | 'bebidas';
  description: string;
  price: number;
  highlight?: string;
  isVegetarian?: boolean;
  allergens?: string[];
  options?: string[];
  imageUrl: string;
}

export interface DailyMenuDay {
  dayName: string;
  dayIndex: number; // 1 = Monday, 6 = Saturday
  title: string;
  description: string;
  firstCourse: string[];
  secondCourse: string[];
  sides: string[];
  desserts: string[];
  badge?: string;
}

export const RESTAURANT_INFO = {
  name: 'Celeste',
  tagline: 'Comida Uruguaya Casera · Take Away',
  shortBio: 'Pizzas al molde, fainá crujiente, empanadas recién horneadas, milanesas colosales y el auténtico sabor rioplatense para llevar en Barcelona.',
  address: 'Carrer Torns 22, 08028 Barcelona',
  neighborhood: 'Sants / Les Corts',
  phone: '+34 93 421 88 19',
  phoneCall: '+34934218819',
  whatsapp: '+34 611 72 39 40',
  whatsappClean: '34611723940',
  email: 'contacto@celestebcn.com',
  metro: 'Badal (L5) / Plaça de Sants (L1-L5) / Collblanc (L5-L9)',
  schedule: [
    { days: 'Martes a Viernes', lunch: '12:30 - 16:00', dinner: '19:30 - 23:30' },
    { days: 'Sábados y Domingos', lunch: '12:30 - 16:30', dinner: '19:30 - 23:45' },
    { days: 'Lunes', lunch: 'Cerrado por descanso semanal', dinner: '' },
  ],
  dailyMenuPrice: 11.90,
  dailyMenuWeekendPrice: 13.50,
};

export const MENU_CATEGORIES = [
  { id: 'all', name: 'Todos los platos', icon: 'Utensils' },
  { id: 'pizzas', name: 'Pizzas & Fainá', icon: 'Pizza' },
  { id: 'empanadas', name: 'Empanadas Caseras', icon: 'Croissant' },
  { id: 'milanesas', name: 'Milanesas Supremas', icon: 'Beef' },
  { id: 'chivitos', name: 'Chivitos Uruguayos', icon: 'Sandwich' },
  { id: 'postres', name: 'Postres Tradicionales', icon: 'Cake' },
  { id: 'bebidas', name: 'Bebidas & Vinos', icon: 'Wine' },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // PIZZAS & FAINÁ
  {
    id: 'pizza-muzzarella',
    name: 'Pizza de Muzzarella Clásica',
    category: 'pizzas',
    description: 'La auténtica pizza al molde rioplatense: masa esponjosa con piso crocante, salsa de tomates maduros condimentada y abundante muzzarella fundida con orégano y aceitunas verdes.',
    price: 11.50,
    highlight: 'El clásico rioplatense',
    isVegetarian: true,
    allergens: ['Gluten', 'Lácteos'],
    options: ['Entera (8 porciones)', 'Media pizza (6.50€)'],
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pizza-faina-caballo',
    name: 'Pizza de Muzzarella "A Caballo" con Fainá',
    category: 'pizzas',
    description: 'La combinación sagrada de Montevideo: porción generosa de pizza de muzzarella coronada con una lámina de fainá recién salido del horno y pimienta negra recién molida.',
    price: 13.90,
    highlight: 'Costumbre Uruguaya',
    isVegetarian: true,
    allergens: ['Gluten', 'Lácteos'],
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pizza-fugazzeta',
    name: 'Fugazzeta Rellena Celeste',
    category: 'pizzas',
    description: 'Masa al molde rellena con doble muzzarella y jamón dulce, cubierta con cebollas dulces confitadas, orégano campestre, parmesano gratinado y aceite de oliva virgen.',
    price: 14.50,
    highlight: 'Super rellena',
    allergens: ['Gluten', 'Lácteos'],
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pizza-napolitana',
    name: 'Pizza Napolitana Rioplatense',
    category: 'pizzas',
    description: 'Base de muzzarella uruguaya, finas rodajas de tomate natural fresco, lluvia de ajo confitado dorado, hojas de albahaca fresca y aceitunas negras.',
    price: 13.00,
    isVegetarian: true,
    allergens: ['Gluten', 'Lácteos'],
    imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pizza-panceta-morron',
    name: 'Pizza con Panceta y Morrones Asados',
    category: 'pizzas',
    description: 'Muzzarella fundida, panceta ahumada crocante cortada en tiras gruesas y pimientos morrones asados a fuego lento en nuestro horno.',
    price: 13.80,
    allergens: ['Gluten', 'Lácteos'],
    imageUrl: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'faina-clasica',
    name: 'Fainá Clásica al Molde',
    category: 'pizzas',
    description: 'Tradicional fainá elaborada 100% con harina pura de garbanzo, horneada a alta temperatura para lograr ese borde dorado crujiente y corazón suave.',
    price: 3.50,
    highlight: 'Vegana & Sin Gluten',
    isVegetarian: true,
    allergens: [],
    imageUrl: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'faina-queso-oregano',
    name: 'Fainá de Queso y Orégano Silvestre',
    category: 'pizzas',
    description: 'Nuestra fainá clásica coronada con provolone hilado y orégano rioplatense tostado durante el horneado.',
    price: 4.20,
    isVegetarian: true,
    allergens: ['Lácteos'],
    imageUrl: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=800&q=80',
  },

  // EMPANADAS
  {
    id: 'emp-carne-cuchillo',
    name: 'Empanada Criolla de Carne a Cuchillo',
    category: 'empanadas',
    description: 'Corte magro de ternera cortado a cuchillo a mano, cebolla dulce en juliana fina, huevo duro campestre, aceitunas verdes y pimentón ahumado. Jugosa y en masa hojaldrada casera.',
    price: 2.90,
    highlight: 'La más pedida',
    allergens: ['Gluten', 'Huevos'],
    imageUrl: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'emp-carne-picante',
    name: 'Empanada Criolla Picante Oriental',
    category: 'empanadas',
    description: 'Ternera seleccionada con toque justo de ají molido uruguayo, comino aromático, pimientos y cebollino. Sabor profundo con calor agradable.',
    price: 2.90,
    allergens: ['Gluten', 'Huevos'],
    imageUrl: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'emp-jamon-queso',
    name: 'Empanada de Jamón Dulce y Muzzarella',
    category: 'empanadas',
    description: 'Rellena generosamente con jamón cocido seleccionado y muzzarella fundida super cremosa con pizca de pimienta blanca.',
    price: 2.80,
    allergens: ['Gluten', 'Lácteos'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'emp-caprese',
    name: 'Empanada Caprese Rioplatense',
    category: 'empanadas',
    description: 'Muzzarella fresca, tomates asados dulces confitados en nuestro horno y hojas de albahaca fresca picadas con aceite de oliva.',
    price: 2.80,
    isVegetarian: true,
    allergens: ['Gluten', 'Lácteos'],
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'emp-cebolla-queso',
    name: 'Empanada de Cebolla Caramelizada y Quesos',
    category: 'empanadas',
    description: 'Cebolla tierna pochada despacio hasta caramelizar naturalmente, combinada con muzzarella y gouda curado.',
    price: 2.80,
    isVegetarian: true,
    allergens: ['Gluten', 'Lácteos'],
    imageUrl: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'emp-humita',
    name: 'Empanada de Humita Dulce y Queso',
    category: 'empanadas',
    description: 'Choclo tierno rallado en salsa blanca especiada con nuez moscada, pimientos sofritos y corazón fundido de queso mantecoso.',
    price: 2.80,
    isVegetarian: true,
    allergens: ['Gluten', 'Lácteos'],
    imageUrl: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'emp-pack-docena',
    name: 'Caja Take Away de 12 Empanadas Surtidas',
    category: 'empanadas',
    description: 'Elige tus 12 empanadas preferidas en caja especial térmica con salsitas caseras de chimichurri y salsa criolla de regalo.',
    price: 31.90,
    highlight: 'Ideal para grupos (-10%)',
    allergens: ['Gluten', 'Lácteos', 'Huevos'],
    imageUrl: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
  },

  // MILANESAS
  {
    id: 'mila-napolitana',
    name: 'Milanesa a la Napolitana Suprema',
    category: 'milanesas',
    description: 'Milanesa gigante tierna empanada con pan rallado casero y hierbas, cubierta con salsa de tomate hecha en casa, jamón york de primera y una capa abundante de muzzarella gratinada al horno. Acompañada de papas fritas rústicas o ensalada.',
    price: 14.50,
    highlight: 'Plato estrella de la casa',
    allergens: ['Gluten', 'Lácteos', 'Huevos'],
    options: ['Ternera de primera', 'Suprema de Pollo'],
    imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mila-a-caballo',
    name: 'Milanesa "A Caballo" con Papas Rústicas',
    category: 'milanesas',
    description: 'Corte generoso y crujiente coronado por dos huevos fritos de campo con yema líquida para mojar, sobre un colchón de papas fritas caseras cortadas a mano.',
    price: 13.90,
    allergens: ['Gluten', 'Huevos'],
    options: ['Ternera de primera', 'Suprema de Pollo'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mila-celeste-especial',
    name: 'Milanesa Celeste Especial',
    category: 'milanesas',
    description: 'Cubierta con muzzarella fundida, panceta ahumada a la plancha, cebolla caramelizada, pimiento asado y lluvia de chimichurri artesanal.',
    price: 15.50,
    highlight: 'Receta propia de la casa',
    allergens: ['Gluten', 'Lácteos', 'Huevos'],
    options: ['Ternera de primera', 'Suprema de Pollo'],
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mila-al-pan-completa',
    name: 'Milanesa al Pan "En Dos Panes" Completa',
    category: 'milanesas',
    description: 'El clásico sándwich uruguayo en pan baguette casero crujiente: milanesa entera, lechuga fresca, tomate en rodajas, jamón, muzzarella derretida, huevo a la plancha y mayonesa casera con papas fritas.',
    price: 12.90,
    highlight: 'El clásico de los carritos uruguayos',
    allergens: ['Gluten', 'Lácteos', 'Huevos'],
    options: ['Ternera', 'Pollo'],
    imageUrl: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mila-suiza',
    name: 'Suprema Suiza Cuatro Quesos',
    category: 'milanesas',
    description: 'Suprema de pollo crujiente bañada en suave bechamel casera, gratinada con mezcla de muzzarella, provolone, gouda y gorgonzola.',
    price: 14.80,
    allergens: ['Gluten', 'Lácteos', 'Huevos'],
    imageUrl: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
  },

  // CHIVITOS URUGUAYOS
  {
    id: 'chivito-canadiense',
    name: 'Chivito Canadiense al Pan (El Monumental)',
    category: 'chivitos',
    description: 'El rey indiscutido del Río de la Plata: tierno churrasco de lomo de ternera a la plancha, panceta ahumada crujiente, jamón york, muzzarella derretida, huevo a la plancha, lechuga, rodajas de tomate, aceitunas verdes picadas, morrón asado y mayonesa casera en pan tortuga artesanal tostado. Incluye abundante porción de papas fritas.',
    price: 14.90,
    highlight: 'Icono Nacional de Uruguay',
    allergens: ['Gluten', 'Lácteos', 'Huevos'],
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'chivito-clasico',
    name: 'Chivito Clásico al Pan con Papas',
    category: 'chivitos',
    description: 'Fino churrasco de ternera a la plancha, muzzarella derretida, jamón cocido, lechuga crocante, tomate fresco y mayonesa casera con papas fritas.',
    price: 12.50,
    allergens: ['Gluten', 'Lácteos', 'Huevos'],
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'chivito-al-plato',
    name: 'Chivito al Plato Celeste (Para 2 personas)',
    category: 'chivitos',
    description: 'Servido sobre un lecho generoso de ensalada rusa casera y papas fritas doradas: 2 lomos de ternera a la plancha cubiertos de queso, jamón, panceta, dos huevos fritos, palmitos con salsa golf, morrón y aceitunas.',
    price: 24.50,
    highlight: 'Super Abundante',
    allergens: ['Gluten', 'Lácteos', 'Huevos'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  },

  // POSTRES
  {
    id: 'postre-chaja',
    name: 'Torta Chajá Tradicional de Paysandú',
    category: 'postres',
    description: 'El postre uruguayo por excelencia: bizcochuelo liviano humedecido, capas generosas de dulce de leche uruguayo, nata fresca montada, duraznos dulces y trozos crujientes de merengue seco artesanal.',
    price: 5.20,
    highlight: 'Postre típico oriental',
    allergens: ['Gluten', 'Lácteos', 'Huevos'],
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'postre-flan-ddl',
    name: 'Flan Casero al Caramelo con Dulce de Leche',
    category: 'postres',
    description: 'Receta de la abuela con huevos de campo y leche entera infusionada con vainilla natural, bañado en caramelo dorado y acompañado con una cucharada volcánica de dulce de leche uruguayo.',
    price: 4.50,
    highlight: 'Con Dulce de Leche abundante',
    allergens: ['Lácteos', 'Huevos'],
    imageUrl: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'postre-alfajores-maicena',
    name: 'Pack de 3 Alfajores de Maicena Artesanales',
    category: 'postres',
    description: 'Tapitas ultra suaves que se deshacen en la boca, repletas de dulce de leche espeso y bordes rebozados en coco rallado tostado.',
    price: 4.80,
    allergens: ['Gluten', 'Lácteos', 'Huevos'],
    imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'postre-pastafrola',
    name: 'Porción de Pasta Frola Casera de Membrillo',
    category: 'postres',
    description: 'Masa sableé aromatizada con ralladura de limón y vainilla, rellena con auténtico dulce de membrillo uruguayo y su clásico enrejado.',
    price: 4.20,
    allergens: ['Gluten', 'Lácteos', 'Huevos'],
    imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
  },

  // BEBIDAS
  {
    id: 'bebida-cerveza-patricia',
    name: 'Cerveza Patricia 1 Litro (Uruguay)',
    category: 'bebidas',
    description: 'La cerveza de las sierras de Minas, Uruguay. Lager dorada equilibrada y refrescante para acompañar pizzas y empanadas.',
    price: 5.50,
    highlight: 'Importada de Uruguay',
    allergens: ['Gluten'],
    imageUrl: 'https://images.unsplash.com/photo-1608270110352-332309e3e3b7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bebida-vino-tannat',
    name: 'Vino Tinto Tannat Uruguayo Reserva',
    category: 'bebidas',
    description: 'La uva insignia uruguaya. Vino estructurado con notas a frutos negros maduros, chocolate y taninos aterciopelados.',
    price: 15.00,
    highlight: 'Cepa emblema de Uruguay',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bebida-paso-toros',
    name: 'Refresco Pomelo Rioplatense',
    category: 'bebidas',
    description: 'Bebida gaseosa de pomelo amargo, el clásico indiscutible para maridar con pizzas y milanesas.',
    price: 2.50,
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bebida-refrescos',
    name: 'Refrescos & Aguas (Coca-Cola, Zero, Fanta, Agua)',
    category: 'bebidas',
    description: 'Lata de 33cl bien fría o botella de agua mineral 50cl.',
    price: 2.20,
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
  },
];

export const DAILY_MENUS: DailyMenuDay[] = [
  {
    dayIndex: 1,
    dayName: 'Lunes',
    title: 'Pastel de Papa Criollo al Horno',
    description: 'Capas abundantes de carne picada sazonada a la criolla con huevo duro, aceitunas y cebollita, cubierto con puré de papas casero dorado al horno con queso muzzarella.',
    firstCourse: [
      'Pastel de Papa y Carne Criolla Gratinado',
      'Dúo de Empanadas Caseras a Elección',
      'Sopa de Verduras de Temporada con Croutons',
    ],
    secondCourse: [
      'Ensalada Mixta de Campo con Tomate y Cebolla',
      'Porción de Fainá Clásica al Horno',
      'Arroz Blanco Salteado con Ajo y Perejil',
    ],
    sides: ['Pan de campo casero', 'Salsita criolla'],
    desserts: ['Flan casero con dulce de leche', 'Fruta fresca de temporada', 'Café'],
    badge: 'Inicio de semana con energía',
  },
  {
    dayIndex: 2,
    dayName: 'Martes',
    title: 'Ravioles Caseros de Ricota y Espinaca con Tuco',
    description: 'Pasta fresca hecha a mano rellena con espinaca fresca y ricota suave, bañada en tuco de carne cocinado a fuego lento durante 4 horas y toque de pesto genovés.',
    firstCourse: [
      'Ravioles Caseros con Tuco a Fuego Lento y Pesto',
      'Tallarines al Huevo con Salsa Cuatro Quesos',
      '2 Empanadas Artesanales con Salsas',
    ],
    secondCourse: [
      'Milanesita de Pechuga de Pollo Crocante',
      'Ensalada Caprese con Albahaca Fresca',
      'Papas Rústicas al Horno con Romero',
    ],
    sides: ['Pan caliente', 'Queso rallado'],
    desserts: ['Porción de Pasta Frola de Membrillo', 'Flan con dulce de leche', 'Yogur artesanal'],
    badge: 'Día de Pastas Caseras',
  },
  {
    dayIndex: 3,
    dayName: 'Miércoles',
    title: 'Guiso de Lentejas a la Oriental',
    description: 'Plato reconfortante uruguayo con lentejas tiernas, panceta ahumada, chorizo colorado, calabaza, zanahorias y especias rioplatenses. Abundante y perfecto para llevar caliente.',
    firstCourse: [
      'Guiso de Lentejas con Panceta y Chorizo Colorado',
      'Pizza al Molde con Muzzarella (2 porciones)',
      'Ensalada César con Pollo al Horno',
    ],
    secondCourse: [
      'Porción de Fainá de Orégano y Queso',
      'Tortilla de Papas y Cebolla Casera',
      'Arroz con Queso Fundido',
    ],
    sides: ['Pan recién horneado', 'Guindilla suave'],
    desserts: ['Alfajor de Maicena artesanal', 'Flan al caramelo', 'Fruta del día'],
    badge: 'Cuchara Tradicional',
  },
  {
    dayIndex: 4,
    dayName: 'Jueves',
    title: 'Suprema de Pollo al Verdeo con Papas Cuña',
    description: 'Jugosa pechuga de pollo de corral marinada en finas hierbas y bañada en salsa suave de cebollino fresco, crema y vino blanco, con papas doradas al horno.',
    firstCourse: [
      'Suprema de Pollo en Crema de Verdeo',
      'Canelones de Carne y Acelga con Salsa Mixta',
      '2 Empanadas Criollas a Elección',
    ],
    secondCourse: [
      'Papas Cuña Especiadas al Horno',
      'Arroz Pilaf con Verduras Salteadas',
      'Ensalada Verde con Vinagreta Balsámica',
    ],
    sides: ['Pan crocante'],
    desserts: ['Copa de Crema con Dulce de Leche', 'Flan con caramelo', 'Café'],
    badge: 'Sabor Casero Rioplatense',
  },
  {
    dayIndex: 5,
    dayName: 'Viernes',
    title: 'Milanesa a la Napolitana con Puré Cremoso',
    description: 'El clásico de los viernes: milanesa de ternera bien crocante cubierta de salsa de tomate casera, jamón dulce y muzzarella gratinada con puré de papas a la manteca.',
    firstCourse: [
      'Milanesa Napolitana de Ternera Tradicional',
      'Pizza Especial de Jamón y Morrones (2 porciones)',
      'Lasagna Casera de Carne y Queso',
    ],
    secondCourse: [
      'Puré de Papas Casero con Nuez Moscada',
      'Papas Fritas Rústicas',
      'Ensalada Mixta Fresca',
    ],
    sides: ['Pan casero', 'Salsa chimichurri'],
    desserts: ['Torta Chajá (suplemento +1.50€)', 'Flan con dulce de leche', 'Fruta'],
    badge: 'El Favorito de la Semana',
  },
  {
    dayIndex: 6,
    dayName: 'Sábado',
    title: 'Menú Especial Fin de Semana: Asado al Horno & Empanadas',
    description: 'Tira de asado tierna y jugosa cocinada despacio al horno con chimichurri casero de la casa, acompañada de papas doradas rústicas y empanada de bienvenida.',
    firstCourse: [
      'Asado de Tira al Horno con Chimichurri Celeste',
      'Chivito al Pan Clásico con Papas Fritas',
      'Milanesa Suprema a Caballo con Huevos Fritos',
    ],
    secondCourse: [
      'Papas Doradas al Horno con Romero',
      'Ensalada Rusa Casera',
      'Porción de Fainá con Queso',
    ],
    sides: ['Pan de campo', 'Chimichurri y Salsa Criolla'],
    desserts: ['Torta Chajá de Paysandú', 'Flan casero XL con dulce de leche', 'Postre Celeste'],
    badge: 'Especial Fin de Semana (13,50€)',
  },
];
