/**
 * Türkiye IBAN doğrulama ve formatlama
 */

/**
 * IBAN numarasını doğrular (Türkiye için)
 * @param iban - IBAN numarası
 * @returns boolean - Geçerli ise true
 */
export function validateIban(iban: string): boolean {
  // Temizle: boşluk ve tire kaldır
  const cleaned = iban.replace(/[\s\-]/g, '').toUpperCase();
  
  // Türkiye IBAN formatı: TR + 2 kontrol hanesi + 24 hane = 26 karakter
  if (cleaned.length !== 26) return false;
  
  // TR ile başlamalı
  if (!cleaned.startsWith('TR')) return false;
  
  // Geri kalan 24 karakter sadece rakam olmalı
  const digits = cleaned.slice(2);
  if (!/^\d{24}$/.test(digits)) return false;
  
  // IBAN kontrol algoritması (mod 97)
  return calculateIbanChecksum(cleaned) === 1;
}

/**
 * IBAN kontrol toplamını hesaplar
 * @param iban - IBAN numarası
 * @returns number - Kontrol toplamı
 */
function calculateIbanChecksum(iban: string): number {
  // IBAN'ı yeniden düzenle: ilk 4 karakteri sona taşı
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  
  // Harfleri sayıya çevir (A=10, B=11, ..., Z=35)
  let numericString = '';
  for (const char of rearranged) {
    if (/\d/.test(char)) {
      numericString += char;
    } else {
      numericString += (char.charCodeAt(0) - 55).toString();
    }
  }
  
  // Mod 97 hesapla (büyük sayılar için parça parça)
  let remainder = 0;
  for (let i = 0; i < numericString.length; i++) {
    remainder = (remainder * 10 + parseInt(numericString[i])) % 97;
  }
  
  return remainder;
}

/**
 * IBAN numarasını formatlar
 * @param iban - IBAN numarası
 * @param withSpaces - Boşluklarla formatla
 * @returns string - Formatlanmış IBAN
 */
export function formatIban(iban: string, withSpaces: boolean = true): string {
  const cleaned = iban.replace(/[\s\-]/g, '').toUpperCase();
  
  if (!validateIban(cleaned)) {
    return iban; // Geçersizse orijinalini döndür
  }
  
  if (withSpaces) {
    // 4'erli gruplar halinde formatla
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
  }
  
  return cleaned;
}

/**
 * IBAN'dan banka kodunu çıkarır
 * @param iban - IBAN numarası
 * @returns string | null - Banka kodu veya null
 */
export function getBankCodeFromIban(iban: string): string | null {
  if (!validateIban(iban)) return null;
  
  const cleaned = iban.replace(/[\s\-]/g, '').toUpperCase();
  // Türkiye IBAN'ında banka kodu 5. karakterden itibaren 5 haneli
  return cleaned.slice(4, 9);
}

/**
 * Banka kodundan banka adını döndürür (başlıca bankalar)
 * @param bankCode - 5 haneli banka kodu
 * @returns string | null - Banka adı veya null
 */
export function getBankName(bankCode: string): string | null {
  const bankNames: Record<string, string> = {
    '00001': 'Türkiye Cumhuriyet Merkez Bankası',
    '00010': 'T.C. Ziraat Bankası A.Ş.',
    '00012': 'Türkiye Halk Bankası A.Ş.',
    '00015': 'Türkiye Vakıflar Bankası T.A.O.',
    '00032': 'Türk Ekonomi Bankası A.Ş.',
    '00046': 'Akbank T.A.Ş.',
    '00062': 'Türkiye Garanti Bankası A.Ş.',
    '00064': 'Türkiye İş Bankası A.Ş.',
    '00067': 'Yapı ve Kredi Bankası A.Ş.',
    '00099': 'İNG Bank A.Ş.',
    '00103': 'Fibabanka A.Ş.',
    '00111': 'QNB Finansbank A.Ş.',
    '00123': 'HSBC Bank A.Ş.',
    '00124': 'Denizbank A.Ş.',
    '00134': 'Anadolubank A.Ş.',
    '00135': 'Kuveyt Türk Katılım Bankası A.Ş.',
    '00143': 'Şekerbank T.A.Ş.',
    '00146': 'Odea Bank A.Ş.',
    '00149': 'ICBC Turkey Bank A.Ş.',
    '00203': 'Türkiye Kalkınma Bankası A.Ş.',
    '00205': 'Vakıf Katılım Bankası A.Ş.',
    '00206': 'Türkiye Finans Katılım Bankası A.Ş.',
    '00208': 'Ziraat Katılım Bankası A.Ş.',
    '00209': 'Albaraka Türk Katılım Bankası A.Ş.'
  };
  
  return bankNames[bankCode] || null;
}