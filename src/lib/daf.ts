import { HDate } from '@hebcal/core'
import { DafYomi } from '@hebcal/learning'

export interface DafYomiInfo {
  masechta: string // For dafyomi.org URL (e.g., "Berachos")
  daf: string // e.g. "2"
  hebrewName: string // e.g. "ברכות ב"
  englishName: string // e.g. "Berachot"
  date: string // e.g. "2023-10-25"
}

// Mapping from Hebcal names to dafyomi.org names
const MESECHTA_MAP: Record<string, string> = {
  'Berachot': 'Berachos',
  'Shabbat': 'Shabbos',
  'Eruvin': 'Eruvin',
  'Pesachim': 'Pesachim',
  'Shekalim': 'Shekalim',
  'Yoma': 'Yoma',
  'Sukkah': 'Succah',
  'Beitzah': 'Beitzah',
  'Rosh Hashana': 'RoshHashana',
  'Taanit': 'Taanis',
  'Megillah': 'Megillah',
  'Moed Katan': 'MoedKatan',
  'Chagigah': 'Chagiga',
  'Yevamot': 'Yevamos',
  'Ketubot': 'Kesubos',
  'Nedarim': 'Nedarim',
  'Nazir': 'Nazir',
  'Sotah': 'Sotah',
  'Gittin': 'Gittin',
  'Kiddushin': 'Kiddushin',
  'Bava Kamma': 'BavaKamma',
  'Bava Metzia': 'BavaMetzia',
  'Bava Batra': 'BavaBasra',
  'Sanhedrin': 'Sanhedrin',
  'Makkot': 'Makkos',
  'Shevuot': 'Shevuos',
  'Avodah Zarah': 'AvodahZarah',
  'Horayot': 'Horayos',
  'Zevachim': 'Zevachim',
  'Menachot': 'Menachos',
  'Chullin': 'Chulin',
  'Bechorot': 'Bechoros',
  'Erachin': 'Arachin', // Hebcal: Arachin? need to check
  'Arachin': 'Arachin',
  'Temurah': 'Temura',
  'Keritot': 'Kerisus',
  'Meilah': 'Meila',
  'Kinnim': 'Kinnim',
  'Tamid': 'Tamid',
  'Middot': 'Midos',
  'Niddah': 'Niddah',
}

export function getTodaysDaf(): DafYomiInfo {
  const now = new HDate() // Defaults to today
  const daf = new DafYomi(now)
  
  const masekhetName = daf.name
  const blatt = daf.blatt.toString()
  
  // daf.name from hebcal is like "Bava Kamma"
  const urlMesechta = MESECHTA_MAP[masekhetName] || masekhetName.replace(/\s+/g, '')
  
  return {
    masechta: urlMesechta,
    daf: blatt,
    hebrewName: daf.render('he'), 
    englishName: masekhetName,
    date: now.greg().toISOString().split('T')[0]
  }
}
