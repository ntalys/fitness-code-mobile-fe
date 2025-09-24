import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Button,
  H3,
  Progress,
  TamaguiProvider,
  Text,
  XStack,
  YStack,
} from "tamagui";
import config from "../tamagui.config";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react-native";
import { Step1, Step2, Step3, Step4, Step5 } from "../components/setup";
import {
  KeyboardAvoidingView,
  KeyboardProvider,
} from "react-native-keyboard-controller";
import { Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function Page() {
  const router = useRouter();
  const [progress, setProgress] = useState(20);
  const [step, setStep] = useState(1);

  const currStepComponent = {
    1: Step1,
    2: Step2,
    3: Step3,
    4: Step4,
    5: Step5,
  };

  const [personalInfo, setPersonalInfo] = useState({
    fname: "",
    lname: "",
    gender: "",
    birthday: new Date(),
    email: "",
    password: "",
  });

  const [physicalMeasurements, setPhysicalMeasurements] = useState({
    weight: { value: 0, unit: "" },
    height: { value: 0, unit: "" },
  });

  const [fitnessGaol, setFitnessGoal] = useState([]);

  const [fitnessExp, setFitnessExp] = useState({
    fitnessLevel: "",
    workoutFrequency: "",
  });

  function onProgressStepIncrease() {
    if (step === 5) {
      router.replace("/home");
      return;
    }
    setProgress(progress + 20);
    setStep(step + 1);
  }

  function onProgressStepDecrease() {
    if (step === 1) return;
    setProgress(progress - 20);
    setStep(step - 1);
  }

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config} defaultTheme="light">
        <KeyboardProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            {/* Header */}
            <XStack alignItems="center" justifyContent="center" px="$4" pt="$4">
              <H3>Setup Your Profile</H3>

              {step > 1 && (
                <Button
                  unstyled
                  size="$6"
                  pt="$4"
                  icon={ArrowLeft}
                  onPress={onProgressStepDecrease}
                  style={{
                    position: "absolute",
                    left: -4,
                    justifyContent: "center",
                    backgroundColor: "transparent",
                  }}
                />
              )}
            </XStack>

            {/* Progress bar */}
            <YStack px={25} pt={20} pb={10} gap={18}>
              <XStack justifyContent="space-between">
                <Text>{step}/5</Text>
                <Text>{progress}%</Text>
              </XStack>

              <Progress value={progress} max={100} bg="white">
                <Progress.Indicator animation="quick" bg="$accent4" />
              </Progress>
            </YStack>

            {/* Scrollable step content */}
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingHorizontal: 25,
                paddingBottom: 20,
              }}
              keyboardShouldPersistTaps="handled">
              <YStack backgroundColor="white" rounded="$6" p="$4">
                {Object.entries(currStepComponent).map(([key, Comp]) => (
                  <YStack
                    key={key}
                    display={step === Number(key) ? "flex" : "none"}>
                    <Comp
                      personalInfo={personalInfo}
                      setPersonalInfo={setPersonalInfo}
                      physicalMeasurements={physicalMeasurements}
                      setPhysicalMeasurements={setPhysicalMeasurements}
                      fitnessGaol={fitnessGaol}
                      setFitnessGoal={setFitnessGoal}
                      fitnessExp={fitnessExp}
                      setFitnessExp={setFitnessExp}
                    />
                  </YStack>
                ))}
              </YStack>
            </ScrollView>

            {/* Step button (fixed at bottom) */}
            <YStack p={25} mb={40}>
              <XStack width="$100" justify={step < 5 ? "start" : "center"}>
                <Button
                  size="$5"
                  iconAfter={step < 5 ? ArrowRight : Check}
                  onPress={onProgressStepIncrease}
                  theme="accent">
                  {step < 5 ? "Continue" : "Complete Setup"}
                </Button>
              </XStack>
            </YStack>
          </KeyboardAvoidingView>
        </KeyboardProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
