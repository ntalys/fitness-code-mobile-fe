import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Button,
  H3,
  Progress,
  TamaguiProvider,
  Text,
  Theme,
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

export default function Page() {
  const [progress, setProgress] = useState(20);
  const [step, setStep] = useState(1);

  function onProgressStepIncrease() {
    if (step === 5) return;
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
      <TamaguiProvider config={config} defaultTheme={"light"}>
        <KeyboardProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            {/* Header */}
            <XStack
              alignItems="center"
              justifyContent="center"
              px="$4"
              pt={"$4"}>
              <H3>Setup Your Profile</H3>

              {step > 1 && (
                <Button
                  unstyled
                  // circular
                  size="$6"
                  pt={"$4"}
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

            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingVertical: 0,
                paddingBottom: 20,
              }}
              keyboardShouldPersistTaps="handled">
              {/* Progress bar */}
              <YStack
                style={{
                  justifyContent: "space-between",
                  padding: 25,
                  gap: 18,
                }}>
                <XStack style={{ justifyContent: "space-between" }}>
                  <Text>{step}/5</Text>
                  <Text>{progress}%</Text>
                </XStack>

                <YStack>
                  <XStack>
                    <Progress
                      value={progress}
                      max={100}
                      style={{ backgroundColor: "white" }}>
                      <Progress.Indicator
                        animation="quick"
                        style={{ backgroundColor: "hsla(51, 100%, 58%, 1)" }}
                      />
                    </Progress>
                  </XStack>
                </YStack>

                {/* Main content */}
                <YStack backgroundColor="white" rounded={"$6"} p={"$4"}>
                  <YStack style={{ display: step === 1 ? "flex" : "none" }}>
                    <Step1 />
                  </YStack>
                  <YStack style={{ display: step === 2 ? "flex" : "none" }}>
                    <Step2 />
                  </YStack>
                  <YStack style={{ display: step === 3 ? "flex" : "none" }}>
                    <Step3 />
                  </YStack>
                  <YStack style={{ display: step === 4 ? "flex" : "none" }}>
                    <Step4 />
                  </YStack>
                  <YStack style={{ display: step === 5 ? "flex" : "none" }}>
                    <Step5 />
                  </YStack>
                </YStack>

                {/* Step button */}
                <XStack width={"$100"} justify={step < 5 ? "start" : "center"}>
                  <Button
                    size="$6"
                    iconAfter={step < 5 ? ArrowRight : Check}
                    onPress={onProgressStepIncrease}
                    theme={"accent"}>
                    {step < 5 ? "Continue" : "Complete Setup"}
                  </Button>
                </XStack>
              </YStack>
            </ScrollView>
          </KeyboardAvoidingView>
        </KeyboardProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
