import useLocalStorage from "./UseLocalStorage";

export default function useIsAnonymousWriter() {
  const { value, set: setStorage } = useLocalStorage("isAnonymousWriter", "false");
  const isAnonymousWriter = JSON.parse(value ? value : "false");

  function setIsAnonymousWriter(anonymous: boolean) {
    setStorage(JSON.stringify(anonymous));
  }

  return { isAnonymousWriter, setIsAnonymousWriter };
}
