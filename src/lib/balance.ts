/**
 * Calculate the balance of the account, given the balance and the amount to be added or subtracted
 * @param cost
 * @param markupPercentage
 * @returns
 */
export const calculateMarkup = (
  cost: number,
  markupPercentage: number
): number => {
  let markupDecimal = markupPercentage / 100;
  let chargedPrice = cost + cost * markupDecimal;

  return chargedPrice;
};
