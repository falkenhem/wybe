import React, { useRef, useState, useEffect } from "react";
import { Image, View } from "react-native";
import { TextInput, Title, IconButton } from "react-native-paper";
import Wizard from "react-native-wizard";
import styles from "../CustomProperties/Styles";
import ImageSelector from "../Components/ImageSelector";
import WebDatePicker from "../Components/WebDatePicker";
import theme from "../CustomProperties/Theme";

function CreateEventWizard({
  getUrl,
  title,
  setTitle,
  description,
  setDescription,
  date,
  setDate,
}) {
  const wizard = useRef();
  const [isFirstStep, setIsFirstStep] = useState();
  const [isLastStep, setIsLastStep] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const [currentBanner, setCurrentBanner] = useState(null);

  useEffect(() => {
    // This gets called after every render, by default
    // (the first one, and every one after that)
    console.log("render!");

    // If you want to implement componentWillUnmount,
    // return a function from here, and React will call
    // it prior to unmounting.
    return () => console.log("unmounting...");
  });

  const stepList = [
    {
      content: (
        <View style={styles.container}>
          <Title fontSize={200}>
            1. Select a Banner image and give your Event a Name.
          </Title>
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
          <WebDatePicker setDate={setDate} />
        </View>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <Wizard
        ref={wizard}
        activeStep={2}
        steps={stepList}
        isFirstStep={(val) => setIsFirstStep(val)}
        isLastStep={(val) => setIsLastStep(val)}
        onNext={() => {
          console.log("Next Step Called");
        }}
        onPrev={() => {
          console.log("Previous Step Called");
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
    </View>
  );
}

export default CreateEventWizard;
