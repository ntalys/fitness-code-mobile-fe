import React, { useState } from "react";
import { CalendarList } from "react-native-calendars";
import { Adapt, Button, Popover, PopoverProps, Sheet, YStack } from "tamagui";
import { Calendar as CalendarIcon } from "lucide-react-native";
import { Platform } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

const PopoverCalendar = ({
  Icon,
  Name,
  shouldAdapt,
  ...props
}: PopoverProps & {
  Icon?: any;
  Name?: string;
  shouldAdapt?: boolean;
  setDate;
}) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <Popover size="$5" allowFlip stayInFrame offset={5} resize {...props}>
      <Popover.Trigger asChild>
        <CalendarIcon color={"hsla(0, 15%, 50%, 1)"} />
      </Popover.Trigger>

      {shouldAdapt && (
        <Adapt when="maxMd" platform="touch">
          <Sheet animation="medium" modal dismissOnSnapToBottom>
            <Sheet.Frame padding="$4">
              <Adapt.Contents />
            </Sheet.Frame>
            <Sheet.Overlay
              backgroundColor="$shadowColor"
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>
      )}

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        width={450}
        height={400}
        position={Platform.OS === "ios" ? "absolute" : "static"}
        left={0}
        // style={{ alignItems: "center" }}
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        style={{ padding: 0 }}
        animation={[
          "quick",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}>
        {/* <Button onPress={showDatepicker}>Show date picker!</Button>

        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        /> */}
        <YStack gap="$1">
          <CalendarList
            pastScrollRange={1000}
            style={{
              borderRadius: 3,
              width: 400,
              flex: 1,
              alignContent: "center",
              paddingLeft: 0,
              paddingRight: 20,
            }}
            onDayPress={(day) => {
              console.log("day: ", day);
              props.setDate((dateVal) => {
                const date = day.day <= 9 ? `0${day.day}` : `${day.day}`;
                const month = day.month <= 9 ? `0${day.month}` : `${day.month}`;
                return (dateVal = `${date}/${month}/${day.year}`);
              });
            }}
          />
          {/* <Popover.Arrow borderWidth={1} borderColor="$borderColor" /> */}
          <Popover.Close asChild></Popover.Close>
        </YStack>
      </Popover.Content>
    </Popover>
  );
};

export default PopoverCalendar;

//    <Calendar
//       onDayPress={(day) => {
//         console.log("day: ", day);
//         setDate((dateVal) => {
//           const date = day.day <= 9 ? `0${day.day}` : `${day.day}`;
//           const month = day.month <= 9 ? `0${day.month}` : `${day.month}`;
//           return (dateVal = `${date}/${month}/${day.year}`);
//         });
//       }}
//     />
