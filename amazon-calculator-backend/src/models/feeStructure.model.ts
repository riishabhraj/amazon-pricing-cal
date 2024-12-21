import mongoose from 'mongoose';

interface IFeeStructure {
  category: string;
  referralFeePercentage: number;
  weightHandlingFees: {
    local: number;
    regional: number;
    national: number;
  };
  closingFees: {
    standard: number;
    premium: number;
  };
  pickAndPackFees: {
    standard: number;
    oversized: number;
  };
}

const feeStructureSchema = new mongoose.Schema<IFeeStructure>({
  category: { type: String, required: true },
  referralFeePercentage: { type: Number, required: true },
  weightHandlingFees: {
    local: { type: Number, required: true },
    regional: { type: Number, required: true },
    national: { type: Number, required: true }
  },
  closingFees: {
    standard: { type: Number, required: true },
    premium: { type: Number, required: true }
  },
  pickAndPackFees: {
    standard: { type: Number, required: true },
    oversized: { type: Number, required: true }
  }
});

export const FeeStructure = mongoose.model<IFeeStructure>('FeeStructure', feeStructureSchema);
export type { IFeeStructure }; 