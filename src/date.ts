/**
 * Türkçe tarih formatları ve işlemleri
 */

const TURKISH_MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

const TURKISH_DAYS = [
  'Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'
];

const TURKISH_MONTHS_SHORT = [
  'Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz',
  'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'
];

const TURKISH_DAYS_SHORT = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

/**
 * Tarihi Türkçe formatta döndürür
 * @param date - Tarih objesi veya string
 * @param format - Format tipi
 * @returns string - Türkçe formatlanmış tarih
 */
export function formatTurkishDate(
  date: Date | string,
  format: 'long' | 'short' | 'numeric' | 'relative' = 'long'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) {
    throw new Error('Geçersiz tarih');
  }
  
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  const dayOfWeek = d.getDay();
  
  switch (format) {
    case 'long':
      return `${day} ${TURKISH_MONTHS[month]} ${year} ${TURKISH_DAYS[dayOfWeek]}`;
    
    case 'short':
      return `${day} ${TURKISH_MONTHS_SHORT[month]} ${year}`;
    
    case 'numeric':
      return `${day.toString().padStart(2, '0')}.${(month + 1).toString().padStart(2, '0')}.${year}`;
    
    case 'relative':
      return getRelativeTurkishDate(d);
    
    default:
      return `${day} ${TURKISH_MONTHS[month]} ${year}`;
  }
}

/**
 * Göreceli tarih döndürür (bugün, dün, yarın vb.)
 * @param date - Tarih objesi
 * @returns string - Göreceli tarih
 */
function getRelativeTurkishDate(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Bugün';
  if (diffDays === 1) return 'Yarın';
  if (diffDays === -1) return 'Dün';
  if (diffDays === 2) return 'Öbür gün';
  if (diffDays === -2) return 'Evvelsi gün';
  
  if (diffDays > 0 && diffDays <= 7) {
    return `${diffDays} gün sonra`;
  }
  
  if (diffDays < 0 && diffDays >= -7) {
    return `${Math.abs(diffDays)} gün önce`;
  }
  
  // Hafta bazında
  if (diffDays > 7) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} hafta sonra`;
  }
  
  if (diffDays < -7) {
    const weeks = Math.floor(Math.abs(diffDays) / 7);
    return `${weeks} hafta önce`;
  }
  
  return formatTurkishDate(date, 'short');
}

/**
 * Türkçe ay adından ay numarasını döndürür
 * @param monthName - Türkçe ay adı
 * @returns number | null - Ay numarası (0-11) veya null
 */
export function getMonthFromTurkishName(monthName: string): number | null {
  const normalized = monthName.toLowerCase().trim();
  
  for (let i = 0; i < TURKISH_MONTHS.length; i++) {
    if (TURKISH_MONTHS[i].toLowerCase() === normalized || 
        TURKISH_MONTHS_SHORT[i].toLowerCase() === normalized) {
      return i;
    }
  }
  
  return null;
}

/**
 * Türkçe gün adından gün numarasını döndürür
 * @param dayName - Türkçe gün adı
 * @returns number | null - Gün numarası (0-6) veya null
 */
export function getDayFromTurkishName(dayName: string): number | null {
  const normalized = dayName.toLowerCase().trim();
  
  for (let i = 0; i < TURKISH_DAYS.length; i++) {
    if (TURKISH_DAYS[i].toLowerCase() === normalized || 
        TURKISH_DAYS_SHORT[i].toLowerCase() === normalized) {
      return i;
    }
  }
  
  return null;
}

/**
 * Ramazan ve Kurban Bayramı tarihlerini hesaplar (yaklaşık)
 * @param year - Yıl
 * @returns object - Bayram tarihleri
 */
export function getTurkishHolidays(year: number): {
  ramazan: Date;
  kurban: Date;
  newYear: Date;
  nationalSovereignty: Date;
  laborDay: Date;
  commemoration: Date;
  victory: Date;
  republic: Date;
} {
  // Sabit tatiller
  const holidays = {
    newYear: new Date(year, 0, 1), // 1 Ocak
    nationalSovereignty: new Date(year, 3, 23), // 23 Nisan
    laborDay: new Date(year, 4, 1), // 1 Mayıs
    commemoration: new Date(year, 4, 19), // 19 Mayıs
    victory: new Date(year, 7, 30), // 30 Ağustos
    republic: new Date(year, 9, 29), // 29 Ekim
    
    // Dini bayramlar (yaklaşık hesaplama)
    ramazan: calculateRamazanBayram(year),
    kurban: calculateKurbanBayram(year)
  };
  
  return holidays;
}

// Basit Hicri takvim hesaplaması (yaklaşık)
function calculateRamazanBayram(year: number): Date {
  // 2024 Ramazan Bayramı: 10 Nisan
  // Her yıl yaklaşık 11 gün öne alınır
  const baseYear = 2024;
  const baseDate = new Date(2024, 3, 10); // 10 Nisan 2024
  
  const yearDiff = year - baseYear;
  const daysDiff = yearDiff * -11; // Her yıl 11 gün öne
  
  const result = new Date(baseDate);
  result.setDate(result.getDate() + daysDiff);
  
  return result;
}

function calculateKurbanBayram(year: number): Date {
  // Ramazan'dan yaklaşık 70 gün sonra
  const ramazan = calculateRamazanBayram(year);
  const kurban = new Date(ramazan);
  kurban.setDate(kurban.getDate() + 70);
  
  return kurban;
}