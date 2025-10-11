import React, { useEffect, useMemo, useState } from "react";
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
import {
  Control,
  Controller,
  FieldErrorsImpl,
  useFormContext,
  UseFormWatch,
} from "react-hook-form";
import { UserPersonalInformation } from "../../@types/user";

type Step1Props = {
  personalInfo: UserPersonalInformation;
  setPersonalInfo: React.Dispatch<
    React.SetStateAction<UserPersonalInformation>
  >;
};

const Step1 = ({ personalInfo, setPersonalInfo }: Step1Props) => {
  const {
    fname,
    lname,
    gender,
    birthday = new Date(),
    email,
    password,
  } = personalInfo;

  const {
    control,
    formState: { errors, isValid },
    watch,
  }: {
    control: Control<{ userPersonalInformation: UserPersonalInformation }>;
    formState: {
      errors: FieldErrorsImpl<{
        userPersonalInformation: UserPersonalInformation;
      }>;
      isValid: boolean;
    };
    watch: UseFormWatch<{ userPersonalInformation: UserPersonalInformation }>;
  } = useFormContext<{ userPersonalInformation: UserPersonalInformation }>();

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

  const onChangeGender = (text: string) =>
    setPersonalInfo((prev) => ({ ...prev, gender: text as "male" | "female" }));

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
        <YStack justify="flex-start" gap="$3.5">
          <YStack mb={15}>
            <H6 fontWeight={400}>Personal Information</H6>
          </YStack>
          <XStack justify="space-between" gap={10}>
            <YStack flex={1}>
              <Label width={90} htmlFor="fname">
                First Name*
              </Label>
              <Controller
                control={control}
                name="userPersonalInformation.fname"
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
              {errors.userPersonalInformation && (
                <Paragraph position="absolute" t={"$12"} color={"red"}>
                  {errors.userPersonalInformation.fname?.message}
                </Paragraph>
              )}
            </YStack>
            <YStack flex={1}>
              <Label width={90} htmlFor="lname">
                Last Name*
              </Label>
              <Controller
                control={control}
                name="userPersonalInformation.lname"
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
              {errors.userPersonalInformation && (
                <Paragraph position="absolute" t={"$12"} color={"red"}>
                  {errors.userPersonalInformation.lname?.message}
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
                name="userPersonalInformation.gender"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomSelectOpt
                    value={value}
                    onValueChange={(text) => {
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
              {errors.userPersonalInformation && (
                <Paragraph color={"red"}>
                  {errors.userPersonalInformation.gender?.message}
                </Paragraph>
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

          <YStack flex={1}>
            <Label width={90} htmlFor="email">
              Email*
            </Label>
            <Controller
              control={control}
              name="userPersonalInformation.email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="email"
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
            {errors.userPersonalInformation && (
              <Paragraph position="absolute" t={"$12"} color={"red"}>
                {errors.userPersonalInformation.email?.message}
              </Paragraph>
            )}
          </YStack>

          <YStack flex={1}>
            <Label width={90} htmlFor="email">
              Password*
            </Label>
            <YStack width="100%" position="relative">
              <Controller
                control={control}
                name="userPersonalInformation.password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    id="password"
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
                {showPassword ? <Eye /> : <EyeOff />}
              </Button>
            </YStack>
            {errors.userPersonalInformation && (
              <Paragraph position="absolute" t={"$12"} color={"red"}>
                {errors.userPersonalInformation.password?.message}
              </Paragraph>
            )}
          </YStack>
        </YStack>
      </YStack>
      <Text>
        fname: {watch("userPersonalInformation.fname")} | lname:{" "}
        {watch("userPersonalInformation.lname")} | gender:{" "}
        {watch("userPersonalInformation.gender")} | email:{" "}
        {watch("userPersonalInformation.email")} | password:{" "}
        {watch("userPersonalInformation.password")} | isValid:{" "}
        {isValid ? "✅" : "❌"}
      </Text>
    </Pressable>
  );
};

export default Step1;
