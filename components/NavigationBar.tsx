import styled, { css } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useStateContext, useDispatchContext } from "../hooks/ContextProvider";

export default function NavigationBar() {
  const router = useRouter();
  const addr = router.pathname;

  const state = useStateContext();
  const dispatch = useDispatchContext();
  const { loginStatus } = state;
  const setLoginModal = useCallback(
    () =>
      dispatch({
        type: "SET_LOGINMODAL",
        isLoginModal: true,
      }),
    [dispatch],
  );

  const isAccountToggle = () => {
    if (!loginStatus) {
      setLoginModal();
    } else {
      router.push(`/account`);
    }
  };

  return (
    <NaviBar>
      <NavItem>
        <Link href="/" passHref>
          <NavLink $cur={addr === `/` || addr.startsWith(`/menu`) }>식단</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/community/boards/0" passHref>
          <NavLink $cur={addr.startsWith(`/community`)}>게시판</NavLink>
        </Link>
      </NavItem>
      <NavItem onClick={isAccountToggle}>
        <NavLink $cur={addr.startsWith(`/account`)}>마이 페이지</NavLink>
      </NavItem>
    </NaviBar>
  );
}

const NaviBar = styled.nav`
  margin-top: auto;
  margin-left: auto;
  margin-right: 386px;
  width: 394px;
  white-space: nowrap;
  cursor: pointer;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 918px) {
    display: none;
  }
`;

const NavItem = styled.div`
  margin: 0 25px 0 25px;
  a {
    text-decoration: none;
  }
  padding: 0;
`;

const NavLink = styled.div<{ $cur: boolean }>`
  font-size: 20px;
  padding: 20px 10px;
  color: #ffffff80;
  ${($props) =>
    $props.$cur &&
    css`
      border-bottom: 5px solid white;
      color: white;
      padding-bottom: 15px;
    `};

  &:hover {
    color: white;
  }
`;
