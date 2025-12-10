import * as esbuild from 'esbuild';
import { readFile } from 'node:fs/promises';

const packageJson = JSON.parse(
    await readFile(new URL('./package.json', import.meta.url))
);

const dependencies = Object.keys(packageJson.dependencies || {});

await esbuild.build({
    entryPoints: ['src/common/infrastructure/http/server.ts'],
    platform: 'node',
    target: 'node22',
    format: 'esm',
    bundle: true,
    outdir: 'dist',
    external: dependencies,
});
