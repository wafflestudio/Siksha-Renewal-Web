"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { ReviewInputs } from "../reviews/write/page";

type Option = {
  id: string;
  label: string;
};

type Category = {
  id: string;
  emoji: string;
  title: string;
  options: Option[];
};

const categories: Category[] = [
  {
    id: "taste",
    emoji: "😊",
    title: "맛",
    options: [
      { id: "t1", label: "또 먹고 싶어요" },
      { id: "t2", label: "생각보다 맛있어요" },
      { id: "t3", label: "무난해요" },
      { id: "t4", label: "아쉬운 맛이에요" },
      { id: "t5", label: "별로예요" },
    ],
  },
  {
    id: "price",
    emoji: "👛",
    title: "가격",
    options: [
      { id: "p1", label: "혜자스러워요" },
      { id: "p2", label: "가성비 좋아요" },
      { id: "p3", label: "합리적이에요" },
      { id: "p4", label: "약간 비싸요" },
      { id: "p5", label: "너무 비싸요" },
    ],
  },
  {
    id: "composition",
    emoji: "🍱",
    title: "음식 구성",
    options: [
      { id: "c1", label: "조화로워요" },
      { id: "c2", label: "알찬 편이에요" },
      { id: "c3", label: "기본적이에요" },
      { id: "c4", label: "다소 단조로워요" },
      { id: "c5", label: "너무 빈약해요" },
    ],
  },
];

type KeywordReviewFormProps = {
  inputs: ReviewInputs;
  setInputs: React.Dispatch<React.SetStateAction<ReviewInputs>>;
};

export default function KeywordReviewForm({ inputs, setInputs }: KeywordReviewFormProps) {
  const handleSelect = (categoryId: string, optionId: string) => {
    setInputs((prev) => {
      if (categoryId === "taste") return { ...prev, taste: optionId };
      if (categoryId === "price") return { ...prev, price: optionId };
      if (categoryId === "composition") return { ...prev, food_composition: optionId };
      return prev;
    });
  };

  return (
    <Container>
      <Title>
        어떤 점이 얼마나 좋았나요? <span>(선택)</span>
      </Title>

      {categories.map((cat) => (
        <CategoryBox key={cat.id}>
          <CategoryHeader>
            <CategoryEmoji>{cat.emoji}</CategoryEmoji>
            <CategoryTitle>{cat.title}</CategoryTitle>
          </CategoryHeader>

          <Options>
            {cat.options.map((opt) => (
              <OptionButton
                key={opt.id}
                selected={
                  (cat.id === "taste" && inputs.taste === opt.id) ||
                  (cat.id === "price" && inputs.price === opt.id) ||
                  (cat.id === "composition" && inputs.food_composition === opt.id)
                }
                onClick={() => handleSelect(cat.id, opt.id)}
              >
                {opt.label}
              </OptionButton>
            ))}
          </Options>
        </CategoryBox>
      ))}
    </Container>
  );
}

/* styled-components */

const Container = styled.div`
  padding-bottom: 52px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 800;
  line-height: 140%;
  color: var(--Color-Foundation-gray-800);
  letter-spacing: -0.3px;

  span {
    letter-spacing: -0.3px;
    font-weight: 700;
    font-size: 14px;
    line-height: 150%;
    color: var(--Color-Foundation-gray-600);
    margin-left: 4px;
  }
`;

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CategoryEmoji = styled.span`
  font-size: 15.5px;
  width: 20px;
  height: 20px;
  padding: 5px;
  position: relative;
  top: -2.5px;
`;

const CategoryTitle = styled.div`
  letter-spacing: -0.3px;
  font-size: 14px;
  font-weight: 800;
  color: var(--Color-Foundation-gray-800);
`;

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const OptionButton = styled.button<{ selected: boolean }>`
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid
    ${({ selected }) =>
      selected ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-gray-300)"};
  background-color: var(--SemanticColor-Element-Tooltip2);
  color: ${({ selected }) =>
    selected ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-gray-900)"};
  font-size: 13px;
  line-height: 140%;
  letter-spacing: -0.3px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--Color-Foundation-orange-500);
    color: var(--Color-Foundation-orange-500);
  }
`;
