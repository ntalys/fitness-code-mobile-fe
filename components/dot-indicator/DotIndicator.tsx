import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Button } from "tamagui";

const DotIndicator = ({ active, onPress }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(active ? 50 : 20, { duration: 250 }),
      height: withTiming(20, { duration: 250 }),
      borderRadius: withTiming(active ? 50 : 999, { duration: 250 }),
      backgroundColor: active ? "hsla(51, 100%, 54%, 1)" : "#CCCCCC",
      marginHorizontal: 6,
      overflow: "hidden", // important to clip content
    };
  }, [active]);

  return (
    <Animated.View style={animatedStyle}>
      <Button
        unstyled
        onPress={onPress}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </Animated.View>
  );
};

export default DotIndicator;
