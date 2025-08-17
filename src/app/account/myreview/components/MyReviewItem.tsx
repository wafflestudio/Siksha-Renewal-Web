import styled from "styled-components";
import Image from "next/image";
import Stars from "app/menu/[menuId]/components/Stars";
import { formatReviewDate } from "utils/FormatUtil";

export default function MyReviewItem({
  review,
}) {
  const IMAGE_SIZE = 35.84;
  return (
    <>
      <Container>
        <MenuInfo>
          <MenuHeader>
            <div>
              <MenuTitle>{review.name_kr}</MenuTitle>
              <RightArrow />
            </div>
            <ReviewCreatedAt>
              {formatReviewDate(review.created_at.substring(0, 10))}
            </ReviewCreatedAt>
          </MenuHeader>
          <Stars score={review.score} />
        </MenuInfo>
        <Body>
          <Content>
            <Comment>{review.comment}</Comment>
            {review.etc && (
              <Images>
                {review.etc.images.map((image) => (
                  <Image
                    key={image}
                    src={image}
                    alt="리뷰 이미지"
                    width={IMAGE_SIZE}
                    height={IMAGE_SIZE}
                    style={{
                      objectFit: "cover",
                    }}
                  />
                ))}
              </Images>
            )}
          </Content>
        </Body>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 16px;  
  align-self: stretch;
`;

const MenuInfo = styled.div`
  display: flex;
  padding: 12px 12px 16px 12px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  gap: 4px;
  flex: 1 0 0;

  border-radius: 8px;
  border: 1px solid var(--Color-Foundation-gray-200, #E5E6E9);
  background: var(--SementicColor-Element-Tooltip2, #FFF);
`;

const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
`;

const MenuTitle = styled.div`
  color: var(--Color-Foundation-base-black, #000);
  font-family: NanumSquare;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--Font-weight-extrabold, 800);
  line-height: 150%; /* 16.8px */
`;

const RightArrow = styled.div``;

const ReviewCreatedAt = styled.div`
  color: var(--Color-Foundation-gray-600, #989AA0);
  text-align: right;
  font-family: NanumSquare;
  font-size: 12px;
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 12.544px */
`;

const Body = styled.div`
  display: flex;
  align-self: stretch;
`;

const Content = styled.div`
  display: flex;
  padding: 0 4px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`;

const Comment = styled.div`
  color: var(--Color-Foundation-base-black, #000);
  font-family: NanumSquare;
  font-size: 12px;
  font-style: normal;
  font-weight: var(--Font-weight-regular, 400);
  line-height: 140%; /* 12.544px */
  letter-spacing: -0.224px;
`;

const Images = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 8px;
  margin-top: 6px;
  align-self: stretch;
  flex-wrap: wrap;
`;