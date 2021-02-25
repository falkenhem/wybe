import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../Screens/AuthScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import TopBar from "../Components/TopBar";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{ header: (props) => <TopBar {...props} /> }}
    >
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
}

export default AuthStack;
