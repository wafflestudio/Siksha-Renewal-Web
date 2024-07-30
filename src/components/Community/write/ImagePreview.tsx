import useIsMobile from "hooks/UseIsMobile";
import { inputs } from "pages/community/write";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

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
        <ImageContainer key={i}>
          <Image src={typeof image === "string" ? image : URL.createObjectURL(image)} />
          <DeleteButton onClick={() => handleImageDelete(i)}>
            <Icon src="/img/photo-delete.svg" />
          </DeleteButton>
        </ImageContainer>
      ))}
      {images.length < 5 ? (
        <ImageAttacher>
          <Icon
            style={{
              width: !isMobile && images.length === 0 ? "25px" : "",
              height: !isMobile && images.length === 0 ? "25px" : "",
            }}
            src={
              images.length === 0
                ? !isMobile
                  ? "/img/file.svg"
                  : "/img/file-big.svg"
                : "/img/file-big.svg"
            }
          />
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

const Icon = styled.img``;
const Container = styled.div`
  display: flex;
  align-items: end;
  gap: 13px;
  padding: 0px 3px;
  /* overflow-x: auto; */
  z-index: 2;
  /* height: 135px; */

  &::-webkit-scrollbar {
    display: none;
  }
`;
const ImageContainer = styled.div`
  position: relative;
`;
const Image = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 106px;
    height: 106px;
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
  margin-left: 15px;
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
