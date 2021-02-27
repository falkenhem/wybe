import React, { useContext, useState, useCallback, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import styles from "../CustomProperties/Styles";
import * as firebase from "firebase";
import firebaseConfig from "../Firebase/FirebaseConfig.js";
import { AuthContext } from "../Firebase/AuthProvider";
import CreateEventWizard from "../Components/CreateEventWizard";

function addEventToFirestore(name, description, bannerUrl, currentUser, date) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  firebase
    .firestore()
    .collection("THREADS")
    .add({
      name: name,
      date: date,
      description: {
        text: description,
        createdAt: new Date().getTime(),
      },
      admin: currentUser.uid,
      bannerURL: bannerUrl.i,
    })
    .then((docRef) => {
      docRef.collection("MESSAGES").add({
        text: description,
        createdAt: new Date().getTime(),
        system: true,
      });
      firebase
        .firestore()
        .collection("USERS")
        .doc(currentUser.uid)
        .collection("THREADS")
        .add({ threadID: docRef.id });
    });
}

function CreateEventScreen({ navigation }) {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState();
  const { user } = useContext(AuthContext);
  const currentUser = user.toJSON();
  const [bannerUrl, setBannerUrl] = useState();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView>
        <CreateEventWizard
          getUrl={(url) => setBannerUrl(url)}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          date={date}
          setDate={setDate}
          addEventToFirestore={addEventToFirestore}
          currentUser={currentUser}
          bannerUrl={bannerUrl}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default CreateEventScreen;
