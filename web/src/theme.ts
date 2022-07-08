import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const styles = {
  global: (props: any) => ({
    body: {
      color: mode("#111", "#fff")(props),
      bg: mode("#fff", "#111")(props),
    },
  }),
};

const shadows = {
  white: {
    sm: "0 1px 2px 0 rgba(255, 255, 255, 0.05)",
    lg: "0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)",
  },
};

const theme = extendTheme({ config, styles, shadows });

export default theme;
