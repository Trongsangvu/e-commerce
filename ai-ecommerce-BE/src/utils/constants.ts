export const REDIS_CONFIG = {
    DEFAULT_URL: 'redis://127.0.0.1:6379',
    MAX_RETRY_DELAY: 3600,
    MAX_RETRY_TIME: 100 * 60 * 60,
} as const;