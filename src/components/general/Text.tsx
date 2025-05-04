import React from 'react';
import styled from 'styled-components';

type TypographyVariant = 
  | 'text-11-regular'
  | 'text-12-regular' | 'text-12-bold'
  | 'text-13-regular' | 'text-13-bold'
  | 'text-14-regular' | 'text-14-bold' | 'text-14-extrabold' 
  | 'text-15-regular' | 'text-15-bold'
  | 'text-16-regular' | 'text-16-bold' | 'text-16-extrabold'
  | 'text-18-regular' | 'text-18-bold' | 'text-18-extrabold'
  | 'text-20-regular' | 'text-20-bold' | 'text-20-extrabold'
	| 'text-24-regular' | 'text-24-bold' | 'text-24-extrabold'
	| 'text-28-regular' | 'text-28-bold' | 'text-28-extrabold'
	| 'text-32-regular' | 'text-32-bold' | 'text-32-extrabold';

type TextElement = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'label';

interface TextProps {
  children: React.ReactNode;
  variant: TypographyVariant;
  color?: string;
  as?: TextElement;
  className?: string;
  textAlign?: 'left' | 'center' | 'right';
  onClick?: () => void;
  mobileVariant?: TypographyVariant;
}

// Mapping of variants to their CSS properties
const variantStyles = {
  'text-11-regular': {
    fontSize: 'var(--Font-size-11)',
    fontWeight: 'var(--Font-weight-regular)',
    lineHeight: 'var(--Line-height-140)'
  },
  'text-12-regular': {
    fontSize: 'var(--Font-size-12)',
    fontWeight: 'var(--Font-weight-regular)',
    lineHeight: 'var(--Line-height-140)'
  },
  'text-12-bold': {
    fontSize: 'var(--Font-size-12)',
    fontWeight: 'var(--Font-weight-bold)',
    lineHeight: 'var(--Line-height-140)'
  },
  'text-14-regular': {
    fontSize: 'var(--Font-size-14)',
    fontWeight: 'var(--Font-weight-regular)',
    lineHeight: 'var(--Line-height-150)'
  },
  'text-14-bold': {
    fontSize: 'var(--Font-size-14)',
    fontWeight: 'var(--Font-weight-bold)',
    lineHeight: 'var(--Line-height-150)'
  },
	'text-14-extrabold': {
		fontSize: 'var(--Font-size-14)',
		fontWeight: 'var(--Font-weight-extrabold)',
		lineHeight: 'var(--Line-height-150)'
	},
	'text-15-regular': {
		fontSize: 'var(--Font-size-15)',
		fontWeight: 'var(--Font-weight-regular)',
		lineHeight: 'var(--Line-height-150)'
	},
	'text-15-bold': {
		fontSize: 'var(--Font-size-15)',
		fontWeight: 'var(--Font-weight-bold)',
		lineHeight: 'var(--Line-height-150)'
	},
	'text-16-regular': {
		fontSize: 'var(--Font-size-16)',
		fontWeight: 'var(--Font-weight-regular)',
		lineHeight: 'var(--Line-height-140)'
	},
	'text-16-bold': {
		fontSize: 'var(--Font-size-16)',
		fontWeight: 'var(--Font-weight-bold)',
		lineHeight: 'var(--Line-height-140)'
	},
	'text-16-extrabold': {
		fontSize: 'var(--Font-size-16)',
		fontWeight: 'var(--Font-weight-extrabold)',
		lineHeight: 'var(--Line-height-140)'
	},
	'text-18-regular': {
		fontSize: 'var(--Font-size-18)',
		fontWeight: 'var(--Font-weight-regular)',
		lineHeight: 'var(--Line-height-140)'
	},
	'text-18-bold': {
		fontSize: 'var(--Font-size-18)',
		fontWeight: 'var(--Font-weight-bold)',
		lineHeight: 'var(--Line-height-140)'
	},
	'text-18-extrabold': {
		fontSize: 'var(--Font-size-18)',
		fontWeight: 'var(--Font-weight-extrabold)',
		lineHeight: 'var(--Line-height-140)'
	},
	'text-20-regular': {
		fontSize: 'var(--Font-size-20)',
		fontWeight: 'var(--Font-weight-regular)',
		lineHeight: 'var(--Line-height-140)'
	},
	'text-20-bold': {
		fontSize: 'var(--Font-size-20)',
		fontWeight: 'var(--Font-weight-bold)',
		lineHeight: 'var(--Line-height-140)'
	},
	'text-20-extrabold': {
		fontSize: 'var(--Font-size-20)',
		fontWeight: 'var(--Font-weight-extrabold)',
		lineHeight: 'var(--Line-height-140)'
	},
	'text-24-regular': {
		fontSize: 'var(--Font-size-24)',
		fontWeight: 'var(--Font-weight-regular)',
		lineHeight: 'var(--Line-height-140)'
	},
	'text-24-bold': {
		fontSize: 'var(--Font-size-24)',
		fontWeight: 'var(--Font-weight-bold)',
		lineHeight: 'var(--Line-height-140)'
	},
	'text-24-extrabold': {
		fontSize: 'var(--Font-size-24)',
		fontWeight: 'var(--Font-weight-extrabold)',
		lineHeight: 'var(--Line-height-140)'
	},
	'text-28-regular': {
		fontSize: 'var(--Font-size-28)',
		fontWeight: 'var(--Font-weight-regular)',
		lineHeight: 'var(--Line-height-140)'
	},
	'text-28-bold': {
		fontSize: 'var(--Font-size-28)',
		fontWeight: 'var(--Font-weight-bold)',
		lineHeight: 'var(--Line-height-140)'
	},
	'text-28-extrabold': {
		fontSize: 'var(--Font-size-28)',
		fontWeight: 'var(--Font-weight-extrabold)',
		lineHeight: 'var(--Line-height-140)'
	},
	'text-32-regular': {
		fontSize: 'var(--Font-size-32)',
		fontWeight: 'var(--Font-weight-regular)',
		lineHeight: 'var(--Line-height-140)'
	},
	'text-32-bold': {
		fontSize: 'var(--Font-size-32)',
		fontWeight: 'var(--Font-weight-bold)',
		lineHeight: 'var(--Line-height-140)'
	},
	'text-32-extrabold': {
		fontSize: 'var(--Font-size-32)',
		fontWeight: 'var(--Font-weight-extrabold)',
		lineHeight: 'var(--Line-height-140)'
	}
};

// Default HTML element to use for each variant
const defaultElements: Record<TypographyVariant, TextElement> = {
  'text-11-regular': 'span',
  'text-12-regular': 'span',
  'text-12-bold': 'span',
  'text-13-regular': 'span',
	'text-13-bold': 'span',
	'text-14-regular': 'span',
	'text-14-bold': 'span',
	'text-14-extrabold': 'span',
	'text-15-regular': 'span',
	'text-15-bold': 'span',
	'text-16-regular': 'span',
	'text-16-bold': 'span',
	'text-16-extrabold': 'span',
	'text-18-regular': 'span',
	'text-18-bold': 'span',
	'text-18-extrabold': 'span',
	'text-20-regular': 'span',
	'text-20-bold': 'span',
	'text-20-extrabold': 'span',
	'text-24-regular': 'span',
	'text-24-bold': 'span',
	'text-24-extrabold': 'span',
	'text-28-regular': 'span',
	'text-28-bold': 'span',
	'text-28-extrabold': 'span',
	'text-32-regular': 'span',
	'text-32-bold': 'span',
	'text-32-extrabold': 'span',
};

const Text: React.FC<TextProps> = ({
  children,
  variant,
  color,
  as,
  className,
  textAlign,
  onClick,
  mobileVariant
}) => {
  // Determine the element type to render
  const element = as || defaultElements[variant] || 'span';
  
  return (
    <StyledText
      as={element}
      variant={variant}
      $color={color}
      className={className}
      $textAlign={textAlign}
      onClick={onClick}
      $mobileVariant={mobileVariant}
    >
      {children}
    </StyledText>
  );
};

const StyledText = styled.span<{
  variant: TypographyVariant;
  $color?: string;
  $textAlign?: string;
  $mobileVariant?: TypographyVariant;
}>`
  font-family: var(--Font-family-sans);
  font-size: ${props => variantStyles[props.variant].fontSize};
  font-weight: ${props => variantStyles[props.variant].fontWeight};
  line-height: ${props => variantStyles[props.variant].lineHeight};
  color: ${props => props.$color || 'var(--Color-Foundation-gray-900)'};
  letter-spacing: var(--Font-letter-spacing-0);
  text-align: ${props => props.$textAlign || 'left'};
  
  @media (max-width: 768px) {
    ${props => props.$mobileVariant && `
      font-size: ${variantStyles[props.$mobileVariant].fontSize};
      font-weight: ${variantStyles[props.$mobileVariant].fontWeight};
      line-height: ${variantStyles[props.$mobileVariant].lineHeight};
    `}
  }
`;

export default Text;