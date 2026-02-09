import { createClient } from 'redis';

// Redis 연결
const redisClient = createClient();
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