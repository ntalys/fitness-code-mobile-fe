import { Keyboard, Pressable, View } from "react-native";
import React, { useState } from "react";
import { Button, H6, Input, Paragraph, XStack, YStack } from "tamagui";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ForgotPassword from "../../assets/forgotPassword.svg";

const forgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const onChangeEmail = (text: string) => setEmail(() => text);

  return (
    <SafeAreaProvider>
      <Pressable
        onPress={() => Keyboard.dismiss()}
        style={{ width: "100%" }}
        android_disableSound={false} // optional for Android
      >
        <YStack bg={"$color2"} height={"100%"} gap={7} pt={40}>
          <XStack justify="center">
            <ForgotPassword width={300} height={325} />
          </XStack>

          <YStack justify="center">
            <XStack justify="center">
              <H6>Forgot Your Password</H6>
            </XStack>
            <XStack justify="center">
              <Paragraph width={"80%"}>
                Enter your registered email below to receive password reset
                instructions
              </Paragraph>
            </XStack>
          </YStack>

          <YStack flex={1} mt={20}>
            <YStack flex={1} gap={60}>
              <YStack>
                <XStack justify="center">
                  <Input
                    width={"80%"}
                    id="email"
                    value={email}
                    onChangeText={onChangeEmail}
                    defaultValue=""
                    keyboardAppearance="default"
                    keyboardType="email-address"
                    placeholder="name@example.com"
                  />
                </XStack>
              </YStack>
              <YStack>
                <XStack justify="center" width={"100%"}>
                  <Button
                    width={"80%"}
                    onPress={() => console.log("email: ", email)}>
                    Send
                  </Button>
                </XStack>
              </YStack>
            </YStack>

            <YStack mb={60}>
              <XStack justify="center" width={"100%"} p={10}>
                <Button
                  justify="center"
                  unstyled
                  onPress={() => router.replace("/")}>
                  Back to Login
                </Button>
              </XStack>
            </YStack>
          </YStack>
        </YStack>
      </Pressable>
    </SafeAreaProvider>
  );
};

export default forgotPassword;
