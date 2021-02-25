import React, { useContext, useState, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";
import ImageSelector from "../Components/ImageSelector.js";
import styles from "../CustomProperties/Styles";
import { DatePickerModal } from "react-native-paper-dates";
import * as firebase from "firebase";
import firebaseConfig from "../Firebase/FirebaseConfig.js";
import { AuthContext } from "../Firebase/AuthProvider";
import CreateEventWizard from "../Components/CreateEventWizard";

function addEventToFirestore(name, description, bannerUrl, currentUser) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  firebase
    .firestore()
    .collection("THREADS")
    .add({
      name: name,
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
  const { user } = useContext(AuthContext);
  const currentUser = user.toJSON();
  const [bannerUrl, setBannerUrl] = useState();
  const [date, setDate] = useState(undefined);
  const [singleOpen, setSingleOpen] = useState(false);
  const onDismissSingle = useCallback(() => {
    setSingleOpen(false);
  }, [setSingleOpen]);
  const onChangeSingle = useCallback(
    (params) => {
      setSingleOpen(false);
      setDate(params.date);
    },
    [setSingleOpen, setDate]
  );

  return (
    <View style={styles.container}>
      <CreateEventWizard
        getUrl={(url) => setBannerUrl(url)}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      ></CreateEventWizard>
      {/* <ImageSelector getUrl={(url) => setBannerUrl(url)} />

      <View
        style={{ flex: 1, flexDirection: "row", width: "100%", height: "5%" }}
      >
        <TextInput
          mode="flat"
          style={{ flex: 1, margin: "5%" }}
          multiline="false"
          value={title}
          placeholder="Give your event a name..."
          onChangeText={(title) => setTitle(title)}
          label="Title"
        />
      </View>
      <View
        style={{
          flex: 3,
          flexDirection: "row",
          width: "100%",
        }}
      >
        <TextInput
          mode="flat"
          style={{ flex: 1, margin: "5%" }}
          multiline="true"
          value={description}
          placeholder="Write something..."
          onChangeText={(description) => setDescription(description)}
          label="Description"
        />
      </View>

      <View style={styles.container}>
        <Button
          style={{ width: "100%" }}
          icon="plus"
          mode="contained"
          onPress={() => {
            console.log(
              "Created event: " + title + " With description: " + description
            );
            addEventToFirestore(title, description, bannerUrl, currentUser);
          }}
        >
          Create event
        </Button>
      </View> */}
    </View>
  );
}

export default CreateEventScreen;
