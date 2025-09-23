import React, { useState } from "react";
import { H4, H6, Input, Label, XStack, YStack } from "tamagui";
import CustomSelectOpt from "../custom/CustomSelectOpt";
import { Keyboard, Pressable } from "react-native";

const Step2 = ({ physicalMeasurements, setPhysicalMeasurements }) => {
  const { weight, height } = physicalMeasurements;

  console.log("physicalMeasurements: ", physicalMeasurements);

  const onChangeHeightValue = (val: string) =>
    setPhysicalMeasurements((prev) => ({
      ...prev,
      height: { value: val, unit: height.unit },
    }));

  const onChangeHeightUnit = (val: string) =>
    setPhysicalMeasurements((prev) => ({
      ...prev,
      height: { value: height.value, unit: val },
    }));

  const onChangeWeightValue = (val: string) =>
    setPhysicalMeasurements((prev) => ({
      ...prev,
      weight: { value: val, unit: weight.unit },
    }));

  const onChangeWeightUnit = (val: string) =>
    setPhysicalMeasurements((prev) => ({
      ...prev,
      weight: { value: weight.value, unit: val },
    }));

  const unitItems = [
    { name: "CM", value: "cm", disabled: false },
    { name: "FT", value: "ft", disabled: true, msg: "Not Available" },
  ];

  const weightItems = [
    { name: "KG", value: "kg", disabled: false },
    { name: "LBS", value: "lbs", disabled: true, msg: "Not Available" },
  ];

  return (
    <Pressable
      onPress={() => Keyboard.dismiss()}
      style={{ width: "100%" }}
      android_disableSound={false} // optional for Android
    >
      <YStack width="100%" gap="$4" py="$3">
        <H6 fontWeight={400}>Physical Measurements</H6>

        <XStack width="100%" alignItems="flex-start" gap={12}>
          <YStack flex={1} style={{ minWidth: 0 }}>
            <Label width={90} htmlFor="height">
              Height*
            </Label>
            <Input
              id="height"
              value={height.value}
              onChangeText={onChangeHeightValue}
              keyboardAppearance="default"
              keyboardType="decimal-pad"
              placeholder="Enter your Height"
              // ensure input uses available width
              width="100%"
            />
          </YStack>

          <YStack width={90}>
            <Label width={90} htmlFor="heightUnit">
              Unit*
            </Label>
            <CustomSelectOpt
              labelTitle="Units"
              items={unitItems}
              maxWidth={90}
              value={height.unit}
              onValueChange={onChangeHeightUnit}
              onOpenChange={() => Keyboard.dismiss()}
              placeholder=""
            />
          </YStack>
        </XStack>

        {/* Row: Weight + Unit */}
        <XStack width="100%" alignItems="flex-start" gap={12}>
          <YStack flex={1} style={{ minWidth: 0 }}>
            <Label width={90} htmlFor="weight">
              Weight*
            </Label>
            <Input
              id="weight"
              value={weight.value}
              onChangeText={onChangeWeightValue}
              keyboardAppearance="default"
              keyboardType="number-pad"
              placeholder="Enter your Weight"
              width="100%"
            />
          </YStack>

          <YStack width={90}>
            <Label width={90} htmlFor="weightUnit">
              Unit*
            </Label>
            <CustomSelectOpt
              labelTitle="Units"
              items={weightItems}
              maxWidth={90}
              value={weight.unit}
              onValueChange={onChangeWeightUnit}
              onOpenChange={() => Keyboard.dismiss()}
              placeholder=""
            />
          </YStack>
        </XStack>
      </YStack>
    </Pressable>
  );
};

export default Step2;
