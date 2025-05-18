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
  background-color: var(--Color-Foundation-gray-500);
  color: var(--Color-Foundation-base-white-2);
  padding: 10px 20px;
  height: 38px;
  width: 168px;
  border-radius: 20px;
`;

const PrimaryButton = styled.button`
  background-color: var(--Color-Foundation-orange-500);
  color: var(--Color-Foundation-base-white-2);
  padding: 10px 20px;
  height: 38px;
  width: 168px;
  border-radius: 20px;
`;
