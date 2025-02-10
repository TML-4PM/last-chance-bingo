// src/config/pricingConfig.ts
export const skuMultipliers: { [prefix: string]: number } = {
  LAP: 1.1,
  MON: 1.05,
  KEY: 1.02,
  MOU: 1.02,
  PRT: 1.15,
  SCN: 1.1,
  TAB: 1.08,
  HUB: 1.05,
  SPK: 1.05,
  UPS: 1.1,
};

export const jobComplexityMultipliers: { [key: string]: number } = {
  Basic: 1.0,
  Standard: 1.2,
  Advanced: 1.5,
  Extreme: 2.0,
};

export const serviceTypeMultipliers: { [key: string]: number } = {
  Remote: 0.8,
  "Onsite Standard": 1.0,
  "Onsite Urgent": 1.5,
};

export const environmentMultipliers: { [key: string]: number } = {
  Office: 1.0,
  Warehouse: 1.1,
  Retail: 1.15,
  Home: 0.95,
};

export const buildingAccessibilityMultipliers: { [key: string]: number } = {
  Easy: 1.0,
  Moderate: 1.1,
  Hard: 1.2,
};
