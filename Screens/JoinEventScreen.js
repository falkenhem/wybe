import React, { useState, useContext } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import styles from "../CustomProperties/Styles";
import * as firebase from "firebase";
import { AuthContext } from "../Firebase/AuthProvider";

async function addEventToUser(currentUser, eventID) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  //kolla så eventet finns
  const checkEventRef = firebase.firestore().collection("THREADS").doc(eventID);

  checkEventRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      console.log("Joined event: " + eventID);
      firebase
        .firestore()
        .collection("USERS")
        .doc(currentUser.uid)
        .collection("THREADS")
        .add({ threadID: eventID });
    } else {
      console.log("eventet finns INTE!!!");
    }
  });
}

function JoinEventScreen({ navigation }) {
  const [eventID, setEventID] = useState();
  const { user } = useContext(AuthContext);
  const currentUser = user.toJSON();

  return (
    <View style={styles.container}>
      <TextInput
        mode="flat"
        style={styles.singleLineInput}
        multiline="false"
        value={eventID}
        placeholder="Enter event code..."
        onChangeText={(eventID) => setEventID(eventID)}
        label="Event-ID"
      />
      <Button
        style={styles.button}
        mode="contained"
        icon="arrow-right"
        onPress={() => {
          eventID
            ? addEventToUser(currentUser, eventID).then(
                navigation.navigate("JoinedEvents")
              )
            : alert("Enter ID first");
        }}
      >
        Join Event!
      </Button>
    </View>
  );
}

export default JoinEventScreen;
