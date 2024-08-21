import { execSync } from 'node:child_process';
import * as fs from 'node:fs/promises';
import esbuild from 'esbuild';

/**
 * Build the project
 * @param {string} info - path to buildinfo.json
 * @param {string} output - path to output file
 */
export async function build(info, output) {
    let COMMIT_HASH = execSync('git rev-parse --short HEAD').toString().trim();
    let TIMESTAMP = Math.floor(Date.now() / 1000);

    try {
        const raw = await fs.readFile(info);
        const buildInfo = JSON.parse(raw.toString());
        COMMIT_HASH = buildInfo.sha;
        TIMESTAMP = buildInfo.timestamp;
    } catch (e) {
        console.error(e);
    }

    await esbuild.build({
        entryPoints: ['index.js'],
        bundle: true,
        minify: false,
        outfile: output,
        platform: 'node',
        format: 'esm',
        banner: {
            js: '#!/usr/bin/env node\n/* eslint-disable */',
        },
        define: {
            'process.env.BUILD_VERSION': `'${COMMIT_HASH}'`,
            'process.env.BUILD_TIMESTAMP': TIMESTAMP.toString(),
        },
    });
}
