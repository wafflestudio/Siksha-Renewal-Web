import styled, { css } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import useModals from "hooks/UseModals";
import useAuth from "hooks/UseAuth";

export default function NavigationBar() {
  const router = useRouter();
  const addr = router.pathname;

  const { authStatus } = useAuth();
  const { openLoginModal } = useModals();

  const toggleAccount = () => {
    if (authStatus === "logout") openLoginModal();
    else router.push(`/account`);
  };

  return (
    <NaviBar>
      <NavItem>
        <Link href="/" passHref>
          <NavLink $cur={addr === `/` || addr.startsWith(`/menu`)}>식단</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/community/boards/1" passHref>
          <NavLink $cur={addr.startsWith(`/community`)}>게시판</NavLink>
        </Link>
      </NavItem>
      <NavItem onClick={toggleAccount}>
        <NavLink $cur={addr.startsWith(`/account`)}>마이 페이지</NavLink>
      </NavItem>
    </NaviBar>
  );
}

const NaviBar = styled.nav`
  margin-top: auto;
  width: 394px;
  white-space: nowrap;
  cursor: pointer;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 768px) {
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
