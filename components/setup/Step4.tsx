import { Pressable, Keyboard } from "react-native";
import React, { useState } from "react";
import { H6, Label, YStack } from "tamagui";
import CustomSelectOpt from "../custom/CustomSelectOpt";

const Step4 = ({ fitnessExp, setFitnessExp }) => {
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
    { name: "1-2 time per week", value: "upTo2" },
    { name: "3-4 time per week", value: "upTo4" },
    { name: "5+ time per week", value: "upToWeek" },
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
            <CustomSelectOpt
              labelTitle="Fitness Level"
              snapPoints={[35]}
              items={fitnessLevelOpt}
              maxWidth={420}
              value={fitnessLevel}
              onValueChange={onValueChangeFitnessLevel}
              onOpenChange={() => Keyboard.dismiss()}
              placeholder="Enter your Fitness Level"
            />
          </YStack>

          <YStack flex={1} style={{ minWidth: 0 }}>
            <Label width={420} htmlFor="workoutFrequency">
              Workout Frequency*
            </Label>
            <CustomSelectOpt
              labelTitle="Workout Frequency"
              snapPoints={[35]}
              items={workoutFrequencyOpt}
              maxWidth={420}
              value={workoutFrequency}
              onValueChange={onValueChangeWorkoutFrequency}
              onOpenChange={() => Keyboard.dismiss()}
              placeholder="Enter your Workout Frequency"
            />
          </YStack>
        </YStack>
      </YStack>
    </Pressable>
  );
};

export default Step4;
