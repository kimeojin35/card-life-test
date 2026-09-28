import { fileURLToPath } from 'node:url'
import QRCode from 'qrcode'
import { appStores } from '../src/data/appStores.js'
import { mkdir } from 'node:fs/promises'
await mkdir(new URL('../public/qr/', import.meta.url), { recursive: true })
for (const store of appStores) {
  await QRCode.toFile(fileURLToPath(new URL(`../public/qr/${store.id}.png`, import.meta.url)), store.url, { width: 512, margin: 4, errorCorrectionLevel: 'M' })
}
