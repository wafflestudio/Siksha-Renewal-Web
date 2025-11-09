import { useCallback, useSyncExternalStore } from "react";

export default function useLocalStorage(key: string, initialValue: any) {
  // set localStorage item
  const setStorage = useCallback(
    (newValue: string) => {
      localStorage.setItem(key, newValue);
      dispatchEvent(
        new StorageEvent("storage", {
          key: key,
          newValue,
          storageArea: localStorage,
        }),
      );
    },
    [key],
  );

  // remove localStorage item
  const removeStorage = useCallback(() => {
    localStorage.removeItem(key);
    dispatchEvent(
      new StorageEvent("storage", {
        key: key,
        storageArea: localStorage,
      }),
    );
  }, [key]);

  // get localStorage item
  const getSnapshot = () => localStorage.getItem(key);

  //get temporary item value for server side rendering
  const getServerSnapshot = () => initialValue;

  // subscribe localStorage item to react change
  const subscribe = (listener: () => void) => {
    const handleStorageChange = (e: StorageEvent) => {
      // Only trigger listener if this specific key changed
      // e.key === null means localStorage.clear() was called
      if (e.key === key || e.key === null) {
        listener();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  };

  const store: string | null = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    value: store,
    set: setStorage,
    remove: removeStorage,
  };
}
