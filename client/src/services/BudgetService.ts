import { MoneyOperation, MoneyOperationType } from "@expanse-tracker/shared";
import { BASE_URL, HttpService } from "./HttpService";

const BUDGET = "/budgets";

class BudgetService {
  private apiService: HttpService;
  constructor() {
    this.apiService = new HttpService(BASE_URL);
  }

  async getAllBudgets() {
    this.apiService.authInterceptor();
    const { data } = await this.apiService.get<MoneyOperation[]>(BUDGET);

    return data;
  }
  async getExpanses() {
    this.apiService.authInterceptor();
    const { data } = await this.apiService.get<MoneyOperation[]>(
      `${BUDGET}?type=${MoneyOperationType.expanses}`
    );

    return data;
  }

  async getIncomes() {
    this.apiService.authInterceptor();
    const { data } = await this.apiService.get<MoneyOperation[]>(
      `${BUDGET}?type=${MoneyOperationType.incomes}`
    );

    return data;
  }

  async postBudget(moneyOperation: MoneyOperation) {
    const { data } = await this.apiService.post<MoneyOperation[]>(
      BUDGET,
      moneyOperation
    );

    return data;
  }

  async deleteBudget(id: string) {
    const { data } = await this.apiService.delete(`${BUDGET}/${id}`);

    return data;
  }

  async patchBudget(moneyOperation: MoneyOperation) {
    const { data } = await this.apiService.patch(
      `${BUDGET}/${moneyOperation._id}`,
      moneyOperation
    );

    return data;
  }
}

export const budgetService = new BudgetService();
