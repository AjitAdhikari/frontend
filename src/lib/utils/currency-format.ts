export const formatCurrency = (amount: string) => {
  return `Rs. ${parseFloat(amount).toLocaleString()}`;
};
