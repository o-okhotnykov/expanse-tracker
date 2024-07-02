export enum MoneyOperationType {
  expanses = "expanse",
  incomes = "income",
}

export interface MoneyOperation {
  _id: string;
  name: string;
  amount: number;
  date: Date;
  category: string;
  type: MoneyOperationType;
}

export interface ResponseBudget {
  name: string;
  amount: number;
  date: Date;
  category: string;
  type: MoneyOperationType;
}

export interface BudgetSchema {
  name: string;
  amount: number;
  date: Date;
  category: string;
  type: MoneyOperationType;
  _doc: BudgetSchema;
}
