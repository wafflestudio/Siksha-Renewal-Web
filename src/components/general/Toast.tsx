import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

type ToastVariant = "default" | "speech-bubble";
type AnimationType = "slide" | "fade";

interface ToastProps {
  message: string;
  duration: number;
  delay: number;
  animationDuration: number;
  variant: ToastVariant;
  animationType: AnimationType;
  onDismiss: () => void;
}

export default function Toast({
  message,
  duration,
  delay,
  animationDuration,
  variant,
  animationType,
  onDismiss
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start showing after delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    // Start exit animation before dismissing
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, delay + duration);

    // Actually dismiss after exit animation completes
    const dismissTimer = setTimeout(() => {
      onDismiss();
    }, delay + duration + animationDuration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(exitTimer);
      clearTimeout(dismissTimer);
    };
  }, [duration, delay, animationDuration, onDismiss]);

  if (!isVisible) return null;

  // Parse message for speech-bubble variant to highlight "알림" in orange
  const renderMessage = () => {
    if (variant === "speech-bubble" && message.includes("알림")) {
      const parts = message.split("알림");
      return (
        <>
          {parts[0]}
          <OrangeText>알림</OrangeText>
          {parts.slice(1).join("알림")}
        </>
      );
    }
    return message;
  };

  return (
    <ToastContainer
      $isExiting={isExiting}
      $animationType={animationType}
      $animationDuration={animationDuration}
    >
      <ToastContent $variant={variant}>
        {variant === "default" && (
          <IconWrapper>
            <CheckIcon src="/img/radio.svg" alt="" />
          </IconWrapper>
        )}
        <ToastMessage $variant={variant}>{renderMessage()}</ToastMessage>
      </ToastContent>
    </ToastContainer>
  );
}

// Slide animations
const slideUpFadeIn = keyframes`
  from {
    transform: translateX(-50%) translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
`;

const slideDownFadeOut = keyframes`
  from {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
  to {
    transform: translateX(-50%) translateY(10px);
    opacity: 0;
  }
`;

// Fade-only animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const ToastContainer = styled.div<{
  $isExiting: boolean;
  $animationType: AnimationType;
  $animationDuration: number;
}>`
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;

  animation: ${props => {
    if (props.$animationType === "slide") {
      return props.$isExiting ? slideDownFadeOut : slideUpFadeIn;
    } else {
      return props.$isExiting ? fadeOut : fadeIn;
    }
  }} ${props => props.$animationDuration}ms ease-out forwards;

  @media (max-width: 768px) {
    bottom: 100px;
  }
`;

const ToastContent = styled.div<{ $variant: ToastVariant }>`
  display: flex;
  align-items: center;
  gap: ${props => props.$variant === "default" ? "10px" : "0"};
  padding: ${props => props.$variant === "default" ? "9px 13px" : "0"};
  background-color: ${props => props.$variant === "default" ? "#727478" : "transparent"};
  border-radius: ${props => props.$variant === "default" ? "8px" : "0"};
  box-shadow: ${props => props.$variant === "default" ? "0px 0px 4px 0px rgba(0, 0, 0, 0.2)" : "none"};
  position: relative;

  ${props => props.$variant === "speech-bubble" && `
    background-image: url('/img/general/speech-bubble.svg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    width: 153px;
    height: 51px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 8px; /* Adjust for speech bubble tail */
  `}
`;

const IconWrapper = styled.div`
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const CheckIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const ToastMessage = styled.p<{ $variant: ToastVariant }>`
  font-family: 'NanumSquare', sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 22px;
  color: ${props => props.$variant === "default" ? "#ffffff" : "#000000"};
  letter-spacing: -0.408px;
  margin: 0;
  white-space: nowrap;
`;

const OrangeText = styled.span`
  color: #ff9522;
  font-weight: 800;
`;
