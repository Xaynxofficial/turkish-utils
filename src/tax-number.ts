/**
 * Vergi Kimlik Numarası (VKN) doğrulama fonksiyonları
 */

/**
 * Vergi Kimlik Numarasını doğrular
 * @param vkn - 10 haneli vergi kimlik numarası
 * @returns boolean - Geçerli ise true
 */
export function validateTaxNumber(vkn: string | number): boolean {
  const taxNumber = vkn.toString().replace(/\s/g, '');
  
  // 10 hane kontrolü
  if (taxNumber.length !== 10) return false;
  
  // Sadece rakam kontrolü
  if (!/^\d{10}$/.test(taxNumber)) return false;
  
  const digits = taxNumber.split('').map(Number);
  
  // VKN algoritması
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let temp = (digits[i] + (9 - i)) % 10;
    if (temp !== 0) {
      temp = (temp * Math.pow(2, 9 - i)) % 9;
      if (temp === 0) temp = 9;
    }
    sum += temp;
  }
  
  const checkDigit = (10 - (sum % 10)) % 10;
  return digits[9] === checkDigit;
}

/**
 * Geçerli bir VKN oluşturur (test amaçlı)
 * @returns string - 10 haneli geçerli VKN
 */
export function generateTaxNumber(): string {
  // İlk 9 haneyi rastgele oluştur
  const digits = [];
  for (let i = 0; i < 9; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }
  
  // 10. haneyi hesapla
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let temp = (digits[i] + (9 - i)) % 10;
    if (temp !== 0) {
      temp = (temp * Math.pow(2, 9 - i)) % 9;
      if (temp === 0) temp = 9;
    }
    sum += temp;
  }
  
  const checkDigit = (10 - (sum % 10)) % 10;
  digits.push(checkDigit);
  
  return digits.join('');
}