import { CustomerReview, DealershipBrand } from '../types/vehicle';

export const DEALERSHIP_INFO = {
  name: 'AL-ASDIQA MOTORS',
  nameAr: 'الأصدقاء موتورز',
  legalName: 'الأصدقاء موتورز للسيارات الفاخرة',
  tagline: 'The Fine Art of High-Performance Motoring',
  taglineAr: 'سيارات مختارة بعناية. أسعار معلنة. بلا مفاجآت.',
  phone: '+20 100 123 4567',
  phoneDirect: '+20 2 2619 4800',
  whatsappNumber: '201001234567',
  whatsappFormatted: '+20 100 123 4567',
  email: 'info@apexmotors.com.eg',
  salesEmail: 'sales@apexmotors.com.eg',
  address: {
    street: 'شارع التسعين الشمالي، التجمع الخامس',
    streetAr: 'شارع التسعين الشمالي، التجمع الخامس',
    city: 'New Cairo',
    cityAr: 'القاهرة الجديدة، مصر',
    state: 'Cairo',
    zip: '11835',
    country: 'Egypt',
    mapCoordinates: {
      lat: 30.0306,
      lng: 31.4700
    }
  },
  openingHours: [
    { days: 'السبت – الخميس', hours: '10:00 صباحاً – 10:00 مساءً' },
    { days: 'الجمعة', hours: '2:00 مساءً – 10:00 مساءً' }
  ],
  openingHoursAr: [
    { days: 'السبت – الخميس', hours: '10:00 صباحاً – 10:00 مساءً' },
    { days: 'الجمعة', hours: '2:00 مساءً – 10:00 مساءً' }
  ],
  foundedYear: 2012,
  stats: [
    { label: 'Years of Excellence', labelAr: 'سنوات في السوق المصري', value: '12+', description: '', descriptionAr: 'في سوق السيارات الفاخرة منذ عام 2012' },
    { label: 'Vehicles Delivered', labelAr: 'سيارة تم تسليمها', value: '1,200+', description: '', descriptionAr: 'لكل محافظات مصر والخارج' },
    { label: 'Multi-Point Inspection', labelAr: 'نقطة فحص لكل سيارة', value: '150', description: '', descriptionAr: 'تقرير فحص موثق يُسلَّم مع كل سيارة' },
    { label: 'Transparent Pricing', labelAr: 'سعر معلن نهائي', value: '٪100', description: '', descriptionAr: 'بدون رسوم خفية أو مبالغ إضافية' }
  ]
};

export const DEALERSHIP_BRANDS: DealershipBrand[] = [
  {
    name: 'Porsche',
    logo: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=400&q=80',
    tagline: 'There is no substitute.',
    country: 'Germany',
    vehicleCount: 14,
    featuredModel: '911 GT3 RS',
    bgImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Mercedes-Benz',
    logo: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=400&q=80',
    tagline: 'The best or nothing.',
    country: 'Germany',
    vehicleCount: 12,
    featuredModel: 'AMG GT 63 S E',
    bgImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'BMW',
    logo: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400&q=80',
    tagline: 'The Ultimate Driving Machine.',
    country: 'Germany',
    vehicleCount: 11,
    featuredModel: 'M8 Competition',
    bgImage: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Ferrari',
    logo: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=400&q=80',
    tagline: 'Essence of Italian Passion.',
    country: 'Italy',
    vehicleCount: 6,
    featuredModel: '296 GTB',
    bgImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Audi',
    logo: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=400&q=80',
    tagline: 'Vorsprung durch Technik.',
    country: 'Germany',
    vehicleCount: 8,
    featuredModel: 'RS6 Avant Performance',
    bgImage: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Aston Martin',
    logo: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=400&q=80',
    tagline: 'Power, Beauty and Soul.',
    country: 'United Kingdom',
    vehicleCount: 5,
    featuredModel: 'DB12 Volante',
    bgImage: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Lamborghini',
    logo: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=400&q=80',
    tagline: 'Expect the Unexpected.',
    country: 'Italy',
    vehicleCount: 5,
    featuredModel: 'Urus Performante',
    bgImage: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Bentley',
    logo: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=400&q=80',
    tagline: 'Handcrafted Extraordinary.',
    country: 'United Kingdom',
    vehicleCount: 4,
    featuredModel: 'Continental GT Speed',
    bgImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Land Rover',
    logo: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80',
    tagline: 'Above & Beyond.',
    country: 'United Kingdom',
    vehicleCount: 7,
    featuredModel: 'Range Rover SV',
    bgImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'أحمد الشافعي',
    role: 'رئيس تنفيذي لشركة استثمار',
    location: 'القاهرة الجديدة',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    vehiclePurchased: '2025 Porsche 911 GT3 RS (Weissach)',
    rating: 5,
    date: 'أغسطس 2026',
    review: 'وصلتني السيارة إلى القاهرة عبر نقل مغلق بحالة الوكالة تماماً، مع ملف الفحص الكامل والتوثيق. التعامل عبر واتساب كان سريعاً ومنظماً من أول رسالة حتى التسليم.',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'منى عبد الوارث',
    role: 'صاحبة شركة تصميم داخلي',
    location: 'الإسكندرية',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    vehiclePurchased: '2025 Aston Martin DB12 Volante',
    rating: 5,
    date: 'يوليو 2026',
    review: 'عملية الاستبدال كانت أبسط مما توقعت. تقييم شفاف خلال نصف ساعة وخطة تمويل واضحة بدون تعقيد. تجربة قيادة قبل الشراء اتظمت في نفس اليوم.',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'كريم حسنين',
    role: 'مهندس برمجيات وجامع سيارات',
    location: 'الشيخ زايد',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    vehiclePurchased: '2025 Ferrari 296 GTB Assetto Fiorano',
    rating: 4,
    date: 'يونيو 2026',
    review: 'استعرضت كل تفاصيل السيارة وقائمة المواصفات أونلاين قبل زيارة الصالة. الاستقبال كان راقياً والتسليم في الموعد المحدد بالضبط.',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'د. ياسمين فهمي',
    role: 'استشارية جراحة',
    location: 'المعادي، القاهرة',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    vehiclePurchased: '2025 Mercedes-Maybach S 580',
    rating: 5,
    date: 'مايو 2026',
    review: 'تولى الفريق إجراءات التسجيل والتأمين والحماية كاملة، ووصلتني السيارة إلى المنزل بدون أن أتحرك. السعر المتفق عليه هو نفسه النهائي بلا أي إضافات.',
    verified: true
  }
];

export const DEALERSHIP_SERVICES = [
  {
    id: 'bespoke-procurement',
    title: 'توريد سيارات بالطلب',
    description: 'لون معين أو طراز محدود أو تجهيز خاص؟ فريق التوريد يتولى تأمين السيارة من المصنع أو شبكاتنا في أوروبا والخليج.',
    badge: 'شبكة توريد دولية'
  },
  {
    id: 'white-glove-financing',
    title: 'تمويل مرن',
    description: 'خطط تمويل وتقسيط بأسعار تنافسية بالتعاون مع بنوك مصرية، وموافقة مبدئية خلال 48 ساعة.',
    badge: 'موافقة خلال 48 ساعة'
  },
  {
    id: 'transparent-trade-in',
    title: 'استبدال وبيع بالوكالة',
    description: 'تقييم فوري عادل لسيارتك الحالية بناءً على بيانات السوق، أو تسويقها بالوكالة لعملائنا المؤهلين.',
    badge: 'تقييم فوري معتمد'
  },
  {
    id: 'enclosed-transport',
    title: 'نقل مغلق لكامل المحافظات',
    description: 'تسليم إلى عنوانك في أي محافظة عبر شاحنات مغلقة ومكيّفة مع تتبع مباشر حتى الاستلام.',
    badge: 'نقل مؤمن بالكامل'
  },
  {
    id: 'detailing-ppf',
    title: 'حماية سيراميك وأفلام PPF',
    description: 'تركيب معتمد داخل مركزنا المتخصص لأفلام الحماية الذاتية وطبقات السيراميك قبل التسليم.',
    badge: 'فنيون معتمدون'
  },
  {
    id: 'warranty-maintenance',
    title: 'ضمان وصيانة ممتدة',
    description: 'باقات ضمان شاملة للمكونات الميكانيكية والكهربائية مع خدمة معتمدة داخل مصر.',
    badge: 'خيارات مرنة'
  }
];
