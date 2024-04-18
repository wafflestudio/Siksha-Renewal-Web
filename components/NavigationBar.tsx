import styled, { css } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavigationBar() {
  const router = useRouter();
  const addr = router.pathname;

  return (
    <NaviBar>
      <NavItem>
        <Link href="/" passHref>
          <NavLink $cur={addr === `/`}>식단</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/community/boards/0" passHref>
          <NavLink $cur={addr.startsWith(`/community/`)}>게시판</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/account" passHref>
          <NavLink $cur={addr === `/account`}>마이 페이지</NavLink>
        </Link>
      </NavItem>
    </NaviBar>
  );
}

const NaviBar = styled.nav`
  position: absolute;
  bottom: 14px;
  left: calc(max((100vw - 1155px), 0px) / 2 + 370px);
  width: max(436px);
  white-space: nowrap;
  cursor: pointer;
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const NavItem = styled.div`
  margin: 0 25px 0 25px;
  a {
    text-decoration: none;
  }
  padding: 0;
`;

const NavLink = styled.a<{ $cur: boolean }>`
  font-size: 20px;
  padding: 20px 10px;
  color: #ffffff80;
  ${($props) =>
    $props.$cur &&
    css`
      border-bottom: 5px solid white;
      color: white;
    `};

  &:hover {
    color: white;
  }
`;
