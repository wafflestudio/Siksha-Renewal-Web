export type AnalyticsEventMap = {
  filter_modal_opened: {
    entry_point: FilterEntryPoint;
    page_name?: string;
  };
  instant_filter_toggled: {
    filter_type: InstantFilter;
    filter_value: boolean;
    page_name?: string;
  };
  filter_modal_applied: {
    entry_point: keyof AppliedFilterOptionsByEntryPoint;
    applied_filter_options: AppliedFilterOptionsByEntryPoint[keyof AppliedFilterOptionsByEntryPoint];
    number_of_applied_filters?: number;
    page_name?: string;
  };
  filter_reset: {
    entry_point: FilterEntryPoint;
    page_name?: string;
  };
};

export type EventName = keyof AnalyticsEventMap;

export type AnalyticsEvent = {
  [K in EventName]: {
    name: K;
    props: AnalyticsEventMap[K];
  };
}[EventName];

export type FilterEntryPoint = "main_filter" | "distance_filter" | "price_filter" | "rating_filter";

export type InstantFilter = "is_open_now" | "has_reviews";

export type MainFilterOptions = {
  price_min: number;
  price_max: number;
  min_rating: number;
  is_open_now: boolean;
  has_reviews: boolean;
  max_distance_km: number;
};

export type DistanceFilterOptions = {
  max_distance_km: number;
};

export type PriceFilterOptions = {
  price_min: number;
  price_max: number;
};

export type MinRatingOptions = {
  min_rating: number;
};

export type AppliedFilterOptionsByEntryPoint = {
  main_filter: MainFilterOptions;
  distance_filter: DistanceFilterOptions;
  price_filter: PriceFilterOptions;
  rating_filter: MinRatingOptions;
};

export type AppliedFilterOptions = {
  [K in keyof AppliedFilterOptionsByEntryPoint]: {
    entry_point: K;
    applied_filter_options: AppliedFilterOptionsByEntryPoint[K];
  };
}[keyof AppliedFilterOptionsByEntryPoint];

// 이벤트 정의별 타입 생성
export const EventNames = {
  FILTER_MODAL_OPENED: "filter_modal_opened",
  INSTANT_FILTER_TOGGLED: "instant_filter_toggled",
  FILTER_MODAL_APPLIED: "filter_modal_applied",
  FILTER_RESET: "filter_reset",
} as const;
