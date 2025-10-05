// src/navigation/DrawerNavigator.js
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { getHeaderTitle } from "@react-navigation/elements";

import ProfileScreen from "../screens/ProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import FriendScreen from "../screens/FriendScreen";

import { COLORS, IMAGES } from "../styles/commonStyles";

const WIDTH = Dimensions.get("screen").width;
const Drawer = createDrawerNavigator();

/** ---------- Custom Header ---------- */
const CustomHeaderBar = (props) => {
  const { navigation, route, options } = props;
  const title = getHeaderTitle(options, route.name);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={styles.headerStyle}
        accessibilityRole="button"
        accessibilityLabel="Open navigation menu"
      >
        <AntDesign name="menu" size={24} color={COLORS.primaryTextOn} />
        <Text style={styles.headerTitleStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

/** ---------- Custom Drawer Content ---------- */
const CustomDrawerContent = (props) => {
  // คำนวนขนาดโลโก้ตามความกว้างของ drawer
  const width = parseInt(
    (props?.state?.routes?.length ? props : null) &&
      (props?.descriptors?.[props.state.routes[0].key]?.options?.drawerStyle
        ?.width ||
        WIDTH * 0.4)
  );
  const logoSize = parseInt((width || WIDTH * 0.4) * 0.5);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.logoBox}>
        <Image
          source={{ uri: IMAGES.logo }}
          style={{ width: logoSize, height: logoSize }}
          resizeMode="contain"
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="Profile"
      backBehavior="history"
      screenOptions={{
        header: (p) => <CustomHeaderBar {...p} />,
        drawerStyle: styles.drawerStyle,
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: "rgba(0,0,0,0.65)",
        drawerActiveBackgroundColor: "rgba(46,125,50,0.12)",
        drawerLabelStyle: styles.drawerLabelStyle,
      }}
      drawerContent={(p) => <CustomDrawerContent {...p} />}
    >
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          drawerIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          title: "Change password",
          drawerIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "key" : "key-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Friend"
        component={FriendScreen}
        options={{
          title: "My friends",
          drawerIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "heart" : "heart-outline"} // หรือ "people-outline" ตามชอบ
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  // Header
  headerContainer: {
    backgroundColor: COLORS.primary,
  },
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  headerTitleStyle: {
    color: COLORS.primaryTextOn,
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 12,
  },

  // Drawer
  drawerStyle: {
    backgroundColor: "#F9FAF7",
    width: parseInt(WIDTH * 0.6),
  },
  drawerLabelStyle: {
    fontSize: 16,
    fontWeight: "700",
  },

  // Logo
  logoBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.08)",
    marginBottom: 6,
  },
});
