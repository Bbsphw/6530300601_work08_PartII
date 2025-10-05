// src/screens/ProfileScreen.js
import React, { useEffect, useState, useCallback } from "react";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import cm, { METRICS } from "../styles/commonStyles";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../store/slices/profileSlice";
import { selectProfileData, selectProfileStatus } from "../store/selectors";
import { signOut } from "../store/slices/authSlice";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const data = useSelector(selectProfileData);
  const status = useSelector(selectProfileStatus);

  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const first = data?.name?.split(" ")[0] ?? "";
  const last = data?.name?.split(" ").slice(1).join(" ") ?? "";

  const handleSignOut = useCallback(() => {
    if (signingOut) return;

    Alert.alert(
      "Sign out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign out",
          style: "destructive",
          onPress: async () => {
            setSigningOut(true);
            try {
              // ลบ session/persistence ของผู้ใช้
              (await dispatch(signOut()).unwrap?.()) ?? dispatch(signOut());
              // ส่งไปหน้า Splash (ซึ่งจะรอ 2.5 วิ แล้วไป Login เพราะ currentUser ถูกลบแล้ว)
              navigation.reset({ index: 0, routes: [{ name: "Splash" }] });
            } catch (e) {
              Alert.alert("Error", String(e?.message ?? e));
            } finally {
              setSigningOut(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  }, [dispatch, navigation, signingOut]);

  return (
    <SafeAreaView style={cm.screen}>
      <View style={cm.centerContainer}>
        <View style={cm.authCard}>
          <View style={[cm.form, { marginBottom: METRICS.spacing }]}>
            <CustomInput value={first} editable={false} />
            <CustomInput value={last} editable={false} />
            <CustomInput value={data?.studentId ?? ""} editable={false} />
            <CustomInput value={data?.email ?? ""} editable={false} />
          </View>
          {/* <CustomButton
            title={status === "loading" ? "Loading..." : "Sign out"}
            onPress={async () => {
              await dispatch(signOut());
              navigation.reset({ index: 0, routes: [{ name: "Login" }] });
            }}
          /> */}
          <CustomButton
            title={
              signingOut || status === "loading" ? "Signing out..." : "Sign out"
            }
            onPress={handleSignOut}
            disabled={signingOut}
          />

          <CustomButton
            title="Go to Splash"
            onPress={() => navigation.replace("Splash")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
