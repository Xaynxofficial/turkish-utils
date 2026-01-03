#!/usr/bin/env node

// CLI test aracı
import turkishUtils from './dist/index.esm.js';

const args = process.argv.slice(2);
const command = args[0];
const value = args[1];

if (!command) {
  console.log(`
🇹🇷 Turkish Utils CLI Test v3.0

📋 TC Kimlik:
  node cli-test.js tc-validate 12345678901
  node cli-test.js tc-generate

🏦 IBAN:
  node cli-test.js iban-validate TR330006100519786457841326
  node cli-test.js iban-format TR330006100519786457841326

🚗 Plaka:
  node cli-test.js plaka-to-city 34
  node cli-test.js city-to-plaka İstanbul

🚙 Araç Plakası:
  node cli-test.js vehicle-plate-validate "34 ABC 123"
  node cli-test.js vehicle-plate-format "34ABC123"
  node cli-test.js vehicle-plate-type "34 ABC 123"

📱 Telefon:
  node cli-test.js phone-validate "0532 123 45 67"
  node cli-test.js phone-format 5321234567
  node cli-test.js phone-operator 5321234567

💳 Kredi Kartı:
  node cli-test.js credit-card-validate 4111111111111111
  node cli-test.js credit-card-type 4111111111111111
  node cli-test.js credit-card-format 4111111111111111

💰 Para:
  node cli-test.js lira-format 1500
  node cli-test.js number-to-words 2023
  node cli-test.js amount-to-words 1500.75
  node cli-test.js ordinal-to-words 3

📝 Metin:
  node cli-test.js turkish-to-english çğıöşü
  node cli-test.js capitalize istanbul
  node cli-test.js slugify "Merhaba Dünya"

🏢 Vergi:
  node cli-test.js tax-validate 1234567890
  node cli-test.js tax-generate

📅 Tarih:
  node cli-test.js format-date "2023-12-25"
  node cli-test.js get-month Ocak

🛂 Pasaport:
  node cli-test.js passport-validate U12345678
  node cli-test.js passport-type U12345678
  node cli-test.js passport-generate

📮 Posta Kodu:
  node cli-test.js postal-validate 34000
  node cli-test.js postal-to-province 34000
  node cli-test.js postal-generate 34

📊 İstatistik:
  node cli-test.js tuik-region İstanbul
  node cli-test.js population İstanbul

🎓 Eğitim:
  node cli-test.js grade-to-letter 85
  node cli-test.js calculate-gpa "90,85,80"

🌍 Coğrafya:
  node cli-test.js coordinates-in-turkey "41.0082,28.9784"
  node cli-test.js nearest-city "41.0,29.0"
  node cli-test.js region-from-coords "41.0082,28.9784"

📞 Operatör:
  node cli-test.js operator-codes Turkcell
  node cli-test.js emergency-numbers
  node cli-test.js sms-codes
  `);
  process.exit(0);
}

switch (command) {
  case 'tc-validate':
    console.log(`TC ${value} geçerli mi: ${turkishUtils.tcValidate(value)}`);
    break;
    
  case 'tc-generate':
    console.log(`Oluşturulan TC: ${turkishUtils.tcGenerate()}`);
    break;
    
  case 'iban-validate':
    console.log(`IBAN ${value} geçerli mi: ${turkishUtils.ibanValidate(value)}`);
    break;
    
  case 'iban-format':
    console.log(`Formatlanmış IBAN: ${turkishUtils.ibanFormat(value)}`);
    break;
    
  case 'plaka-to-city':
    console.log(`Plaka ${value} -> ${turkishUtils.plateToCity(value)}`);
    break;
    
  case 'city-to-plaka':
    console.log(`${value} -> Plaka ${turkishUtils.cityToPlate(value)}`);
    break;
    
  case 'phone-validate':
    console.log(`Telefon ${value} geçerli mi: ${turkishUtils.phoneValidate(value)}`);
    break;
    
  case 'phone-format':
    console.log(`Formatlanmış telefon: ${turkishUtils.phoneFormat(value)}`);
    break;
    
  case 'phone-operator':
    console.log(`Telefon operatörü: ${turkishUtils.phoneOperator(value)}`);
    break;
    
  case 'lira-format':
    console.log(`${value} TL formatı: ${turkishUtils.toTurkishLira(parseFloat(value))}`);
    break;
    
  case 'number-to-words':
    console.log(`${value} yazıyla: ${turkishUtils.numberToWords(parseInt(value))}`);
    break;
    
  case 'amount-to-words':
    console.log(`${value} TL yazıyla: ${turkishUtils.amountToWords(parseFloat(value))}`);
    break;
    
  case 'ordinal-to-words':
    console.log(`${value}. sıra: ${turkishUtils.ordinalToWords(parseInt(value))}`);
    break;
    
  case 'turkish-to-english':
    console.log(`${value} -> ${turkishUtils.turkishToEnglish(value)}`);
    break;
    
  case 'capitalize':
    console.log(`${value} -> ${turkishUtils.capitalizeturkish(value)}`);
    break;
    
  case 'slugify':
    console.log(`"${value}" -> ${turkishUtils.slugify(value)}`);
    break;
    
  case 'tax-validate':
    console.log(`VKN ${value} geçerli mi: ${turkishUtils.taxValidate(value)}`);
    break;
    
  case 'tax-generate':
    console.log(`Oluşturulan VKN: ${turkishUtils.taxGenerate()}`);
    break;
    
  case 'format-date':
    const date = new Date(value);
    console.log(`Türkçe tarih: ${turkishUtils.formatDate(date, 'long')}`);
    break;
    
  case 'get-month':
    console.log(`${value} ayı: ${turkishUtils.getMonthNumber(value)}. ay`);
    break;
    
  case 'passport-validate':
    console.log(`Pasaport ${value} geçerli mi: ${turkishUtils.passportValidate(value)}`);
    break;
    
  case 'passport-type':
    console.log(`Pasaport türü: ${turkishUtils.passportType(value)}`);
    break;
    
  case 'passport-generate':
    console.log(`Oluşturulan pasaport: ${turkishUtils.passportGenerate()}`);
    break;
    
  case 'postal-validate':
    console.log(`Posta kodu ${value} geçerli mi: ${turkishUtils.postalValidate(value)}`);
    break;
    
  case 'postal-to-province':
    console.log(`Posta kodu ${value} -> ${turkishUtils.postalToProvince(value)}`);
    break;
    
  case 'postal-generate':
    console.log(`Oluşturulan posta kodu: ${turkishUtils.postalGenerate(value)}`);
    break;
    
  // Yeni özellikler
  case 'vehicle-plate-validate':
    console.log(`Araç plakası ${value} geçerli mi: ${turkishUtils.vehiclePlateValidate(value)}`);
    break;
    
  case 'vehicle-plate-format':
    console.log(`Formatlanmış plaka: ${turkishUtils.vehiclePlateFormat(value)}`);
    break;
    
  case 'vehicle-plate-type':
    console.log(`Plaka türü: ${turkishUtils.vehiclePlateType(value)}`);
    break;
    
  case 'credit-card-validate':
    console.log(`Kredi kartı ${value} geçerli mi: ${turkishUtils.creditCardValidate(value)}`);
    break;
    
  case 'credit-card-type':
    console.log(`Kart türü: ${turkishUtils.creditCardType(value)}`);
    break;
    
  case 'credit-card-format':
    console.log(`Formatlanmış kart: ${turkishUtils.creditCardFormat(value)}`);
    break;
    
  case 'tuik-region':
    console.log(`${value} TÜİK bölge kodu: ${turkishUtils.tuikRegionCode(value)}`);
    break;
    
  case 'population':
    console.log(`${value} nüfusu: ${turkishUtils.populationData(value)?.toLocaleString('tr-TR') || 'Bilinmiyor'}`);
    break;
    
  case 'grade-to-letter':
    console.log(`${value} puan harf notu: ${turkishUtils.gradeToLetter(parseInt(value))}`);
    break;
    
  case 'calculate-gpa':
    const grades = value.split(',').map(g => parseInt(g.trim()));
    console.log(`GPA: ${turkishUtils.calculateGPA(grades)}`);
    break;
    
  case 'coordinates-in-turkey':
    const [lat, lng] = value.split(',').map(c => parseFloat(c.trim()));
    console.log(`Koordinat Türkiye'de mi: ${turkishUtils.coordinatesInTurkey(lat, lng)}`);
    break;
    
  case 'nearest-city':
    const [lat2, lng2] = value.split(',').map(c => parseFloat(c.trim()));
    const nearest = turkishUtils.nearestCity(lat2, lng2);
    console.log(`En yakın şehir: ${nearest?.city} (${nearest?.distance} km)`);
    break;
    
  case 'region-from-coords':
    const [lat3, lng3] = value.split(',').map(c => parseFloat(c.trim()));
    console.log(`Bölge: ${turkishUtils.regionFromCoords(lat3, lng3)}`);
    break;
    
  case 'operator-codes':
    const operator = turkishUtils.operatorCodes(value);
    if (operator) {
      console.log(`${operator.name} müşteri hizmetleri: ${operator.customerService}`);
      console.log('Servis kodları:', Object.keys(operator.serviceCodes).slice(0, 5).join(', '), '...');
    } else {
      console.log('Operatör bulunamadı');
    }
    break;
    
  case 'emergency-numbers':
    const emergency = turkishUtils.emergencyNumbers();
    console.log('Acil Durum Numaraları:');
    emergency.slice(0, 5).forEach(num => {
      console.log(`${num.number} - ${num.description}`);
    });
    break;
    
  case 'sms-codes':
    const sms = turkishUtils.smsCodes();
    console.log('SMS Servis Kodları:');
    sms.slice(0, 3).forEach((service) => {
      console.log(`${service.code} - ${service.description}`);
    });
    break;
    
  default:
    console.log(`❌ Bilinmeyen komut: ${command}`);
}