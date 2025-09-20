import React, { useState } from "react";
import { H4, Input, Label, Text, XStack, YStack } from "tamagui";
import { CustomSelectOpt } from "../custom/CustomSelectOpt";

import { Platform } from "react-native";

import PopoverCalendarIOS from "../custom/PopoverCalendarIOS";
import PopoverCalendarAndroid from "../custom/PopoverCalendarAndroid";

const Step1 = () => {
  const items = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
  ];

  const [show, setShow] = useState(false);
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <YStack>
      <YStack alignItems="start" gap="$1">
        <YStack mb={15}>
          <H4 fontWeight={600}>Personal Information</H4>
        </YStack>
        <XStack alignItems="center" justifyContent="space-between" gap={10}>
          <YStack flex={1}>
            <Label width={90} htmlFor="fname">
              First Name*
            </Label>
            <Input
              id="fname"
              defaultValue=""
              keyboardAppearance="default"
              keyboardType="default"
              placeholder="First name"></Input>
          </YStack>
          <YStack flex={1}>
            <Label width={90} htmlFor="lname">
              Last Name*
            </Label>
            <Input
              id="lname"
              defaultValue=""
              keyboardAppearance="default"
              keyboardType="default"
              placeholder="Last name"
            />
          </YStack>
        </XStack>

        <Label width={90} htmlFor="gender">
          Gender*
        </Label>
        <CustomSelectOpt items={items} labelTitle="Genders" />

        <Label width={90} htmlFor="dateOfBirth">
          Date of Birth*
        </Label>
        {Platform.OS === "ios" ? (
          <PopoverCalendarIOS
            setDate={setDate}
            date={date}
            labelTitle={date.toLocaleDateString()}
          />
        ) : (
          <PopoverCalendarAndroid
            date={date}
            show={show}
            setDate={setDate}
            setShow={setShow}
          />
        )}

        <Label width={90} htmlFor="email">
          Email*
        </Label>
        <Input
          id="email"
          defaultValue=""
          keyboardAppearance="default"
          keyboardType="email-address"
          placeholder="name@example.com"
        />
      </YStack>
    </YStack>
  );
};

export default Step1;
