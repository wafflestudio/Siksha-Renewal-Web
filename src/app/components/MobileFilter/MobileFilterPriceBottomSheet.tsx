import MobileBottomSheet from "./MobileBottomSheet";
import { FilterActionSection, MobileFilterText } from "./MobileFilterBottomSheet";
import UseFilter from "hooks/UseFilter";
import Button from "components/general/Button";
import { useEffect, useState } from "react";
import MobilePriceSlider from "./MobilePriceSlider";
import { PRICE_FILTER_OPTIONS, defaultFilters } from "constants/filterOptions";
import { trackEvent } from "utils/MixPanel";
import { EventNames } from "constants/track";

interface MobileFilterPriceBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileFilterPriceBottomSheet({
  isOpen,
  onClose,
}: MobileFilterPriceBottomSheetProps) {
  const { filterList, changeFilterOption, countChangedFilters } = UseFilter();
  const [priceMin, setPriceMin] = useState(defaultFilters.priceMin);
  const [priceMax, setPriceMax] = useState(defaultFilters.priceMax);

  const handleOnComplete = () => {
    const valPriceMin = priceMin === PRICE_FILTER_OPTIONS.min ? defaultFilters.priceMin : priceMin;
    const valPriceMax = priceMax === PRICE_FILTER_OPTIONS.max ? defaultFilters.priceMax : priceMax;

    changeFilterOption({
      priceMax: valPriceMax,
      priceMin: valPriceMin,
    });

    trackEvent({
      name: EventNames.FILTER_MODAL_APPLIED,
      props: {
        entry_point: "price_filter",
        applied_filter_options: {
          price_max: valPriceMax,
          price_min: valPriceMin,
        },
        number_of_applied_filters: countChangedFilters({
          priceMax,
          priceMin,
        }),
        page_name: "meal_list_page",
      },
    });
    onClose();
  };

  useEffect(() => {
    setPriceMax(filterList.priceMax);
  }, [filterList.priceMax]);

  useEffect(() => {
    setPriceMin(filterList.priceMin);
  }, [filterList.priceMin]);

  const handleOnReset = () => {
    const defaultPriceMax = defaultFilters.priceMax;
    const defaultPriceMin = defaultFilters.priceMin;

    setPriceMax(defaultPriceMax);
    setPriceMin(defaultPriceMin);

    changeFilterOption({
      priceMax: defaultPriceMax,
      priceMin: defaultPriceMin,
    });
    trackEvent({
      name: EventNames.FILTER_RESET,
      props: {
        entry_point: "price_filter",
        page_name: "meal_list_page",
      },
    });
  };

  return (
    <MobileBottomSheet isOpen={isOpen} onClose={onClose} showHandle={false}>
      <MobileFilterText>가격</MobileFilterText>
      <div style={{ height: 56.5 }} />
      <MobilePriceSlider
        priceRange={[priceMin, priceMax]}
        onPriceRangeChange={([valueMin, valueMax]) => {
          setPriceMin(valueMin);
          setPriceMax(valueMax);
        }}
      />

      <div style={{ height: 58 }} />
      <FilterActionSection marginBottom="19">
        <Button variant="neutral" onClick={handleOnReset}>
          초기화
        </Button>
        <Button variant="primary" onClick={handleOnComplete}>
          완료
        </Button>
      </FilterActionSection>
    </MobileBottomSheet>
  );
}
