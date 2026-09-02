// ============================================================================
// Service Constants & Enums
// ============================================================================

// Service Categories
export const SERVICE_CATEGORIES = {
  WORSHIP: 'WORSHIP',
  PRAYER: 'PRAYER',
  FELLOWSHIP: 'FELLOWSHIP',
} as const;

export type ServiceCategory = typeof SERVICE_CATEGORIES[keyof typeof SERVICE_CATEGORIES];

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  WORSHIP: 'Worship',
  PRAYER: 'Prayer',
  FELLOWSHIP: 'Fellowship',
};

// Regions
export const REGIONS = {
  SINGAPORE: 'SINGAPORE',
  INDIA: 'INDIA',
} as const;

export type Region = typeof REGIONS[keyof typeof REGIONS];

export const REGION_LABELS: Record<Region, string> = {
  SINGAPORE: 'Singapore',
  INDIA: 'India',
};

// Fellowship Groups
export const FELLOWSHIP_GROUPS = {
  WOMEN_FELLOWSHIP: 'WOMEN_FELLOWSHIP',
  DOR_BROTHERS: 'DOR_BROTHERS',
} as const;

export type FellowshipGroup = typeof FELLOWSHIP_GROUPS[keyof typeof FELLOWSHIP_GROUPS];

export const FELLOWSHIP_GROUP_LABELS: Record<FellowshipGroup, string> = {
  WOMEN_FELLOWSHIP: 'Women Fellowship',
  DOR_BROTHERS: 'Dor Brothers',
};

// Branches
export const BRANCHES = {
  SINGAPORE: {
    BARTLEY: 'Bartley',
    PPH: 'PPH',
  },
  INDIA: {
    HYDERABAD: 'Hyderabad',
    VISAKHAPATNAM: 'Visakhapatnam',
    RAJAHMUNDRY: 'Rajahmundry',
  },
} as const;

// Validation helpers
export function isValidServiceCategory(value: unknown): value is ServiceCategory {
  return Object.values(SERVICE_CATEGORIES).includes(value as ServiceCategory);
}

export function isValidRegion(value: unknown): value is Region {
  return Object.values(REGIONS).includes(value as Region);
}

export function isValidFellowshipGroup(value: unknown): value is FellowshipGroup {
  return Object.values(FELLOWSHIP_GROUPS).includes(value as FellowshipGroup);
}

// Business logic helpers
export function isRegionRequiredForCategory(category: ServiceCategory): boolean {
  return category === SERVICE_CATEGORIES.PRAYER;
}

export function isFellowshipGroupRequiredForCategory(category: ServiceCategory): boolean {
  return category === SERVICE_CATEGORIES.FELLOWSHIP;
}

export function getFellowshipGroupsForCategory(category: ServiceCategory): FellowshipGroup[] {
  if (category === SERVICE_CATEGORIES.FELLOWSHIP) {
    return Object.values(FELLOWSHIP_GROUPS);
  }
  return [];
}
