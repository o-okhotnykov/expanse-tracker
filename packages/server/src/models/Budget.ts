import { Schema, model } from "mongoose";

enum MoneyOperationType {
  expanses = "expanses",
  incomes = "incomes",
}

interface BudgetSchema {
  name: string;
  amount: number;
  date: Date;
  category: string;
  type: MoneyOperationType;
  user: Schema.Types.ObjectId;
}

const BudgetSchema = new Schema<BudgetSchema>(
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

export default model<BudgetSchema>("Budget", BudgetSchema);
