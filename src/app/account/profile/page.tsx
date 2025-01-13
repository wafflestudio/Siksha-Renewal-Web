"use client";
import AccountLayout from "../layout";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile, updateProfileWithImage, validateNickname } from "utils/api/auth";
import ProfileEdit from "components/Account/ProfileEdit";
import MobileSubHeader from "components/general/MobileSubHeader";
import UseProfile from "hooks/UseProfile";
import useAuth from "hooks/UseAuth";
import useError from "hooks/useError";

export default function SettingProfile() {
  const { userInfo, setProfile } = UseProfile();

  const [nickname, setNickname] = useState(userInfo?.nickname ?? `ID ${userInfo?.id}`);
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [changeToDefaultImage, setChangeToDefaultImage] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { getAccessToken, authStatus, authGuard } = useAuth();
  useEffect(authGuard, [authStatus]);

  const { onHttpError } = useError();

  useEffect(() => {
    setNickname(userInfo?.nickname ?? `ID ${userInfo?.id}`);
  }, [imgRef, userInfo]);

  useEffect(() => {
    setIsLoading(true);
    // debouncing nickname check
    const nicknameCheck = setTimeout(() => {
      if (nickname === userInfo?.nickname) {
        setIsNicknameValid(true);
        setIsLoading(false);
      } else
        validateNickname(nickname).then((res) => {
          setIsNicknameValid(res);
          setIsLoading(false);
        });
    }, 500);

    return () => clearTimeout(nicknameCheck);
  }, [nickname]);

  const onUpdateProfile = async () => {
    if (nickname === null || !isNicknameValid || imgRef.current === null) return;

    if (nickname === userInfo?.nickname && !imageBlob && !changeToDefaultImage) {
      router.push(`/account`);
      return;
    }

    const formData = new FormData();
    if (nickname !== userInfo?.nickname) formData.append("nickname", nickname);
    if (imageBlob) formData.append("image", imageBlob);
    formData.append("change_to_default_image", String(changeToDefaultImage));

    const updateFunction =
      imageBlob || changeToDefaultImage ? updateProfileWithImage : updateProfile;
    getAccessToken()
      .then((token) => {
        updateFunction(formData, token).then(({ nickname: newNickname, image: newImage }) => {
          setProfile(newNickname, newImage ?? undefined);
          router.push(`/account`);
        });
      })
      .catch(onHttpError);
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
            changeToDefaultImage={changeToDefaultImage}
            setChangeToDefaultImage={setChangeToDefaultImage}
            isNicknameValid={isNicknameValid}
            setIsNicknameValid={setIsNicknameValid}
          />
          <ButtonGroup>
            <CancelButton onClick={() => router.push("/account")}>취소</CancelButton>
            <CompleteButton
              isValid={!isLoading && isNicknameValid}
              onClick={!isLoading && isNicknameValid ? onUpdateProfile : undefined}
            >
              완료
            </CompleteButton>
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
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CompleteButton = styled(Button)<{ isValid: boolean }>`
  background-color: ${({ isValid }) => (isValid ? "#ff9522" : "#8e8e8e")};
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
