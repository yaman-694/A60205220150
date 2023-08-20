
import express from 'express';
import { mergeUnique } from './merge.controller.js';
const router = express.Router();


router.get('/', mergeUnique);

export default router;