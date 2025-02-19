import { useState } from "react";
import styled from "styled-components";

interface MobileBottomSheetProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileBottomSheet({ children, isOpen, onClose }: MobileBottomSheetProps) {
  return (
    <>
      <BottomSheetBackdrop onClick={onClose} isVisible={isOpen} />
      <BottomSheetWrapper isVisible={isOpen}>
        <BottomSheetSlideBar />
        <BottomSheetContent>{children}</BottomSheetContent>
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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  display: ${({ isVisible }: BottomSheetBackdropProps) => (isVisible ? "block" : "none")};
`;

const BottomSheetSlideBar = styled.div`
  width: 42px;
  height: 4px;
  background-color: #dfdfdf;
  border-radius: 2px;
  margin: 10px auto;
`;

const BottomSheetContent = styled.div`
  padding: 20px;
  max-height: 75vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

interface BottomSheetWrapperProps {
  isVisible: boolean;
}

const BottomSheetWrapper = styled.div<BottomSheetWrapperProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding-top: 17px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isVisible }) => (isVisible ? "translateY(0)" : "translateY(100%)")};
`;
