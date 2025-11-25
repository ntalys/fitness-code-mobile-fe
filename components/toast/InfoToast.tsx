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
    borderLeftColor: "gray",
    borderLeftWidth: 6,
    borderRadius: 10,
  }));

  const visibilityBar = useAnimatedStyle(() => ({
    width: withTiming(`${widthProgress.value * 98}%`, {
      duration: 2000,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    }),
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    backgroundColor: "gray",
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
          color="gray"
          size={24}
        />
      </Button>

      <YStack height={"100%"} width={"100%"} justify="center">
        <XStack gap={12} height={"30%"}>
          <YStack pl={12} height={"100%"} justify="center">
            <CustomIcon name="Info" color="gray" size={24} />
          </YStack>
          <YStack justify="center">
            <Text>{props.text1}</Text>
          </YStack>
        </XStack>

        <XStack justify="center">
          <YStack height={"100%"}>
            {showMsg && props.text2 && (
              <Text color={props.colorScheme === "light" ? "black" : "white"}>
                {props.text2}
              </Text>
            )}
          </YStack>
        </XStack>
        <Animated.View style={visibilityBar} />
      </YStack>
    </Animated.View>
  );
};

export default InfoToast;
