export interface Translations {
  // Navigation & Branding
  brandName: string;
  brandSub: string;
  digitalShowroom: string;
  navHome: string;
  navShowroom: string;
  navCars: string;
  navBrands: string;
  navServices: string;
  navAbout: string;
  navContact: string;
  navCompare: string;
  searchPlaceholder: string;
  searchTooltip: string;
  bookTestDrive: string;
  whatsappConcierge: string;
  whatsappChat: string;
  switchLanguage: string;
  currentLangName: string;

  // Hero Section
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroExploreFleet: string;
  heroBookDrive: string;
  heroFinanceCalc: string;
  heroTradeInEst: string;
  heroLiveInventory: string;
  heroCertifiedWarranty: string;
  heroGlobalDelivery: string;
  heroSearchTabPlaceholder: string;
  heroFilterAll: string;
  heroViewSpec: string;
  heroHorsepower: string;
  heroAcceleration: string;
  heroTopSpeed: string;

  // Featured Section
  featuredTitle: string;
  featuredSubtitle: string;
  viewAllFleet: (count?: number) => string;

  // Inventory & Filters
  inventoryTitle: string;
  inventorySubtitle: string;
  filterInventory: string;
  filterBrand: string;
  filterBodyType: string;
  filterFuelType: string;
  filterTransmission: string;
  filterCondition: string;
  filterPriceRange: string;
  filterYear: string;
  filterMaxMileage: string;
  filterSortBy: string;
  filterReset: string;
  filterAll: string;
  filterResultsCount: (count: number, total: number) => string;
  filterNoResults: string;
  filterNoResultsSub: string;

  // Sort Options
  sort: string;
  sortFeatured: string;
  sortRecommended: string;
  sortPriceAsc: string;
  sortPriceDesc: string;
  sortYearDesc: string;
  sortMileageAsc: string;
  sortPowerDesc: string;
  sortHpDesc: string;

  // Vehicle Card, Badges & Conditions
  conditionNew: string;
  conditionCertified: string;
  badgeFeatured: string;
  badgeSpecialOffer: string;
  badgeCertified: string;
  badgeReadyDelivery: string;
  badgeNewZeroKm: string;
  btnViewDetails: string;
  viewDetails: string;
  viewVehicleDetails: string;
  btnCompare: string;
  btnComparing: string;
  btnSaveGarage: string;
  btnSaved: string;
  favoritesAdd: string;
  savedVehicles: string;
  priceCash: string;
  priceFinanceEst: string;
  monthlyFrom: string;
  perMonth: string;
  statHp: string;
  statSprint: string;
  statTopSpeed: string;
  statMileage: string;
  deliveryMileage: string;

  // Specifications
  specHorsepower: string;
  specPower: string;
  spec0to100: string;
  specTopSpeed: string;
  specEngine: string;
  specTransmission: string;
  specDrivetrain: string;
  specFuelType: string;
  specMileage: string;
  specExteriorColor: string;
  specInteriorColor: string;

  // Vehicle Detail Page
  detailBackToFleet: string;
  exploreAllInventory: string;
  detailCertifiedScore: (score: number) => string;
  detailEstimatedMonthly: string;
  detailPriceCash: string;
  detailTabGallery: string;
  detailTab360: string;
  detailTabVideo: string;
  detailTabInspection: string;
  view360: string;
  viewVideo: string;
  detailSpecsTitle: string;
  detailSpecsSub: string;
  detailHighlightsTitle: string;
  detailPackagesTitle: string;
  detailPowertrain: string;
  detailEngine: string;
  detailTransmission: string;
  detailDrivetrain: string;
  detailTorque: string;
  detailFuelEconomy: string;
  detailExteriorColor: string;
  detailInteriorColor: string;
  detailSeating: string;
  detailDoors: string;
  detailVin: string;
  detailStockNo: string;
  detailWarranty: string;
  detailPreviousOwners: string;
  detailOneOwner: string;
  detailZeroOwner: string;
  detailScheduleViewing: string;
  detailReserveVehicle: string;
  detailRequestVideo: string;
  detailTradeInOption: string;
  detailFinanceOption: string;
  detailDownloadBrochure: string;

  // Comparison Matrix
  compare: string;
  compareTitle: string;
  compareSubtitle: string;
  compareEmptyTitle: string;
  compareEmptySub: string;
  compareExploreBtn: string;
  compareAdd: string;
  compareAddVehicle: string;
  compareRemove: string;
  compareClear: string;
  compareClearAll: string;
  compareSpecLabel: string;
  compareLimitNotice: (count: number) => string;
  compareRowPrice: string;
  compareRowMonthly: string;
  compareRowPower: string;
  compareRowSprint: string;
  compareRowTopSpeed: string;
  compareRowEngine: string;
  compareRowTransmission: string;
  compareRowDrivetrain: string;
  compareRowFuel: string;
  compareRowMileage: string;
  compareRowExterior: string;
  compareRowInterior: string;
  compareRowScore: string;
  compareRowWarranty: string;
  compareRowFeatures: string;

  // Financing
  financeTitle: string;

  // Test Drive Modal
  testDriveTitle: string;
  testDriveSubtitle: string;
  testDriveModalTitle: string;
  testDriveModalDesc: string;
  testDriveTypeShowroom: string;
  testDriveTypeShowroomDesc: string;
  testDriveTypeDoorstep: string;
  testDriveTypeDoorstepDesc: string;
  testDriveSelectDate: string;
  testDriveSelectTime: string;
  selectDate: string;
  selectTime: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  testDriveName: string;
  testDrivePhone: string;
  testDriveEmail: string;
  testDriveAddress: string;
  testDriveNotes: string;
  testDriveSubmitBtn: string;
  confirmTestDrive: string;
  testDriveSuccessTitle: string;
  testDriveSuccessSub: string;
  testDriveReference: string;

  // Search Modal
  searchModalTitle: string;
  searchModalSub: string;
  searchModalPlaceholder: string;
  searchPopularSearches: string;
  searchBrowseCategories: string;
  searchNoResults: string;

  // Favorites Drawer (Garage)
  garageTitle: string;
  garageSubtitle: (count: number) => string;
  garageEmptyTitle: string;
  garageEmptySub: string;
  garageClear: string;
  garageCompareAll: string;
  favoritesTitle: string;
  favoritesEmpty: string;
  favoritesEmptyDesc: string;
  favoritesClear: string;

  // Brands Page & Section
  brandsTitle: string;
  brandsSubtitle: string;
  brandVehiclesAvailable: (count: number) => string;
  brandExploreFleet: (brand: string) => string;
  brandOrigin: string;

  // Trust & Inspection Section
  trustTitle: string;
  trustSubtitle: string;
  trustPill: string;
  trustStep1: string;
  trustStep2: string;
  trustStep3: string;
  trustStep4: string;
  trustStep5: string;

  // About Section
  aboutHeritageTitle: string;
  aboutHeritageSubtitle: string;

  // Customer Reviews
  reviewsTitle: string;
  reviewsSubtitle: string;
  reviewVerifiedBuyer: string;

  // Why Choose Us
  whyChooseTitle: string;
  whyChooseSubtitle: string;

  // Location & Contact
  locationTitle: string;
  locationSubtitle: string;
  locationAddress: string;
  locationHours: string;
  locationPhone: string;
  locationGetDirections: string;
  locationOpenMaps: string;
  contactTitle: string;
  contactSubtitle: string;
  contactFormTitle: string;
  contactFormSub: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactTopic: string;
  contactMessage: string;
  contactSendBtn: string;
  contactSuccessTitle: string;
  contactSuccessSub: string;
  contactWhatsAppDirectTitle: string;
  contactWhatsAppDirectDesc: string;
  contactWhatsAppDirectBtn: string;
  contactAddress: string;
  contactHours: string;
  contactPhoneDirect: string;

  // Footer
  footerAbout: string;
  footerQuickLinks: string;
  footerInventoryBrands: string;
  footerConciergeHours: string;
  footerRights: string;
  footerPrivacy: string;
  footerTerms: string;
  footerSecurity: string;

  // WhatsApp Message Generator
  whatsappGreeting: (carModel?: string, price?: number) => string;
  whatsappTradeInMsg: (make: string, model: string, year: number) => string;
  whatsappTestDriveMsg: (carModel: string, date: string, type: string) => string;
}

export const ARABIC_TRANSLATIONS: Translations = {
  // Navigation & Branding
  brandName: 'الأصدقاء',
  brandSub: 'موتورز',
  digitalShowroom: 'صالة العرض الرقمية الفاخرة',
  navHome: 'الرئيسية',
  navShowroom: 'صالة العرض',
  navCars: 'أسطول السيارات',
  navBrands: 'العلامات التجارية',
  navServices: 'خدمات الكونسيرج',
  navAbout: 'عن الأصدقاء',
  navContact: 'اتصل بنا',
  navCompare: 'مقارنة السيارات',
  searchPlaceholder: 'ابحث عن سيارة، ماركة، موديل أو مواصفات...',
  searchTooltip: 'بحث سريع (Ctrl+K)',
  bookTestDrive: 'طلب معاينة',
  whatsappConcierge: 'خدمة واتساب الفورية',
  whatsappChat: 'محادثة واتساب الفورية',
  switchLanguage: 'English',
  currentLangName: 'العربية',

  // Hero Section
  heroBadge: 'معرض سيارات فاخرة · القاهرة',
  heroTitle1: 'قُد شيئًا',
  heroTitle2: 'مختلفًا.',
  heroSubtitle: 'سيارات مختارة بعناية ومفحوصة على 150 نقطة، بأسعار معلنة نهائية. تسليم لكامل المحافظات.',
  heroExploreFleet: 'تصفح المعرض',
  heroBookDrive: 'حجز موعد معاينة خاصة',
  heroFinanceCalc: 'حاسبة التمويل والأقساط',
  heroTradeInEst: 'تقييم استبدال سيارتك',
  heroLiveInventory: 'سيارة متوفرة للتسليم الفوري',
  heroCertifiedWarranty: 'فحص فني معتمد 150 نقطة',
  heroGlobalDelivery: 'توصيل مغلق مخصص للباب',
  heroSearchTabPlaceholder: 'ابحث بالموديل، الماركة (بورشه، فيراري، مرسيدس-AMG)...',
  heroFilterAll: 'جميع السيارات',
  heroViewSpec: 'تفاصيل السيارة الفنية',
  heroHorsepower: 'قوة المحرك',
  heroAcceleration: 'تسارع 0-100 كم/س',
  heroTopSpeed: 'السرعة القصوى',

  // Featured Section
  featuredTitle: 'أبرز السيارات المختارة في صالة العرض',
  featuredSubtitle: 'استكشف نخبة سيارات الأداء الفائق والرفاهية المطلقة الجاهزة للتسليم الفوري.',
  viewAllFleet: (count?: number) => count ? `استعراض كامل الأسطول (${count} سيارة)` : 'استعراض كامل أسطول المعرض',

  // Inventory & Filters
  inventoryTitle: 'صالة العرض والأسطول المتاح',
  inventorySubtitle: 'استكشف السيارات الفارهة والخارقة المتاحة للاقتناء الفوري مع توثيق كامل للعداد وفحص الحالة الفنية الشاملة.',
  filterInventory: 'تصفية الأسطول',
  filterBrand: 'الماركة المصنعة',
  filterBodyType: 'نوع الهيكل',
  filterFuelType: 'منظومة الحركة والوقود',
  filterTransmission: 'ناقل الحركة',
  filterCondition: 'حالة السيارة',
  filterPriceRange: 'نطاق السعر الإجمالي',
  filterYear: 'سنة الصنع',
  filterMaxMileage: 'الحد الأقصى للممشى (كم)',
  filterSortBy: 'الترتيب حسب',
  filterReset: 'إعادة ضبط الفلاتر',
  filterAll: 'الكل',
  filterResultsCount: (count: number, total: number) => `عرض ${count} من أصل ${total} سيارة فاخرة`,
  filterNoResults: 'لم يتم العثور على سيارات تطابق هذه المعايير',
  filterNoResultsSub: 'جرب تعديل نطاق السعر أو اختيار ماركة أخرى، أو تواصل مع فريق الكونسيرج لتوفير طلبك المخصص.',

  // Sort Options
  sort: 'الترتيب',
  sortFeatured: 'المميزة والموصى بها',
  sortRecommended: 'الموصى بها والأحدث وصولاً',
  sortPriceAsc: 'السعر: من الأقل للأعلى',
  sortPriceDesc: 'السعر: من الأعلى للأقل',
  sortYearDesc: 'سنة الموديل: الأحدث أولاً',
  sortMileageAsc: 'قراءة العداد: الأقل ممشى',
  sortPowerDesc: 'قوة المحرك: الأعلى حصاناً',
  sortHpDesc: 'القوة الحصانية: الأعلى أولاً',

  // Vehicle Card & Badges & Condition
  conditionNew: 'جديدة تماماً (صفر كم)',
  conditionCertified: 'فحص معتمد 150 نقطة',
  badgeFeatured: 'موصى به VIP',
  badgeSpecialOffer: 'عرض استثنائي',
  badgeCertified: 'فحص معتمد 150-نقطة',
  badgeReadyDelivery: 'جاهزة للتسليم الفوري',
  badgeNewZeroKm: 'جديد كلياً (0 كم)',
  btnViewDetails: 'عرض المواصفات الكاملة',
  viewDetails: 'عرض المواصفات',
  viewVehicleDetails: 'عرض تفاصيل ومواصفات السيارة',
  btnCompare: 'إضافة للمقارنة',
  btnComparing: 'ضمن المقارنة',
  btnSaveGarage: 'حفظ بالمرآب',
  btnSaved: 'محفوظة',
  favoritesAdd: 'حفظ في المفضلة',
  savedVehicles: 'السيارات المحفوظة',
  priceCash: 'السعر النقدي المباشر',
  priceFinanceEst: 'الدفعة الشهرية التقديرية',
  monthlyFrom: 'يبدأ من',
  perMonth: '/ شهرياً',
  statHp: 'حصان',
  statSprint: '0-100 كم/س',
  statTopSpeed: 'سرعة قصوى',
  statMileage: 'الممشى',
  deliveryMileage: 'تسليم جديد (صفر كم)',

  // Specifications
  specHorsepower: 'القوة الحصانية',
  specPower: 'القوة الحصانية',
  spec0to100: 'تسارع 0-100 كم/س',
  specTopSpeed: 'السرعة القصوى',
  specEngine: 'المحرك والسعة',
  specTransmission: 'ناقل الحركة',
  specDrivetrain: 'نظام الدفع',
  specFuelType: 'نوع الوقود / المنظومة',
  specMileage: 'الممشى الحالي',
  specExteriorColor: 'اللون الخارجي',
  specInteriorColor: 'المقصورة الداخلية',

  // Vehicle Detail Page
  detailBackToFleet: 'العودة لأسطول صالة العرض',
  exploreAllInventory: 'استكشاف كامل الأسطول والمعروضات',
  detailCertifiedScore: (score: number) => `شهادة الفحص المعتمد: ${score}/100`,
  detailEstimatedMonthly: 'الدفعة الشهرية التقديرية (تمويل VIP)',
  detailPriceCash: 'السعر النقدي الإجمالي',
  detailTabGallery: 'معرض الصور بدقة 4K',
  detailTab360: 'استوديو 360° التفاعلي',
  detailTabVideo: 'استعراض الفيديو وهدير المحرك',
  detailTabInspection: 'تقرير الفحص الفني (150 نقطة)',
  view360: 'استعراض 360 درجة',
  viewVideo: 'فيديو استعراضي وصوت العادم',
  detailSpecsTitle: 'المواصفات الهندسية والأداء الفني',
  detailSpecsSub: 'بيانات القياس التليمترية وتفاصيل المحرك ومنظومة الحركة الموثقة من الصانع',
  detailHighlightsTitle: 'حزم التجهيزات الرئيسية والميزات الحصرية',
  detailPackagesTitle: 'المواصفات القياسية والأنظمة التقنية',
  detailPowertrain: 'منظومة المحرك والقوة',
  detailEngine: 'نوع وسعة المحرك',
  detailTransmission: 'ناقل الحركة والتعشيق',
  detailDrivetrain: 'نظام الدفع',
  detailTorque: 'عزم الدوران الأقصى',
  detailFuelEconomy: 'استهلاك الوقود',
  detailExteriorColor: 'اللون الخارجي والطلاء',
  detailInteriorColor: 'الفرش الداخلي والمقصورة',
  detailSeating: 'عدد المقاعد',
  detailDoors: 'عدد الأبواب',
  detailVin: 'رقم الهيكل التسلسلي (VIN)',
  detailStockNo: 'رقم المعروض في الصالة',
  detailWarranty: 'تغطية الضمان المعتمد',
  detailPreviousOwners: 'عدد الملاك السابقين',
  detailOneOwner: 'مالك أول موثق بالوكالة',
  detailZeroOwner: 'سيارة جديدة من المصنع مباشرة',
  detailScheduleViewing: 'حجز موعد معاينة وتجربة قيادة',
  detailReserveVehicle: 'طلب إجراءات الحجز والشراء',
  detailRequestVideo: 'طلب فيديو حي مخصص عبر واتساب',
  detailTradeInOption: 'استبدال سيارتك الحالية بهذه السيارة',
  detailFinanceOption: 'احتساب التمويل المخصص لهذه السيارة',
  detailDownloadBrochure: 'تحميل كتيب المواصفات الرقمي PDF',

  // Comparison Matrix
  compare: 'مقارنة',
  compareTitle: 'مصفوفة مقارنة السيارات الفائقة',
  compareSubtitle: 'قارن المواصفات التليمترية، أرقام التسارع، قوة الأحصنة، والأسعار جنباً إلى جنب بين سياراتك المختارة.',
  compareEmptyTitle: 'لم يتم تحديد سيارات للمقارنة بعد',
  compareEmptySub: 'اختر من 2 إلى 4 سيارات من صالة العرض لعرض مقارنة هندسية تفصيلية شاملة.',
  compareExploreBtn: 'تصفح أسطول السيارات لاختيار المقارنة',
  compareAdd: 'إضافة للمقارنة',
  compareAddVehicle: '+ إضافة سيارة أخرى للمقارنة',
  compareRemove: 'إزالة من المقارنة',
  compareClear: 'مسح قائمة المقارنة',
  compareClearAll: 'مسح جدول المقارنة',
  compareSpecLabel: 'المواصفة الفنية',
  compareLimitNotice: (count: number) => `تتم مقارنة ${count} من أصل 4 سيارات كحد أقصى`,
  compareRowPrice: 'السعر الإجمالي المباشر',
  compareRowMonthly: 'القسط الشهري التقديري',
  compareRowPower: 'قوة المحرك الحصانية',
  compareRowSprint: 'التسارع من 0 إلى 100 كم/س',
  compareRowTopSpeed: 'السرعة القصوى',
  compareRowEngine: 'هندسة وسعة المحرك',
  compareRowTransmission: 'ناقل الحركة',
  compareRowDrivetrain: 'نظام الدفع',
  compareRowFuel: 'نوع الوقود ومنظومة الحركة',
  compareRowMileage: 'قراءة العداد الحالية',
  compareRowExterior: 'الطلاء واللون الخارجي',
  compareRowInterior: 'المقصورة والفرش الداخلي',
  compareRowScore: 'تقييم الفحص المعتمد',
  compareRowWarranty: 'تغطية الضمان',
  compareRowFeatures: 'أبرز حزم التجهيزات الإضافية',

  // Financing
  financeTitle: 'حاسبة التمويل والأقساط الفاخرة',

  // Test Drive Modal
  testDriveTitle: 'حجز تجربة قيادة خاصة VIP',
  testDriveSubtitle: 'اختر موعدك المفضل لمعاينة السيارة وتجربة أدائها برفقة خبير متخصص من الأصدقاء موتورز.',
  testDriveModalTitle: 'طلب حجز تجربة قيادة VIP ومعاينة خاصة',
  testDriveModalDesc: 'يرجى تحديد الموعد المناسب وتفضيلات الاستقبال لمعاينة السيارة',
  testDriveTypeShowroom: 'معاينة في صالة العرض VIP Lounge',
  testDriveTypeShowroomDesc: 'استقبال خاص في صالة العرض الفاخرة وتجربة قيادة على المسار المخصص.',
  testDriveTypeDoorstep: 'توصيل السيارة لباب منزلك / مكتبك',
  testDriveTypeDoorstepDesc: 'توصيل السيارة الفارهة في شاحنة نقل مغلقة ومكيفة إلى موقعك المحدد.',
  testDriveSelectDate: 'تاريخ الموعد المفضل',
  testDriveSelectTime: 'الفترة الزمنية المناسبة',
  selectDate: 'تاريخ الموعد',
  selectTime: 'التوقيت المفضل',
  fullName: 'الاسم الكريم',
  phoneNumber: 'رقم الهاتف / الجوال',
  emailAddress: 'البريد الإلكتروني',
  testDriveName: 'الاسم الكامل',
  testDrivePhone: 'رقم الهاتف / الجوال',
  testDriveEmail: 'البريد الإلكتروني',
  testDriveAddress: 'عنوان التوصيل (في حال اختيار التوصيل للباب)',
  testDriveNotes: 'ملاحظات أو متطلبات خاصة',
  testDriveSubmitBtn: 'تأكيد حجز موعد تجربة القيادة',
  confirmTestDrive: 'تأكيد إرسال طلب تجربة القيادة',
  testDriveSuccessTitle: 'تم استلام طلب الحجز بنجاح',
  testDriveSuccessSub: 'سيتواصل معك مدير علاقات كبار العملاء خلال 30 دقيقة لتأكيد تفاصيل الموعد وجدول الاستقبال.',
  testDriveReference: 'رقم المرجع',

  // Search Modal
  searchModalTitle: 'البحث الفوري في أسطول المعرض',
  searchModalSub: 'ابحث بالاسم، الماركة، ناقل الحركة، سنة الصنع، أو الميزانية',
  searchModalPlaceholder: 'اكتب اسم السيارة أو الماركة (مثال: بورشه GT3، فيراري 296، AMG...)...',
  searchPopularSearches: 'عمليات البحث الشائعة',
  searchBrowseCategories: 'تصفح حسب الفئة',
  searchNoResults: 'لا توجد سيارات مطابقة لبحثك',

  // Favorites Drawer (Garage)
  garageTitle: 'مرآبك المحفوظ',
  garageSubtitle: (count: number) => `${count} سيارات محفوظة في قائمتك الخاصة`,
  garageEmptyTitle: 'مرآبك المحفوظ فارغ حالياً',
  garageEmptySub: 'اضغط على رمز القلب في أي سيارة لحفظها هنا ومقارنتها أو حجز موعد لمعاينتها لاحقاً.',
  garageClear: 'تفريغ القائمة',
  garageCompareAll: 'مقارنة هذه السيارات في مصفوفة المقارنة',
  favoritesTitle: 'المرآب والمفضلة الخاصة',
  favoritesEmpty: 'لا توجد سيارات محفوظة في مرآبك حالياً',
  favoritesEmptyDesc: 'استعرض أسطول صالة العرض واضغط على أيقونة القلب لحفظ سياراتك المفضلة هنا للرجوع إليها.',
  favoritesClear: 'مسح السيارات المحفوظة',

  // Brands Page & Section
  brandsTitle: 'دليل العلامات التجارية الفاخرة',
  brandsSubtitle: 'تصفح مجموعاتنا الحصرية من كبرى دور صناعة السيارات الفارهة والخارقة في العالم مع استعراض تراثها الهندسي.',
  brandVehiclesAvailable: (count: number) => `${count} سيارات متوفرة حالياً`,
  brandExploreFleet: (brand: string) => `استكشف أسطول ${brand}`,
  brandOrigin: 'بلد المنشأ',

  // Trust & Inspection Section
  trustTitle: 'معايير الفحص والاعتماد الصارمة',
  trustSubtitle: 'تخضع كل سيارة في الأصدقاء موتورز لبروتوكول فحص شامل يتكون من 150 نقطة تضمن مطابقتها لأعلى معايير الجودة الميكانيكية والجمالية.',
  trustPill: 'شهادة الاعتماد 150 نقطة',
  trustStep1: 'فحص التليمتري للمحرك ومنظومة القوة',
  trustStep2: 'الشاسيه، نظام التعليق والمكابح الخزفية',
  trustStep3: 'قياس سماكة الطلاء وهيكل ألياف الكربون',
  trustStep4: 'المقصورة الداخلية والأنظمة الإلكترونية',
  trustStep5: 'اختبار القيادة الميداني الشامل عالي السرعة',

  // About Section
  aboutHeritageTitle: 'تاريخ عريق وتفانٍ في عالم السيارات الخارقة',
  aboutHeritageSubtitle: 'تأسست الأصدقاء موتورز لتكون الصرح الأرقى لاقتناء وتوثيق السيارات النخبوية والتحف الميكانيكية النادرة.',

  // Customer Reviews
  reviewsTitle: 'تجارب وآراء نخبة العملاء',
  reviewsSubtitle: 'شهادات موثقة من جامعي السيارات الفارهة ورجال الأعمال الذين وثقوا بالأصدقاء موتورز لاقتناء سيارات أحلامهم.',
  reviewVerifiedBuyer: 'مشتري معتمد وموثق',

  // Why Choose Us
  whyChooseTitle: 'لماذا يختار النخبة الأصدقاء موتورز؟',
  whyChooseSubtitle: 'نقدم تجربة اقتناء مصممة خصيصاً ترتقي لمستوى صناعة الساعات الفاخرة وتلبي أدق تطلعات عملائنا.',

  // Location & Contact
  locationTitle: 'موقع صالة العرض واستقبال كبار الشخصيات',
  locationSubtitle: 'تفضل بزيارة صالة العرض الرئيسية أو احجز جلسة خاصة في جناح كبار العملاء VIP Lounge.',
  locationAddress: 'عنوان صالة العرض',
  locationHours: 'ساعات العمل والاستقبال',
  locationPhone: 'أرقام الاتصال المباشرة',
  locationGetDirections: 'الاتجاهات عبر الخريطة',
  locationOpenMaps: 'فتح الموقع في خرائط Google',
  contactTitle: 'تواصل مع مكتب الكونسيرج الخاص',
  contactSubtitle: 'سواء كنت ترغب بالاستفسار عن سيارة معينة، ترتيب معاينة خاصة في صالة العرض، أو طلب استيراد سيارة نادرة بمواصفات حصرية.',
  contactFormTitle: 'إرسال استفسار خاص وسري',
  contactFormSub: 'يقوم مستشار المبيعات الأول بالرد خلال 30 دقيقة خلال ساعات العمل.',
  contactName: 'الاسم الكريم',
  contactPhone: 'رقم الجوال مع رمز الدولة',
  contactEmail: 'البريد الإلكتروني',
  contactTopic: 'موضوع الاستفسار',
  contactMessage: 'تفاصيل الاستفسار أو مواصفات السيارة المطلوبة',
  contactSendBtn: 'إرسال الاستفسار إلى الكونسيرج',
  contactSuccessTitle: 'تم إرسال استفسارك بنجاح',
  contactSuccessSub: 'شكراً لتواصلك معنا. تم تحويل ملفك إلى مدير المبيعات التنفيذي وسيتواصل معك مباشرة.',
  contactWhatsAppDirectTitle: 'قناة المحادثة الفورية المباشرة',
  contactWhatsAppDirectDesc: 'تواصل مباشرة عبر تطبيق واتساب للحصول على مقاطع فيديو حية للسيارة، تسجيلات لصوت العادم، وملفات المواصفات التفصيلية.',
  contactWhatsAppDirectBtn: 'بدء محادثة واتساب فورية',
  contactAddress: 'موقع صالة العرض الرئيسية',
  contactHours: 'ساعات الاستقبال والزيارة',
  contactPhoneDirect: 'الهاتف المباشر للكونسيرج',

  // Footer
  footerAbout: 'الأصدقاء موتورز هي صالة العرض الرائدة في اقتناء وبيع أندر السيارات الرياضية الخارقة وسيارات الرفاهية المعتمدة في الشرق الأوسط والعالم.',
  footerQuickLinks: 'روابط سريعة',
  footerInventoryBrands: 'الماركات المعروضة',
  footerConciergeHours: 'ساعات العمل الرسمية',
  footerRights: 'جميع الحقوق محفوظة © 2026 الأصدقاء موتورز للسيارات الفاخرة ذ.م.م.',
  footerPrivacy: 'سياسة الخصوصية وسرية العملاء',
  footerTerms: 'الشروط والأحكام',
  footerSecurity: 'أمان المعاملات المالية المعتمد',

  // WhatsApp Generator
  whatsappGreeting: (carModel?: string, price?: number) => {
    if (carModel && price) {
      return `السلام عليكم ورحمة الله، أود الاستفسار عن سيارة ${carModel} المعروضة بسعر ${price.toLocaleString('en-US')} جنيه في صالة عرض الأصدقاء موتورز. هل يمكنكم تزويدي بفيديو تفصيلي للسيارة وتحديد موعد لمعاينتها؟`;
    }
    if (carModel) {
      return `السلام عليكم ورحمة الله، أود الاستفسار عن سيارة ${carModel} المعروضة في صالة عرض الأصدقاء موتورز. أرجو تزويدي بكامل التفاصيل وموعد المعاينة.`;
    }
    return `السلام عليكم ورحمة الله، أود التحدث مع مستشار مبيعات الأصدقاء موتورز للاستفسار عن السيارات المتاحة والخدمات الخاصة.`;
  },
  whatsappTradeInMsg: (make: string, model: string, year: number) => {
    return `السلام عليكم، أود طلب تقييم لاستبدال سيارتي الحالية (${make} ${model} موديل ${year}) لدى الأصدقاء موتورز. أرجو إفادتي بالإجراءات والقيمة التقديرية.`;
  },
  whatsappTestDriveMsg: (carModel: string, date: string, type: string) => {
    return `السلام عليكم، قمت بحجز موعد تجربة قيادة لسيارة ${carModel} بتاريخ ${date} (${type}). أرجو تأكيد الموعد واستكمال الترتيبات.`;
  }
};
