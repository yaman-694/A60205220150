import express from 'express';
import dotenv from 'dotenv';
import trainRoute from '../routes/train.route.js';
dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello to Memories API');
});

app.use('/trains', trainRoute);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server Running...', port));