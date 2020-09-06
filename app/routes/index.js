import express from 'express';
import problem from './problem.route';

const router = express.Router();

router.use('/problems', problem);

module.exports = router;
