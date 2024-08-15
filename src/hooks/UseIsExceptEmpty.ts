import { useState } from "react";
import useLocalStorage from "./UseLocalStorage";

export default function useIsExceptEmpty() {
  const { value, set: setStorage } = useLocalStorage("isExceptEmpty", "true");
  const parsedValue = JSON.parse(value ? value : "true");

  // localStorage에 아무것도 저장이 안되어 있을 때 initialize 작업 필요

  const [isExceptEmpty, setIsExceptEmpty] = useState(parsedValue);

  function toggleIsExceptEmpty() {
    setStorage(JSON.stringify(!isExceptEmpty));
    setIsExceptEmpty(!isExceptEmpty);
  }

  return { isExceptEmpty, toggleIsExceptEmpty };
}
