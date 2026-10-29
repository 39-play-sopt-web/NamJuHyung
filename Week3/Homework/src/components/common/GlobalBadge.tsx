import styled from '@emotion/styled'

type GlobalBadgeSize = 'large' | 'small'

interface GlobalBadgeProps {
  children: string
  size?: GlobalBadgeSize
  isSelected?: boolean
  onClick?: () => void
}

function Badge({
  children,
  size = 'large',
  isSelected = false,
  onClick,
}: GlobalBadgeProps) {
  if (size === 'large') {
    return (
      <LargeBadge
        type="button"
        isSelected={isSelected}
        aria-pressed={isSelected}
        onClick={onClick}
      >
        {children}
      </LargeBadge>
    )
  }

  return <SmallBadge>{children}</SmallBadge>
}

export default Badge

const LargeBadge = styled.button<{ isSelected: boolean }>`
  padding: 8px 18px;
  border: none;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.1s,
    color 0.1s,
    filter 0.1s;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.secondary : theme.colors.surface};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.background : theme.colors.text};
  &:hover {
    filter: brightness(1.2);
  }
`

const SmallBadge = styled.span`
  display: inline-block;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
`
