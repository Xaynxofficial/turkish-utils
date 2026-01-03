/**
 * Türkiye plaka kodları ve şehir eşleştirmeleri
 */

const PLAKA_CITY_MAP: Record<string, string> = {
  '01': 'Adana', '02': 'Adıyaman', '03': 'Afyonkarahisar', '04': 'Ağrı', '05': 'Amasya',
  '06': 'Ankara', '07': 'Antalya', '08': 'Artvin', '09': 'Aydın', '10': 'Balıkesir',
  '11': 'Bilecik', '12': 'Bingöl', '13': 'Bitlis', '14': 'Bolu', '15': 'Burdur',
  '16': 'Bursa', '17': 'Çanakkale', '18': 'Çankırı', '19': 'Çorum', '20': 'Denizli',
  '21': 'Diyarbakır', '22': 'Edirne', '23': 'Elazığ', '24': 'Erzincan', '25': 'Erzurum',
  '26': 'Eskişehir', '27': 'Gaziantep', '28': 'Giresun', '29': 'Gümüşhane', '30': 'Hakkâri',
  '31': 'Hatay', '32': 'Isparta', '33': 'Mersin', '34': 'İstanbul', '35': 'İzmir',
  '36': 'Kars', '37': 'Kastamonu', '38': 'Kayseri', '39': 'Kırklareli', '40': 'Kırşehir',
  '41': 'Kocaeli', '42': 'Konya', '43': 'Kütahya', '44': 'Malatya', '45': 'Manisa',
  '46': 'Kahramanmaraş', '47': 'Mardin', '48': 'Muğla', '49': 'Muş', '50': 'Nevşehir',
  '51': 'Niğde', '52': 'Ordu', '53': 'Rize', '54': 'Sakarya', '55': 'Samsun',
  '56': 'Siirt', '57': 'Sinop', '58': 'Sivas', '59': 'Tekirdağ', '60': 'Tokat',
  '61': 'Trabzon', '62': 'Tunceli', '63': 'Şanlıurfa', '64': 'Uşak', '65': 'Van',
  '66': 'Yozgat', '67': 'Zonguldak', '68': 'Aksaray', '69': 'Bayburt', '70': 'Karaman',
  '71': 'Kırıkkale', '72': 'Batman', '73': 'Şırnak', '74': 'Bartın', '75': 'Ardahan',
  '76': 'Iğdır', '77': 'Yalova', '78': 'Karabük', '79': 'Kilis', '80': 'Osmaniye',
  '81': 'Düzce'
};

/**
 * Plaka kodundan şehir adını döndürür
 * @param plateCode - Plaka kodu (1-81 arası)
 * @returns string | null - Şehir adı veya null
 */
export function plateToCity(plateCode: string | number): string | null {
  const code = plateCode.toString().padStart(2, '0');
  return PLAKA_CITY_MAP[code] || null;
}

/**
 * Şehir adından plaka kodunu döndürür
 * @param cityName - Şehir adı
 * @returns string | null - Plaka kodu veya null
 */
export function cityToPlate(cityName: string): string | null {
  const normalizedCity = cityName.toLowerCase().trim();
  
  for (const [code, city] of Object.entries(PLAKA_CITY_MAP)) {
    if (city.toLowerCase() === normalizedCity) {
      return code;
    }
  }
  
  return null;
}

/**
 * Tüm plaka kodları ve şehir listesini döndürür
 * @returns Array<{code: string, city: string}> - Plaka ve şehir listesi
 */
export function getAllPlates(): Array<{code: string, city: string}> {
  return Object.entries(PLAKA_CITY_MAP)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([code, city]) => ({
      code,
      city
    }));
}

/**
 * Plaka kodunun geçerli olup olmadığını kontrol eder
 * @param plateCode - Plaka kodu
 * @returns boolean - Geçerli ise true
 */
export function isValidPlateCode(plateCode: string | number): boolean {
  const code = plateCode.toString().padStart(2, '0');
  return code in PLAKA_CITY_MAP;
}