import { useEffect, useState } from "react";
import useAuth from "./UseAuth";
import useModals from "./UseModals";
import LikedMenuIntroModal from "components/general/LikedMenuIntroModal";

export default function useLikedMenuIntro() {
  const { authStatus } = useAuth();
  const { openModal } = useModals();
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);

  // Determine if we should show the modal (runs once when auth is ready)
  useEffect(() => {
    if (authStatus === "loading") {
      return;
    }

    if (shouldShow !== null) {
      return;
    }

    const hasSeenIntro = localStorage.getItem('likedMenuIntroSeen');

    if (hasSeenIntro === 'true') {
      setShouldShow(false);
    } else {
      setShouldShow(true);
    }
  }, [authStatus, shouldShow]);

  // Show the modal when shouldShow becomes true
  useEffect(() => {
    if (shouldShow !== true) {
      return;
    }

    openModal(LikedMenuIntroModal, {
      onClose: () => {}
    });
  }, [shouldShow, openModal]);

  return null;
}