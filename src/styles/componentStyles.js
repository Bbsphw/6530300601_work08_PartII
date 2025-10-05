// src/styles/componentStyles.js
import { StyleSheet } from "react-native";
import { COLORS, FONTS, RADII } from "./commonStyles";

/**
 * สไตล์ของคอมโพเนนต์พื้นฐาน (แทน componentStyle เดิม)
 * - รวม textInput / button / link button / search bar / card
 * - ใส่ legacy alias ให้โค้ดเก่ายังใช้ได้
 */
const componentStyles = StyleSheet.create({
  /** INPUT */
  inputContainer: { width: "100%" },

  // อินพุตทรงเม็ดยา (pill)
  textInput: {
    backgroundColor: COLORS.pillBg,
    borderRadius: RADII.capsule,
    borderWidth: 1,
    borderColor: COLORS.pillBorder,
    paddingHorizontal: 14,
    height: 50,
    fontSize: FONTS.input,
    color: COLORS.black,
  },

  /** BUTTON */
  // ปุ่มเทาทรงเม็ดยา
  button: {
    backgroundColor: COLORS.button,
    borderRadius: RADII.capsule,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: FONTS.button,
    color: COLORS.buttonText,
    fontWeight: "400",
    includeFontPadding: false,
  },

  /** LINK BUTTON */
  linkButton: {
    backgroundColor: "transparent",
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  linkButtonText: {
    fontSize: 16,
    color: COLORS.link,
    textDecorationLine: "underline",
    fontWeight: "600",
  },

  /** SEARCH BAR */
  searchWrapper: { position: "relative", marginBottom: 12 },
  searchInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.pillBorder,
    borderRadius: RADII.capsule,
    paddingHorizontal: 16,
    paddingRight: 56,
    height: 50,
    fontSize: FONTS.input,
    color: COLORS.black,
  },
  iconButton: { position: "absolute", right: 10, top: 8, padding: 6 },

  /** CARD */
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.pillBorder,
    padding: 14,
    marginVertical: 6,
  },

  /** ====== Legacy mapping (รองรับโค้ดเก่า) ====== */
  // เดิมเคยใช้ชื่อ input
  input: {
    backgroundColor: COLORS.pillBg,
    color: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.pillBorder,
    borderRadius: RADII.capsule,
    paddingHorizontal: 14,
    height: 50,
    fontSize: FONTS.input,
  },

  // ปุ่มนูนเดิม (neumorphism) — map ให้ใช้ต่อได้
  btnOuter: { width: "100%", marginVertical: 8 },
  btnShadow: {
    backgroundColor: COLORS.btnBottom,
    borderRadius: RADII.capsule,
    paddingVertical: 14,
  },
  btnFace: {
    backgroundColor: COLORS.btnTop,
    borderRadius: RADII.capsule,
    paddingVertical: 14,
    marginTop: -14,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { fontSize: 18, fontWeight: "700", color: COLORS.text },
});

export default componentStyles;

/** ====== Legacy alias (กันโค้ดเก่าพัง) ====== */
export const componentStyle = componentStyles;
