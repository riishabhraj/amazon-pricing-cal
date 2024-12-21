import { FeeStructure, IFeeStructure } from '../models/feeStructure.model';

interface CalculationData {
  productCategory: string;
  sellingPrice: number;
  weight: number;
  shippingMode: string;
  serviceLevel: 'standard' | 'premium';
  productSize: 'standard' | 'oversized';
  location: 'local' | 'regional' | 'national';
}

export const calculateTotalFees = async (data: CalculationData) => {
  try {
    console.log('Calculating fees for:', data);

    const feeStructure = await FeeStructure.findOne({ 
      category: data.productCategory 
    }) as IFeeStructure | null;
    
    if (!feeStructure) {
      console.error('Fee structure not found for category:', data.productCategory);
      console.log('Available categories:', await FeeStructure.distinct('category'));
      throw new Error(`Fee structure not found for category: ${data.productCategory}`);
    }

    // Calculate referral fee
    const referralFee = (data.sellingPrice * feeStructure.referralFeePercentage) / 100;

    // Get weight handling fee based on location
    const weightHandlingFee = feeStructure.weightHandlingFees[data.location.toLowerCase() as keyof typeof feeStructure.weightHandlingFees];

    // Get closing fee based on service level
    const closingFee = feeStructure.closingFees[data.serviceLevel.toLowerCase() as keyof typeof feeStructure.closingFees];

    // Get pick and pack fee based on product size
    const pickAndPackFee = feeStructure.pickAndPackFees[data.productSize.toLowerCase() as keyof typeof feeStructure.pickAndPackFees];

    // Calculate total fees
    const totalFees = referralFee + weightHandlingFee + closingFee + pickAndPackFee;

    // Calculate net earnings
    const netEarnings = data.sellingPrice - totalFees;

    return {
      breakdown: {
        referralFee,
        weightHandlingFee,
        closingFee,
        pickAndPackFee
      },
      totalFees,
      netEarnings
    };
  } catch (error) {
    console.error('Error in calculateTotalFees:', error);
    throw new Error(`Failed to calculate fees: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}; 