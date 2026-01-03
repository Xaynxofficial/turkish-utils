/**
 * Türkiye coğrafi koordinatlar ve bölge bilgileri
 */

// Türkiye'nin coğrafi sınırları
const TURKEY_BOUNDS = {
  north: 42.1069,
  south: 35.8081,
  east: 44.8178,
  west: 25.6684
};

// Coğrafi bölgeler ve merkez koordinatları
const GEOGRAPHIC_REGIONS: Record<string, {
  name: string;
  center: { lat: number; lng: number };
  bounds: { north: number; south: number; east: number; west: number };
  provinces: string[];
  climate: string;
  area: number; // km²
}> = {
  'marmara': {
    name: 'Marmara Bölgesi',
    center: { lat: 40.7589, lng: 29.4173 },
    bounds: { north: 42.1, south: 39.9, east: 30.8, west: 26.0 },
    provinces: ['İstanbul', 'Bursa', 'Kocaeli', 'Tekirdağ', 'Balıkesir', 'Çanakkale', 'Edirne', 'Kırklareli', 'Sakarya', 'Yalova', 'Bilecik'],
    climate: 'Akdeniz ve Karadeniz iklimi geçiş kuşağı',
    area: 67000
  },
  'ege': {
    name: 'Ege Bölgesi',
    center: { lat: 38.4237, lng: 27.1428 },
    bounds: { north: 40.0, south: 36.5, east: 30.5, west: 25.7 },
    provinces: ['İzmir', 'Manisa', 'Aydın', 'Muğla', 'Denizli', 'Uşak', 'Afyonkarahisar', 'Kütahya'],
    climate: 'Akdeniz iklimi',
    area: 79000
  },
  'akdeniz': {
    name: 'Akdeniz Bölgesi',
    center: { lat: 36.8969, lng: 34.6155 },
    bounds: { north: 38.0, south: 35.8, east: 36.7, west: 28.0 },
    provinces: ['Antalya', 'Mersin', 'Adana', 'Hatay', 'Isparta', 'Burdur', 'Osmaniye', 'Kahramanmaraş'],
    climate: 'Akdeniz iklimi',
    area: 90000
  },
  'ic_anadolu': {
    name: 'İç Anadolu Bölgesi',
    center: { lat: 39.9334, lng: 32.8597 },
    bounds: { north: 41.0, south: 37.5, east: 36.0, west: 29.0 },
    provinces: ['Ankara', 'Konya', 'Kayseri', 'Sivas', 'Yozgat', 'Kırıkkale', 'Kırşehir', 'Nevşehir', 'Niğde', 'Aksaray', 'Karaman'],
    climate: 'Karasal iklim',
    area: 151000
  },
  'karadeniz': {
    name: 'Karadeniz Bölgesi',
    center: { lat: 41.0015, lng: 35.3213 },
    bounds: { north: 42.1, south: 39.5, east: 41.8, west: 27.5 },
    provinces: ['Samsun', 'Trabzon', 'Ordu', 'Giresun', 'Rize', 'Artvin', 'Gümüşhane', 'Bayburt', 'Tokat', 'Amasya', 'Çorum', 'Sinop', 'Kastamonu', 'Zonguldak', 'Bartın', 'Karabük', 'Bolu', 'Düzce'],
    climate: 'Karadeniz iklimi',
    area: 141000
  },
  'dogu_anadolu': {
    name: 'Doğu Anadolu Bölgesi',
    center: { lat: 39.7417, lng: 41.5311 },
    bounds: { north: 42.0, south: 37.0, east: 44.8, west: 36.0 },
    provinces: ['Erzurum', 'Erzincan', 'Kars', 'Ağrı', 'Van', 'Muş', 'Bitlis', 'Hakkâri', 'Iğdır', 'Ardahan', 'Malatya', 'Elazığ', 'Tunceli', 'Bingöl', 'Bayburt'],
    climate: 'Karasal iklim',
    area: 164000
  },
  'guneydogu_anadolu': {
    name: 'Güneydoğu Anadolu Bölgesi',
    center: { lat: 37.7648, lng: 40.0128 },
    bounds: { north: 39.5, south: 36.0, east: 43.0, west: 36.0 },
    provinces: ['Gaziantep', 'Şanlıurfa', 'Diyarbakır', 'Mardin', 'Şırnak', 'Batman', 'Siirt', 'Kilis', 'Adıyaman'],
    climate: 'Karasal ve Akdeniz iklimi geçiş kuşağı',
    area: 75000
  }
};

// Büyük şehirlerin koordinatları
const MAJOR_CITIES: Record<string, { lat: number; lng: number; population: number }> = {
  'İstanbul': { lat: 41.0082, lng: 28.9784, population: 15840900 },
  'Ankara': { lat: 39.9334, lng: 32.8597, population: 5747325 },
  'İzmir': { lat: 38.4237, lng: 27.1428, population: 4462056 },
  'Bursa': { lat: 40.1826, lng: 29.0665, population: 3194720 },
  'Antalya': { lat: 36.8969, lng: 30.7133, population: 2688004 },
  'Adana': { lat: 37.0000, lng: 35.3213, population: 2274106 },
  'Konya': { lat: 37.8667, lng: 32.4833, population: 2277017 },
  'Gaziantep': { lat: 37.0662, lng: 37.3833, population: 2154051 },
  'Kayseri': { lat: 38.7312, lng: 35.4787, population: 1421362 },
  'Mersin': { lat: 36.8000, lng: 34.6333, population: 1916432 }
};

/**
 * Koordinatların Türkiye sınırları içinde olup olmadığını kontrol eder
 * @param lat - Enlem
 * @param lng - Boylam
 * @returns boolean - Türkiye içindeyse true
 */
export function coordinatesInTurkey(lat: number, lng: number): boolean {
  return lat >= TURKEY_BOUNDS.south &&
         lat <= TURKEY_BOUNDS.north &&
         lng >= TURKEY_BOUNDS.west &&
         lng <= TURKEY_BOUNDS.east;
}

/**
 * Koordinatlardan coğrafi bölgeyi belirler
 * @param lat - Enlem
 * @param lng - Boylam
 * @returns string | null - Bölge adı
 */
export function getRegionFromCoords(lat: number, lng: number): string | null {
  if (!coordinatesInTurkey(lat, lng)) return null;
  
  for (const [key, region] of Object.entries(GEOGRAPHIC_REGIONS)) {
    const bounds = region.bounds;
    if (lat >= bounds.south && lat <= bounds.north &&
        lng >= bounds.west && lng <= bounds.east) {
      return region.name;
    }
  }
  
  return null;
}

/**
 * En yakın büyük şehri bulur
 * @param lat - Enlem
 * @param lng - Boylam
 * @returns object | null - En yakın şehir bilgisi
 */
export function getNearestCity(lat: number, lng: number): {
  city: string;
  distance: number;
  coordinates: { lat: number; lng: number };
} | null {
  if (!coordinatesInTurkey(lat, lng)) return null;
  
  let nearestCity = '';
  let minDistance = Infinity;
  let nearestCoords = { lat: 0, lng: 0 };
  
  for (const [city, coords] of Object.entries(MAJOR_CITIES)) {
    const distance = calculateDistance(lat, lng, coords.lat, coords.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearestCity = city;
      nearestCoords = { lat: coords.lat, lng: coords.lng };
    }
  }
  
  return {
    city: nearestCity,
    distance: Math.round(minDistance),
    coordinates: nearestCoords
  };
}

/**
 * İki koordinat arasındaki mesafeyi hesaplar (Haversine formülü)
 * @param lat1 - İlk nokta enlemi
 * @param lng1 - İlk nokta boylamı
 * @param lat2 - İkinci nokta enlemi
 * @param lng2 - İkinci nokta boylamı
 * @returns number - Mesafe (km)
 */
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Dünya'nın yarıçapı (km)
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Derece cinsinden açıyı radyana çevirir
 * @param degrees - Derece
 * @returns number - Radian
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Şehir adından koordinatları döndürür
 * @param cityName - Şehir adı
 * @returns object | null - Koordinat bilgisi
 */
export function getCityCoordinates(cityName: string): {
  lat: number;
  lng: number;
  population: number;
} | null {
  const normalized = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
  return MAJOR_CITIES[normalized] || null;
}

/**
 * Bölge bilgilerini döndürür
 * @param regionName - Bölge adı veya kodu
 * @returns object | null - Bölge bilgileri
 */
export function getRegionInfo(regionName: string): typeof GEOGRAPHIC_REGIONS[string] | null {
  const normalized = regionName.toLowerCase().replace(/\s+/g, '_');
  
  // Direkt kod ile arama
  if (GEOGRAPHIC_REGIONS[normalized]) {
    return GEOGRAPHIC_REGIONS[normalized];
  }
  
  // İsim ile arama
  for (const region of Object.values(GEOGRAPHIC_REGIONS)) {
    if (region.name.toLowerCase().includes(regionName.toLowerCase())) {
      return region;
    }
  }
  
  return null;
}

/**
 * Tüm coğrafi bölgeleri listeler
 * @returns Array - Bölge listesi
 */
export function getAllRegions(): Array<{
  code: string;
  name: string;
  center: { lat: number; lng: number };
  provinces: string[];
  climate: string;
  area: number;
}> {
  return Object.entries(GEOGRAPHIC_REGIONS).map(([code, region]) => ({
    code,
    ...region
  }));
}

/**
 * Koordinat formatını dönüştürür
 * @param lat - Enlem
 * @param lng - Boylam
 * @param format - Format türü
 * @returns string - Formatlanmış koordinat
 */
export function formatCoordinates(
  lat: number,
  lng: number,
  format: 'decimal' | 'dms' | 'utm' = 'decimal'
): string {
  switch (format) {
    case 'decimal':
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    
    case 'dms':
      return `${toDMS(lat, 'lat')}, ${toDMS(lng, 'lng')}`;
    
    case 'utm':
      // Basit UTM yaklaşımı (gerçek projede detaylı hesaplama gerekir)
      const zone = Math.floor((lng + 180) / 6) + 1;
      return `UTM Zone ${zone}: ${lat.toFixed(0)}N, ${lng.toFixed(0)}E`;
    
    default:
      return `${lat}, ${lng}`;
  }
}

/**
 * Ondalık dereceyi DMS (Derece, Dakika, Saniye) formatına çevirir
 * @param decimal - Ondalık derece
 * @param type - Koordinat türü (lat/lng)
 * @returns string - DMS formatı
 */
function toDMS(decimal: number, type: 'lat' | 'lng'): string {
  const absolute = Math.abs(decimal);
  const degrees = Math.floor(absolute);
  const minutes = Math.floor((absolute - degrees) * 60);
  const seconds = Math.round(((absolute - degrees) * 60 - minutes) * 60);
  
  const direction = type === 'lat' 
    ? (decimal >= 0 ? 'K' : 'G')  // Kuzey/Güney
    : (decimal >= 0 ? 'D' : 'B'); // Doğu/Batı
  
  return `${degrees}°${minutes}'${seconds}"${direction}`;
}