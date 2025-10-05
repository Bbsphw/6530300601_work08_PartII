// src/screens/ChangePasswordScreen.js
import React, { useState } from "react";
import { View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import cm from "../styles/commonStyles";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { AuthService } from "../services/authService";

export default function ChangePasswordScreen({ navigation }) {
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");

  const onChange = async () => {
    if (!oldPw || !newPw || !confirm) {
      Alert.alert("Required", "Please fill all fields.");
      return;
    }
    if (newPw !== confirm) {
      Alert.alert("Mismatch", "Confirm password does not match.");
      return;
    }
    try {
      await AuthService.changePassword(newPw, oldPw);
      Alert.alert("Success", "Password changed.");
      navigation.goBack();
    } catch (e) {
      Alert.alert("Error", String(e?.message ?? e));
    }
  };

  return (
    <SafeAreaView style={cm.screen}>
      <View style={cm.container}>
        <View style={cm.authCard}>
          <View style={cm.form}>
            <CustomInput
              placeholder="old password"
              value={oldPw}
              onChangeText={setOldPw}
              secure
            />
            <CustomInput
              placeholder="new password"
              value={newPw}
              onChangeText={setNewPw}
              secure
            />
            <CustomInput
              placeholder="confirm new password"
              value={confirm}
              onChangeText={setConfirm}
              secure
            />
            <CustomButton title="Change Password" onPress={onChange} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
