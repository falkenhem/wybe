import React, { Fragment, useState, useContext } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import styles from "../CustomProperties/Styles";
import { AuthContext } from "../Firebase/AuthProvider";

function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.singleLineInput}
        value={email}
        email={true}
        onChangeText={(email) => setEmail(email)}
        label="E-mail"
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
      <Button
        style={{ width: "100%" }}
        icon="arrow-right"
        mode="contained"
        raised
        onPress={() => {
          console.log("Register: " + email + " " + password);
          register(email, password);
        }}
      >
        Sign Up
      </Button>
    </View>
  );
}

export default SignUpScreen;
