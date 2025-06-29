// https://developers.deepl.com/docs/getting-started/supported-languages
export type TVariant = 'EN-GB' | 'EN-US' | 'PT-BR' | 'PT-PT' | 'ZH-HANS' | 'ZH-HANT'
export type TLanguage = 'AR' | 'BG' | 'CS' | 'DA' | 'DE' | 'EL' | 'EN' | 'ES' | 'ET' | 'FI' | 'FR' | 'HU' | 'ID' | 'IT' | 'JA' | 'KO' | 'LT' | 'LV' | 'NB' | 'NL' | 'PL' | 'PT' | 'RO' | 'RU' | 'SK' | 'SL' | 'SV' | 'TR' | 'UK' | 'ZH'
export type TSourceLanguage = 'AUTO' | TLanguage
export type TTargetLanguage = TLanguage | TVariant

export interface IOptions {
  from: TSourceLanguage
  to: TTargetLanguage
  text: string
}
