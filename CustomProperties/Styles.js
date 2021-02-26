import theme from "../CustomProperties/Theme.js";
import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
    width: Dimensions.get("window").width,
  },

  containerRow: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
    width: Dimensions.get("window").width,
  },

  singleLineInput: {
    //alignItems: "top",
    //justifyContent: "left",
    margin: "5%",
    width: "100%",
  },

  multiLineInput: {
    //alignItems: "top",
    //justifyContent: "left",
    margin: "5%",
    width: "100%",
    height: 400,
  },

  button: {
    width: "100%",
    margin: "2%",
    alignItems: "center",
    alignContent: "center",
    ustifyContent: "center",
    //backgroundColor: theme.colors.accent,
  },

  iconButton: {
    width: "40%",
    margin: "2%",
    alignItems: "center",
    alignContent: "center",
    ustifyContent: "center",
  },

  bannerImage: {
    width: 500,
    height: 500,
    resizeMode: "contain",
  },
});

export default styles;
