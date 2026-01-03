/**
 * Türkiye telefon numarası doğrulama ve formatlama
 */

/**
 * Türk telefon numarasını doğrular
 * @param phone - Telefon numarası
 * @returns boolean - Geçerli ise true
 */
export function validateTurkishPhone(phone: string): boolean {
  // Temizle: boşluk, tire, parantez kaldır
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  
  // +90 ile başlıyorsa kaldır
  const withoutCountryCode = cleaned.replace(/^\+90/, '');
  
  // 0 ile başlıyorsa kaldır
  const withoutLeadingZero = withoutCountryCode.replace(/^0/, '');
  
  // 10 haneli olmalı ve sadece rakam
  if (!/^\d{10}$/.test(withoutLeadingZero)) return false;
  
  // İlk hane geçerli operatör kodları: 5xx (mobil)
  const firstDigit = withoutLeadingZero[0];
  if (firstDigit !== '5') return false;
  
  // İkinci hane geçerli operatör kodları
  const secondDigit = withoutLeadingZero[1];
  const validSecondDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  return validSecondDigits.includes(secondDigit);
}

/**
 * Türk telefon numarasını formatlar
 * @param phone - Telefon numarası
 * @param format - Format tipi
 * @returns string - Formatlanmış telefon numarası
 */
export function formatTurkishPhone(
  phone: string, 
  format: 'national' | 'international' | 'dots' | 'spaces' = 'national'
): string {
  // Temizle
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  const withoutCountryCode = cleaned.replace(/^\+90/, '');
  const withoutLeadingZero = withoutCountryCode.replace(/^0/, '');
  
  if (!validateTurkishPhone(phone)) {
    return phone; // Geçersizse orijinalini döndür
  }
  
  const digits = withoutLeadingZero;
  
  switch (format) {
    case 'international':
      return `+90 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
    
    case 'national':
      return `0${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
    
    case 'dots':
      return `0${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 8)}.${digits.slice(8)}`;
    
    case 'spaces':
      return `0 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
    
    default:
      return `0${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
  }
}

/**
 * Telefon numarasından operatör bilgisini döndürür
 * @param phone - Telefon numarası
 * @returns string | null - Operatör adı veya null
 */
export function getPhoneOperator(phone: string): string | null {
  if (!validateTurkishPhone(phone)) return null;
  
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  const withoutCountryCode = cleaned.replace(/^\+90/, '');
  const withoutLeadingZero = withoutCountryCode.replace(/^0/, '');
  
  const prefix = withoutLeadingZero.slice(0, 3);
  
  // Turkcell
  if (['532', '533', '534', '535', '536', '537', '538'].includes(prefix)) {
    return 'Turkcell';
  }
  
  // Vodafone
  if (['542', '543', '544', '545', '546', '547', '548', '549'].includes(prefix)) {
    return 'Vodafone';
  }
  
  // Türk Telekom
  if (['505', '506', '507', '551', '552', '553', '554', '555', '559'].includes(prefix)) {
    return 'Türk Telekom';
  }
  
  return 'Bilinmeyen';
}