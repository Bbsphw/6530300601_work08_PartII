// src/components/CustomButton.js
import React from "react";
import { View, Text, Pressable } from "react-native";
import cs from "../styles/componentStyles";

export default function CustomButton({
  title,
  onPress,
  style,
  textStyle,
  disabled,
}) {
  return (
    <View style={{ width: "100%" }}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [
          cs.button,
          style,
          pressed && { opacity: 0.9 },
          disabled && { opacity: 0.6 },
        ]}
      >
        <Text style={[cs.buttonText, textStyle]}>{title}</Text>
      </Pressable>
    </View>
  );
}
