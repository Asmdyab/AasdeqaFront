export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Plug-in Hybrid' | 'Electric';
export type TransmissionType = 'Automatic' | 'Dual-Clutch' | 'Manual';
export type BodyType = 'Sedan' | 'Coupe' | 'SUV' | 'Convertible' | 'Supercar' | 'Wagon';
export type VehicleCondition = 'New' | 'Certified Pre-Owned' | 'Pre-Owned';
export type DrivetrainType = 'AWD' | 'RWD' | 'FWD' | '4WD';

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  trim: string;
  year: number;
  price: number;
  originalPrice?: number;
  currency: string;
  monthlyEstimate: number;
  mileage: number; // in km
  condition: VehicleCondition;
  fuelType: FuelType;
  transmission: TransmissionType;
  drivetrain: DrivetrainType;
  bodyType?: BodyType;
  engine: string;
  horsepower: number;
  torque: string;
  acceleration0to100: number; // in seconds
  topSpeed: number; // in km/h
  fuelEconomy: string; // e.g. "9.8 L / 100km" or "21.4 kWh / 100km"
  exteriorColor: string;
  exteriorColorHex: string;
  interiorColor: string;
  interiorColorHex: string;
  doors: number;
  seats: number;
  vin: string;
  stockNumber: string;
  isFeatured: boolean;
  isAvailable: boolean;
  isSpecialOffer?: boolean;
  tagline: string;
  description: string;
  keyHighlights: string[];
  features: string[];
  images: {
    url: string;
    caption: string;
    category?: 'exterior' | 'interior' | 'cockpit' | 'detail' | 'wheel';
  }[];
  videoUrl?: string;
  inspectionScore: number; // out of 100, e.g. 99
  previousOwners: number;
  warranty: string;
  createdAt: string;
}

export interface VehicleFilterState {
  searchQuery: string;
  brand: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  condition: string;
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
  maxMileage: number;
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc' | 'horsepower-desc';
}

export interface TestDriveRequest {
  vehicleId: string;
  vehicleName: string;
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  driveType: 'showroom' | 'vip-home';
  notes?: string;
}

export interface TradeInRequest {
  currentBrand: string;
  currentModel: string;
  currentYear: number;
  currentMileage: number;
  condition: 'Fair' | 'Good' | 'Very Good' | 'Excellent';
  vinOrPlate?: string;
  name: string;
  phone: string;
  email: string;
  targetVehicleId?: string;
  estimatedValueMin: number;
  estimatedValueMax: number;
  notes?: string;
}

export interface FinancingPlan {
  vehiclePrice: number;
  downPayment: number;
  loanTermMonths: number;
  interestRate: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  vehiclePurchased: string;
  rating: number;
  date: string;
  review: string;
  verified: boolean;
}

export interface DealershipBrand {
  name: string;
  logo: string;
  tagline: string;
  country: string;
  vehicleCount: number;
  featuredModel: string;
  bgImage: string;
}

export interface Brand {
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

export interface Review {
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

export interface ServiceItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  badge: string;
}

export interface StatItem {
  id: number;
  label: string;
  value: string;
  description: string;
}

export interface OpeningHour {
  days: string;
  hours: string;
}

export interface DealershipInfo {
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
  openingHours: OpeningHour[];
  stats: StatItem[];
}

export interface OptionItem {
  value: string;
  label: string;
}

export interface CollectionItem {
  id: string;
  label: string;
  bodyType: string;
  maxPrice: number;
}

export interface StepItem {
  title: string;
  desc: string;
  detail: string;
}
