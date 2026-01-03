import { validateTurkishPostalCode, getProvinceFromPostalCode, generatePostalCode } from '../src/postal-code';

describe('Turkish Postal Code Tests', () => {
  test('geçerli posta kodlarını doğrular', () => {
    expect(validateTurkishPostalCode('34000')).toBe(true); // İstanbul
    expect(validateTurkishPostalCode('06000')).toBe(true); // Ankara
    expect(validateTurkishPostalCode('35000')).toBe(true); // İzmir
  });

  test('geçersiz posta kodlarını reddeder', () => {
    expect(validateTurkishPostalCode('1234')).toBe(false); // Çok kısa
    expect(validateTurkishPostalCode('123456')).toBe(false); // Çok uzun
    expect(validateTurkishPostalCode('00000')).toBe(false); // Geçersiz plaka
    expect(validateTurkishPostalCode('82000')).toBe(false); // Geçersiz plaka
    expect(validateTurkishPostalCode('abcde')).toBe(false); // Harf içeriyor
  });

  test('posta kodundan il bilgisi', () => {
    expect(getProvinceFromPostalCode('34000')).toBe('İstanbul');
    expect(getProvinceFromPostalCode('06000')).toBe('Ankara');
    expect(getProvinceFromPostalCode('35000')).toBe('İzmir');
    expect(getProvinceFromPostalCode('00000')).toBe(null);
  });

  test('posta kodu oluşturma', () => {
    const postal = generatePostalCode('34');
    expect(postal).toHaveLength(5);
    expect(postal.startsWith('34')).toBe(true);
    expect(validateTurkishPostalCode(postal)).toBe(true);
  });
});