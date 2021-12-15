import { FlattenSimpleInterpolation, ThemedCssFunction } from 'styled-components'

export type Color = string
export type Gradient = string
export interface Colors {
  white: Color
  black: Color
  accentColor: Color
  primary65: Color
  greyCapture: Color
  grey: Color
}

export interface Grids {
  sm: number
  md: number
  lg: number
}

declare module 'styled-components' {
  export interface DefaultTheme extends Colors {
    grids: Grids

    // shadows
    shadow1: string

    // media queries
    mediaWidth: {
      upToExtraSmall: ThemedCssFunction<DefaultTheme>
      upToSmall: ThemedCssFunction<DefaultTheme>
      upToMedium: ThemedCssFunction<DefaultTheme>
      upToLarge: ThemedCssFunction<DefaultTheme>
    }

    // css snippets
    flexColumnNoWrap: FlattenSimpleInterpolation
    flexRowNoWrap: FlattenSimpleInterpolation
    buttonFontStyle: FlattenSimpleInterpolation
  }
}
