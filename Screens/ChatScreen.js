import React, { useEffect, useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import { IconButton, Title } from "react-native-paper";
import ChatWindow from "../Components/ChatWindow.js";
import { AuthContext } from "../Firebase/AuthProvider";

function ChatScreen({ navigation, route, updateCurrentEvent }) {
  const { thread } = route.params;
  const date = new Date(thread.date.seconds * 1000);
  const dateAsString = date.toString();
  const { user } = useContext(AuthContext);
  const currentUser = user.toJSON();
  //console.log(currentUser.uid);

  useEffect(() => {
    updateCurrentEvent(thread._id);
  });

  return (
    <View style={styles.container}>
      {currentUser.uid === thread.admin ? (
        <View style={{ alignItems: "flex-end" }}>
          <IconButton icon="cog" />
        </View>
      ) : null}
      <View>
        <Image
          style={{ width: "100%", height: 100 }}
          source={{ uri: thread.bannerURL }}
        />
      </View>
      <View style={{ padding: "5%" }}>
        <Title>{dateAsString}</Title>
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
    justifyContent: "center",
  },
});
