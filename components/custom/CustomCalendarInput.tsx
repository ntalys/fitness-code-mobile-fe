import { Text } from "react-native";
import React from "react";
import { XStack } from "tamagui";
import { Calendar as CalendarIcon } from "lucide-react-native";

const CustomCalendarInput = ({ onPress, date }) => {
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
        backgroundColor: "hsla(0, 16%, 94%, 1)",
        width: "100%",
        borderTopColor: "hsla(0, 15%, 77%, 1)",
        borderRightColor: "hsla(0, 15%, 77%, 1)",
        borderLeftColor: "hsla(0, 15%, 77%, 1)",
        borderBottomColor: "hsla(0, 15%, 77%, 1)",
        maxWidth: 320,
        overflow: "hidden",
        borderRadius: 9,
        borderWidth: 1,
      }}>
      <Text style={{ color: "hsla(0, 15%, 50%, 1)" }}>
        {date ? date : "dd/mm/yyyy"}
      </Text>
      <CalendarIcon color="hsla(0, 15%, 50%, 1)" onPress={onPress} />
    </XStack>
  );
};

export default CustomCalendarInput;
