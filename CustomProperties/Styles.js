import theme from "../CustomProperties/Theme.js";
import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    //padding: "5%",
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
    margin: "5%",
    //padding: "5%",
    width: "90%",
  },

  multiLineInput: {
    margin: "5%",
    width: "100%",
    height: 400,
  },

  button: {
    width: "90%",
    margin: "2%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    //backgroundColor: theme.colors.accent,
  },

  iconButton: {
    width: "40%",
    margin: "2%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  bannerImage: {
    width: 500,
    height: 500,
    resizeMode: "contain",
  },
});

export default styles;
