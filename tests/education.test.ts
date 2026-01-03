import { gradeToLetter, letterToGrade, calculateGPA } from '../src/education';

describe('Education Tests', () => {
  test('sayısal notu harf notuna çevirir', () => {
    expect(gradeToLetter(95)).toBe('AA');
    expect(gradeToLetter(87)).toBe('BA');
    expect(gradeToLetter(82)).toBe('BB');
    expect(gradeToLetter(77)).toBe('CB');
    expect(gradeToLetter(72)).toBe('CC');
    expect(gradeToLetter(67)).toBe('DC');
    expect(gradeToLetter(62)).toBe('DD');
    expect(gradeToLetter(55)).toBe('FD');
    expect(gradeToLetter(45)).toBe('FF');
  });

  test('harf notunu sayısal aralığa çevirir', () => {
    const aa = letterToGrade('AA');
    expect(aa.min).toBe(90);
    expect(aa.max).toBe(100);
    expect(aa.gpa).toBe(4.0);
    expect(aa.description).toBe('Mükemmel');

    const bb = letterToGrade('BB');
    expect(bb.min).toBe(80);
    expect(bb.max).toBe(84);
    expect(bb.gpa).toBe(3.0);
  });

  test('GPA hesaplama', () => {
    // Sayısal notlarla
    expect(calculateGPA([90, 85, 80])).toBe(3.5); // AA, BA, BB = 4.0, 3.5, 3.0
    
    // Harf notlarıyla
    expect(calculateGPA(['AA', 'BA', 'BB'])).toBe(3.5);
    
    // Kredili hesaplama
    expect(calculateGPA([90, 80], [3, 2])).toBe(3.6); // (4.0*3 + 3.0*2) / 5 = 18/5 = 3.6
  });

  test('geçersiz değerler için hata fırlatır', () => {
    expect(() => gradeToLetter(101)).toThrow('Not 0-100 arasında olmalıdır');
    expect(() => gradeToLetter(-1)).toThrow('Not 0-100 arasında olmalıdır');
    expect(() => letterToGrade('XY')).toThrow('Geçersiz harf notu');
  });
});