import LocalizedStrings from 'react-native-localization';
import {Translation_en} from './Translation_en';
import {Translation_ar} from './Translation_ar';
import {Translation_de} from './Translation_de';
import {Translation_es} from './Translation_es';
import {Translation_fr} from './Translation_fr';
import {Translation_he} from './Translation_he';
import {Translation_hi} from './Translation_hi';
import {Translation_id} from './Translation_id';
import {Translation_it} from './Translation_it';
import {Translation_ja} from './Translation_ja';
import {Translation_ko} from './Translation_ko';
import {Translation_ms} from './Translation_ms';
import {Translation_pt} from './Translation_pt';
import {Translation_ru} from './Translation_ru';
import {Translation_th} from './Translation_th';
import {Translation_tr} from './Translation_tr';
import {Translation_vi} from './Translation_vi';
import {Translation_zh_hans} from './Translation_zh_hans';

export const translationString = new LocalizedStrings({
  en: Translation_en,
  ar: Translation_ar,
  de: Translation_de,
  es: Translation_es,
  fr: Translation_fr,
  he: Translation_he,
  hi: Translation_hi,
  id: Translation_id,
  it: Translation_it,
  ja: Translation_ja,
  ko: Translation_ko,
  ms: Translation_ms,
  pt: Translation_pt,
  ru: Translation_ru,
  th: Translation_th,
  tr: Translation_tr,
  vi: Translation_vi,
  zh_SG: Translation_zh_hans,
  zh_CN: Translation_zh_hans,
  'zh-Hans': Translation_zh_hans,
});
