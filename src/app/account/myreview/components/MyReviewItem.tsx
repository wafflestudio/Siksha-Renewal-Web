import styled from "styled-components";
import Image from "next/image";
import Stars from "app/menu/[menuId]/components/Stars";
import { formatReviewDate } from "utils/FormatUtil";
import ThemedWrapper from "components/general/ThemedWrapper";
import Link from "next/link";
import useReviewActions from "../hooks/useReviewActions";

export default function MyReviewItem({
  review,
}) {
  const IMAGE_SIZE = 48;
  const { removeReview, updateReview } = useReviewActions();
  const handleDelete = () => removeReview(review.id);
  const handleEdit = () => updateReview(review.menu_id, review.id);
  return (
    <>
      <Container>
        <Link href={`/menu/${review.menu_id}`} style={{ width: "100%", cursor: "pointer" }}>
          <MenuInfo>
            <MenuHeader>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <MenuTitle>{review.name_kr}</MenuTitle>
                <RightArrow src="/img/accordion-arrow.svg" />
              </div>
              <ReviewCreatedAt>
                {formatReviewDate(review.created_at.substring(0, 10))}
              </ReviewCreatedAt>
            </MenuHeader>
            <ThemedWrapper theme={{ width: "61" }}>
              <Stars score={review.score} />
            </ThemedWrapper>
          </MenuInfo>
        </Link>
        <Body>
          <Content>
            <Comment>{review.comment}</Comment>
            {review.keywords && (
              <Keywords>
                {review.keywords.map((keyword) => (
                  <Keyword key={`${review.id}-${keyword}`}>{keyword}</Keyword>
                ))}
              </Keywords>
            )}
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
        <Footer>
          <DeleteButton onClick={handleDelete}>
            삭제하기
          </DeleteButton>
          <EditButton onClick={handleEdit}>
            수정하기
          </EditButton>
        </Footer>
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
  background: var(--SemanticColor-Element-Tooltip2, #FFF);
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

const RightArrow = styled.img`
  width: 20px;
  height: 20px;
  transform: rotate(270deg);
`;

const ReviewCreatedAt = styled.div`
  color: var(--Color-Foundation-gray-600, #989AA0);
  text-align: right;
  font-family: NanumSquare;
  font-size: 12px;
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%;
`;

const Body = styled.div`
  display: flex;
  align-self: stretch;
  padding: 0 4px;
`;

const Content = styled.div`
  display: flex;
  padding: 0 4px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
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

const Keywords = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 8px;
`;

const Keyword = styled.div`
  padding: 4px;
  border-radius: 4px;
  background: var(--SementicColor-Element-Chip, #F2F3F4);

  color: var(--Color-Foundation-gray-700, #727478);
  text-align: center;
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: 11px;
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%;
`;

const Footer = styled.div`
  display: flex;
  gap: 16px;
`;

const DeleteButton = styled.button`
  color: var(--Color-Foundation-gray-600, #989AA0);
  font-size: 11px;
  font-weight: 700;
`;

const EditButton = styled.button`
  color: var(--Color-Foundation-orange-500, #FF9522);
  font-size: 11px;
  font-weight: 700;
`;