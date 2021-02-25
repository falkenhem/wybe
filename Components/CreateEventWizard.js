import React, { useRef, useState } from "react";
import { Image, View, Text, Button } from "react-native";
import { TextInput } from "react-native-paper";
import Wizard from "react-native-wizard";
import styles from "../CustomProperties/Styles";
import ImageSelector from "../Components/ImageSelector";
import DatePicker from "react-native-date-picker";

function CreateEventWizard({
  getUrl,
  title,
  setTitle,
  description,
  setDescription,
}) {
  const wizard = useRef();
  const [isFirstStep, setIsFirstStep] = useState();
  const [isLastStep, setIsLastStep] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const [currentBanner, setCurrentBanner] = useState(null);

  const stepList = [
    {
      content: (
        <View style={styles.container}>
          <ImageSelector
            getUrl={getUrl}
            currentBanner={currentBanner}
            setCurrentBanner={setCurrentBanner}
          />
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
      ),
    },
    {
      content: (
        <View style={styles.container}>
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
      ),
    },
    {
      content: (
        <Image
          source={{ uri: "http://placehold.it/96x96" }}
          style={{ width: 50, height: 50 }}
        />
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
          console.log("Next Step Called");
        }}
        onPrev={() => {
          console.log("Previous Step Called");
        }}
        currentStep={({ currentStep, isLastStep, isFirstStep }) => {
          setCurrentStep(currentStep);
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <Button
          disabled={isFirstStep}
          title="Prev"
          onPress={() => wizard.current.prev()}
        />
        <Button
          disabled={isLastStep}
          title="Next"
          onPress={() => wizard.current.next()}
        />
      </View>
    </View>
  );
}

export default CreateEventWizard;
