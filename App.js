import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";

import Home from "./screens/Home";

export default function App() {
  return (
    <View style={styles.container}>
      <Home />
      {/* <Text>Welcome!</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    marginTop: Constants.statusBarHeight,
    // alignItems: "center",
    // flexDirection: "row",
    // justifyContent: "center",
  },
});
