import { useStateContext } from "providers/ContextProvider";
import { useCallback, useEffect, useState } from "react";
import { getIsFestival } from "utils/api/festival";
import useError from "./useError";
import { formatISODate } from "utils/FormatUtil";

export default function useFestival() {
  const { date } = useStateContext();
  const { onHttpError } = useError();
  const [ isFestivalDate, setIsFestivalDate ] = useState(false);

  const fetchIsFestivalDate = async () => {
    const dateString = formatISODate(date);
    getIsFestival(dateString)
      .then((response) => {
        console.log("isFestivalDate", response);
        setIsFestivalDate(response.is_festival);
      })
      .catch((e) => {
        onHttpError(e);
      });
    };

  useEffect(() => {
    if (date) {
      fetchIsFestivalDate()
    }
  }, [date]);

  return { isFestivalDate };
}