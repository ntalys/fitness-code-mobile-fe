import React, { useState } from "react";
import { H4, H6, Input, Label, Paragraph, Text, XStack, YStack } from "tamagui";
import CustomSelectOpt from "../custom/CustomSelectOpt";
import { Keyboard, Pressable } from "react-native";
import { Controller } from "react-hook-form";

const Step2 = ({
  physicalMeasurements,
  setPhysicalMeasurements,
  control,
  errors,
  trigger,
  onStepValidationChange,
  currentStepFields,
}) => {
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
            <Controller
              control={control}
              name="height.value"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="height"
                  value={value}
                  onChangeText={(text) => {
                    onChange(text); // update react-hook-form
                    setPhysicalMeasurements((prev) => ({
                      ...prev,
                      height: { value: text, unit: height.unit },
                    })); // sync with your state
                  }}
                  onBlur={onBlur}
                  keyboardAppearance="default"
                  keyboardType="decimal-pad"
                  placeholder="Enter your Height"
                  // ensure input uses available width
                  width="100%"
                />
              )}
            />
            {errors.height?.value && (
              <Paragraph color={"red"}>{errors.height.value.message}</Paragraph>
            )}
          </YStack>

          <YStack width={90}>
            <Label width={90} htmlFor="heightUnit">
              Unit*
            </Label>
            <Controller
              control={control}
              name="height.unit"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomSelectOpt
                  labelTitle="Units"
                  items={unitItems}
                  maxWidth={90}
                  value={value}
                  onValueChange={(text) => {
                    onChange(text); // update react-hook-form
                    setPhysicalMeasurements((prev) => ({
                      ...prev,
                      height: { value: height.value, unit: text },
                    })); // sync with your state
                  }}
                  onOpenChange={() => Keyboard.dismiss()}
                  placeholder=""
                />
              )}
            />
            {errors.height?.unit && (
              <Paragraph color={"red"}>{errors.height.unit.message}</Paragraph>
            )}
          </YStack>
        </XStack>

        {/* Row: Weight + Unit */}
        <XStack width="100%" alignItems="flex-start" gap={12}>
          <YStack flex={1} style={{ minWidth: 0 }}>
            <Label width={90} htmlFor="weight">
              Weight*
            </Label>
            <Controller
              control={control}
              name="weight.value"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="weight"
                  value={value}
                  onChangeText={(text) => {
                    onChange(text); // update react-hook-form
                    setPhysicalMeasurements((prev) => ({
                      ...prev,
                      height: { value: text, unit: weight.unit },
                    })); // sync with your state
                  }}
                  onBlur={onBlur}
                  keyboardAppearance="default"
                  keyboardType="number-pad"
                  placeholder="Enter your Weight"
                  width="100%"
                />
              )}
            />
            {errors.weight?.value && (
              <Paragraph color={"red"}>
                {errors.weight?.value.message}
              </Paragraph>
            )}
          </YStack>

          <YStack width={90}>
            <Label width={90} htmlFor="weightUnit">
              Unit*
            </Label>
            <Controller
              control={control}
              name="weight.unit"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomSelectOpt
                  labelTitle="Units"
                  items={weightItems}
                  maxWidth={90}
                  value={value}
                  onValueChange={(text) => {
                    onChange(text); // update react-hook-form
                    setPhysicalMeasurements((prev) => ({
                      ...prev,
                      height: { value: weight.value, unit: text },
                    })); // sync with your state
                  }}
                  onOpenChange={() => Keyboard.dismiss()}
                  placeholder=""
                />
              )}
            />
            {errors.weight?.unit && (
              <Paragraph color={"red"}>{errors.weight?.unit.message}</Paragraph>
            )}
          </YStack>
        </XStack>
      </YStack>
    </Pressable>
  );
};

export default Step2;
