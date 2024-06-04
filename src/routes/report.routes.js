import { Router } from 'express';
import { getDailyReport, getWeeklyReport, getMonthlyReport } from '../controllers/report.controller.js';

const router = Router();

router.get('/reports/daily', getDailyReport);
router.get('/reports/weekly', getWeeklyReport);
router.get('/reports/monthly', getMonthlyReport);

export default router;
