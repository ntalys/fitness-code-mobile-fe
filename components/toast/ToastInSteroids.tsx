import { ColorSchemeName, useColorScheme } from "react-native";
import React from "react";
import Toast, { BaseToastProps } from "react-native-toast-message";
import uuid from "react-native-uuid";
import BeastToast from "./BeastToast";

const config = (colorScheme: ColorSchemeName) => ({
  BeastSuccessToast: ({ ...props }: BaseToastProps) => (
    <BeastToast
      {...props}
      colorScheme={colorScheme}
      statusColor="green"
      collapsable={false}
      expanded={true}
      key={uuid.v4()}
    />
  ),
  BeastErrorToast: ({ ...props }: BaseToastProps) => (
    <BeastToast
      {...props}
      colorScheme={colorScheme}
      statusColor="red"
      collapsable={false}
      expanded={true}
      key={uuid.v4()}
    />
  ),
  BeastInfoToast: ({ ...props }: BaseToastProps) => (
    <BeastToast
      {...props}
      colorScheme={colorScheme}
      statusColor="blue"
      collapsable={false}
      expanded={true}
      key={uuid.v4()}
    />
  ),
});

const ToastInSteroids = () => {
  const colorScheme = useColorScheme();

  return <Toast config={config(colorScheme)} />;
};

export default ToastInSteroids;
