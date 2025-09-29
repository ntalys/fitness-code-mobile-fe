import { View, Text, Pressable, Platform } from "react-native";
import React, { useMemo } from "react";
import CustomCalendarInput from "./CustomCalendarInput";
import { SelectProps } from "tamagui";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomIcon from "./CustomIcon";

const PopoverCalendarAndroid = (
  props: SelectProps & {
    date: Date;
    show: boolean;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
  }
) => {
  const onChange = (_event: any, selectedDate?: Date) => {
    if (Platform.OS === "android" && _event.type === "dismissed") {
      props.setShow(false);
      return;
    }
    if (selectedDate) props.setDate(selectedDate);
    props.setShow(false);
  };

  const formattedDate = useMemo(() => {
    if (props.date) {
      const day = props.date.getDate();
      const month = props.date.getMonth();
      const year = props.date.getFullYear();

      const formattedDay = day <= 9 ? `0${day}` : day;
      const formattedMonth = month <= 9 ? `0${month}` : month;

      return `${formattedDay}/${formattedMonth}/${year}`;
    }
  }, [props.date]);

  return (
    <>
      <Pressable onPress={() => props.setShow(true)}>
        <CustomCalendarInput date={formattedDate}>
          {props.show && (
            <DateTimePicker
              value={props.date}
              mode="date"
              display="inline"
              onChange={onChange}
            />
          )}
          <CustomIcon
            name={"Calendar"}
            size={"14"}
            color={"hsla(0, 15%, 50%, 1)"}
          />
        </CustomCalendarInput>
      </Pressable>
    </>
  );
};

export default PopoverCalendarAndroid;
