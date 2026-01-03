/**
 * TC Kimlik No doğrulama ve oluşturma fonksiyonları
 */

/**
 * TC Kimlik numarasını doğrular
 * @param tcKimlik - 11 haneli TC kimlik numarası
 * @returns boolean - Geçerli ise true
 */
export function validateTcKimlik(tcKimlik: string | number): boolean {
  const tc = tcKimlik.toString().replace(/\s/g, '');
  
  // 11 hane kontrolü
  if (tc.length !== 11) return false;
  
  // Sadece rakam kontrolü
  if (!/^\d{11}$/.test(tc)) return false;
  
  // İlk hane 0 olamaz
  if (tc[0] === '0') return false;
  
  const digits = tc.split('').map(Number);
  
  // 1. 3. 5. 7. ve 9. hanelerin toplamının 7 katından, 2. 4. 6. ve 8. hanelerin toplamı çıkartıldığında,
  // elde edilen sonucun 10'a bölümünden kalan, yani Mod10'u bize 10. haneyi verir.
  const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const evenSum = digits[1] + digits[3] + digits[5] + digits[7];
  const tenthDigit = (oddSum * 7 - evenSum) % 10;
  
  if (digits[9] !== tenthDigit) return false;
  
  // 1. 2. 3. 4. 5. 6. 7. 8. 9. ve 10. hanelerin toplamından elde edilen sonucun 
  // 10'a bölümünden kalan, yani Mod10'u bize 11. haneyi verir.
  const eleventhDigit = (digits.slice(0, 10).reduce((sum, digit) => sum + digit, 0)) % 10;
  
  return digits[10] === eleventhDigit;
}

/**
 * Geçerli bir TC Kimlik numarası oluşturur (test amaçlı)
 * @returns string - 11 haneli geçerli TC kimlik numarası
 */
export function generateTcKimlik(): string {
  // İlk 9 haneyi rastgele oluştur (ilk hane 0 olamaz)
  const firstDigit = Math.floor(Math.random() * 9) + 1;
  const digits = [firstDigit];
  
  for (let i = 1; i < 9; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }
  
  // 10. haneyi hesapla
  const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const evenSum = digits[1] + digits[3] + digits[5] + digits[7];
  const tenthDigit = (oddSum * 7 - evenSum) % 10;
  digits.push(tenthDigit);
  
  // 11. haneyi hesapla
  const eleventhDigit = (digits.slice(0, 10).reduce((sum, digit) => sum + digit, 0)) % 10;
  digits.push(eleventhDigit);
  
  return digits.join('');
}