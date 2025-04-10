import { FilterList } from "hooks/UseFilter";

// src/constants/priceFilterOptions.ts
export const PRICE_FILTER_OPTIONS = {
  min: 2500,
  max: 10000,
  step: 500,
};

export const DISTANCE_FILTER_OPTIONS = {
  min: 200,
  max: 1000,
  val_infinity: 1050,
  step: 50,
};

export const defaultFilters: FilterList = {
  length: Infinity,
  priceMin: 0,
  priceMax: Infinity,
  ratingMin: 0,
  isReview: false,
  category: [],
  isAvailableOnly: false,
  isFestival: false,
};
