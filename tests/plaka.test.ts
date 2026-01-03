import { plateToCity, cityToPlate, getAllPlates } from '../src/plaka';

describe('Plaka Tests', () => {
  test('plaka kodundan şehir adını döndürür', () => {
    expect(plateToCity('34')).toBe('İstanbul');
    expect(plateToCity('06')).toBe('Ankara');
    expect(plateToCity('35')).toBe('İzmir');
    expect(plateToCity('1')).toBe('Adana'); // Tek haneli
    expect(plateToCity('01')).toBe('Adana'); // Sıfır ile başlayan
  });

  test('geçersiz plaka kodları için null döndürür', () => {
    expect(plateToCity('00')).toBe(null);
    expect(plateToCity('82')).toBe(null);
    expect(plateToCity('999')).toBe(null);
  });

  test('şehir adından plaka kodunu döndürür', () => {
    expect(cityToPlate('İstanbul')).toBe('34');
    expect(cityToPlate('Ankara')).toBe('06');
    expect(cityToPlate('İzmir')).toBe('35');
    expect(cityToPlate('İSTANBUL')).toBe('34'); // Büyük harf
  });

  test('geçersiz şehir adları için null döndürür', () => {
    expect(cityToPlate('Atlantis')).toBe(null);
    expect(cityToPlate('')).toBe(null);
  });

  test('tüm plaka listesini döndürür', () => {
    const plates = getAllPlates();
    expect(plates).toHaveLength(81);
    expect(plates[0]).toEqual({ code: '01', city: 'Adana' });
    expect(plates.find(p => p.city === 'İstanbul')).toEqual({ code: '34', city: 'İstanbul' });
  });
});