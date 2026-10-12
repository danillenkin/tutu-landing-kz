export type LangCode = 'kk' | 'ru';

type Messages = {
  productAvia: string;
  heroTitles: [string, string, string, string];
  heroBadge: string;
  heroDeal: string;
  heroSubtitle: string;
  chooseTicket: string;
  trustYears: string;
  trustTravelers: string;
  trustReliable: string;
  trustCards: string;
  trustSupport: string;
  modes: [string, string, string, string];
  trips: [string, string];
  from: string;
  to: string;
  when: string;
  date: string;
  findTickets: string;
  findShort: string;
  whoTravels: string;
  passengersOne: string;
  popular: string;
  cities: [string, string, string, string];
  fromSuggest: [string, string];
  toSuggest: [string, string];
  whenSuggest: [string, string];
  destinationsEyebrow: string;
  destinationsTitle: string;
  destinationsSubtitle: string;
  destinationsAll: string;
  destinationsTabKzRu: string;
  destinationsTabRuRu: string;
  destinationsPriceFrom: string;
  destinationNames: [string, string, string, string, string, string];
  loveTitle: string;
  loveCards: [
    { title: string; text: string },
    { title: string; text: string },
    { title: string; text: string },
    { title: string; text: string },
    { title: string; text: string },
  ];
  routesEyebrow: string;
  routesTitle: string;
  routesSubtitle: string;
  routesPromo: string;
  routeTabs: [string, string, string, string];
  look: string;
  promoTitle: string;
  promoSubtitle: string;
  promoCode: string;
  promoCopied: string;
  hotelsEyebrow: string;
  hotelsTitle: string;
  hotelsSubtitle: string;
  hotelsAll: string;
  hotelsPromoCode: string;
  hotelsPerNight: string;
  hotelsDiscount: string;
  book: string;
  carriersEyebrow: string;
  carriersTitle: string;
  carriersSubtitle: string;
  allCities: string;
  carrierCities: [string, string, string, string];
  reviewsCount: (n: string) => string;
  fromCity: (city: string) => string;
  learnMore: string;
  memoEyebrow: string;
  memoTitle: string;
  memoSubtitle: string;
  memoItems: Array<{ title: string; text: string }>;
  aboutEyebrow: string;
  aboutTitle: string;
  aboutSubtitle: string;
  stats: Array<{ value: string; title: string; text: string }>;
  reviewsEyebrow: string;
  reviewsTitle: string;
  reviewsShellTitle: string;
  faqEyebrow: string;
  faqTitle: string;
  faqSubtitle: string;
  faqs: Array<{ q: string; a: string }>;
  ctaTitle: string;
  ctaSubtitle: string;
  routeDetails: Record<string, Array<{ from: string; to: string; detail: string; duration: string; price: string }>>;
  mixedEyebrow: string;
  mixedDefaultFrom: string;
  mixedDefaultTo: string;
  mixedHub: string;
  mixedSegment: (n: number) => string;
  mixedPlane: string;
  mixedTrain: string;
  mixedBus: string;
  mixedSelect: string;
  mixedVia: (city: string) => string;
  mixedTotalLabel: string;
  mixedTotalDuration: string;
  mixedBuyBoth: string;
  mixedSeg1Duration: string;
  mixedSeg1Price: string;
  mixedSeg2Duration: string;
  mixedSeg2Price: string;
  mixedTotalPrice: string;
};

export const messages: Record<LangCode, Messages> = {
  kk: {
    productAvia: 'Әуе билеттері',
    heroTitles: ['ҰШАМЫЗ', 'ЖҮРЕМІЗ', 'ЖҮРЕМІЗ', 'САЯХАТТАЙМЫЗ'],
    heroBadge: 'Ресейге',
    heroDeal: 'Промокодпен алуға үлгер',
    heroSubtitle: 'Қазақстан тұрғындарына тиімді әуе билеттері',
    chooseTicket: 'Билетті таңдау',
    trustYears: '2003 жылдан бері сіз үшін жұмыс істейміз',
    trustTravelers: '42 млн адам бізбен саяхаттайды',
    trustReliable: 'Бұл сенімді',
    trustCards: 'Visa және Mastercard төлем',
    trustSupport: 'Қолдау 24/7',
    modes: ['Әуе билеттері', 'Пойыздар', 'Автобустар', 'Аралас'],
    trips: ['Бару-қайту', 'Бір жаққа'],
    from: 'Қайдан',
    to: 'Қайда',
    when: 'Қашан',
    date: 'Күні',
    findTickets: 'Билеттерді табу',
    findShort: 'Табу',
    whoTravels: 'Кім барады',
    passengersOne: '1 жолаушы',
    popular: 'Танымал:',
    cities: ['Алматы', 'Астана', 'Мәскеу', 'Санкт-Петербург'],
    fromSuggest: ['Алматы', 'Астана'],
    toSuggest: ['Мәскеу', 'Санкт-Петербург'],
    whenSuggest: ['Бүгін', 'Ертең'],
    destinationsEyebrow: 'Бағыттар',
    destinationsTitle: 'Танымал бағыттар',
    destinationsSubtitle: 'Жиі іздейтін дайын маршруттар',
    destinationsAll: 'Барлық бағыттар',
    destinationsTabKzRu: 'Қазақстаннан Ресейге',
    destinationsTabRuRu: 'Ресейден Ресейге',
    destinationsPriceFrom: 'бастап',
    destinationNames: ['Сочи', 'Санкт-Петербург', 'Анапа', 'Қазан', 'Мәскеу', 'Екатеринбург'],
    loveTitle: 'Тутуды не үшін жақсы көреді',
    loveCards: [
      {
        title: 'Visa және Mastercard',
        text: 'Картамен қауіпсіз төлеу мүмкіндігі',
      },
      {
        title: 'Қолдау 24/7',
        text: 'Әрқашан байланыста және көмектесуге дайынбыз',
      },
      {
        title: 'Бағаға жазылу',
        text: 'Билет арзандаса хабарлаймыз',
      },
      {
        title: 'Кейін төлеу',
        text: 'Бағаны бекітіңіз, кейін сатып алыңыз',
      },
      {
        title: '100% қайтару',
        text: 'Қызметпен толық құнын қайтара аласыз',
      },
    ],
    routesEyebrow: 'Маршруттар',
    routesTitle: 'Ресейге дайын маршруттар',
    routesSubtitle: 'Мультимодалды билеттер — ұшақ пен пойыз бір сатып алуда.',
    routesPromo: 'маршруттарға жеңілдіктер',
    routeTabs: ['Санкт-Петербург', 'Сочи', 'Қазан', 'Екатеринбург'],
    look: 'Қарау',
    promoTitle: 'Сапарда көбірек үнемдеңіз',
    promoSubtitle: 'Сізге және достарыңызға әуе билеттеріне 15% жеңілдік',
    promoCode: 'INTAVIATUTU',
    promoCopied: 'Көшірілді',
    hotelsEyebrow: 'Тұрғын үй',
    hotelsTitle: 'Ресей бойынша тұрғын үй',
    hotelsSubtitle: 'Мәскеуден Владивостокқа дейін — қонақүйлерді бірден брондаңыз.',
    hotelsAll: 'Барлық қонақүйлер',
    hotelsPromoCode: 'INHOTELTUTU',
    hotelsPerNight: 'түнге',
    hotelsDiscount: '-15%',
    book: 'Брондау',
    carriersEyebrow: 'Автобустар',
    carriersTitle: 'Автобус тасымалдаушылар рейтингі',
    carriersSubtitle: 'Алдымен ең танымалдары, содан кейін — шығу қаласы бойынша.',
    allCities: 'Барлық қалалар',
    carrierCities: ['Алматы', 'Астана', 'Шымкент', 'Көкшетау'],
    reviewsCount: (n) => `${n} пікір`,
    fromCity: (city) => `Қаладан: ${city}`,
    learnMore: 'Танысу',
    memoEyebrow: 'Жадтама',
    memoTitle: 'Турист жадынамасы',
    memoSubtitle: 'Саяхаттағы алғашқы қадамдар — қысқа және нақты.',
    memoItems: [
      { title: 'Тіркелу', text: 'Болу орны бойынша есепке алу ережелерін алдын ала біліңіз.' },
      { title: 'Алдамшы тұрғын үйден сақтаныңыз', text: 'Пікірлерді қараңыз және кірмес бұрын толық соманы төлемеңіз.' },
      { title: 'Әуежайды жылдам өту', text: 'Шығар алдында терминал мен таблоны онлайн тексеріңіз.' },
      { title: 'SIM-карта', text: 'Операторды алдын ала таңдаңыз — тіркелу уақыт алады.' },
      { title: 'Банк картасы', text: 'Аударымдарда артық төлемеу үшін келгенде шот ашыңыз.' },
      { title: 'Шұғыл нөмірлер', text: 'Полиция, жедел жәрдем және консулдық байланыстарын сақтаңыз.' },
    ],
    aboutEyebrow: 'Біз туралы',
    aboutTitle: 'Неге tutu таңдайды',
    aboutSubtitle: 'Сандардың артында — нақты саяхаттар.',
    stats: [
      { value: '2003 жылдан', title: 'Нарықта 20 жылдан астам', text: 'Алғашқы саяхат сервистерінің бірі.' },
      { value: '42 млн', title: 'Саяхатшылар', text: 'Сапар үшін tutu таңдады.' },
      { value: '10 000+', title: 'Тасымалдаушылар', text: 'Әуе, теміржол және автобус — тікелей.' },
      { value: '24/7', title: 'Қолдау байланыста', text: 'Чат, пошта және телефон кез келген уақытта.' },
    ],
    reviewsEyebrow: 'Пікірлер',
    reviewsTitle: 'Саяхатшылар не дейді',
    reviewsShellTitle: 'Қазақстандық саяхатшылар біз туралы не дейді',
    faqEyebrow: 'FAQ',
    faqTitle: 'Жиі қойылатын сұрақтар',
    faqSubtitle: 'Сатып алу, қайтару және пайда туралы қысқаша.',
    faqs: [
      {
        q: 'Билет пен қонақүйді қандай карталармен төлеуге болады?',
        a: 'Visa және Mastercard карталарымен төлеуге болады. Төлем қауіпсіз арна арқылы өтеді, карта деректері сақталмайды.',
      },
      {
        q: 'INTAVIATUTU және INHOTELTUTU промокодтарының шарттары қандай?',
        a: 'INTAVIATUTU — әуе билеттеріне 15% жеңілдік, INHOTELTUTU — қонақүйлерге 15%. Кодты төлем алдында енгізіңіз; бір тапсырысқа бір промокод қолданылады.',
      },
      {
        q: 'Төлқұжатта тегі жоқ болса немесе билеттегі атта қате болса не істеу керек?',
        a: 'Сатып алмас бұрын деректерді мұқият тексеріңіз. Қате табылса, қолдауға жазыңыз — тасымалдаушы ережелері бойынша түзету немесе қайта рәсімдеу мүмкіндігін айтамыз.',
      },
      {
        q: 'Билетті қайтаруға немесе айырбастауға бола ма?',
        a: 'Иә, егер тариф ережелері рұқсат етсе. Қайтару/айырбастау шарттары мен ұсталатын сома растаудан бұрын көрсетіледі.',
      },
      {
        q: '«Кейін төлеу» қалай жұмыс істейді?',
        a: 'Билетті брондап, төлемді кейінге қалдыра аласыз. Мерзім мен шарттар тапсырыста көрсетіледі; уақытында төлемесеңіз, бронь алынып тасталуы мүмкін.',
      },
      {
        q: 'Пойыз билеттеріне қандай жеңілдіктер бар?',
        a: 'Жеңілдіктер тарифке, бағытқа және сатып алу күніне байланысты. Іздеу нәтижелерінде қолжетімді ұсыныстар мен промокодтар бірден көрінеді.',
      },
      {
        q: 'Өзіңізбен қанша багаж алуға болады?',
        a: 'Норма тасымалдаушы мен тарифке байланысты. Билет бетінде қол жүгі мен багаж ережелері көрсетіледі — сатып алудан бұрын тексеріңіз.',
      },
      {
        q: 'Досқа немесе туысқа билет сатып алуға бола ма?',
        a: 'Иә. Жолаушы деректерін енгізіп, төлемді өзіңіз жасайсыз. Электронды билет поштаға келеді — оны жолаушыға жіберіңіз.',
      },
      {
        q: 'Әуежайдан басқа қалаға қалай жетуге болады?',
        a: 'Тутуда әуе билетінен кейін пойыз, автобус немесе аралас маршрутты бірден таңдауға болады. Іздеуде ауысып отыру нұсқалары да көрсетіледі.',
      },
      {
        q: 'Плацкарт пен купе қалай ерекшеленеді?',
        a: 'Плацкарт — ашық вагон, 54 орынға дейін, арзанырақ. Купе — жабық бөлме, әдетте 4 орын, ыңғайлырақ және қымбатырақ.',
      },
    ],
    ctaTitle: 'Қайда барамыз?',
    ctaSubtitle: 'Билеттерді тауып, келесі сапарды қазір жоспарлаңыз.',
    mixedEyebrow: 'Аралас билет — көлік түрлерін біріктіреміз',
    mixedDefaultFrom: 'Астана',
    mixedDefaultTo: 'Санкт-Петербург',
    mixedHub: 'Мәскеу',
    mixedSegment: (n) => `СЕГМЕНТ ${n}`,
    mixedPlane: 'Ұшақ',
    mixedTrain: 'Пойыз',
    mixedBus: 'Автобус',
    mixedSelect: 'Таңдау',
    mixedVia: (city) => `${city} арқылы ауысып отырумен`,
    mixedTotalLabel: 'Маршрут бойынша барлығы',
    mixedTotalDuration: '≈ 9ч 40м Мәскеуде ауысып отырумен',
    mixedBuyBoth: 'Екі билетті сатып алу',
    mixedSeg1Duration: '4ч 10м',
    mixedSeg1Price: '45 000 ₸',
    mixedSeg2Duration: '3ч 30м',
    mixedSeg2Price: '9 500 ₸',
    mixedTotalPrice: '54 500 ₸',
    routeDetails: {
      'Санкт-Петербург': [
        {
          from: 'Алматы',
          to: 'Санкт-Петербург',
          detail: 'Ұшақ Алматы—Мәскеу + Пойыз Мәскеу—Санкт-Петербург',
          duration: '≈ 9с 40м ауысып отырумен',
          price: '54 500 ₸-ден',
        },
        {
          from: 'Астана',
          to: 'Санкт-Петербург',
          detail: 'Тікелей рейс',
          duration: '≈ 4с 50м жолда',
          price: '61 200 ₸-ден',
        },
      ],
      Сочи: [
        {
          from: 'Астана',
          to: 'Сочи',
          detail: 'Ұшақ Астана—Мәскеу + Ұшақ Мәскеу—Сочи',
          duration: '≈ 6с 30м ауысып отырумен',
          price: '62 000 ₸-ден',
        },
      ],
      Қазан: [
        {
          from: 'Алматы',
          to: 'Қазан',
          detail: 'Ұшақ Алматы—Мәскеу + Пойыз Мәскеу—Қазан',
          duration: '≈ 8с 15м ауысып отырумен',
          price: '48 000 ₸-ден',
        },
      ],
      Екатеринбург: [
        {
          from: 'Астана',
          to: 'Екатеринбург',
          detail: 'Тікелей рейс, ауысып отырусыз',
          duration: '2с 20м жолда',
          price: '31 000 ₸-ден',
        },
      ],
    },
  },
  ru: {
    productAvia: 'Авиабилеты',
    heroTitles: ['ЛЕТИМ', 'ЕДЕМ', 'ЕДЕМ', 'ПОЕХАЛИ'],
    heroBadge: 'в Россию',
    heroDeal: 'Успей купить по промокоду',
    heroSubtitle: 'Выгодные авиабилеты для жителей Казахстана',
    chooseTicket: 'Выбрать билет',
    trustYears: 'с 2003 работаем для вас',
    trustTravelers: '42 млн путешествуют с нами',
    trustReliable: 'Это надёжно',
    trustCards: 'оплата Visa и Mastercard',
    trustSupport: 'Поддержка 24/7',
    modes: ['Авиабилеты', 'Поезда', 'Автобусы', 'Смешанный'],
    trips: ['Туда-обратно', 'В одну сторону'],
    from: 'Откуда',
    to: 'Куда',
    when: 'Когда',
    date: 'Дата',
    findTickets: 'Найти авиабилеты',
    findShort: 'Найти',
    whoTravels: 'Кто едет',
    passengersOne: '1 пассажир',
    popular: 'Популярное:',
    cities: ['Алматы', 'Астана', 'Москва', 'Санкт-Петербург'],
    fromSuggest: ['Алматы', 'Астана'],
    toSuggest: ['Москва', 'Санкт-Петербург'],
    whenSuggest: ['Сегодня', 'Завтра'],
    destinationsEyebrow: 'Направления',
    destinationsTitle: 'Популярные направления',
    destinationsSubtitle: 'Готовые маршруты, которые ищут чаще всего',
    destinationsAll: 'Все направления',
    destinationsTabKzRu: 'Из Казахстана в Россию',
    destinationsTabRuRu: 'Из России в Россию',
    destinationsPriceFrom: 'от',
    destinationNames: ['Сочи', 'Санкт-Петербург', 'Анапа', 'Казань', 'Москва', 'Екатеринбург'],
    loveTitle: 'За что любят Туту',
    loveCards: [
      {
        title: 'Visa и Mastercard',
        text: 'Можно оплатить картой Visa или Mastercard',
      },
      {
        title: 'Поддержка 24/7',
        text: 'Всегда на связи и рады вам помочь',
      },
      {
        title: 'Подписка на цену',
        text: 'Напишем, если билет станет дешевле',
      },
      {
        title: 'Оплата позже',
        text: 'Зафиксируйте цену билета, а выкупите потом',
      },
      {
        title: '100% возврат',
        text: 'С услугой сможете вернуть всю стоимость',
      },
    ],
    routesEyebrow: 'Маршруты',
    routesTitle: 'Готовые маршруты в Россию',
    routesSubtitle: 'Мультимодальные билеты — самолёт и поезд в одной покупке.',
    routesPromo: 'скидки на маршруты',
    routeTabs: ['Санкт-Петербург', 'Сочи', 'Казань', 'Екатеринбург'],
    look: 'Смотреть',
    promoTitle: 'Больше экономии в поездке',
    promoSubtitle: 'Скидка 15% на авиабилеты для вас и ваших друзей',
    promoCode: 'INTAVIATUTU',
    promoCopied: 'Скопировано',
    hotelsEyebrow: 'Жильё',
    hotelsTitle: 'Жильё по всей России',
    hotelsSubtitle: 'От Москвы до Владивостока — бронируйте отели сразу в поездке.',
    hotelsAll: 'Все отели',
    hotelsPromoCode: 'INHOTELTUTU',
    hotelsPerNight: 'за ночь',
    hotelsDiscount: '-15%',
    book: 'Забронировать',
    carriersEyebrow: 'Автобусы',
    carriersTitle: 'Рейтинг автобусных перевозчиков',
    carriersSubtitle: 'Сначала самые популярные, затем — по городу отправления.',
    allCities: 'Все города',
    carrierCities: ['Алматы', 'Астана', 'Шымкент', 'Кокшетау'],
    reviewsCount: (n) => `${n} отзывов`,
    fromCity: (city) => `Из города: ${city}`,
    learnMore: 'Ознакомиться',
    memoEyebrow: 'Памятка',
    memoTitle: 'Памятка туриста',
    memoSubtitle: 'Чек-лист первых шагов — коротко и по делу.',
    memoItems: [
      { title: 'Регистрация', text: 'Уточните правила учёта по месту пребывания заранее.' },
      { title: 'Жильё без обмана', text: 'Смотрите отзывы и не платите полную сумму до заезда.' },
      { title: 'Аэропорт быстрее', text: 'Проверьте терминал и табло онлайн до выезда.' },
      { title: 'SIM-карта', text: 'Выберите оператора заранее — регистрация занимает время.' },
      { title: 'Банковская карта', text: 'Откройте счёт по приезде, чтобы не переплачивать за переводы.' },
      { title: 'Экстренные номера', text: 'Сохраните полицию, скорую и контакты консульства.' },
    ],
    aboutEyebrow: 'О нас',
    aboutTitle: 'Почему выбирают tutu',
    aboutSubtitle: 'Цифры, за которыми — реальные поездки.',
    stats: [
      { value: 'с 2003', title: 'Более 20 лет на рынке', text: 'Один из первых сервисов путешествий.' },
      { value: '42 млн', title: 'Путешественников', text: 'Уже выбрали tutu для поездок.' },
      { value: '10 000+', title: 'Перевозчиков', text: 'Авиа, ЖД и автобусы — напрямую.' },
      { value: '24/7', title: 'Поддержка на связи', text: 'Чат, почта и телефон в любое время.' },
    ],
    reviewsEyebrow: 'Отзывы',
    reviewsTitle: 'Что говорят путешественники',
    reviewsShellTitle: 'Что казахстанские путешественники говорят о нас',
    faqEyebrow: 'FAQ',
    faqTitle: 'Частые вопросы',
    faqSubtitle: 'Коротко о покупке, возврате и выгоде.',
    faqs: [
      {
        q: 'Какими картами можно оплатить билеты и отели?',
        a: 'Можно оплатить картами Visa и Mastercard. Платёж проходит по защищённому каналу, данные карты мы не сохраняем.',
      },
      {
        q: 'Какие условия у промокодов INTAVIATUTU и INHOTELTUTU?',
        a: 'INTAVIATUTU даёт скидку 15% на авиабилеты, INHOTELTUTU — 15% на отели. Введите код перед оплатой; на один заказ действует один промокод.',
      },
      {
        q: 'Что делать, если в паспорте нет фамилии или в имени на билете ошибка?',
        a: 'Перед покупкой внимательно проверьте данные. Если ошибка уже в билете — напишите в поддержку: подскажем, можно ли исправить или переоформить по правилам перевозчика.',
      },
      {
        q: 'Можно ли вернуть или обменять билет?',
        a: 'Да, если это допускают правила тарифа. Условия возврата или обмена и удерживаемая сумма будут показаны до подтверждения.',
      },
      {
        q: 'Как работает «Оплатить позже»?',
        a: 'Можно забронировать билет и отложить оплату. Срок и условия видны в заказе; если не оплатить вовремя, бронь могут снять.',
      },
      {
        q: 'Какие скидки есть на билеты на поезд?',
        a: 'Скидки зависят от тарифа, направления и даты покупки. В результатах поиска сразу видны доступные предложения и промокоды.',
      },
      {
        q: 'Сколько багажа можно взять с собой?',
        a: 'Норма зависит от перевозчика и тарифа. Правила ручной клади и багажа указаны на странице билета — проверьте их до покупки.',
      },
      {
        q: 'Можно ли купить билет другу или родственнику?',
        a: 'Да. Укажите данные пассажира и оплатите заказ сами. Электронный билет придёт на почту — перешлите его пассажиру.',
      },
      {
        q: 'Как добраться из аэропорта в другой город?',
        a: 'После авиабилета на Туту можно сразу выбрать поезд, автобус или смешанный маршрут. В поиске также показываются варианты с пересадкой.',
      },
      {
        q: 'Чем отличается плацкарт от купе?',
        a: 'Плацкарт — открытый вагон примерно на 54 места, обычно дешевле. Купе — закрытый отсек на 4 места, комфортнее и дороже.',
      },
    ],
    ctaTitle: 'Куда отправимся?',
    ctaSubtitle: 'Найдите билеты и спланируйте следующую поездку прямо сейчас.',
    mixedEyebrow: 'Смешанный билет — комбинируем виды транспорта',
    mixedDefaultFrom: 'Астана',
    mixedDefaultTo: 'Санкт-Петербург',
    mixedHub: 'Москва',
    mixedSegment: (n) => `СЕГМЕНТ ${n}`,
    mixedPlane: 'Самолёт',
    mixedTrain: 'Поезд',
    mixedBus: 'Автобус',
    mixedSelect: 'Выбрать',
    mixedVia: (city) => `с пересадкой в городе ${city}`,
    mixedTotalLabel: 'Итого за маршрут',
    mixedTotalDuration: '≈ 9ч 40м с пересадкой в Москве',
    mixedBuyBoth: 'Купить оба билета',
    mixedSeg1Duration: '4ч 10м',
    mixedSeg1Price: '45 000 ₸',
    mixedSeg2Duration: '3ч 30м',
    mixedSeg2Price: '9 500 ₸',
    mixedTotalPrice: '54 500 ₸',
    routeDetails: {
      'Санкт-Петербург': [
        {
          from: 'Алматы',
          to: 'Санкт-Петербург',
          detail: 'Самолёт Алматы—Москва + Поезд Москва—Санкт-Петербург',
          duration: '≈ 9ч 40м с пересадкой',
          price: 'от 54 500 ₸',
        },
        {
          from: 'Астана',
          to: 'Санкт-Петербург',
          detail: 'Прямой рейс',
          duration: '≈ 4ч 50м в пути',
          price: 'от 61 200 ₸',
        },
      ],
      Сочи: [
        {
          from: 'Астана',
          to: 'Сочи',
          detail: 'Самолёт Астана—Москва + Самолёт Москва—Сочи',
          duration: '≈ 6ч 30м с пересадкой',
          price: 'от 62 000 ₸',
        },
      ],
      Казань: [
        {
          from: 'Алматы',
          to: 'Казань',
          detail: 'Самолёт Алматы—Москва + Поезд Москва—Казань',
          duration: '≈ 8ч 15м с пересадкой',
          price: 'от 48 000 ₸',
        },
      ],
      Екатеринбург: [
        {
          from: 'Астана',
          to: 'Екатеринбург',
          detail: 'Прямой рейс, без пересадок',
          duration: '2ч 20м в пути',
          price: 'от 31 000 ₸',
        },
      ],
    },
  },
};
