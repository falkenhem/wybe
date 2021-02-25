import React from "react";
import { View, Text } from "react-native";
import { MessageText, Time } from "react-native-gifted-chat";

const ChatBubble = (props) => {
  const { position, children, currentMessage, uri } = props;
  return (
    <View style={styles[position].container}>
      <View style={styles[position].wrapper}>
        <MessageText {...props} />
        {children}
        <Time {...props} />
      </View>
    </View>
  );
};

export default ChatBubble;

const styles = {
  left: {
    container: {
      flex: 1,
      alignItems: "flex-start",
    },
    wrapper: {
      borderRadius: 10,
      backgroundColor: "#A06CD5",
      marginRight: 60,
      minHeight: 20,
      justifyContent: "flex-end",
    },
  },
  right: {
    container: {
      flex: 1,
      alignItems: "flex-end",
    },
    wrapper: {
      borderRadius: 10,
      backgroundColor: "#75DDDD",
      marginLeft: 60,
      minHeight: 20,
      justifyContent: "flex-end",
    },
  },
};
