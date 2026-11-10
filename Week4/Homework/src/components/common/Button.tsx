import { css } from '@emotion/react'
import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const base = ({ theme }: { theme: Theme }) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 600;
  white-space: nowrap;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`

const primary = ({ theme }: { theme: Theme }) => css`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.background};

  &:hover:not(:disabled) {
    background-color: ${theme.colors.secondary};
  }
`

const outline = ({ theme }: { theme: Theme }) => css`
  border-color: ${theme.colors.secondary};
  color: ${theme.colors.secondary};

  &:hover:not(:disabled) {
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.background};
  }
`

const danger = ({ theme }: { theme: Theme }) => css`
  border-color: ${theme.colors.accent};
  color: ${theme.colors.accent};

  &:hover:not(:disabled) {
    background-color: ${theme.colors.accent};
    color: ${theme.colors.text};
  }
`

export const PrimaryButton = styled.button`
  ${base}
  ${primary}
`

export const OutlineButton = styled.button`
  ${base}
  ${outline}
`

export const DangerButton = styled.button`
  ${base}
  ${danger}
`

export const OutlineLink = styled(Link)`
  ${base}
  ${outline}
`
