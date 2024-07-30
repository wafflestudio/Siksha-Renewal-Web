import UseProfile from "hooks/UseProfile";
import styled from "styled-components";

export default function ProfileEdit({
  nickname,
  setNickname,
  imageBlob,
  setImageBlob,
  imgRef,
  updateProfile,
}: {
  nickname: string;
  setNickname: (nickname: string) => void;
  imageBlob: Blob | null;
  setImageBlob: (imageBlob: Blob | null) => void;
  imgRef: any;
  updateProfile: () => Promise<void>;
}) {
  const { userInfo } = UseProfile();
  const onImageLoad = () => {
    const file = imgRef.current.files[0];
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
      <Profile
        src={
          imageBlob ? URL.createObjectURL(imageBlob) : userInfo?.image ?? "/img/default-profile.svg"
        }
        alt="userProfile"
        onClick={() => {
          if (imgRef.current) imgRef.current.click();
        }}
      />
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        ref={imgRef}
        onChange={onImageLoad}
        hidden
      />
      <InputBox>
        <Input
          placeholder="닉네임"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Button onClick={() => updateProfile()}>완료</Button>
        <CloseButton
          src="/img/close-circle-gray.svg"
          alt="reset nickname"
          role="button"
          onClick={() => setNickname("")}
        />
      </InputBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Profile = styled.img`
  width: 171px;
  height: 171px;
  border-radius: 50%;
  margin-top: 65px;

  @media (min-width: 769px) {
    display: none;
  }
`;

const InputBox = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 22.48px 24px 22.48px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding-left: 14px;

  @media (max-width: 768px) {
    width: calc(100% - 39px);
    margin: 15px 19.5px 18px 19.5px;
  }
`;

const Input = styled.input`
  width: 433px;
  height: 40px;
  font-weight: 700;
  border: none;
  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Button = styled.button`
  width: 52px;
  height: 34px;
  background-color: #ff9522;
  border: none;
  border-radius: 8px;
  margin-right: 7.52px;
  font-size: 15px;
  font-weight: 400;
  color: #ffffff;
  line-height: 14px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CloseButton = styled.img`
  display: none;

  @media (max-width: 768px) {
    display: fixed;
    width: 18px;
    height: 18px;
    margin-right: 18px;
  }
`;
