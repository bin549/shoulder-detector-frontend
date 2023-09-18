import fs from 'node:fs/promises'
import { defineConfig, presetAttributify, presetIcons, presetTypography, presetWebFonts, presetWind, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
    presets: [
        presetWind(),
        presetIcons({
            scale: 1.2,
            warn: true,
            collections: {
                carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
                custom: {
                    assistant: () => fs.readFile('./public/assistant.svg', 'utf-8'),
                },
            },
            extraProperties: {
                'display': 'block',
                'vertical-align': 'middle',
            },
        }),
        presetAttributify(),
        presetTypography(),
        presetWebFonts({
            fonts: {
                sans: 'DM Sans',
                serif: 'DM Serif Display',
                mono: 'DM Mono',
            },
        }),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
})
