import { css } from '@emotion/react'
import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'

const fieldStyle = ({ theme }: { theme: Theme }) => css`
  width: 100%;
  padding: 12px;
  border: 1px solid ${theme.colors.secondary};
  border-radius: 8px;
  background-color: transparent;

  &[aria-invalid='true'] {
    border-color: ${theme.colors.accent};
  }

  &::placeholder {
    color: ${theme.colors.text};
    opacity: 0.4;
  }

  &:focus {
    outline: none;
  }

  &:focus::placeholder {
    color: transparent;
  }
`

export const Input = styled.input`
  ${fieldStyle}
`

export const Textarea = styled.textarea`
  ${fieldStyle}
  line-height: 1.5;
  resize: vertical;
`
