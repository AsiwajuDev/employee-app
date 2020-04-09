import React from "react";
import { StyleSheet, Text, View, Image, Linking, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Card, Button } from "react-native-paper";
import { MaterialIcons, Entypo } from "@expo/vector-icons";

const Profile = () => {
  //Open phone dialer
  const openDialer = () => {
    if (Platform.OS === "android") {
      Linking.openURL("tel:08148072420");
    } else {
      Linking.openURL("telprompt:08148072420");
    }
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#0033ff", "#6bc1ff"]}
        style={{ height: "20%" }}
      />
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ width: 150, height: 150, borderRadius: 75, marginTop: -80 }}
          source={{
            uri:
              "https://images.unsplash.com/photo-1569466896818-335b1bedfcce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
          }}
        />
      </View>
      <View style={{ alignItems: "center", margin: 15 }}>
        <Title style={{ fontSize: 30 }}>Lanre Asiwaju</Title>
        <Text style={{ fontSize: 20, fontWeight: "300" }}>Web Developer</Text>
      </View>

      <Card
        style={styles.myCard}
        onPress={() => {
          Linking.openURL("mailto:someone@example.com");
        }}
      >
        <View style={styles.cardContent}>
          <MaterialIcons
            name="email"
            style={{ marginRight: 10 }}
            size={32}
            color="#006aff"
          />
          <Text style={styles.myText}>abc@abc.com</Text>
        </View>
      </Card>

      <Card style={styles.myCard} onPress={() => openDialer()}>
        <View style={styles.cardContent}>
          <Entypo
            name="phone"
            style={{ marginRight: 10 }}
            size={32}
            color="#006aff"
          />
          <Text style={styles.myText}>08148072420</Text>
        </View>
      </Card>

      <Card style={styles.myCard}>
        <View style={styles.cardContent}>
          <MaterialIcons
            name="attach-money"
            style={{ marginRight: 10 }}
            size={32}
            color="#006aff"
          />
          <Text style={styles.myText}>10,000</Text>
        </View>
      </Card>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
          margin: 50,
        }}
      >
        <Button
          icon="account-edit"
          mode="contained"
          theme={theme}
          onPress={() => console.log("Pressed")}
        >
          Edit Profile
        </Button>

        <Button
          icon="delete"
          theme={theme}
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          Fire Employee
        </Button>
      </View>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#006aff",
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  myCard: {
    margin: 3,
  },
  cardContent: {
    flexDirection: "row",
    padding: 10,
  },
  myText: {
    fontSize: 18,
    marginTop: 3,
    marginLeft: 5,
  },
});

export default Profile;
