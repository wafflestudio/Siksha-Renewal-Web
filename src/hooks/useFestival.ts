import { useEffect, useMemo } from "react";
import useLocalStorage from "./UseLocalStorage";

interface FestivalContextProps {
  isFestival: boolean;
  setIsFestival: (value: boolean) => void;
  isFestivalDate: boolean;
  isPopup: boolean;
  disablePopup: () => void;
}

const useFestival = (): FestivalContextProps => {
  const { value: isFestivalStorage, set: setIsFestivalStorage } = useLocalStorage(
    "24festival_isFestival",
    true,
  );

  useEffect(() => {
    if (isFestivalStorage === null) setIsFestivalStorage("true");
  }, [isFestivalStorage]);

  const isFestival = useMemo(() => isFestivalStorage === "true", [isFestivalStorage]);
  const setIsFestival = (value: boolean) => setIsFestivalStorage(String(value));

  const { value: disablePopupTime, set: setDisablePopupTime } = useLocalStorage(
    "24festival_disablePopupTime",
    null,
  );

  const isPopup = useMemo(() => {
    const current = new Date();
    const currentYear = current.getFullYear();
    const currentMonth = current.getMonth() + 1;
    const currentDate = current.getDate();
    if (currentYear !== 2024 || currentMonth !== 9) return false;
    if (currentDate > 26) return false;

    if (!disablePopupTime) return true;
    else return currentDate > Number(disablePopupTime);
  }, [disablePopupTime]);

  const disablePopup = () => {
    const date = new Date();

    setDisablePopupTime(String(date.getDate()));
  };

  const isFestivalDate = useMemo(() => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDate = date.getDate();
    return currentYear === 2024 && currentMonth === 9 && currentDate <= 26;
  }, []);

  return { isFestival, setIsFestival, isFestivalDate, isPopup, disablePopup };
};

export default useFestival;
