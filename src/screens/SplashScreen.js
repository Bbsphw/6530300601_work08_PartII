// src/screens/SplashScreen.js
import React, { useEffect } from "react";
import { StyleSheet, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { METRICS, IMAGES } from "../styles/commonStyles";
import { AuthService } from "../services/authService";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => {
      const user = AuthService.currentUser();
      navigation.reset({
        index: 0,
        routes: [{ name: user ? "DrawerNav" : "Login" }],
      });
    }, 2500);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: IMAGES.bg }}
        resizeMode="cover"
        style={styles.bg}
      >
        <Text style={styles.text}>I love React-Native</Text>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: {
    fontSize: METRICS.splashFont,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
  },
});
