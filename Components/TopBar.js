import * as React from "react";
import { Share } from "react-native";
import { Appbar } from "react-native-paper";
import theme from "../CustomProperties/Theme.js";

function TopBar({ navigation, previous, scene, currentEvent }) {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Hi! You're invited to an event:" + currentEvent,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content
        title={scene.route.name}
        subtitle="WYBE"
        color={`${theme.colors.accent}`}
      />
      {scene.route.name === "Chat" ? (
        <Appbar.Action icon="plus" onPress={onShare} />
      ) : null}
    </Appbar.Header>
  );
}

export default TopBar;
