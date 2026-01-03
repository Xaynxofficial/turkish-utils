/**
 * Türk Lirası formatı ve sayı-yazı dönüşümleri
 */

/**
 * Sayıyı Türk Lirası formatında gösterir
 * @param amount - Para miktarı
 * @param options - Formatla seçenekleri
 * @returns string - Formatlanmış para miktarı
 */
export function formatTurkishLira(
  amount: number, 
  options: {
    showSymbol?: boolean;
    showDecimals?: boolean;
    thousandSeparator?: string;
    decimalSeparator?: string;
  } = {}
): string {
  const {
    showSymbol = true,
    showDecimals = true,
    thousandSeparator = '.',
    decimalSeparator = ','
  } = options;

  let formatted = Math.abs(amount).toFixed(showDecimals ? 2 : 0);
  
  // Ondalık ayırıcıyı değiştir
  if (showDecimals) {
    formatted = formatted.replace('.', decimalSeparator);
  }
  
  // Binlik ayırıcıyı ekle
  const parts = formatted.split(decimalSeparator);
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  formatted = parts.join(decimalSeparator);
  
  // Negatif işaret
  if (amount < 0) {
    formatted = '-' + formatted;
  }
  
  // TL sembolü
  if (showSymbol) {
    formatted += ' TL';
  }
  
  return formatted;
}

const ONES = ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'];
const TENS = ['', '', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'];
const HUNDREDS = ['', 'yüz', 'ikiyüz', 'üçyüz', 'dörtyüz', 'beşyüz', 'altıyüz', 'yediyüz', 'sekizyüz', 'dokuzyüz'];
const SCALES = ['', 'bin', 'milyon', 'milyar', 'trilyon', 'katrilyon'];

/**
 * Sayıyı Türkçe yazıya çevirir
 * @param num - Çevrilecek sayı
 * @returns string - Türkçe yazılmış sayı
 */
export function numberToWords(num: number): string {
  if (num === 0) return 'sıfır';
  if (num < 0) return 'eksi ' + numberToWords(-num);
  
  // Ondalık kısmı ayır
  const [integerPart, decimalPart] = num.toString().split('.');
  let result = convertIntegerToWords(parseInt(integerPart));
  
  if (decimalPart) {
    result += ' virgül ';
    // Her basamağı ayrı ayrı oku
    for (const digit of decimalPart) {
      result += ONES[parseInt(digit)] + ' ';
    }
  }
  
  return result.trim();
}

/**
 * Para miktarını Türkçe yazıya çevirir
 * @param amount - Para miktarı
 * @param currency - Para birimi
 * @returns string - Türkçe yazılmış para miktarı
 */
export function amountToWords(amount: number, currency: 'TL' | 'USD' | 'EUR' = 'TL'): string {
  const [integerPart, decimalPart] = amount.toFixed(2).split('.');
  
  let result = '';
  
  // Tam kısım
  const integerWords = convertIntegerToWords(parseInt(integerPart));
  if (integerWords) {
    result += integerWords;
    
    switch (currency) {
      case 'TL':
        result += ' Türk Lirası';
        break;
      case 'USD':
        result += ' Dolar';
        break;
      case 'EUR':
        result += ' Euro';
        break;
    }
  }
  
  // Ondalık kısım
  const decimalValue = parseInt(decimalPart);
  if (decimalValue > 0) {
    const decimalWords = convertIntegerToWords(decimalValue);
    if (result) result += ' ';
    result += decimalWords;
    
    switch (currency) {
      case 'TL':
        result += ' Kuruş';
        break;
      case 'USD':
        result += ' Sent';
        break;
      case 'EUR':
        result += ' Sent';
        break;
    }
  }
  
  return result || 'sıfır';
}

/**
 * Sıra sayılarını Türkçe yazıya çevirir
 * @param num - Sıra sayısı
 * @returns string - Türkçe sıra sayısı
 */
export function ordinalToWords(num: number): string {
  if (num <= 0) return 'sıfırıncı';
  
  const baseWords = numberToWords(num);
  
  // Türkçe sıra sayısı ekleri
  if (baseWords.endsWith('bir')) {
    return baseWords.slice(0, -3) + 'birinci';
  } else if (baseWords.endsWith('iki')) {
    return baseWords.slice(0, -3) + 'ikinci';
  } else if (baseWords.endsWith('üç')) {
    return baseWords.slice(0, -2) + 'üçüncü';
  } else if (baseWords.endsWith('dört')) {
    return baseWords.slice(0, -4) + 'dördüncü';
  } else if (baseWords.endsWith('beş')) {
    return baseWords.slice(0, -3) + 'beşinci';
  } else if (baseWords.endsWith('altı')) {
    return baseWords.slice(0, -4) + 'altıncı';
  } else if (baseWords.endsWith('yedi')) {
    return baseWords.slice(0, -4) + 'yedinci';
  } else if (baseWords.endsWith('sekiz')) {
    return baseWords.slice(0, -5) + 'sekizinci';
  } else if (baseWords.endsWith('dokuz')) {
    return baseWords.slice(0, -5) + 'dokuzuncu';
  } else if (baseWords.endsWith('on')) {
    return baseWords + 'uncu';
  } else {
    // Genel kural
    const lastChar = baseWords.slice(-1);
    const vowels = 'aeiouıüö';
    
    if (vowels.includes(lastChar)) {
      return baseWords + 'ncı';
    } else {
      return baseWords + 'ıncı';
    }
  }
}

function convertIntegerToWords(num: number): string {
  if (num === 0) return '';
  
  const groups = [];
  let groupIndex = 0;
  
  while (num > 0) {
    const group = num % 1000;
    if (group !== 0) {
      groups.unshift(convertGroupToWords(group, groupIndex));
    }
    num = Math.floor(num / 1000);
    groupIndex++;
  }
  
  return groups.join(' ').replace(/\s+/g, ' ').trim();
}

function convertGroupToWords(num: number, scaleIndex: number): string {
  if (num === 0) return '';
  
  const parts = [];
  
  // Yüzler basamağı
  const hundreds = Math.floor(num / 100);
  if (hundreds > 0) {
    if (hundreds === 1) {
      parts.push('yüz');
    } else {
      parts.push(HUNDREDS[hundreds]);
    }
  }
  
  // Onlar ve birler basamağı
  const remainder = num % 100;
  if (remainder >= 10 && remainder < 20) {
    // 10-19 arası özel durumlar
    const teens = ['on', 'onbir', 'oniki', 'onüç', 'ondört', 'onbeş', 'onaltı', 'onyedi', 'onsekiz', 'ondokuz'];
    parts.push(teens[remainder - 10]);
  } else {
    const tens = Math.floor(remainder / 10);
    const ones = remainder % 10;
    
    if (tens > 0) {
      parts.push(TENS[tens]);
    }
    
    if (ones > 0) {
      parts.push(ONES[ones]);
    }
  }
  
  let result = parts.join('');
  
  // Ölçek eki (bin, milyon, vb.)
  if (scaleIndex > 0 && scaleIndex < SCALES.length) {
    // "bir bin" yerine sadece "bin" de
    if (scaleIndex === 1 && num === 1) {
      result = 'bin';
    } else {
      result += SCALES[scaleIndex];
    }
  }
  
  return result;
}