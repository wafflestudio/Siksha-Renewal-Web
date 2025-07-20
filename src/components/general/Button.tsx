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
  background-color: var(--SemanticColor-Background-Quaternary);
  color: var(--SemanticColor-Text-Button);
  padding: 10px 20px;
  height: 38px;
  width: 168px;
  border-radius: 20px;
`;

const PrimaryButton = styled.button`
  background-color: var(--SemanticColor-Text-Accent);
  color: var(--SemanticColor-Text-Button);
  padding: 10px 20px;
  height: 38px;
  width: 168px;
  border-radius: 20px;
`;
