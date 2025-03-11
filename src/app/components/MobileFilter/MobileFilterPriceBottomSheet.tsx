import MobileBottomSheet from "./MobileBottomSheet";
import { FilterActionSection, MobileFilterText } from "./MobileFilterBottomSheet";
import useFilter from "hooks/useFilter";
import Button from "components/general/Button";
import { useEffect, useState } from "react";
import MobilePriceSlider from "./MobilePriceSlider";

interface MobileFilterPriceBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileFilterPriceBottomSheet({
  isOpen,
  onClose,
}: MobileFilterPriceBottomSheetProps) {
  const { filterList, setFilterList, defaultFilters } = useFilter();
  const [priceMin, setPriceMin] = useState(defaultFilters.priceMin);
  const [priceMax, setPriceMax] = useState(defaultFilters.priceMax);

  const handleOnComplete = () => {
    setFilterList({
      ...filterList,
      priceMax,
      priceMin,
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
    setFilterList({
      ...filterList,
      priceMax: defaultFilters.priceMax,
      priceMin: defaultFilters.priceMin,
    });
    onClose();
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
