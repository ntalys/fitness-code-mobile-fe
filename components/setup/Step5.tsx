import { format } from "date-fns";
import { useRouter } from "expo-router";
import { Check } from "lucide-react-native";
import React from "react";
import { Checkbox, H6, Label, Text, XStack, YStack } from "tamagui";

const Step5 = ({
  personalInfo,
  physicalMeasurements,
  fitnessGaol,
  fitnessExp,
  acceptConditionsValue,
  setAcceptConditions,
}) => {
  const router = useRouter();
  return (
    <YStack>
      <YStack alignItems="start" gap="$3">
        <YStack>
          <H6 fontWeight={400}>Review Your Information</H6>
        </YStack>

        <YStack
          bg={"$shadow1"}
          borderTopRightRadius={"$4"}
          borderTopLeftRadius={"$4"}
          borderBottomLeftRadius={"$4"}
          borderBottomRightRadius={"$4"}
          p={12}>
          <YStack flex={1} gap={10}>
            <XStack>
              <H6 fontWeight={300}>Personal Information</H6>
            </XStack>
            <XStack flex={1} gap={3}>
              <Text>First Name:</Text>
              <Text color={"$color10"}>{personalInfo.fname}</Text>
            </XStack>
            <XStack flex={1} gap={3}>
              <Text>Last Name:</Text>
              <Text color={"$color10"}>{personalInfo.lname}</Text>
            </XStack>
            <XStack flex={1} gap={3}>
              <Text>Gender:</Text>
              <Text color={"$color10"}>{personalInfo.gender}</Text>
            </XStack>
            <XStack flex={1} gap={3}>
              <Text>Birthday:</Text>
              <Text color={"$color10"}>
                {format(personalInfo.dateOfBirth, "dd MMM, yyyy")}
              </Text>
            </XStack>
            <XStack flex={1} gap={3}>
              <Text>Email:</Text>
              <Text color={"$color10"}>{personalInfo.email}</Text>
            </XStack>
          </YStack>
        </YStack>

        <YStack
          bg={"$shadow1"}
          borderTopRightRadius={"$4"}
          borderTopLeftRadius={"$4"}
          borderBottomLeftRadius={"$4"}
          borderBottomRightRadius={"$4"}
          p={12}>
          <YStack flex={1} gap={10}>
            <XStack>
              <H6 fontWeight={300}>Physical Measurements</H6>
            </XStack>
            <XStack flex={1}>
              <XStack gap={3}>
                <Text>Height:</Text>
                <Text color={"$color10"}>
                  {physicalMeasurements.height.value}
                </Text>
                <Text color={"$color10"}>
                  {physicalMeasurements.height.unit}
                </Text>
              </XStack>
            </XStack>
            <XStack flex={1}>
              <XStack gap={3}>
                <Text>Weight:</Text>
                <Text color={"$color10"}>
                  {physicalMeasurements.weight.value}
                </Text>
                <Text color={"$color10"}>
                  {physicalMeasurements.weight.unit}
                </Text>
              </XStack>
            </XStack>
          </YStack>
        </YStack>

        <YStack
          bg={"$shadow1"}
          borderTopRightRadius={"$4"}
          borderTopLeftRadius={"$4"}
          borderBottomLeftRadius={"$4"}
          borderBottomRightRadius={"$4"}
          p={12}>
          <YStack flex={1} gap={10}>
            <XStack>
              <H6 fontWeight={300}>Fitness Goals</H6>
            </XStack>
            <XStack flex={1}>
              <XStack gap={3} flexWrap="wrap" alignItems="center">
                <Text>Fitness Goals:</Text>
                {fitnessGaol.map((goal, idx) => (
                  <XStack
                    key={idx}
                    borderTopRightRadius={"$4"}
                    borderTopLeftRadius={"$4"}
                    borderBottomLeftRadius={"$4"}
                    borderBottomRightRadius={"$4"}
                    bg="$color10"
                    px={10}
                    py={5}
                    alignItems="center"
                    justifyContent="center">
                    <Text color="$color1">{goal}</Text>
                  </XStack>
                ))}
              </XStack>
            </XStack>
          </YStack>
        </YStack>

        <YStack
          bg={"$shadow1"}
          borderTopRightRadius={"$4"}
          borderTopLeftRadius={"$4"}
          borderBottomLeftRadius={"$4"}
          borderBottomRightRadius={"$4"}
          p={12}>
          <YStack flex={1} gap={10}>
            <XStack>
              <H6 fontWeight={300}>Physical Measurements</H6>
            </XStack>
            <XStack flex={1}>
              <XStack gap={3}>
                <Text>Fitness Level:</Text>
                <Text color={"$color10"}>{fitnessExp.fitnessLevel}</Text>
              </XStack>
            </XStack>
            <XStack flex={1}>
              <XStack gap={3}>
                <Text>Workout Frequency:</Text>
                <Text color={"$color10"}>{fitnessExp.workoutFrequency}</Text>
              </XStack>
            </XStack>
          </YStack>
        </YStack>

        <YStack py={12}>
          <XStack px={6} alignItems="center" gap="$2">
            <Checkbox
              size={"$4"}
              value={acceptConditionsValue}
              onCheckedChange={setAcceptConditions}>
              <Checkbox.Indicator>
                <Check />
              </Checkbox.Indicator>
            </Checkbox>

            <Text px={12}>
              I accept and agree to comply with{" "}
              <Text
                textDecorationLine="underline"
                onPress={() => router.push("/policies")}
                color={"$color10"}>
                Fitness Code's Term and Conditions
              </Text>
            </Text>
          </XStack>
        </YStack>
      </YStack>
    </YStack>
  );
};

export default Step5;
