// src/screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import cm, { COLORS, IMAGES } from "../styles/commonStyles";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/slices/authSlice";
import { selectAuthStatus, selectAuthError } from "../store/selectors";
import { useRoute, useFocusEffect } from "@react-navigation/native";

const mapAuthErrorToMessage = (rawMsg = "") => {
  const msg = String(rawMsg).toLowerCase();
  if (
    msg.includes("auth/wrong-password") ||
    msg.includes("auth/user-not-found") ||
    msg.includes("auth/invalid-credential") ||
    msg.includes("auth/invalid-email")
  ) {
    return "Wrong username or password";
  }
  return "Sign in failed. Please try again.";
};

export default function LoginScreen({ navigation }) {
  const route = useRoute();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  // ถ้าถูกส่งกลับมาพร้อม welcomeMsg ให้เด้ง Alert ที่หน้า Login
  useFocusEffect(
    React.useCallback(() => {
      const msg = route?.params?.welcomeMsg;
      if (msg) {
        Alert.alert("", msg, [
          {
            text: "OK",
            onPress: () => {
              // ล้าง param เพื่อไม่ให้เด้งซ้ำ
              navigation.setParams({ welcomeMsg: undefined });
            },
          },
        ]);
      }
    }, [route?.params?.welcomeMsg])
  );

  const onSubmit = async () => {
    if (!email || !pw) {
      Alert.alert("Required", "Please enter email and password.");
      return;
    }
    const res = await dispatch(
      signIn({ email: email.trim().toLowerCase(), password: pw })
    );
    if (res.meta.requestStatus === "fulfilled") {
      // สำเร็จ -> ไป Profile (อยู่ใน Drawer)
      navigation.reset({ index: 0, routes: [{ name: "DrawerNav" }] });
    } else {
      Alert.alert(
        "Wrong username or password",
        mapAuthErrorToMessage(res.payload)
      );
    }
  };

  return (
    <SafeAreaView style={cm.screen}>
      <View style={cm.centerContainer}>
        <View style={cm.authCard}>
          <Image
            source={{ uri: IMAGES.logo }}
            style={cm.logo}
            resizeMode="contain"
          />
          <CustomInput
            placeholder="Username"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <CustomInput
            placeholder="Password"
            value={pw}
            onChangeText={setPw}
            secure
          />
          <CustomButton
            title={status === "loading" ? "Signing in..." : "Sign in"}
            onPress={onSubmit}
            disabled={status === "loading"}
          />
          <CustomButton
            title="Sign up"
            onPress={() => navigation.navigate("Register")}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgetPassword")}
            style={cm.linkRow}
          >
            <Text style={cm.linkText}>Forgot Password ?</Text>
          </TouchableOpacity>

          <View />
          {status === "loading" && (
            <ActivityIndicator style={{ marginTop: 8 }} />
          )}
          {!!error && <Text style={cm.errorText}>{String(error)}</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
}
