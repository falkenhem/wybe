import React, { Fragment, useState, useContext } from "react";
import { View, Image, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import styles from "../CustomProperties/Styles";
import { AuthContext } from "../Firebase/AuthProvider";
import theme from "../CustomProperties/Theme";
import { ScrollView } from "react-native-gesture-handler";

function AuthScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView>
        <View style={{ padding: "10%" }}>
          <Image
            source={require("../WYBE_icon.png")}
            style={{ width: 150, height: 150 }}
          />
        </View>
        <TextInput
          style={styles.singleLineInput}
          value={username}
          onChangeText={(username) => setUsername(username)}
          label="Username"
          multiline={false}
        />
        <TextInput
          style={styles.singleLineInput}
          value={password}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          label="Password"
          multiline={false}
        />
        <View style={styles.container}>
          <Button
            style={styles.button}
            icon="arrow-right"
            mode="contained"
            color={`${theme.colors.accent}`}
            raised
            onPress={() => {
              console.log("Trying to log in");
              login(username, password);
            }}
          >
            Log in
          </Button>
        </View>
        <View style={styles.container}>
          <Button
            style={styles.button}
            icon="arrow-up"
            mode="text"
            color={`${theme.colors.accent}`}
            raised
            onPress={() => {
              console.log("Go to sign-up screen");
              navigation.navigate("SignUp");
            }}
          >
            Sign up
          </Button>
        </View>
        <View style={{ flex: 0.5 }}></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AuthScreen;
