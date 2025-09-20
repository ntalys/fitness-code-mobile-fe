import React, { useState } from "react";
import { H4, Input, Label, XStack, YStack } from "tamagui";
import CustomSelectOpt from "../custom/CustomSelectOpt";
import { Keyboard, Pressable, Switch } from "react-native";

const Step2 = () => {
  // controlled state
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [heightUnit, setHeightUnit] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<string>("");

  const unitItems = [
    { name: "CM", value: "cm" },
    { name: "FT", value: "ft" },
  ];

  const weightItems = [
    { name: "KG", value: "kg" },
    { name: "LBS", value: "lbs" },
  ];

  return (
    // Wrap everything inside a Pressable to detect touches
    <Pressable
      onPress={() => Keyboard.dismiss()}
      style={{ width: "100%" }}
      android_disableSound={false} // optional for Android
    >
      <YStack width="100%" gap="$4" py="$3">
        <H4 fontWeight={600}>Physical Measurements</H4>

        <XStack width="100%" alignItems="flex-start" gap={12}>
          <YStack flex={1} style={{ minWidth: 0 }}>
            <Label width={90} htmlFor="height">
              Height*
            </Label>
            <Input
              id="height"
              value={height}
              onChangeText={setHeight}
              keyboardAppearance="default"
              keyboardType="phone-pad"
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
              value={heightUnit}
              onValueChange={setHeightUnit}
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
              value={weight}
              onChangeText={setWeight}
              keyboardAppearance="default"
              keyboardType="decimal-pad"
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
              value={weightUnit}
              onValueChange={setWeightUnit}
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
