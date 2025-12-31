"use client";
import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { getLikedMenus } from "utils/api/menus";
import MobileSubHeader from "components/general/MobileSubHeader";
import { LikedMenusResponse } from "types";
import useAuth from "hooks/UseAuth";
import useLikedMenus from "hooks/UseLikedMenus";
import useError from "hooks/useError";
import LikedMenuCard from "app/components/LikedMenuCard";
import RestaurantInfo from "app/components/RestaurantInfo";
import { useStateContext } from "providers/ContextProvider";
import useToast from "hooks/UseToast";

export default function FavoriteMenus() {
  const { authStatus, authGuard, getAccessToken } = useAuth();
  const { removeLikedMenu } = useLikedMenus();
  const { onHttpError } = useError();
  const { showInfo } = useStateContext();
  const { showToast } = useToast();
  const router = useRouter();
  const [favoriteMenus, setFavoriteMenus] = useState<LikedMenusResponse["result"]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(authGuard, [authStatus]);

  // Show speech-bubble toast on first visit
  useEffect(() => {
    const hasSeenBellToast = localStorage.getItem("likedMenuBellToastSeen");

    if (!hasSeenBellToast && authStatus === "login" && !loading) {
      const timer = setTimeout(() => {
        showToast("메뉴 알림을 받아보세요!", {
          variant: "speech-bubble",
          animationType: "fade",
          duration: 5000,
          delay: 500,
        });
        localStorage.setItem("likedMenuBellToastSeen", "true");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [authStatus, loading, showToast]);

  useEffect(() => {
    // Wait for auth status to be determined
    if (authStatus === "loading") {
      return;
    }

    // Not logged in - show empty state
    if (authStatus !== "login") {
      setLoading(false);
      return;
    }

    // Logged in - fetch data
    let isCancelled = false;

    const fetchFavoriteMenus = async () => {
      try {
        const accessToken = await getAccessToken();
        const response = await getLikedMenus(accessToken);
        if (!isCancelled) {
          setFavoriteMenus(response.result);
        }
      } catch (error) {
        if (!isCancelled) {
          onHttpError(error);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchFavoriteMenus();

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus]);

  // Memoize callback to prevent recreation on every render
  const handleUnlikeMenu = useCallback(
    async (menuId: number) => {
      await removeLikedMenu(menuId);
      // Update the current display by filtering out the unliked menu
      setFavoriteMenus((prev) =>
        prev
          .map((restaurant) => ({
            ...restaurant,
            menus: restaurant.menus.filter((menu) => menu.id !== menuId),
          }))
          .filter((restaurant) => restaurant.menus.length > 0),
      );
    },
    [removeLikedMenu],
  );

  // Memoize back handler to prevent recreation
  const handleBack = useCallback(() => {
    router.push("/account");
  }, []);

  if (loading) {
    return (
      <>
        <MobileSubHeader title="내가 찜한 메뉴" handleBack={handleBack} />
        <Container>
          <LoadingText>로딩 중...</LoadingText>
        </Container>
      </>
    );
  }

  return (
    <>
      <MobileSubHeader title="내가 찜한 메뉴" handleBack={handleBack} />
      <Container>
        <TitleCard>
          <TitleText>내가 찜한 메뉴</TitleText>
        </TitleCard>
        {favoriteMenus.length === 0 ? (
          <EmptyState>
            <EmptyText>내가 찜한 메뉴가 없어요</EmptyText>
          </EmptyState>
        ) : (
          favoriteMenus.map((restaurant) => (
            <LikedMenuCard key={restaurant.id} data={restaurant} onUnlikeMenu={handleUnlikeMenu} />
          ))
        )}
      </Container>
      {showInfo && (
        <Info>
          <RestaurantInfo />
        </Info>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  width: 544px;
  padding-bottom: 100px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin: 0 auto;

  @media (max-width: 768px) {
    margin-top: 0px;
    padding: 16px;
    padding-bottom: 100px;
    width: 100%;
    height: calc(100% - 60px);
    box-sizing: border-box;
    overflow-x: hidden;
    gap: 12px;
  }
`;

const TitleCard = styled.div`
  display: flex;
  padding: 18px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  border-radius: 10px;
  background: var(--SemanticColor-Background-Secondary, #ffffff);

  @media (max-width: 768px) {
    display: none;
  }
`;

const TitleText = styled.div`
  color: var(--Color-Foundation-gray-900, #262728);
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-16, 16px);
  font-style: normal;
  font-weight: var(--Font-weight-extrabold, 800);
  line-height: 140%;
  letter-spacing: var(--Font-letter-spacing-0, -0.3px);
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: var(--Color-Foundation-gray-600, #989aa0);
  text-align: center;
  padding: 40px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`;

const EmptyText = styled.div`
  color: var(--Color-Foundation-gray-600, #989aa0);
  text-align: center;
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.3px;
  white-space: nowrap;
`;

const Info = styled.div`
  display: flex;
  z-index: 100;
`;
