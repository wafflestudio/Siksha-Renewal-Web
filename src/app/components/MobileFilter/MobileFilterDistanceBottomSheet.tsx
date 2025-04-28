import MobileBottomSheet from "./MobileBottomSheet";
import { FilterActionSection, MobileFilterText } from "./MobileFilterBottomSheet";
import UseFilter from "hooks/UseFilter";
import Button from "components/general/Button";
import { useEffect, useState } from "react";
import MobileDistanceSlider from "./MobileDistanceSlider";
import { DISTANCE_FILTER_OPTIONS, defaultFilters } from "constants/filterOptions";

interface MobileFilterDistanceBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileFilterDistanceBottomSheet({
  isOpen,
  onClose,
}: MobileFilterDistanceBottomSheetProps) {
  const { filterList, changeFilterOption } = UseFilter();
  const [length, setLength] = useState(defaultFilters.length);

  useEffect(() => {
    setLength(filterList.length);
  }, [filterList.length]);

  const handleOnComplete = () => {
    const valLength =
      length === DISTANCE_FILTER_OPTIONS.val_infinity ? defaultFilters.length : length;
    changeFilterOption({
      length: valLength,
    });
    onClose();
  };

  const handleOnReset = () => {
    const defaultLength = defaultFilters.length;
    setLength(defaultLength);
    changeFilterOption({
      length: defaultLength,
    });
  };

  return (
    <MobileBottomSheet isOpen={isOpen} onClose={onClose} showHandle={false}>
      <MobileFilterText>거리</MobileFilterText>
      <div style={{ height: 65.5 }} />
      <MobileDistanceSlider length={length} onLengthChange={(value) => setLength(value)} />
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
