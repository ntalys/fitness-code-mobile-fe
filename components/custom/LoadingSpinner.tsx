import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { XStack, YStack } from "tamagui";
import CustomIcon from "./CustomIcon";

type Props = {
  color?: string;
  size?: number;
  fadeInDelay?: number;
};

export const LoadingSpinner = React.memo(
  ({ color = "hsla(51, 100%, 54%, 1)", size = 48 }: Props) => {
    const spinValue = useRef(new Animated.Value(0)).current;

    // Infinite spin animation
    useEffect(() => {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1200,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }, []);

    // Convert numeric range → rotation string
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    return (
      <YStack
        position="absolute"
        t={0}
        l={0}
        r={0}
        b={0}
        z={999999}
        justify="center"
        bg="rgba(0,0,0,0.5)">
        <XStack justify="center">
          <Animated.View
            style={{
              //   opacity: fadeInValue,
              transform: [{ rotate: spin }],
            }}>
            <CustomIcon name="Loader" color={color} size={size} />
          </Animated.View>
        </XStack>
      </YStack>
    );
  }
);
