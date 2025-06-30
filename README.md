# DeepLX-Lib

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

> 🌍 Powerful free DeepL API wrapper with no token required.
> Easily integrate DeepLX into any application.

## Features

- 📦 Zero dependencies, extremely lightweight
- 🌐 Supports all DeepL languages (including variants like `EN-GB`, `ZH-HANS`)
- 💡 Automatically constructs `jsonrpc` request bodies, mimicking browser behavior
- 🧪 Fully tested with unit tests for reliability

## Installation

```bash
npm i deeplx-lib
# or
pnpm add deeplx-lib
# or
yarn add deeplx-lib
```

## Usage

```ts
import { translate } from 'deeplx-lib'

const result = await translate({
  from: 'EN',
  to: 'ZH',
  text: 'Hello, world!',
})

const data = await result.json()
console.log(data)
/*
{
  jsonrpc: '2.0',
  id: 123456789,
  result: {
    texts: [
      {
        alternatives: [ { text: '世界，你好' }, { text: '你好，世界！' }, { text: '大家好' } ],
        text: '你好，世界'
      }
    ],
    lang: 'EN',
    lang_is_confident: false,
    detectedLanguages: {
      EN: 0.48555099999999995,
      DE: 0.038853,
      FR: 0.003078,
      ES: 0.008555,
      PT: 0.0049429999999999995,
      IT: 0.016312,
      NL: 0.061256,
      PL: 0.017636,
      RU: 0.0004969999999999999,
      ZH: 0.0036209999999999997,
      JA: 0.000523,
      BG: 0.00007099999999999999,
      CS: 0.009665,
      DA: 0.0034609999999999997,
      EL: 0.00016099999999999998,
      ET: 0.008915,
      FI: 0.002085,
      HU: 0.004044,
      LT: 0.00029099999999999997,
      LV: 0.001053,
      RO: 0.004389,
      SK: 0.002541,
      SL: 0.00106,
      SV: 0.002949,
      TR: 0.00075,
      ID: 0.005395,
      UK: 0.00010899999999999999,
      KO: 0.006984,
      NB: 0.042485999999999996,
      AR: 0.000068,
      VI: 0.001168,
      HE: 0.000098,
      unsupported: 0.26143
    }
  }
}
*/
```

## API

### `translate(options: IOptions): Promise<Response>`

Send a translation request to DeepL's internal JSON-RPC endpoint.

#### Parameters

| Name   | Type              | Description       |
| ------ | ----------------- | ----------------- |
| `from` | `TSourceLanguage` | Source language   |
| `to`   | `TTargetLanguage` | Target language   |
| `text` | `string`          | Text to translate |

### `parse2DeepLX(data: IOptions & IDeepLData): IDeepLXData`

Parses the raw DeepL JSON-RPC response into a simplified, standardized format for easier usage.

Useful when you want to normalize the `translate` or `fetch` result into a consistent structure.

#### Example

```ts
import { parse2DeepLX, translate } from 'deeplx-lib'

const translateData: IOptions = {
  from: 'EN',
  to: 'ZH',
  text: 'Good morning',
}

const response = await translate(translateData)

const raw = (await response.json()) as IDeepLData
const normalized = parse2DeepLX({
  ...translateData,
  ...raw,
})

console.log(normalized)
/*
{
  code: 200,
  id: 123456789,
  method: 'Free',
  from: 'EN',
  to: 'ZH',
  source_lang: 'EN',
  target_lang: 'ZH',
  data: '早上好',
  alternatives: ['早安', '上午好']
}
*/
```

### `getBody(options: IOptions): string`

Generates a JSON-RPC-compliant request body that mimics DeepL’s internal format. You can use it to manually perform the request using your own `fetch` implementation.

#### Example

```ts
import { DEEPL_URL, getBody } from 'deeplx-lib'

const body = getBody({
  from: 'EN',
  to: 'ZH',
  text: 'Hello, world!',
})

const response = await fetch(DEEPL_URL, {
  method: 'POST',
  body,
  headers: { 'Content-Type': 'application/json' },
})

const result = await response.json()
console.log(result) // The result is the same as `translate(options: IOptions)`
```

### Language Types

```ts
// Subsequent changes may be made, see details at: https://github.com/lete114/deeplx-lib/blob/main/src/types.d.ts
export type TVariant = 'EN-GB' | 'EN-US' | 'PT-BR' | 'PT-PT' | 'ZH-HANS' | 'ZH-HANT'
export type TLanguage =
  | 'AR' | 'BG' | 'CS' | 'DA' | 'DE' | 'EL' | 'EN' | 'ES' | 'ET'
  | 'FI' | 'FR' | 'HU' | 'ID' | 'IT' | 'JA' | 'KO' | 'LT' | 'LV' | 'NB'
  | 'NL' | 'PL' | 'PT' | 'RO' | 'RU' | 'SK' | 'SL' | 'SV' | 'TR' | 'UK' | 'ZH'
export type TSourceLanguage = 'AUTO' | TLanguage
export type TTargetLanguage = TLanguage | TVariant

export interface IOptions {
  from: TSourceLanguage
  to: TTargetLanguage
  text: string
}
```

### Other Exports

| Method              | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `parse2DeepLX`      | Parses the full DeepL response into a DeepLX format  |
| `getBody`           | Constructs the JSON-RPC request body                 |
| `getICount`         | Counts the number of "i" characters in the text      |
| `getTimestamp`      | Generates a timestamp adjusted by the text content   |
| `getRandomNumber`   | Generates a pseudo-random request ID                 |
| `handlerBodyMethod` | Modifies the `method` field to emulate client format |

## Testing

Unit tests are written using [Vitest](https://vitest.dev/). Run the tests with:

```bash
pnpm test
```

## License

[MIT](./LICENSE) License © [Lete114](https://github.com/lete114)

---

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/deeplx-lib?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/deeplx-lib
[npm-downloads-src]: https://img.shields.io/npm/dm/deeplx-lib?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/deeplx-lib
[bundle-src]: https://img.shields.io/bundlephobia/minzip/deeplx-lib?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=deeplx-lib
[license-src]: https://img.shields.io/github/license/lete114/deeplx-lib.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/lete114/deeplx-lib/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/deeplx-lib
