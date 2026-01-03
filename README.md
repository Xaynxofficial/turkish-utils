# Turkish Utils 🇹🇷

[![npm version](https://badge.fury.io/js/turkish-utils.svg)](https://badge.fury.io/js/turkish-utils)
[![npm downloads](https://img.shields.io/npm/dm/turkish-utils.svg)](https://www.npmjs.com/package/turkish-utils)
[![CI](https://github.com/yourusername/turkish-utils/workflows/CI/badge.svg)](https://github.com/yourusername/turkish-utils/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Türkiye'ye özel utility fonksiyonları içeren modern JavaScript/TypeScript kütüphanesi.

## 🚀 Kurulum

```bash
npm install turkish-utils
```

## 📖 Kullanım

### ES6 Modules
```javascript
import turkishUtils from 'turkish-utils';
// veya
import { validateTcKimlik, formatTurkishLira } from 'turkish-utils';
```

### CommonJS
```javascript
const turkishUtils = require('turkish-utils');
```

## 🔧 Özellikler

### TC Kimlik Doğrulama
```javascript
// TC kimlik doğrulama
turkishUtils.tcValidate('12345678901'); // false
turkishUtils.tcValidate('11111111110'); // false (geçersiz)

// Test için geçerli TC kimlik oluşturma
const testTc = turkishUtils.tcGenerate(); // '98765432109'
```

### Vergi Kimlik Numarası (VKN)
```javascript
// VKN doğrulama
turkishUtils.taxValidate('1234567890'); // true/false

// Test için VKN oluşturma
const testVkn = turkishUtils.taxGenerate(); // '8214660139'
```

### IBAN İşlemleri
```javascript
// IBAN doğrulama
turkishUtils.ibanValidate('TR330006100519786457841326'); // true

// IBAN formatlama
turkishUtils.ibanFormat('TR330006100519786457841326'); 
// 'TR33 0006 1005 1978 6457 8413 26'
```

### Plaka Kodları
```javascript
// Plaka kodundan şehir
turkishUtils.plateToCity('34'); // 'İstanbul'
turkishUtils.plateToCity('06'); // 'Ankara'

// Şehirden plaka kodu
turkishUtils.cityToPlate('İzmir'); // '35'

// Tüm plaka listesi
turkishUtils.getAllPlates(); 
// [{ code: '01', city: 'Adana' }, ...]
```

### Para Formatı ve Sayı İşlemleri
```javascript
// Türk Lirası formatı
turkishUtils.toTurkishLira(1500); // '1.500,00 TL'
turkishUtils.toTurkishLira(1500, { showSymbol: false }); // '1.500,00'

// Sayıyı yazıya çevirme
turkishUtils.numberToWords(1500); // 'bin beşyüz'
turkishUtils.numberToWords(2023); // 'ikibin yirmiüç'

// Para miktarını yazıya çevirme
turkishUtils.amountToWords(1500.75, 'TL'); // 'bin beşyüz Türk Lirası yetmişbeş Kuruş'
turkishUtils.amountToWords(100.50, 'USD'); // 'yüz Dolar elli Sent'

// Sıra sayıları
turkishUtils.ordinalToWords(3); // 'üçüncü'
turkishUtils.ordinalToWords(21); // 'yirmibirinci'
```

### Telefon Numarası
```javascript
// Telefon doğrulama
turkishUtils.phoneValidate('0532 123 45 67'); // true
turkishUtils.phoneValidate('+90 532 123 45 67'); // true

// Telefon formatlama
turkishUtils.phoneFormat('5321234567', 'national'); 
// '0532 123 45 67'

turkishUtils.phoneFormat('5321234567', 'international'); 
// '+90 532 123 45 67'

// Operatör bilgisi
turkishUtils.phoneOperator('5321234567'); // 'Turkcell'
```

### Türkçe Tarih İşlemleri
```javascript
// Türkçe tarih formatı
const date = new Date(2023, 11, 25);
turkishUtils.formatDate(date, 'long'); // '25 Aralık 2023 Pazartesi'
turkishUtils.formatDate(date, 'short'); // '25 Ara 2023'
turkishUtils.formatDate(date, 'numeric'); // '25.12.2023'
turkishUtils.formatDate(date, 'relative'); // 'Bugün' / 'Dün' / '3 gün önce'

// Ay ve gün isimleri
turkishUtils.getMonthNumber('Ocak'); // 0
turkishUtils.getDayNumber('Pazartesi'); // 1

// Türkiye'deki resmi tatiller
turkishUtils.getHolidays(2024); 
// { newYear: Date, nationalSovereignty: Date, ... }
```

### Pasaport Doğrulama
```javascript
// Türk pasaport doğrulama
turkishUtils.passportValidate('U12345678'); // true (yeni format)
turkishUtils.passportValidate('D12345678'); // true (diplomatik)
turkishUtils.passportValidate('A12345678'); // true (eski format)

// Pasaport türü
turkishUtils.passportType('U12345678'); // 'Umumi (Genel) Pasaport'
turkishUtils.passportType('D12345678'); // 'Diplomatik Pasaport'

// Test için pasaport oluşturma
turkishUtils.passportGenerate('general'); // 'U03357325'
```

### Posta Kodu İşlemleri
```javascript
// Posta kodu doğrulama
turkishUtils.postalValidate('34000'); // true
turkishUtils.postalValidate('99999'); // false

// Posta kodundan il bilgisi
turkishUtils.postalToProvince('34000'); // 'İstanbul'
turkishUtils.postalToProvince('06000'); // 'Ankara'

// Posta kodu oluşturma
turkishUtils.postalGenerate('34'); // '34713' (İstanbul için)
```

### Metin İşlemleri
```javascript
// Türkçe karakterleri İngilizce'ye
turkishUtils.turkishToEnglish('çğıöşü'); // 'cgiosu'

// Türkçe büyük/küçük harf (İ/i problemi çözülü)
turkishUtils.capitalizeturkish('istanbul'); // 'İstanbul'

// URL slug oluşturma
turkishUtils.slugify('Merhaba Dünya'); // 'merhaba-dunya'
```

## 📋 API Referansı

### TC Kimlik
- `tcValidate(tcKimlik: string | number): boolean`
- `tcGenerate(): string`

### IBAN
- `ibanValidate(iban: string): boolean`
- `ibanFormat(iban: string, withSpaces?: boolean): string`

### Plaka
- `plateToCity(plateCode: string | number): string | null`
- `cityToPlate(cityName: string): string | null`
- `getAllPlates(): Array<{code: string, city: string}>`

### Para
- `toTurkishLira(amount: number, options?): string`
- `numberToWords(num: number): string`

### Telefon
- `phoneValidate(phone: string): boolean`
- `phoneFormat(phone: string, format?): string`

### Metin
- `turkishToEnglish(text: string): string`
- `englishToTurkish(text: string): string`
- `capitalizeturkish(text: string): string`

## 🧪 Test

```bash
npm test
```

## ⚠️ Yasal Uyarı

Bu kütüphane **sadece doğrulama ve format kontrolü** amaçlıdır. 

**Önemli Notlar:**
- Gerçek kimlik doğrulama yapmaz
- Kişisel veri saklamaz
- Test amaçlı veri oluşturur
- Sadece format kontrolü yapar

**Kullanım Sorumluluğu:**
- Kişisel verilerin korunması kullanıcının sorumluluğundadır
- KVKK ve GDPR uyumluluğu kullanıcıya aittir
- Üretim ortamında dikkatli kullanın

## 📄 Lisans

MIT

## 🤝 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır. Büyük değişiklikler için önce issue açarak tartışalım.

## 📞 İletişim

GitHub Issues üzerinden sorularınızı sorabilirsiniz.