import React, { useEffect, useState } from "react";
import { Button, Text, XStack, YStack } from "tamagui";
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
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    widthProgress.value = 1;
  }, []);

  const rootView = useAnimatedStyle(() => ({
    height: withTiming(showMsg && props.text2 ? 90 : 60, {
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    }),
    alignItems: "center",
    justifyContent: "center",
    width: "88%",
    backgroundColor: props.colorScheme === "light" ? "white" : "black",
    borderLeftColor: "blue",
    borderLeftWidth: 6,
    borderRadius: 10,
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${widthProgress.value * 98}%`, {
      duration: 2000,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    }),
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    backgroundColor: "blue",
    position: "absolute",
    bottom: 0,
    height: 4,
    marginHorizontal: 4,
  }));

  return (
    <Animated.View style={rootView}>
      <Button
        unstyled
        position="absolute"
        t={10}
        r={10}
        onPress={() => setShowMsg((preVal) => (preVal = !preVal))}>
        <CustomIcon
          name={showMsg ? "ChevronUp" : "ChevronDown"}
          color="blue"
          size={24}
        />
      </Button>
      <YStack justify="center" height={"100%"} width={"100%"}>
        <YStack pl={12} justify="center" gap={10}>
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
          {showMsg && props.text2 && (
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
    </Animated.View>
  );
};

export default InfoToast;
