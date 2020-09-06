import express from 'express';
import * as problemMiddleware from '../middlewares/problem.middleware';
import * as problemController from '../controllers/problem.controller';

const router = express.Router();

router.post('/one', problemMiddleware.problemOne, problemController.problemOne);

export default router;
