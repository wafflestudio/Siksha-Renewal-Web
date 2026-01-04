import MobileBottomSheet from "./MobileBottomSheet";
import { FilterActionSection, MobileFilterText } from "./MobileFilterBottomSheet";
import UseFilter from "hooks/UseFilter";
import Button from "components/general/Button";
import { useEffect, useState } from "react";
import MobileDistanceSlider from "./MobileDistanceSlider";
import { DISTANCE_FILTER_OPTIONS, defaultFilters } from "constants/filterOptions";
import { trackEvent } from "utils/MixPanel";
import { EventNames } from "constants/track";

interface MobileFilterDistanceBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileFilterDistanceBottomSheet({
  isOpen,
  onClose,
}: MobileFilterDistanceBottomSheetProps) {
  const { filterList, changeFilterOption, countChangedFilters } = UseFilter();
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

    trackEvent({
      name: EventNames.FILTER_MODAL_APPLIED,
      props: {
        entry_point: "distance_filter",
        applied_filter_options: {
          max_distance_km: valLength / 1000,
        },
        number_of_applied_filters: countChangedFilters({ length: valLength }),
        page_name: "meal_list_page",
      },
    });
    onClose();
  };

  const handleOnReset = () => {
    const defaultLength = defaultFilters.length;
    setLength(defaultLength);
    changeFilterOption({
      length: defaultLength,
    });
    trackEvent({
      name: EventNames.FILTER_RESET,
      props: {
        entry_point: "distance_filter",
        page_name: "meal_list_page",
      },
    });
  };

  return (
    <MobileBottomSheet isOpen={isOpen} onClose={onClose} showHandle={false}>
      <MobileFilterText>거리</MobileFilterText>
      <div style={{ height: 56.5 }} />
      <MobileDistanceSlider length={length} onLengthChange={(value) => setLength(value)} />
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
