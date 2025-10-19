import { Pressable, Keyboard } from "react-native";
import React, { useEffect } from "react";
import { H6, Paragraph, Text, YStack } from "tamagui";
import { CustomCheckbox } from "../custom/CustomCheckbox";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFitnessGoal, UserFitnessGoal } from "../../@types/user";

type Step3Props = {
  fitnessGaol: string[];
  setFitnessGoal: React.Dispatch<React.SetStateAction<string[]>>;
  isStep3Valid: React.Dispatch<React.SetStateAction<boolean>>;
};

const Step3 = ({ fitnessGaol, setFitnessGoal, isStep3Valid }: Step3Props) => {
  const {
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<UserFitnessGoal>({
    resolver: zodResolver(userFitnessGoal),
    mode: "onChange",
    defaultValues: {
      userFitnessGoal: fitnessGaol || [],
    },
  });

  useEffect(() => {
    isStep3Valid(isValid);
  }, [isValid]);

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={{ width: "100%" }}>
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
                  onCheckedChange={(checked) => {
                    let updatedGoals: string[];
                    if (checked) {
                      updatedGoals = [...value, goal];
                    } else {
                      updatedGoals = value.filter((g) => g !== goal);
                    }
                    onChange(updatedGoals);
                    setFitnessGoal(updatedGoals);
                  }}
                />
              ))}
            </YStack>
          )}
        />

        {errors.userFitnessGoal && (
          <Paragraph color="red">
            {(errors.userFitnessGoal as any).message}
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
