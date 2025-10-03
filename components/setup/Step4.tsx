import { Pressable, Keyboard } from "react-native";
import React, { useState } from "react";
import { H6, Label, Paragraph, Text, YStack } from "tamagui";
import CustomSelectOpt from "../custom/CustomSelectOpt";
import { Controller } from "react-hook-form";

const Step4 = ({
  fitnessExp,
  setFitnessExp,
  control,
  errors,
  onStepValidationChange,
}) => {
  const { fitnessLevel, workoutFrequency } = fitnessExp;

  console.log("fitnessExp: ", fitnessExp);

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
                    setFitnessExp((prev) => ({ ...prev, fitnessLevel: text }));
                  }}
                  onOpenChange={() => Keyboard.dismiss()}
                  placeholder="Enter your Fitness Level"
                />
              )}
            />
            {errors.fitnessLevel && (
              <Paragraph color={"red"}>{errors.fitnessLevel.message}</Paragraph>
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
                    setFitnessExp((prev) => ({
                      ...prev,
                      workoutFrequency: text,
                    }));
                  }}
                  onOpenChange={() => Keyboard.dismiss()}
                  placeholder="Enter your Workout Frequency"
                />
              )}
            />
            {errors.workoutFrequency && (
              <Paragraph color={"red"}>
                {errors.workoutFrequency.message}
              </Paragraph>
            )}
          </YStack>
        </YStack>
      </YStack>
    </Pressable>
  );
};

export default Step4;
