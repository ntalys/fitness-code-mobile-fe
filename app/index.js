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
import { Component, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react-native";
import Step1 from "../components/setup/Step1";
import Step2 from "../components/setup/Step2";
import Step3 from "../components/setup/Step3";
import Step4 from "../components/setup/Step4";
import Step5 from "../components/setup/Step5";

export default function Page() {
  // const [themeMode, setThemeMode] = (useState < "light") | ("dark" > "light");

  const [progress, setProgress] = useState(20);
  const [step, setStep] = useState(1);
  // const router = useRouter();

  function onProgressStepIncrease() {
    if (step === 5) return;
    setProgress(() => progress + 20);
    setStep(() => step + 1);
  }

  function onProgressStepDecrease() {
    if (step === 1) return;
    setProgress(() => progress - 20);
    setStep(() => step - 1);
  }

  const setupComponent = {
    1: Step1,
    2: Step2,
    3: Step3,
    4: Step4,
    5: Step5,
  };

  const CurrStepComponent = setupComponent[step] || <Step1 />;

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config} defaultTheme={"light"}>
        <KeyboardProvider>
        {/* Header */}
        <XStack justifyContent="start">
          <YStack justifyContent="center" alignItems="center">
            {step > 1 && (
              <Button
                unstyled
                circular
                size="$6"
                icon={ArrowLeft}
                justifyContent="center"
                onPress={onProgressStepDecrease}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
              />
            )}
          </YStack>

          <YStack
            px={"$6"}
            py={"$3"}
            justifyContent="center"
            alignItems="center">
            <H3>Setup Your Profile</H3>
          </YStack>
        </XStack>

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

          {/* Main  */}

          <YStack backgroundColor="white" rounded={"$6"} p={"$6"}>
            <CurrStepComponent />
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
        </KeyboardProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
