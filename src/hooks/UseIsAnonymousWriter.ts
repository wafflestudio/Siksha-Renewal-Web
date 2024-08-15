import { useState } from "react";
import useLocalStorage from "./UseLocalStorage";

export default function useIsAnonymousWriter() {
  const { value, set: setStorage } = useLocalStorage("isAnonymousWriter", "false");
  const isAnonymousWriter = JSON.parse(value ? value : "false");

  function toggleIsAnonymousWriter() {
    setStorage(JSON.stringify(!isAnonymousWriter));
  }

  return { isAnonymousWriter, toggleIsAnonymousWriter };
}
