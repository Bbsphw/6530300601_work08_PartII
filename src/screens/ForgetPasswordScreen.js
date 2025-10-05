// src/screens/ForgetPasswordScreen.js
import React, { useState } from "react";
import { View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import cm from "../styles/commonStyles";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useDispatch } from "react-redux";
import { resetPassword } from "../store/slices/authSlice";

export default function ForgetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const onRecover = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return Alert.alert("Required", "Please enter your email.");

    const res = await dispatch(resetPassword(trimmed));
    if (res.meta.requestStatus === "fulfilled") {
      Alert.alert(
        "Sent",
        `If ${res.payload.email} is registered, you'll receive a reset link shortly.`
      );
      navigation.goBack();
    } else {
      const msg = String(res.payload || "Failed to send email.");
      if (msg.startsWith("provider=")) {
        const providers = msg.replace("provider=", "").split(",");
        const human = providers
          .map((p) => (p === "password" ? "Email & Password" : p))
          .join(", ");
        Alert.alert(
          "Use another method",
          `This email is registered with: ${human}. Password reset works only for Email & Password accounts.`
        );
      } else if (msg.includes("user-not-found")) {
        Alert.alert("No account", "No user found for this email.");
      } else {
        Alert.alert("Error", msg);
      }
    }
  };

  return (
    <SafeAreaView style={cm.screen}>
      <View style={cm.container}>
        <View style={{ marginTop: 32, width: "100%" }}>
          <View style={cm.authCard}>
            <CustomInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <CustomButton title="Recover" onPress={onRecover} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
