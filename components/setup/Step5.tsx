import { View, Text } from "react-native";
import React from "react";

const Step5 = ({
  personalInfo,
  physicalMeasurements,
  fitnessGaol,
  fitnessExp,
}) => {
  return (
    <View>
      <Text>First Name: {personalInfo.fname}</Text>
      <Text>Last Name: {personalInfo.lname}</Text>
      <Text>Gender: {personalInfo.gender}</Text>
      <Text>Birthday: {personalInfo.birthday?.toLocaleDateString()}</Text>
      <Text>Email: {personalInfo.email}</Text>

      <Text>
        Height: {physicalMeasurements.height.value}{" "}
        {physicalMeasurements.height.unit}
      </Text>
      <Text>
        Weight: {physicalMeasurements.weight.value}{" "}
        {physicalMeasurements.weight.unit}
      </Text>

      <Text>
        Fitness Goals:{" "}
        {Array.isArray(fitnessGaol) ? fitnessGaol.join(", ") : fitnessGaol}
      </Text>

      <Text>Fitness Level: {fitnessExp.fitnessLevel}</Text>
      <Text>Workout Frequency: {fitnessExp.workoutFrequency}</Text>
    </View>
  );
};

export default Step5;
