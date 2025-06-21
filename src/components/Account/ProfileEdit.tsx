import { Dispatch, RefObject, SetStateAction, useRef } from "react";
import styled from "styled-components";
import useModals from "hooks/UseModals";
import ProfileImageEditModal from "./ProfileImageEditModal";
import UseProfile from "hooks/UseProfile";
import UseCurrentTheme from "hooks/UseCurrentTheme";
import PhotoCameraIcon from "assets/icons/photo_camera.svg";

interface ProfileEditProps {
  nickname: string;
  setNickname: (nickname: string) => void;
  imageBlob: Blob | null;
  setImageBlob: (imageBlob: Blob | null) => void;
  imgRef: RefObject<HTMLInputElement>;
  changeToDefaultImage: boolean;
  setChangeToDefaultImage: (changeToDefaultImage: boolean) => void;
  isNicknameValid: boolean;
  setIsNicknameValid: Dispatch<SetStateAction<boolean>>;
}

export default function ProfileEdit(props: ProfileEditProps) {
  const {
    nickname,
    setNickname,
    imageBlob,
    setImageBlob,
    imgRef,
    changeToDefaultImage,
    setChangeToDefaultImage,
    isNicknameValid,
  } = props;
  const { userInfo } = UseProfile();
  const { defaultProfileURL } = UseCurrentTheme();

  const { openModal } = useModals();
  const profileFrameRef = useRef<HTMLDivElement>(null);

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

  const onProfileFrameClicked = () => {
    openModal(ProfileImageEditModal, {
      imgRef,
      profileFrameRef,
      setChangeToDefaultImage,
      onClose: () => {},
    });
  };

  return (
    <Container>
      <ProfileFrame ref={profileFrameRef} onClick={onProfileFrameClicked}>
        <Profile
          src={
            changeToDefaultImage
              ? defaultProfileURL
              : imageBlob
              ? URL.createObjectURL(imageBlob)
              : userInfo?.image ?? defaultProfileURL
          }
          alt="프로필 사진"
        />
        <EditIconFrame>
          <StyledPhotoCameraIcon aria-label="사진 업로드" />
        </EditIconFrame>
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
            src={isNicknameValid ? "/img/check.svg" : "/img/account/check-fail.svg"}
            alt={isNicknameValid ? "사용가능" : "사용불가능"}
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
  cursor: pointer;

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

const EditIconFrame = styled.div`
  position: absolute;
  top: 2.8px;
  right: 3.57px;
  box-sizing: border-box;
  width: 41.607px;
  height: 41.607px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid var(--Color-Foundation-gray-100);
  background: var(--Color-Foundation-base-white);
`;

const StyledPhotoCameraIcon = styled(PhotoCameraIcon)`
  color: var(--Color-Foundation-gray-600);
  display: block;
  width: 22.5px;
  height: 18px;
  margin: 0;
  padding: 0;
  overflow: visible;
`;

const InputBox = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 36.51px 22.48px 36.51px 22.48px;
  border: 1px solid var(--Color-Foundation-gray-200);
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
  border: none;
  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
  background-color: transparent;
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
  color: ${(props) =>
    props.isDuplicate ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-gray-600)"};
  font-size: 14px;
  font-weight: 400;
  line-height: 23px;
`;
