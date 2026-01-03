// Turkish Utils - Türkiye'ye özel utility fonksiyonları

export * from './tc-kimlik';
export * from './iban';
export * from './plaka';
export * from './currency';
export * from './text';
export * from './phone';
export * from './tax-number';
export * from './date';
export * from './passport';
export * from './postal-code';
export * from './vehicle-plate';
export * from './credit-card';
export * from './statistics';
export * from './education';
export * from './geography';
export * from './operator-codes';

// Ana export objesi
import { validateTcKimlik, generateTcKimlik } from './tc-kimlik';
import { validateIban, formatIban } from './iban';
import { plateToCity, cityToPlate, getAllPlates } from './plaka';
import { formatTurkishLira, numberToWords, amountToWords, ordinalToWords } from './currency';
import { turkishToEnglish, englishToTurkish, capitalizeturkish, slugify } from './text';
import { validateTurkishPhone, formatTurkishPhone, getPhoneOperator } from './phone';
import { validateTaxNumber, generateTaxNumber } from './tax-number';
import { formatTurkishDate, getMonthFromTurkishName, getDayFromTurkishName, getTurkishHolidays } from './date';
import { validateTurkishPassport, getPassportType, generateTurkishPassport } from './passport';
import { validateTurkishPostalCode, getProvinceFromPostalCode, generatePostalCode } from './postal-code';
import { validateVehiclePlate, formatVehiclePlate, getVehiclePlateType } from './vehicle-plate';
import { validateCreditCard, getCreditCardType, getTurkishBankFromCard, formatCreditCard } from './credit-card';
import { getTuikRegionCode, getPopulationData, getAllTuikRegions } from './statistics';
import { gradeToLetter, letterToGrade, calculateGPA, getUniversityList } from './education';
import { coordinatesInTurkey, getRegionFromCoords, getNearestCity, calculateDistance } from './geography';
import { getOperatorCodes, getEmergencyNumbers, getSMSCodes } from './operator-codes';

const turkishUtils = {
  // TC Kimlik
  tcValidate: validateTcKimlik,
  tcGenerate: generateTcKimlik,
  
  // IBAN
  ibanValidate: validateIban,
  ibanFormat: formatIban,
  
  // Plaka
  plateToCity,
  cityToPlate,
  getAllPlates,
  
  // Para
  toTurkishLira: formatTurkishLira,
  numberToWords,
  amountToWords,
  ordinalToWords,
  
  // Metin
  turkishToEnglish,
  englishToTurkish,
  capitalizeturkish,
  slugify,
  
  // Telefon
  phoneValidate: validateTurkishPhone,
  phoneFormat: formatTurkishPhone,
  phoneOperator: getPhoneOperator,
  
  // Vergi Numarası
  taxValidate: validateTaxNumber,
  taxGenerate: generateTaxNumber,
  
  // Tarih
  formatDate: formatTurkishDate,
  getMonthNumber: getMonthFromTurkishName,
  getDayNumber: getDayFromTurkishName,
  getHolidays: getTurkishHolidays,
  
  // Pasaport
  passportValidate: validateTurkishPassport,
  passportType: getPassportType,
  passportGenerate: generateTurkishPassport,
  
  // Posta Kodu
  postalValidate: validateTurkishPostalCode,
  postalToProvince: getProvinceFromPostalCode,
  postalGenerate: generatePostalCode,
  
  // Araç Plakası
  vehiclePlateValidate: validateVehiclePlate,
  vehiclePlateFormat: formatVehiclePlate,
  vehiclePlateType: getVehiclePlateType,
  
  // Kredi Kartı
  creditCardValidate: validateCreditCard,
  creditCardType: getCreditCardType,
  creditCardBank: getTurkishBankFromCard,
  creditCardFormat: formatCreditCard,
  
  // İstatistik (TÜİK)
  tuikRegionCode: getTuikRegionCode,
  populationData: getPopulationData,
  tuikRegions: getAllTuikRegions,
  
  // Eğitim
  gradeToLetter,
  letterToGrade,
  calculateGPA,
  universityList: getUniversityList,
  
  // Coğrafya
  coordinatesInTurkey,
  regionFromCoords: getRegionFromCoords,
  nearestCity: getNearestCity,
  calculateDistance,
  
  // Operatör Kodları
  operatorCodes: getOperatorCodes,
  emergencyNumbers: getEmergencyNumbers,
  smsCodes: getSMSCodes
};

export default turkishUtils;