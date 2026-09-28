import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { PNG } from 'pngjs'
import jsQR from 'jsqr'
import { appStores } from '../src/data/appStores.js'

test('both shipped QR images decode to the exact installation URLs', () => {
  for (const store of appStores) {
    const png = PNG.sync.read(readFileSync(new URL(`../public/qr/${store.id}.png`, import.meta.url)))
    const decoded = jsQR(new Uint8ClampedArray(png.data), png.width, png.height)
    assert.equal(decoded?.data, store.url)
  }
})
