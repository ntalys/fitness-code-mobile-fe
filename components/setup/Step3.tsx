import { Pressable, Keyboard } from "react-native";
import React from "react";
import { H6, Paragraph, Text, XStack, YStack } from "tamagui";
import { CustomCheckbox } from "../custom/CustomCheckbox";
import { useFormContext, Controller } from "react-hook-form";
import { UserFitnessGoal } from "../../@types/user";

type Step3Props = {
  fitnessGaol: UserFitnessGoal;
  setFitnessGoal: React.Dispatch<React.SetStateAction<UserFitnessGoal>>;
};

const Step3 = ({ fitnessGaol, setFitnessGoal }: Step3Props) => {
  const {
    control,
    formState: { errors, isValid },
    watch,
  } = useFormContext<{ userFitnessGoal: UserFitnessGoal }>();

  const handleCheckboxChange = (
    goal: string,
    checked: boolean,
    formValue: string[],
    onChange: (value: string[]) => void
  ) => {
    let updatedGoals: string[];

    if (checked) {
      // Add if not already present
      updatedGoals = formValue.includes(goal)
        ? formValue
        : [...formValue, goal];
    } else {
      // Remove if unchecked
      updatedGoals = formValue.filter((item) => item !== goal);
    }

    onChange(updatedGoals); // ✅ update RHF
    setFitnessGoal(updatedGoals); // ✅ sync local state
  };

  return (
    <Pressable
      onPress={() => Keyboard.dismiss()}
      style={{ width: "100%" }}
      android_disableSound={false}>
      <YStack width="100%" gap="$4" py="$3">
        <H6 fontWeight={400}>Fitness Goals</H6>

        <Controller
          control={control}
          name="userFitnessGoal"
          render={({ field: { value = [], onChange } }) => (
            <YStack>
              {[
                "Weight Loss",
                "Muscle Gain",
                "Increase Strength",
                "Improve Endurance",
                "Improve Flexibility",
                "General Health",
              ].map((goal) => (
                <CustomCheckbox
                  key={goal}
                  size="$5"
                  label={goal}
                  value={goal}
                  checked={value.includes(goal)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(goal, checked, value, onChange)
                  }
                />
              ))}
            </YStack>
          )}
        />

        {errors?.userFitnessGoal && (
          <Paragraph color={"red"}>
            {errors.userFitnessGoal.message as string}
          </Paragraph>
        )}

        <Text>
          fitnessGoal: {JSON.stringify(watch("userFitnessGoal"))} | isValid:{" "}
          {isValid ? "✅" : "❌"}
        </Text>
      </YStack>
    </Pressable>
  );
};

export default Step3;
