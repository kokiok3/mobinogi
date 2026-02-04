import { Router } from 'express';
import { redisClient } from '#src/redis.ts'

const router = Router();


router.get("/", async (req, res) => {
    let bool = await redisClient.set('test', '123'); // OK
    console.log('bool: ', bool)
    return res.send("Hello World");
});

export default router;