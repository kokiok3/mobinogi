import express from 'express';
import mobinogiRouter from '#src/routes/rankRoute'
const app = express();


const dev = process.env.NODE_ENV !== 'production';
const PORT = 8000;

app.use('/mobinogi', mobinogiRouter);
app.listen(PORT, (err) => {
    if (err) throw err;
    console.info(`Ready on http://localhost:${PORT}`);
})
