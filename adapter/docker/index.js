import fs from 'node:fs';
import { createCache, startServer } from 'cloudflare-worker-adapter';
import worker from '../../main.js';

const {
    CONFIG_PATH = '/app/config.json',
    TOML_PATH = '/app/config.toml',
} = process.env;

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
const cache = await createCache(config?.database?.type, config?.database);
console.log(`database: ${config?.database?.type} is ready`);

startServer(
    8787,
    '127.0.0.1',
    TOML_PATH,
    { DATABASE: cache },
    { baseURL: config.server },
    worker.fetch,
);