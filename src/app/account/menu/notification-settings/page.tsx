"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import MobileSubHeader from "components/general/MobileSubHeader";
import { LikedMenusResponse } from "types";
import useAuth from "hooks/UseAuth";
import { getLikedMenus } from "utils/api/menus";
import useError from "hooks/useError";

export default function NotificationSettings() {
  const { authStatus, authGuard, getAccessToken } = useAuth();
  const { onHttpError } = useError();
  const router = useRouter();
  const [likedMenus, setLikedMenus] = useState<LikedMenusResponse["result"]>([]);
  const [loading, setLoading] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [selectedMenuIds, setSelectedMenuIds] = useState<Set<number>>(new Set());

  useEffect(authGuard, [authStatus]);

  // Load settings from localStorage
  useEffect(() => {
    const enabled = localStorage.getItem("likedMenuNotificationsEnabled") === "true";
    setNotificationsEnabled(enabled);

    const savedMenuIds = localStorage.getItem("likedMenuNotificationMenuIds");
    if (savedMenuIds) {
      setSelectedMenuIds(new Set(JSON.parse(savedMenuIds)));
    }
  }, []);

  // Fetch liked menus
  useEffect(() => {
    const fetchLikedMenus = async () => {
      if (authStatus !== "login") {
        setLoading(false);
        return;
      }

      try {
        const accessToken = await getAccessToken();
        const response = await getLikedMenus(accessToken);
        setLikedMenus(response.result);
      } catch (error) {
        onHttpError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedMenus();
  }, [authStatus, getAccessToken, onHttpError]);

  const handleToggleChange = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    localStorage.setItem("likedMenuNotificationsEnabled", String(newValue));
  };

  const handleMenuToggle = (menuId: number) => {
    const newSelectedMenuIds = new Set(selectedMenuIds);
    if (newSelectedMenuIds.has(menuId)) {
      newSelectedMenuIds.delete(menuId);
    } else {
      newSelectedMenuIds.add(menuId);
    }
    setSelectedMenuIds(newSelectedMenuIds);
    localStorage.setItem(
      "likedMenuNotificationMenuIds",
      JSON.stringify(Array.from(newSelectedMenuIds)),
    );
  };

  const handleTimeSettingsClick = () => {
    router.push("/account/menu/notification-settings/time");
  };

  return (
    <>
      <MobileSubHeader
        title="메뉴 알림 설정"
        handleBack={() => router.push("/account/menu/favorite")}
      />
      <Container>
        <SettingsCard>
          <SettingsRow>
            <Label>찜한 메뉴 알림 받기</Label>
            <ToggleSwitch $enabled={notificationsEnabled} onClick={handleToggleChange}>
              <ToggleCircle $enabled={notificationsEnabled} />
            </ToggleSwitch>
          </SettingsRow>
          <Separator />
          <SettingsRow $clickable onClick={handleTimeSettingsClick}>
            <Label>메뉴 알림 시간</Label>
            <ChevronIcon src="/img/right-arrow.svg" alt="시간 설정" />
          </SettingsRow>
        </SettingsCard>

        {notificationsEnabled && (
          <>
            <InstructionText>알림 받을 메뉴를 선택하세요.</InstructionText>
            {loading ? (
              <LoadingText>로딩 중...</LoadingText>
            ) : (
              likedMenus.map((restaurant) => (
                <RestaurantCard key={restaurant.id}>
                  <RestaurantHeader>
                    <RestaurantName>{restaurant.name_kr}</RestaurantName>
                  </RestaurantHeader>
                  <OrangeLine />
                  <MenuList>
                    {restaurant.menus.map((menu) => (
                      <MenuItem key={menu.id}>
                        <MenuName>{menu.name_kr}</MenuName>
                        {selectedMenuIds.has(menu.id) ? (
                          <CheckboxIcon
                            src="/img/account/checkbox-checked.svg"
                            alt="선택됨"
                            onClick={() => handleMenuToggle(menu.id)}
                          />
                        ) : (
                          <CheckboxIcon
                            src="/img/account/checkbox-empty.svg"
                            alt="선택 안 됨"
                            onClick={() => handleMenuToggle(menu.id)}
                          />
                        )}
                      </MenuItem>
                    ))}
                  </MenuList>
                </RestaurantCard>
              ))
            )}
          </>
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
  gap: 12px;
  background-color: var(--Color-Background-main, #f8f8f8);
  min-height: calc(100vh - 44px);

  @media (max-width: 768px) {
    margin-top: 0px;
    padding: 16px;
  }
`;

const SettingsCard = styled.div`
  width: 100%;
  max-width: 343px;
  background: white;
  border: 1px solid var(--Color-Foundation-gray-200, #e5e6e9);
  border-radius: 8px;
  padding: 14px;
`;

const SettingsRow = styled.div<{ $clickable?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 0;
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
`;

const Label = styled.div`
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.3px;
  color: var(--Color-Foundation-base-black, #000000);
`;

const ToggleSwitch = styled.div<{ $enabled: boolean }>`
  width: 36px;
  height: 22px;
  border-radius: 59.14px;
  background-color: ${(props) => (props.$enabled ? "#ff9522" : "#e5e6e9")};
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
  overflow: hidden;
`;

const ToggleCircle = styled.div<{ $enabled: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: ${(props) => (props.$enabled ? "2px" : "auto")};
  left: ${(props) => (props.$enabled ? "auto" : "2px")};
  transition: left 0.3s ease, right 0.3s ease;
  box-shadow: 0px 0px 0px 0.643px rgba(0, 0, 0, 0.04), 0px 1.93px 5.146px 0px rgba(0, 0, 0, 0.15),
    0px 1.93px 0.643px 0px rgba(0, 0, 0, 0.06);
`;

const Separator = styled.div`
  height: 1px;
  background-color: var(--Color-Foundation-gray-200, #e5e6e9);
  margin: 0;
`;

const ChevronIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const InstructionText = styled.p`
  width: 100%;
  max-width: 343px;
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: -0.3px;
  color: var(--Color-Foundation-gray-600, #989aa0);
  margin: 0;
  padding: 0 14px;
`;

const LoadingText = styled.div`
  font-size: 14px;
  color: #999;
  text-align: center;
  padding: 20px;
`;

const RestaurantCard = styled.div`
  width: 100%;
  max-width: 343px;
  background: white;
  border: 1px solid var(--Color-Foundation-gray-200, #e5e6e9);
  border-radius: 8px;
  padding: 14px;
`;

const RestaurantHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
`;

const RestaurantName = styled.h3`
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: 16px;
  font-weight: 800;
  line-height: 1.4;
  letter-spacing: -0.3px;
  color: var(--Color-Foundation-base-black, #000000);
  margin: 0;
`;

const OrangeLine = styled.div`
  height: 1.5px;
  background-color: var(--Color-Foundation-orange-500, #ff9522);
  margin-bottom: 14px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const MenuName = styled.div`
  flex: 1;
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.3px;
  color: var(--Color-Foundation-base-black, #000000);
`;

const CheckboxIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  flex-shrink: 0;
`;
