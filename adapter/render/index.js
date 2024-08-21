import fs from 'node:fs';
import adapter from 'cloudflare-worker-adapter';
import { RedisCache } from 'cloudflare-worker-adapter/redisCache';

const env = {
    ...process.env,
    DATABASE: RedisCache.createFromUri(process.env.REDIS_URL || 'redis://localhost:6379'),
};

try {
    const buildInfo = JSON.parse(fs.readFileSync('../../dist/buildinfo.json', 'utf-8'));
    process.env.BUILD_TIMESTAMP = buildInfo.timestamp;
    process.env.BUILD_VERSION = buildInfo.sha;
    console.log(buildInfo);
} catch (e) {
    console.log(e);
}

const bodyMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

/**
 * @param {string} baseURL
 * @param {Request} req
 * @returns {Request}
 */
function requestBuilder(baseURL, req) {
    const reqHost = req.headers['x-forwarded-host'] || req.headers.host;
    const reqScheme = req.headers['x-forwarded-proto'] || req.headers['x-scheme'];

    const method = req.method;
    const headers = req.headers;
    const body = bodyMethods.has(method) ? req : null;
    const reqInit = { method, headers, body };

    if (reqHost) {
        return new Request(`${reqScheme || 'http'}://${reqHost}${req.url}`, reqInit);
    } else {
        return new Request(baseURL + req.url, reqInit);
    }
}

// 延迟加载 ../main.js， 防止ENV过早初始化
const { default: worker } = await import('../../main.js');
adapter.startServerV2(Number.parseInt(env.PORT), env.HOST, env, {}, requestBuilder, worker.fetch);
