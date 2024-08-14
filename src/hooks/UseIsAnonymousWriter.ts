import { useEffect, useState } from "react";
import { useDispatchContext, useStateContext } from "./ContextProvider";
import useLocalStorage from "./UseLocalStorage";
import useAuth from "./UseAuth";

export default function useIsAnonymousWriter() {
  const { authStatus } = useAuth();

  const [isAnonymousWriter, setIsAnonymousWriter] = useState<boolean>(false);

  const { value, set: setStorage } = useLocalStorage("isAnonymousWriter", "false");
  const initailValue = JSON.parse(value);

  useEffect(() => {
    if (authStatus === "login") {
      setIsAnonymousWriter(initailValue);
    }
  }, [authStatus]);

  function toggleIsAnonymousWriter() {
    setIsAnonymousWriter(!isAnonymousWriter);
    setStorage(!isAnonymousWriter);
  }

  return { isAnonymousWriter, toggleIsAnonymousWriter };
}
