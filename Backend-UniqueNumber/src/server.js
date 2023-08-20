import express from 'express';
import numbersRoutes from './merge.route.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello to Memories API');
});

app.use('/numbers', numbersRoutes);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server Running...', port));