import theme from "../CustomProperties/Theme.js";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
    width: "100%",
  },

  singleLineInput: {
    //alignItems: "top",
    //justifyContent: "left",
    margin: "5%",
    width: "100%",
  },

  button: {
    width: "100%",
    margin: "2%",
    // alignItems: "center",
    // alignContent: "center",
    // justifyContent: "center",
    //backgroundColor: theme.colors.accent,
  },

  bannerImage: {
    width: 500,
    height: 500,
    resizeMode: "contain",
  },
});

export default styles;
