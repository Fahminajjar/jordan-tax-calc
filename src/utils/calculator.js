import {
  FAMILY_TAX_FREE,
  INDIVIDUAL_TAX_FREE,
  SOCIAL_SECURITY_PERCENTAGE,
} from "utils/constants";

const calculateSocialSecurity = gross => gross * SOCIAL_SECURITY_PERCENTAGE;

const toThreeFloatingPoints = val => parseFloat(val.toFixed(3));

export const calculateTax = ({ gross, isFamily }) => {
  const taxFree = isFamily ? FAMILY_TAX_FREE : INDIVIDUAL_TAX_FREE;
  const monthlyTaxFree = taxFree / 12;

  let result = {};

  if (gross <= monthlyTaxFree) {
    result.tax = 0.0;
  } else {
    let taxableGross = (gross * 12) - (monthlyTaxFree * 12);
    let tax = 0.0;
    let percentage = 0.05;

    while (taxableGross > 0) {
      if (taxableGross > 5000) {
        tax += (5000 * percentage);
        taxableGross -= 5000;
      } else {
        // Last chunk
        tax += (taxableGross * percentage);
        taxableGross = 0;
      }

      if (percentage < 0.25) {
        percentage += 0.05;
      }
    }
    result.tax = toThreeFloatingPoints(tax / 12);
  }

  // result.tax = gross <= monthlyTaxFree ? 0.0 : (gross - monthlyTaxFree) * 0.2;
  result.percentage = parseFloat((result.tax / gross).toFixed(3));
  result.net = gross - result.tax;
  result.socialSecurity = calculateSocialSecurity(gross);
  result.net = toThreeFloatingPoints(gross - result.tax - result.socialSecurity);

  return result;
};
