import React, { useState, useCallback, useEffect, useContext } from "react";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import ChatBubble from "../Components/ChatBubble.js";
import theme from "../CustomProperties/Theme.js";
import { AuthContext } from "../Firebase/AuthProvider";
import * as firebase from "firebase";

function ChatWindow({ thread }) {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const currentUser = user.toJSON();
  //const { thread } = thread.params;

  const renderBubble = (props) => {
    return <ChatBubble {...props} />;
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{ backgroundColor: theme.colors.primary }}
      />
    );
  };

  async function handleSend(messages) {
    const text = messages[0].text;

    firebase
      .firestore()
      .collection("THREADS")
      .doc(thread._id)
      .collection("MESSAGES")
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          email: "test@test.com",
        },
      });

    await firebase
      .firestore()
      .collection("THREADS")
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        { merge: true }
      );
  }
  useEffect(() => {
    const messagesListener = firebase
      .firestore()
      .collection("THREADS")
      .doc(thread._id)
      .collection("MESSAGES")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: "",
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email,
            };
          }

          return data;
        });

        setMessages(messages);
      });

    return () => messagesListener();
  }, []);

  return (
    <GiftedChat
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      messages={messages}
      onSend={handleSend}
      user={{
        _id: currentUser.uid,
      }}
      placeholder="Say something"
    />
  );
}

export default ChatWindow;
