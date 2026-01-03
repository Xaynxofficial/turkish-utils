/**
 * Türkiye operatör servis kodları ve acil durum numaraları
 */

// Operatör servis kodları
const OPERATOR_CODES: Record<string, {
  name: string;
  serviceCodes: Record<string, string>;
  customerService: string;
  website: string;
}> = {
  'turkcell': {
    name: 'Turkcell',
    serviceCodes: {
      '*123#': 'Bakiye Sorgulama',
      '*124#': 'Kalan Dakika/SMS/İnternet',
      '*125#': 'Paket Sorgulama',
      '*532#': 'Müşteri Hizmetleri Menüsü',
      '*533#': 'Fatura Sorgulama',
      '*534#': 'Ödeme İşlemleri',
      '*535#': 'Paket Satın Alma',
      '*536#': 'Kampanya ve Fırsatlar',
      '*537#': 'Numara Taşıma',
      '*538#': 'Roaming Bilgileri',
      '*139#': 'Superonline İnternet Paketi',
      '*140#': 'Turkcell TV+'
    },
    customerService: '444 0 532',
    website: 'turkcell.com.tr'
  },
  'vodafone': {
    name: 'Vodafone Türkiye',
    serviceCodes: {
      '*123#': 'Bakiye Sorgulama',
      '*124#': 'Kalan Dakika/SMS/İnternet',
      '*125#': 'Paket Sorgulama',
      '*542#': 'Müşteri Hizmetleri Menüsü',
      '*543#': 'Fatura Sorgulama',
      '*544#': 'Ödeme İşlemleri',
      '*545#': 'Paket Satın Alma',
      '*546#': 'Kampanya ve Fırsatlar',
      '*547#': 'Numara Taşıma',
      '*548#': 'Roaming Bilgileri',
      '*141#': 'Vodafone Ev İnterneti',
      '*142#': 'Vodafone TV'
    },
    customerService: '444 0 542',
    website: 'vodafone.com.tr'
  },
  'turktelekom': {
    name: 'Türk Telekom',
    serviceCodes: {
      '*123#': 'Bakiye Sorgulama',
      '*124#': 'Kalan Dakika/SMS/İnternet',
      '*125#': 'Paket Sorgulama',
      '*505#': 'Müşteri Hizmetleri Menüsü',
      '*506#': 'Fatura Sorgulama',
      '*507#': 'Ödeme İşlemleri',
      '*551#': 'Paket Satın Alma',
      '*552#': 'Kampanya ve Fırsatlar',
      '*553#': 'Numara Taşıma',
      '*554#': 'Roaming Bilgileri',
      '*143#': 'TTNET ADSL/Fiber',
      '*144#': 'Tivibu'
    },
    customerService: '444 1 444',
    website: 'turktelekom.com.tr'
  }
};

// Acil durum ve önemli numaralar
const EMERGENCY_NUMBERS: Record<string, {
  number: string;
  description: string;
  category: 'Acil' | 'Sağlık' | 'Güvenlik' | 'Kamu' | 'Ulaşım' | 'Diğer';
  available24h: boolean;
}> = {
  'polis': {
    number: '155',
    description: 'Polis İmdat',
    category: 'Acil',
    available24h: true
  },
  'itfaiye': {
    number: '110',
    description: 'İtfaiye',
    category: 'Acil',
    available24h: true
  },
  'ambulans': {
    number: '112',
    description: 'Ambulans / Sağlık',
    category: 'Acil',
    available24h: true
  },
  'jandarma': {
    number: '156',
    description: 'Jandarma İmdat',
    category: 'Acil',
    available24h: true
  },
  'sahil_guvenlik': {
    number: '158',
    description: 'Sahil Güvenlik',
    category: 'Acil',
    available24h: true
  },
  'orman_yangini': {
    number: '177',
    description: 'Orman Yangını İhbar',
    category: 'Acil',
    available24h: true
  },
  'dogalgaz_kacagi': {
    number: '187',
    description: 'Doğalgaz Kaçağı İhbar',
    category: 'Acil',
    available24h: true
  },
  'elektrik_ariza': {
    number: '186',
    description: 'Elektrik Arıza İhbar',
    category: 'Kamu',
    available24h: true
  },
  'su_ariza': {
    number: '185',
    description: 'Su Arıza İhbar',
    category: 'Kamu',
    available24h: true
  },
  'alo_181': {
    number: '181',
    description: 'Sabotaj ve Terör İhbar',
    category: 'Güvenlik',
    available24h: true
  },
  'alo_183': {
    number: '183',
    description: 'Sosyal Destek Hattı',
    category: 'Sağlık',
    available24h: true
  },
  'alo_184': {
    number: '184',
    description: 'Alo Çocuk Hattı',
    category: 'Sağlık',
    available24h: true
  },
  'alo_182': {
    number: '182',
    description: 'Zehir Danışma',
    category: 'Sağlık',
    available24h: true
  },
  'alo_171': {
    number: '171',
    description: 'Karayolları Trafik',
    category: 'Ulaşım',
    available24h: true
  },
  'alo_199': {
    number: '199',
    description: 'Tüketici Hattı',
    category: 'Kamu',
    available24h: false
  },
  'alo_170': {
    number: '170',
    description: 'Gümrük Muhafaza',
    category: 'Güvenlik',
    available24h: true
  },
  'alo_174': {
    number: '174',
    description: 'Çevre Kirliliği İhbar',
    category: 'Kamu',
    available24h: false
  }
};

// Kısa mesaj kodları
const SMS_CODES: Record<string, {
  code: string;
  description: string;
  operator?: string;
  cost?: string;
}> = {
  'hava_durumu': {
    code: '6245',
    description: 'Hava Durumu (HAVA <şehir> şeklinde)',
    cost: 'Operatör tarifesine göre'
  },
  'trafik': {
    code: '6343',
    description: 'Trafik Durumu (TRAFIK <şehir> şeklinde)',
    cost: 'Operatör tarifesine göre'
  },
  'nobetci_eczane': {
    code: '6562',
    description: 'Nöbetçi Eczane (ECZANE <ilçe> şeklinde)',
    cost: 'Operatör tarifesine göre'
  },
  'namaz_vakitleri': {
    code: '6262',
    description: 'Namaz Vakitleri (NAMAZ <şehir> şeklinde)',
    cost: 'Operatör tarifesine göre'
  }
};

/**
 * Operatör servis kodlarını döndürür
 * @param operatorName - Operatör adı
 * @returns object | null - Servis kodları
 */
export function getOperatorCodes(operatorName: string): typeof OPERATOR_CODES[string] | null {
  const normalized = operatorName.toLowerCase().replace(/\s+/g, '');
  
  // Direkt eşleşme
  if (OPERATOR_CODES[normalized]) {
    return OPERATOR_CODES[normalized];
  }
  
  // Kısmi eşleşme
  for (const [key, operator] of Object.entries(OPERATOR_CODES)) {
    if (operator.name.toLowerCase().includes(normalized) || 
        key.includes(normalized)) {
      return operator;
    }
  }
  
  return null;
}

/**
 * Tüm acil durum numaralarını döndürür
 * @param category - Kategori filtresi (isteğe bağlı)
 * @returns Array - Acil durum numaraları
 */
export function getEmergencyNumbers(
  category?: 'Acil' | 'Sağlık' | 'Güvenlik' | 'Kamu' | 'Ulaşım' | 'Diğer'
): Array<{
  key: string;
  number: string;
  description: string;
  category: string;
  available24h: boolean;
}> {
  const numbers = Object.entries(EMERGENCY_NUMBERS).map(([key, info]) => ({
    key,
    ...info
  }));
  
  if (category) {
    return numbers.filter(num => num.category === category);
  }
  
  return numbers;
}

/**
 * Belirli bir acil durum numarasını arar
 * @param query - Arama terimi
 * @returns object | null - Bulunan numara
 */
export function findEmergencyNumber(query: string): typeof EMERGENCY_NUMBERS[string] | null {
  const normalized = query.toLowerCase();
  
  // Direkt numara araması
  for (const info of Object.values(EMERGENCY_NUMBERS)) {
    if (info.number === query) {
      return info;
    }
  }
  
  // Açıklama araması
  for (const info of Object.values(EMERGENCY_NUMBERS)) {
    if (info.description.toLowerCase().includes(normalized)) {
      return info;
    }
  }
  
  return null;
}

/**
 * SMS servis kodlarını döndürür
 * @param service - Servis adı (isteğe bağlı)
 * @returns Array | object - SMS kodları
 */
export function getSMSCodes(service?: string): any {
  if (service) {
    const normalized = service.toLowerCase().replace(/\s+/g, '_');
    return SMS_CODES[normalized] || null;
  }
  
  return Object.entries(SMS_CODES).map(([key, info]) => ({
    service: key,
    ...info
  }));
}

/**
 * Operatör müşteri hizmetleri numaralarını döndürür
 * @returns Array - Müşteri hizmetleri numaraları
 */
export function getCustomerServiceNumbers(): Array<{
  operator: string;
  number: string;
  website: string;
}> {
  return Object.values(OPERATOR_CODES).map(operator => ({
    operator: operator.name,
    number: operator.customerService,
    website: operator.website
  }));
}

/**
 * Telefon numarasından operatör servis kodlarını önerir
 * @param phoneNumber - Telefon numarası
 * @returns object | null - Önerilen kodlar
 */
export function suggestCodesForNumber(phoneNumber: string): typeof OPERATOR_CODES[string] | null {
  const cleaned = phoneNumber.replace(/\s/g, '');
  
  // Operatör prefikslerini kontrol et
  if (/^(\+90)?0?53[2-8]/.test(cleaned)) {
    return OPERATOR_CODES.turkcell;
  } else if (/^(\+90)?0?54[2-9]/.test(cleaned)) {
    return OPERATOR_CODES.vodafone;
  } else if (/^(\+90)?0?50[5-7]|55[1-5,9]/.test(cleaned)) {
    return OPERATOR_CODES.turktelekom;
  }
  
  return null;
}

/**
 * Tüm operatörleri listeler
 * @returns Array - Operatör listesi
 */
export function getAllOperators(): Array<{
  key: string;
  name: string;
  customerService: string;
  website: string;
  codeCount: number;
}> {
  return Object.entries(OPERATOR_CODES).map(([key, operator]) => ({
    key,
    name: operator.name,
    customerService: operator.customerService,
    website: operator.website,
    codeCount: Object.keys(operator.serviceCodes).length
  }));
}