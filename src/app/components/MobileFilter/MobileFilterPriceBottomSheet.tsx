import Slider from "rc-slider";
import MobileBottomSheet from "./MobileBottomSheet";
import { FilterActionSection, MobileFilterText } from "./MobileFilterBottomSheet";
import useFilter from "hooks/useFilter";
import Button from "components/general/Button";
import { useState } from "react";

interface MobileFilterPriceBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileFilterPriceBottomSheet({
  isOpen,
  onClose,
}: MobileFilterPriceBottomSheetProps) {
  const { filterList, setFilterList, defaultFilters } = useFilter();
  const [priceMin, setPriceMin] = useState(2000);
  const [priceMax, setPriceMax] = useState(8000);

  const handleOnComplete = () => {
    setFilterList({
      ...filterList,
      priceMax,
      priceMin,
    });
    onClose();
  };

  const handleOnReset = () => {
    setFilterList({
      ...filterList,
      priceMax: defaultFilters.priceMax,
      priceMin: defaultFilters.priceMin,
    });
    onClose();
  };

  return (
    <MobileBottomSheet isOpen={isOpen} onClose={onClose}>
      <MobileFilterText>가격</MobileFilterText>
      <Slider
        range
        min={0}
        max={16000}
        step={1000}
        value={[priceMin, priceMax]}
        defaultValue={[2000, 8000]}
        onChange={([valueMin, valueMax]: [number, number]) => {
          setPriceMin(valueMin);
          setPriceMax(valueMax);
        }}
      />
      <FilterActionSection>
        <Button
          variant="neutral"
          onClick={handleOnReset}
          style={{
            width: "168px",
          }}
        >
          초기화
        </Button>
        <Button
          variant="primary"
          onClick={handleOnComplete}
          style={{
            width: "168px",
          }}
        >
          완료
        </Button>
      </FilterActionSection>
    </MobileBottomSheet>
  );
}
