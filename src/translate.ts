// https://developers.deepl.com/docs/api-reference/translate

import type { IDeepLData, IDeepLXData, IOptions } from './types'

export const DEEPL_URL = 'https://www2.deepl.com/jsonrpc'

export async function translate(options: IOptions): Promise<Response> {
  const body = getBody(options)

  return fetch(DEEPL_URL, {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/json' },
  })
}

export function parse2DeepLX(data: IOptions & IDeepLData): IDeepLXData {
  const from = data.result.lang
  const to = data.to
  const texts = data.result.texts[0]
  return {
    code: 200,
    id: data.id,
    method: 'Free',
    from,
    to,
    source_lang: from,
    target_lang: data.to,
    data: texts.text,
    alternatives: texts.alternatives.map(i => i.text),
  }
}

export function getBody({ from, to, text }: IOptions): string {
  const random = getRandomNumber()
  const iCount = getICount(text)
  const timestamp = getTimestamp(iCount)

  const bodyString = JSON.stringify({
    jsonrpc: '2.0',
    method: 'LMT_handle_texts',
    params: {
      splitting: 'newlines',
      lang: {
        source_lang_user_selected: from,
        target_lang: to,
      },
      texts: [{ text, requestAlternatives: 3 }],
      timestamp,
    },
    id: random,
  })

  const body = handlerBodyMethod(random, bodyString)
  return body
}

export function handlerBodyMethod(random: number, body: string): string {
  const calc = (random + 5) % 29 === 0 || (random + 3) % 13 === 0
  const method = calc ? '"method" : "' : '"method": "'
  return body.replace('"method":"', method)
}

export function getTimestamp(iCount: number): number {
  const ts = Date.now()
  if (iCount !== 0) {
    iCount = iCount + 1
    return ts - (ts % iCount) + iCount
  }
  else {
    return ts
  }
}

export function getICount(translate_text: string): number {
  return translate_text.split('i').length - 1
}

export function getRandomNumber(): number {
  const random = Math.floor(Math.random() * 99999) + 100000
  return random * 1000
}
