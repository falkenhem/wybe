import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateEventScreen from "../Screens/CreateEventScreen";
import StartScreen from "../Screens/StartScreen";
import ChatScreen from "../Screens/ChatScreen";
import JoinedEventsScreen from "../Screens/JoinedEventsScreen";
import JoinEventScreen from "../Screens/JoinEventScreen";
import TopBar from "../Components/TopBar";

const Stack = createStackNavigator();

function HomeStack() {
  const [currentEvent, setCurrentEvent] = useState("");

  return (
    <Stack.Navigator
      initialRouteName="Start"
      screenOptions={{
        header: (props) => <TopBar {...props} currentEvent={currentEvent} />,
      }}
    >
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="JoinedEvents" component={JoinedEventsScreen} />
      <Stack.Screen name="JoinEvent" component={JoinEventScreen} />
      <Stack.Screen name="Chat">
        {(props) => (
          <ChatScreen {...props} updateCurrentEvent={setCurrentEvent} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default HomeStack;
