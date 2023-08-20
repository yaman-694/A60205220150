import express from 'express';
import fetchTrain from '../controllers/train.controller.js';

const router = express.Router();

router.get('/', fetchTrain);


export default router;