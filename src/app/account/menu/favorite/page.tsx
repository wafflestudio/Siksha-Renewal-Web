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
import { formatPrice } from "utils/FormatUtil";

export default function FavoriteMenus() {
  const { authStatus, authGuard, getAccessToken } = useAuth();
  const { removeLikedMenu } = useLikedMenus();
  const { onHttpError } = useError();
  const router = useRouter();
  const [favoriteMenus, setFavoriteMenus] = useState<LikedMenusResponse["result"]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(authGuard, [authStatus]);

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
    setFavoriteMenus(prev => 
      prev.map(restaurant => ({
        ...restaurant,
        menus: restaurant.menus.filter(menu => menu.id !== menuId)
      })).filter(restaurant => restaurant.menus.length > 0)
    );
  };

  if (loading) {
    return (
      <>
        <MobileSubHeader title="내가 찜한 메뉴" handleBack={() => router.push("/account")} />
        <Container>
          <LoadingText>로딩 중...</LoadingText>
        </Container>
      </>
    );
  }

  return (
    <>
      <MobileSubHeader title="내가 찜한 메뉴" handleBack={() => router.push("/account")} />
      <Container>
        {favoriteMenus.length === 0 ? (
          <EmptyState>
            <EmptyText>찜한 메뉴가 없습니다</EmptyText>
            <EmptySubText>메뉴를 찜하면 여기에 표시됩니다</EmptySubText>
          </EmptyState>
        ) : (
          favoriteMenus.map((restaurant) => (
            <RestaurantGroup key={restaurant.id}>
              <RestaurantName>{restaurant.name_kr}</RestaurantName>
              <MenuList>
                {restaurant.menus.map((menu) => (
                  <MenuRow key={menu.id}>
                    <MenuInfo 
                      onClick={() => router.push(`/menu/${menu.id}`)}
                    >
                      <MenuName>
                        {menu.name_kr}
                        {menu.etc && menu.etc.find((e) => e == "No meat") && (
                          <VeganIcon src="/img/no-meat.svg" alt="채식 메뉴" />
                        )}
                      </MenuName>
                      <MenuDetails>
                        <Price>{menu.price ? formatPrice(menu.price) : "-"}</Price>
                        <Rate>{menu.score ? menu.score.toFixed(1) : "-"}</Rate>
                      </MenuDetails>
                    </MenuInfo>
                    <HeartButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnlikeMenu(menu.id);
                      }}
                    >
                      <HeartIcon src="/img/general/heart-on.svg" alt="찜 해제" />
                    </HeartButton>
                  </MenuRow>
                ))}
              </MenuList>
            </RestaurantGroup>
          ))
        )}
      </Container>
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
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
`;

const EmptySubText = styled.div`
  font-size: 14px;
  color: #999;
`;

const RestaurantGroup = styled.div`
  width: 100%;
  max-width: 600px;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
`;

const RestaurantName = styled.div`
  background: #ff9522;
  color: white;
  font-weight: 700;
  font-size: 16px;
  padding: 12px 16px;
`;

const MenuList = styled.div`
  padding: 0;
`;

const MenuRow = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9f9f9;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const MenuInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuName = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const VeganIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const MenuDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Price = styled.div`
  font-size: 14px;
  color: #333;
  min-width: 50px;
  text-align: right;
`;

const Rate = styled.div`
  font-size: 14px;
  color: #333;
  min-width: 30px;
  text-align: center;
`;

const HeartButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeartIcon = styled.img`
  width: 20px;
  height: 20px;
`;