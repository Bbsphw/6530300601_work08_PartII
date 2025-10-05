// src/screens/FriendScreen.js
import React, { useEffect, useState } from "react";
import { View, TextInput, FlatList, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import cm, { COLORS } from "../styles/commonStyles";
import cs from "../styles/componentStyles";
import FriendCard from "../components/FriendCard";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  listFriends,
  searchByEmail,
  addFriend,
  clearFound,
} from "../store/slices/friendsSlice";
import { selectFriendItems } from "../store/selectors";
import { AuthService } from "../services/authService";

export default function FriendScreen() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const items = useSelector(selectFriendItems);

  useEffect(() => {
    dispatch(listFriends());
  }, [dispatch]);

  const onAdd = async () => {
    const input = search.trim().toLowerCase();
    if (!input) return;

    const me = AuthService.currentUser();
    if (me && me.email && me.email.toLowerCase() === input) {
      Alert.alert("Oops", "You cannot add yourself.");
      setSearch("");
      return;
    }

    const res = await dispatch(searchByEmail(input));
    if (res.meta.requestStatus === "rejected") {
      Alert.alert("Not found", "No user with this email.");
      setSearch("");
      return;
    }

    const uid = res.payload.uid;
    const addRes = await dispatch(addFriend(uid));
    if (addRes.meta.requestStatus === "rejected") {
      Alert.alert(
        "Cannot add",
        String(addRes.payload || "Failed to add friend.")
      );
    }
    dispatch(clearFound());
    setSearch("");
  };

  return (
    <SafeAreaView style={cm.screen}>
      <View style={cm.container}>
        <View style={cs.searchWrapper}>
          <TextInput
            style={cs.searchInput}
            placeholder="friend email"
            placeholderTextColor={COLORS.textMuted}
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={onAdd}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <Pressable
            onPress={onAdd}
            style={cs.iconButton}
            accessibilityLabel="add-circle"
          >
            <Ionicons name="add-circle" size={28} color={COLORS.text} />
          </Pressable>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => <FriendCard friend={item} />}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>
    </SafeAreaView>
  );
}
