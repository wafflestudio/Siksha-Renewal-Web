import styled from "styled-components";
import BackClickable from "./BackClickable";
import useIsMobile from "hooks/UseIsMobile";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useToast from "hooks/UseToast";

interface LikedMenuIntroModalProps {
  onClose: () => void;
}

type NotificationChoice = "like" | "later" | null;

export default function LikedMenuIntroModal({ onClose }: LikedMenuIntroModalProps) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { showToast } = useToast();
  const [choice, setChoice] = useState<NotificationChoice>(null);

  const handleComplete = () => {
    if (choice === "like") {
      // User wants notifications - store preference (Firebase SDK will handle permission later)
      localStorage.setItem("likedMenuNotificationPreference", "enabled");
    } else if (choice === "later") {
      // User doesn't want notifications now - store preference
      localStorage.setItem("likedMenuNotificationPreference", "deferred");
    }

    // Mark that user has seen this intro
    localStorage.setItem("likedMenuIntroSeen", "true");

    // Show toast notification
    showToast("메뉴 알림 설정이 저장되었습니다.");

    onClose();
    router.push("/account/menu/favorite");
  };

  const handleSkip = () => {
    // Mark that user has seen this intro but didn't engage
    localStorage.setItem("likedMenuIntroSeen", "true");
    localStorage.setItem("likedMenuNotificationPreference", "skipped");
    onClose();
  };

  if (!isMobile) {
    return (
      <BackClickable onClickBackground={onClose}>
        <DesktopContainer>
          <Header>
            <CloseButton onClick={handleSkip}>
              <CloseIcon src="/img/modal-close.svg" alt="닫기" />
            </CloseButton>
          </Header>
          <Banner>
            <BannerCard src="/img/my-liked-menu-example.jpg" alt="내가 찜한 메뉴 예시" />
            <BannerGradient />
          </Banner>
          <Content>
            <TextSection>
              <MainTitle>
                찜한 메뉴, 이제는 나올 때마다
                <br />
                알림으로 받을 수 있어요!
              </MainTitle>
              <Subtitle>
                알림 받을 메뉴는 [설정 &gt; 내가 찜한 메뉴] 탭에서
                <br />
                언제든 개별적으로 ON/OFF 설정할 수 있어요.
              </Subtitle>
            </TextSection>
            <RadioSection>
              <RadioOption onClick={() => setChoice("like")}>
                <Radio $selected={choice === "like"}>
                  {choice === "like" && <img src="/img/radio.svg" alt="선택됨" />}
                </Radio>
                <RadioLabel>좋아요, 알림을 받을래요.</RadioLabel>
              </RadioOption>
              <RadioOption onClick={() => setChoice("later")}>
                <Radio $selected={choice === "later"}>
                  {choice === "later" && <img src="/img/radio.svg" alt="선택됨" />}
                </Radio>
                <RadioLabel>괜찮아요, 알림을 받지 않을래요.</RadioLabel>
              </RadioOption>
            </RadioSection>
          </Content>
          <Footer>
            <SecondaryButton onClick={handleSkip}>직접 설정하기</SecondaryButton>
            <PrimaryButton
              $enabled={choice !== null}
              onClick={handleComplete}
              disabled={choice === null}
            >
              완료
            </PrimaryButton>
          </Footer>
        </DesktopContainer>
      </BackClickable>
    );
  }

  return (
    <BackClickable onClickBackground={onClose}>
      <MobileContainer>
        <MobileBanner>
          <MobileBannerCard src="/img/my-liked-menu-example.jpg" alt="내가 찜한 메뉴 예시" />
          <MobileBannerGradient />
        </MobileBanner>
        <MobileContent>
          <MobileTextSection>
            <MobileMainTitle>
              찜한 메뉴, 이제는 나올 때마다
              <br />
              알림으로 받을 수 있어요!
            </MobileMainTitle>
            <MobileSubtitle>
              알림 받을 메뉴는 [설정 &gt; 내가 찜한 메뉴] 탭에서
              <br />
              언제든 개별적으로 ON/OFF 설정할 수 있어요.
            </MobileSubtitle>
          </MobileTextSection>
          <MobileRadioSection>
            <MobileRadioOption onClick={() => setChoice("like")}>
              <MobileRadio $selected={choice === "like"}>
                {choice === "like" && <img src="/img/radio.svg" alt="선택됨" />}
              </MobileRadio>
              <MobileRadioLabel>좋아요, 알림을 받을래요.</MobileRadioLabel>
            </MobileRadioOption>
            <MobileRadioOption onClick={() => setChoice("later")}>
              <MobileRadio $selected={choice === "later"}>
                {choice === "later" && <img src="/img/radio.svg" alt="선택됨" />}
              </MobileRadio>
              <MobileRadioLabel>괜찮아요, 알림을 받지 않을래요.</MobileRadioLabel>
            </MobileRadioOption>
          </MobileRadioSection>
        </MobileContent>
        <MobileFooter>
          <MobileSecondaryButton onClick={handleSkip}>직접 설정하기</MobileSecondaryButton>
          <MobilePrimaryButton
            $enabled={choice !== null}
            onClick={handleComplete}
            disabled={choice === null}
          >
            완료
          </MobilePrimaryButton>
        </MobileFooter>
      </MobileContainer>
    </BackClickable>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  z-index: 1000;
`;

const DesktopContainer = styled(Container)`
  width: 500px;
  max-height: 80vh;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 20px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  background-color: #f7ecd1;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const BannerCard = styled.img`
  position: absolute;
  bottom: 0;
  width: 320px;
  height: auto;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.25);
`;

const BannerGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(168, 146, 123, 0.133));
  pointer-events: none;
`;

const Content = styled.div`
  padding: 24px 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MainTitle = styled.div`
  font-family: "NanumSquare", sans-serif;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.4;
  color: #000000;
  letter-spacing: -0.3px;
`;

const Subtitle = styled.div`
  font-family: "NanumSquare", sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  color: #727478;
  letter-spacing: -0.3px;
`;

const RadioSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Radio = styled.div<{ $selected: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: ${(props) => (props.$selected ? "none" : "1.538px solid #BEC1C8")};
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0;

  img {
    width: 20px;
    height: 20px;
    display: block;
  }
`;

const RadioLabel = styled.div`
  font-family: "NanumSquare", sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  color: #000000;
  letter-spacing: -0.3px;
`;

const Footer = styled.div`
  display: flex;
  gap: 7px;
  padding: 0 20px 24px;
`;

const Button = styled.button`
  flex: 1;
  height: 44px;
  border-radius: 8px;
  font-family: "NanumSquare", sans-serif;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
`;

const SecondaryButton = styled(Button)`
  background: #f2f3f4;
  color: #989aa0;

  &:hover {
    background: #e9ecef;
  }
`;

const PrimaryButton = styled(Button)<{ $enabled: boolean }>`
  background: ${(props) => (props.$enabled ? "#FF9522" : "#F2F3F4")};
  color: ${(props) => (props.$enabled ? "white" : "#989AA0")};
  cursor: ${(props) => (props.$enabled ? "pointer" : "not-allowed")};

  &:hover {
    background: ${(props) => (props.$enabled ? "#e8821e" : "#F2F3F4")};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const MobileContainer = styled(Container)`
  width: calc(100% - 40px);
  max-width: 360px;
  border-radius: 20px;
  background-color: white;
  overflow: hidden;
`;

const MobileBanner = styled.div`
  position: relative;
  width: 100%;
  height: 216px;
  background-color: #f7ecd1;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const MobileBannerCard = styled.img`
  position: absolute;
  bottom: 0;
  width: 253px;
  height: auto;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.25);
`;

const MobileBannerGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 55px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(168, 146, 123, 0.133));
  pointer-events: none;
`;

const MobileContent = styled.div`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const MobileTextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MobileMainTitle = styled.div`
  font-family: "NanumSquare", sans-serif;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.4;
  color: #000000;
  letter-spacing: -0.3px;
`;

const MobileSubtitle = styled.div`
  font-family: "NanumSquare", sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  color: #727478;
  letter-spacing: -0.3px;
`;

const MobileRadioSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MobileRadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const MobileRadio = styled.div<{ $selected: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: ${(props) => (props.$selected ? "none" : "1.538px solid #BEC1C8")};
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0;

  img {
    width: 20px;
    height: 20px;
    display: block;
  }
`;

const MobileRadioLabel = styled.div`
  font-family: "NanumSquare", sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  color: #000000;
  letter-spacing: -0.3px;
`;

const MobileFooter = styled.div`
  display: flex;
  gap: 7px;
  padding: 0 20px 24px;
`;

const MobileButton = styled.button`
  flex: 1;
  height: 44px;
  border-radius: 8px;
  font-family: "NanumSquare", sans-serif;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
`;

const MobileSecondaryButton = styled(MobileButton)`
  background: #f2f3f4;
  color: #989aa0;

  &:active {
    background: #e9ecef;
  }
`;

const MobilePrimaryButton = styled(MobileButton)<{ $enabled: boolean }>`
  background: ${(props) => (props.$enabled ? "#FF9522" : "#F2F3F4")};
  color: ${(props) => (props.$enabled ? "white" : "#989AA0")};
  cursor: ${(props) => (props.$enabled ? "pointer" : "not-allowed")};

  &:active {
    background: ${(props) => (props.$enabled ? "#e8821e" : "#F2F3F4")};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
