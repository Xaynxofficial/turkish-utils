import { formatTurkishLira, numberToWords, amountToWords, ordinalToWords } from '../src/currency';

describe('Currency Tests', () => {
  test('Türk Lirası formatı', () => {
    expect(formatTurkishLira(1500)).toBe('1.500,00 TL');
    expect(formatTurkishLira(1500.50)).toBe('1.500,50 TL');
    expect(formatTurkishLira(1000000)).toBe('1.000.000,00 TL');
    
    // Seçenekler ile
    expect(formatTurkishLira(1500, { showSymbol: false })).toBe('1.500,00');
    expect(formatTurkishLira(1500, { showDecimals: false })).toBe('1.500 TL');
  });

  test('negatif sayılar', () => {
    expect(formatTurkishLira(-1500)).toBe('-1.500,00 TL');
  });

  test('sayıyı yazıya çevirme', () => {
    expect(numberToWords(0)).toBe('sıfır');
    expect(numberToWords(1)).toBe('bir');
    expect(numberToWords(10)).toBe('on');
    expect(numberToWords(11)).toBe('onbir');
    expect(numberToWords(20)).toBe('yirmi');
    expect(numberToWords(100)).toBe('yüz');
    expect(numberToWords(1000)).toBe('bin');
    expect(numberToWords(1500)).toBe('bin beşyüz');
    expect(numberToWords(2023)).toBe('ikibin yirmiüç');
  });

  test('para miktarını yazıya çevirme', () => {
    expect(amountToWords(1500.75, 'TL')).toBe('bin beşyüz Türk Lirası yetmişbeş Kuruş');
    expect(amountToWords(100.50, 'USD')).toBe('yüz Dolar elli Sent');
    expect(amountToWords(250, 'EUR')).toBe('ikiyüzelli Euro');
  });

  test('sıra sayılarını yazıya çevirme', () => {
    expect(ordinalToWords(1)).toBe('birinci');
    expect(ordinalToWords(2)).toBe('ikinci');
    expect(ordinalToWords(3)).toBe('üçüncü');
    expect(ordinalToWords(21)).toBe('yirmibirinci');
  });

  test('negatif sayıları yazıya çevirme', () => {
    expect(numberToWords(-100)).toBe('eksi yüz');
  });
});