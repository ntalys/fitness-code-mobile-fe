import { Pressable, Keyboard } from "react-native";
import React from "react";
import { H6, XStack, YStack } from "tamagui";
import { CustomCheckbox } from "../custom/CustomCheckbox";

const Step3 = ({ fitnessGaol, setFitnessGoal }) => {
  console.log("fitnessGaol: ", fitnessGaol);

  const onCheckedChange = (val: string, checked: boolean) => {
    setFitnessGoal((prev) => {
      if (checked) {
        // add only if not already there
        return prev.includes(val) ? prev : [...prev, val];
      } else {
        // remove if unchecked
        return prev.filter((item) => item !== val);
      }
    });
  };
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
            <CustomCheckbox
              size="$5"
              label="Weight Loss"
              value="Weight Loss"
              checked={fitnessGaol.includes("Weight Loss")}
              onCheckedChange={(checked: boolean) =>
                onCheckedChange("Weight Loss", checked)
              }
            />
            <CustomCheckbox
              size="$5"
              label="Muscle Gain"
              value="Muscle Gain"
              checked={fitnessGaol.includes("Muscle Gain")}
              onCheckedChange={(checked: boolean) =>
                onCheckedChange("Muscle Gain", checked)
              }
            />
            <CustomCheckbox
              size="$5"
              label="Increase Strength"
              value="Increase Strength"
              checked={fitnessGaol.includes("Increase Strength")}
              onCheckedChange={(checked: boolean) =>
                onCheckedChange("Increase Strength", checked)
              }
            />
            <CustomCheckbox
              size="$5"
              label="Improve Endurance"
              value="Improve Endurance"
              checked={fitnessGaol.includes("Improve Endurance")}
              onCheckedChange={(checked: boolean) =>
                onCheckedChange("Improve Endurance", checked)
              }
            />
            <CustomCheckbox
              size="$5"
              label="Improve Flexibility"
              value="Improve Flexibility"
              checked={fitnessGaol.includes("Improve Flexibility")}
              onCheckedChange={(checked: boolean) =>
                onCheckedChange("Improve Flexibility", checked)
              }
            />
            <CustomCheckbox
              size="$5"
              label="General Health"
              value="General Health"
              checked={fitnessGaol.includes("General Health")}
              onCheckedChange={(checked: boolean) =>
                onCheckedChange("General Health", checked)
              }
            />
          </YStack>
        </XStack>
      </YStack>
    </Pressable>
  );
};

export default Step3;
