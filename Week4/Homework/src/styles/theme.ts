const palette = {
  ink: '#0B1020',
  mint: '#00FFD5',
  blue: '#00A3FF',
  lime: '#39FF14',
  purple: '#B026FF',
  white: '#FFFFFF',
}

export const theme = {
  colors: {
    ...palette,
    background: palette.ink,
    primary: palette.mint,
    secondary: palette.blue,
    accent: palette.purple,
    success: palette.lime,
    text: palette.white,
  },
}
