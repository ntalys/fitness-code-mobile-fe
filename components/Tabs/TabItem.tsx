import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import CustomIcon from "../custom/CustomIcon";
import { View } from "tamagui";

const TabItem = ({
  iconName,
  label,
  focused,
  colorScheme,
}: {
  iconName: string;
  label: string;
  focused: boolean;
  colorScheme: string | null;
}) => {
  const activeColor =
    colorScheme === "dark" ? "hsla(51, 100%, 54%, 1)" : "black";

  const inactiveColor = colorScheme === "dark" ? "gray" : "#888";

  const tintColor = focused ? activeColor : inactiveColor;

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}>
      <CustomIcon name={iconName} size={28} color={tintColor} />

      {focused && (
        <Animated.Text
          entering={FadeIn.duration(450)}
          exiting={FadeOut.duration(450)}
          style={{
            width: "100%",
            marginTop: 6,
            fontSize: 12,
            color: tintColor,
            fontWeight: "500",
          }}>
          {label}
        </Animated.Text>
      )}
    </View>
  );
};

export { TabItem };
