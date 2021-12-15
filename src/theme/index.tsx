import React, { useMemo } from 'react'
import styled, {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components'
import { Colors } from './styled'

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

export function colors(): Colors {
  return {
    white: '#FFFFFF',
    black: '#292F30',
    accentColor: '#1E2223',
    primary65: '#595959',
    greyCapture: '#747474',
    grey: '#E5E5E5',
  }
}

export function theme(): DefaultTheme {
  return {
    ...colors(),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1:  '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
    buttonFontStyle: css`
      font-size: 16px;
      color: white;
      line-height: 18.75px;
      font-weight: 700;
    `,
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled.span<{ color: keyof Colors; fontWeight: number; fontSize: number; lineHeight: number }>`
  color: ${({ color, theme }) => (theme as any)[color]};
  font-size: ${({fontSize}) => fontSize && `${fontSize}px`};
  font-weight: ${({fontWeight}) => fontWeight && `${fontWeight}`};
  line-height: ${({lineHeight}) => lineHeight && `${lineHeight}px`};
`

export const TYPE = {
  H2(props: any) {
    return <TextWrapper fontWeight={700} fontSize={18} lineHeight={21} color={'black'} {...props} />
  },
  H4(props: any) {
    return <TextWrapper fontWeight={700} fontSize={16} lineHeight={18.75} color={'black'} {...props} />
  },
  caption(props: any) {
    return <TextWrapper fontWeight={400} fontSize={14} lineHeight={16} color={'primary65'} {...props} />
  },
  btn(props: any) {
    return <TextWrapper fontWeight={700} fontSize={16} lineHeight={18.75} color={'accentColor'} {...props} />
  },
}

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.black};
  background-color: ${({ theme }) => theme.white} !important;
}
`
