import { validateTaxNumber, generateTaxNumber } from '../src/tax-number';

describe('Tax Number Tests', () => {
  test('geçerli vergi numaralarını doğrular', () => {
    // Oluşturulan VKN geçerli olmalı
    const generated = generateTaxNumber();
    expect(validateTaxNumber(generated)).toBe(true);
  });

  test('geçersiz vergi numaralarını reddeder', () => {
    expect(validateTaxNumber('123')).toBe(false); // Çok kısa
    expect(validateTaxNumber('12345678901')).toBe(false); // Çok uzun
    expect(validateTaxNumber('abcdefghij')).toBe(false); // Harf içeriyor
    
    // Oluşturulan geçerli VKN'yi test et
    const validVkn = generateTaxNumber();
    expect(validateTaxNumber(validVkn)).toBe(true);
  });

  test('VKN oluşturma fonksiyonu çalışır', () => {
    const vkn = generateTaxNumber();
    expect(vkn).toHaveLength(10);
    expect(/^\d{10}$/.test(vkn)).toBe(true);
    expect(validateTaxNumber(vkn)).toBe(true);
  });
});