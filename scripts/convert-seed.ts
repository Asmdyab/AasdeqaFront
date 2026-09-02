import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { VEHICLES_DATA } from '../src/data/vehicles';
import {
  DEALERSHIP_INFO,
  DEALERSHIP_BRANDS,
  CUSTOMER_REVIEWS,
  DEALERSHIP_SERVICES
} from '../src/data/dealership';
import { VEHICLE_ARABIC_MAP } from '../src/i18n/vehicleTranslations';
import { ARABIC_TRANSLATIONS } from '../src/i18n/translations';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'backend', 'src', 'ApexMotors.Infrastructure', 'SeedData');
mkdirSync(outDir, { recursive: true });

const conditionMap = { 'New': 1, 'Certified Pre-Owned': 2, 'Pre-Owned': 3 };
const fuelMap = { 'Petrol': 1, 'Diesel': 2, 'Hybrid': 3, 'Plug-in Hybrid': 4, 'Electric': 5 };
const transmissionMap = { 'Automatic': 1, 'Dual-Clutch': 2, 'Manual': 3 };
const drivetrainMap = { 'AWD': 1, 'RWD': 2, 'FWD': 3, '4WD': 4 };
const bodyTypeMap = {
  'Sedan': 1, 'Coupe': 2, 'SUV': 3, 'Convertible': 4, 'Supercar': 5, 'Wagon': 6
};
const imageCategoryMap = {
  'exterior': 1, 'interior': 2, 'cockpit': 3, 'detail': 4, 'wheel': 5
};

function inferBodyType(v: any): number {
  const m = `${v.model} ${v.trim}`.toLowerCase();
  if (/urus|range rover|bentayga|cayenne|dbx|suv|g-wagon|g 63|amg gle|sq8|rs q8/.test(m)) return bodyTypeMap['SUV'];
  if (/volante|roadster|spider|spyder|speedster|convertible|cabriolet/.test(m)) return bodyTypeMap['Convertible'];
  if (/avant|touring|wagon|shooting brake/.test(m)) return bodyTypeMap['Wagon'];
  if (/s-class|maybach|7 series|m8 gran|continental flying spur|panamera|quattroporte|ghibli|a8|s8/.test(m)) return bodyTypeMap['Sedan'];
  return bodyTypeMap['Supercar'];
}

const vehicles = VEHICLES_DATA.map((v) => {
  const ar = VEHICLE_ARABIC_MAP[v.id];
  return {
    slug: v.slug,
    brand: v.brand,
    model: v.model,
    trim: v.trim,
    year: v.year,
    price: v.price,
    originalPrice: v.originalPrice ?? null,
    currency: v.currency ?? 'EGP',
    monthlyEstimate: v.monthlyEstimate ?? 0,
    mileageKm: v.mileage ?? 0,
    condition: conditionMap[v.condition] ?? 3,
    fuelType: fuelMap[v.fuelType] ?? 1,
    transmission: transmissionMap[v.transmission] ?? 1,
    drivetrain: drivetrainMap[v.drivetrain] ?? 1,
    bodyType: inferBodyType(v),
    engine: v.engine,
    horsepower: v.horsepower,
    torque: v.torque,
    acceleration0To100: v.acceleration0to100,
    topSpeedKmh: v.topSpeed,
    fuelEconomy: v.fuelEconomy,
    exteriorColor: ar?.exteriorColor ?? v.exteriorColor,
    exteriorColorHex: v.exteriorColorHex,
    interiorColor: ar?.interiorColor ?? v.interiorColor,
    interiorColorHex: v.interiorColorHex,
    doors: v.doors,
    seats: v.seats,
    vin: v.vin,
    stockNumber: v.stockNumber,
    isFeatured: v.isFeatured ?? false,
    isAvailable: v.isAvailable ?? true,
    isSpecialOffer: v.isSpecialOffer ?? false,
    taglineAr: ar?.tagline ?? v.tagline,
    descriptionAr: ar?.description ?? v.description,
    keyHighlightsAr: ar?.keyHighlights ?? v.keyHighlights,
    featuresAr: ar?.features ?? v.features,
    inspectionScore: v.inspectionScore,
    previousOwners: v.previousOwners,
    warranty: ar?.warranty ?? v.warranty,
    images: v.images.map((img, i) => ({
      url: img.url,
      caption: img.caption ?? '',
      category: imageCategoryMap[img.category ?? 'exterior'] ?? 1,
      sortOrder: i
    }))
  };
});

const brands = DEALERSHIP_BRANDS.map((b, i) => ({
  name: b.name,
  logoUrl: b.logo,
  tagline: b.tagline,
  country: b.country,
  vehicleCount: b.vehicleCount,
  featuredModel: b.featuredModel,
  backgroundImageUrl: b.bgImage,
  sortOrder: i
}));

const reviews = CUSTOMER_REVIEWS.map((r, i) => ({
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
}));

const services = DEALERSHIP_SERVICES.map((s, i) => ({
  slug: s.id,
  title: s.title,
  description: s.description,
  badge: s.badge,
  sortOrder: i
}));

// Content blocks: every UI string + dealership info, keyed for CMS
const content: Record<string, { type: number; valueAr: string }> = {};
for (const [key, val] of Object.entries(ARABIC_TRANSLATIONS)) {
  if (typeof val === 'string') {
    content[`ui.${key}`] = { type: 1, valueAr: val };
  }
}
content['dealership.name'] = { type: 1, valueAr: DEALERSHIP_INFO.name };
content['dealership.nameAr'] = { type: 1, valueAr: DEALERSHIP_INFO.nameAr };
content['dealership.legalName'] = { type: 1, valueAr: DEALERSHIP_INFO.legalName };
content['dealership.tagline'] = { type: 1, valueAr: DEALERSHIP_INFO.tagline };
content['dealership.taglineAr'] = { type: 1, valueAr: DEALERSHIP_INFO.taglineAr };
content['dealership.phone'] = { type: 1, valueAr: DEALERSHIP_INFO.phone };
content['dealership.phoneDirect'] = { type: 1, valueAr: DEALERSHIP_INFO.phoneDirect };
content['dealership.whatsappNumber'] = { type: 1, valueAr: DEALERSHIP_INFO.whatsappNumber };
content['dealership.whatsappFormatted'] = { type: 1, valueAr: DEALERSHIP_INFO.whatsappFormatted };
content['dealership.email'] = { type: 1, valueAr: DEALERSHIP_INFO.email };
content['dealership.salesEmail'] = { type: 1, valueAr: DEALERSHIP_INFO.salesEmail };
content['dealership.street'] = { type: 1, valueAr: DEALERSHIP_INFO.address.streetAr };
content['dealership.city'] = { type: 1, valueAr: DEALERSHIP_INFO.address.cityAr };

writeFileSync(join(outDir, 'vehicles.json'), JSON.stringify(vehicles, null, 2), 'utf8');
writeFileSync(join(outDir, 'brands.json'), JSON.stringify(brands, null, 2), 'utf8');
writeFileSync(join(outDir, 'reviews.json'), JSON.stringify(reviews, null, 2), 'utf8');
writeFileSync(join(outDir, 'services.json'), JSON.stringify(services, null, 2), 'utf8');
writeFileSync(
  join(outDir, 'hours.json'),
  JSON.stringify(DEALERSHIP_INFO.openingHoursAr.map((h, i) => ({ days: h.days, hours: h.hours, sortOrder: i })), null, 2),
  'utf8'
);
writeFileSync(join(outDir, 'content.json'), JSON.stringify(content, null, 2), 'utf8');

console.log(`vehicles=${vehicles.length} brands=${brands.length} reviews=${reviews.length} services=${services.length} contentKeys=${Object.keys(content).length}`);
