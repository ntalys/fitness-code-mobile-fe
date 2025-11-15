import React, { useEffect, useMemo, useState } from "react";
import { Button, H6, Input, Label, Paragraph, XStack, YStack } from "tamagui";
import { CustomSelectOpt } from "../custom/CustomSelectOpt";

import { Keyboard, Platform, Pressable, useColorScheme } from "react-native";

import PopoverCalendarIOS from "../custom/PopoverCalendarIOS";
import PopoverCalendarAndroid from "../custom/PopoverCalendarAndroid";
import { Eye, EyeOff } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import {
  userPersonalInformation,
  UserPersonalInformation,
} from "../../@types/user";
import { zodResolver } from "@hookform/resolvers/zod";

type Step1Props = {
  personalInfo: UserPersonalInformation;
  setPersonalInfo: React.Dispatch<
    React.SetStateAction<UserPersonalInformation>
  >;
  isStep1Valid: React.Dispatch<React.SetStateAction<boolean>>;
};

const Step1 = ({ personalInfo, setPersonalInfo, isStep1Valid }: Step1Props) => {
  const colorScheme = useColorScheme();
  const { fname, lname, gender, dateOfBirth, email, password } = personalInfo;

  const {
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(userPersonalInformation),
    mode: "onChange",
    defaultValues: {
      fname,
      lname,
      gender,
      dateOfBirth,
      email,
      password,
    },
  });

  useEffect(() => {
    isStep1Valid(isValid);
  }, [isValid]);

  const items = useMemo(
    () => [
      { name: "Male", value: "male" },
      { name: "Female", value: "female" },
    ],
    []
  );

  const onChangeFName = (text: string) =>
    setPersonalInfo((prev) => ({ ...prev, fname: text }));

  const onChangeLName = (text: string) =>
    setPersonalInfo((prev) => ({ ...prev, lname: text }));

  const onChangeGender = (text: "male" | "female") =>
    setPersonalInfo((prev) => ({ ...prev, gender: text }));

  const onChangeBirthday = (text: Date) =>
    setPersonalInfo((prev) => ({ ...prev, dateOfBirth: text }));

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
        <YStack justify="flex-start" gap="$3.5">
          <YStack mb={15}>
            <H6 fontWeight={400}>Personal Information</H6>
          </YStack>
          <XStack justify="space-between" gap={10} mb={20}>
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
                      onChangeFName(text); // sync with your state
                    }}
                    onBlur={onBlur}
                    defaultValue=""
                    keyboardAppearance="default"
                    keyboardType="default"
                    placeholder="First name"></Input>
                )}
              />
              {errors && (
                <Paragraph position="absolute" t={"$12"} color={"red"}>
                  {errors.fname?.message}
                </Paragraph>
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
                      onChangeLName(text); // sync with your state
                    }}
                    onBlur={onBlur}
                    defaultValue=""
                    keyboardAppearance="default"
                    keyboardType="default"
                    placeholder="Last name"
                  />
                )}
              />
              {errors && (
                <Paragraph position="absolute" t={"$12"} color={"red"}>
                  {errors.lname?.message}
                </Paragraph>
              )}
            </YStack>
          </XStack>

          <XStack justify="space-between" gap={10}>
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
                    onValueChange={(text: "male" | "female") => {
                      onChange(text); // update react-hook-form
                      onChangeGender(text); // sync with your state
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
              {errors && (
                <Paragraph color={"red"}>{errors.gender?.message}</Paragraph>
              )}
            </YStack>
            <YStack flex={1}>
              <Label width={90} htmlFor="dateOfBirth">
                Date of Birth*
              </Label>
              {Platform.OS === "ios" ? (
                <Controller
                  control={control}
                  name="dateOfBirth"
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <PopoverCalendarIOS
                        setDate={(text: Date) => {
                          onChange(text); // update react-hook-form
                          onChangeBirthday(text); // sync with your state
                        }}
                        date={value}
                        onOpenChange={() => Keyboard.dismiss()}
                      />
                    );
                  }}
                />
              ) : (
                <Controller
                  control={control}
                  name="dateOfBirth"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <PopoverCalendarAndroid
                      date={value}
                      show={show}
                      setDate={(text: Date) => {
                        onChange(text); // update react-hook-form
                        onChangeBirthday(text); // sync with your state
                      }}
                      setShow={setShow}
                    />
                  )}
                />
              )}
            </YStack>
          </XStack>

          <YStack flex={1} mt={-20}>
            <Label width={90} htmlFor="email">
              Email*
            </Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value}
                  onChangeText={(text) => {
                    onChange(text); // update react-hook-form
                    onChangeEmail(text); // sync with your state
                  }}
                  onBlur={onBlur}
                  defaultValue=""
                  keyboardAppearance="default"
                  keyboardType="email-address"
                  placeholder="name@example.com"
                />
              )}
            />
            {errors && (
              <Paragraph position="absolute" t={"$12"} color={"red"}>
                {errors.email?.message}
              </Paragraph>
            )}
          </YStack>

          <YStack flex={1}>
            <Label width={90} htmlFor="password">
              Password*
            </Label>
            <YStack width="100%" position="relative" mb={30}>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    onChangeText={(text) => {
                      onChange(text); // update react-hook-form
                      onChangePassword(text); // sync with your state
                    }}
                    onBlur={onBlur}
                    placeholder="Enter your Password"
                    secureTextEntry={!showPassword}
                    width="100%"
                  />
                )}
              />

              <Button
                unstyled
                onPress={togglePasswordVisibility}
                position="absolute"
                t={0}
                r={10}
                height="100%"
                width={40}
                justify="center">
                {showPassword ? (
                  <Eye color={colorScheme === "dark" ? "white" : "black"} />
                ) : (
                  <EyeOff color={colorScheme === "dark" ? "white" : "black"} />
                )}
              </Button>
            </YStack>
            {errors && (
              <Paragraph position="absolute" t={"$12"} color={"red"}>
                {errors.password?.message}
              </Paragraph>
            )}
          </YStack>
        </YStack>
      </YStack>
    </Pressable>
  );
};

export default Step1;
