import { Global, css } from '@emotion/react'

const GlobalStyle = () => (
  <Global
    styles={(theme) => css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      body {
        min-height: 100vh;
        background: ${theme.colors.background};
        color: ${theme.colors.text};
      }
      a {
        color: ${theme.colors.secondary};
        text-decoration: none;
      }
      button {
        border: none;
        background: none;
        color: inherit;
        font: inherit;
        cursor: pointer;
      }
      input,
      textarea {
        color: inherit;
        font: inherit;
      }
      ::selection {
        background: ${theme.colors.primary};
        color: ${theme.colors.background};
      }
    `}
  />
)

export default GlobalStyle
