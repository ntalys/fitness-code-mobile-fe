import React, { useState } from "react";
import {
  Button,
  H6,
  Input,
  Label,
  Paragraph,
  Text,
  XStack,
  YStack,
} from "tamagui";
import { CustomSelectOpt } from "../custom/CustomSelectOpt";

import { Keyboard, Platform, Pressable } from "react-native";

import PopoverCalendarIOS from "../custom/PopoverCalendarIOS";
import PopoverCalendarAndroid from "../custom/PopoverCalendarAndroid";
import { Eye, EyeOff } from "lucide-react-native";
import { Controller } from "react-hook-form";

const Step1 = ({
  personalInfo,
  setPersonalInfo,
  control,
  errors,
  trigger,
  register,
  onStepValidationChange,
  currentStepFields,
}) => {
  const {
    fname,
    lname,
    gender,
    birthday = new Date(),
    email,
    password,
  } = personalInfo;

  console.log("personalInfo: ", personalInfo);

  // console.log("control: ", JSON.stringify(control, null, 2));

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
              <Controller
                control={control}
                name="fname"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    id="fname"
                    value={value}
                    onChangeText={(text) => {
                      onChange(text); // update react-hook-form
                      setPersonalInfo((prev) => ({ ...prev, fname: text })); // sync with your state
                    }}
                    onBlur={onBlur}
                    defaultValue=""
                    keyboardAppearance="default"
                    keyboardType="default"
                    placeholder="First name"></Input>
                )}
              />
              {errors.fname && (
                <Paragraph color={"red"}>{errors.fname.message}</Paragraph>
              )}
            </YStack>
            <YStack flex={1}>
              <Label width={90} htmlFor="lname">
                Last Name*
              </Label>
              <Controller
                control={control}
                name="lname"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    id="lname"
                    value={value}
                    onChangeText={(text) => {
                      onChange(text); // update react-hook-form
                      setPersonalInfo((prev) => ({ ...prev, lname: text })); // sync with your state
                    }}
                    onBlur={onBlur}
                    defaultValue=""
                    keyboardAppearance="default"
                    keyboardType="default"
                    placeholder="Last name"
                  />
                )}
              />
              {errors.lname && (
                <Paragraph color={"red"}>{errors.lname.message}</Paragraph>
              )}
            </YStack>
          </XStack>

          <XStack alignItems="center" justifyContent="space-between" gap={10}>
            <YStack flex={1}>
              <Label width={90} htmlFor="gender">
                Gender*
              </Label>
              <Controller
                control={control}
                name="gender"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomSelectOpt
                    value={value}
                    onValueChange={(text) => {
                      onChange(text); // update react-hook-form
                      setPersonalInfo((prev) => ({ ...prev, gender: text })); // sync with your state
                    }}
                    items={items}
                    labelTitle="Genders"
                    maxWidth={420}
                    snapPoints={[25]}
                    placeholder="Select Gender"
                    onOpenChange={() => Keyboard.dismiss()}
                  />
                )}
              />
              {errors.gender && (
                <Paragraph color={"red"}>{errors.gender.message}</Paragraph>
              )}
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
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                id="email"
                value={value}
                onChangeText={(text) => {
                  onChange(text); // update react-hook-form
                  setPersonalInfo((prev) => ({ ...prev, email: text })); // sync with your state
                }}
                onBlur={onBlur}
                defaultValue=""
                keyboardAppearance="default"
                keyboardType="email-address"
                placeholder="name@example.com"
              />
            )}
          />
          {errors.email && (
            <Paragraph color={"red"}>{errors.email.message}</Paragraph>
          )}

          <Label width={90} htmlFor="email">
            Password*
          </Label>
          <YStack width="100%" position="relative">
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="password"
                  value={value}
                  onChangeText={(text) => {
                    onChange(text); // update react-hook-form
                    setPersonalInfo((prev) => ({ ...prev, password: text })); // sync with your state
                  }}
                  onBlur={onBlur}
                  placeholder="Enter your Password"
                  secureTextEntry={!showPassword}
                  width="100%"
                />
              )}
            />
            {errors.password && (
              <Paragraph color={"red"}>{errors.password.message}</Paragraph>
            )}
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
