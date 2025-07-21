import styled, { css } from "styled-components";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useModals from "hooks/UseModals";
import useAuth from "hooks/UseAuth";

export default function NavigationBar() {
  const router = useRouter();
  const addr = usePathname();

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
          <NavLink $cur={addr === `/` || (addr?.startsWith(`/menu`) ?? false)}>식단</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/community/boards/1" passHref>
          <NavLink $cur={addr?.startsWith(`/community`) ?? false}>게시판</NavLink>
        </Link>
      </NavItem>
      <NavItem onClick={toggleAccount}>
        <NavLink $cur={addr?.startsWith(`/account`) ?? false}>마이 페이지</NavLink>
      </NavItem>
    </NaviBar>
  );
}

const NaviBar = styled.nav`
  display: flex;
  width: 293px;
  padding-top: 40px;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.div`
  white-space: nowrap;
  a {
    text-decoration: none;
  }
`;

const NavLink = styled.div<{ $cur: boolean }>`
  color: var(--SemanticColor-Text-GNB-Secondary, #FFD5A7);
  padding: 0px 20px 12px 20px;
  text-align: center;
  font-size: 16px;
  line-height: 18px;
  font-weight: 700;

  ${($props) =>
    $props.$cur &&
    css`
      color: var(--SemanticColor-Text-GNB, #FFF);
      font-weight: 800;
      box-shadow: inset 0 -4px 0 var(--SemanticColor-Text-Accent, #FF9522); /* 요소의 안쪽에 그려지도록 box-shadow 사용 */
    `};

  &:hover {
    color: var(--SemanticColor-Text-GNB, #FFF);
  }
`;
