import { Pressable, Keyboard } from "react-native";
import React from "react";
import { H6, XStack, YStack } from "tamagui";
import { CustomCheckbox } from "../custom/CustomCheckbox";

const Step3 = () => {
  return (
    <Pressable
      onPress={() => Keyboard.dismiss()}
      style={{ width: "100%" }}
      android_disableSound={false} // optional for Android
    >
      <YStack width="100%" gap="$4" py="$3">
        <H6 fontWeight={400}>Fitness Goals</H6>

        <XStack width="100%" alignItems="flex-start" gap={12}>
          <YStack flex={1} style={{ minWidth: 0 }}>
            <CustomCheckbox size="$5" label="Weight Loss" />
            <CustomCheckbox size="$5" label="Muscle Gain" />
            <CustomCheckbox size="$5" label="Increase Strength" />
            <CustomCheckbox size="$5" label="Improve Endurance" />
            <CustomCheckbox size="$5" label="Improve Flexibility" />
            <CustomCheckbox size="$5" label="General Health" />
          </YStack>
        </XStack>
      </YStack>
    </Pressable>
  );
};

export default Step3;
