import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
import { Button, List, Divider } from "react-native-paper";
import theme from "../CustomProperties/Theme";
import styles from "../CustomProperties/Styles";

function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ padding: "10%" }}>
        <Image
          source={require("../WYBE_icon.png")}
          style={{ width: 150, height: 150 }}
        />
      </View>

      <Button
        style={styles.button}
        mode="contained"
        icon="plus"
        color={`${theme.colors.primary}`}
        raised
        onPress={() => navigation.navigate("CreateEvent")}
      >
        Create new Event
      </Button>

      <Button
        style={styles.button}
        icon="arrow-right"
        mode="contained"
        color={`${theme.colors.primary}`}
        raised
        onPress={() => navigation.navigate("JoinedEvents")}
      >
        Joined Events
      </Button>

      <Button
        style={styles.button}
        icon="arrow-right"
        mode="contained"
        color={`${theme.colors.primary}`}
        raised
        onPress={() => navigation.navigate("JoinEvent")}
      >
        Join Event
      </Button>
    </View>
  );
}

export default StartScreen;
