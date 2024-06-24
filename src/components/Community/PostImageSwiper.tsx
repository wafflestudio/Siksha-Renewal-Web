import styled from "styled-components";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export default function PostImageSwiper({ images }: { images: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const [selectedSnap, setSelectedSnap] = useState<number>(0);
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
      if(images.length === 1) {
        emblaApi.destroy();
      }
    }
  }, [emblaApi]);

  return (
    <Swiper>
      <SwiperViewport ref={emblaRef}>
        <SwiperContainer>
          {images.map((image, index) => (
            <PostImageContainer key={index}>
              <PostImage src={image} />
            </PostImageContainer>
          ))}
        </SwiperContainer>
      </SwiperViewport>
      {images.length > 1 && (
        <>
          <PrevButton type="button" onClick={onPrevButtonClick}>
            <Image src="/img/left-arrow-white.svg" alt="왼쪽 화살표" width={14} height={22} />
          </PrevButton>
          <NextButton type="button" onClick={onNextButtonClick}>
            <Image src="/img/right-arrow-white.svg" alt="오른쪽 화살표" width={14} height={22} />
          </NextButton>
          <SelectedSnapDisplay>
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

const PrevButton = styled.button`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 24px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const NextButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const SelectedSnapDisplay = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: fit-content;
  color: white;
  background-color: #575757;
  border-radius: 14px;
  padding: 7px 7.5px;
  font-weight: 400;
  font-size: 16px;
  @media (max-width: 768px) {
    top: 12px;
    right: 12px;
    border-radius: 10px;
    padding: 5px;
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
