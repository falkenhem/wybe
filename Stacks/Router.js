import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";
import { AuthContext } from "../Firebase/AuthProvider";
import Loading from "../Components/Loading";

export default function Routes() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <NavigationContainer>
      {/* <AuthStack /> */}
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
