/**
 * TÜİK (Türkiye İstatistik Kurumu) kodları ve istatistikler
 */

// TÜİK İstatistiki Bölge Birimleri Sınıflandırması (İBBS)
const TUIK_REGIONS: Record<string, {
  code: string;
  name: string;
  provinces: string[];
  population?: number;
}> = {
  'TR1': {
    code: 'TR1',
    name: 'İstanbul',
    provinces: ['İstanbul'],
    population: 15840900
  },
  'TR21': {
    code: 'TR21', 
    name: 'Tekirdağ, Edirne, Kırklareli',
    provinces: ['Tekirdağ', 'Edirne', 'Kırklareli'],
    population: 1056000
  },
  'TR22': {
    code: 'TR22',
    name: 'Balıkesir, Çanakkale',
    provinces: ['Balıkesir', 'Çanakkale'],
    population: 1378000
  },
  'TR31': {
    code: 'TR31',
    name: 'İzmir',
    provinces: ['İzmir'],
    population: 4462000
  },
  'TR32': {
    code: 'TR32',
    name: 'Aydın, Denizli, Muğla',
    provinces: ['Aydın', 'Denizli', 'Muğla'],
    population: 2320000
  },
  'TR33': {
    code: 'TR33',
    name: 'Manisa, Afyonkarahisar, Kütahya, Uşak',
    provinces: ['Manisa', 'Afyonkarahisar', 'Kütahya', 'Uşak'],
    population: 2180000
  },
  'TR41': {
    code: 'TR41',
    name: 'Bursa, Eskişehir, Bilecik',
    provinces: ['Bursa', 'Eskişehir', 'Bilecik'],
    population: 3340000
  },
  'TR42': {
    code: 'TR42',
    name: 'Kocaeli, Sakarya, Düzce, Bolu, Yalova',
    provinces: ['Kocaeli', 'Sakarya', 'Düzce', 'Bolu', 'Yalova'],
    population: 2890000
  },
  'TR51': {
    code: 'TR51',
    name: 'Ankara',
    provinces: ['Ankara'],
    population: 5747000
  },
  'TR52': {
    code: 'TR52',
    name: 'Konya, Karaman',
    provinces: ['Konya', 'Karaman'],
    population: 2290000
  },
  'TR61': {
    code: 'TR61',
    name: 'Antalya, Isparta, Burdur',
    provinces: ['Antalya', 'Isparta', 'Burdur'],
    population: 2720000
  },
  'TR62': {
    code: 'TR62',
    name: 'Adana, Mersin',
    provinces: ['Adana', 'Mersin'],
    population: 3650000
  },
  'TR63': {
    code: 'TR63',
    name: 'Hatay, Kahramanmaraş, Osmaniye',
    provinces: ['Hatay', 'Kahramanmaraş', 'Osmaniye'],
    population: 3180000
  },
  'TR71': {
    code: 'TR71',
    name: 'Kırıkkale, Aksaray, Niğde, Nevşehir, Kırşehir',
    provinces: ['Kırıkkale', 'Aksaray', 'Niğde', 'Nevşehir', 'Kırşehir'],
    population: 1420000
  },
  'TR72': {
    code: 'TR72',
    name: 'Kayseri, Sivas, Yozgat',
    provinces: ['Kayseri', 'Sivas', 'Yozgat'],
    population: 2050000
  },
  'TR81': {
    code: 'TR81',
    name: 'Zonguldak, Karabük, Bartın',
    provinces: ['Zonguldak', 'Karabük', 'Bartın'],
    population: 810000
  },
  'TR82': {
    code: 'TR82',
    name: 'Kastamonu, Çankırı, Sinop',
    provinces: ['Kastamonu', 'Çankırı', 'Sinop'],
    population: 580000
  },
  'TR83': {
    code: 'TR83',
    name: 'Samsun, Tokat, Çorum, Amasya',
    provinces: ['Samsun', 'Tokat', 'Çorum', 'Amasya'],
    population: 2050000
  },
  'TR90': {
    code: 'TR90',
    name: 'Trabzon, Ordu, Giresun, Rize, Artvin, Gümüşhane',
    provinces: ['Trabzon', 'Ordu', 'Giresun', 'Rize', 'Artvin', 'Gümüşhane'],
    population: 2100000
  },
  'TRA1': {
    code: 'TRA1',
    name: 'Erzurum, Erzincan, Bayburt',
    provinces: ['Erzurum', 'Erzincan', 'Bayburt'],
    population: 950000
  },
  'TRA2': {
    code: 'TRA2',
    name: 'Ağrı, Kars, Iğdır, Ardahan',
    provinces: ['Ağrı', 'Kars', 'Iğdır', 'Ardahan'],
    population: 780000
  },
  'TRB1': {
    code: 'TRB1',
    name: 'Malatya, Elazığ, Bingöl, Tunceli',
    provinces: ['Malatya', 'Elazığ', 'Bingöl', 'Tunceli'],
    population: 1320000
  },
  'TRB2': {
    code: 'TRB2',
    name: 'Van, Muş, Bitlis, Hakkâri',
    provinces: ['Van', 'Muş', 'Bitlis', 'Hakkâri'],
    population: 1400000
  },
  'TRC1': {
    code: 'TRC1',
    name: 'Gaziantep, Adıyaman, Kilis',
    provinces: ['Gaziantep', 'Adıyaman', 'Kilis'],
    population: 2630000
  },
  'TRC2': {
    code: 'TRC2',
    name: 'Şanlıurfa, Diyarbakır',
    provinces: ['Şanlıurfa', 'Diyarbakır'],
    population: 3680000
  },
  'TRC3': {
    code: 'TRC3',
    name: 'Mardin, Batman, Şırnak, Siirt',
    provinces: ['Mardin', 'Batman', 'Şırnak', 'Siirt'],
    population: 1650000
  }
};

/**
 * İl adından TÜİK bölge kodunu döndürür
 * @param provinceName - İl adı
 * @returns string | null - TÜİK bölge kodu
 */
export function getTuikRegionCode(provinceName: string): string | null {
  const normalized = provinceName.toLowerCase().trim();
  
  for (const region of Object.values(TUIK_REGIONS)) {
    const found = region.provinces.find(province => 
      province.toLowerCase() === normalized ||
      province.toLowerCase().replace('i̇', 'i') === normalized ||
      normalized.replace('i̇', 'i') === province.toLowerCase()
    );
    if (found) {
      return region.code;
    }
  }
  
  return null;
}

/**
 * TÜİK bölge kodundan bölge bilgilerini döndürür
 * @param regionCode - TÜİK bölge kodu
 * @returns object | null - Bölge bilgileri
 */
export function getTuikRegionInfo(regionCode: string): typeof TUIK_REGIONS[string] | null {
  return TUIK_REGIONS[regionCode.toUpperCase()] || null;
}

/**
 * İl nüfus bilgisini döndürür (tahmini)
 * @param provinceName - İl adı
 * @returns number | null - Nüfus bilgisi
 */
export function getPopulationData(provinceName: string): number | null {
  const regionCode = getTuikRegionCode(provinceName);
  if (!regionCode) return null;
  
  const regionInfo = getTuikRegionInfo(regionCode);
  if (!regionInfo || !regionInfo.population) return null;
  
  // Tek il bölgeleri için direkt nüfus
  if (regionInfo.provinces.length === 1) {
    return regionInfo.population;
  }
  
  // Çoklu il bölgeleri için yaklaşık hesaplama
  // (Gerçek projede detaylı nüfus veritabanı kullanılmalı)
  const estimatedPopulation = Math.floor(regionInfo.population / regionInfo.provinces.length);
  
  return estimatedPopulation;
}

/**
 * Tüm TÜİK bölgelerini listeler
 * @returns Array - TÜİK bölge listesi
 */
export function getAllTuikRegions(): Array<{
  code: string;
  name: string;
  provinces: string[];
  population?: number;
}> {
  return Object.values(TUIK_REGIONS);
}

/**
 * Bölgesel istatistik özeti
 * @param regionCode - TÜİK bölge kodu
 * @returns object | null - İstatistik özeti
 */
export function getRegionalStatistics(regionCode: string): {
  code: string;
  name: string;
  provinceCount: number;
  population?: number;
  populationDensity?: string;
} | null {
  const region = getTuikRegionInfo(regionCode);
  if (!region) return null;
  
  return {
    code: region.code,
    name: region.name,
    provinceCount: region.provinces.length,
    population: region.population,
    populationDensity: region.population 
      ? `${Math.floor(region.population / region.provinces.length)} kişi/il (ortalama)`
      : undefined
  };
}

/**
 * İl bazında ekonomik göstergeler (örnek veriler)
 * @param provinceName - İl adı
 * @returns object | null - Ekonomik göstergeler
 */
export function getEconomicIndicators(provinceName: string): {
  province: string;
  gdpPerCapita?: number;
  unemploymentRate?: number;
  industryLevel: string;
} | null {
  const normalized = provinceName.toLowerCase().trim();
  
  // Örnek ekonomik veriler (gerçek projede API'den alınmalı)
  const economicData: Record<string, any> = {
    'istanbul': {
      gdpPerCapita: 25000,
      unemploymentRate: 12.5,
      industryLevel: 'Çok Yüksek'
    },
    'ankara': {
      gdpPerCapita: 22000,
      unemploymentRate: 10.2,
      industryLevel: 'Yüksek'
    },
    'izmir': {
      gdpPerCapita: 20000,
      unemploymentRate: 11.8,
      industryLevel: 'Yüksek'
    },
    'bursa': {
      gdpPerCapita: 18000,
      unemploymentRate: 9.5,
      industryLevel: 'Yüksek'
    },
    'antalya': {
      gdpPerCapita: 16000,
      unemploymentRate: 13.2,
      industryLevel: 'Orta'
    }
  };
  
  const data = economicData[normalized];
  if (!data) {
    return {
      province: provinceName,
      industryLevel: 'Veri Yok'
    };
  }
  
  return {
    province: provinceName,
    ...data
  };
}