import React, { useState } from "react";
import { H4, H6, Input, Label, Text, XStack, YStack } from "tamagui";
import { CustomSelectOpt } from "../custom/CustomSelectOpt";

import { Keyboard, Platform, Pressable } from "react-native";

import PopoverCalendarIOS from "../custom/PopoverCalendarIOS";
import PopoverCalendarAndroid from "../custom/PopoverCalendarAndroid";

const Step1 = ({ personalInfo, setPersonalInfo }) => {
  const { fname, lname, gender, birthday = new Date(), email } = personalInfo;

  console.log("personalInfo: ", personalInfo);

  const items = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
  ];

  const onChangeFName = (text: string) =>
    setPersonalInfo((prev) => ({ ...prev, fname: text }));

  const onChangeLName = (text: string) =>
    setPersonalInfo((prev) => ({ ...prev, lname: text }));

  const onChangeGender = (text: string) =>
    setPersonalInfo((prev) => ({ ...prev, gender: text }));

  const onChangeBirthday = (text: Date) =>
    setPersonalInfo((prev) => ({ ...prev, birthday: text }));

  const onChangeEmail = (text: string) =>
    setPersonalInfo((prev) => ({ ...prev, email: text }));

  const [show, setShow] = useState(false);

  return (
    <Pressable
      onPress={() => Keyboard.dismiss()}
      style={{ width: "100%" }}
      android_disableSound={false} // optional for Android
    >
      <YStack>
        <YStack alignItems="start" gap="$1">
          <YStack mb={15}>
            <H6 fontWeight={400}>Personal Information</H6>
          </YStack>
          <XStack alignItems="center" justifyContent="space-between" gap={10}>
            <YStack flex={1}>
              <Label width={90} htmlFor="fname">
                First Name*
              </Label>
              <Input
                id="fname"
                value={fname}
                onChangeText={onChangeFName}
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
                value={lname}
                onChangeText={onChangeLName}
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
          <CustomSelectOpt
            value={gender}
            onValueChange={onChangeGender}
            items={items}
            labelTitle="Genders"
            maxWidth={420}
            snapPoints={[25]}
            placeholder="Select Gender"
            onOpenChange={() => Keyboard.dismiss()}
          />

          <Label width={90} htmlFor="dateOfBirth">
            Date of Birth*
          </Label>
          {Platform.OS === "ios" ? (
            <PopoverCalendarIOS
              setDate={onChangeBirthday}
              date={birthday}
              labelTitle={birthday.toLocaleDateString()}
            />
          ) : (
            <PopoverCalendarAndroid
              date={birthday}
              show={show}
              setDate={onChangeBirthday}
              setShow={setShow}
            />
          )}

          <Label width={90} htmlFor="email">
            Email*
          </Label>
          <Input
            id="email"
            value={email}
            onChangeText={onChangeEmail}
            defaultValue=""
            keyboardAppearance="default"
            keyboardType="email-address"
            placeholder="name@example.com"
          />
        </YStack>
      </YStack>
    </Pressable>
  );
};

export default Step1;
