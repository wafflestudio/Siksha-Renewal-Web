import { useStateContext } from "../hooks/ContextProvider";
import LoginModal from "./Auth/LoginModal";

export default function LoginModalProvider() {
  const state = useStateContext();

  const { isLoginModal } = state;

  return <>{isLoginModal && <LoginModal />}</>;
}
