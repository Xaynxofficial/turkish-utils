/**
 * Türkiye araç plaka formatları ve doğrulama
 */

/**
 * Araç plakasını doğrular (yeni ve eski format)
 * @param plate - Araç plakası
 * @returns boolean - Geçerli ise true
 */
export function validateVehiclePlate(plate: string): boolean {
  const cleaned = plate.replace(/\s/g, '').toUpperCase();
  
  // Yeni format: 34 ABC 123 (2 rakam + 3 harf + 3 rakam)
  const newFormat = /^(0[1-9]|[1-7][0-9]|8[01])[A-Z]{3}[0-9]{3}$/;
  
  // Eski format: 34 A 1234 (2 rakam + 1-3 harf + 1-4 rakam)
  const oldFormat = /^(0[1-9]|[1-7][0-9]|8[01])[A-Z]{1,3}[0-9]{1,4}$/;
  
  // Diplomatik plaka: 34 CD 123 (CD harfleri)
  const diplomaticFormat = /^(0[1-9]|[1-7][0-9]|8[01])CD[0-9]{3}$/;
  
  // Resmi plaka: 34 D 1234 (D harfi)
  const officialFormat = /^(0[1-9]|[1-7][0-9]|8[01])D[0-9]{1,4}$/;
  
  return newFormat.test(cleaned) || 
         oldFormat.test(cleaned) || 
         diplomaticFormat.test(cleaned) || 
         officialFormat.test(cleaned);
}

/**
 * Plakayı standart formatta döndürür
 * @param plate - Araç plakası
 * @returns string - Formatlanmış plaka
 */
export function formatVehiclePlate(plate: string): string {
  if (!validateVehiclePlate(plate)) return plate;
  
  const cleaned = plate.replace(/\s/g, '').toUpperCase();
  
  // Yeni format: 34ABC123 -> 34 ABC 123
  if (/^[0-9]{2}[A-Z]{3}[0-9]{3}$/.test(cleaned)) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
  }
  
  // Eski format: 34A1234 -> 34 A 1234
  const oldMatch = cleaned.match(/^([0-9]{2})([A-Z]{1,3})([0-9]{1,4})$/);
  if (oldMatch) {
    return `${oldMatch[1]} ${oldMatch[2]} ${oldMatch[3]}`;
  }
  
  return plate;
}

/**
 * Plaka türünü belirler
 * @param plate - Araç plakası
 * @returns string | null - Plaka türü
 */
export function getVehiclePlateType(plate: string): string | null {
  if (!validateVehiclePlate(plate)) return null;
  
  const cleaned = plate.replace(/\s/g, '').toUpperCase();
  
  // Diplomatik plaka
  if (/CD/.test(cleaned)) {
    return 'Diplomatik Araç';
  }
  
  // Resmi plaka
  if (/D[0-9]/.test(cleaned)) {
    return 'Resmi Araç';
  }
  
  // Yeni format
  if (/^[0-9]{2}[A-Z]{3}[0-9]{3}$/.test(cleaned)) {
    return 'Otomobil (Yeni Format)';
  }
  
  // Eski format - harf sayısına göre
  const letterCount = cleaned.match(/[A-Z]/g)?.length || 0;
  
  if (letterCount === 1) {
    return 'Otomobil (Eski Format)';
  } else if (letterCount === 2) {
    return 'Minibüs/Kamyonet';
  } else if (letterCount === 3) {
    return 'Otobüs/Kamyon';
  }
  
  return 'Bilinmeyen Araç Türü';
}

/**
 * Plakadan il kodunu çıkarır
 * @param plate - Araç plakası
 * @returns string | null - İl kodu
 */
export function getProvinceCodeFromPlate(plate: string): string | null {
  if (!validateVehiclePlate(plate)) return null;
  
  const cleaned = plate.replace(/\s/g, '').toUpperCase();
  return cleaned.slice(0, 2);
}

/**
 * Test amaçlı geçerli plaka oluşturur
 * @param provinceCode - İl kodu (01-81)
 * @param format - Plaka formatı
 * @returns string - Geçerli plaka
 */
export function generateVehiclePlate(
  provinceCode?: string,
  format: 'new' | 'old' | 'diplomatic' | 'official' = 'new'
): string {
  let province: string;
  
  if (provinceCode) {
    const code = parseInt(provinceCode);
    if (code < 1 || code > 81) {
      throw new Error('Geçersiz il kodu. 1-81 arası olmalı.');
    }
    province = provinceCode.padStart(2, '0');
  } else {
    // Rastgele il kodu (1-81)
    const randomProvince = Math.floor(Math.random() * 81) + 1;
    province = randomProvince.toString().padStart(2, '0');
  }
  
  switch (format) {
    case 'new':
      // 34 ABC 123 formatı
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const randomLetters = Array.from({length: 3}, () => 
        letters[Math.floor(Math.random() * letters.length)]
      ).join('');
      const randomNumbers = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `${province} ${randomLetters} ${randomNumbers}`;
    
    case 'old':
      // 34 A 1234 formatı
      const singleLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
      const oldNumbers = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return `${province} ${singleLetter} ${oldNumbers}`;
    
    case 'diplomatic':
      // 34 CD 123 formatı
      const dipNumbers = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `${province} CD ${dipNumbers}`;
    
    case 'official':
      // 34 D 1234 formatı
      const offNumbers = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return `${province} D ${offNumbers}`;
    
    default:
      return generateVehiclePlate(provinceCode, 'new');
  }
}