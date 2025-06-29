import type { IOptions } from '../src/types'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  DEEPL_URL,
  getBody,
  handlerBodyMethod,
  translate,
} from '../src'

describe('handlerBodyMethod', () => {
  it('should use correct method format based on random', () => {
    const original = JSON.stringify({
      jsonrpc: '2.0',
      method: 'LMT_handle_texts',
      id: 123,
    })
    const replaced1 = handlerBodyMethod(24, original)
    const replaced2 = handlerBodyMethod(12, original)
    const replaced3 = handlerBodyMethod(1, original)

    // 24+5=29 => %29 === 0
    expect(replaced1).toContain('"method" : "')
    // 12+3=15 => %13 === 2 => not match
    expect(replaced2).toContain('"method": "')
    // 1+3=4 => %13 === 4 && 1+5=6 => %29 !== 0
    expect(replaced3).toContain('"method": "')
  })
})

describe('getBody', () => {
  it('should return a valid JSON string', () => {
    const options: IOptions = { from: 'EN', to: 'ZH', text: 'Hi there' }
    const body = getBody(options)
    const jsonStr = body.replace(/"method"\s?:/, '"method":')
    expect(() => JSON.parse(jsonStr)).not.toThrow()
  })
})

describe('translate', () => {
  const mockFetch = vi.fn()

  beforeEach(() => {
    globalThis.fetch = mockFetch as any
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should throw error when blocked by DeepL', async () => {
    mockFetch.mockResolvedValueOnce({ status: 429 })
    await expect(translate({ from: 'EN', to: 'ZH', text: 'Hello' })).rejects.toThrow(/Too many requests/)
  })

  it('should return response when successful', async () => {
    const mockResponse = { status: 200, json: async () => ({ result: 'ok' }) }
    mockFetch.mockResolvedValueOnce(mockResponse)
    const response = await translate({ from: 'EN', to: 'ZH', text: 'Hello' })
    expect(response).toEqual(mockResponse)
    expect(mockFetch).toHaveBeenCalledWith(DEEPL_URL, expect.objectContaining({ method: 'POST' }))
  })
})
