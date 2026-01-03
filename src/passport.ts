/**
 * Türk Pasaport numarası doğrulama fonksiyonları
 */

/**
 * Türk pasaport numarasını doğrular
 * @param passport - Pasaport numarası (eski: A12345678, yeni: U12345678)
 * @returns boolean - Geçerli ise true
 */
export function validateTurkishPassport(passport: string): boolean {
  const cleaned = passport.replace(/\s/g, '').toUpperCase();
  
  // Eski format: 1 harf + 8 rakam (A12345678)
  const oldFormat = /^[A-Z]\d{8}$/;
  
  // Yeni format: 1 harf + 8 rakam (U ile başlayan)
  const newFormat = /^U\d{8}$/;
  
  // Diplomatik pasaport: D ile başlayan
  const diplomaticFormat = /^D\d{8}$/;
  
  // Hizmet pasaportu: S ile başlayan
  const serviceFormat = /^S\d{8}$/;
  
  return oldFormat.test(cleaned) || 
         newFormat.test(cleaned) || 
         diplomaticFormat.test(cleaned) || 
         serviceFormat.test(cleaned);
}

/**
 * Pasaport türünü belirler
 * @param passport - Pasaport numarası
 * @returns string | null - Pasaport türü veya null
 */
export function getPassportType(passport: string): string | null {
  if (!validateTurkishPassport(passport)) return null;
  
  const cleaned = passport.replace(/\s/g, '').toUpperCase();
  const firstLetter = cleaned[0];
  
  switch (firstLetter) {
    case 'U':
      return 'Umumi (Genel) Pasaport';
    case 'D':
      return 'Diplomatik Pasaport';
    case 'S':
      return 'Hizmet Pasaportu';
    default:
      return 'Eski Format Pasaport';
  }
}

/**
 * Test amaçlı geçerli pasaport numarası oluşturur
 * @param type - Pasaport türü
 * @returns string - Geçerli pasaport numarası
 */
export function generateTurkishPassport(
  type: 'general' | 'diplomatic' | 'service' | 'old' = 'general'
): string {
  let prefix: string;
  
  switch (type) {
    case 'general':
      prefix = 'U';
      break;
    case 'diplomatic':
      prefix = 'D';
      break;
    case 'service':
      prefix = 'S';
      break;
    case 'old':
      // Eski formatta rastgele harf
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      prefix = letters[Math.floor(Math.random() * letters.length)];
      break;
    default:
      prefix = 'U';
  }
  
  // 8 haneli rastgele sayı
  const numbers = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  
  return prefix + numbers;
}