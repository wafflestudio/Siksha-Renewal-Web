import { useState } from "react";
import useLocalStorage from "./UseLocalStorage";

export default function useIsExceptEmpty() {
  const { value, set: setStorage } = useLocalStorage("isExceptEmpty", "true");
  const isExceptEmpty = JSON.parse(value ? value : "true");

  function toggleIsExceptEmpty() {
    setStorage(JSON.stringify(!isExceptEmpty));
  }

  return { isExceptEmpty, toggleIsExceptEmpty };
}
