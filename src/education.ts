/**
 * Türkiye eğitim sistemi - not dönüşümleri ve GPA hesaplamaları
 */

/**
 * 100'lük sistemden harf notuna çevirir
 * @param grade - 0-100 arası not
 * @returns string - Harf notu
 */
export function gradeToLetter(grade: number): string {
  if (grade < 0 || grade > 100) {
    throw new Error('Not 0-100 arasında olmalıdır');
  }
  
  if (grade >= 90) return 'AA';
  if (grade >= 85) return 'BA';
  if (grade >= 80) return 'BB';
  if (grade >= 75) return 'CB';
  if (grade >= 70) return 'CC';
  if (grade >= 65) return 'DC';
  if (grade >= 60) return 'DD';
  if (grade >= 50) return 'FD';
  return 'FF';
}

/**
 * Harf notundan sayısal aralığa çevirir
 * @param letter - Harf notu
 * @returns object - Not aralığı ve 4.0 karşılığı
 */
export function letterToGrade(letter: string): {
  min: number;
  max: number;
  gpa: number;
  description: string;
} {
  const letterGrades: Record<string, any> = {
    'AA': { min: 90, max: 100, gpa: 4.0, description: 'Mükemmel' },
    'BA': { min: 85, max: 89, gpa: 3.5, description: 'Çok İyi' },
    'BB': { min: 80, max: 84, gpa: 3.0, description: 'İyi' },
    'CB': { min: 75, max: 79, gpa: 2.5, description: 'Orta Üstü' },
    'CC': { min: 70, max: 74, gpa: 2.0, description: 'Orta' },
    'DC': { min: 65, max: 69, gpa: 1.5, description: 'Geçer' },
    'DD': { min: 60, max: 64, gpa: 1.0, description: 'Şartlı Geçer' },
    'FD': { min: 50, max: 59, gpa: 0.5, description: 'Başarısız' },
    'FF': { min: 0, max: 49, gpa: 0.0, description: 'Başarısız' }
  };
  
  const grade = letterGrades[letter.toUpperCase()];
  if (!grade) {
    throw new Error('Geçersiz harf notu');
  }
  
  return grade;
}

/**
 * 4.0 sisteminde GPA hesaplar
 * @param grades - Not listesi (sayısal veya harf)
 * @param credits - Kredi listesi (isteğe bağlı)
 * @returns number - GPA değeri
 */
export function calculateGPA(
  grades: (number | string)[],
  credits?: number[]
): number {
  if (grades.length === 0) return 0;
  
  let totalPoints = 0;
  let totalCredits = 0;
  
  grades.forEach((grade, index) => {
    const credit = credits ? credits[index] || 1 : 1;
    let gpaPoint: number;
    
    if (typeof grade === 'number') {
      // Sayısal notu harf notuna çevir, sonra GPA'ya
      const letter = gradeToLetter(grade);
      gpaPoint = letterToGrade(letter).gpa;
    } else {
      // Harf notunu direkt GPA'ya çevir
      gpaPoint = letterToGrade(grade).gpa;
    }
    
    totalPoints += gpaPoint * credit;
    totalCredits += credit;
  });
  
  return Math.round((totalPoints / totalCredits) * 100) / 100;
}

/**
 * Üniversite giriş puanı hesaplar (YKS benzeri)
 * @param scores - Test puanları
 * @returns object - Puan hesaplama sonucu
 */
export function calculateUniversityScore(scores: {
  tyt?: { turkish: number; math: number; science: number; social: number };
  ayt?: { math: number; science: number; turkish: number; social: number };
  ydt?: number;
}): {
  tytScore: number;
  aytScore: number;
  totalScore: number;
  ranking?: string;
} {
  let tytScore = 0;
  let aytScore = 0;
  
  // TYT hesaplama (Temel Yeterlilik Testi)
  if (scores.tyt) {
    const tytRaw = (
      scores.tyt.turkish * 1.33 +
      scores.tyt.math * 1.33 +
      scores.tyt.science * 1.33 +
      scores.tyt.social * 1.33
    );
    tytScore = Math.max(100, Math.min(500, 100 + (tytRaw * 4)));
  }
  
  // AYT hesaplama (Alan Yeterlilik Testi)
  if (scores.ayt) {
    const aytRaw = (
      scores.ayt.math * 3 +
      scores.ayt.science * 2.67 +
      scores.ayt.turkish * 2.67 +
      scores.ayt.social * 2.67
    );
    aytScore = Math.max(100, Math.min(500, 100 + (aytRaw * 3.6)));
  }
  
  const totalScore = tytScore + aytScore;
  
  // Başarı sıralaması
  let ranking = 'Düşük';
  if (totalScore >= 450) ranking = 'Çok Yüksek';
  else if (totalScore >= 400) ranking = 'Yüksek';
  else if (totalScore >= 350) ranking = 'Orta Üstü';
  else if (totalScore >= 300) ranking = 'Orta';
  
  return {
    tytScore: Math.round(tytScore),
    aytScore: Math.round(aytScore),
    totalScore: Math.round(totalScore),
    ranking
  };
}

/**
 * Lise not ortalaması hesaplar
 * @param grades - Ders notları
 * @param weights - Ders ağırlıkları (isteğe bağlı)
 * @returns object - Not ortalaması bilgileri
 */
export function calculateHighSchoolGPA(
  grades: Record<string, number>,
  weights?: Record<string, number>
): {
  gpa: number;
  letterGrade: string;
  status: string;
  subjects: Record<string, {grade: number, letter: string}>;
} {
  const subjects: Record<string, {grade: number, letter: string}> = {};
  let totalPoints = 0;
  let totalWeight = 0;
  
  Object.entries(grades).forEach(([subject, grade]) => {
    const weight = weights?.[subject] || 1;
    const letter = gradeToLetter(grade);
    
    subjects[subject] = { grade, letter };
    totalPoints += grade * weight;
    totalWeight += weight;
  });
  
  const gpa = totalPoints / totalWeight;
  const overallLetter = gradeToLetter(gpa);
  
  let status = 'Başarısız';
  if (gpa >= 50) status = 'Geçer';
  if (gpa >= 70) status = 'İyi';
  if (gpa >= 85) status = 'Çok İyi';
  if (gpa >= 90) status = 'Mükemmel';
  
  return {
    gpa: Math.round(gpa * 100) / 100,
    letterGrade: overallLetter,
    status,
    subjects
  };
}

/**
 * Türkiye'deki üniversite listesi (örnekler)
 * @returns Array - Üniversite listesi
 */
export function getUniversityList(): Array<{
  name: string;
  city: string;
  type: 'Devlet' | 'Vakıf' | 'Özel';
  founded: number;
  ranking?: number;
}> {
  return [
    { name: 'İstanbul Üniversitesi', city: 'İstanbul', type: 'Devlet', founded: 1453, ranking: 1 },
    { name: 'İstanbul Teknik Üniversitesi', city: 'İstanbul', type: 'Devlet', founded: 1773, ranking: 2 },
    { name: 'Orta Doğu Teknik Üniversitesi', city: 'Ankara', type: 'Devlet', founded: 1956, ranking: 3 },
    { name: 'Boğaziçi Üniversitesi', city: 'İstanbul', type: 'Devlet', founded: 1863, ranking: 4 },
    { name: 'Ankara Üniversitesi', city: 'Ankara', type: 'Devlet', founded: 1946, ranking: 5 },
    { name: 'Hacettepe Üniversitesi', city: 'Ankara', type: 'Devlet', founded: 1967, ranking: 6 },
    { name: 'Gazi Üniversitesi', city: 'Ankara', type: 'Devlet', founded: 1926, ranking: 7 },
    { name: 'Ege Üniversitesi', city: 'İzmir', type: 'Devlet', founded: 1955, ranking: 8 },
    { name: 'Marmara Üniversitesi', city: 'İstanbul', type: 'Devlet', founded: 1883, ranking: 9 },
    { name: 'Dokuz Eylül Üniversitesi', city: 'İzmir', type: 'Devlet', founded: 1982, ranking: 10 },
    { name: 'Koç Üniversitesi', city: 'İstanbul', type: 'Özel', founded: 1993, ranking: 11 },
    { name: 'Sabancı Üniversitesi', city: 'İstanbul', type: 'Özel', founded: 1994, ranking: 12 },
    { name: 'Bilkent Üniversitesi', city: 'Ankara', type: 'Özel', founded: 1984, ranking: 13 }
  ];
}

/**
 * Okul türlerini listeler
 * @returns Array - Okul türü listesi
 */
export function getSchoolTypes(): Array<{
  level: string;
  types: string[];
  duration: number;
}> {
  return [
    {
      level: 'Anaokulu',
      types: ['Devlet Anaokulu', 'Özel Anaokulu'],
      duration: 1
    },
    {
      level: 'İlkokul',
      types: ['Devlet İlkokulu', 'Özel İlkokul'],
      duration: 4
    },
    {
      level: 'Ortaokul',
      types: ['Devlet Ortaokulu', 'Özel Ortaokul', 'İmam Hatip Ortaokulu'],
      duration: 4
    },
    {
      level: 'Lise',
      types: [
        'Anadolu Lisesi',
        'Fen Lisesi',
        'Sosyal Bilimler Lisesi',
        'Güzel Sanatlar Lisesi',
        'Spor Lisesi',
        'Meslek Lisesi',
        'İmam Hatip Lisesi',
        'Özel Lise'
      ],
      duration: 4
    }
  ];
}