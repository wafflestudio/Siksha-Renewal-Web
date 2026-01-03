"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import useIsMobile from "hooks/UseIsMobile";
import CloseIcon from "assets/icons/close.svg";

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageLightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const isMobile = useIsMobile();

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (isOpen) {
      // 스크롤 막기
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleBackgroundClick}>
      {isMobile ? (
        <MobileHeader>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
          <MobilePageIndicator>
            {currentIndex + 1} / {images.length}
          </MobilePageIndicator>
          <Spacer />
        </MobileHeader>
      ) : (
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      )}

      <ContentWrapper onClick={(e) => e.stopPropagation()}>
        {!isMobile && (
          <NavigationButton $position="left" onClick={handlePrevious}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 8L12 16L20 24"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NavigationButton>
        )}

        <ImageContainer>
          <StyledImage
            src={images[currentIndex]}
            alt={`이미지 ${currentIndex + 1}`}
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </ImageContainer>

        {!isMobile && (
          <NavigationButton $position="right" onClick={handleNext}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8L20 16L12 24"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NavigationButton>
        )}

        {!isMobile && (
          <PageIndicator>
            {currentIndex + 1} / {images.length}
          </PageIndicator>
        )}
      </ContentWrapper>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    background: #000;
  }
`;

const MobileHeader = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10001;
`;

const Spacer = styled.div`
  width: 44px;
  height: 44px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    position: static;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 80vw;
  max-height: 80vh;

  @media (max-width: 768px) {
    max-width: 100vw;
    max-height: 100vh;
  }
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const NavigationButton = styled.button<{ $position: "left" | "right" }>`
  position: absolute;
  ${(props) => (props.$position === "left" ? "left: 40px" : "right: 40px")};
  top: 50%;
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  &:active {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const MobilePageIndicator = styled.div`

  font-family: var(--Font-family-sans, NanumSquare);
  font-weight: var(--Font-weight-extrabold, 700);
  font-size: var(--Font-size-16, 16px);
  line-height: 140%;
  letter-spacing: var(--Font-letter-spacing-0, -0.3px);

  color: var(--Color-Foundation-base-white);
  text-align: center;

`;

const PageIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  color: white;

  /* text-14/Bold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-14, 14px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 150%;
`;

