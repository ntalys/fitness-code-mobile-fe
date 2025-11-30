import CustomIcon from "../custom/CustomIcon";
import { Text, View } from "tamagui";

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
        justifyContent: "center",
        alignItems: "center",
      }}>
      <CustomIcon name={iconName} size={28} color={tintColor} />

      {focused && (
        <View
          style={{
            height: "100%",
            width: "100%",
            marginTop: 6,
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
        </View>
      )}
    </View>
  );
};

export { TabItem };
