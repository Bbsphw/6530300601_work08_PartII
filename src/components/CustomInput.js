// src/components/CustomInput.js
import React from "react";
import { View, TextInput } from "react-native";
import cs from "../styles/componentStyles";
import { COLORS } from "../styles/commonStyles";

export default function CustomInput({
  value,
  onChangeText,
  placeholder,
  secure,
  keyboardType = "default",
  editable = true,
  style,
  ...rest
}) {
  return (
    <View style={cs.inputContainer}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textMuted}
        secureTextEntry={!!secure}
        keyboardType={keyboardType}
        editable={editable}
        style={[cs.textInput, style]}
        {...rest}
      />
    </View>
  );
}
