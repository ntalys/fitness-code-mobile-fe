import { createTamagui } from "tamagui";
import { themes } from "./themes";
import { defaultConfig } from "@tamagui/config/v4";

export const config = createTamagui({
  ...defaultConfig,
  themes,
});

export default config;
export type MyThemeConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends MyThemeConfig {}
}
