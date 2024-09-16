import { useContext } from "react";
import { FestivalContext } from "context/FestivalProvider";

interface FestivalContextProps {
  isFestival: boolean;
  setIsFestival: (value: boolean) => void;
}

const useFestival = (): FestivalContextProps => {
  const { isFestival, setIsFestival } = useContext(FestivalContext);

  return { isFestival, setIsFestival };
};

export default useFestival;
