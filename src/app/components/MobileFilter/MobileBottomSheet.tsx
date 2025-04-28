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
  return (
    <>
      <BottomSheetBackdrop onClick={onClose} isVisible={isOpen} />
      <BottomSheetWrapper isVisible={isOpen}>
        {showHandle ? <BottomSheetHandle /> : <div style={{ marginBottom: 16 }} />}
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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  display: ${({ isVisible }: BottomSheetBackdropProps) => (isVisible ? "block" : "none")};
`;

const BottomSheetHandle = styled.div`
  width: 46px;
  height: 4px;
  background-color: var(--Color-Foundation-gray-200, #E5E6E9);
  border-radius: 2px;
  margin: 15px auto;
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
  transform: ${({ isVisible }) => (isVisible ? "translateY(0)" : "translateY(100%)")};
`;
