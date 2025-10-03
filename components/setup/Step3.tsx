import { Pressable, Keyboard } from "react-native";
import React from "react";
import { H6, Paragraph, Text, XStack, YStack } from "tamagui";
import { CustomCheckbox } from "../custom/CustomCheckbox";
import { Controller } from "react-hook-form";

const Step3 = ({
  fitnessGaol,
  setFitnessGoal,
  control,
  errors,
  onStepValidationChange,
}) => {
  console.log("fitnessGaol: ", fitnessGaol);

  // const onCheckedChange = (
  //   value: string,
  //   gaol: string,
  //   checked: boolean,
  //   onChange: Function
  // ) => {
  //   if (checked) {
  //     onChange([...(value || []), goal]); // add goal
  //   } else {
  //     onChange((value || []).filter((g: string) => g !== goal)); // remove goal
  //   }
  // };
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
            <Controller
              control={control}
              name="fitnessGoal" // must match your schema
              render={({ field: { value, onChange } }) => {
                const handleCheckedChange = (
                  goal: string,
                  checked: boolean
                ) => {
                  if (checked) {
                    onChange([...(value || []), goal]); // add goal
                  } else {
                    onChange((value || []).filter((g: string) => g !== goal)); // remove goal
                  }
                };

                return (
                  <>
                    <CustomCheckbox
                      size="$5"
                      label="Weight Loss"
                      value="Weight Loss"
                      checked={value?.includes("Weight Loss")}
                      onCheckedChange={(checked: boolean) =>
                        handleCheckedChange("Weight Loss", checked)
                      }
                    />
                    <CustomCheckbox
                      size="$5"
                      label="Muscle Gain"
                      value="Muscle Gain"
                      checked={value?.includes("Muscle Gain")}
                      onCheckedChange={(checked: boolean) =>
                        handleCheckedChange("Muscle Gain", checked)
                      }
                    />
                    <CustomCheckbox
                      size="$5"
                      label="Increase Strength"
                      value="Increase Strength"
                      checked={value?.includes("Increase Strength")}
                      onCheckedChange={(checked: boolean) =>
                        handleCheckedChange("Increase Strength", checked)
                      }
                    />
                    <CustomCheckbox
                      size="$5"
                      label="Improve Endurance"
                      value="Improve Endurance"
                      checked={value?.includes("Improve Endurance")}
                      onCheckedChange={(checked: boolean) =>
                        handleCheckedChange("Improve Endurance", checked)
                      }
                    />
                    <CustomCheckbox
                      size="$5"
                      label="Improve Flexibility"
                      value="Improve Flexibility"
                      checked={value?.includes("Improve Flexibility")}
                      onCheckedChange={(checked: boolean) =>
                        handleCheckedChange("Improve Flexibility", checked)
                      }
                    />
                    <CustomCheckbox
                      size="$5"
                      label="General Health"
                      value="General Health"
                      checked={value?.includes("General Health")}
                      onCheckedChange={(checked: boolean) =>
                        handleCheckedChange("General Health", checked)
                      }
                    />
                  </>
                );
              }}
            />

            {errors.fitnessGaol && (
              <Paragraph color={"red"}>{errors.fitnessGaol.message}</Paragraph>
            )}
          </YStack>
        </XStack>
      </YStack>
    </Pressable>
  );
};

export default Step3;
