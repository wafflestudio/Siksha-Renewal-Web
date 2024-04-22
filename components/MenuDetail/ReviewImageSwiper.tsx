import styled from "styled-components";

export default function ReviewImageSwiper({images}: {images: string[]}) {
  console.log(images);
    return (
        <Container>
        </Container>
    );
}

const Container = styled.div`
  height: 417px;
  background-color: gray;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ReviewImage = styled.img`
  object-fit: cover;
  height: 417px;
  width: 417px;
`;