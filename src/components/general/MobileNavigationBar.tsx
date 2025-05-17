import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatchContext, useStateContext } from "providers/ContextProvider";
import { createPortal } from "react-dom";
import { ReactNode, useEffect, useState } from "react";
import useModals from "hooks/UseModals";
import useAuth from "hooks/UseAuth";
import AccountIcon from "assets/icons/mobile-nav-account.svg";
import CommunityIcon from "assets/icons/mobile-nav-community.svg";
import MenuIcon from "assets/icons/mobile-nav-menu.svg";
import StarIcon from "assets/icons/mobile-nav-star.svg";

export default function MobileNavigationBar() {
  const addr = usePathname();

  const state = useStateContext();
  const { isFilterFavorite } = state;
  const { setIsFilterFavorite } = useDispatchContext();
  const { authStatus } = useAuth();
  const { openLoginModal } = useModals();

  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootElement(document.getElementById("root-layout"));
  }, []);

  const active =
    isFilterFavorite === true
      ? "favorite"
      : addr === "/" || addr?.startsWith("/menu")
      ? "menu"
      : addr?.startsWith("/community")
      ? "community"
      : addr?.startsWith("/account")
      ? "account"
      : null;

  if (!rootElement) return null;

  return createPortal(
    <Container>
      <Link
        href="/"
        onClick={() => {
          if (authStatus === "login") setIsFilterFavorite(true);
          else openLoginModal();
        }}
      >
        <NavButton isActive={active === "favorite"} icon={<StarIcon />} name="즐겨찾기" />
      </Link>
      <Link href="/" onClick={() => setIsFilterFavorite(false)}>
        <NavButton isActive={active === "menu"} icon={<MenuIcon />} name="식단" />
      </Link>
      <Link href="/community/boards/1" onClick={() => setIsFilterFavorite(false)}>
        <NavButton isActive={active === "community"} icon={<CommunityIcon />} name="게시판" />
      </Link>
      <Link href="/account" onClick={() => setIsFilterFavorite(false)}>
        <NavButton isActive={active === "account"} icon={<AccountIcon />} name="설정" />
      </Link>
    </Container>,
    rootElement,
  );
}

interface NavButtonProps {
  isActive: boolean;
  icon: ReactNode;
  name: string;
}

const NavButton = ({ isActive, icon, name }: NavButtonProps) => {
  return (
    <>
      <IconWrapper isActive={isActive}>{icon}</IconWrapper>
      <NavName isActive={isActive}>{name}</NavName>
    </>
  );
};

const Container = styled.div`
  position: fixed;
  display: none;
  bottom: 0;
  justify-content: space-evenly;
  padding: 11px 0 30px;
  box-sizing: border-box;
  width: 100%;
  height: 83px;
  background-color: var(--Color-Foundation-base-white-5);
  z-index: 1;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const IconWrapper = styled.div<{ isActive: boolean }>`
  width: 36px;
  height: 36px;
  color: ${({ isActive }) =>
    isActive ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-gray-500)"};

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const NavName = styled.div<{ isActive: boolean }>`
  width: 36;
  height: 10;
  top: 36px;
  font-family: NanumSquareOTF;
  font-weight: 800;
  font-size: 9px;
  line-height: 100%;
  letter-spacing: -0.3px;
  text-align: center;
  vertical-align: middle;
  color: ${({ isActive }) =>
    isActive ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-gray-500)"};
`;
