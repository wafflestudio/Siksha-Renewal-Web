import { useCallback, useSyncExternalStore } from "react";

export default function useLocalStorage(key: string, initialValue: any) {
  // set localStorage item
  const setStorage = useCallback(
    (newValue: string) => {
      localStorage.setItem(key, newValue);
      dispatchEvent(new StorageEvent("storage", { key: key, newValue }));
    },
    [key],
  );

  // remove localStorage item
  const removeStorage = useCallback(() => {
    localStorage.removeItem(key);
    dispatchEvent(new StorageEvent("storage", { key: key }));
  }, [key]);

  // get localStorage item
  const getSnapshot = () => localStorage.getItem(key);

  //get temporary item value for server side rendering
  const getServerSnapshot = () => initialValue;

  // subscribe localStorage item to react change
  const subsribe = (listener: () => void) => {
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  };

  const store = useSyncExternalStore(subsribe, getSnapshot, getServerSnapshot);

  return {
    value: store,
    set: setStorage,
    remove: removeStorage,
  };
}
