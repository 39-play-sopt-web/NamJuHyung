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
        background: ${theme.colors.background};
        color: ${theme.colors.text};
      }
      a {
        color: ${theme.colors.secondary};
        text-decoration: none;
      }
    `}
  />
)

export default GlobalStyle
