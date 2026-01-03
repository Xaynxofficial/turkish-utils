import { validateVehiclePlate, formatVehiclePlate, getVehiclePlateType } from '../src/vehicle-plate';

describe('Vehicle Plate Tests', () => {
  test('geçerli araç plakalarını doğrular', () => {
    expect(validateVehiclePlate('34 ABC 123')).toBe(true); // Yeni format
    expect(validateVehiclePlate('34ABC123')).toBe(true); // Boşluksuz yeni format
    expect(validateVehiclePlate('34 A 1234')).toBe(true); // Eski format
    expect(validateVehiclePlate('34 CD 123')).toBe(true); // Diplomatik
    expect(validateVehiclePlate('34 D 1234')).toBe(true); // Resmi
  });

  test('geçersiz araç plakalarını reddeder', () => {
    expect(validateVehiclePlate('00 ABC 123')).toBe(false); // Geçersiz il kodu
    expect(validateVehiclePlate('82 ABC 123')).toBe(false); // Geçersiz il kodu
    expect(validateVehiclePlate('34 123 ABC')).toBe(false); // Yanlış format
    expect(validateVehiclePlate('34 ABCD 123')).toBe(false); // Çok fazla harf
  });

  test('plaka formatlaması', () => {
    expect(formatVehiclePlate('34ABC123')).toBe('34 ABC 123');
    expect(formatVehiclePlate('34A1234')).toBe('34 A 1234');
    expect(formatVehiclePlate('34CD123')).toBe('34 CD 123');
  });

  test('plaka türü belirleme', () => {
    expect(getVehiclePlateType('34 ABC 123')).toBe('Otomobil (Yeni Format)');
    expect(getVehiclePlateType('34 A 1234')).toBe('Otomobil (Eski Format)');
    expect(getVehiclePlateType('34 CD 123')).toBe('Diplomatik Araç');
    expect(getVehiclePlateType('34 D 1234')).toBe('Resmi Araç');
  });
});