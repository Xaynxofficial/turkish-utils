import { validateTcKimlik, generateTcKimlik } from '../src/tc-kimlik';

describe('TC Kimlik Tests', () => {
  test('geçerli TC kimlik numaralarını doğrular', () => {
    // Oluşturulan TC kimlik geçerli olmalı
    const generated = generateTcKimlik();
    expect(validateTcKimlik(generated)).toBe(true);
  });

  test('geçersiz TC kimlik numaralarını reddeder', () => {
    expect(validateTcKimlik('123')).toBe(false); // Çok kısa
    expect(validateTcKimlik('1234567890123')).toBe(false); // Çok uzun
    expect(validateTcKimlik('01234567890')).toBe(false); // 0 ile başlıyor
    expect(validateTcKimlik('abcdefghijk')).toBe(false); // Harf içeriyor
    expect(validateTcKimlik('12345678901')).toBe(false); // Geçersiz algoritma
  });

  test('TC kimlik oluşturma fonksiyonu çalışır', () => {
    const tc = generateTcKimlik();
    expect(tc).toHaveLength(11);
    expect(/^\d{11}$/.test(tc)).toBe(true);
    expect(validateTcKimlik(tc)).toBe(true);
  });
});