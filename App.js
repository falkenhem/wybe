import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "./Firebase/AuthProvider";
import theme from "./CustomProperties/Theme";
import Router from "./Stacks/Router";
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <Router />
      </PaperProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF1493",
    alignItems: "center",
    justifyContent: "center",
  },
});
