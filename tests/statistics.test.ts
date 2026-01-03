import { getTuikRegionCode, getPopulationData, getAllTuikRegions } from '../src/statistics';

describe('Statistics Tests', () => {
  test('il adından TÜİK bölge kodu', () => {
    expect(getTuikRegionCode('İstanbul')).toBe('TR1');
    expect(getTuikRegionCode('Ankara')).toBe('TR51');
    expect(getTuikRegionCode('İzmir')).toBe('TR31');
    expect(getTuikRegionCode('Bursa')).toBe('TR41');
    
    // Küçük harf
    expect(getTuikRegionCode('istanbul')).toBe('TR1');
    
    // Geçersiz il
    expect(getTuikRegionCode('Atlantis')).toBe(null);
  });

  test('nüfus bilgisi', () => {
    // Tek il bölgeleri
    const istanbulPop = getPopulationData('İstanbul');
    expect(istanbulPop).toBe(15840900);
    
    const ankaraPop = getPopulationData('Ankara');
    expect(ankaraPop).toBe(5747000);
    
    // Çoklu il bölgesi (tahmini)
    const bursaPop = getPopulationData('Bursa');
    expect(bursaPop).toBeGreaterThan(0);
    
    // Geçersiz il
    expect(getPopulationData('Atlantis')).toBe(null);
  });

  test('tüm TÜİK bölgeleri', () => {
    const regions = getAllTuikRegions();
    expect(regions.length).toBeGreaterThan(20);
    
    // İstanbul bölgesi kontrolü
    const istanbul = regions.find(r => r.code === 'TR1');
    expect(istanbul?.name).toBe('İstanbul');
    expect(istanbul?.provinces).toContain('İstanbul');
  });

  test('bölge kodu formatı', () => {
    const regions = getAllTuikRegions();
    
    regions.forEach(region => {
      // TÜİK kodları TR ile başlamalı
      expect(region.code).toMatch(/^TR/);
      
      // Provinces array boş olmamalı
      expect(region.provinces.length).toBeGreaterThan(0);
    });
  });
});