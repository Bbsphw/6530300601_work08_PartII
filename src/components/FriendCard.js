// src/components/FriendCard.js
import React from "react";
import { View, Text, Image } from "react-native";
import cs from "../styles/componentStyles";
import { COLORS } from "../styles/commonStyles";

export default function FriendCard({ friend }) {
  return (
    <View style={cs.card}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{
            uri: friend?.photoURL || "https://i.ibb.co/yyzQ43h/KU-Logo-PNG.png",
          }}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            marginRight: 12,
            backgroundColor: "#eee",
          }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontWeight: "700", fontSize: 16, color: COLORS.black }}
          >
            {friend?.displayName || "-"}
          </Text>
          <Text style={{ color: "rgba(0,0,0,0.6)", marginTop: 2 }}>
            {friend?.email || "-"}
          </Text>
          {!!friend?.studentId && (
            <Text style={{ color: "rgba(0,0,0,0.6)", marginTop: 2 }}>
              {friend.studentId}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
