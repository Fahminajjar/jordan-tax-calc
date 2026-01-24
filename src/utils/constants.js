export const DEFAULT_LANG = "en";

// Base exemptions
export const INDIVIDUAL_TAX_FREE = 9000;
export const FAMILY_TAX_FREE = 18000;

// Additional exemptions
export const SPOUSE_ALLOWANCE = 1000;
export const CHILD_ALLOWANCE = 1000;
export const MAX_CHILDREN = 3;
export const EXPENSES_ALLOWANCE = 1000; // Medical, education, rent, housing interest
export const DISABILITY_ALLOWANCE = 2000;
export const MAX_FAMILY_EXEMPTION = 23000;

// Social Security
export const SOCIAL_SECURITY_PERCENTAGE = 0.075;

// National contribution tax threshold
export const NATIONAL_CONTRIBUTION_THRESHOLD = 200000;
export const NATIONAL_CONTRIBUTION_RATE = 0.01;

// Tax brackets (annual income)
export const TAX_BRACKETS = [
  { limit: 5000, rate: 0.05 },
  { limit: 5000, rate: 0.10 },
  { limit: 5000, rate: 0.15 },
  { limit: 5000, rate: 0.20 },
  { limit: 980000, rate: 0.25 }, // Up to 1,000,000
  { limit: Infinity, rate: 0.30 }, // Over 1,000,000
];

export const LANG_STORAGE_KEY = "jordanTaxCalc_lang";

export const GOOGLE_ANALYTICS_ID = "G-WL24P48BP1";
