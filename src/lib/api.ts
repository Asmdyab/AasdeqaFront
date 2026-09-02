import { Vehicle } from '../types/vehicle';

function normalizeApiBase(raw?: string): string {
  if (!raw) return 'http://localhost:5000';
  // trim whitespace & trailing slash, keep https
  let b = raw.trim().replace(/\/+$/, '');
  // Allow user to set with or without /api — normalize to WITHOUT trailing /api for request() consistency.
  // We strip trailing /api so `${API_BASE}/api/...` never becomes /api/api.
  b = b.replace(/\/api$/i, '');
  return b;
}
export const API_BASE = normalizeApiBase(import.meta.env.VITE_API_URL);

/** Resolve a possibly-relative asset path (e.g. /uploads/foo.jpg) to a full URL. */
export function assetUrl(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const base = API_BASE.replace(/\/api\/?$/i, '');
  return base + (url.startsWith('/') ? '' : '/') + url;
}

export const isApiEnabled = () => true;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
    ...options
  });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${await res.text().catch(() => res.statusText)}`);
  }
  return res.json();
}

function isAbortError(e: unknown): boolean {
  return e instanceof DOMException && e.name === 'AbortError' || (e as any)?.name === 'AbortError';
}

// ---------- Enums mapping ----------

const CONDITION_MAP: Record<number, Vehicle['condition']> = {
  1: 'New', 2: 'Certified Pre-Owned', 3: 'Pre-Owned'
};
const FUEL_MAP: Record<number, Vehicle['fuelType']> = {
  1: 'Petrol', 2: 'Diesel', 3: 'Hybrid', 4: 'Plug-in Hybrid', 5: 'Electric'
};
const TRANS_MAP: Record<number, Vehicle['transmission']> = {
  1: 'Automatic', 2: 'Dual-Clutch', 3: 'Manual'
};
const DRIVE_MAP: Record<number, Vehicle['drivetrain']> = {
  1: 'AWD', 2: 'RWD', 3: 'FWD', 4: '4WD'
};
const BODY_MAP: Record<number, Vehicle['bodyType']> = {
  1: 'Sedan', 2: 'Coupe', 3: 'SUV', 4: 'Convertible', 5: 'Supercar', 6: 'Wagon'
};

interface ApiVehicleImage { url: string; caption: string; category: number; sortOrder: number }
interface ApiVehicle {
  id: number; slug: string; brand: string; model: string; trim: string; year: number;
  price: number; originalPrice?: number | null; currency: string; monthlyEstimate: number;
  mileageKm: number; condition: number; fuelType: number; transmission: number; drivetrain: number; bodyType: number;
  engine: string; horsepower: number; torque: string; acceleration0To100: number; topSpeedKmh: number;
  fuelEconomy: string; exteriorColor: string; exteriorColorHex: string; interiorColor: string;
  interiorColorHex: string; doors: number; seats: number; vin: string; stockNumber: string;
  isFeatured: boolean; isAvailable: boolean; isSpecialOffer: boolean;
  taglineAr: string; descriptionAr: string; keyHighlightsAr: string[]; featuresAr: string[];
  inspectionScore: number; previousOwners: number; warranty: string; images: ApiVehicleImage[];
}

function mapVehicle(v: ApiVehicle): Vehicle {
  return {
    id: v.slug,
    slug: v.slug,
    brand: v.brand,
    model: v.model,
    trim: v.trim,
    year: v.year,
    price: v.price,
    originalPrice: v.originalPrice ?? undefined,
    currency: v.currency,
    monthlyEstimate: v.monthlyEstimate,
    mileage: v.mileageKm,
    condition: CONDITION_MAP[v.condition] ?? 'Pre-Owned',
    fuelType: FUEL_MAP[v.fuelType] ?? 'Petrol',
    transmission: TRANS_MAP[v.transmission] ?? 'Automatic',
    drivetrain: DRIVE_MAP[v.drivetrain] ?? 'RWD',
    // bodyType live mapping from API (1=Sedan,2=Coupe,3=SUV,4=Convertible,5=Supercar,6=Wagon) — fallback to discover from trim if missing
    bodyType: (BODY_MAP[v.bodyType] ?? (v as any).bodyType ?? 'Sedan') as Vehicle['bodyType'],
    engine: v.engine,
    horsepower: v.horsepower,
    torque: v.torque,
    acceleration0to100: v.acceleration0To100,
    topSpeed: v.topSpeedKmh,
    fuelEconomy: v.fuelEconomy,
    exteriorColor: v.exteriorColor,
    exteriorColorHex: v.exteriorColorHex,
    interiorColor: v.interiorColor,
    interiorColorHex: v.interiorColorHex,
    doors: v.doors,
    seats: v.seats,
    vin: v.vin,
    stockNumber: v.stockNumber,
    isFeatured: v.isFeatured,
    isAvailable: v.isAvailable,
    isSpecialOffer: v.isSpecialOffer,
    tagline: v.taglineAr,
    description: v.descriptionAr,
    keyHighlights: v.keyHighlightsAr ?? [],
    features: v.featuresAr ?? [],
    images: (v.images ?? []).map(i => ({ url: i.url, caption: i.caption })),
    inspectionScore: v.inspectionScore,
    previousOwners: v.previousOwners,
    warranty: v.warranty,
    createdAt: new Date().toISOString()
  };
}

// ---------- Public reads ----------

export async function fetchVehicles(signal?: AbortSignal): Promise<Vehicle[] | null> {
  try {
    const data = await request<{ items: ApiVehicle[] }>('/api/vehicles?pageSize=100', { signal });
    return data.items.map(mapVehicle);
  } catch (e) {
    if (isAbortError(e)) return null;
    return null;
  }
}

export interface ContentBlocks {
  [key: string]: { valueAr: string; imageUrl?: string | null };
}

export async function fetchContent(signal?: AbortSignal): Promise<ContentBlocks | null> {
  try {
    return await request<ContentBlocks>('/api/content', { signal });
  } catch (e) {
    if (isAbortError(e)) return null;
    return null;
  }
}

export interface BrandDto {
  id: number;
  name: string;
  nameAr: string;
  logoUrl: string;
  tagline: string;
  country: string;
  vehicleCount: number;
  featuredModel: string;
  backgroundImageUrl: string;
  sortOrder: number;
}

export async function fetchBrands(signal?: AbortSignal): Promise<BrandDto[] | null> {
  try {
    return await request<BrandDto[]>('/api/brands', { signal });
  } catch (e) {
    if (isAbortError(e)) return null;
    return null;
  }
}

export interface ReviewDto {
  id: number;
  name: string;
  role: string;
  location: string;
  avatarUrl: string;
  vehiclePurchased: string;
  rating: number;
  dateLabel: string;
  reviewText: string;
  verified: boolean;
  sortOrder: number;
}

export async function fetchReviews(signal?: AbortSignal): Promise<ReviewDto[] | null> {
  try {
    return await request<ReviewDto[]>('/api/reviews', { signal });
  } catch (e) {
    if (isAbortError(e)) return null;
    return null;
  }
}

export interface ServiceDto {
  id: number;
  slug: string;
  title: string;
  description: string;
  badge: string;
}

export async function fetchServices(signal?: AbortSignal): Promise<ServiceDto[] | null> {
  try {
    return await request<ServiceDto[]>('/api/services', { signal });
  } catch (e) {
    if (isAbortError(e)) return null;
    return null;
  }
}

export interface DealershipInfoDto {
  name: string;
  nameAr: string;
  legalName: string;
  tagline: string;
  taglineAr: string;
  phone: string;
  phoneDirect: string;
  whatsappNumber: string;
  email: string;
  salesEmail: string;
  street: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  mapUrl: string;
  openingHours: { days: string; hours: string }[];
  stats: { id: number; label: string; value: string; description: string }[];
}

export async function fetchDealershipInfo(signal?: AbortSignal): Promise<DealershipInfoDto | null> {
  try {
    return await request<DealershipInfoDto>('/api/dealership-info', { signal });
  } catch (e) {
    if (isAbortError(e)) return null;
    return null;
  }
}

// ---------- Form submissions (new: purchase + inspection) ----------

export interface PurchasePayload {
  vehicleId?: number | null; requestType: number; rentalDuration?: string | null; name: string; phone: string; email?: string | null; notes?: string;
}

export function submitPurchase(payload: PurchasePayload) {
  return request('/api/purchase-requests', { method: 'POST', body: JSON.stringify(payload) });
}

export interface InspectionPayload {
  vehicleId?: number | null; name: string; phone: string; email?: string | null; preferredDate: string; preferredTime: string; notes?: string;
}

export function submitInspection(payload: InspectionPayload) {
  return request('/api/inspection-requests', { method: 'POST', body: JSON.stringify(payload) });
}

// Legacy (kept for compatibility)

export interface ContactPayload {
  name: string; phone: string; email: string; subject: number; message: string;
}

export function submitContact(payload: ContactPayload) {
  return request('/api/contact-messages', { method: 'POST', body: JSON.stringify(payload) });
}

export interface TestDrivePayload {
  vehicleId?: number | null; name: string; phone: string; email: string;
  preferredDate: string; preferredTime: string; driveType: number; notes?: string;
}

export function submitTestDrive(payload: TestDrivePayload) {
  return request('/api/test-drive-requests', { method: 'POST', body: JSON.stringify(payload) });
}

export interface TradeInPayload {
  currentBrand: string; currentModel: string; currentYear: number; currentMileageKm: number;
  condition: number; vinOrPlate?: string; name: string; phone: string; email: string;
  targetVehicleId?: number | null; estimatedValueMin: number; estimatedValueMax: number; notes?: string;
}

export function submitTradeIn(payload: TradeInPayload) {
  return request('/api/trade-in-requests', { method: 'POST', body: JSON.stringify(payload) });
}

// ---------- Real-time content sync (Server-Sent Events) ----------

/**
 * Subscribe to backend "content changed" signals. The backend broadcasts a
 * message on every admin save; we invoke `onChange` so the public site can
 * re-fetch and stay in sync instantly. Auto-reconnects on failure.
 * Returns an unsubscribe function.
 */
export function subscribeToChanges(onChange: () => void): () => void {
  let es: EventSource | null = null;
  let closed = false;

  const connect = () => {
    if (closed) return;
    try {
      es = new EventSource(`${API_BASE}/api/events`);
    } catch {
      scheduleReconnect();
      return;
    }
    es.onmessage = () => {
      if (!closed) onChange();
    };
    es.onerror = () => {
      es?.close();
      scheduleReconnect();
    };
  };

  const scheduleReconnect = () => {
    if (closed) return;
    setTimeout(connect, 3000);
  };

  connect();

  return () => {
    closed = true;
    es?.close();
  };
}
