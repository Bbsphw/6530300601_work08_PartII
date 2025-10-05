// src/navigation/StackNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import ForgetPasswordScreen from "../screens/ForgetPasswordScreen";
import DrawerNavigator from "./DrawerNavigator";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../styles/commonStyles";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegistrationScreen} />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPasswordScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: "",
            headerLeft: () => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 12,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  accessibilityRole="button"
                  accessibilityLabel="Go back"
                  style={{ paddingRight: 24 }}
                >
                  <Ionicons name="arrow-back" size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text
                  style={{
                    marginLeft: 24,
                    fontSize: 18,
                    fontWeight: "700",
                    color: COLORS.black,
                  }}
                >
                  Recover
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: "#fff" },
            headerShadowVisible: false,
            contentStyle: { backgroundColor: "#fff" },
          })}
        />
        <Stack.Screen name="DrawerNav" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
