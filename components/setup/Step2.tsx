import React, { useEffect, useState } from "react";
import { H4, H6, Input, Label, Paragraph, Text, XStack, YStack } from "tamagui";
import CustomSelectOpt from "../custom/CustomSelectOpt";
import { Keyboard, Pressable } from "react-native";
import {
  Control,
  Controller,
  FieldErrorsImpl,
  useFormContext,
  UseFormWatch,
} from "react-hook-form";
import { UserPhysicalMeasurements } from "../../@types/user";

type Step2Props = {
  physicalMeasurements: UserPhysicalMeasurements;
  setPhysicalMeasurements: React.Dispatch<
    React.SetStateAction<UserPhysicalMeasurements>
  >;
};

const Step2 = ({
  physicalMeasurements,
  setPhysicalMeasurements,
}: Step2Props) => {
  const { weight, height } = physicalMeasurements;

  const {
    control,
    formState: { errors, isValid },
    watch,
  }: {
    control: Control<{ userPhysicalMeasurements: UserPhysicalMeasurements }>;
    formState: {
      errors: FieldErrorsImpl<{
        userPhysicalMeasurements: UserPhysicalMeasurements;
      }>;
      isValid: boolean;
    };
    watch: UseFormWatch<{ userPhysicalMeasurements: UserPhysicalMeasurements }>;
  } = useFormContext<{ userPhysicalMeasurements: UserPhysicalMeasurements }>();

  const onChangeHeightValue = (val: string) =>
    setPhysicalMeasurements((prev) => ({
      ...prev,
      height: { value: Number(val), unit: height.unit },
    }));

  const onChangeHeightUnit = (val: string) =>
    setPhysicalMeasurements((prev) => ({
      ...prev,
      height: { value: height.value, unit: val as "cm" | "ft" },
    }));

  const onChangeWeightValue = (val: string) =>
    setPhysicalMeasurements((prev) => ({
      ...prev,
      weight: { value: Number(val), unit: weight.unit },
    }));

  const onChangeWeightUnit = (val: string) =>
    setPhysicalMeasurements((prev) => ({
      ...prev,
      weight: { value: weight.value, unit: val as "kg" | "lbs" },
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

        <XStack width="100%" justify="flex-start" gap={12}>
          <YStack flex={1} style={{ minWidth: 0 }}>
            <Label width={90} htmlFor="height">
              Height*
            </Label>
            <Controller
              control={control}
              name="userPhysicalMeasurements.height.value"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="height"
                  value={value}
                  onChangeText={(text) => {
                    onChange(text); // update react-hook-form
                    onChangeHeightValue(text);
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
            {errors.userPhysicalMeasurements && (
              <Paragraph color={"red"}>
                {errors.userPhysicalMeasurements.height?.value?.message}
              </Paragraph>
            )}
          </YStack>

          <YStack width={90}>
            <Label width={90} htmlFor="heightUnit">
              Unit*
            </Label>
            <Controller
              control={control}
              name="userPhysicalMeasurements.height.unit"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomSelectOpt
                  labelTitle="Units"
                  items={unitItems}
                  maxWidth={90}
                  value={value}
                  onValueChange={(text) => {
                    onChange(text); // update react-hook-form
                    onChangeHeightUnit(text);
                  }}
                  onOpenChange={() => Keyboard.dismiss()}
                  placeholder=""
                />
              )}
            />
            {errors.userPhysicalMeasurements && (
              <Paragraph color={"red"}>
                {errors.userPhysicalMeasurements.height?.unit?.message}
              </Paragraph>
            )}
          </YStack>
        </XStack>

        {/* Row: Weight + Unit */}
        <XStack width="100%" justify="flex-start" gap={12}>
          <YStack flex={1} style={{ minWidth: 0 }}>
            <Label width={90} htmlFor="weight">
              Weight*
            </Label>
            <Controller
              control={control}
              name="userPhysicalMeasurements.weight.value"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="weight"
                  value={value}
                  onChangeText={(text) => {
                    onChange(text); // update react-hook-form
                    onChangeWeightValue(text);
                  }}
                  onBlur={onBlur}
                  keyboardAppearance="default"
                  keyboardType="number-pad"
                  placeholder="Enter your Weight"
                  width="100%"
                />
              )}
            />
            {errors.userPhysicalMeasurements && (
              <Paragraph color={"red"}>
                {errors.userPhysicalMeasurements.weight?.value?.message}
              </Paragraph>
            )}
          </YStack>

          <YStack width={90}>
            <Label width={90} htmlFor="weightUnit">
              Unit*
            </Label>
            <Controller
              control={control}
              name="userPhysicalMeasurements.weight.unit"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomSelectOpt
                  labelTitle="Units"
                  items={weightItems}
                  maxWidth={90}
                  value={value}
                  onValueChange={(text) => {
                    onChange(text); // update react-hook-form
                    onChangeWeightUnit(text);
                  }}
                  onOpenChange={() => Keyboard.dismiss()}
                  placeholder=""
                />
              )}
            />
            {errors.userPhysicalMeasurements && (
              <Paragraph color={"red"}>
                {errors.userPhysicalMeasurements.weight?.unit?.message}
              </Paragraph>
            )}
          </YStack>
        </XStack>
        <Text>
          height.value: {watch("userPhysicalMeasurements.height.value")} |
          height.unit: {watch("userPhysicalMeasurements.height.unit")} |
          weight.value: {watch("userPhysicalMeasurements.weight.value")} |
          weight.unit: {watch("userPhysicalMeasurements.weight.unit")} |
          isValid: {isValid ? "✅" : "❌"}
        </Text>
      </YStack>
    </Pressable>
  );
};

export default Step2;
