function normalizeApiBase(raw?: string): string {
  if (!raw) return 'http://localhost:5000';
  let b = raw.trim().replace(/\/+$/, '');
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

const TOKEN_KEY = 'apex_admin_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function authRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers || {})
    },
    ...options
  });
  if (res.status === 401) {
    setToken(null);
    throw new Error('انتهت الجلسة، يرجى تسجيل الدخول مرة أخرى');
  }
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${await res.text().catch(() => res.statusText)}`);
  }
  return res.status === 204 ? (undefined as T) : res.json();
}

export async function login(username: string, password: string): Promise<{ token: string; displayName: string }> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error('بيانات الدخول غير صحيحة');
  return res.json();
}

// ---------- Content (inline editor) ----------

export async function fetchContent(): Promise<Record<string, { valueAr: string; imageUrl?: string | null }>> {
  return authRequest('/api/content');
}

export async function saveContentBlocks(
  blocks: { key: string; valueAr?: string; imageUrl?: string }[]
): Promise<void> {
  await authRequest('/api/admin/content', {
    method: 'PUT',
    body: JSON.stringify({ blocks })
  });
}

/** Save a single content block with an explicit type (1=Text, 2=Image, 3=Json). */
export async function saveContentBlock(
  block: { key: string; valueAr?: string; imageUrl?: string; type?: number }
): Promise<void> {
  await authRequest('/api/admin/content', {
    method: 'PUT',
    body: JSON.stringify({ blocks: [block] })
  });
}

export async function uploadImage(file: File): Promise<string> {
  const token = getToken();
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_BASE}/api/admin/uploads`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form
  });
  if (!res.ok) throw new Error('فشل رفع الصورة');
  const data = await res.json();
  return data.url;
}

// ---------- Inbox (new: purchase + inspection) ----------

export interface PurchaseDto {
  id: number; vehicleId?: number | null; vehicleName: string; requestType: number; rentalDuration?: string | null;
  name: string; phone: string; email?: string | null; notes?: string | null; status: number; adminNotes?: string | null; createdAt: string;
}
export interface InspectionDto {
  id: number; vehicleId?: number | null; vehicleName: string; name: string; phone: string; email?: string | null;
  preferredDate: string; preferredTime: string; notes?: string | null; status: number; adminNotes?: string | null; createdAt: string;
}
export interface NewInboxData {
  purchases: PurchaseDto[];
  inspections: InspectionDto[];
}

export function fetchNewInbox(): Promise<NewInboxData> {
  return authRequest('/api/admin/inbox/new');
}

export function updateNewStatus(kind: 'purchase' | 'inspection', id: number, status: number, adminNotes?: string) {
  return authRequest(`/api/admin/inbox/${kind}/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, adminNotes })
  });
}

export function deleteNewInboxItem(kind: 'purchase' | 'inspection', id: number) {
  return authRequest(`/api/admin/inbox/${kind}/${id}`, { method: 'DELETE' });
}

// Legacy inbox (kept for compatibility)

export interface ContactMessageDto {
  id: number; name: string; phone: string; email: string;
  subject: number; message: string; status: number; adminNotes?: string | null;
  createdAt: string;
}
export interface TestDriveDto {
  id: number; vehicleId?: number | null; vehicleName: string; name: string; phone: string;
  email: string; preferredDate: string; preferredTime: string; driveType: number;
  notes?: string | null; status: number; adminNotes?: string | null; createdAt: string;
}
export interface TradeInDto {
  id: number; currentBrand: string; currentModel: string; currentYear: number;
  currentMileageKm: number; condition: number; vinOrPlate?: string | null; name: string;
  phone: string; email: string; estimatedValueMin: number; estimatedValueMax: number;
  notes?: string | null; status: number; adminNotes?: string | null; createdAt: string;
}
export interface InboxData {
  contacts: ContactMessageDto[];
  testDrives: TestDriveDto[];
  tradeIns: TradeInDto[];
}

export function fetchInbox(): Promise<InboxData> {
  return authRequest('/api/admin/inbox');
}

export function updateStatus(kind: 'contact' | 'testdrive' | 'tradein', id: number, status: number, adminNotes?: string) {
  const path = kind === 'contact' ? 'contact' : kind === 'testdrive' ? 'testdrive' : 'tradein';
  return authRequest(`/api/admin/inbox/${path}/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, adminNotes })
  });
}

export function deleteInboxItem(kind: 'contact' | 'testdrive' | 'tradein', id: number) {
  return authRequest(`/api/admin/inbox/${kind}/${id}`, { method: 'DELETE' });
}

// ---------- Vehicles ----------

export interface VehicleImageRow {
  id: number; url: string; caption: string; sortOrder: number;
}

export interface VehicleRowDto {
  id: number; slug: string; brand: string; model: string; trim: string; year: number;
  price: number; originalPrice?: number | null; currency: string; monthlyEstimate: number;
  mileageKm: number; condition: number; fuelType: number; transmission: number; drivetrain: number; bodyType: number;
  engine: string; horsepower: number; torque: string; acceleration0To100: number; topSpeedKmh: number;
  fuelEconomy: string; exteriorColor: string; exteriorColorHex: string; interiorColor: string; interiorColorHex: string;
  doors: number; seats: number; vin: string; stockNumber: string;
  isFeatured: boolean; isAvailable: boolean; isSpecialOffer: boolean;
  taglineAr: string; descriptionAr: string; keyHighlightsAr: string[]; featuresAr: string[];
  inspectionScore: number; previousOwners: number; warranty: string;
  images: VehicleImageRow[];
}

export interface VehicleImageInput { url: string; caption?: string; category?: number | null; sortOrder?: number; }

export interface VehicleInput {
  brand: string; model: string; trim: string; year: number;
  price: number; originalPrice?: number | null; currency: string; monthlyEstimate: number;
  mileageKm: number; condition: number; fuelType: number; transmission: number; drivetrain: number; bodyType: number;
  engine: string; horsepower: number; torque: string; acceleration0To100: number; topSpeedKmh: number;
  fuelEconomy: string; exteriorColor: string; exteriorColorHex: string; interiorColor: string; interiorColorHex: string;
  doors: number; seats: number; vin: string; stockNumber: string;
  isFeatured: boolean; isAvailable: boolean; isSpecialOffer: boolean;
  taglineAr: string; descriptionAr: string; keyHighlightsAr: string[]; featuresAr: string[];
  inspectionScore: number; previousOwners: number; warranty: string;
  images?: VehicleImageInput[];
}

export async function fetchVehiclesAdmin(): Promise<VehicleRowDto[]> {
  const data = await authRequest<{ items: VehicleRowDto[] }>('/api/vehicles?pageSize=100');
  return data.items;
}

export function createVehicle(input: VehicleInput): Promise<VehicleRowDto> {
  return authRequest('/api/vehicles', { method: 'POST', body: JSON.stringify(input) });
}

export function updateVehicleFull(id: number, input: VehicleInput): Promise<VehicleRowDto> {
  return authRequest(`/api/vehicles/${id}`, { method: 'PUT', body: JSON.stringify(input) });
}

export function deleteVehicle(id: number) {
  return authRequest(`/api/vehicles/${id}`, { method: 'DELETE' });
}

// ---------- Brands ----------

export interface BrandDto {
  id: number; name: string; nameAr: string; logoUrl: string; tagline: string; country: string;
  vehicleCount: number; featuredModel: string; backgroundImageUrl: string; sortOrder: number;
}

export function fetchBrands(): Promise<BrandDto[]> {
  return authRequest('/api/brands');
}

export function createBrand(brand: Omit<BrandDto, 'id'>): Promise<BrandDto> {
  return authRequest('/api/brands', { method: 'POST', body: JSON.stringify(brand) });
}

export function updateBrand(brand: BrandDto) {
  return authRequest(`/api/brands/${brand.id}`, { method: 'PUT', body: JSON.stringify(brand) });
}

export function deleteBrand(id: number) {
  return authRequest(`/api/brands/${id}`, { method: 'DELETE' });
}

// ---------- Reviews ----------

export interface ReviewDto {
  id: number; name: string; role: string; location: string; avatarUrl: string;
  vehiclePurchased: string; rating: number; dateLabel: string; reviewText: string;
  verified: boolean; sortOrder: number;
}

export function fetchReviews(): Promise<ReviewDto[]> {
  return authRequest('/api/reviews');
}

export function createReview(r: Omit<ReviewDto, 'id'>): Promise<ReviewDto> {
  return authRequest('/api/admin/reviews', { method: 'POST', body: JSON.stringify(r) });
}

export function updateReview(r: ReviewDto) {
  return authRequest(`/api/admin/reviews/${r.id}`, { method: 'PUT', body: JSON.stringify(r) });
}

export function deleteReview(id: number) {
  return authRequest(`/api/admin/reviews/${id}`, { method: 'DELETE' });
}

// ---------- Services ----------

export interface ServiceDto {
  id?: number; slug: string; title: string; description: string; badge: string;
}

export function fetchServices(): Promise<ServiceDto[]> {
  return authRequest('/api/services');
}

export function updateServices(items: ServiceDto[]) {
  return authRequest('/api/admin/services', { method: 'PUT', body: JSON.stringify(items) });
}

// ---------- Dealership info ----------

export interface DealershipInfo {
  name: string; nameAr: string; legalName: string; tagline: string; taglineAr: string;
  phone: string; phoneDirect: string; whatsappNumber: string; email: string; salesEmail: string;
  street: string; city: string; country: string; lat: number; lng: number; mapUrl: string;
  openingHours: { days: string; hours: string }[];
  stats: { id: number; label: string; value: string; description: string }[];
}

export function fetchDealership(): Promise<DealershipInfo> {
  return authRequest('/api/dealership-info');
}

export function updateDealership(d: Omit<DealershipInfo, 'openingHours' | 'stats'>) {
  return authRequest('/api/admin/dealership', { method: 'PUT', body: JSON.stringify(d) });
}

// ---------- Stats ----------

export interface StatItem { id?: number; label: string; value: string; description: string; }

export function fetchStats(): Promise<StatItem[]> {
  return authRequest('/api/admin/stats');
}

export function updateStats(items: StatItem[]) {
  return authRequest('/api/admin/stats', { method: 'PUT', body: JSON.stringify({ items }) });
}

// ---------- Opening hours ----------

export interface OpeningHour { days: string; hours: string; }

export function fetchOpeningHours(): Promise<OpeningHour[]> {
  return authRequest('/api/admin/opening-hours');
}

export function updateOpeningHours(items: OpeningHour[]) {
  return authRequest('/api/admin/opening-hours', { method: 'PUT', body: JSON.stringify({ items }) });
}

// ---------- Web Push ----------

export function getVapidPublicKey(): Promise<{ publicKey: string }> {
  return authRequest('/api/admin/push/vapid-public-key');
}

export function savePushSubscription(sub: { endpoint: string; p256dh: string; auth: string; expirationTime?: number | null }) {
  return authRequest('/api/admin/push/subscribe', {
    method: 'POST',
    body: JSON.stringify(sub)
  });
}

export function removePushSubscription(endpoint: string) {
  return authRequest('/api/admin/push/unsubscribe', {
    method: 'POST',
    body: JSON.stringify({ endpoint, p256dh: 'x', auth: 'x' })
  });
}

export function testPush(): Promise<{ ok: boolean }> {
  return authRequest('/api/admin/push/test', { method: 'POST', body: JSON.stringify({}) });
}

// Counts for badge (new inbox + legacy)
export function fetchNewUnreadCounts(): Promise<{ purchases: number; inspections: number }> {
  return authRequest('/api/admin/inbox/new/unread-counts');
}
export function fetchLegacyUnreadCounts(): Promise<{ contacts: number; testDrives: number; tradeIns: number }> {
  return authRequest('/api/admin/inbox/unread-counts');
}
