import React from "react";
import { configureFonts, DefaultTheme } from "react-native-paper";
import customFonts from "./Fonts";

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(customFonts),
  roundness: 3,
  dark: "true",
  colors: {
    ...DefaultTheme.colors,
    primary: "#121212",
    accent: "#a8ebebff",
    paper: "#75DDDD",
    text: "#FFFFFF",
    favorite: "#8A4F7D",
    cancelButton: "#a4c639",
    iconColor: "#808080",
    background: "#404040",
    placeholder: "#B3B3B3",
  },
};

export default theme;
