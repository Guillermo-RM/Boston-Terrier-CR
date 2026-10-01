export type ArticleSource = { label: string; url: string }
export type ArticleSection = { heading: string; paragraphs: string[]; bullets?: string[] }
export type ArticleFaq = { question: string; answer: string }

export type SeoArticle = {
  slug: string
  title: string
  seoTitle: string
  description: string
  eyebrow: string
  excerpt: string
  readTime: string
  publishedAt: string
  updatedAt: string
  keywords: string[]
  quickAnswer: string
  sections: ArticleSection[]
  faqs: ArticleFaq[]
  sources: ArticleSource[]
  relatedSlugs: string[]
}

const akcBreed: ArticleSource = { label: 'American Kennel Club: Boston Terrier', url: 'https://www.akc.org/dog-breeds/boston-terrier/' }
const akcFit: ArticleSource = { label: 'American Kennel Club: ¿es el Boston Terrier ideal para ti?', url: 'https://www.akc.org/expert-advice/dog-breeds/boston-terrier-right-for-you/' }
const akcFacts: ArticleSource = { label: 'American Kennel Club: datos sobre el Boston Terrier', url: 'https://www.akc.org/expert-advice/lifestyle/7-facts-boston-terrier/' }
const akcStandard: ArticleSource = { label: 'American Kennel Club: estándar oficial del Boston Terrier', url: 'https://images.akc.org/pdf/breeds/standards/BostonTerrier.pdf' }

export const articles: SeoArticle[] = [
  {
    slug: 'boston-terrier-caracteristicas-caracter-tamano',
    title: 'Boston Terrier: características, carácter, tamaño y esperanza de vida',
    seoTitle: 'Boston Terrier: carácter, tamaño y características',
    description: 'Conoce las características del Boston Terrier: personalidad, tamaño, peso, colores, esperanza de vida y estilo de convivencia.',
    eyebrow: 'Conoce la raza',
    excerpt: 'Una guía completa para descubrir por qué el Boston Terrier es un compañero familiar tan expresivo, sociable y especial.',
    readTime: '7 min de lectura',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    keywords: ['boston terrier características', 'boston terrier carácter', 'boston terrier tamaño', 'boston terrier esperanza de vida', 'cómo es el boston terrier'],
    quickAnswer: 'El Boston Terrier es un perro de compañía compacto, inteligente, alegre y muy cercano a su familia. Se distingue por su pelaje corto, sus elegantes marcas blancas y una personalidad vivaz. Su tamaño manejable y su capacidad para integrarse en la rutina del hogar lo convierten en una raza muy apreciada.',
    sections: [
      { heading: 'La apariencia del “caballero americano”', paragraphs: ['El Boston Terrier es conocido como el “caballero americano” por las marcas de su pelaje, que recuerdan un esmoquin. Tiene un cuerpo compacto y equilibrado, cabeza cuadrada, ojos redondos y una expresión atenta que forma parte de su encanto.', 'Su pelaje es corto, liso y brillante. Los colores reconocidos incluyen negro, atigrado o seal acompañados de blanco. Cada ejemplar conserva una expresión propia, aunque todos comparten el aspecto elegante y deportivo característico de la raza.'], bullets: ['Altura orientativa: aproximadamente 25 a 30 cm.', 'Peso orientativo: aproximadamente 5,4 a 11,3 kg.', 'Pelaje corto y de mantenimiento sencillo.', 'Esperanza de vida habitual: alrededor de 11 a 13 años.'] },
      { heading: 'Un carácter alegre y cercano', paragraphs: ['El Boston Terrier suele ser sociable, despierto y muy pendiente de las personas. Disfruta participando en las actividades familiares, aprendiendo juegos y acompañando a sus humanos por la casa.', 'Su inteligencia y deseo de interacción hacen que las sesiones de aprendizaje puedan convertirse en un momento divertido. Los premios, la constancia y un tono amable ayudan a construir una relación de confianza.'] },
      { heading: 'Actividad y vida cotidiana', paragraphs: ['Combina momentos de juego con largos descansos cerca de su familia. Los paseos diarios, juguetes interactivos y pequeños ejercicios de aprendizaje enriquecen su rutina sin necesidad de convertir cada salida en una actividad extensa.', 'Su tamaño permite integrarlo con facilidad en distintos tipos de vivienda. Lo más importante es ofrecerle compañía, una rutina estable y oportunidades de compartir tiempo de calidad.'] },
      { heading: '¿Para quién puede ser ideal?', paragraphs: ['Puede resultar una excelente opción para personas que buscan un perro afectuoso, expresivo, manejable y con disposición para convivir dentro del hogar. Se adapta tanto a familias como a parejas o personas individuales que disfrutan tener un compañero cercano.', 'Conocer sus características antes de elegir permite preparar mejor la casa, organizar horarios y disfrutar desde el principio de todo lo que aporta esta raza.'] },
    ],
    faqs: [
      { question: '¿Cuánto crece un Boston Terrier?', answer: 'Es una raza compacta. El AKC indica una altura aproximada de 25 a 30 cm y un peso que puede ir de 5,4 a 11,3 kg.' },
      { question: '¿Cómo es el carácter del Boston Terrier?', answer: 'Suele ser alegre, sociable, inteligente y muy unido a su familia. Cada perro tiene su propia personalidad y la educación ayuda a desarrollar sus mejores cualidades.' },
      { question: '¿Cuánto vive un Boston Terrier?', answer: 'La expectativa habitual indicada por el AKC se encuentra alrededor de 11 a 13 años.' },
    ],
    sources: [akcBreed, akcFit],
    relatedSlugs: ['boston-terrier-familia-ninos-convivencia', 'boston-terrier-apartamento-vida-urbana', 'historia-boston-terrier-curiosidades'],
  },
  {
    slug: 'boston-terrier-familia-ninos-convivencia',
    title: 'Boston Terrier en familia: carácter, niños y convivencia',
    seoTitle: 'Boston Terrier con niños y familias: convivencia',
    description: 'Descubre cómo es la convivencia del Boston Terrier con familias, niños, visitas y otras mascotas.',
    eyebrow: 'Vida en familia',
    excerpt: 'Ideas para integrar su personalidad sociable en una casa con niños, visitas y otros compañeros animales.',
    readTime: '6 min de lectura',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    keywords: ['boston terrier niños', 'boston terrier familia', 'boston terrier otras mascotas', 'carácter boston terrier', 'convivencia boston terrier'],
    quickAnswer: 'El Boston Terrier suele destacar como perro de compañía familiar por su carácter alegre, afectuoso y participativo. Disfruta el contacto con las personas y puede compartir el hogar con niños y otros animales cuando las presentaciones, rutinas y espacios se organizan de forma amable.',
    sections: [
      { heading: 'Un integrante más de la familia', paragraphs: ['Al Boston Terrier le gusta formar parte de lo que sucede en casa. Puede acompañar una tarde tranquila, participar en juegos breves y convertirse en una presencia constante durante las actividades diarias.', 'Una rutina con horarios de comida, paseos, descanso y juego le ayuda a entender qué esperar. Esa previsibilidad favorece una convivencia cómoda para todos.'] },
      { heading: 'Convivencia con niños', paragraphs: ['Su tamaño y personalidad juguetona pueden encajar muy bien con familias. Los niños pueden participar en tareas sencillas como preparar juguetes, practicar señales básicas o acompañar los paseos junto a un adulto.', 'Enseñar interacciones respetuosas crea una relación positiva: acariciar suavemente, permitir que el perro descanse y compartir juegos apropiados convierte la convivencia en una experiencia enriquecedora.'] },
      { heading: 'Visitas y vida social', paragraphs: ['Muchos Boston reciben a las personas con curiosidad y entusiasmo. Practicar saludos tranquilos desde cachorro ayuda a que las visitas sean agradables y ordenadas.', 'Una cama o zona propia le ofrece un punto de descanso cuando la casa tiene más movimiento. También puede aprender a esperar, sentarse y acercarse cuando se le invita.'] },
      { heading: 'Convivencia con otros animales', paragraphs: ['Las presentaciones graduales permiten que cada animal descubra al otro a su ritmo. Paseos paralelos, intercambio de olores y espacios separados al inicio facilitan una incorporación natural.', 'Mantener comederos, camas y juguetes bien organizados contribuye a una convivencia armoniosa. Con acompañamiento y rutinas coherentes, muchos Boston disfrutan compartir el hogar con otros perros o gatos.'] },
    ],
    faqs: [
      { question: '¿El Boston Terrier es bueno con niños?', answer: 'Suele ser afectuoso y juguetón. La convivencia funciona mejor cuando los adultos enseñan a los niños a interactuar con respeto y acompañan los momentos de juego.' },
      { question: '¿Puede vivir con otro perro?', answer: 'Sí. Muchos Boston disfrutan la compañía de otros perros cuando las presentaciones se hacen gradualmente y cada uno cuenta con sus propios recursos.' },
      { question: '¿Es una raza cariñosa?', answer: 'Generalmente sí. Es un perro de compañía que suele buscar cercanía, atención e interacción con su familia.' },
    ],
    sources: [akcFit, akcBreed],
    relatedSlugs: ['boston-terrier-caracteristicas-caracter-tamano', 'educacion-boston-terrier-entrenamiento', 'primeros-dias-cachorro-boston-terrier-casa'],
  },
  {
    slug: 'boston-terrier-apartamento-vida-urbana',
    title: 'Boston Terrier en apartamento: rutina, paseos y vida urbana',
    seoTitle: 'Boston Terrier en apartamento y vida urbana',
    description: 'Cómo organizar la vida de un Boston Terrier en apartamento: paseos, juego, descanso, visitas y horarios.',
    eyebrow: 'Vida urbana',
    excerpt: 'Una rutina práctica para disfrutar la compañía de un Boston Terrier en apartamentos y espacios urbanos.',
    readTime: '6 min de lectura',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    keywords: ['boston terrier apartamento', 'boston terrier vida urbana', 'boston terrier casa pequeña', 'boston terrier paseos', 'perro para apartamento'],
    quickAnswer: 'El Boston Terrier puede adaptarse muy bien a un apartamento gracias a su tamaño compacto y a que disfruta vivir cerca de su familia. Una buena rutina combina paseos, juegos dentro de casa, momentos de aprendizaje y una zona cómoda de descanso.',
    sections: [
      { heading: 'El espacio bien aprovechado', paragraphs: ['No necesita una casa enorme para sentirse integrado. Un rincón tranquilo con cama, agua, juguetes y buena circulación permite crear su espacio personal sin aislarlo de la familia.', 'Organizar los accesorios en un mismo lugar simplifica la rutina. Una cesta para juguetes, un área de alimentación y un sitio cercano a la puerta para correa y arnés hacen más fluidos los paseos.'] },
      { heading: 'Paseos que enriquecen el día', paragraphs: ['Los paseos no solo aportan movimiento: también ofrecen olores, sonidos y experiencias nuevas. Alternar recorridos y permitir momentos de exploración convierte una salida sencilla en una actividad estimulante.', 'En Costa Rica puede resultar agradable aprovechar las primeras horas de la mañana o el final de la tarde, creando una rutina cómoda tanto para el perro como para su familia.'] },
      { heading: 'Juegos para espacios interiores', paragraphs: ['Esconder pequeñas recompensas, practicar señales, utilizar juguetes rellenables y enseñar nombres de objetos son actividades que ocupan poco espacio y fortalecen el vínculo.', 'Las sesiones breves repartidas durante el día suelen funcionar mejor que una actividad larga. Cinco minutos de aprendizaje pueden incorporarse antes de servir la comida o al regresar del paseo.'] },
      { heading: 'Una rutina compatible con la ciudad', paragraphs: ['Acostumbrarlo gradualmente al ascensor, pasillos, sonidos, automóviles y encuentros cotidianos ayuda a que se mueva con seguridad. La experiencia debe ser positiva y adaptada a su ritmo.', 'El resultado es un compañero que puede integrarse a distintos planes: descansar en casa, visitar familiares, caminar por el vecindario o acompañar una salida apropiada para perros.'] },
    ],
    faqs: [
      { question: '¿Puede un Boston Terrier vivir en apartamento?', answer: 'Sí. Su tamaño compacto y su orientación a la compañía familiar lo hacen compatible con apartamentos cuando cuenta con paseos, juego y una rutina estable.' },
      { question: '¿Necesita patio?', answer: 'No es indispensable. Los paseos y actividades compartidas pueden ofrecer una rutina completa incluso sin patio.' },
      { question: '¿Qué juegos puede hacer dentro de casa?', answer: 'Búsqueda de premios, juguetes interactivos, aprendizaje de señales, juegos de olfato y pequeñas secuencias de obediencia son excelentes opciones.' },
    ],
    sources: [akcFit, akcBreed],
    relatedSlugs: ['boston-terrier-familia-ninos-convivencia', 'juegos-actividad-boston-terrier', 'educacion-boston-terrier-entrenamiento'],
  },
  {
    slug: 'educacion-boston-terrier-entrenamiento',
    title: 'Cómo educar un Boston Terrier: aprendizaje, juegos y buenos hábitos',
    seoTitle: 'Cómo educar un Boston Terrier paso a paso',
    description: 'Guía para educar un Boston Terrier con refuerzo positivo, rutinas, señales básicas, socialización y juegos.',
    eyebrow: 'Educación positiva',
    excerpt: 'Una forma sencilla y amable de enseñarle señales útiles y convertir el aprendizaje en tiempo de calidad.',
    readTime: '7 min de lectura',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    keywords: ['cómo educar boston terrier', 'entrenamiento boston terrier', 'adiestrar boston terrier', 'enseñar cachorro boston terrier', 'boston terrier inteligente'],
    quickAnswer: 'El Boston Terrier suele aprender con entusiasmo cuando las sesiones son breves, claras y entretenidas. El refuerzo positivo, las recompensas pequeñas y la práctica cotidiana permiten enseñar hábitos de casa, paseo con correa y señales como venir, sentarse o esperar.',
    sections: [
      { heading: 'Sesiones cortas y divertidas', paragraphs: ['Empieza en un lugar tranquilo y practica durante pocos minutos. Terminar mientras el perro sigue interesado mantiene el entusiasmo para la siguiente sesión.', 'Puedes usar parte de su alimento diario, elogios o acceso a un juguete como recompensa. La variedad permite descubrir qué motiva más a cada perro.'] },
      { heading: 'Las primeras señales útiles', paragraphs: ['Su nombre, venir, sentarse, esperar y soltar son una base práctica para la vida diaria. Enseña una señal a la vez y recompensa el comportamiento que deseas repetir.', 'La consistencia entre las personas de la casa facilita el aprendizaje. Elegir las mismas palabras y reglas evita confusión y acelera el progreso.'], bullets: ['Responder a su nombre.', 'Acudir cuando se le llama.', 'Esperar antes de cruzar una puerta.', 'Caminar junto a la persona.', 'Ir a su cama.', 'Entregar un objeto mediante intercambio.'] },
      { heading: 'Hábitos dentro del hogar', paragraphs: ['Una rutina clara ayuda a enseñar dónde descansar, cuándo salir y cómo saludar. Anticiparte a lo que necesita facilita que aparezca el comportamiento correcto y puedas premiarlo.', 'Para el aprendizaje del baño, llévalo al lugar elegido después de despertar, comer y jugar. Felicítalo en el momento exacto en que lo hace bien.'] },
      { heading: 'Aprender en distintos lugares', paragraphs: ['Cuando una señal ya funciona en casa, practícala gradualmente en otros ambientes. Empieza en un pasillo tranquilo, continúa en la entrada y después prueba durante paseos con pocas distracciones.', 'Este proceso le enseña que las palabras significan lo mismo en diferentes contextos y hace que el aprendizaje sea útil en la vida real.'] },
    ],
    faqs: [
      { question: '¿El Boston Terrier es fácil de educar?', answer: 'Suele ser inteligente y participativo. Las sesiones breves, amables y consistentes aprovechan muy bien su disposición para aprender.' },
      { question: '¿Cuándo empezar a enseñarle?', answer: 'Desde su llegada pueden practicarse hábitos sencillos como responder al nombre, ir a su cama y seguir una rutina.' },
      { question: '¿Qué premios funcionan?', answer: 'Alimento en porciones pequeñas, elogios, juguetes o acceso a una actividad favorita. La mejor recompensa depende de cada perro.' },
    ],
    sources: [akcFit, akcBreed],
    relatedSlugs: ['primeros-dias-cachorro-boston-terrier-casa', 'juegos-actividad-boston-terrier', 'boston-terrier-familia-ninos-convivencia'],
  },
  {
    slug: 'cuidados-boston-terrier-pelaje-higiene',
    title: 'Cuidados del Boston Terrier: pelaje, baño, uñas y rutina',
    seoTitle: 'Cuidados del Boston Terrier: guía de higiene',
    description: 'Rutina sencilla de cuidados del Boston Terrier: cepillado, baño, uñas, dientes, accesorios y organización semanal.',
    eyebrow: 'Cuidados cotidianos',
    excerpt: 'Una rutina de mantenimiento sencilla para disfrutar su pelaje corto, su aspecto elegante y momentos de conexión.',
    readTime: '6 min de lectura',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    keywords: ['cuidados boston terrier', 'bañar boston terrier', 'pelaje boston terrier', 'cepillar boston terrier', 'higiene boston terrier'],
    quickAnswer: 'El pelaje corto del Boston Terrier es sencillo de mantener. Un cepillado semanal, baños cuando sean necesarios, revisión periódica de uñas, dientes y accesorios, y una rutina de limpieza ordenada ayudan a conservar su apariencia impecable.',
    sections: [
      { heading: 'Cepillado del pelaje corto', paragraphs: ['Un cepillo suave o guante de goma ayuda a retirar pelo suelto y distribuir los aceites naturales. El cepillado también permite compartir un momento tranquilo y acostumbrarlo a la manipulación.', 'Una sesión semanal suele ser una excelente base. Durante épocas de mayor muda puedes aumentar la frecuencia de acuerdo con lo que observes.'] },
      { heading: 'Baño y secado', paragraphs: ['El baño puede hacerse cuando el pelaje lo necesite, utilizando productos formulados para perros. Prepara toalla, champú y superficie antideslizante antes de comenzar para que todo fluya con calma.', 'Seca suavemente y aprovecha para limpiar su cama, manta y accesorios. Mantener textiles y espacios ordenados prolonga la sensación de frescura.'] },
      { heading: 'Uñas, dientes y accesorios', paragraphs: ['Revisar las uñas con regularidad ayuda a mantener una pisada cómoda. Acostúmbralo desde pequeño a tocar sus patas y recompensa la calma durante el proceso.', 'El cepillado dental puede integrarse gradualmente con productos específicos para perros. Lava también sus platos y revisa que collar, arnés y correa continúen ajustando correctamente.'] },
      { heading: 'Una agenda fácil de recordar', paragraphs: ['Asigna un día de la semana al cepillado y a la revisión general. Anota baños, cambios de accesorios y compras de alimento en el calendario familiar.', 'Una rutina constante convierte el cuidado en algo natural y permite que todas las personas del hogar sepan qué corresponde hacer.'] },
    ],
    faqs: [
      { question: '¿Cada cuánto se cepilla un Boston Terrier?', answer: 'Un cepillado semanal suele ser una buena base para retirar pelo suelto y conservar el brillo natural.' },
      { question: '¿Su pelaje requiere peluquería?', answer: 'Su pelaje corto no requiere cortes. La rutina se concentra en cepillado, baño y cuidados generales.' },
      { question: '¿Cómo acostumbrarlo al cuidado?', answer: 'Empieza con sesiones muy breves, manipulación suave y recompensas. Aumenta el tiempo gradualmente mientras se mantiene relajado.' },
    ],
    sources: [akcBreed],
    relatedSlugs: ['boston-terrier-caracteristicas-caracter-tamano', 'alimentacion-boston-terrier-rutina', 'primeros-dias-cachorro-boston-terrier-casa'],
  },
  {
    slug: 'alimentacion-boston-terrier-rutina',
    title: 'Alimentación del Boston Terrier: horarios, porciones y premios',
    seoTitle: 'Alimentación del Boston Terrier: guía práctica',
    description: 'Organiza la alimentación del Boston Terrier con horarios, porciones medidas, premios y hábitos familiares consistentes.',
    eyebrow: 'Alimentación diaria',
    excerpt: 'Cómo crear una rutina práctica de comidas y utilizar pequeñas recompensas durante el aprendizaje.',
    readTime: '6 min de lectura',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    keywords: ['alimentación boston terrier', 'cuánto come boston terrier', 'comida boston terrier', 'horarios cachorro boston terrier', 'premios para boston terrier'],
    quickAnswer: 'La alimentación del Boston Terrier funciona mejor con horarios consistentes, porciones medidas y un alimento apropiado para su etapa de vida. Dividir la cantidad diaria en comidas y reservar una parte para el entrenamiento ayuda a organizar la rutina.',
    sections: [
      { heading: 'Una rutina fácil de seguir', paragraphs: ['Servir las comidas a horas similares ayuda a organizar paseos, descanso y aprendizaje. Los cachorros suelen repartir su ración en varias comidas, mientras muchos adultos siguen cómodamente una rutina de dos tomas.', 'Mantén agua limpia disponible y coloca los platos en un lugar tranquilo. Lavar los recipientes con frecuencia completa una zona de alimentación ordenada.'] },
      { heading: 'Porciones medidas', paragraphs: ['La guía del alimento ofrece un punto de partida según peso y edad. Utilizar una taza o balanza permite servir cantidades consistentes y observar cómo evoluciona el perro.', 'Revisa la cantidad cuando cambie de etapa, actividad o presentación de alimento, ya que cada fórmula tiene una densidad diferente.'] },
      { heading: 'Premios durante el aprendizaje', paragraphs: ['Las recompensas pequeñas permiten practicar más veces sin interrumpir su comida habitual. Puedes separar parte de la ración de la mañana para utilizarla durante el día.', 'Alterna alimento con elogios, caricias o acceso a un juguete. Así el perro aprende que colaborar abre la puerta a diferentes experiencias agradables.'] },
      { heading: 'Transiciones organizadas', paragraphs: ['Cuando decidas cambiar de alimento, mezcla gradualmente el nuevo con el anterior durante varios días. Anotar las proporciones facilita que todas las personas de la casa sigan el mismo proceso.', 'Conserva el alimento en su empaque original dentro de un recipiente cerrado para mantener la información del producto y su frescura.'] },
    ],
    faqs: [
      { question: '¿Cuántas veces al día come un Boston Terrier?', answer: 'Depende de su etapa de vida. Los cachorros suelen tener varias comidas y muchos adultos siguen una rutina de dos tomas.' },
      { question: '¿Puedo usar su alimento como premio?', answer: 'Sí. Separar una parte de la ración diaria es una forma práctica de recompensar durante el aprendizaje.' },
      { question: '¿Cómo medir la comida?', answer: 'Una taza medidora o balanza permite mantener porciones consistentes siguiendo la guía del alimento elegida.' },
    ],
    sources: [akcBreed],
    relatedSlugs: ['educacion-boston-terrier-entrenamiento', 'cuidados-boston-terrier-pelaje-higiene', 'primeros-dias-cachorro-boston-terrier-casa'],
  },
  {
    slug: 'colores-boston-terrier-apariencia',
    title: 'Colores del Boston Terrier y características de su apariencia',
    seoTitle: 'Colores del Boston Terrier y apariencia de la raza',
    description: 'Conoce los colores del Boston Terrier, sus marcas blancas, pelaje, expresión y estructura característica.',
    eyebrow: 'Apariencia de la raza',
    excerpt: 'Una mirada a su famoso “esmoquin”, los colores tradicionales y los rasgos que le dan una expresión inconfundible.',
    readTime: '5 min de lectura',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    keywords: ['colores boston terrier', 'boston terrier negro y blanco', 'boston terrier atigrado', 'cómo es boston terrier', 'apariencia boston terrier'],
    quickAnswer: 'El Boston Terrier combina marcas blancas con negro, atigrado o seal. Su pelaje corto y liso, cuerpo compacto, cabeza cuadrada, orejas erguidas y ojos redondos crean la apariencia elegante que inspira su apodo de “caballero americano”.',
    sections: [
      { heading: 'Negro, atigrado y seal', paragraphs: ['El negro con blanco es probablemente la imagen más conocida de la raza. El atigrado presenta franjas que pueden verse con distinta intensidad según la luz, mientras el seal parece negro y muestra reflejos cálidos bajo una iluminación intensa.', 'Las variaciones dentro de estos colores hacen que cada Boston tenga una presencia particular sin perder la identidad visual de la raza.'] },
      { heading: 'Las marcas blancas', paragraphs: ['El blanco suele aparecer en el hocico, entre los ojos y en el pecho. Estas marcas crean el efecto de camisa y cuello que dio origen al famoso apodo del esmoquin.', 'La distribución exacta puede variar entre ejemplares. La expresión general resulta de la combinación entre color, simetría, ojos, orejas y postura.'] },
      { heading: 'Pelaje y textura', paragraphs: ['El manto es corto, liso y fino. Refleja la luz y resalta las líneas compactas del cuerpo. Su mantenimiento sencillo permite disfrutar su apariencia con un cepillado regular.', 'Un guante de goma o cepillo suave es suficiente para retirar pelo suelto y dejar el pelaje ordenado.'] },
      { heading: 'Una expresión inconfundible', paragraphs: ['Los ojos redondos y la atención con que observa a las personas aportan gran parte de su expresividad. Las orejas erguidas completan una silueta alerta y simpática.', 'Esa combinación explica por qué tantas personas se interesan primero por su aspecto y terminan enamorándose de su personalidad.'] },
    ],
    faqs: [
      { question: '¿Cuáles son los colores tradicionales del Boston Terrier?', answer: 'Negro, atigrado o seal combinados con marcas blancas.' },
      { question: '¿Qué significa color seal?', answer: 'Es un color que puede parecer negro, pero muestra reflejos cálidos cuando recibe luz intensa.' },
      { question: '¿Por qué lo llaman el caballero americano?', answer: 'Por su origen estadounidense y por las marcas blancas sobre el pelaje oscuro, que recuerdan un elegante esmoquin.' },
    ],
    sources: [akcBreed],
    relatedSlugs: ['boston-terrier-caracteristicas-caracter-tamano', 'historia-boston-terrier-curiosidades', 'cuidados-boston-terrier-pelaje-higiene'],
  },
  {
    slug: 'historia-boston-terrier-curiosidades',
    title: 'Historia del Boston Terrier: origen y curiosidades de la raza',
    seoTitle: 'Historia y origen del Boston Terrier',
    description: 'Descubre el origen del Boston Terrier en Estados Unidos, su reconocimiento y las curiosidades que explican su popularidad.',
    eyebrow: 'Historia y curiosidades',
    excerpt: 'De Boston al mundo: descubre cómo nació una de las razas de compañía estadounidenses más reconocibles.',
    readTime: '6 min de lectura',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    keywords: ['historia boston terrier', 'origen boston terrier', 'curiosidades boston terrier', 'caballero americano perro', 'raza boston terrier'],
    quickAnswer: 'El Boston Terrier se desarrolló en Estados Unidos durante el siglo XIX y toma su nombre de la ciudad de Boston, Massachusetts. El American Kennel Club reconoció oficialmente la raza en 1893. Su carácter de compañía y sus marcas elegantes impulsaron el apodo de “caballero americano”.',
    sections: [
      { heading: 'Una raza nacida en Estados Unidos', paragraphs: ['El Boston Terrier ocupa un lugar especial entre las razas desarrolladas en Estados Unidos. Su historia se relaciona estrechamente con la ciudad de Boston, donde aficionados fueron definiendo un perro compacto y reconocible.', 'Con el tiempo, la selección se orientó hacia el compañero alegre y elegante que conocemos actualmente.'] },
      { heading: 'El reconocimiento de la raza', paragraphs: ['El American Kennel Club reconoció al Boston Terrier en 1893. Este acontecimiento consolidó su nombre y ayudó a organizar una descripción común de su apariencia y temperamento.', 'Durante el siglo XX su popularidad creció como perro de compañía, especialmente entre familias atraídas por su tamaño y personalidad.'] },
      { heading: 'El origen del apodo', paragraphs: ['“The American Gentleman”, traducido como “el caballero americano”, resume dos elementos esenciales: su origen y su apariencia. Las marcas blancas sobre el pelaje oscuro recuerdan la camisa de un esmoquin.', 'El apodo también combina bien con la reputación de perro amistoso, alegre y cercano a las personas.'] },
      { heading: 'Curiosidades para compartir', paragraphs: ['Aunque lleva “terrier” en el nombre, el AKC lo ubica actualmente en el grupo no deportivo. También es el perro oficial del estado de Massachusetts.', 'Su silueta, expresión y combinación de colores lo han convertido en una raza fácil de reconocer y en un símbolo inseparable de la ciudad que le dio su nombre.'] },
    ],
    faqs: [
      { question: '¿De dónde viene el Boston Terrier?', answer: 'Se desarrolló en Estados Unidos y recibe su nombre de Boston, Massachusetts.' },
      { question: '¿Cuándo fue reconocido?', answer: 'El American Kennel Club reconoció oficialmente la raza en 1893.' },
      { question: '¿Es realmente un terrier?', answer: 'Aunque conserva “terrier” en su nombre, el AKC lo clasifica actualmente dentro del grupo no deportivo.' },
    ],
    sources: [akcBreed, akcFacts],
    relatedSlugs: ['colores-boston-terrier-apariencia', 'boston-terrier-caracteristicas-caracter-tamano', 'boston-terrier-familia-ninos-convivencia'],
  },
  {
    slug: 'juegos-actividad-boston-terrier',
    title: 'Juegos y actividades para disfrutar con un Boston Terrier',
    seoTitle: 'Juegos y actividades para Boston Terrier',
    description: 'Ideas de juegos, paseos, olfato y aprendizaje para compartir tiempo de calidad con un Boston Terrier.',
    eyebrow: 'Tiempo de calidad',
    excerpt: 'Actividades sencillas para estimular su inteligencia, aprovechar su personalidad juguetona y fortalecer el vínculo.',
    readTime: '6 min de lectura',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    keywords: ['juegos boston terrier', 'actividad boston terrier', 'ejercicio boston terrier', 'juguetes boston terrier', 'entretener boston terrier'],
    quickAnswer: 'El Boston Terrier disfruta actividades compartidas: juegos de olfato, búsqueda de juguetes, aprendizaje de trucos, paseos con exploración y juguetes interactivos. Alternar movimiento y trabajo mental mantiene la rutina interesante.',
    sections: [
      { heading: 'Juegos de olfato', paragraphs: ['Esconde pequeñas recompensas en distintos puntos de una habitación y anímalo a buscarlas. Empieza con lugares visibles y aumenta poco a poco la dificultad.', 'También puedes enrollar parte de su alimento en una toalla o utilizar una alfombra olfativa para convertir la comida en una actividad.'] },
      { heading: 'Buscar y traer', paragraphs: ['Muchos Boston disfrutan perseguir una pelota o juguete ligero. Utiliza un pasillo o espacio despejado y haz lanzamientos cortos.', 'Puedes enseñar a entregar mediante intercambio: cuando regrese, ofrece una recompensa y vuelve a iniciar el juego.'] },
      { heading: 'Trucos y aprendizaje', paragraphs: ['Dar la pata, tocar una mano con la nariz, girar o guardar juguetes son ejercicios entretenidos. Divide cada truco en pasos sencillos y celebra cada avance.', 'Grabar las sesiones permite ver el progreso y compartir la experiencia con la familia.'] },
      { heading: 'Paseos con variedad', paragraphs: ['Alterna recorridos conocidos con rutas nuevas y permite momentos para observar y explorar. Un paseo tranquilo puede aportar tanta riqueza como un juego dentro de casa.', 'Combina los paseos con pequeñas prácticas de nombre, espera y caminar juntos para llevar el aprendizaje a la vida diaria.'] },
    ],
    faqs: [
      { question: '¿Qué juegos le gustan al Boston Terrier?', answer: 'Búsqueda, juguetes interactivos, olfato, pelotas y aprendizaje de trucos suelen ser opciones muy entretenidas.' },
      { question: '¿Puede jugar dentro de casa?', answer: 'Sí. Los juegos de olfato, aprendizaje y búsqueda con lanzamientos cortos funcionan muy bien en interiores.' },
      { question: '¿Cuánto debe durar una sesión?', answer: 'Las sesiones cortas y variadas mantienen mejor el interés. Puedes repartir varios momentos de juego durante el día.' },
    ],
    sources: [akcBreed, akcFit],
    relatedSlugs: ['educacion-boston-terrier-entrenamiento', 'boston-terrier-apartamento-vida-urbana', 'boston-terrier-familia-ninos-convivencia'],
  },
  {
    slug: 'primeros-dias-cachorro-boston-terrier-casa',
    title: 'Primeros días de un cachorro Boston Terrier en casa',
    seoTitle: 'Primeros días del Boston Terrier en casa',
    description: 'Prepara la llegada de un cachorro Boston Terrier con espacios, horarios, descanso, juegos y aprendizaje inicial.',
    eyebrow: 'Bienvenida a casa',
    excerpt: 'Una guía positiva para preparar el hogar, organizar la primera noche y comenzar una rutina familiar.',
    readTime: '7 min de lectura',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    keywords: ['cachorro boston terrier primeros días', 'boston terrier cachorro cuidados', 'qué comprar para boston terrier', 'llegada cachorro boston terrier', 'rutina cachorro boston terrier'],
    quickAnswer: 'Los primeros días son una oportunidad para crear confianza. Prepara una zona tranquila, conserva horarios sencillos, presenta la casa poco a poco y combina descanso, alimentación, salidas y juegos breves. La paciencia y la consistencia ayudan al cachorro a sentirse parte de la familia.',
    sections: [
      { heading: 'Preparar su espacio', paragraphs: ['Elige una zona cercana a la vida familiar con cama, agua y juguetes. Una barrera permite ofrecerle un espacio cómodo mientras aprende a moverse por la casa.', 'Guarda cables y objetos pequeños, organiza sus accesorios y decide con anticipación dónde comerá, descansará y hará sus salidas.'] },
      { heading: 'La primera noche', paragraphs: ['Mantén el ambiente tranquilo y coloca su cama en un lugar donde pueda percibir la presencia de la familia. Una manta conocida y una rutina suave ayudan a marcar el momento de descanso.', 'Evita llenar el primer día de visitas y actividades. Descubrir un hogar nuevo ya representa una experiencia completa.'] },
      { heading: 'Horarios sencillos', paragraphs: ['Alterna comida, salida, juego y descanso siguiendo un orden fácil de repetir. Llevarlo al lugar elegido al despertar y después de comer ayuda a formar hábitos.', 'Anota horarios durante los primeros días para que toda la familia pueda mantener la misma rutina.'] },
      { heading: 'Comenzar a aprender', paragraphs: ['Pronuncia su nombre y recompensa cuando te mire. Practica venir a corta distancia, seguir una mano y descansar en su cama.', 'Cada experiencia positiva suma confianza. Unos pocos minutos varias veces al día son suficientes para empezar.'] },
    ],
    faqs: [
      { question: '¿Qué necesita un cachorro Boston Terrier?', answer: 'Cama, platos, alimento, transportadora, arnés, correa, identificación, juguetes seguros y un espacio organizado para comenzar su rutina.' },
      { question: '¿Dónde debe dormir la primera noche?', answer: 'En una zona tranquila y segura, preferiblemente cerca de la familia para facilitar una transición gradual.' },
      { question: '¿Cuándo comenzar a educarlo?', answer: 'Desde el primer día pueden enseñarse su nombre, horarios, lugar de descanso y hábitos sencillos mediante recompensas.' },
    ],
    sources: [akcFit, akcBreed],
    relatedSlugs: ['educacion-boston-terrier-entrenamiento', 'boston-terrier-familia-ninos-convivencia', 'alimentacion-boston-terrier-rutina'],
  },
  {
    slug: 'boston-blue-color-precio-costa-rica',
    title: 'Boston Blue en Costa Rica: color, características, precio y disponibilidad',
    seoTitle: 'Boston Blue Costa Rica: color, precio y cachorros',
    description: 'Conoce qué significa Boston Blue, cómo es su color, cuánto puede costar y cómo consultar cachorros disponibles en Costa Rica.',
    eyebrow: 'Guía Boston Blue',
    excerpt: 'Una guía clara para conocer esta tonalidad, entender cómo se diferencia de los colores tradicionales y consultar precio y disponibilidad en Costa Rica.',
    readTime: '6 min de lectura',
    publishedAt: '2026-10-01',
    updatedAt: '2026-10-01',
    keywords: ['boston blue costa rica', 'boston terrier blue costa rica', 'qué es un boston blue', 'boston blue precio costa rica', 'cachorros boston blue en venta', 'comprar boston blue costa rica', 'boston blue disponibles'],
    quickAnswer: 'Boston Blue es el nombre comercial utilizado para un Boston Terrier cuyo pigmento oscuro se observa en una tonalidad gris azulada. No es una raza diferente. En Costa Rica, la disponibilidad y el precio dependen de cada cachorro y se confirman en el catálogo o directamente con el kennel.',
    sections: [
      {
        heading: '¿Qué significa Boston Blue?',
        paragraphs: ['La expresión Boston Blue describe una tonalidad de pelaje en la que las áreas que normalmente serían negras se perciben gris azuladas. El cachorro conserva las características propias del Boston Terrier; “Blue” se refiere únicamente a la apariencia de su pigmentación.', 'Esta denominación es frecuente en búsquedas de familias interesadas en un color menos habitual. Conocer el significado permite distinguir entre una descripción comercial del color y el nombre oficial de la raza.'],
      },
      {
        heading: 'Cómo reconocer su tonalidad',
        paragraphs: ['La intensidad puede cambiar según la luz, la edad y el pelaje de cada ejemplar. En fotografías puede observarse desde un gris oscuro hasta un tono más claro con matiz azulado, generalmente acompañado por las marcas blancas características del Boston Terrier.', 'Las imágenes individuales del catálogo son la mejor referencia para conocer el aspecto real de cada cachorro disponible.'],
      },
      {
        heading: 'Boston Blue y colores del estándar',
        paragraphs: ['El estándar oficial del Boston Terrier reconoce negro, atigrado o seal acompañados de blanco. El azul no figura entre los colores aceptados para competencia de conformación bajo ese estándar.', 'Esto no convierte al Boston Blue en una raza distinta. La información se presenta de forma clara para que cada familia comprenda la diferencia entre la tonalidad comercial y los colores descritos por el estándar oficial.'],
      },
      {
        heading: 'Precio y disponibilidad en Costa Rica',
        paragraphs: ['El precio de un cachorro Boston Blue puede variar de acuerdo con el ejemplar, su edad y las condiciones de entrega. Cuando haya cachorros publicados, cada ficha mostrará su precio y características principales.', 'Si el catálogo no muestra disponibilidad, puedes consultar próximas camadas por WhatsApp. El kennel confirmará las opciones actuales antes de iniciar cualquier proceso de reserva.'],
      },
      {
        heading: 'Cómo consultar o reservar',
        paragraphs: ['Visita el catálogo general para conocer cachorros disponibles y fotografías actualizadas. Desde allí puedes abrir una conversación directa por WhatsApp para preguntar por color, precio y próximos pasos.', 'La disponibilidad cambia con cada camada, por lo que una consulta directa permite recibir información vigente y elegir con calma.'],
        bullets: ['Revisa el catálogo Boston Blue.', 'Consulta el precio del cachorro que te interesa.', 'Confirma disponibilidad y condiciones de entrega.', 'Solicita los pasos actuales para reservar.'],
      },
    ],
    faqs: [
      { question: '¿Qué es un Boston Blue?', answer: 'Es un Boston Terrier cuya pigmentación oscura se observa gris azulada. Blue describe el color y no una raza diferente.' },
      { question: '¿Cuánto cuesta un Boston Blue en Costa Rica?', answer: 'El precio depende de cada cachorro. La ficha del catálogo o la consulta directa por WhatsApp muestran la información vigente.' },
      { question: '¿Hay cachorros Boston Blue disponibles?', answer: 'La disponibilidad cambia con cada camada. Consulta el catálogo general o escribe al kennel para conocer las opciones actuales.' },
      { question: '¿El azul es un color oficial del Boston Terrier?', answer: 'No. El estándar oficial reconoce negro, atigrado o seal con blanco; el azul no está aceptado para competencia de conformación bajo ese estándar.' },
      { question: '¿Cómo puedo reservar un Boston Blue?', answer: 'Elige un cachorro disponible y consulta por WhatsApp. Allí te confirmarán el precio, la disponibilidad y los pasos de reserva.' },
    ],
    sources: [akcStandard, akcBreed],
    relatedSlugs: ['colores-boston-terrier-apariencia', 'boston-terrier-caracteristicas-caracter-tamano', 'primeros-dias-cachorro-boston-terrier-casa'],
  },
]

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug)
}

export function getRelatedArticles(article: SeoArticle) {
  return article.relatedSlugs.map((slug) => getArticle(slug)).filter((item): item is SeoArticle => Boolean(item))
}
