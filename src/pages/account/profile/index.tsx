import AccountLayout from "../layout";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { updateMyData } from "utils/api/auth";
import useAuth from "hooks/UseAuth";
import ProfileEdit from "components/Account/ProfileEdit";
import UseProfile from "hooks/UseProfile";
import MobileSubHeader from "components/MobileSubHeader";

export default function Setting_Profile() {
  const { userInfo, setProfile } = UseProfile();

  const [nickname, setNickname] = useState(userInfo?.nickname ?? `ID ${userInfo?.id}`);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const { getAccessToken, authStatus, authGuard } = useAuth();
  useEffect(authGuard, [authStatus]);

  useEffect(() => {
    setNickname(userInfo?.nickname ?? `ID ${userInfo?.id}`);
  }, [imgRef, userInfo]);

  const updateProfile = async () => {
    if (nickname === null) return;
    if (imgRef.current === null) return;

    const formData = new FormData();
    formData.append("nickname", nickname);
    if (imageBlob) formData.append("image", imageBlob);

    getAccessToken()
      .then((token) => {
        updateMyData(formData, token).then(({ nickname: newNickname, image: newImage }) => {
          setProfile(newNickname, newImage ?? undefined);
          router.push(`/account`);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      <MobileSubHeader title="프로필 관리" handleBack={() => router.push("/account")} />
      <AccountLayout>
        <Container>
          <Title>닉네임 설정</Title>
          <ProfileEdit
            nickname={nickname}
            setNickname={setNickname}
            imageBlob={imageBlob}
            setImageBlob={setImageBlob}
            imgRef={imgRef}
            updateProfile={updateProfile}
          />
          <ButtonGroup>
            <CancelButton onClick={() => router.push("/account")}>취소</CancelButton>
            <CompleteButton onClick={updateProfile}>완료</CompleteButton>
          </ButtonGroup>
        </Container>
      </AccountLayout>
    </>
  );
}

const Container = styled.div`
  width: 533px;
  background-color: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0;

    display: flex;
    flex-direction: column;
  }
`;
const Title = styled.div`
  margin: 24px 0 0 22.48px;
  font-size: 20px;
  font-weight: 700;
  color: #ff9522;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 39px);
  margin: 0 19.5px 18px 19.5px;

  @media (max-width: 768px) {
    margin-bottom: 32.06px;
  }
`;

const Button = styled.button`
  width: calc(50% - 4px);
  height: 46px;
  background-color: #ff9522;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;

  @media (max-width: 768px) {
    font-size: 17px;
    height: 56px;
  }
`;

const CancelButton = styled(Button)`
  background-color: #eeeeee;
  color: #8e8e8e;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CompleteButton = styled(Button)`
  background-color: #ff9522;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
