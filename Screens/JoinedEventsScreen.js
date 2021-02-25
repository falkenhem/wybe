import React, { useState, useEffect, useContext } from "react";
import { View, FlatList } from "react-native";
import {
  Button,
  List,
  Divider,
  Card,
  Title,
  Paragraph,
} from "react-native-paper";
import theme from "../CustomProperties/Theme.js";
import styles from "../CustomProperties/Styles";
import * as firebase from "firebase";
import { AuthContext } from "../Firebase/AuthProvider";

async function getThreadsFromArray(array) {
  const snapshot = await firebase
    .firestore()
    .collection("THREADS")
    .where(firebase.firestore.FieldPath.documentId(), "in", array)
    .get();

  const data = snapshot.docs.map((doc) => ({
    _id: doc.id,
    ...doc.data(),
  }));

  return data;
}

function JoinedEventsScreen({ navigation, updateCurrentEvent }) {
  const [threadIDs, setThreadIDs] = useState([]);
  const [threads, setThreads] = useState([]);
  const { user } = useContext(AuthContext);
  const currentUser = user.toJSON();
  //kapa array till max 10 strängar
  //skicka array till firestore

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("USERS")
      .doc(currentUser.uid)
      .collection("THREADS")
      .onSnapshot(async (querySnapshot) => {
        const threadIDs = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.data().threadID,
          };
        });

        setThreadIDs(threadIDs);

        const threads = await getThreadsFromArray(
          threadIDs.map((item) => item._id)
        );
        setThreads(threads);
        // if (loading) {
        //   setLoading(false);
        // }
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        style={{ width: "90%" }}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <Card
            style={{ margin: "5%", backgroundColor: "#404040" }}
            onPress={() =>
              navigation.navigate("Chat", {
                thread: item,
              })
            }
          >
            <Card.Cover source={{ uri: item.bannerURL }} />
            <Card.Content>
              <Title>{item.name}</Title>
              <Paragraph>{item.description.text}</Paragraph>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

export default JoinedEventsScreen;
