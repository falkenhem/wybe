import React, { useRef, useState, useEffect } from "react";
import { Image, View, Platform } from "react-native";
import { TextInput, Title, IconButton, Button } from "react-native-paper";
import Wizard from "react-native-wizard";
import styles from "../CustomProperties/Styles";
import ImageSelector from "../Components/ImageSelector";
import DatePickerPlatformUnique from "./DatePickerPlatformUnique";
import theme from "../CustomProperties/Theme";

function checkEventSetupStatus(
  title,
  description,
  date,
  currentBanner,
  setEventSetupComplete
) {
  if (
    title.length > 0 &&
    description.length > 0 &&
    currentBanner !== null &&
    date !== null
  ) {
    setEventSetupComplete(true);
  }
}

function CreateEventWizard({
  getUrl,
  title,
  setTitle,
  description,
  setDescription,
  date,
  setDate,
  addEventToFirestore,
  currentUser,
  bannerUrl,
  navigation,
}) {
  const wizard = useRef();
  const [isFirstStep, setIsFirstStep] = useState();
  const [isLastStep, setIsLastStep] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [eventSetupComplete, setEventSetupComplete] = useState(false);

  useEffect(() => {
    checkEventSetupStatus(
      title,
      description,
      date,
      currentBanner,
      setEventSetupComplete
    );
  });

  //   const renderDatePicker = () => {
  //     if (Platform !== "ios" && Platform !== "android") {
  //       return <WebDatePicker setDate={setDate} />;
  //     } else {
  //       return <DateTimePicker />;
  //     }
  //   };

  const stepList = [
    {
      content: (
        <View style={styles.container}>
          <Title>1. Select a Banner image and give your Event a Name.</Title>
          <View style={styles.container}>
            <ImageSelector
              getUrl={getUrl}
              currentBanner={currentBanner}
              setCurrentBanner={setCurrentBanner}
            />
          </View>
          <TextInput
            mode="flat"
            style={styles.singleLineInput}
            multiline="false"
            value={title}
            placeholder="Give your event a name..."
            onChangeText={(title) => setTitle(title)}
            label="Title"
          />
        </View>
      ),
    },
    {
      content: (
        <View style={styles.container}>
          <Title>2. Describe what is about to Happen.</Title>
          <TextInput
            mode="flat"
            style={styles.multiLineInput}
            multiline="true"
            value={description}
            placeholder="Write something..."
            onChangeText={(description) => setDescription(description)}
            label="Description"
          />
        </View>
      ),
    },
    {
      content: (
        <View style={[styles.container, { marginBottom: "50%" }]}>
          <Title>3. Set the Time and Date.</Title>
          <DatePickerPlatformUnique date={date} setDate={setDate} />
        </View>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <Wizard
        ref={wizard}
        activeStep={0}
        steps={stepList}
        isFirstStep={(val) => setIsFirstStep(val)}
        isLastStep={(val) => setIsLastStep(val)}
        onNext={() => {
          //console.log("Next Step Called");
        }}
        onPrev={() => {
          //console.log("Previous Step Called");
        }}
        currentStep={({ currentStep, isLastStep, isFirstStep }) => {
          setCurrentStep(currentStep);
        }}
      />
      <View
        style={[
          styles.containerRow,
          {
            backgroundColor: "transparent",
          },
        ]}
      >
        <IconButton
          disabled={isFirstStep}
          style={styles.iconButton}
          icon="arrow-left"
          mode="contained"
          color={`${theme.colors.accent}`}
          raised
          onPress={() => wizard.current.prev()}
        ></IconButton>
        <IconButton
          disabled={isLastStep}
          style={styles.iconButton}
          icon="arrow-right"
          mode="contained"
          color={`${theme.colors.accent}`}
          raised
          onPress={() => wizard.current.next()}
        ></IconButton>
      </View>
      <Button
        style={styles.button}
        disabled={!eventSetupComplete}
        icon="check"
        mode="contained"
        color={`${theme.colors.accent}`}
        raised
        onPress={() => {
          console.log(
            "Created event: " + title + " With description: " + description
          );
          addEventToFirestore(title, description, bannerUrl, currentUser, date);
          navigation.navigate("JoinedEvents");
        }}
      >
        Create Event
      </Button>
    </View>
  );
}

export default CreateEventWizard;
