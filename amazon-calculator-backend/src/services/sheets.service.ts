import { FeeStructure } from '../models/feeStructure.model';

const FALLBACK_FEE_STRUCTURE = [
  {
    category: 'Books',
    referralFeePercentage: 15,
    weightHandlingFees: {
      local: 43,
      regional: 54.5,
      national: 76
    },
    closingFees: {
      standard: 14,
      premium: 20
    },
    pickAndPackFees: {
      standard: 14,
      oversized: 26
    }
  },
  {
    category: 'Automotive Vehicles',
    referralFeePercentage: 12,
    weightHandlingFees: {
      local: 100,
      regional: 150,
      national: 200
    },
    closingFees: {
      standard: 50,
      premium: 75
    },
    pickAndPackFees: {
      standard: 30,
      oversized: 60
    }
  },
  {
    category: 'Automotive - Helmets & Riding Gloves',
    referralFeePercentage: 8.5,
    weightHandlingFees: {
      local: 43,
      regional: 54.5,
      national: 76
    },
    closingFees: {
      standard: 14,
      premium: 20
    },
    pickAndPackFees: {
      standard: 14,
      oversized: 26
    }
  },
  {
    category: 'Electronics',
    referralFeePercentage: 5.5,
    weightHandlingFees: {
      local: 43,
      regional: 54.5,
      national: 76
    },
    closingFees: {
      standard: 14,
      premium: 20
    },
    pickAndPackFees: {
      standard: 14,
      oversized: 26
    }
  }
];

export const syncFeeStructure = async () => {
  try {
    console.log('Starting fee structure sync...');

    // Clear existing fee structures
    await FeeStructure.deleteMany({});
    console.log('Cleared existing fee structures');

    // Insert fallback data
    const result = await FeeStructure.insertMany(FALLBACK_FEE_STRUCTURE);
    console.log(`Inserted ${result.length} fee structures`);

    // Log available categories
    const categories = await FeeStructure.distinct('category');
    console.log('Available categories:', categories);

    return true;
  } catch (error) {
    console.error('Error in syncFeeStructure:', error);
    throw error;
  }
}; 