import React, { useState } from "react";
import { Button, H6, Input, Label, XStack, YStack } from "tamagui";
import { CustomSelectOpt } from "../custom/CustomSelectOpt";

import { Keyboard, Platform, Pressable } from "react-native";

import PopoverCalendarIOS from "../custom/PopoverCalendarIOS";
import PopoverCalendarAndroid from "../custom/PopoverCalendarAndroid";
import { Eye, EyeOff } from "lucide-react-native";

const Step1 = ({ personalInfo, setPersonalInfo }) => {
  const {
    fname,
    lname,
    gender,
    birthday = new Date(),
    email,
    password,
  } = personalInfo;

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

  const onChangePassword = (text: string) =>
    setPersonalInfo((prev) => ({ ...prev, password: text }));

  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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

          <XStack alignItems="center" justifyContent="space-between" gap={10}>
            <YStack flex={1}>
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
            </YStack>
            <YStack flex={1}>
              <Label width={90} htmlFor="dateOfBirth">
                Date of Birth*
              </Label>
              {Platform.OS === "ios" ? (
                <PopoverCalendarIOS
                  setDate={onChangeBirthday}
                  date={birthday}
                  labelTitle={birthday.toLocaleDateString()}
                  onOpenChange={() => Keyboard.dismiss()}
                />
              ) : (
                <PopoverCalendarAndroid
                  date={birthday}
                  show={show}
                  setDate={onChangeBirthday}
                  setShow={setShow}
                />
              )}
            </YStack>
          </XStack>

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

          <Label width={90} htmlFor="email">
            Password*
          </Label>
          <YStack width="100%" position="relative">
            <Input
              id="password"
              value={password}
              onChangeText={onChangePassword}
              placeholder="Enter your Password"
              secureTextEntry={!showPassword}
              width="100%"
            />

            <Button
              unstyled
              onPress={togglePasswordVisibility}
              position="absolute"
              t={0}
              right={10}
              height="100%"
              width={40}
              justifyContent="center"
              alignItems="center">
              {showPassword ? <Eye /> : <EyeOff />}
            </Button>
          </YStack>
        </YStack>
      </YStack>
    </Pressable>
  );
};

export default Step1;
