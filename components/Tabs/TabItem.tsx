import CustomIcon from "../custom/CustomIcon";
import { Text, View, XStack, YStack } from "tamagui";

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
    <YStack
      style={{
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "0%",
      }}>
      <CustomIcon name={iconName} size={28} color={tintColor} />

      {focused && (
        <YStack
          style={{
            position: "relative",
            marginTop: 2,
          }}>
          <Text
            style={{
              width: "100%",
              fontSize: 12,
              color: tintColor,
              fontWeight: "500",
            }}>
            {label}
          </Text>
        </YStack>
      )}
    </YStack>
  );
};

export { TabItem };
