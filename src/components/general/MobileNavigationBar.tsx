import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatchContext, useStateContext } from "context/ContextProvider";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import useModals from "hooks/UseModals";
import useAuth from "hooks/UseAuth";

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
        <Icon
          isActive={active === "favorite"}
          srcActive="/img/mobile-nav-star-active.svg"
          srcInactive="/img/mobile-nav-star-inactive.svg"
        />
      </Link>
      <Link href="/" onClick={() => setIsFilterFavorite(false)}>
        <Icon
          isActive={active === "menu"}
          srcActive="/img/mobile-nav-menu-active.svg"
          srcInactive="/img/mobile-nav-menu-inactive.svg"
        />
      </Link>
      <Link href="/community/boards/1" onClick={() => setIsFilterFavorite(false)}>
        <Icon
          isActive={active === "community"}
          srcActive="/img/mobile-nav-community-active.svg"
          srcInactive="/img/mobile-nav-community-inactive.svg"
        />
      </Link>
      <Link href="/account" onClick={() => setIsFilterFavorite(false)}>
        <Icon
          isActive={active === "account"}
          srcActive="/img/mobile-nav-account-active.svg"
          srcInactive="/img/mobile-nav-account-inactive.svg"
        />
      </Link>
    </Container>,
    rootElement,
  );
}

const Container = styled.div`
  position: fixed;
  display: flex;
  bottom: 0;
  justify-content: space-evenly;
  padding: 11px 0 30px;
  box-sizing: border-box;
  width: 100%;
  height: 83px;
  background-color: white;
  border-top: 0.5px solid #b7b7b7;
  z-index: 1;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Icon = styled.div<{ isActive: boolean; srcActive: string; srcInactive: string }>`
  width: 32px;
  height: 32px;
  background-image: ${({ isActive, srcActive, srcInactive }) =>
    `url(${isActive ? srcActive : srcInactive})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: translateZ(0);
  opacity: 0.99;
`;
