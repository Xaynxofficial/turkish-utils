/**
 * Türkiye posta kodu doğrulama ve işlemleri
 */

/**
 * Türkiye posta kodunu doğrular
 * @param postalCode - 5 haneli posta kodu
 * @returns boolean - Geçerli ise true
 */
export function validateTurkishPostalCode(postalCode: string | number): boolean {
  const code = postalCode.toString().replace(/\s/g, '');
  
  // 5 hane kontrolü
  if (code.length !== 5) return false;
  
  // Sadece rakam kontrolü
  if (!/^\d{5}$/.test(code)) return false;
  
  // İlk iki hane plaka koduna uygun olmalı (01-81)
  const plateCode = parseInt(code.substring(0, 2));
  
  return plateCode >= 1 && plateCode <= 81;
}

/**
 * Posta kodundan il bilgisini döndürür
 * @param postalCode - Posta kodu
 * @returns string | null - İl adı veya null
 */
export function getProvinceFromPostalCode(postalCode: string | number): string | null {
  if (!validateTurkishPostalCode(postalCode)) return null;
  
  const code = postalCode.toString();
  const plateCode = code.substring(0, 2);
  
  // Plaka kodundan şehir adını al (plaka.ts'den import edilecek)
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
  
  return PLAKA_CITY_MAP[plateCode] || null;
}

/**
 * İl adından örnek posta kodları döndürür
 * @param cityName - İl adı
 * @returns Array<string> - Örnek posta kodları
 */
export function getSamplePostalCodes(cityName: string): Array<string> {
  // Şehir adından plaka kodunu bul
  const CITY_PLAKA_MAP: Record<string, string> = {
    'adana': '01', 'adıyaman': '02', 'afyonkarahisar': '03', 'ağrı': '04', 'amasya': '05',
    'ankara': '06', 'antalya': '07', 'artvin': '08', 'aydın': '09', 'balıkesir': '10',
    'bilecik': '11', 'bingöl': '12', 'bitlis': '13', 'bolu': '14', 'burdur': '15',
    'bursa': '16', 'çanakkale': '17', 'çankırı': '18', 'çorum': '19', 'denizli': '20',
    'diyarbakır': '21', 'edirne': '22', 'elazığ': '23', 'erzincan': '24', 'erzurum': '25',
    'eskişehir': '26', 'gaziantep': '27', 'giresun': '28', 'gümüşhane': '29', 'hakkâri': '30',
    'hatay': '31', 'isparta': '32', 'mersin': '33', 'istanbul': '34', 'i̇stanbul': '34', 'izmir': '35', 'i̇zmir': '35'
  };
  
  const normalizedCity = cityName.toLowerCase().trim();
  const plateCode = CITY_PLAKA_MAP[normalizedCity];
  
  if (!plateCode) return [];
  
  // Örnek posta kodları oluştur
  return [
    plateCode + '000',
    plateCode + '010',
    plateCode + '020',
    plateCode + '100',
    plateCode + '200'
  ];
}

/**
 * Rastgele geçerli posta kodu oluşturur
 * @param plateCode - İsteğe bağlı plaka kodu (01-81)
 * @returns string - Geçerli posta kodu
 */
export function generatePostalCode(plateCode?: string): string {
  let plate: string;
  
  if (plateCode) {
    const code = parseInt(plateCode);
    if (code < 1 || code > 81) {
      throw new Error('Geçersiz plaka kodu. 1-81 arası olmalı.');
    }
    plate = plateCode.padStart(2, '0');
  } else {
    // Rastgele plaka kodu (1-81)
    const randomPlate = Math.floor(Math.random() * 81) + 1;
    plate = randomPlate.toString().padStart(2, '0');
  }
  
  // Son 3 haneyi rastgele oluştur
  const lastThree = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return plate + lastThree;
}