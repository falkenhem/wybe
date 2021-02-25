import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import {
  StyleSheet,
  View,
  Image,
  Platform,
  Dimensions,
  Button,
} from "react-native";
import theme from "../CustomProperties/Theme";
import styles from "../CustomProperties/Styles";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import { v4 as uuid } from "uuid";

//Add image resizing

function ImageSelector({ getUrl, currentBanner, setCurrentBanner }) {
  const [selectedBanner, setSelectedBanner] = useState(currentBanner);
  const dimensions = Dimensions.get("window");

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedBanner({ localUri: pickerResult.uri });
    setCurrentBanner({ localUri: pickerResult.uri });
    const uploadObject = await uploadToFirebase(pickerResult.uri, getUrl);
  };

  if (selectedBanner !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedBanner.localUri }}
          style={{
            width: dimensions.width,
            height: 250,
            resizeMode: "crop",
          }}
        />
        <Button onPress={() => setSelectedBanner(null)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <IconButton
        onPress={openImagePickerAsync}
        icon="camera-plus"
        size={50}
        color={`${theme.colors.accent}`}
      />
    </View>
  );
}

export default ImageSelector;

async function uploadToFirebase(uri, getUrl) {
  const blob = await uriToBlob(uri);

  return new Promise((resolve, reject) => {
    let uploadBlob = null;
    var storageRef = firebase.storage().ref("Banners").child(uuid());
    storageRef
      //.child(uuid())
      .put(blob)
      .then((snapshot) => {
        resolve(snapshot);
        getUrl(storageRef.getDownloadURL());
        console.log(storageRef.getDownloadURL());
      })
      // .then(() => {
      //   uploadBlob.close();
      //   //return storageRef.getDownloadURL();
      // })
      .catch((error) => {
        reject(error);
      });
  });
}

async function uriToBlob(uri) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      reject(new Error("uriToBlob failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);

    xhr.send(null);
  });
}
