// App.js

import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/store";
import StackNavigator from "./src/navigation/StackNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StackNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}
