export const currencySymbols: Record<string, string> = {
  USD: "$",
  VND: "₫",
};

/**
 * Formats a number as a currency string based on the provided currency code.
 * @param amount The numeric amount to format.
 * @param currency The currency code (e.g., "USD", "VND"). Defaults to "USD".
 * @returns A formatted currency string (e.g., "$10.00" or "₫10.000,00").
 */
export const formatCurrency = (
  amount: number | undefined | null,
  currency: string = "USD",
): string => {
  if (typeof amount !== "number" || Number.isNaN(amount))
    return "Invalid Amount";

  const symbol = currencySymbols[currency] ?? currencySymbols["USD"] ?? "";
  return `${symbol}${amount.toFixed(2)}`;
};

export default formatCurrency;
