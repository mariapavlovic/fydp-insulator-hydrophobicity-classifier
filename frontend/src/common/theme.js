import { createTheme } from "@rneui/themed";

export const AppTheme = createTheme({
  lightColors: {
    primary: "#2C2C2C",
    background: "#F2F0F0",
  },
  darkColors: {
    primary: "#000",
  },
  components: {
    Button: {
      titleStyle: {
        fontSize: 16,
        fontFamily: "Inter Medium"
      },
    },
    Text: {
      style: {
        fontSize: 20,
        fontFamily: "Inter Medium",
      },
      h1Style: {
        fontSize: 32,
        fontFamily: "Inter Bold",
        fontWeight: 'bold'
      },
    },
  },
});
