// src/styles/commonStyles.js
import { StyleSheet, Platform } from "react-native";

/** ==== Assets (ใช้ซ้ำ) ==== */
export const IMAGES = {
  bg: "https://i.ibb.co/C1L3wSC/13186366-5125962.jpg",
  logo: "https://i.ibb.co/yyzQ43h/KU-Logo-PNG.png",
};

/** ==== Design Tokens (สี/ตัวเลขสำคัญ) ==== */
export const COLORS = {
  // โจทย์ใหม่
  overlay: "rgba(0,0,0,0.45)",
  white: "#FFFFFF",
  black: "#000000",
  card: "#FFFFFF",
  pillBg: "#FFFFFF",
  pillBorder: "rgba(0,0,0,0.15)",
  button: "#9a9a9a",
  buttonText: "#000000",
  link: "#2979FF",

  // เผื่อจุดเดิมในโปรเจกต์
  background: "#EEFCDC",
  primary: "#2E7D32",
  primaryTextOn: "#FFFFFF",
  text: "#1E1E1E",
  textMuted: "#6B6B6B",
  border: "#DFDFDF",
  btnTop: "#CFCFCF",
  btnBottom: "#9E9E9E",
};

// spacing / radii / sizes
export const SPACING = 16;
export const RADII = { base: 16, capsule: 24 };
export const SIZES = { maxWidth: 640 };

// fonts
export const FONTS = {
  // โจทย์ใหม่
  header: 25,
  input: 20,
  button: 20,
  // เผื่อจุดเดิม
  labelFont: 14,
  titleFont: 28,
  splashFont: 50,
  // alias ให้ใช้ทั้งสองแบบ
  title: 28,
  splash: 50,
};

/** รวมธีมไว้จุดเดียว (เผื่อสลับ dark/light ในอนาคต) */
export const THEME = { COLORS, SPACING, RADII, FONTS, SIZES };

/** ==== Layout styles พื้นฐาน (แทน commandStyle เดิม) ==== */
const commonStyles = StyleSheet.create({
  // พื้นหลังแบบรูป + overlay
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  // การ์ดหน้า Auth
  authCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: COLORS.card,
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 14,

    borderTopLeftRadius: 24,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 24,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 6 },
    }),
  },

  logo: { width: 150, height: 150, alignSelf: "center", marginBottom: 6 },

  headerRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  headerText: { fontSize: FONTS.header, fontWeight: "700" },

  form: { gap: 12 },

  linkRow: { flexDirection: "row", justifyContent: "flex-end" },
  linkText: {
    color: COLORS.link,
    textDecorationLine: "underline",
    fontWeight: "600",
  },

  // ====== Legacy names (รองรับโค้ดเก่า) ======
  screen: { flex: 1, backgroundColor: COLORS.background },
  container: {
    flex: 1,
    padding: SPACING,
    alignSelf: "center",
    width: "100%",
    maxWidth: SIZES.maxWidth,
  },
  centerContainer: {
    flex: 1,
    padding: SPACING,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    maxWidth: SIZES.maxWidth,
  },
  headerTitle: {
    fontSize: FONTS.titleFont,
    fontWeight: "800",
    color: COLORS.text,
    marginLeft: 12,
  },
  helper: { color: COLORS.textMuted, marginTop: 8 },
  errorText: { color: "#E53935", marginTop: 8 },
});

export default commonStyles;

/** ====== Legacy alias (กันโค้ดเก่าพัง) ====== */
export const commandStyle = commonStyles; // เคย import {commandStyle}
export const METRICS = {
  spacing: SPACING,
  radius: RADII.base,
  radiusCapsule: RADII.capsule,
  inputFont: FONTS.input,
  labelFont: FONTS.labelFont,
  titleFont: FONTS.titleFont,
  splashFont: FONTS.splashFont,
  maxWidth: SIZES.maxWidth,
};
