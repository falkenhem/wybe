import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import ChatWindow from "../Components/ChatWindow.js";
import * as firebase from "firebase";
import firebaseConfig from "../Firebase/FirebaseConfig.js";

function ChatScreen({ navigation, route, updateCurrentEvent }) {
  const { thread } = route.params;
  useEffect(() => {
    updateCurrentEvent(thread._id);
  });

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{ width: "100%", height: 100 }}
          source={{ uri: thread.bannerURL }}
        />
      </View>
      <View style={{ flex: 4 }}>
        <ChatWindow style={{ flex: 2 }} thread={thread} />
      </View>
    </View>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141204",
    //flexDirection: "row",
    //alignItems: "center",
    justifyContent: "center",
  },
});
