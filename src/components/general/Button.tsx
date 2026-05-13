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

const BaseButton = styled.button`
  color: var(--SemanticColor-Text-Button);
  padding: 10px 20px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.3px;
  text-align: center;
`;

const NeutralButton = styled(BaseButton)`
  background-color: var(--Color-Foundation-gray-500);
`;

const PrimaryButton = styled(BaseButton)`
  background-color: var(--Color-Foundation-orange-500);
`;
