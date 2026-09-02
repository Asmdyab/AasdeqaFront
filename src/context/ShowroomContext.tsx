import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { Vehicle, VehicleFilterState } from '../types/vehicle';
import { VEHICLES_DATA } from '../data/vehicles';
import { DEALERSHIP_INFO, DEALERSHIP_BRANDS, CUSTOMER_REVIEWS } from '../data/dealership';
import { ARABIC_TRANSLATIONS, Translations } from '../i18n/translations';
import { VEHICLE_ARABIC_MAP } from '../i18n/vehicleTranslations';
import {
  fetchContent,
  fetchVehicles,
  fetchBrands,
  fetchReviews,
  fetchServices,
  fetchDealershipInfo,
  subscribeToChanges,
  ContentBlocks,
  assetUrl
} from '../lib/api';
import {
  Brand,
  Review,
  ServiceItem,
  DealershipInfo
} from '../types/vehicle';

export type AppView = 'home' | 'cars' | 'car-detail' | 'brands' | 'reviews' | 'about' | 'location' | 'contact';

interface ShowroomContextType {
  t: Translations;
  isRTL: boolean;
  cmsContent: ContentBlocks | null;
  getLocalizedVehicle: (v: Vehicle) => Vehicle;
  formatCurrency: (amount: number) => string;
  formatPrice: (amount: number) => string;
  vehicles: Vehicle[];
  brands: Brand[];
  reviews: Review[];
  services: ServiceItem[];
  dealership: DealershipInfo | null;
  currentView: AppView;
  selectedVehicle: Vehicle | null;
  selectedVehicleId: string | null;
  selectedBrandFilter: string;
  filters: VehicleFilterState;
  setFilters: React.Dispatch<React.SetStateAction<VehicleFilterState>>;
  resetFilters: () => void;
  filteredVehicles: Vehicle[];
  favorites: string[];
  toggleFavorite: (vehicleId: string) => void;
  isFavorite: (vehicleId: string) => boolean;
  clearFavorites: () => void;
  compareList: string[];
  toggleCompare: (vehicleId: string) => void;
  isComparing: (vehicleId: string) => boolean;
  clearCompare: () => void;
  comparedVehicles: Vehicle[];
  // New request modals
  purchaseModalOpen: boolean;
  purchaseVehicleId: string | null;
  openPurchase: (vehicleId?: string | null) => void;
  closePurchase: () => void;
  inspectionModalOpen: boolean;
  inspectionVehicleId: string | null;
  openInspection: (vehicleId?: string | null) => void;
  closeInspection: () => void;
  // Legacy aliases (kept for compatibility)
  testDriveModalOpen: boolean;
  testDriveVehicleId: string | null;
  openTestDrive: (vehicleId?: string | null) => void;
  closeTestDrive: () => void;
  tradeInModalOpen: boolean;
  tradeInVehicleId: string | null;
  openTradeIn: (targetVehicleId?: string | null) => void;
  closeTradeIn: () => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  favoritesDrawerOpen: boolean;
  setFavoritesDrawerOpen: (open: boolean) => void;
  navigateTo: (view: AppView, vehicleId?: string | null, brand?: string) => void;
  openWhatsApp: (vehicle?: Vehicle | null, customMessage?: string) => void;

  /** CMS helpers reading from backend content blocks (with optional fallback) */
  cmsText: (key: string, fallback?: string) => string;
  cmsImage: (key: string, fallback?: string) => string;
  cmsList: <T>(key: string, fallback: T) => T;
}

const initialFilters: VehicleFilterState = {
  searchQuery: '',
  brand: 'All',
  bodyType: 'All',
  fuelType: 'All',
  transmission: 'All',
  condition: 'All',
  minPrice: 0,
  maxPrice: 25000000,
  minYear: 2024,
  maxYear: 2026,
  maxMileage: 20000,
  sortBy: 'recommended'
};

const ShowroomContext = createContext<ShowroomContextType | undefined>(undefined);

export const ShowroomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isRTL = true;

  useEffect(() => {
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
  }, []);

  const [vehicles, setVehicles] = useState<Vehicle[]>(VEHICLES_DATA);
  const [currentView, setCurrentView] = useState<AppView>('home');

  // CMS content loaded from the backend (null = offline, fall back to bundled data)
  const [cmsContent, setCmsContent] = useState<ContentBlocks | null>(null);
  const [dataSource, setDataSource] = useState<'bundled' | 'api'>('bundled');

  const [brands, setBrands] = useState<Brand[]>(() =>
    DEALERSHIP_BRANDS.map((b, i) => ({
      id: i + 1,
      name: b.name,
      nameAr: b.name,
      logoUrl: b.logo,
      tagline: b.tagline,
      country: b.country,
      vehicleCount: b.vehicleCount,
      featuredModel: b.featuredModel,
      backgroundImageUrl: b.bgImage,
      sortOrder: i
    }))
  );
  const [reviews, setReviews] = useState<Review[]>(() =>
    CUSTOMER_REVIEWS.map((r, i) => ({
      id: i + 1,
      name: r.name,
      role: r.role,
      location: r.location,
      avatarUrl: r.avatar,
      vehiclePurchased: r.vehiclePurchased,
      rating: r.rating,
      dateLabel: r.date,
      reviewText: r.review,
      verified: r.verified,
      sortOrder: i
    }))
  );
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [dealership, setDealership] = useState<DealershipInfo | null>(null);

  // Re-fetch every dynamic dataset from the backend. Used for the initial load
  // and for live re-sync whenever the admin saves content (via SSE).
  // Supports AbortSignal to cancel in-flight fetches on StrictMode remount / unmount
  // (prevents 6x TaskCanceledException on the backend).
  const reloadData = useCallback(async (signal?: AbortSignal) => {
    const [apiVehicles, content, apiBrands, apiReviews, apiServices, apiDealership] =
      await Promise.all([
        fetchVehicles(signal),
        fetchContent(signal),
        fetchBrands(signal),
        fetchReviews(signal),
        fetchServices(signal),
        fetchDealershipInfo(signal)
      ]);
    if (signal?.aborted) return;
    if (apiVehicles && apiVehicles.length > 0) {
      setVehicles(apiVehicles);
      setDataSource('api');
    }
    if (apiBrands && apiBrands.length > 0) {
      setBrands(apiBrands.map(b => ({
        id: b.id,
        name: b.name,
        nameAr: b.nameAr || b.name,
        logoUrl: b.logoUrl,
        tagline: b.tagline,
        country: b.country,
        vehicleCount: b.vehicleCount,
        featuredModel: b.featuredModel,
        backgroundImageUrl: b.backgroundImageUrl,
        sortOrder: b.sortOrder
      })));
    }
    if (apiReviews && apiReviews.length > 0) {
      setReviews(apiReviews.map(r => ({
        id: r.id,
        name: r.name,
        role: r.role,
        location: r.location,
        avatarUrl: r.avatarUrl,
        vehiclePurchased: r.vehiclePurchased,
        rating: r.rating,
        dateLabel: r.dateLabel,
        reviewText: r.reviewText,
        verified: r.verified,
        sortOrder: r.sortOrder
      })));
    }
    if (apiServices && apiServices.length > 0) {
      setServices(apiServices.map(s => ({
        id: s.id, slug: s.slug, title: s.title, description: s.description, badge: s.badge
      })));
    }
    setDealership(apiDealership ?? null);
    setCmsContent(content);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const doReload = () => {
      controller.signal.aborted ? undefined : reloadData(controller.signal).catch(() => { /* keep bundled fallback */ });
    };

    const debounced = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(doReload, 350);
    };

    doReload();
    const unsubscribe = subscribeToChanges(debounced);
    return () => {
      controller.abort();
      if (debounceTimer) clearTimeout(debounceTimer);
      unsubscribe();
    };
  }, [reloadData]);

  // Merge CMS overrides into the Arabic UI strings
  const t = useMemo<Translations>(() => {
    if (!cmsContent) return ARABIC_TRANSLATIONS;
    const overrides: Record<string, string> = {};
    for (const [key, block] of Object.entries(cmsContent) as [string, { valueAr: string }][]) {
      if (key.startsWith('ui.')) overrides[key.slice(3)] = block.valueAr;
    }
    return { ...ARABIC_TRANSLATIONS, ...overrides } as Translations;
  }, [cmsContent]);

  // CMS helpers reading from backend content blocks
  const cmsText = (key: string, fallback = ''): string => {
    const block = cmsContent?.[key];
    if (block && block.valueAr) return block.valueAr;
    return fallback;
  };
  const cmsImage = (key: string, fallback = ''): string => {
    const block = cmsContent?.[key];
    if (block && block.imageUrl) return assetUrl(block.imageUrl);
    return assetUrl(fallback) || fallback;
  };
  const cmsList = <T,>(key: string, fallback: T): T => {
    const block = cmsContent?.[key];
    if (block && block.valueAr) {
      try {
        return JSON.parse(block.valueAr) as T;
      } catch {
        return fallback;
      }
    }
    return fallback;
  };

  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('All');
  const [filters, setFilters] = useState<VehicleFilterState>(initialFilters);

  // Modals & Drawers (new)
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [purchaseVehicleId, setPurchaseVehicleId] = useState<string | null>(null);
  const [inspectionModalOpen, setInspectionModalOpen] = useState(false);
  const [inspectionVehicleId, setInspectionVehicleId] = useState<string | null>(null);
  // Legacy
  const [testDriveModalOpen, setTestDriveModalOpen] = useState(false);
  const [testDriveVehicleId, setTestDriveVehicleId] = useState<string | null>(null);
  const [tradeInModalOpen, setTradeInModalOpen] = useState(false);
  const [tradeInVehicleId, setTradeInVehicleId] = useState<string | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState(false);

  // Helper to localize individual vehicle data.
  // When vehicles come from the API they are already admin-managed Arabic
  // content, so the bundled static map must NOT override them.
  const getLocalizedVehicle = useMemo(() => {
    return (v: Vehicle): Vehicle => {
      if (dataSource === 'api') return v;

      const arData = VEHICLE_ARABIC_MAP[v.id];
      if (!arData) return v;

      return {
        ...v,
        model: arData.model || v.model,
        trim: arData.trim || v.trim,
        engine: arData.engine || v.engine,
        tagline: arData.tagline || v.tagline,
        description: arData.description || v.description,
        exteriorColor: arData.exteriorColor || v.exteriorColor,
        interiorColor: arData.interiorColor || v.interiorColor,
        keyHighlights: arData.keyHighlights || v.keyHighlights,
        features: arData.features || v.features,
        warranty: arData.warranty || v.warranty
      };
    };
  }, [dataSource]);

  const formatPrice = (amount: number) => {
    // \u2066...\u2069 = invisible LTR isolate. It hard-locks the visual order
    // to [ج.م amount] in EVERY context (RTL paragraphs included).
    // These characters are zero-width and never displayed.
    if (typeof amount !== 'number' || isNaN(amount)) return '\u2066\u200Eجم 0\u2069';
    return `\u2066\u200Eجم ${amount.toLocaleString('en-US')}\u2069`;
  };
  const formatCurrency = formatPrice;

  // Persistence for favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('apex_showroom_favorites');
      return saved ? JSON.parse(saved) : ['porsche-911-gt3-rs-2025', 'ferrari-296-gtb-assetto-fiorano-2025'];
    } catch {
      return ['porsche-911-gt3-rs-2025', 'ferrari-296-gtb-assetto-fiorano-2025'];
    }
  });

  // Comparison items (max 4)
  const [compareList, setCompareList] = useState<string[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('apex_showroom_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // Handle URL hash routing — supports separated pages
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) {
        setCurrentView('home');
        setSelectedVehicleId(null);
        return;
      }

      if (hash.startsWith('car-') || hash.startsWith('cars/')) {
        const id = hash.replace(/^(car-|cars\/)/, '');
        const exists = vehicles.some(v => v.id === id || v.slug === id);
        if (exists) {
          setSelectedVehicleId(id);
          setCurrentView('car-detail');
          return;
        }
      }

      if (hash.startsWith('brand-') || hash.startsWith('brands/')) {
        const brandName = hash.replace(/^(brand-|brands\/)/, '');
        const decoded = decodeURIComponent(brandName);
        setSelectedBrandFilter(decoded);
        setFilters(prev => ({ ...prev, brand: decoded }));
        setCurrentView('cars');
        return;
      }

      const clean = hash.split('?')[0].split('/')[0];
      if (['home', 'cars', 'brands', 'reviews', 'about', 'location', 'contact'].includes(clean)) {
        setCurrentView(clean as AppView);
        if (clean !== 'car-detail') setSelectedVehicleId(null);
        return;
      }
      if (['home', 'cars'].includes(hash)) {
        setCurrentView(hash as AppView);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [vehicles]);

  const navigateTo = (view: AppView, vehicleId?: string | null, brand?: string) => {
    if (view === 'car-detail' && vehicleId) {
      setSelectedVehicleId(vehicleId);
      setCurrentView('car-detail');
      window.location.hash = `car-${vehicleId}`;
    } else if (view === 'cars' && brand) {
      setSelectedBrandFilter(brand);
      setFilters(prev => ({ ...prev, brand }));
      setCurrentView('cars');
      window.location.hash = `brand-${encodeURIComponent(brand)}`;
    } else {
      setSelectedVehicleId(null);
      setCurrentView(view);
      window.location.hash = view === 'home' ? '' : view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedVehicle = useMemo(() => {
    if (!selectedVehicleId) return null;
    const found = vehicles.find(v => v.id === selectedVehicleId || v.slug === selectedVehicleId) || null;
    return found ? getLocalizedVehicle(found) : null;
  }, [selectedVehicleId, vehicles, getLocalizedVehicle]);

  const toggleFavorite = (vehicleId: string) => {
    setFavorites(prev => 
      prev.includes(vehicleId) 
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  const isFavorite = (vehicleId: string) => favorites.includes(vehicleId);
  const clearFavorites = () => setFavorites([]);

  const toggleCompare = (vehicleId: string) => {
    setCompareList(prev => {
      if (prev.includes(vehicleId)) {
        return prev.filter(id => id !== vehicleId);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, vehicleId];
    });
  };

  const isComparing = (vehicleId: string) => compareList.includes(vehicleId);
  const clearCompare = () => setCompareList([]);

  const comparedVehicles = useMemo(() => {
    return compareList
      .map(id => vehicles.find(v => v.id === id))
      .filter((v): v is Vehicle => Boolean(v))
      .map(v => getLocalizedVehicle(v));
  }, [compareList, vehicles, getLocalizedVehicle]);

  const resetFilters = () => {
    setFilters(initialFilters);
    setSelectedBrandFilter('All');
  };

  // Filter and sort vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const localized = getLocalizedVehicle(v);
        const matchText = `${v.brand} ${v.model} ${v.trim} ${localized.model} ${localized.trim} ${v.year} ${v.tagline} ${v.engine} ${v.vin}`.toLowerCase();
        if (!matchText.includes(query)) return false;
      }

      // Brand
      if (filters.brand && filters.brand !== 'All' && v.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }

      // Fuel Type
      if (filters.fuelType && filters.fuelType !== 'All' && v.fuelType !== filters.fuelType) {
        return false;
      }

      // Transmission
      if (filters.transmission && filters.transmission !== 'All' && v.transmission !== filters.transmission) {
        return false;
      }

      // Condition
      if (filters.condition && filters.condition !== 'All' && v.condition !== filters.condition) {
        return false;
      }

      // BodyType (live from API)
      if (filters.bodyType && filters.bodyType !== 'All' && (v as any).bodyType !== filters.bodyType) {
        return false;
      }

      // Price range
      if (v.price < filters.minPrice || v.price > filters.maxPrice) {
        return false;
      }

      // Mileage
      if (v.mileage > filters.maxMileage) {
        return false;
      }

      // Year
      if (v.year < filters.minYear || v.year > filters.maxYear) {
        return false;
      }

      return true;
    }).map(v => getLocalizedVehicle(v))
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'year-desc':
          return b.year - a.year;
        case 'mileage-asc':
          return a.mileage - b.mileage;
        case 'horsepower-desc':
          return b.horsepower - a.horsepower;
        case 'recommended':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.price - a.price;
      }
    });
  }, [vehicles, filters, getLocalizedVehicle]);

  // New modals
  const openPurchase = (vehicleId?: string | null) => {
    setPurchaseVehicleId(vehicleId || selectedVehicleId || null);
    setPurchaseModalOpen(true);
  };
  const closePurchase = () => { setPurchaseModalOpen(false); setPurchaseVehicleId(null); };
  const openInspection = (vehicleId?: string | null) => {
    setInspectionVehicleId(vehicleId || selectedVehicleId || null);
    setInspectionModalOpen(true);
  };
  const closeInspection = () => { setInspectionModalOpen(false); setInspectionVehicleId(null); };

  // Legacy aliases (redirect to new modals for compatibility)
  const openTestDrive = (vehicleId?: string | null) => openInspection(vehicleId);
  const closeTestDrive = () => closeInspection();
  const openTradeIn = (targetVehicleId?: string | null) => openPurchase(targetVehicleId);
  const closeTradeIn = () => closePurchase();

  const openWhatsApp = (vehicle?: Vehicle | null, customMessage?: string) => {
    const target = vehicle || selectedVehicle;
    let text = t.whatsappGreeting();
    
    if (customMessage) {
      text = customMessage;
    } else if (target) {
      text = t.whatsappGreeting(`${target.year} ${target.brand} ${target.model} (${target.trim})`, target.price);
    }

    const rawNumber = dealership?.whatsappNumber || DEALERSHIP_INFO.whatsappNumber || '';
    const number = rawNumber.replace(/[^\d]/g, '');
    const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <ShowroomContext.Provider
      value={{
        t,
        isRTL,
        cmsContent,
        brands,
        reviews,
        services,
        dealership,
        cmsText,
        cmsImage,
        cmsList,
        getLocalizedVehicle,
        formatCurrency,
        formatPrice,
        vehicles,
        currentView,
        selectedVehicle,
        selectedVehicleId,
        selectedBrandFilter,
        filters,
        setFilters,
        resetFilters,
        filteredVehicles,
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        compareList,
        toggleCompare,
        isComparing,
        clearCompare,
        comparedVehicles,
        purchaseModalOpen,
        purchaseVehicleId,
        openPurchase,
        closePurchase,
        inspectionModalOpen,
        inspectionVehicleId,
        openInspection,
        closeInspection,
        testDriveModalOpen: inspectionModalOpen,
        testDriveVehicleId: inspectionVehicleId,
        openTestDrive: openInspection,
        closeTestDrive: closeInspection,
        tradeInModalOpen: purchaseModalOpen,
        tradeInVehicleId: purchaseVehicleId,
        openTradeIn: openPurchase,
        closeTradeIn: closePurchase,
        searchModalOpen,
        setSearchModalOpen,
        favoritesDrawerOpen,
        setFavoritesDrawerOpen,
        navigateTo,
        openWhatsApp
      }}
    >
      {children}
    </ShowroomContext.Provider>
  );
};

export const useShowroom = () => {
  const context = useContext(ShowroomContext);
  if (!context) {
    throw new Error('useShowroom must be used within a ShowroomProvider');
  }
  return context;
};

