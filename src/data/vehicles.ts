import { Vehicle } from '../types/vehicle';

export const VEHICLES_DATA: Vehicle[] = [
  {
    id: 'porsche-911-gt3-rs-2025',
    slug: 'porsche-911-gt3-rs-2025',
    brand: 'Porsche',
    model: '911 GT3 RS',
    trim: 'Weissach Package',
    year: 2025,
    price: 16700000,
    originalPrice: 17500000,
    currency: 'USD',
    monthlyEstimate: 4000,
    mileage: 1850,
    condition: 'Certified Pre-Owned',
    fuelType: 'Petrol',
    transmission: 'Dual-Clutch',
    drivetrain: 'RWD',
    engine: '4.0L Naturally Aspirated Boxer-6',
    horsepower: 525,
    torque: '465 Nm @ 6,300 rpm',
    acceleration0to100: 3.2,
    topSpeed: 296,
    fuelEconomy: '13.4 L / 100km',
    exteriorColor: 'Arctic Grey / Pyro Red Accents',
    exteriorColorHex: '#606970',
    interiorColor: 'Black Race-Tex with Guards Red Stitching',
    interiorColorHex: '#181818',
    doors: 2,
    seats: 2,
    vin: 'WP0AF2A97RS198243',
    stockNumber: 'AP-992-01',
    isFeatured: true,
    isAvailable: true,
    isSpecialOffer: true,
    tagline: 'The Ultimate Street-Legal Track Weapon with Weissach Weight Reduction',
    description: 'A benchmark in pure atmospheric motorsport engineering. This 2025 911 GT3 RS is fitted with the coveted Weissach Package, full carbon-fiber roll cage, lightweight magnesium forged wheels, active DRS aerodynamics, and front-axle hydraulic lift. Flawlessly maintained with single-owner documented history.',
    keyHighlights: [
      'Weissach Package with Exposed Carbon Hood & Roof',
      'PCCB Porsche Ceramic Composite Brakes',
      'Magnesium Lightweight Monobloc Wheels in Satin Pyro Red',
      'Active Drag Reduction System (DRS) Active Aero',
      'Front Axle Hydraulic Lift System with GPS Memory',
      'Full Body XPEL Ultimate Plus Paint Protection Film'
    ],
    features: [
      'Porsche Ceramic Composite Brakes (PCCB)',
      'Weissach Package Carbon Lightweight Spec',
      'Chrono Package with Lap Trigger Preparation',
      'Club Sport Roll Cage in Satin Carbon',
      'Bose Surround Sound System (12 Speakers)',
      'Full Carbon Bucket Seats with 6-point Harnesses',
      'LED Matrix Headlights with PDLS+ in Black',
      'Rear-Axle Steering with Sport Tuning',
      'Adjustable 4-way Damper Rebound / Compression Dial on Steering Wheel',
      'Titanium Lightweight Sport Exhaust System',
      'Apple CarPlay & Wireless Charging',
      'Surround View 360° Parking Camera System'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=85',
        caption: 'Front 3/4 Studio View',
        category: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
        caption: 'Rear Aerodynamic Wing & Diffuser',
        category: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=85',
        caption: 'Driver Focused Cockpit & Steering Controls',
        category: 'cockpit'
      },
      {
        url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
        caption: 'Center Console & Race-Tex Trim',
        category: 'interior'
      },
      {
        url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=85',
        caption: 'Magnesium Wheel & Carbon Ceramic Rotor',
        category: 'wheel'
      }
    ],
    inspectionScore: 99,
    previousOwners: 1,
    warranty: '24 Months Porsche Approved Factory Warranty',
    createdAt: '2026-08-10'
  },
  {
    id: 'mercedes-amg-gt-63-s-e-performance-2025',
    slug: 'mercedes-amg-gt-63-s-e-performance-2025',
    brand: 'Mercedes-Benz',
    model: 'AMG GT 63 S E Performance',
    trim: '4-Door Coupe 4MATIC+',
    year: 2025,
    price: 10900000,
    currency: 'USD',
    monthlyEstimate: 3000,
    mileage: 4200,
    condition: 'Certified Pre-Owned',
    fuelType: 'Plug-in Hybrid',
    transmission: 'Automatic',
    drivetrain: 'AWD',
    engine: '4.0L Bi-Turbo V8 + Electric Motor',
    horsepower: 843,
    torque: '1,470 Nm Combined Torque',
    acceleration0to100: 2.9,
    topSpeed: 316,
    fuelEconomy: '7.9 L / 100km',
    exteriorColor: 'Manufaktur Selenite Grey Magno (Matte)',
    exteriorColorHex: '#4A4E53',
    interiorColor: 'Nappa Leather Exclusive Titanium Grey Pearl / Black',
    interiorColorHex: '#25262B',
    doors: 4,
    seats: 5,
    vin: 'WDD2906791A044912',
    stockNumber: 'AP-MB-084',
    isFeatured: true,
    isAvailable: true,
    tagline: '843 HP of Electrified Formula 1 Hybrid Innovation in a Grand Tourer',
    description: 'The most powerful series-production model ever created by Mercedes-AMG. Fusing a hand-crafted 4.0L V8 Biturbo with an ultra-lightweight High Performance Battery developed with the Mercedes-AMG Petronas F1 team, providing relentless acceleration with executive luxury.',
    keyHighlights: [
      '843 HP & 1,470 Nm F1-Derived Hybrid Powertrain',
      'AMG Carbon Ceramic High-Performance Composite Brakes',
      'AMG RIDE CONTROL+ Air Suspension with Adaptive Damping',
      'Burmester High-End 3D 1450W Surround Sound',
      'AMG Night Package II with Dark Chrome Badging',
      'AMG Track Pace Telemetry & Drift Mode'
    ],
    features: [
      'AMG Performance 4MATIC+ Variable All-Wheel Drive',
      'AMG Rear-Axle Steering (Up to 2.5°)',
      'AMG Performance Seats with Massage & Cooling',
      'Head-Up Display with Augmented Reality Navigation',
      'Panoramic Fixed Glass Sunroof',
      'Soft-Close Luxury Doors',
      'Carbon Fiber Exterior Package I & II',
      'Energizing Package Plus with Fragrance Ionizer',
      'Apple CarPlay, Android Auto & MBUX Interior Assistant',
      'Active Distance Assist DISTRONIC with Steering Pilot'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=85',
        caption: 'Manufaktur Matte Finish Stance',
        category: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=85',
        caption: 'Panamericana Grille & Multi-Beam LED',
        category: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85',
        caption: 'AMG Dual 12.3-inch Digital Cockpit',
        category: 'cockpit'
      },
      {
        url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85',
        caption: 'Exclusive Nappa Interior & Ambient Illumination',
        category: 'interior'
      }
    ],
    inspectionScore: 98,
    previousOwners: 1,
    warranty: '36 Months Certified Star Pre-Owned Warranty',
    createdAt: '2026-08-14'
  },
  {
    id: 'bmw-m8-competition-gran-coupe-2025',
    slug: 'bmw-m8-competition-gran-coupe-2025',
    brand: 'BMW',
    model: 'M8 Competition',
    trim: 'Gran Coupe Ultimate Package',
    year: 2025,
    price: 8100000,
    currency: 'USD',
    monthlyEstimate: 2000,
    mileage: 6300,
    condition: 'Certified Pre-Owned',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    drivetrain: 'AWD',
    engine: '4.4L BMW M TwinPower Turbo V8',
    horsepower: 625,
    torque: '750 Nm @ 1,800 - 5,800 rpm',
    acceleration0to100: 3.2,
    topSpeed: 305,
    fuelEconomy: '11.2 L / 100km',
    exteriorColor: 'Isle of Man Green Metallic',
    exteriorColorHex: '#1B4D3E',
    interiorColor: 'Full Merino Leather in Silverstone / Black',
    interiorColorHex: '#D1D5DB',
    doors: 4,
    seats: 5,
    vin: 'WBSGV0C070CG29184',
    stockNumber: 'AP-BMW-88',
    isFeatured: true,
    isAvailable: true,
    tagline: 'Peerless Grand Touring Authority with Pure Motorsport Pedigree',
    description: 'Combining supreme executive space with relentless M Power. The BMW M8 Competition Gran Coupe is loaded with M Carbon Ceramic Brakes, Bowers & Wilkins Diamond surround sound, M Driver package, and individual laser headlights. Impeccable condition with full BMW service records.',
    keyHighlights: [
      'M xDrive with Switchable 2WD RWD Drift Mode',
      'M Carbon Ceramic Brake Package with Gold Calipers',
      'Bowers & Wilkins Diamond 16-Speaker Audio System',
      'Full Carbon Exterior Package & Carbon Roof',
      'BMW Laserlight with Adaptive High-Beam Assistant',
      'M Sport Exhaust with Quad 100mm Black Chrome Tips'
    ],
    features: [
      'M xDrive with 4WD, 4WD Sport and 2WD Modes',
      'Active M Differential on Rear Axle',
      'Adaptive M Suspension Professional with Active Roll Stabilization',
      'Ventilated and Heated M Multi-Function Front Seats',
      'Heated Steering Wheel and Heated Armrests',
      'Driving Assistant Professional with Traffic Jam Assist',
      'Parking Assistant Plus with 3D Remote View',
      'Wireless Apple CarPlay, Android Auto & HUD',
      'Soft-Close Doors and Power Rear Sunshades'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=85',
        caption: 'Sculpted Silhouette in Isle of Man Green',
        category: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1600&q=85',
        caption: 'M Double-Bar Kidney Grille & Laserlight',
        category: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1600&q=85',
        caption: 'M Steering with Red M1/M2 Toggle Buttons',
        category: 'cockpit'
      },
      {
        url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
        caption: 'Merino Silverstone Diamond Stitched Leather',
        category: 'interior'
      }
    ],
    inspectionScore: 99,
    previousOwners: 1,
    warranty: '24 Months BMW Premium Selection Warranty',
    createdAt: '2026-08-01'
  },
  {
    id: 'ferrari-296-gtb-assetto-fiorano-2025',
    slug: 'ferrari-296-gtb-assetto-fiorano-2025',
    brand: 'Ferrari',
    model: '296 GTB',
    trim: 'Assetto Fiorano Package',
    year: 2025,
    price: 19900000,
    currency: 'USD',
    monthlyEstimate: 5000,
    mileage: 980,
    condition: 'New',
    fuelType: 'Plug-in Hybrid',
    transmission: 'Dual-Clutch',
    drivetrain: 'RWD',
    engine: '3.0L Twin-Turbo 120° V6 Hybrid',
    horsepower: 830,
    torque: '740 Nm @ 6,250 rpm',
    acceleration0to100: 2.9,
    topSpeed: 330,
    fuelEconomy: '6.4 L / 100km',
    exteriorColor: 'Rosso Corsa with Giallo Modena Livery',
    exteriorColorHex: '#D40000',
    interiorColor: 'Nero Alcantara with Rosso Details',
    interiorColorHex: '#151515',
    doors: 2,
    seats: 2,
    vin: 'ZFF98NFA9P0293814',
    stockNumber: 'AP-FER-296',
    isFeatured: true,
    isAvailable: true,
    isSpecialOffer: true,
    tagline: 'The Definitive Fun to Drive Berlinetta with 830 HP Formula 1 Hybrid V6',
    description: 'An epoch-making Ferrari supercar featuring the high-downforce Assetto Fiorano pack, Multimatic shock absorbers, carbon fiber front splitters, and Lexan lightweight rear screen. Delivers astonishing throttle response, intoxicating 8,500 rpm engine note, and electric zero-emission cruising mode.',
    keyHighlights: [
      'Assetto Fiorano Motorsport Track-Optimized Package',
      'Carbon Fiber Racing Wheels with Titanium Studs',
      'Multimatic GT Racing Derived Fixed Damping Suspension',
      'Passenger Display with Live G-Force & Rev Counter',
      'Carbon Fiber Racing Seats with Lifter',
      '7-Year Genuine Ferrari Factory Maintenance Program'
    ],
    features: [
      'Brembo Carbon Ceramic Matrix Brake Discs',
      'Full Digital HMI Touch Cockpit System',
      'Titanium Sport Exhaust Pipes',
      'Michelin Pilot Sport Cup 2 R High-Grip Tyres',
      'Surround Camera & Front/Rear Parking Radar',
      'JBL Premium Hi-Fi Sound System',
      'Apple CarPlay Integration',
      'Suspension Lifter for Ramp & Driveway Clearance'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1600&q=85',
        caption: 'Rosso Corsa Supercar Stance',
        category: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1600&q=85',
        caption: 'Aggressive Aerodynamic Front Apron',
        category: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=85',
        caption: 'Sculpted Rear Quarter & Center Exhaust',
        category: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=85',
        caption: 'Manettino Dial & Carbon LED Steering Wheel',
        category: 'cockpit'
      }
    ],
    inspectionScore: 100,
    previousOwners: 0,
    warranty: '48 Months Ferrari New Vehicle Warranty + 7-Year Maintenance',
    createdAt: '2026-08-18'
  },
  {
    id: 'audi-rs6-avant-performance-2025',
    slug: 'audi-rs6-avant-performance-2025',
    brand: 'Audi',
    model: 'RS6 Avant',
    trim: 'Performance Dynamic Package Plus',
    year: 2025,
    price: 7400000,
    currency: 'USD',
    monthlyEstimate: 2000,
    mileage: 3100,
    condition: 'Certified Pre-Owned',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    drivetrain: 'AWD',
    engine: '4.0L Bi-Turbo TFSI V8 Mild-Hybrid',
    horsepower: 630,
    torque: '850 Nm @ 2,300 - 4,500 rpm',
    acceleration0to100: 3.4,
    topSpeed: 305,
    fuelEconomy: '12.1 L / 100km',
    exteriorColor: 'Nardo Grey',
    exteriorColorHex: '#7C838A',
    interiorColor: 'Valcona Leather with RS Blue Honeycomb Stitching',
    interiorColorHex: '#1F2937',
    doors: 5,
    seats: 5,
    vin: 'WAUZZZF27RA089123',
    stockNumber: 'AP-AUDI-06',
    isFeatured: true,
    isAvailable: true,
    tagline: 'The Undisputed Icon of High-Performance Luxury Wagons',
    description: 'The definitive everyday supercar estate. Equipped with the Dynamic Package Plus, huge 440mm Ceramic brakes, RS Dynamic Ride Control suspension, lightweight 22-inch forged matte titanium rims, and Audi Laserlight. Outstanding practicality with breathtaking pace.',
    keyHighlights: [
      'RS Dynamic Package Plus with 305 km/h Top Speed Upgrade',
      'Audi RS Ceramic Brake System with Blue Calipers',
      'Bang & Olufsen 3D Advanced 1820W Audio (19 Speakers)',
      'Quattro Sport Differential with Torque Vectoring',
      'All-Wheel Dynamic Steering for Agility & Stability',
      'Carbon Optic Package with Matte Carbon Roof Rails'
    ],
    features: [
      'RS Sports Exhaust System in Gloss Black',
      'Panoramic Glass Sunroof with Power Blind',
      'Audi Virtual Cockpit Plus with RS Shift Lights',
      'Head-Up Display & Night Vision Assistant',
      'Valcona Perforated Leather with Seat Ventilation',
      'Audi HD Matrix LED with Audi Laser Light',
      'Power Tailgate with Hands-Free Kick Sensor',
      '360-Degree 3D Virtual Cameras with Kerb Warning'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1600&q=85',
        caption: 'Widebody Aggressive Stance in Nardo Grey',
        category: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&w=1600&q=85',
        caption: 'Singleframe Honeycomb Black Grille',
        category: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85',
        caption: 'Dual MMI Touchscreens & RS Cockpit',
        category: 'cockpit'
      },
      {
        url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
        caption: 'Valcona RS Honeycomb Sport Seats',
        category: 'interior'
      }
    ],
    inspectionScore: 99,
    previousOwners: 1,
    warranty: '36 Months Audi Approved :plus Extended Warranty',
    createdAt: '2026-08-05'
  },
  {
    id: 'aston-martin-db12-volante-2025',
    slug: 'aston-martin-db12-volante-2025',
    brand: 'Aston Martin',
    model: 'DB12 Volante',
    trim: 'Super Tourer Launch Edition',
    year: 2025,
    price: 13200000,
    currency: 'USD',
    monthlyEstimate: 3000,
    mileage: 1200,
    condition: 'Certified Pre-Owned',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    drivetrain: 'RWD',
    engine: '4.0L Hand-Built Twin-Turbo V8',
    horsepower: 680,
    torque: '800 Nm @ 2,750 - 6,000 rpm',
    acceleration0to100: 3.6,
    topSpeed: 325,
    fuelEconomy: '12.2 L / 100km',
    exteriorColor: 'Satin Aston Martin Racing Green',
    exteriorColorHex: '#1D3B2C',
    interiorColor: 'Semi-Aniline Leather in Tan / Forest Green',
    interiorColorHex: '#8C5835',
    doors: 2,
    seats: 4,
    vin: 'SCFRMAAW5RGM10928',
    stockNumber: 'AP-AM-DB12',
    isFeatured: true,
    isAvailable: true,
    tagline: 'The World’s First Super Tourer in Breathtaking Open-Air Volante Form',
    description: 'A triumphant leap in British high luxury and ferocious sports car capability. The DB12 Volante features an 8-layer ultra-insulated acoustic fabric roof, next-gen 10.25-inch infotainment, electronic rear differential (E-Diff), and 680 horsepower delivered through a lightning-fast 8-speed transmission.',
    keyHighlights: [
      'Bowers & Wilkins 390W 15-Speaker Custom Audio System',
      'Electronic Rear Differential (E-Diff) with ESC Integration',
      'K-Fold Fast-Action 8-Layer Acoustic Fabric Roof (14s Operation)',
      '21-Inch Forged Multi-Spoke Wheels in Satin Bronze',
      'Carbon Ceramic Brakes (CCB) with Green Painted Calipers',
      'Bespoke Q by Aston Martin Tailored Interior Finishes'
    ],
    features: [
      'Next-Gen Bespoke Aston Martin In-House Infotainment',
      'Wireless Apple CarPlay with 3D Navigation',
      'Heated and Ventilated 16-Way Electric Memory Seats',
      'Surround View 360-Degree High-Resolution Cameras',
      'Carbon Fiber Interior Trim Inlays',
      'Sport Plus Exhaust System with Quad Tailpipes',
      'Matrix LED Headlamps with Signature DRL'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1600&q=85',
        caption: 'British Racing Stature & Low Slung Silhouette',
        category: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=85',
        caption: 'Precision Knurled Controls & Aston Infotainment',
        category: 'cockpit'
      },
      {
        url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85',
        caption: 'Tan Semi-Aniline Leather Tailored Cabin',
        category: 'interior'
      }
    ],
    inspectionScore: 100,
    previousOwners: 1,
    warranty: '36 Months Aston Martin Timeless Warranty',
    createdAt: '2026-08-12'
  },
  {
    id: 'lamborghini-urus-performante-2025',
    slug: 'lamborghini-urus-performante-2025',
    brand: 'Lamborghini',
    model: 'Urus Performante',
    trim: 'Full Carbon Fiber Package',
    year: 2025,
    price: 15400000,
    currency: 'USD',
    monthlyEstimate: 4000,
    mileage: 5100,
    condition: 'Certified Pre-Owned',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    drivetrain: 'AWD',
    engine: '4.0L Twin-Turbo V8',
    horsepower: 666,
    torque: '850 Nm @ 2,300 - 4,500 rpm',
    acceleration0to100: 3.3,
    topSpeed: 306,
    fuelEconomy: '14.1 L / 100km',
    exteriorColor: 'Giallo Auge (Yellow) with Matte Carbon Bonnet',
    exteriorColorHex: '#E5A910',
    interiorColor: 'Nero Cosmus Alcantara with Giallo Performante Trim',
    interiorColorHex: '#1E1E1E',
    doors: 5,
    seats: 5,
    vin: 'ZPBUA1ZL8PLA09841',
    stockNumber: 'AP-LAMBO-URUS',
    isFeatured: false,
    isAvailable: true,
    tagline: 'The Pikes Peak Record-Holding Super SUV in Extreme Performante Specification',
    description: 'Lower, wider, and lighter. The Urus Performante raises the bar with standard carbon fiber bonnet, steel spring lowered suspension with specific damper calibration, titanium Akrapovič exhaust system, and the exhilarating RALLY drive mode for unpaved tracks.',
    keyHighlights: [
      'Full Titanium Akrapovič Racing Exhaust with Carbon Tips',
      'Visible Carbon Fiber Vented Bonnet & Carbon Rear Spoiler',
      'Pikes Peak Record Setting Track Chassis Configuration',
      'New RALLY Driving Mode with Oversteer Character',
      '23-Inch Pelope Forged Alloy Wheels with Titanium Bolts',
      'Bang & Olufsen 3D Advanced 21-Speaker Sound'
    ],
    features: [
      'Carbon Ceramic Brakes (CCB) with Yellow Calipers',
      'Rear-Wheel Steering with Instant Dynamic Response',
      'Performante Bicolor Alcantara Trim with Q-Citura Stitching',
      'Advanced 3D Highway Driving Assistant Pack',
      'Night Vision Thermal Camera Assistant',
      'Panoramic Electric Tilt & Slide Sunroof',
      'Hands-Free Power Liftgate'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=85',
        caption: 'Aggressive Urus Performante Front Fascia',
        category: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85',
        caption: 'Lamborghini Tamburo Drive Mode Selector',
        category: 'cockpit'
      },
      {
        url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
        caption: 'Nero Cosmus Alcantara Sport Bucket Seats',
        category: 'interior'
      }
    ],
    inspectionScore: 98,
    previousOwners: 1,
    warranty: '24 Months Lamborghini Selezione Certified Warranty',
    createdAt: '2026-07-28'
  },
  {
    id: 'range-rover-sv-autobiography-p530-2025',
    slug: 'range-rover-sv-autobiography-p530-2025',
    brand: 'Land Rover',
    model: 'Range Rover SV',
    trim: 'P530 Long Wheelbase SV Serenity',
    year: 2025,
    price: 11600000,
    currency: 'USD',
    monthlyEstimate: 3000,
    mileage: 2400,
    condition: 'Certified Pre-Owned',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    drivetrain: 'AWD',
    engine: '4.4L Twin-Turbocharged V8',
    horsepower: 530,
    torque: '750 Nm @ 1,800 rpm',
    acceleration0to100: 4.6,
    topSpeed: 261,
    fuelEconomy: '11.8 L / 100km',
    exteriorColor: 'Icy British Sunrise Satin Champagne',
    exteriorColorHex: '#C5B59E',
    interiorColor: 'Perlino Semi-Aniline Leather / Liberty Blue Contrast',
    interiorColorHex: '#EAE5DB',
    doors: 5,
    seats: 4,
    vin: 'SALWR2V45RA847192',
    stockNumber: 'AP-RR-SV53',
    isFeatured: false,
    isAvailable: true,
    tagline: 'The Pinnacle of Peerless British Luxury and Serene Executive Sanctuary',
    description: 'An exquisite expression of modern luxury. This Long Wheelbase SV Serenity features the SV Signature Suite 4-seat executive cabin with electrically deployable club table, integrated champagne refrigerator with Dartington crystal flutes, and ceramic luxury gear selector and controls.',
    keyHighlights: [
      'SV Signature Suite 4-Seat Rear Executive Sanctuary',
      'Meridian Signature 1600W Sound with Active Headrest Noise Cancellation',
      'Electrically Deployable Club Table & Champagne Refrigerator',
      'White Ceramic Gear Selector and Climate Control Dials',
      'All-Wheel Steering & Electronic Air Suspension with Dynamic Response Pro',
      '23-inch Forged Style 1077 Gloss Dark Grey & Corinthian Bronze Wheels'
    ],
    features: [
      'Executive Class Comfort-Plus Heated, Cooled & Hot-Stone Massage Seats',
      'Dual 13.1-inch Rear Seat Entertainment Screens with Bluetooth Headsets',
      'Pixel LED Headlights with Digital Signature and Image Projection',
      'Power Assisted Gesture Soft-Close Doors',
      'Cabin Air Purification Pro with PM2.5 Filtration and CO2 Management',
      'ClearSight Interior Rear View Video Mirror'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
        caption: 'Refined Stance & Flush Glazing Design',
        category: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85',
        caption: 'SV Executive First Class Sanctuary',
        category: 'interior'
      },
      {
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85',
        caption: 'Pivi Pro 13.1 Floating Curved Glass Cockpit',
        category: 'cockpit'
      }
    ],
    inspectionScore: 99,
    previousOwners: 1,
    warranty: '48 Months Land Rover Approved Warranty',
    createdAt: '2026-08-08'
  },
  {
    id: 'porsche-taycan-turbo-s-cross-turismo-2025',
    slug: 'porsche-taycan-turbo-s-cross-turismo-2025',
    brand: 'Porsche',
    model: 'Taycan Turbo S',
    trim: 'Cross Turismo Off-Road Package',
    year: 2025,
    price: 9500000,
    originalPrice: 10300000,
    currency: 'USD',
    monthlyEstimate: 2000,
    mileage: 3800,
    condition: 'Certified Pre-Owned',
    fuelType: 'Electric',
    transmission: 'Automatic',
    drivetrain: 'AWD',
    engine: 'Dual Permanent-Magnet Synchronous Electric Motors',
    horsepower: 952,
    torque: '1,110 Nm Overboost Torque',
    acceleration0to100: 2.4,
    topSpeed: 290,
    fuelEconomy: '18.9 kWh / 100km (630 km WLTP Range)',
    exteriorColor: 'Frozen Blue Metallic',
    exteriorColorHex: '#7A98AB',
    interiorColor: 'Olea Club Leather in Basalt Black / Atacama Beige',
    interiorColorHex: '#212429',
    doors: 5,
    seats: 5,
    vin: 'WP0CC2Y17PSA94812',
    stockNumber: 'AP-TAYCAN-TS',
    isFeatured: false,
    isAvailable: true,
    isSpecialOffer: true,
    tagline: '952 HP Pure Electric Grand Tourer with 2.4s Launch Control & 800V Ultra-Fast Charging',
    description: 'The updated 2025 Taycan Turbo S sets new benchmarks in EV performance. Boasting up to 952 horsepower with Attack Mode, 320 kW DC ultra-fast charging (10-80% in 18 minutes), Porsche Active Ride suspension that leans into turns, and spacious Cross Turismo luggage utility.',
    keyHighlights: [
      'Porsche Active Ride Electro-Hydraulic Suspension System',
      'Push-to-Pass / Attack Mode with +190 HP Boost for 10 Seconds',
      'PCCB Ceramic Composite Brakes with High-Gloss Yellow Calipers',
      'Burmester High-End 3D Surround Sound with Electric Sport Sound',
      'Panoramic Roof with Variable Light Control (Liquid Crystal Glazing)',
      '105 kWh Performance Battery Plus with 630 km Range'
    ],
    features: [
      'Adaptive 18-Way Sports Seats Plus with Memory & Massage',
      'Passenger Display with Streaming & Video Playback',
      'Porsche InnoDrive with Adaptive Cruise Assist',
      'Rear-Axle Steering with Power Steering Plus',
      'Offroad Design Package with Increased Ground Clearance',
      'Heat Pump & Intelligent Range Manager'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=85',
        caption: 'Aerodynamic Electric Avant Stance',
        category: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85',
        caption: 'Triple Screen Futuristic Porsche Glass Cockpit',
        category: 'cockpit'
      },
      {
        url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85',
        caption: 'Olea Sustainable Leather Luxury Cabin',
        category: 'interior'
      }
    ],
    inspectionScore: 100,
    previousOwners: 1,
    warranty: '8-Year / 160,000 km Porsche High-Voltage Battery Warranty',
    createdAt: '2026-08-16'
  },
  {
    id: 'bentley-continental-gt-speed-2025',
    slug: 'bentley-continental-gt-speed-2025',
    brand: 'Bentley',
    model: 'Continental GT Speed',
    trim: 'Mulliner High Performance Edition',
    year: 2025,
    price: 16200000,
    currency: 'USD',
    monthlyEstimate: 4000,
    mileage: 1950,
    condition: 'New',
    fuelType: 'Plug-in Hybrid',
    transmission: 'Dual-Clutch',
    drivetrain: 'AWD',
    engine: '4.0L Ultra Performance Hybrid V8',
    horsepower: 782,
    torque: '1,000 Nm Combined Torque',
    acceleration0to100: 3.2,
    topSpeed: 335,
    fuelEconomy: '8.5 L / 100km',
    exteriorColor: 'Anthracite Satin with Beluga Gloss Detailing',
    exteriorColorHex: '#2E3033',
    interiorColor: 'Hotspur Red and Beluga Diamond-in-Diamond Quilting',
    interiorColorHex: '#8B0000',
    doors: 2,
    seats: 4,
    vin: 'SCBCB7ZG5RC089241',
    stockNumber: 'AP-BENT-GTS',
    isFeatured: false,
    isAvailable: true,
    tagline: 'The Most Powerful Road-Going Bentley in History: 782 HP of Pure Handcrafted Grandeur',
    description: 'Handcrafted in Crewe, England. The 2025 Continental GT Speed features Bentley’s new Ultra Performance Hybrid powertrain, the iconic 3-sided Bentley Rotating Display, 48V active anti-roll bars, electronic limited slip differential, and 400,000 individual stitches of precision Mulliner upholstery.',
    keyHighlights: [
      'Bentley Rotating Display (12.3-inch Touch, 3 Analogue Dials, Bookmatched Veneer)',
      'Naim for Bentley 2,200W 18-Speaker Audio System with Shakers in Seats',
      'Electronic All-Wheel Steering & Bentley Dynamic Ride 48V Active Anti-Roll',
      'Mulliner Diamond-in-Diamond Hand-Crafted Quilting with 400,000 Stitches',
      'Carbon Ceramic Brakes with 440mm Front Discs (World Largest)',
      'Touring Specification with Head-Up Display and Night Vision'
    ],
    features: [
      'Front Seat Comfort Specification with Heated, Ventilated and Massage Modes',
      'Dark Tint Engine-Turned Aluminum & Piano Black Dual Finish Veneers',
      'Jewel Fuel and Oil Filler Caps',
      'Wireless Phone Charging & Apple CarPlay / Android Auto',
      'LED Matrix Headlamps with Cut Crystal Effect',
      'City Specification with Top View Camera and Pedestrian Warning'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1600&q=85',
        caption: 'Imposing Continental GT Stature',
        category: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85',
        caption: 'Mulliner Handcrafted Leather Sanctuary',
        category: 'interior'
      },
      {
        url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=85',
        caption: 'Iconic Bentley Rotating Dashboard Display',
        category: 'cockpit'
      }
    ],
    inspectionScore: 100,
    previousOwners: 0,
    warranty: '36 Months Unlimited Mileage Bentley Factory Warranty',
    createdAt: '2026-08-19'
  },
  {
    id: 'bmw-m3-cs-2025',
    slug: 'bmw-m3-cs-2025',
    brand: 'BMW',
    model: 'M3 CS',
    trim: 'Competition Sport Lightweight',
    year: 2025,
    price: 6700000,
    currency: 'USD',
    monthlyEstimate: 2000,
    mileage: 4900,
    condition: 'Certified Pre-Owned',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    drivetrain: 'AWD',
    engine: '3.0L BMW M TwinPower Turbo Inline-6',
    horsepower: 550,
    torque: '650 Nm @ 2,750 - 5,950 rpm',
    acceleration0to100: 3.4,
    topSpeed: 302,
    fuelEconomy: '10.1 L / 100km',
    exteriorColor: 'Signal Green Solid',
    exteriorColorHex: '#38A169',
    interiorColor: 'Full Merino Leather Black / Mugello Red Accents',
    interiorColorHex: '#1A202C',
    doors: 4,
    seats: 5,
    vin: 'WBS33AY08PFA91203',
    stockNumber: 'AP-BMW-M3CS',
    isFeatured: false,
    isAvailable: true,
    tagline: '550 HP Limited Production Motorsport Weapon in Distinctive Signal Green',
    description: 'Limited edition high-performance sedan with increased boost pressure, bespoke engine mounts, carbon fiber bonnet, splitter, rear diffuser and roof. Delivers Nürburgring lap time of 7:28.760 minutes with everyday 4-door practicality.',
    keyHighlights: [
      'Titanium Lightweight Rear Silencer (4kg Weight Saving)',
      'Carbon Fiber Reinforced Plastic (CFRP) Bonnet, Roof & Diffuser',
      'M Carbon Bucket Seats with Illuminated CS Badges',
      'Yellow Motorsport DRL Signature LED Lights',
      'Track-Tuned M xDrive with Active M Differential',
      'Cast Light-Alloy Forged Wheels in Matte Bronze'
    ],
    features: [
      'M Drive Professional with M Drift Analyzer and Lap Timer',
      'Harman Kardon Premium Surround Sound System',
      'BMW Curved Display with M-Specific Graphics',
      'Head-Up Display with Shift Indicator Bars',
      'M Carbon Ceramic Brakes with Red Calipers',
      'Parking Assistant with Reversing Camera'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=85',
        caption: 'Striking Signal Green Stance',
        category: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1600&q=85',
        caption: 'Alcantara M Sport Steering Wheel',
        category: 'cockpit'
      },
      {
        url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
        caption: 'Carbon Bucket Racing Seats',
        category: 'interior'
      }
    ],
    inspectionScore: 99,
    previousOwners: 1,
    warranty: '24 Months BMW Certified Warranty',
    createdAt: '2026-08-02'
  },
  {
    id: 'mercedes-maybach-s-580-4matic-2025',
    slug: 'mercedes-maybach-s-580-4matic-2025',
    brand: 'Mercedes-Benz',
    model: 'Mercedes-Maybach S 580',
    trim: '4MATIC First Class Suite',
    year: 2025,
    price: 12000000,
    currency: 'USD',
    monthlyEstimate: 3000,
    mileage: 1600,
    condition: 'New',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    drivetrain: 'AWD',
    engine: '4.0L Bi-Turbo V8 with EQ Boost Mild-Hybrid',
    horsepower: 503,
    torque: '700 Nm + 250 Nm EQ Boost',
    acceleration0to100: 4.8,
    topSpeed: 250,
    fuelEconomy: '10.4 L / 100km',
    exteriorColor: 'Two-Tone Obsidian Black / Mojave Silver',
    exteriorColorHex: '#1A1C1E',
    interiorColor: 'Exclusive Nappa Leather in Macchiato Beige / Bronze Brown',
    interiorColorHex: '#E6DCB8',
    doors: 4,
    seats: 4,
    vin: 'WDD2239761A098241',
    stockNumber: 'AP-MAYBACH-58',
    isFeatured: false,
    isAvailable: true,
    tagline: 'The Ultimate Expression of Automotive Grandeur and Chauffeur-Driven Splendor',
    description: 'Revered worldwide as the benchmark in ultra-luxury prestige motoring. Features Maybach two-tone hand-finished paintwork, First-Class rear compartment with continuous console, active road noise compensation, silver-plated champagne flutes, electrically opening comfort rear doors, and Burmester High-End 4D sound.',
    keyHighlights: [
      'Maybach Exclusive Two-Tone Hand-Sprayed Paintwork',
      'Burmester High-End 4D Surround Sound with 31 Speakers & Exciters in Seats',
      'First-Class Rear Executive Suite with Heated Calf Massage & Reclining Footrests',
      'E-ACTIVE BODY CONTROL Fully Active Electro-Hydraulic Suspension',
      'Electrically Operated Rear Comfort Doors with Gesture Control',
      'Rear-Axle Steering (Up to 10° for Compact Turning Circle)'
    ],
    features: [
      'Digital Light Headlamps with High-Resolution Video Projection',
      'MBUX High-End Rear Seat Entertainment with Dual OLED Tablets',
      'Active Ambient Lighting with 253 LEDs and Welcome Show',
      'Refrigerated Compartment in Rear Armrest',
      'Panoramic Sliding Sunroof with Magic Sky Control',
      'Heated and Cooled Thermal Cupholders Front & Rear'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=85',
        caption: 'Maybach Chrome Vertical Grille & Stature',
        category: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85',
        caption: 'First-Class Rear Passenger Haven with Calf Rests',
        category: 'interior'
      },
      {
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85',
        caption: '12.8-inch OLED Central Display with Piano Lacquer Lines',
        category: 'cockpit'
      }
    ],
    inspectionScore: 100,
    previousOwners: 0,
    warranty: '48 Months Mercedes-Benz Factory Warranty with Chauffeur Assist',
    createdAt: '2026-08-20'
  }
];

export const POPULAR_SEARCH_PRESETS = [
  { label: 'Supercars & Track', query: { bodyType: 'Supercar' } },
  { label: 'V8 Performance', query: { fuelType: 'Petrol' } },
  { label: 'Hybrid & EV Innovators', query: { fuelType: 'Plug-in Hybrid' } },
  { label: 'Executive Luxury Sedans', query: { bodyType: 'Sedan' } },
  { label: 'High Performance SUVs', query: { bodyType: 'SUV' } },
  { label: 'تحت 10 مليون جنيه', query: { maxPrice: 10000000 } }
];
