import React, { useEffect } from "react";
import { Text, XStack, YStack } from "tamagui";
import CustomIcon from "../custom/CustomIcon";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const InfoToast = ({ ...props }) => {
  const widthProgress = useSharedValue(0); // 0 → 1

  useEffect(() => {
    widthProgress.value = 1;
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${widthProgress.value * 98}%`, {
      duration: 2000,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    }),
    backgroundColor: "blue",
    position: "absolute",
    bottom: 0,
    height: 4,
    marginHorizontal: 4,
  }));

  return (
    <YStack
      height={props.text2 ? 90 : 60}
      width={"88%"}
      bg={props.colorScheme === "light" ? "white" : "black"}
      borderLeftColor={"lightskyblue"}
      // borderRightColor={"$green10"}
      // borderRightWidth={8}
      borderLeftWidth={8}
      rounded={6}>
      <YStack justify="center" height={"100%"} width={"100%"}>
        <YStack pl={12} justify="center" gap={10}>
          {/* <XStack gap={3}> */}
          {/* </XStack> */}
          <XStack gap={5}>
            <CustomIcon name="Info" color="blue" size={24} />
            <YStack justify="center">
              <Text
                justify="center"
                color={props.colorScheme === "light" ? "black" : "white"}>
                {props.text1}
              </Text>
            </YStack>
          </XStack>
          {props.text2 && (
            <Text color={props.colorScheme === "light" ? "black" : "white"}>
              {props.text2}
            </Text>
          )}
        </YStack>
        <Animated.View style={animatedStyle} />
        {/* <XStack
          position="absolute"
          b={0}
          mx={4}
          width={"98%"}
          bg={"$green10"}
          height={4}></XStack> */}
      </YStack>
    </YStack>
  );
};

export default InfoToast;
