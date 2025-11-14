import { Text } from "react-native";
import React from "react";
import { XStack } from "tamagui";
import { Calendar as CalendarIcon } from "lucide-react-native";

const CustomCalendarInput = ({ children, date }) => {
  return (
    <XStack
      p={"$6"}
      style={{
        minHeight: 44,
        paddingRight: 18,
        paddingLeft: 18,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        backgroundColor: "$color2",
        width: "100%",
        borderTopColor: "$color2",
        borderRightColor: "$color2",
        borderLeftColor: "$color2",
        borderBottomColor: "$color2",
        maxWidth: 420,
        overflow: "hidden",
        borderRadius: 9,
        borderWidth: 1,
      }}>
      <Text>{date ? date : "dd/mm/yyyy"}</Text>
      {children}
    </XStack>
  );
};

export default CustomCalendarInput;
