/**
 * Türkçe metin işleme fonksiyonları
 */

const TURKISH_TO_ENGLISH_MAP: Record<string, string> = {
  'ç': 'c', 'Ç': 'C',
  'ğ': 'g', 'Ğ': 'G',
  'ı': 'i', 'I': 'I',
  'İ': 'I', 'i': 'i',
  'ö': 'o', 'Ö': 'O',
  'ş': 's', 'Ş': 'S',
  'ü': 'u', 'Ü': 'U'
};

const ENGLISH_TO_TURKISH_MAP: Record<string, string> = {
  'c': 'ç', 'C': 'Ç',
  'g': 'ğ', 'G': 'Ğ',
  'i': 'ı', 'I': 'İ',
  'o': 'ö', 'O': 'Ö',
  's': 'ş', 'S': 'Ş',
  'u': 'ü', 'U': 'Ü'
};

/**
 * Türkçe karakterleri İngilizce karşılıklarına çevirir
 * @param text - Çevrilecek metin
 * @returns string - İngilizce karakterli metin
 */
export function turkishToEnglish(text: string): string {
  return text.replace(/[çÇğĞıIİiöÖşŞüÜ]/g, (char) => {
    return TURKISH_TO_ENGLISH_MAP[char] || char;
  });
}

/**
 * İngilizce karakterleri Türkçe karşılıklarına çevirir (basit dönüşüm)
 * @param text - Çevrilecek metin
 * @returns string - Türkçe karakterli metin
 */
export function englishToTurkish(text: string): string {
  // Bu fonksiyon tam doğru olmayabilir, context gerektirir
  // Sadece basit dönüşümler için kullanılmalı
  return text.replace(/[cgiosuCGIOSU]/g, (char) => {
    return ENGLISH_TO_TURKISH_MAP[char] || char;
  });
}

/**
 * Türkçe metni büyük harfe çevirir (İ/i problemi çözülü)
 * @param text - Çevrilecek metin
 * @returns string - Büyük harfli metin
 */
export function turkishUpperCase(text: string): string {
  return text
    .replace(/i/g, 'İ')
    .replace(/ı/g, 'I')
    .toUpperCase();
}

/**
 * Türkçe metni küçük harfe çevirir (İ/i problemi çözülü)
 * @param text - Çevrilecek metin
 * @returns string - Küçük harfli metin
 */
export function turkishLowerCase(text: string): string {
  return text
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .toLowerCase();
}

/**
 * Türkçe metinde ilk harfi büyük yapar (İ/i problemi çözülü)
 * @param text - Çevrilecek metin
 * @returns string - İlk harfi büyük metin
 */
export function capitalizeturkish(text: string): string {
  if (!text) return text;
  
  const firstChar = text.charAt(0);
  const restOfText = text.slice(1);
  
  let capitalizedFirst = firstChar;
  if (firstChar === 'i') {
    capitalizedFirst = 'İ';
  } else if (firstChar === 'ı') {
    capitalizedFirst = 'I';
  } else {
    capitalizedFirst = firstChar.toUpperCase();
  }
  
  return capitalizedFirst + turkishLowerCase(restOfText);
}

/**
 * URL/slug için Türkçe metni temizler
 * @param text - Temizlenecek metin
 * @returns string - URL-safe metin
 */
export function slugify(text: string): string {
  return turkishToEnglish(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Özel karakterleri kaldır
    .replace(/\s+/g, '-') // Boşlukları tire ile değiştir
    .replace(/-+/g, '-') // Çoklu tireleri tek tire yap
    .replace(/^-|-$/g, ''); // Başta ve sonda tire varsa kaldır
}