"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import MobileSubHeader from "components/general/MobileSubHeader";
import useAuth from "hooks/UseAuth";

type NotificationTimePreference = "once_morning" | "per_meal";

export default function NotificationTimeSettings() {
  const { authStatus, authGuard } = useAuth();
  const router = useRouter();
  const [timePreference, setTimePreference] = useState<NotificationTimePreference>("once_morning");

  useEffect(authGuard, [authStatus]);

  // Load saved preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("likedMenuNotificationTime") as NotificationTimePreference;
    if (saved) {
      setTimePreference(saved);
    }
  }, []);

  const handlePreferenceChange = (preference: NotificationTimePreference) => {
    setTimePreference(preference);
    localStorage.setItem("likedMenuNotificationTime", preference);
  };

  return (
    <>
      <MobileSubHeader
        title="메뉴 알림 시간 설정"
        handleBack={() => router.push("/account/menu/notification-settings")}
      />
      <Container>
        <SettingsCard>
          <OptionRow onClick={() => handlePreferenceChange("once_morning")}>
            <OptionLabel>아침에 한 번에 받기</OptionLabel>
            {timePreference === "once_morning" && <CheckIcon src="/img/radio.svg" alt="선택됨" />}
          </OptionRow>
          <Separator />
          <OptionRow onClick={() => handlePreferenceChange("per_meal")}>
            <OptionLabel>식사시간마다 받기</OptionLabel>
            {timePreference === "per_meal" && <CheckIcon src="/img/radio.svg" alt="선택됨" />}
          </OptionRow>
        </SettingsCard>

        <ExplanationText>
          아침에 한 번에 받기: 당일에 나온 찜한 메뉴를 한 번에 알려드려요.
          <br />
          식사시간마다 받기: 아침·점심·저녁 메뉴를 해당 시간대에 맞춰 나누어 안내드려요. (아침 7:30
          / 점심 10:30 / 저녁 16:30)
        </ExplanationText>
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

const OptionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 0;
  cursor: pointer;
  min-height: 23px;
`;

const OptionLabel = styled.div`
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.3px;
  color: var(--Color-Foundation-base-black, #000000);
`;

const CheckIcon = styled.img`
  width: 14px;
  height: 14px;
`;

const Separator = styled.div`
  height: 1px;
  background-color: var(--Color-Foundation-gray-200, #e5e6e9);
  margin: 0;
`;

const ExplanationText = styled.div`
  width: 100%;
  max-width: 343px;
  padding: 0 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ExplanationLine = styled.p`
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.3px;
  color: var(--Color-Foundation-gray-600, #989aa0);
  margin: 0;
`;

const Bold = styled.span`
  font-weight: 700;
`;
