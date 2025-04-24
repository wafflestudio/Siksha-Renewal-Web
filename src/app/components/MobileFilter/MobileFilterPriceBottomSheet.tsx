import MobileBottomSheet from "./MobileBottomSheet";
import { FilterActionSection, MobileFilterText } from "./MobileFilterBottomSheet";
import UseFilter from "hooks/UseFilter";
import Button from "components/general/Button";
import { useEffect, useState } from "react";
import MobilePriceSlider from "./MobilePriceSlider";
import { PRICE_FILTER_OPTIONS, defaultFilters } from "constants/filterOptions";

interface MobileFilterPriceBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileFilterPriceBottomSheet({
  isOpen,
  onClose,
}: MobileFilterPriceBottomSheetProps) {
  const { filterList, changeFilterOption } = UseFilter();
  const [priceMin, setPriceMin] = useState(defaultFilters.priceMin);
  const [priceMax, setPriceMax] = useState(defaultFilters.priceMax);

  const handleOnComplete = () => {
    const valPriceMin = priceMin === PRICE_FILTER_OPTIONS.min ? defaultFilters.priceMin : priceMin;
    const valPriceMax = priceMax === PRICE_FILTER_OPTIONS.max ? defaultFilters.priceMax : priceMax;

    changeFilterOption({
      priceMax: valPriceMax,
      priceMin: valPriceMin,
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
  };

  return (
    <MobileBottomSheet isOpen={isOpen} onClose={onClose} slideBar={false}>
      <MobileFilterText>가격</MobileFilterText>
      <div style={{ height: 65.5 }} />
      <MobilePriceSlider
        priceRange={[priceMin, priceMax]}
        onPriceRangeChange={([valueMin, valueMax]) => {
          setPriceMin(valueMin);
          setPriceMax(valueMax);
        }}
      />

      <div style={{ height: 67 }} />
      <FilterActionSection marginBottom="45">
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
