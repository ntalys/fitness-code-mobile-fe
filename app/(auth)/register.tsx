import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, H3, Progress, Text, XStack, YStack } from "tamagui";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react-native";
import { Step1, Step2, Step3, Step4, Step5 } from "../../components/setup";
import {
  KeyboardAvoidingView,
  KeyboardProvider,
} from "react-native-keyboard-controller";
import { Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { LoadingSpinner } from "../../components/custom/LoadingSpinner";
import { useColorScheme } from "react-native";
import ToastInSteroids from "../../components/toast/ToastInSteroids";

export default function Page() {
  const colorScheme = useColorScheme();

  const router = useRouter();
  const [progress, setProgress] = useState(20);
  const [step, setStep] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const [isStep1Valid, setIsStep1Valid] = useState(false);
  const [isStep2Valid, setIsStep2Valid] = useState(false);
  const [isStep3Valid, setIsStep3Valid] = useState(false);
  const [isStep4Valid, setIsStep4Valid] = useState(false);

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
    dateOfBirth: null,
    email: "",
    password: "",
  });

  const [physicalMeasurements, setPhysicalMeasurements] = useState({
    weight: { value: 0, unit: "" as "cm" | "ft" },
    height: { value: 0, unit: "" as "kg" | "lbs" },
  });

  const [fitnessGoal, setFitnessGoal] = useState([]);

  const [fitnessExp, setFitnessExp] = useState({
    fitnessLevel: "",
    workoutFrequency: "",
  });

  const [acceptConditions, setAcceptConditions] = useState(false);

  const onSubmit = async () => {
    const payload = {
      personalInfo,
      physicalMeasurements,
      fitnessGoal,
      fitnessExp,
      acceptConditions,
    };
    setIsLoading(() => true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/sign-up",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json", // 🧠 important so Express can parse JSON
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("data: ", data);

      if (!response.ok) {
        console.log("data: ", data);

        throw new Error(data.message || "Unknown server error");
      }

      Toast.show({
        type: "SToast",
        text1: "Success",
        text2: data.message,
        visibilityTime: 2000,
        autoHide: true,
        onHide: () => {
          router.replace("/");
        },
      });
    } catch (error) {
      Toast.show({
        type: "EToast",
        text1: "An error occurred",
        text2: error.message,
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setIsLoading(() => false);
    }
  };

  useEffect(() => Toast.hide(), [acceptConditions]);

  async function onProgressStepIncrease() {
    if (step === 5) {
      await onSubmit();
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

  const disableContinueBtn = useMemo(() => {
    switch (step) {
      case 1:
        return isStep1Valid;
      case 2:
        return isStep2Valid;
      case 3:
        return isStep3Valid;
      case 4:
        return isStep4Valid;
    }
  }, [isStep1Valid, isStep2Valid, isStep3Valid, isStep4Valid, step]);

  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}>
          <YStack height={"100%"} bg={"$color2"}>
            {/* Header */}
            <XStack z="$5">
              <ToastInSteroids />
            </XStack>
            <XStack justify="center" px="$4" pt="$4">
              <H3>Setup Your Profile</H3>

              {step > 1 && (
                <Button
                  unstyled
                  color={colorScheme === "dark" ? "white" : "black"}
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

              <Progress value={progress} max={100} bg="$color3">
                <Progress.Indicator animation="quick" bg="$accent4" />
              </Progress>
            </YStack>

            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingHorizontal: 25,
                paddingBottom: 20,
              }}
              keyboardShouldPersistTaps="handled">
              <YStack bg="$color3" rounded="$6" p="$4">
                {Object.entries(currStepComponent).map(([key, Comp]) => (
                  <YStack
                    key={key}
                    display={step === Number(key) ? "flex" : "none"}>
                    <Comp
                      personalInfo={personalInfo}
                      setPersonalInfo={setPersonalInfo}
                      physicalMeasurements={physicalMeasurements}
                      setPhysicalMeasurements={setPhysicalMeasurements}
                      fitnessGoal={fitnessGoal}
                      setFitnessGoal={setFitnessGoal}
                      fitnessExp={fitnessExp}
                      setFitnessExp={setFitnessExp}
                      acceptConditionsValue={acceptConditions}
                      setAcceptConditions={setAcceptConditions}
                      isStep1Valid={setIsStep1Valid}
                      isStep2Valid={setIsStep2Valid}
                      isStep3Valid={setIsStep3Valid}
                      isStep4Valid={setIsStep4Valid}
                    />
                  </YStack>
                ))}
              </YStack>
            </ScrollView>
            <YStack p={25} mb={40}>
              <XStack w="$100" justify={step < 5 ? "flex-start" : "center"}>
                {step === 5 ? (
                  <Button
                    size="$5"
                    iconAfter={<Check />}
                    fontWeight={"400"}
                    onPress={onProgressStepIncrease}
                    theme="accent">
                    {"Complete Setup"}
                  </Button>
                ) : (
                  <Button
                    disabled={!disableContinueBtn}
                    disabledStyle={{ opacity: 0.5 }}
                    fontWeight={"500"}
                    size="$5"
                    iconAfter={<ArrowRight />}
                    onPress={onProgressStepIncrease}
                    theme="accent">
                    {"Continue"}
                  </Button>
                )}
              </XStack>
            </YStack>
            {isLoading && <LoadingSpinner />}
          </YStack>
        </KeyboardAvoidingView>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}
