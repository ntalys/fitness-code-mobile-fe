import { View, Text } from "react-native";
import React from "react";
import { Button, Input, Label, XStack, YStack } from "tamagui";
import { CustomSelectOpt } from "../custom/CustomSelectOpt";

const Step1 = () => {
  const items = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
  ];

  return (
    <YStack>
      <YStack alignItems="start" gap="$1">
        <XStack alignItems="center" justifyContent="space-between" gap={10}>
          <YStack flex={1}>
            <Label width={90} htmlFor="fname">
              First Name*
            </Label>
            <Input id="fname" defaultValue="" placeholder="First name"></Input>
          </YStack>
          <YStack flex={1}>
            <Label width={90} htmlFor="lname">
              Last Name*
            </Label>
            <Input id="lname" defaultValue="" placeholder="Last name" />
          </YStack>
        </XStack>

        <Label width={90} htmlFor="gender">
          Gender*
        </Label>
        <CustomSelectOpt items={items} labelTitle="Genders" />

        <Label width={90} htmlFor="dateOfBirth">
          Date of Birth*
        </Label>
        <Input id="dateOfBirth" defaultValue="" placeholder="dd/mm/yyyy" />

        <Label width={90} htmlFor="email">
          Email*
        </Label>
        <Input id="email" defaultValue="" placeholder="name@example.com" />
      </YStack>
    </YStack>
  );
};

export default Step1;
