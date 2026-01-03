import { getOperatorCodes, getEmergencyNumbers, getSMSCodes } from '../src/operator-codes';

describe('Operator Codes Tests', () => {
  test('operatör kodları', () => {
    const turkcell = getOperatorCodes('Turkcell');
    expect(turkcell?.name).toBe('Turkcell');
    expect(turkcell?.customerService).toBe('444 0 532');
    expect(turkcell?.serviceCodes['*123#']).toBe('Bakiye Sorgulama');
    
    const vodafone = getOperatorCodes('Vodafone');
    expect(vodafone?.name).toBe('Vodafone Türkiye');
    expect(vodafone?.customerService).toBe('444 0 542');
    
    // Küçük harf
    expect(getOperatorCodes('turkcell')?.name).toBe('Turkcell');
    
    // Geçersiz operatör
    expect(getOperatorCodes('BilinmeyenOperator')).toBe(null);
  });

  test('acil durum numaraları', () => {
    const allEmergency = getEmergencyNumbers();
    expect(allEmergency.length).toBeGreaterThan(10);
    
    // Polis kontrolü
    const polis = allEmergency.find(num => num.number === '155');
    expect(polis?.description).toBe('Polis İmdat');
    expect(polis?.category).toBe('Acil');
    expect(polis?.available24h).toBe(true);
    
    // Kategori filtresi
    const acilNums = getEmergencyNumbers('Acil');
    expect(acilNums.length).toBeGreaterThan(5);
    expect(acilNums.every(num => num.category === 'Acil')).toBe(true);
  });

  test('SMS kodları', () => {
    const allSMS = getSMSCodes();
    expect(Array.isArray(allSMS)).toBe(true);
    expect(allSMS.length).toBeGreaterThan(0);
    
    // Belirli servis
    const weather = getSMSCodes('hava_durumu');
    expect(weather?.code).toBe('6245');
    expect(weather?.description).toContain('Hava Durumu');
    
    // Geçersiz servis
    expect(getSMSCodes('gecersiz_servis')).toBe(null);
  });

  test('operatör servis kodları yapısı', () => {
    const turkcell = getOperatorCodes('Turkcell');
    
    expect(turkcell).toHaveProperty('name');
    expect(turkcell).toHaveProperty('serviceCodes');
    expect(turkcell).toHaveProperty('customerService');
    expect(turkcell).toHaveProperty('website');
    
    // Servis kodları boş olmamalı
    expect(Object.keys(turkcell!.serviceCodes).length).toBeGreaterThan(5);
  });
});