import { Schema, model } from "mongoose";
import { BudgetSchema, MoneyOperationType } from "../types/budget";

interface Budget extends BudgetSchema {
  user: Schema.Types.ObjectId;
}

const BudgetSchema = new Schema<Budget>(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: MoneyOperationType,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model<Budget>("Budget", BudgetSchema);
