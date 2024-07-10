import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatchContext, useStateContext } from "hooks/ContextProvider";

export default function MobileNavigationBar() {
  const router = useRouter();
  const addr = router.pathname;

  const state = useStateContext();
  const { isFilterFavorite } = state;
  const { setIsFilterFavorite } = useDispatchContext();

  const active =
    isFilterFavorite === true
      ? "favorite"
      : addr === "/" || addr.startsWith("/menu")
      ? "menu"
      : addr.startsWith("/community")
      ? "community"
      : addr.startsWith("/account")
      ? "account"
      : null;

  return (
    <Container>
      <Link href="/" onClick={() => setIsFilterFavorite(true)}>
        {active === "favorite" ? (
          <Icon src="/img/mobile-nav-star-active.svg" />
        ) : (
          <Icon src="/img/mobile-nav-star-inactive.svg" />
        )}
      </Link>
      <Link href="/" onClick={() => setIsFilterFavorite(false)}>
        {active === "menu" ? (
          <Icon src="/img/mobile-nav-menu-active.svg" />
        ) : (
          <Icon src="/img/mobile-nav-menu-inactive.svg" />
        )}
      </Link>
      <Link href="/community/boards/1" onClick={() => setIsFilterFavorite(false)}>
        {active === "community" ? (
          <Icon src="/img/mobile-nav-community-active.svg" />
        ) : (
          <Icon src="/img/mobile-nav-community-inactive.svg" />
        )}
      </Link>
      <Link href="/account" onClick={() => setIsFilterFavorite(false)}>
        {active === "account" ? (
          <Icon src="/img/mobile-nav-account-active.svg" />
        ) : (
          <Icon src="/img/mobile-nav-account-inactive.svg" />
        )}
      </Link>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-evenly;
  padding: 14px 0 46px;
  box-sizing: border-box;
  width: 100%;
  height: 83px;
  background-color: white;
  border-top: 0.5px solid #b7b7b7;
  z-index: 99;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Button = styled.div``;
const Icon = styled.img``;
