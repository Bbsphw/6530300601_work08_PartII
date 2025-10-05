// src/screens/RegistrationScreen.js
import React, { useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import cm, { METRICS, IMAGES } from "../styles/commonStyles";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signUp } from "../store/slices/authSlice";
import { selectAuthStatus } from "../store/selectors";

export default function RegistrationScreen({ navigation }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);

  const onRegister = async () => {
    if (!firstname || !lastname || !studentId || !email || !pw) {
      Alert.alert("Required", "Please fill all fields.");
      return;
    }
    const name = `${firstname} ${lastname}`.trim();
    const res = await dispatch(
      signUp({
        name,
        studentId,
        email: email.trim().toLowerCase(),
        password: pw,
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      // ออกจากระบบ แล้วส่งข้อความไปหน้า Login ให้เด้ง Alert ที่นั่น
      await dispatch(signIn());
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Login",
            params: { welcomeMsg: `${firstname} has been added to system` },
          },
        ],
      });
    } else {
      Alert.alert("Error", String(res.payload || "Failed to register."));
    }
  };

  return (
    <SafeAreaView style={cm.screen}>
      <View style={cm.centerContainer}>
        <View style={cm.authCard}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: METRICS.spacing,
            }}
          >
            <Image
              source={{ uri: IMAGES.logo }}
              style={{ width: 100, height: 100, marginRight: 6 }}
              resizeMode="contain"
            />
            <Text style={cm.headerTitle}>Registration</Text>
          </View>

          <CustomInput
            placeholder="Firstname"
            value={firstname}
            onChangeText={setFirstname}
          />
          <CustomInput
            placeholder="Lastname"
            value={lastname}
            onChangeText={setLastname}
          />
          <CustomInput
            placeholder="StudentID"
            value={studentId}
            onChangeText={setStudentId}
            keyboardType="number-pad"
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
            title={status === "loading" ? "Registering..." : "Register"}
            onPress={onRegister}
            disabled={status === "loading"}
          />
          <CustomButton title="Cancel" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </SafeAreaView>
  );
}
