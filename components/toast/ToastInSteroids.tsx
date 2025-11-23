import { useColorScheme } from "react-native";
import React from "react";
import Toast, { BaseToastProps } from "react-native-toast-message";
import ErrorToast from "./ErrorToast";
import SuccessToast from "./SuccessToast";
import InfoToast from "./InfoToast";
import uuid from "react-native-uuid";

const config = (colorScheme) => ({
  EToast: ({ ...props }: BaseToastProps) => (
    <ErrorToast {...props} colorScheme={colorScheme} key={uuid.v4()} />
  ),
  SToast: ({ ...props }: BaseToastProps) => (
    <SuccessToast {...props} colorScheme={colorScheme} key={uuid.v4()} />
  ),

  IToast: ({ ...props }: BaseToastProps) => (
    <InfoToast {...props} colorScheme={colorScheme} key={uuid.v4()} />
  ),
});

const ToastInSteroids = () => {
  const colorScheme = useColorScheme();

  return <Toast config={config(colorScheme)} />;
};

export default ToastInSteroids;
