import { Pressable, Keyboard } from "react-native";
import React, { useEffect } from "react";
import { H6, Label, Paragraph, Text, YStack } from "tamagui";
import CustomSelectOpt from "../custom/CustomSelectOpt";
import {
  Control,
  Controller,
  FieldErrorsImpl,
  useForm,
  useFormContext,
  UseFormWatch,
} from "react-hook-form";
import { userFitnessExp, UserFitnessExp } from "../../@types/user";
import { zodResolver } from "@hookform/resolvers/zod";

type Step3Props = {
  fitnessGaol: string[];
  setFitnessGoal: React.Dispatch<React.SetStateAction<string[]>>;
  isStep4Valid: React.Dispatch<React.SetStateAction<boolean>>;
};

const Step4 = ({ fitnessExp, setFitnessExp, isStep4Valid }) => {
  const { fitnessLevel, workoutFrequency } = fitnessExp;

  const {
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<UserFitnessExp>({
    resolver: zodResolver(userFitnessExp),
    mode: "onChange",
    defaultValues: {
      fitnessLevel: fitnessLevel || "",
      workoutFrequency: workoutFrequency || "",
    },
  });

  useEffect(() => {
    isStep4Valid(isValid);
  }, [isValid]);

  const onValueChangeFitnessLevel = (text: string) =>
    setFitnessExp((prev) => ({ ...prev, fitnessLevel: text }));

  const onValueChangeWorkoutFrequency = (text: string) =>
    setFitnessExp((prev) => ({ ...prev, workoutFrequency: text }));

  const fitnessLevelOpt = [
    { name: "Beginner", value: "beginner" },
    { name: "Intermediate", value: "intermediate" },
    { name: "Advance", value: "advance" },
  ];
  const workoutFrequencyOpt = [
    { name: "1-2 time per week", value: "1-2 time per week" },
    { name: "3-4 time per week", value: "3-4 time per week" },
    { name: "5+ time per week", value: "5+ time per week" },
  ];

  return (
    <Pressable
      onPress={() => Keyboard.dismiss()}
      style={{ width: "100%" }}
      android_disableSound={false} // optional for Android
    >
      <YStack width="100%" gap="$4" py="$3">
        <H6 fontWeight={400}>Fitness Experience</H6>

        <YStack width="100%" alignItems="flex-start" gap={12}>
          <YStack flex={1} style={{ minWidth: 0 }}>
            <Label width={420} htmlFor="fitnessLevel">
              Fitness Level*
            </Label>
            <Controller
              control={control}
              name="fitnessLevel"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomSelectOpt
                  labelTitle="Fitness Level"
                  snapPoints={[35]}
                  items={fitnessLevelOpt}
                  maxWidth={420}
                  value={value}
                  onValueChange={(text) => {
                    onChange(text); // update react-hook-form
                    onValueChangeFitnessLevel(text);
                  }}
                  onOpenChange={() => Keyboard.dismiss()}
                  placeholder="Enter your Fitness Level"
                />
              )}
            />
            {errors && (
              <Paragraph color={"red"}>
                {errors.fitnessLevel?.message}
              </Paragraph>
            )}
          </YStack>

          <YStack flex={1} style={{ minWidth: 0 }}>
            <Label width={420} htmlFor="workoutFrequency">
              Workout Frequency*
            </Label>
            <Controller
              control={control}
              name="workoutFrequency"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomSelectOpt
                  labelTitle="Workout Frequency"
                  snapPoints={[35]}
                  items={workoutFrequencyOpt}
                  maxWidth={420}
                  value={value}
                  onValueChange={(text) => {
                    onChange(text); // update react-hook-form
                    onValueChangeWorkoutFrequency(text);
                  }}
                  onOpenChange={() => Keyboard.dismiss()}
                  placeholder="Enter your Workout Frequency"
                />
              )}
            />
            {errors && (
              <Paragraph color={"red"}>
                {errors.workoutFrequency?.message}
              </Paragraph>
            )}
          </YStack>
        </YStack>
        <Text>
          fitnessLevel: {watch("fitnessLevel")} | workoutFrequency:
          {watch("workoutFrequency")} | isValid: {isValid ? "✅" : "❌"}
        </Text>
      </YStack>
    </Pressable>
  );
};

export default Step4;
