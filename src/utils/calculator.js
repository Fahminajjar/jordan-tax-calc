import {
  FAMILY_TAX_FREE,
  INDIVIDUAL_TAX_FREE,
  SOCIAL_SECURITY_PERCENTAGE,
  CHILD_ALLOWANCE,
  MAX_CHILDREN,
  EXPENSES_ALLOWANCE,
  DISABILITY_ALLOWANCE,
  MAX_FAMILY_EXEMPTION,
  NATIONAL_CONTRIBUTION_THRESHOLD,
  NATIONAL_CONTRIBUTION_RATE,
  TAX_BRACKETS,
} from "utils/constants";

const toTwoDecimalPlaces = val => parseFloat(val.toFixed(2));
const toThreeFloatingPoints = val => parseFloat(val.toFixed(3));

/**
 * Calculate total annual exemptions based on inputs
 */
const calculateTotalExemptions = ({
  isFamily,
  numberOfChildren,
  hasDisability,
  additionalExpenses,
}) => {
  // Base exemption (individual or family); FAMILY_TAX_FREE already covers both spouses
  let totalExemption = isFamily ? FAMILY_TAX_FREE : INDIVIDUAL_TAX_FREE;

  // Children allowance (max 3 children)
  const childrenCount = Math.min(numberOfChildren || 0, MAX_CHILDREN);
  totalExemption += childrenCount * CHILD_ALLOWANCE;

  // Additional expenses (medical, education, rent, housing interest) - capped at 1000
  const expenses = Math.min(additionalExpenses || 0, EXPENSES_ALLOWANCE);
  totalExemption += expenses;

  // Disability allowance
  if (hasDisability) {
    totalExemption += DISABILITY_ALLOWANCE;
  }

  // Apply maximum family exemption ceiling
  if (isFamily) {
    totalExemption = Math.min(totalExemption, MAX_FAMILY_EXEMPTION);
  }

  return totalExemption;
};

/**
 * Calculate tax using progressive brackets
 */
const calculateProgressiveTax = (taxableIncome) => {
  if (taxableIncome <= 0) return 0;

  let remainingIncome = taxableIncome;
  let totalTax = 0;

  for (const bracket of TAX_BRACKETS) {
    if (remainingIncome <= 0) break;

    const taxableInBracket = Math.min(remainingIncome, bracket.limit);
    totalTax += taxableInBracket * bracket.rate;
    remainingIncome -= taxableInBracket;
  }

  return totalTax;
};

/**
 * Calculate national contribution tax (1% for income > 200,000 JOD)
 */
const calculateNationalContribution = (annualGross) => {
  if (annualGross > NATIONAL_CONTRIBUTION_THRESHOLD) {
    return annualGross * NATIONAL_CONTRIBUTION_RATE;
  }
  return 0;
};

/**
 * Calculate social security contribution
 */
const calculateSocialSecurity = (monthlyGross, isJordanian) => {
  if (!isJordanian) return 0;
  return monthlyGross * SOCIAL_SECURITY_PERCENTAGE;
};

/**
 * Main tax calculation function
 */
export const calculateTax = ({
  gross,
  isFamily = false,
  numberOfChildren = 0,
  hasDisability = false,
  additionalExpenses = 0,
  isJordanian = true,
}) => {
  const annualGross = gross * 12;

  // Calculate total exemptions
  const totalExemptions = calculateTotalExemptions({
    isFamily,
    numberOfChildren,
    hasDisability,
    additionalExpenses,
  });

  // Calculate taxable income
  const taxableIncome = Math.max(0, annualGross - totalExemptions);

  // Calculate progressive income tax
  const annualIncomeTax = calculateProgressiveTax(taxableIncome);

  // Calculate national contribution tax
  const annualNationalContribution = calculateNationalContribution(annualGross);

  // Total annual tax
  const totalAnnualTax = annualIncomeTax + annualNationalContribution;

  // Monthly values
  const monthlyTax = totalAnnualTax / 12;
  const socialSecurity = calculateSocialSecurity(gross, isJordanian);

  // Net salary calculation
  const netSalary = gross - monthlyTax - socialSecurity;

  return {
    // Monthly values
    tax: toThreeFloatingPoints(monthlyTax),
    socialSecurity: toTwoDecimalPlaces(socialSecurity),
    net: toTwoDecimalPlaces(netSalary),
    
    // Percentages
    percentage: toThreeFloatingPoints(monthlyTax / gross),
    effectiveRate: toThreeFloatingPoints((monthlyTax + socialSecurity) / gross),
    
    // Annual breakdown
    annualGross: toTwoDecimalPlaces(annualGross),
    totalExemptions: toTwoDecimalPlaces(totalExemptions),
    taxableIncome: toTwoDecimalPlaces(taxableIncome),
    annualTax: toTwoDecimalPlaces(totalAnnualTax),
    annualIncomeTax: toTwoDecimalPlaces(annualIncomeTax),
    annualNationalContribution: toTwoDecimalPlaces(annualNationalContribution),
    annualSocialSecurity: toTwoDecimalPlaces(socialSecurity * 12),
    annualNet: toTwoDecimalPlaces(netSalary * 12),
  };
};
