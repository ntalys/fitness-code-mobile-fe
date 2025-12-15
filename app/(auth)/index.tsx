import {
  ImageBackground,
  StyleSheet,
  Platform,
  Pressable,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  H4,
  Input,
  Label,
  Paragraph,
  ScrollView,
  Text,
  XStack,
  YStack,
} from "tamagui";

import { Eye, EyeOff, LogIn } from "lucide-react-native";
import { useState } from "react";
import { useColorScheme } from "react-native";

import Toast from "react-native-toast-message";
import ToastInSteroids from "../../components/toast/ToastInSteroids";
import { LoadingSpinner } from "../../components/custom/LoadingSpinner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "../../@types/sign-in";
import CustomIcon from "../../components/custom/CustomIcon";
import { useAuth } from "../../context/AuthContext";

export default function index() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { login, loading } = useAuth();

  console.log("loading : ", loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [isToastShown, setIsToastShown] = useState(false);

  const onChangeEmail = (text: string) => setEmail(() => text);

  const onChangePassword = (text: string) => setPassword(() => text);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(signIn),
    mode: "all",
    defaultValues: {
      email,
      password,
    },
  });

  const onSignin = async () => {
    const data = await login(email, password);

    setIsToastShown(true);

    if (data.success) {
      Toast.show({
        type: "BeastSuccessToast",
        text1: data.message,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 80,
        onHide: () => {
          router.replace("/home");
          setIsToastShown(false);
        },
      });
    } else {
      Toast.show({
        type: "BeastErrorToast",
        text1: "Logged in error",
        text2: data.message,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 80,
        onHide: () => setIsToastShown(false),
      });
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/bg-gym.jpg")}
      style={styles.background}
      resizeMode="cover"
      blurRadius={6}>
      <ToastInSteroids />

      <Pressable
        onPress={() => Keyboard.dismiss()}
        style={{ width: "100%" }}
        android_disableSound={false} // optional for Android
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 25,
            paddingBottom: 20,
          }}
          keyboardShouldPersistTaps="handled">
          <SafeAreaView
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <YStack
              opacity={1}
              justify="center"
              bg="rgba(0,0,0,0.5)"
              rounded="$6"
              p="$4"
              width={360}
              height={500}>
              <YStack mb={30} z={2} gap={5}>
                <XStack justify="center">
                  <CustomIcon name={"Dumbbell"} size={48} color="yellow" />
                </XStack>
                <XStack justify="center">
                  <H4 color={"white"}>Sign In to your Account</H4>
                </XStack>
              </YStack>

              <YStack gap={20}>
                <YStack mt={-20}>
                  <Label width={90} htmlFor="email" color={"white"}>
                    Email*
                  </Label>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        disabled={isToastShown}
                        disabledStyle={{ opacity: 0.5 }}
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
                <YStack>
                  <Label width={90} htmlFor="password" color={"white"}>
                    Password*
                  </Label>
                  <YStack width="100%" position="relative" mb={30}>
                    <Controller
                      control={control}
                      name="password"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          disabled={isToastShown}
                          disabledStyle={{ opacity: 0.5 }}
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
                      disabled={isToastShown}
                      disabledStyle={{ opacity: 0.5 }}
                      unstyled
                      onPress={togglePasswordVisibility}
                      position="absolute"
                      t={0}
                      r={10}
                      height="100%"
                      width={40}
                      justify="center">
                      {showPassword ? (
                        <Eye
                          color={colorScheme === "dark" ? "white" : "black"}
                        />
                      ) : (
                        <EyeOff
                          color={colorScheme === "dark" ? "white" : "black"}
                        />
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

              <XStack justify="flex-end">
                <Text
                  disabled={isToastShown}
                  disabledStyle={{ opacity: 0.5 }}
                  textDecorationLine="underline"
                  onPress={() =>
                    !isToastShown && router.replace("/forgot-password")
                  }
                  color={"white"}
                  mr={3}>
                  Forgot your password ?
                </Text>
              </XStack>

              <YStack justify="center" mt={25}>
                <XStack justify="center">
                  <Button
                    disabled={isToastShown}
                    disabledStyle={{ opacity: 0.5 }}
                    width={320}
                    theme="accent"
                    fontWeight={"500"}
                    color={"$color"}
                    onPress={onSignin}
                    iconAfter={
                      <LogIn
                        color={colorScheme === "dark" ? "white" : "black"}
                      />
                    }>
                    Sign In
                  </Button>
                </XStack>
                <XStack justify="center" width={"100%"} gap={5} mt={20}>
                  <Text color={"white"}>Don't have an account?</Text>
                  <Text
                    disabled={isToastShown}
                    disabledStyle={{ opacity: 0.5 }}
                    textDecorationLine="underline"
                    onPress={() => !isToastShown && router.push("/register")}
                    color={"white"}>
                    Sign Up
                  </Text>
                </XStack>
              </YStack>
              {loading && <LoadingSpinner />}
            </YStack>
          </SafeAreaView>
        </ScrollView>
      </Pressable>
    </ImageBackground>
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
