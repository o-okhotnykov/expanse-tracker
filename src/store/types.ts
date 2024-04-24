export enum MoneyOperationType {
  expanses = "expanses",
  income = "incomes",
}

export interface MoneyOperation {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  type: MoneyOperationType;
}
