"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { getLikedMenus } from "utils/api/menus";
import MobileSubHeader from "components/general/MobileSubHeader";
import { LikedMenusResponse } from "types";
import useAuth from "hooks/UseAuth";
import useLikedMenus from "hooks/UseLikedMenus";
import useError from "hooks/useError";
import useToast from "hooks/UseToast";
import LikedMenuCard from "app/components/LikedMenuCard";
import RestaurantInfo from "app/components/RestaurantInfo";
import { useStateContext } from "providers/ContextProvider";

export default function FavoriteMenus() {
  const { authStatus, authGuard, getAccessToken } = useAuth();
  const { removeLikedMenu } = useLikedMenus();
  const { onHttpError } = useError();
  const { showToast } = useToast();
  const { showInfo } = useStateContext();
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
    const fetchFavoriteMenus = async () => {
      if (authStatus !== "login") {
        setLoading(false);
        return;
      }

      try {
        const accessToken = await getAccessToken();
        const response = await getLikedMenus(accessToken);
        setFavoriteMenus(response.result);
      } catch (error) {
        onHttpError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteMenus();
  }, [authStatus, getAccessToken, onHttpError]);

  const handleUnlikeMenu = async (menuId: number) => {
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
  };

  const handleBellClick = () => {
    router.push("/account/menu/notification-settings");
  };

  if (loading) {
    return (
      <>
        <MobileSubHeader
          title="내가 찜한 메뉴"
          handleBack={() => router.push("/account")}
          rightIcon="/img/mage_notification-bell-plus.svg"
          onRightIconClick={handleBellClick}
        />
        <Container>
          <LoadingText>로딩 중...</LoadingText>
        </Container>
      </>
    );
  }

  return (
    <>
      <MobileSubHeader
        title="내가 찜한 메뉴"
        handleBack={() => router.push("/account")}
        rightIcon="/img/mage_notification-bell-plus.svg"
        onRightIconClick={handleBellClick}
      />
      <Container>
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
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    margin-top: 0px;
    padding: 16px;
    height: calc(100% - 60px);
  }
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: #999;
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
