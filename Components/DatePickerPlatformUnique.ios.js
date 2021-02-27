import React, { useState } from "react";
import { View, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../CustomProperties/Styles";

function DatePickerPlatformUnique({ date, setDate }) {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "60%" }}>
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="datetime"
          is24Hour={true}
          display="default"
          //onChange={onChange}
          onChange={onChange}
        />
      </View>
    </View>
  );
}

export default DatePickerPlatformUnique;
