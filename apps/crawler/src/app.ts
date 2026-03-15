import express from 'express';
import mobinogiRouter from '#src/routes/rankRoute'
// import { cronRanking } from '#src/service/cronService';

const app = express();


const PORT = 8000;

app.use('/', mobinogiRouter);
app.listen(PORT, (err) => {
    if (err) throw err;
    console.info(`Ready on http://localhost:${PORT}`);
})

// cronRanking();

console.log('--- PROCESS ENV CHECK ---');
console.log('REDIS_HOST FROM ENV:', process.env.REDIS_PROXY_DOMAIN);
console.log('--------------------------');

export default app;