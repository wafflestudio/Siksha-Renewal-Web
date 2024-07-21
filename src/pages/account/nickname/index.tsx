import AccountLayout from "../layout";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { updateMyData } from "utils/api/auth";
import useAuth from "hooks/UseAuth";
import ProfileEdit from "components/Account/ProfileEdit";
import UseProfile from "hooks/UseProfile";

export default function Setting_Nickname() {
  const { userInfo, setProfile } = UseProfile();

  const [nickname, setNickname] = useState(userInfo?.nickname ?? `ID ${userInfo?.id}`);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const { getAccessToken, authStatus, authGuard } = useAuth();
  useEffect(authGuard, [authStatus]);

  useEffect(() => {
    setNickname(userInfo?.nickname ?? `ID ${userInfo?.id}`);
    if (userInfo?.image)
      fetch(userInfo?.image)
        .then((res) => res.blob())
        .then((blob) => setImageBlob(blob));

    setImageBlob(null);
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
      </Container>
    </AccountLayout>
  );
}

const Container = styled.div`
  width: 533px;
  background-color: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
`;
const Title = styled.div`
  margin: 24px 0 0 22.48px;
  font-size: 20px;
  font-weight: 700;
  color: #ff9522;
`;
