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
import { Alert, Platform, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { user, User } from "../@types/user";

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
    weight: { value: 0, unit: "" as "cm" | "ft" },
    height: { value: 0, unit: "" as "kg" | "lbs" },
  });

  const [fitnessGaol, setFitnessGoal] = useState([]);

  const [fitnessExp, setFitnessExp] = useState({
    fitnessLevel: "",
    workoutFrequency: "",
  });

  const [acceptConditions, setAcceptConditions] = useState(false);

  const methods = useForm<User>({
    resolver: zodResolver(user),
    mode: "onChange", // validates automatically as the user types
  });

  async function onProgressStepIncrease() {
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
            <XStack justify="center" px="$4" pt="$4">
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
              <XStack justify="space-between">
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
              <YStack bg="white" rounded="$6" p="$4">
                {Object.entries(currStepComponent).map(([key, Comp]) => (
                  <YStack
                    key={key}
                    display={step === Number(key) ? "flex" : "none"}>
                    <FormProvider {...methods}>
                      <Comp
                        personalInfo={personalInfo}
                        setPersonalInfo={setPersonalInfo}
                        physicalMeasurements={physicalMeasurements}
                        setPhysicalMeasurements={setPhysicalMeasurements}
                        fitnessGaol={fitnessGaol}
                        setFitnessGoal={setFitnessGoal}
                        fitnessExp={fitnessExp}
                        setFitnessExp={setFitnessExp}
                        acceptConditionsValue={acceptConditions}
                        setAcceptConditions={setAcceptConditions}
                      />
                    </FormProvider>
                  </YStack>
                ))}
              </YStack>
            </ScrollView>

            <YStack p={25} mb={40}>
              <XStack w="$100" justify={step < 5 ? "flex-start" : "center"}>
                <Pressable
                  onPress={() => {
                    if (step == 5 && !acceptConditions) {
                      Alert.alert(
                        "Alert",
                        "Please accept terms and conditions"
                      );
                    }
                  }}>
                  {step === 5 ? (
                    <Button
                      disabled={!acceptConditions}
                      disabledStyle={{ opacity: 0.5 }}
                      size="$5"
                      iconAfter={Check}
                      onPress={onProgressStepIncrease}
                      theme="accent">
                      {"Complete Setup"}
                    </Button>
                  ) : (
                    <Button
                      // disabled={stepValid[step]}
                      disabledStyle={{ opacity: 0.5 }}
                      size="$5"
                      iconAfter={ArrowRight}
                      onPress={onProgressStepIncrease}
                      theme="accent">
                      {"Continue"}
                    </Button>
                  )}
                </Pressable>
              </XStack>
            </YStack>
          </KeyboardAvoidingView>
        </KeyboardProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
