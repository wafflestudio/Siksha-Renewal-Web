import styled from "styled-components";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatchContext, useStateContext } from "providers/ContextProvider";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import useModals from "hooks/UseModals";
import useAuth from "hooks/UseAuth";

export default function MobileNavigationBar() {
  const router = useRouter();
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
        style={{
          width: "36px",
          height: "46px",
        }}
      >
        <Icon
          isActive={active === "favorite"}
          srcActive="/img/mobile-nav-star-active.svg"
          srcInactive="/img/mobile-nav-star-inactive.svg"
        />
        <IconLabel isActive={active === "favorite"}>즐겨찾기</IconLabel>
      </Link>
      <Link
        href="/"
        onClick={() => setIsFilterFavorite(false)}
        style={{
          width: "36px",
          height: "46px",
        }}
      >
        <Icon
          isActive={active === "menu"}
          srcActive="/img/mobile-nav-menu-active.svg"
          srcInactive="/img/mobile-nav-menu-inactive.svg"
        />
        <IconLabel isActive={active === "menu"}>식단</IconLabel>
      </Link>
      <Link
        href="/community/boards/1"
        onClick={() => {
          setIsFilterFavorite(false);
        }}
        style={{
          width: "36px",
          height: "46px",
        }}
      >
        <Icon
          isActive={active === "community"}
          srcActive="/img/mobile-nav-community-active.svg"
          srcInactive="/img/mobile-nav-community-inactive.svg"
        />
        <IconLabel isActive={active === "community"}>게시판</IconLabel>
      </Link>
      <div
        /**
         * NOTE: Link href를 /account로 하면 authGuard에 의해 튕겨나가므로
         * login 시에만 /account로 이동하도록 설정
         */
        onClick={() => {
          if (authStatus === "login") {
            setIsFilterFavorite(false);
            router.push(`/account`);
          }
          else openLoginModal();
        }}
        style={{
          width: "36px",
          height: "46px",
        }}
      >
        <Icon
          isActive={active === "account"}
          srcActive="/img/mobile-nav-account-active.svg"
          srcInactive="/img/mobile-nav-account-inactive.svg"
        />
        <IconLabel isActive={active === "account"}>설정</IconLabel>
      </div>
    </Container>,
    rootElement,
  );
}

const Container = styled.div`
  position: fixed;
  display: none;
  bottom: 0;
  justify-content: space-evenly;
  padding: 11px 0 30px;
  box-sizing: border-box;
  width: 100%;
  height: 83px;
  background: var(--Color-Foundation-base-white, #fff);
  box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.05);
  z-index: 1;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Icon = styled.div<{ isActive: boolean; srcActive: string; srcInactive: string }>`
  display: flex;
  height: 36px;
  width: 36px;
  background-image: ${({ isActive, srcActive, srcInactive }) =>
    `url(${isActive ? srcActive : srcInactive})`};
  background-repeat: no-repeat;
  background-position: center;
  transform: translateZ(0);
  opacity: 0.99;
`;

const IconLabel = styled.div<{ isActive: boolean }>`
  width: 36px;

  color: ${({ isActive }) =>
    isActive
      ? "var(--Color-Foundation-orange-500, #FF9522)"
      : "var(--Color-Foundation-gray-500, #BEC1C8)"};
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: NanumSquare;
  font-size: 9px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;
