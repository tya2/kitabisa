import express from 'express';
import * as problemMiddleware from '../middlewares/problem.middleware';
import * as problemController from '../controllers/problem.controller';

const router = express.Router();

router.get('/two', problemMiddleware.problemTwoGet, problemController.problemTwoGet);

router.post('/one', problemMiddleware.problemOne, problemController.problemOne);
router.post('/two', problemMiddleware.problemTwoAdd, problemController.problemTwoAdd);

router.put('/two/:playerId', problemMiddleware.problemTwoUpdate, problemController.problemTwoUpdate);

router.delete('/two/:playerId', problemMiddleware.problemTwoDelete, problemController.problemTwoDelete);

export default router;
