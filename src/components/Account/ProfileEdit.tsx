import UseProfile from "hooks/UseProfile";
import { Dispatch, RefObject, SetStateAction } from "react";
import styled from "styled-components";

interface ProfileEditProps {
  nickname: string;
  setNickname: (nickname: string) => void;
  imageBlob: Blob | null;
  setImageBlob: (imageBlob: Blob | null) => void;
  imgRef: RefObject<HTMLInputElement>;
  isNicknameValid: boolean;
  setIsNicknameValid: Dispatch<SetStateAction<boolean>>;
}

export default function ProfileEdit(props: ProfileEditProps) {
  const { nickname, setNickname, imageBlob, setImageBlob, imgRef, isNicknameValid } = props;
  const { userInfo } = UseProfile();

  const onImageLoad = () => {
    const file = imgRef.current?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      fetch(reader.result as string)
        .then((res) => res.blob())
        .then((blob) => setImageBlob(blob));
    };
  };

  return (
    <Container>
      <ProfileFrame
        onClick={() => {
          if (imgRef.current) imgRef.current.click();
        }}
      >
        <Profile
          src={
            imageBlob
              ? URL.createObjectURL(imageBlob)
              : userInfo?.image ?? "/img/default-profile.svg"
          }
          alt="userProfile"
        />
        <CameraFrame>
          <Camera src="/img/account/photo_camera.svg" />
        </CameraFrame>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          ref={imgRef}
          onChange={onImageLoad}
          hidden
        />
      </ProfileFrame>

      <InputBox>
        <Input
          placeholder="닉네임"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <DuplicateCheck>
          <ResultImage
            isDuplicate={isNicknameValid}
            src={isNicknameValid ? "/img/account/check-ok.svg" : "/img/account/check-fail.svg"}
          />
          <ResultText isDuplicate={isNicknameValid}>
            {isNicknameValid ? "사용가능" : "사용불가능"}
          </ResultText>
        </DuplicateCheck>
      </InputBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const ProfileFrame = styled.div`
  position: relative;

  width: 171px;
  height: 171px;
  margin-top: 53.41px;

  @media (max-width: 768px) {
    margin-top: 65px;
  }
`;

const Profile = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const CameraFrame = styled.div`
  position: absolute;
  top: 2.8px;
  right: 3.57px;
  box-sizing: border-box;
  width: 41.607px;
  height: 41.607px;
  padding: 10px 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid #f0f0f0;
  background: #ffffff;
`;

const Camera = styled.img`
  width: 22.5px;
  height: 18px;
  flex-shrink: 0;
`;

const InputBox = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 36.51px 22.48px 36.51px 22.48px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding-left: 14px;

  @media (max-width: 768px) {
    width: calc(100% - 39px);
    margin: 15px 0 18px 0;
  }
`;

const Input = styled.input`
  width: 433px;
  height: 40px;
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: -0.3px;
  border: none;
  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DuplicateCheck = styled.div`
  display: inline-flex;
  align-items: center;
  height: 23px;
  margin-right: 15.95px;
  flex-shrink: 0;
  gap: 5px;
`;

const ResultImage = styled.img<{ isDuplicate: boolean }>`
  width: ${(props) => (props.isDuplicate ? "11px" : "9.15px")};
  height: ${(props) => (props.isDuplicate ? "8px" : "9.15px")};
`;

const ResultText = styled.span<{ isDuplicate: boolean }>`
  color: ${(props) => (props.isDuplicate ? "#ff9522" : "#ADADAD")};
  font-size: 14px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: -0.3px;
`;
