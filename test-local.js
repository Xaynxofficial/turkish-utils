// Lokal test dosyası
import turkishUtils from './dist/index.esm.js';

console.log('🧪 Turkish Utils Test Başlıyor...\n');

// TC Kimlik Test
console.log('📋 TC Kimlik Testleri:');
const testTc = turkishUtils.tcGenerate();
console.log(`Oluşturulan TC: ${testTc}`);
console.log(`Doğrulama: ${turkishUtils.tcValidate(testTc)}`);
console.log(`Geçersiz TC: ${turkishUtils.tcValidate('12345678901')}`);

// Plaka Test
console.log('\n🚗 Plaka Testleri:');
console.log(`34 -> ${turkishUtils.plateToCity('34')}`);
console.log(`İstanbul -> ${turkishUtils.cityToPlate('İstanbul')}`);

// Para Test
console.log('\n💰 Para Testleri:');
console.log(`1500 TL: ${turkishUtils.toTurkishLira(1500)}`);
console.log(`2023 yazıyla: ${turkishUtils.numberToWords(2023)}`);

// Telefon Test
console.log('\n📱 Telefon Testleri:');
console.log(`0532 123 45 67 geçerli mi: ${turkishUtils.phoneValidate('0532 123 45 67')}`);
console.log(`Formatlanmış: ${turkishUtils.phoneFormat('5321234567')}`);

// IBAN Test
console.log('\n🏦 IBAN Testleri:');
const testIban = 'TR330006100519786457841326';
console.log(`IBAN geçerli mi: ${turkishUtils.ibanValidate(testIban)}`);
console.log(`Formatlanmış: ${turkishUtils.ibanFormat(testIban)}`);

// Metin Test
console.log('\n📝 Metin Testleri:');
console.log(`Türkçe -> İngilizce: ${turkishUtils.turkishToEnglish('çğıöşü')}`);
console.log(`Capitalize: ${turkishUtils.capitalizeturkish('istanbul')}`);

console.log('\n✅ Test tamamlandı!');