import Slider from "rc-slider";
import MobileBottomSheet from "./MobileBottomSheet";
import { FilterActionSection, MobileFilterText } from "./MobileFilterBottomSheet";
import useFilter from "hooks/useFilter";
import Button from "components/general/Button";
import { useState } from "react";

interface MobileFilterDistanceBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileFilterDistanceBottomSheet({
  isOpen,
  onClose,
}: MobileFilterDistanceBottomSheetProps) {
  const { filterList, setFilterList, defaultFilters } = useFilter();
  const [length, setLength] = useState(200);

  const handleOnComplete = () => {
    setFilterList({
      ...filterList,
      length: length,
    });
    onClose();
  };

  const handleOnReset = () => {
    setFilterList({
      ...filterList,
      length: defaultFilters.length,
    });
    onClose();
  };

  return (
    <MobileBottomSheet isOpen={isOpen} onClose={onClose}>
      <MobileFilterText>거리</MobileFilterText>
      <Slider
        min={200}
        max={1050}
        step={50}
        value={length}
        defaultValue={1050}
        onChange={(value: number) => setLength(value)}
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
