import { useState } from "react";
import useLocalStorage from "./UseLocalStorage";

export default function useIsAnonymousWriter() {
  const { value, set: setStorage } = useLocalStorage("isAnonymousWriter", "false");
  const parsedValue = JSON.parse(value ? value : "false");

  const [isAnonymousWriter, setIsAnonymousWriter] = useState<boolean>(parsedValue);

  function toggleIsAnonymousWriter() {
    setIsAnonymousWriter(!isAnonymousWriter);
    setStorage(JSON.stringify(!isAnonymousWriter));
  }

  return { isAnonymousWriter, toggleIsAnonymousWriter };
}
