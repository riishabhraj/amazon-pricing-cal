import { Router } from 'express';
import { calculateProfitability, getFeeStructure } from '../controllers/calculator.controller';

const router = Router();

// Wrap async route handlers to properly catch errors
const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Test endpoint
router.get('/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

router.post('/profitability-calculator', asyncHandler(calculateProfitability));
router.get('/fee-structure', asyncHandler(getFeeStructure));

export { router as calculatorRoutes }; 