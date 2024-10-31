import styled from "styled-components";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export default function PostImageSwiper({ images }: { images: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const [selectedSnap, setSelectedSnap] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const onPrevButtonClick = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const updateSnapDisplay = () => {
    setSelectedSnap(emblaApi!!.selectedScrollSnap());
  };

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", updateSnapDisplay);
      emblaApi.on("reInit", updateSnapDisplay);
      if (images.length === 1) {
        emblaApi.destroy();
      }
    }
  }, [emblaApi]);

  return (
    <Swiper onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <SwiperViewport ref={emblaRef}>
        <SwiperContainer>
          {images.map((image) => (
            <PostImageContainer key={image}>
              <PostImage src={image} alt="게시글 이미지" />
            </PostImageContainer>
          ))}
        </SwiperContainer>
      </SwiperViewport>
      {images.length > 1 && (
        <>
          <PrevButton type="button" onClick={onPrevButtonClick} isHovered={isHovered}>
            <Image
              src="/img/general/left-arrow-white.svg"
              alt="왼쪽 화살표"
              width={14}
              height={22}
              style={{ filter: "drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.5))" }}
            />
          </PrevButton>
          <NextButton type="button" onClick={onNextButtonClick} isHovered={isHovered}>
            <Image
              src="/img/general/right-arrow-white.svg"
              alt="오른쪽 화살표"
              width={14}
              height={22}
              style={{ filter: "drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.5))" }}
            />
          </NextButton>
          <SelectedSnapDisplay isHovered={isHovered}>
            {selectedSnap + 1}/{images.length}
          </SelectedSnapDisplay>
        </>
      )}
    </Swiper>
  );
}

const Swiper = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  background-color: white;

  --slide-width: 100%;
`;

const SwiperViewport = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const SwiperContainer = styled.div`
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  touch-action: pan-y;
`;

const transitionButton = styled.button<{ isHovered: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background-color: transparent;
  cursor: pointer;

  display: ${(props) => (props.isHovered ? "flex" : "none")};

  @media (max-width: 768px) {
    display: none;
  }
`;

const PrevButton = styled(transitionButton)`
  left: 0;
  margin-left: 24px;
`;

const NextButton = styled(transitionButton)`
  right: 0;
  margin-right: 24px;
`;

const SelectedSnapDisplay = styled.div<{ isHovered: boolean }>`
  position: absolute;
  display: ${(props) => (props.isHovered ? "flex" : "none")};
  top: 20px;
  right: 20px;
  height: 25px;
  color: white;
  background-color: #575757;
  border-radius: 14px;
  padding: 0 7.5px;
  font-weight: 400;
  font-size: 16px;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    top: 12px;
    right: 12px;
    height: 17px;
    border-radius: 10px;
    padding: 0 5px;
    font-size: 10px;
  }
`;

const PostImageContainer = styled.div`
  height: 100%;
  flex: 0 0 var(--slide-width);
  min-width: 0;
  padding-left: var(--slide-spacing);
`;

const PostImage = styled.img`
  object-fit: contain;
  height: 100%;
  width: 100%;
`;
