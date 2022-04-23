import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const styles = {
  global: (props: any) => ({
    body: {
      color: mode("#111", "#fff")(props),
      bg: mode("#fff", "#111")(props),
    },
  }),
};

const theme = extendTheme({ config, styles });

export default theme;
