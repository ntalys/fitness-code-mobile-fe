import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "lucide-react-native";

const PopoverCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setShow(false);
      return;
    }
    setDate(selectedDate || date);
    setShow(false);
  };

  const openPicker = () => setShow(true);
  const closePicker = () => setShow(false);

  return (
    <>
      <Pressable onPress={openPicker}>
        <Calendar size={28} color={"hsla(0, 15%, 77%, 1)"} />
      </Pressable>

      {Platform.OS === "ios" ? (
        <Modal
          visible={show}
          transparent
          animationType="slide"
          backdropColor={"red"}>
          {/* Overlay to close modal on press */}
          <TouchableWithoutFeedback onPress={closePicker}>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                // backgroundColor: "rgba(0,0,0,0.3)",
              }}
            />
          </TouchableWithoutFeedback>

          <View
            style={{
              backgroundColor: "hsla(0, 15%, 50%, 1)",
              // padding: 10,
              // flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}>
            <DateTimePicker
              value={date}
              mode="date"
              display="inline" // "inline" works only inside views, "spinner" gives modal style
              onChange={onChange}
              accentColor="hsla(51, 100%, 54%, 1)"
            />
          </View>
        </Modal>
      ) : (
        show && (
          <DateTimePicker
            value={date}
            mode="date"
            display="calendar"
            onChange={onChange}
          />
        )
      )}
    </>
  );
};

export default PopoverCalendar;
