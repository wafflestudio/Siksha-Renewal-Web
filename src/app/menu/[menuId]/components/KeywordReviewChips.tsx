import { styled } from "styled-components";

export default function KeywordReviewChips({ keywords = [] }: { keywords?: string[] }) {
  return (
    <Container>
      {keywords.map((keyword, idx) => (
        <KeywordReviewChip keyword={keyword} key={idx} />
      ))}
    </Container>
  );
}

function KeywordReviewChip({ keyword }: { keyword: string }) {
  return <Chip>{keyword}</Chip>;
}

const Container = styled.div`
  display: flex;
  gap: 8px;
`;

const Chip = styled.span`
  padding: 4px;
  background-color: var(--SemanticColor-Element-Chip);
  border-radius: 4px;
  color: var(--Color-Foundation-gray-700);
  line-height: 140%;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -0.3px;
`;
