import { validateTurkishPassport, getPassportType, generateTurkishPassport } from '../src/passport';

describe('Turkish Passport Tests', () => {
  test('geçerli pasaport numaralarını doğrular', () => {
    expect(validateTurkishPassport('U12345678')).toBe(true); // Yeni format
    expect(validateTurkishPassport('D12345678')).toBe(true); // Diplomatik
    expect(validateTurkishPassport('S12345678')).toBe(true); // Hizmet
    expect(validateTurkishPassport('A12345678')).toBe(true); // Eski format
  });

  test('geçersiz pasaport numaralarını reddeder', () => {
    expect(validateTurkishPassport('123456789')).toBe(false); // Harf yok
    expect(validateTurkishPassport('U1234567')).toBe(false); // Çok kısa
    expect(validateTurkishPassport('U123456789')).toBe(false); // Çok uzun
    expect(validateTurkishPassport('1U2345678')).toBe(false); // Yanlış format
  });

  test('pasaport türünü belirler', () => {
    expect(getPassportType('U12345678')).toBe('Umumi (Genel) Pasaport');
    expect(getPassportType('D12345678')).toBe('Diplomatik Pasaport');
    expect(getPassportType('S12345678')).toBe('Hizmet Pasaportu');
    expect(getPassportType('A12345678')).toBe('Eski Format Pasaport');
    expect(getPassportType('invalid')).toBe(null);
  });

  test('pasaport oluşturma fonksiyonu çalışır', () => {
    const passport = generateTurkishPassport('general');
    expect(passport).toHaveLength(9);
    expect(passport.startsWith('U')).toBe(true);
    expect(validateTurkishPassport(passport)).toBe(true);
  });
});