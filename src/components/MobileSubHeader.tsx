import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";

// 추후 디렉토리 변경(/components/general) 필요해보입니다.
export default function MobileSubHeader({
  title,
  handleBack,
}: {
  title: string;
  handleBack: () => void;
}) {
  const router = useRouter();
  const { boardId } = router.query;

  // write page로 router.back하지 않도록
  useEffect(() => {
    router.beforePopState(({ as }) => {
      console.log(as);
      if (as.includes("/write")) {
        if (boardId) router.push(`/community/boards/${boardId}`);
        else router.push("/");
        return false;
      }

      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, []);

  return (
    <MobileHeader>
      <BackButton src="/img/left-arrow-white.svg" onClick={handleBack} />
      <Title>{title}</Title>
    </MobileHeader>
  );
}

const MobileHeader = styled.div`
  display: none;
  font-size: 20px;
  margin: 0;
  top: 0;
  background: #ff9522;
  position: absolute;
  width: 100%;
  height: 60px;
  z-index: 1;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const BackButton = styled.img`
  position: absolute;
  width: 10px;
  height: 16px;
  left: 16px;
  cursor: pointer;
`;

const Title = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 800;
  max-width: calc(100vw - 96px);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
