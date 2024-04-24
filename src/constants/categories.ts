export enum ExpanseCategory {
  Food = "food",
  Donations = "donations",
  Housing = "housing",
  Taxes = "taxes",
  Savings = "savings",
  Sport = "sport",
  Health = "health",
  Utilities = "utilities",
  Animals = "animals",
  Clothings = "clothings",
}
export enum IncomeCategory {
  Salary = "salary",
  SideHustle = "side",
  Investment = "investment",
  Rental = "rental",
}

export type Category = {
  title: ExpanseCategory | IncomeCategory;
  icon: string;
};

export const ExpanseCategories: Category[] = [
  { title: ExpanseCategory.Food, icon: "mdi-food" },
  {
    title: ExpanseCategory.Donations,
    icon: "mdi-piggy-bank",
  },
  { title: ExpanseCategory.Housing, icon: "mdi-home" },
  { title: ExpanseCategory.Taxes, icon: "mdi-cash-multiple" },
  { title: ExpanseCategory.Savings, icon: "mdi-sack" },
  { title: ExpanseCategory.Sport, icon: "mdi-soccer" },
  {
    title: ExpanseCategory.Health,
    icon: "mdi-medication-outline",
  },
  { title: ExpanseCategory.Utilities, icon: "mdi-hammer" },
  { title: ExpanseCategory.Animals, icon: "mdi-dog-side" },
  {
    title: ExpanseCategory.Clothings,
    icon: "mdi-tshirt-crew",
  },
];

export const IncomeCategories: Category[] = [
  { title: IncomeCategory.Salary, icon: "mdi-cash-multiple" },
  {
    title: IncomeCategory.SideHustle,
    icon: "mdi-currency-usd",
  },
  {
    title: IncomeCategory.Investment,
    icon: "mdi-cash-multiple",
  },
  { title: IncomeCategory.Rental, icon: "mdi-home-city" },
];

export const Categories: Category[] = [
  ...ExpanseCategories,
  ...IncomeCategories,
];

export const getCategoryIcon = (title: string) => {
  const category = Categories.find((c) => c.title === title);
  if (category) return category.icon;
};
