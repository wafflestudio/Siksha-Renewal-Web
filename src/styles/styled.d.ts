// styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    width: number;
  }
}

export type BackgroundColor = "primary" | "secondary" | undefined;
