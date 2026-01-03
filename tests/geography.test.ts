import { coordinatesInTurkey, getRegionFromCoords, getNearestCity, calculateDistance } from '../src/geography';

describe('Geography Tests', () => {
  test('Türkiye sınırları içinde koordinat kontrolü', () => {
    // İstanbul
    expect(coordinatesInTurkey(41.0082, 28.9784)).toBe(true);
    
    // Ankara
    expect(coordinatesInTurkey(39.9334, 32.8597)).toBe(true);
    
    // Türkiye dışı (Paris)
    expect(coordinatesInTurkey(48.8566, 2.3522)).toBe(false);
    
    // Türkiye dışı (New York)
    expect(coordinatesInTurkey(40.7128, -74.0060)).toBe(false);
  });

  test('koordinatlardan bölge belirleme', () => {
    // İstanbul - Marmara
    expect(getRegionFromCoords(41.0082, 28.9784)).toBe('Marmara Bölgesi');
    
    // Ankara - İç Anadolu
    expect(getRegionFromCoords(39.9334, 32.8597)).toBe('İç Anadolu Bölgesi');
    
    // İzmir - Ege
    expect(getRegionFromCoords(38.4237, 27.1428)).toBe('Ege Bölgesi');
    
    // Türkiye dışı
    expect(getRegionFromCoords(48.8566, 2.3522)).toBe(null);
  });

  test('en yakın şehir bulma', () => {
    // İstanbul yakını
    const nearestToIstanbul = getNearestCity(41.0, 29.0);
    expect(nearestToIstanbul?.city).toBe('İstanbul');
    expect(nearestToIstanbul?.distance).toBeLessThan(50);
    
    // Ankara yakını
    const nearestToAnkara = getNearestCity(40.0, 32.8);
    expect(nearestToAnkara?.city).toBe('Ankara');
  });

  test('mesafe hesaplama', () => {
    // İstanbul - Ankara arası (yaklaşık 350 km)
    const distance = calculateDistance(41.0082, 28.9784, 39.9334, 32.8597);
    expect(distance).toBeGreaterThan(300);
    expect(distance).toBeLessThan(400);
    
    // Aynı nokta
    expect(calculateDistance(41.0, 28.9, 41.0, 28.9)).toBe(0);
  });

  test('Türkiye dışı koordinatlar için null döner', () => {
    expect(getNearestCity(48.8566, 2.3522)).toBe(null); // Paris
    expect(getRegionFromCoords(40.7128, -74.0060)).toBe(null); // New York
  });
});