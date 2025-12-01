import {
  ImageBackground,
  StyleSheet,
  Platform,
  Pressable,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, H4, Input, ScrollView, Text, XStack, YStack } from "tamagui";
import {
  KeyboardAvoidingView,
  KeyboardProvider,
} from "react-native-keyboard-controller";

import { Dumbbell, Eye, EyeOff, LogIn } from "lucide-react-native";
import { useState } from "react";
import { useColorScheme } from "react-native";

import Toast from "react-native-toast-message";
import ToastInSteroids from "../../components/toast/ToastInSteroids";
import { LoadingSpinner } from "../../components/custom/LoadingSpinner";

export default function index() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeEmail = (text: string) => setEmail(() => text);
  const onChangePassword = (text: string) => setPassword(() => text);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSignin = async () => {
    const payload = {
      email,
      password,
    };
    setIsLoading(() => true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/sign-in",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json", // 🧠 important so Express can parse JSON
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("data: ", data);

      if (!response.ok) {
        console.log("data: ", data);

        throw new Error(data.message || "Unknown server error");
      }

      Toast.show({
        type: "BeastSuccessToast",
        text1: data.message,
        // text2: data.message,
        visibilityTime: 2000,
        autoHide: true,
        onHide: () => {
          router.replace("/home");
        },
      });
    } catch (error) {
      Toast.show({
        type: "BeastErrorToast",
        text1: "Logged in error",
        text2: error.message,
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setIsLoading(() => false);
    }
  };

  return (
    <SafeAreaProvider>
      {/* <TamaguiProvider config={config}> */}
      <KeyboardProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}>
          <ImageBackground
            source={require("../../assets/bg-gym.jpg")}
            style={styles.background}
            resizeMode="cover"
            blurRadius={6} // 👈 adds blur to the image
          >
            <Pressable
              onPress={() => Keyboard.dismiss()}
              style={{ width: "100%" }}
              android_disableSound={false} // optional for Android
            >
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: 20,
                }}>
                <XStack justify="center">
                  <YStack
                    p={30}
                    width={"90%"}
                    bg={"rgba(0,0,0,0.7)"}
                    justify="center"
                    gap={20}
                    rounded={8}>
                    <XStack justify="center">
                      <XStack bg={"$accent1"} rounded={6} p={20}>
                        <Dumbbell size={34} />
                      </XStack>
                    </XStack>
                    <XStack justify="center">
                      <H4 color={"white"} justify="center">
                        Sign in to your account
                      </H4>
                    </XStack>
                    <YStack width={"100%"} gap={20}>
                      <XStack justify="center">
                        <Input
                          width={"90%"}
                          id="email"
                          value={email}
                          onChangeText={onChangeEmail}
                          defaultValue=""
                          keyboardAppearance="default"
                          keyboardType="default"
                          placeholder="Email address"></Input>
                      </XStack>
                      <YStack position="relative">
                        <XStack justify="center">
                          <Input
                            id="password"
                            value={password}
                            onChangeText={onChangePassword}
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            width="90%"
                          />
                          <Button
                            unstyled
                            onPress={togglePasswordVisibility}
                            position="absolute"
                            t={0}
                            r={20}
                            height="100%"
                            width={40}
                            justify="center"
                            alignItems="center">
                            {showPassword ? (
                              <Eye
                                color={
                                  colorScheme === "dark" ? "white" : "black"
                                }
                              />
                            ) : (
                              <EyeOff
                                color={
                                  colorScheme === "dark" ? "white" : "black"
                                }
                              />
                            )}
                          </Button>
                        </XStack>
                        <XStack justify="flex-end" p={20}>
                          <Text
                            textDecorationLine="underline"
                            onPress={() => router.replace("/forgot-password")}
                            color={"white"}>
                            Forgot your password ?
                          </Text>
                        </XStack>
                        <YStack gap={20}>
                          <XStack justify="center" width={"100%"}>
                            <Button
                              width={"90%"}
                              iconAfter={<LogIn />}
                                onPress={() => router.replace("/home")}>
                              Sign In
                            </Button>
                          </XStack>
                          <XStack justify="center" width={"100%"} gap={5}>
                            <Text color={"white"}>Don't have an account?</Text>
                            <Text
                              textDecorationLine="underline"
                              onPress={() => router.push("/register")}
                              color={"white"}>
                              Sign Up
                            </Text>
                          </XStack>
                        </YStack>
                      </YStack>
                    </YStack>
                  </YStack>
                </XStack>
              </ScrollView>
            </Pressable>
          </ImageBackground>
        </KeyboardAvoidingView>
      </KeyboardProvider>
      {/* </TamaguiProvider> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.3)", // optional overlay for contrast
    padding: 20,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    marginBottom: 10,
  },
});
