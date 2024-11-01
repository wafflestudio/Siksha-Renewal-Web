import useIsMobile from "hooks/UseIsMobile";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { inputs } from "../page";

interface ImagePreviewProps {
  images: (string | File)[];
  setInputs: Dispatch<SetStateAction<inputs>>;
}

export function ImagePreview({ images, setInputs }: ImagePreviewProps) {
  const isMobile = useIsMobile();

  const handleImageAttach = (photo: File | undefined) => {
    if (photo)
      setInputs((prev) => {
        return { ...prev, images: [...prev.images, photo] };
      });
  };

  const handleImageDelete = (index: number) => {
    setInputs((prev) => {
      return { ...prev, images: prev.images.filter((_, i) => i !== index) };
    });
  };

  return (
    <Container>
      {images.map((image, i) => (
        <Preview key={i}>
          <Image src={typeof image === "string" ? image : URL.createObjectURL(image)} />
          <DeleteButton onClick={() => handleImageDelete(i)}>
            <Icon src="/img/photo-delete.svg" alt="사진 삭제" />
          </DeleteButton>
        </Preview>
      ))}
      {images.length < 5 ? (
        <ImageAttacher>
          {images.length > 0 ? (
            <Icon
              style={{ width: isMobile ? 107 : 120, height: isMobile ? 107 : 120 }}
              src="/img/file-big.svg"
              alt=""
            />
          ) : (
            <Icon style={{ width: 28, height: 30 }} src="/img/file.svg" alt="" />
          )}
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => handleImageAttach(e.target?.files?.[0])}
          />
        </ImageAttacher>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: start;
  gap: 13px;
  padding: 0px 3px;
  overflow-x: scroll;
  padding-top: 20px;

  @media (max-width: 768px) {
    padding-top: 13px;
  }
`;

const Icon = styled.img``;

const Preview = styled.div`
  position: relative;
`;
const Image = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 107px;
    height: 107px;
  }
`;
const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(36%) translateY(-36%);
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const ImageAttacher = styled.label`
  width: 120px;
  height: 120px;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 106px;
    height: 106px;
  }
`;
const FileInput = styled.input`
  display: none;
`;
