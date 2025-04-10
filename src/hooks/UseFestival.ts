import { useStateContext } from "providers/ContextProvider";
import { useMemo } from "react";

export default function useFestival() {
  const { date } = useStateContext();

  const START_DATE = "2025-05-13";
  const END_DATE = "2025-05-15";

  const isFestivalDate = useMemo(() => {
    const startDate = new Date(START_DATE);
    const endDate = new Date(END_DATE);

    return date >= startDate && date <= endDate;
  }, [date]);

  return { isFestivalDate };
}