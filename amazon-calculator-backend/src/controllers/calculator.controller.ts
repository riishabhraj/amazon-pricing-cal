import { Request, Response } from 'express';
import { FeeStructure } from '../models/feeStructure.model';
import { calculateTotalFees } from '../services/calculator.service';
import { syncFeeStructure } from '../services/sheets.service';

export const calculateProfitability = async (req: Request, res: Response) => {
    try {
        console.log('Received calculation request:', req.body);
        const calculatedFees = await calculateTotalFees(req.body);
        console.log('Calculated fees:', calculatedFees);
        res.json(calculatedFees);
    } catch (error) {
        console.error('Error in calculateProfitability:', error);
        res.status(500).json({ 
            error: error instanceof Error ? error.message : 'Error calculating fees'
        });
    }
};

export const getFeeStructure = async (req: Request, res: Response) => {
    try {
        console.log('Fetching fee structure...');
        // First, try to sync with Google Sheets
        await syncFeeStructure();
        console.log('Synced with Google Sheets');

        // Then fetch from database
        const feeStructure = await FeeStructure.find();
        console.log('Found fee structures:', feeStructure.length);
        
        if (!feeStructure.length) {
            console.log('No fee structures found');
            return res.status(404).json({ error: 'No fee structures found' });
        }
        
        res.json(feeStructure);
    } catch (error) {
        console.error('Error in getFeeStructure:', error);
        res.status(500).json({ 
            error: error instanceof Error ? error.message : 'Error fetching fee structure'
        });
    }
}; 