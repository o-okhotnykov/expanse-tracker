export const validateSchema = {
  name(value: string) {
    if (value?.length >= 2) return true;

    return "Name needs to be at least 2 characters.";
  },
  amount(value: number) {
    if (value > 0) return true;

    return "Value needs to be number and has to be bigger than 0.";
  },
  category(value: string) {
    if (value) return true;

    return "Select an item.";
  },
};
