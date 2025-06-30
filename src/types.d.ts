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

export interface IDeepLXData {
  code: 200
  id: number
  method: 'Free'
  from: TSourceLanguage
  to: TTargetLanguage
  source_lang: TSourceLanguage
  target_lang: TTargetLanguage
  data: string
  alternatives: string[]
}

export interface IDeepLData {
  jsonrpc: '2.0'
  id: number
  result: {
    texts: {
      text: string
      alternatives: { text: string }[]
    }[]
    lang: TSourceLanguage
    lang_is_confident: boolean
    detectedLanguages: Record<string, number>
  }
}
