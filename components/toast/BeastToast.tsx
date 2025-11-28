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
import { BeastToastProps } from "./BaseToast.types";

const BeastToast = ({ ...props }: BeastToastProps) => {
  const widthProgress = useSharedValue(0); // 0 → 1
  const [showMsg, setShowMsg] = useState(false);
  useEffect(() => {
    widthProgress.value = 1;
  }, []);

  const rootView = useAnimatedStyle(() => ({
    height: withTiming((props.expanded || showMsg) && props.text2 ? 90 : 60, {
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    }),
    alignItems: "center",
    justifyContent: "center",
    width: "88%",
    backgroundColor: props.colorScheme === "light" ? "white" : "black",
    borderLeftColor: props.statusColor,
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
    backgroundColor: props.statusColor,
    position: "absolute",
    bottom: 0,
    height: 4,
    marginHorizontal: 4,
  }));

  const icon = {
    red: "TriangleAlert",
    green: "CircleCheck",
    blue: "Info",
  };

  return (
    <Animated.View style={rootView}>
      {props.collapsable && !props.expanded && (
        <Button
          unstyled
          position="absolute"
          t={10}
          r={10}
          onPress={() => setShowMsg((preVal) => (preVal = !preVal))}>
          <CustomIcon
            name={showMsg ? "ChevronUp" : "ChevronDown"}
            color={props.statusColor}
            size={24}
          />
        </Button>
      )}

      <YStack height={"100%"} width={"100%"} justify="center">
        <XStack gap={6} height={"30%"}>
          <YStack pl={12} height={"100%"} justify="center">
            <CustomIcon
              name={icon[props.statusColor]}
              color={props.statusColor}
              size={24}
            />
          </YStack>
          <YStack justify="center">
            <Text color={props.statusColor}>{props.text1}</Text>
          </YStack>
        </XStack>

        <XStack justify="center">
          <YStack width={"$20"} pl={10}>
            {props.expanded && props.text2 && (
              <Text color="#979797">{props.text2}</Text>
            )}
          </YStack>
        </XStack>

        <XStack justify="center">
          <YStack width={"$20"} pl={10}>
            {!props.expanded && props.collapsable && showMsg && props.text2 && (
              <Text color="#979797">{props.text2}</Text>
            )}
          </YStack>
        </XStack>
      </YStack>
      <Animated.View style={visibilityBar} />
    </Animated.View>
  );
};

export default BeastToast;
