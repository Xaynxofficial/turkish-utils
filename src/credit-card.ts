/**
 * Kredi kartı doğrulama ve Türk bankası bilgileri
 */

// Türk bankalarının BIN (Bank Identification Number) kodları
const TURKISH_BANK_BINS: Record<string, {name: string, type: string}> = {
  // Ziraat Bankası
  '4546': {name: 'T.C. Ziraat Bankası', type: 'Visa'},
  '5571': {name: 'T.C. Ziraat Bankası', type: 'Mastercard'},
  
  // İş Bankası
  '4543': {name: 'Türkiye İş Bankası', type: 'Visa'},
  '5456': {name: 'Türkiye İş Bankası', type: 'Mastercard'},
  
  // Garanti BBVA
  '4282': {name: 'Garanti BBVA', type: 'Visa'},
  '5440': {name: 'Garanti BBVA', type: 'Mastercard'},
  
  // Akbank
  '4090': {name: 'Akbank', type: 'Visa'},
  '5504': {name: 'Akbank', type: 'Mastercard'},
  
  // Yapı Kredi
  '4157': {name: 'Yapı ve Kredi Bankası', type: 'Visa'},
  '5528': {name: 'Yapı ve Kredi Bankası', type: 'Mastercard'},
  
  // Halkbank
  '4059': {name: 'Türkiye Halk Bankası', type: 'Visa'},
  '5529': {name: 'Türkiye Halk Bankası', type: 'Mastercard'},
  
  // Vakıfbank
  '4415': {name: 'Türkiye Vakıflar Bankası', type: 'Visa'},
  '5549': {name: 'Türkiye Vakıflar Bankası', type: 'Mastercard'},
  
  // Denizbank
  '4508': {name: 'Denizbank', type: 'Visa'},
  '5186': {name: 'Denizbank', type: 'Mastercard'},
  
  // QNB Finansbank
  '4355': {name: 'QNB Finansbank', type: 'Visa'},
  '5315': {name: 'QNB Finansbank', type: 'Mastercard'},
  
  // TEB
  '4625': {name: 'Türk Ekonomi Bankası', type: 'Visa'},
  '5406': {name: 'Türk Ekonomi Bankası', type: 'Mastercard'},
  
  // ING
  '5218': {name: 'ING Bank', type: 'Mastercard'},
  '4761': {name: 'ING Bank', type: 'Visa'}
};

/**
 * Kredi kartı numarasını Luhn algoritması ile doğrular
 * @param cardNumber - Kredi kartı numarası
 * @returns boolean - Geçerli ise true
 */
export function validateCreditCard(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  // Sadece rakam kontrolü
  if (!/^\d+$/.test(cleaned)) return false;
  
  // Uzunluk kontrolü (13-19 hane)
  if (cleaned.length < 13 || cleaned.length > 19) return false;
  
  // Luhn algoritması
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

/**
 * Kredi kartı türünü belirler (Visa, Mastercard, vb.)
 * @param cardNumber - Kredi kartı numarası
 * @returns string | null - Kart türü
 */
export function getCreditCardType(cardNumber: string): string | null {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (!validateCreditCard(cleaned)) return null;
  
  // Visa: 4 ile başlar
  if (/^4/.test(cleaned)) {
    return 'Visa';
  }
  
  // Mastercard: 5 ile başlar veya 2221-2720 arası
  if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) {
    return 'Mastercard';
  }
  
  // American Express: 34 veya 37 ile başlar
  if (/^3[47]/.test(cleaned)) {
    return 'American Express';
  }
  
  // Discover: 6 ile başlar
  if (/^6/.test(cleaned)) {
    return 'Discover';
  }
  
  return 'Bilinmeyen';
}

/**
 * Türk bankasını BIN kodundan belirler
 * @param cardNumber - Kredi kartı numarası
 * @returns object | null - Banka bilgisi
 */
export function getTurkishBankFromCard(cardNumber: string): {bank: string, type: string} | null {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (!validateCreditCard(cleaned)) return null;
  
  // İlk 4 haneyi kontrol et
  const bin = cleaned.slice(0, 4);
  
  if (TURKISH_BANK_BINS[bin]) {
    return {
      bank: TURKISH_BANK_BINS[bin].name,
      type: TURKISH_BANK_BINS[bin].type
    };
  }
  
  return null;
}

/**
 * Kredi kartı numarasını formatlar
 * @param cardNumber - Kredi kartı numarası
 * @returns string - Formatlanmış kart numarası
 */
export function formatCreditCard(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (!validateCreditCard(cleaned)) return cardNumber;
  
  // 4'erli gruplar halinde formatla
  return cleaned.replace(/(.{4})/g, '$1 ').trim();
}

/**
 * Kredi kartı numarasını maskeler
 * @param cardNumber - Kredi kartı numarası
 * @param visibleDigits - Görünür hane sayısı (baştan ve sondan)
 * @returns string - Maskelenmiş kart numarası
 */
export function maskCreditCard(cardNumber: string, visibleDigits: number = 4): string {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (!validateCreditCard(cleaned)) return cardNumber;
  
  if (cleaned.length <= visibleDigits * 2) {
    return '*'.repeat(cleaned.length);
  }
  
  const start = cleaned.slice(0, visibleDigits);
  const end = cleaned.slice(-visibleDigits);
  const middle = '*'.repeat(cleaned.length - (visibleDigits * 2));
  
  return formatCreditCard(start + middle + end);
}

/**
 * Test amaçlı geçerli kart numarası oluşturur
 * @param type - Kart türü
 * @returns string - Geçerli kart numarası
 */
export function generateCreditCard(type: 'visa' | 'mastercard' = 'visa'): string {
  let prefix: string;
  let length: number;
  
  switch (type) {
    case 'visa':
      prefix = '4';
      length = 16;
      break;
    case 'mastercard':
      prefix = '5';
      length = 16;
      break;
    default:
      prefix = '4';
      length = 16;
  }
  
  // Rastgele sayılar oluştur (son hane hariç)
  let cardNumber = prefix;
  for (let i = 1; i < length - 1; i++) {
    cardNumber += Math.floor(Math.random() * 10);
  }
  
  // Luhn algoritması ile son haneyi hesapla
  let sum = 0;
  let isEven = true;
  
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  const checkDigit = (10 - (sum % 10)) % 10;
  cardNumber += checkDigit;
  
  return formatCreditCard(cardNumber);
}