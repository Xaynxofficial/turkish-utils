import { formatTurkishDate, getMonthFromTurkishName, getDayFromTurkishName } from '../src/date';

describe('Turkish Date Tests', () => {
  test('Türkçe tarih formatı', () => {
    const date = new Date(2023, 11, 25); // 25 Aralık 2023 Pazartesi
    
    expect(formatTurkishDate(date, 'long')).toContain('25 Aralık 2023');
    expect(formatTurkishDate(date, 'short')).toBe('25 Ara 2023');
    expect(formatTurkishDate(date, 'numeric')).toBe('25.12.2023');
  });

  test('Türkçe ay adından numara', () => {
    expect(getMonthFromTurkishName('Ocak')).toBe(0);
    expect(getMonthFromTurkishName('Aralık')).toBe(11);
    expect(getMonthFromTurkishName('Oca')).toBe(0);
    expect(getMonthFromTurkishName('Geçersiz')).toBe(null);
  });

  test('Türkçe gün adından numara', () => {
    expect(getDayFromTurkishName('Pazar')).toBe(0);
    expect(getDayFromTurkishName('Cumartesi')).toBe(6);
    expect(getDayFromTurkishName('Paz')).toBe(0);
    expect(getDayFromTurkishName('Geçersiz')).toBe(null);
  });
});