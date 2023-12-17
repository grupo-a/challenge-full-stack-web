import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            exclude: ['src/modules/**/repositories/**', 'src/errors/*'],
            provider: 'v8',
        },
    },
})
