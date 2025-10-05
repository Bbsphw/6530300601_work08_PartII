// src/components/Header.js
import React from "react";
import { Text } from "react-native";
import cm from "../styles/commonStyles";

export default function Header({ children, style }) {
  return <Text style={[cm.headerText, style]}>{children}</Text>;
}
