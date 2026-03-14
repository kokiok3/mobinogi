import dotenv from 'dotenv'; // 또는 import 'dotenv/config';
import { createClient } from 'redis';

const dev = process.env.NODE_ENV !== 'production';
if (dev) {
    dotenv.config({ path: '.env.crawler.local' });
}

// Redis 연결
// const redisClient = createClient() // 로컬 redis 연결 시 사용
const redisClient = createClient({
    url: `redis://default:${process.env.REDIS_PW}@${process.env.REDIS_PROXY_DOMAIN}:${process.env.REDIS_PORT}`
})

redisClient.on('connect', () => {
    console.info('Redis connected!');
})
redisClient.on('error', (error: any) => {
    console.info('Redis Error', error);
})

const connect = async () => {
    await redisClient.connect().then();
    console.log('redisClient: ', redisClient)
    return redisClient;
}

connect();

export { redisClient }