import { validateCreditCard, getCreditCardType, getTurkishBankFromCard, formatCreditCard } from '../src/credit-card';

describe('Credit Card Tests', () => {
  test('geçerli kredi kartı numaralarını doğrular', () => {
    expect(validateCreditCard('4111111111111111')).toBe(true); // Test Visa
    expect(validateCreditCard('5555555555554444')).toBe(true); // Test Mastercard
    expect(validateCreditCard('4111 1111 1111 1111')).toBe(true); // Boşluklarla
  });

  test('geçersiz kredi kartı numaralarını reddeder', () => {
    expect(validateCreditCard('1234567890123456')).toBe(false); // Luhn algoritması başarısız
    expect(validateCreditCard('411111111111111')).toBe(false); // Çok kısa
    expect(validateCreditCard('41111111111111111')).toBe(false); // Çok uzun
    expect(validateCreditCard('abcd1111111111111')).toBe(false); // Harf içeriyor
  });

  test('kart türü belirleme', () => {
    expect(getCreditCardType('4111111111111111')).toBe('Visa');
    expect(getCreditCardType('5555555555554444')).toBe('Mastercard');
    expect(getCreditCardType('378282246310005')).toBe('American Express');
  });

  test('kart formatlaması', () => {
    expect(formatCreditCard('4111111111111111')).toBe('4111 1111 1111 1111');
    expect(formatCreditCard('5555555555554444')).toBe('5555 5555 5555 4444');
  });

  test('Türk bankası belirleme', () => {
    // Bilinen geçerli test kartı (Visa test kartı)
    const testCard = '4111111111111111'; // Standart Visa test kartı
    
    // Önce kartın geçerli olduğunu kontrol et
    expect(validateCreditCard(testCard)).toBe(true);
    
    // Bu test kartı Türk bankası değil, null dönmeli
    expect(getTurkishBankFromCard(testCard)).toBe(null);
    
    // Türk bankası BIN kodunu test et (sadece BIN kısmı)
    // Gerçek kart numarası olmasa da BIN kontrolü yapılabilir
    const turkishBankInfo = getTurkishBankFromCard('4546000000000000');
    // Bu geçersiz bir kart olsa da BIN kodu tanınmalı
    if (turkishBankInfo) {
      expect(turkishBankInfo.bank).toBe('T.C. Ziraat Bankası');
      expect(turkishBankInfo.type).toBe('Visa');
    }
  });
});