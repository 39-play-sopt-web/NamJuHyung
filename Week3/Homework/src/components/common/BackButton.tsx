import styled from '@emotion/styled'

interface BackButtonProps {
  children: string
  onClick: () => void
}

function BackButton({ children, onClick }: BackButtonProps) {
  return (
    <StyledButton type="button" onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export default BackButton

const StyledButton = styled.button`
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.1s;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`
