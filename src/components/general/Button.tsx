import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  variant?: "primary" | "neutral";
  onClick: () => void;
}

export default function Button({ children, onClick, variant = "primary", ...props }: ButtonProps) {
  if (variant === "primary") {
    return (
      <PrimaryButton onClick={onClick} {...props}>
        {children}
      </PrimaryButton>
    );
  }
  return (
    <NeutralButton onClick={onClick} {...props}>
      {children}
    </NeutralButton>
  );
}

const NeutralButton = styled.button`
  background-color: var(--Color-Foundation-gray-500, #BEC1C8);
  color: var(--SementicColor-Text-Button, #FFF);
  text-align: center;

  /* text-16/Bold */
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: var(--Font-size-16, 16px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 22.4px */

  padding: 8px 16px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 20px;
`;

const PrimaryButton = styled.button`
  background-color: var(--Color-Foundation-orange-500, #ff9522);
  color: var(--SementicColor-Text-Button, #FFF);
  text-align: center;

  /* text-16/Bold */
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: var(--Font-size-16, 16px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 22.4px */
  
  padding: 8px 16px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 20px;
`;
