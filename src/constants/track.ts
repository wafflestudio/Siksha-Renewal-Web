export type AnalyticsEvent =
  | { name: "filter_modal_opened"; props: { entry_point: FilterEntryPoint; page_name?: string } }
  | {
      name: "instant_filter_toggled";
      props: { filter_type: string; filter_value: string; page_name?: string };
    }
  | {
      name: "filter_modal_applied";
      props: {
        entry_point: AppliedEntryPoint;
        applied_filter_options: AppliedFilterOptions;
        number_of_applied_filters?: number;
        page_name?: string;
      };
    }
  | {
      name: "filter_reset";
      props: {
        entry_point: string;
        page_name?: string;
      };
    };

export type FilterEntryPoint = "main_filter" | "distance_filter" | "price_filter" | "rating_filter";

export type AppliedEntryPoint = "main" | "distance" | "price" | "min_rating";

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
  min_rating: MinRatingOptions;
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
