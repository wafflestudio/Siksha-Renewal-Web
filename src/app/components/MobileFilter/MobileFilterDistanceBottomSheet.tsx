import MobileBottomSheet from "./MobileBottomSheet";
import { FilterActionSection, MobileFilterText } from "./MobileFilterBottomSheet";
import useFilter from "hooks/useFilter";
import Button from "components/general/Button";
import { useEffect, useState } from "react";
import MobileDistanceSlider from "./MobileDistanceSlider";

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

  useEffect(() => {
    setLength(filterList.length);
  }, [filterList.length]);

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
    <MobileBottomSheet isOpen={isOpen} onClose={onClose} slideBar={false}>
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
