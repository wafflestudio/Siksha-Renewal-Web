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
    console.log('[LikedMenuIntro] Check effect triggered', { authStatus, shouldShow });

    if (authStatus === "loading") {
      console.log('[LikedMenuIntro] Auth still loading');
      return;
    }

    if (shouldShow !== null) {
      console.log('[LikedMenuIntro] Already determined, skipping');
      return;
    }

    // Only show for logged in users
    if (authStatus !== "login") {
      console.log('[LikedMenuIntro] User not logged in, not showing');
      setShouldShow(false);
      return;
    }

    const hasSeenIntro = localStorage.getItem('likedMenuIntroSeen');
    console.log('[LikedMenuIntro] localStorage check:', hasSeenIntro);

    if (hasSeenIntro === 'true') {
      console.log('[LikedMenuIntro] User has seen intro, not showing');
      setShouldShow(false);
    } else {
      console.log('[LikedMenuIntro] Will show modal');
      setShouldShow(true);
    }
  }, [authStatus, shouldShow]);

  // Show the modal when shouldShow becomes true
  useEffect(() => {
    if (shouldShow !== true) {
      return;
    }

    console.log('[LikedMenuIntro] Opening modal immediately');
    openModal(LikedMenuIntroModal, {
      onClose: () => {
        console.log('[LikedMenuIntro] Modal closed');
      }
    });
  }, [shouldShow, openModal]);

  return null;
}