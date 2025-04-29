"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface MobileBottomSheetProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  showHandle?: boolean;
}

export default function MobileBottomSheet({
  children,
  isOpen,
  onClose,
  showHandle = true,
}: MobileBottomSheetProps) {
  const headerHeight = showHandle ? 34 : 16;
  const sheetHeight = 2000; // 대충 넉넉하게 설정
  const [translateY, setTranslateY] = useState(sheetHeight);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const startY = useRef(0);
  const startTranslateY = useRef(0);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setIsAnimating(false);
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startY.current = clientY;
    startTranslateY.current = translateY;
  };

  const handleDragMove = (e: TouchEvent | MouseEvent) => {
    if (!isDragging) return;
    const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
    const delta = clientY - startY.current;
    const newTranslateY = Math.max(0, startTranslateY.current + delta);
    setTranslateY(newTranslateY);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsAnimating(true);
    setTranslateY(sheetHeight);
    onClose();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchmove', handleDragMove, { passive: false });
      document.addEventListener('touchend', handleDragEnd);
    } else {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('touchend', handleDragEnd);
    }
    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);

  useEffect(() => {
    setIsAnimating(true);
    setTranslateY(isOpen ? 0 : sheetHeight);
  }, [isOpen]);

  return (
    <>
      <BottomSheetBackdrop onClick={onClose} isVisible={isOpen} />
      <BottomSheetWrapper isVisible={isOpen} translateY={translateY} isAnimating={isAnimating}>
        {
          showHandle ?
          <BottomSheetHandle onMouseDown={handleDragStart} onTouchStart={handleDragStart}>
            <div style={{
              width: "46px",
              height: "4px",
              backgroundColor: "var(--Color-Foundation-gray-200, #E5E6E9)",
              borderRadius: "2px",
            }}/>
          </BottomSheetHandle> :
          <div style={{ marginBottom: 16 }} />
        }
        <CloseButton onClick={onClose} />
        <BottomSheetContent headerHeight={headerHeight}>{children}</BottomSheetContent>
      </BottomSheetWrapper>
    </>
  );
}

interface BottomSheetBackdropProps {
  isVisible: boolean;
}

const BottomSheetBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${({ isVisible }: BottomSheetBackdropProps) => (isVisible ? "rgba(0, 0, 0, 0.25)" : "transparent")};
  z-index: 99;
  display: ${({ isVisible }: BottomSheetBackdropProps) => (isVisible ? "block" : "none")};
  transition: background-color 0.3s ease-in-out;
`;

const BottomSheetHandle = styled.div`
  display: flex;
  width: 100%;
  height: 34px;
  align-items: center;
  justify-content: center;
  cursor: grab;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 13px;
  top: 14px;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  background-color: transparent;
  background-image: url("/img/close-filter.svg");
  background-repeat: no-repeat;
`;

const BottomSheetContent = styled.div<{ headerHeight: number }>`
  padding: 0px 16px;
  max-height: ${({headerHeight}) => `calc(100vh - 41px - ${headerHeight}px)`}; /* overlap header by 3px */
  display: flex;
  flex-direction: column;
  -webkit-overflow-scrolling: touch;
`;

interface BottomSheetWrapperProps {
  isVisible: boolean;
  translateY: number;
  isAnimating: boolean;
}

const BottomSheetWrapper = styled.div<BottomSheetWrapperProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  transition: transform 0.3s ease-in-out;
  transform: translateY(${({ translateY }) => translateY}px);
  transition: ${({ isAnimating }) => (isAnimating ? 'transform 0.3s ease' : 'none')};
  will-change: transform;
  touch-action: none;
`;
