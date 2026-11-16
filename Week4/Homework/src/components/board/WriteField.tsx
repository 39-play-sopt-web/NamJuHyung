import styled from '@emotion/styled'
import type { WriteStep } from '../../constants/post'
import { Input, Textarea } from '../common/Input'

interface WriteFieldProps {
  step: WriteStep
  value: string
  onChange: (value: string) => void
}

export default function WriteField({ step, value, onChange }: WriteFieldProps) {
  const { key, label, placeholder, maxLength, errorMessage, multiline } = step
  const isOverLimit = value.length > maxLength
  const fieldId = `post-${key}`
  const errorId = `${fieldId}-error`

  const fieldProps = {
    id: fieldId,
    value,
    placeholder,
    'aria-invalid': isOverLimit,
    'aria-describedby': isOverLimit ? errorId : undefined,
  }

  return (
    <Field>
      <Label htmlFor={fieldId}>{label}</Label>
      {multiline ? (
        <Textarea
          {...fieldProps}
          rows={10}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <Input
          {...fieldProps}
          type="text"
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      <Footer>
        {isOverLimit && (
          <ErrorMessage id={errorId} role="alert">
            {errorMessage}
          </ErrorMessage>
        )}
        <Counter isOver={isOverLimit}>
          {value.length} / {maxLength}
        </Counter>
      </Footer>
    </Field>
  )
}

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-weight: 700;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 14px;
`

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.accent};
`

const Counter = styled.p<{ isOver: boolean }>`
  margin-left: auto;
  color: ${({ theme, isOver }) =>
    isOver ? theme.colors.accent : theme.colors.text};
  opacity: ${({ isOver }) => (isOver ? 1 : 0.6)};
`
