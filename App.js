import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore } from "redux";
import { Provider } from "react-redux";

//Import Redux Reducer
import { reducer } from "./Reducers/Reducers";

//Import Screen Components
import Home from "./screens/Home";
import CreateEmployee from "./screens/CreateEmployee";
import Profile from "./screens/Profile";

//Create Reducer Store
const store = createStore(reducer);

//Initialize CreateStackNavigator
const Stack = createStackNavigator();

const myOption = {
  title: "Employee List",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#25D366",
  },
};

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={myOption} />
        <Stack.Screen
          name="Create"
          component={CreateEmployee}
          options={{ ...myOption, title: "Create Employee" }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ ...myOption, title: "Employee Profile" }}
        />
      </Stack.Navigator>
    </View>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
  },
});
