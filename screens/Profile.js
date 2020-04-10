import React from "react";
import { StyleSheet, Text, View, Image, Linking, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Card, Button } from "react-native-paper";
import { MaterialIcons, Entypo } from "@expo/vector-icons";

const Profile = (props) => {
  const {
    id,
    name,
    picture,
    phone,
    salary,
    email,
    position,
  } = props.route.params.item;

  //Open phone dialer
  const openDialer = () => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${phone}`);
    } else {
      Linking.openURL(`telprompt:${phone}`);
    }
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#00E676", "#1EBEA5"]}
        style={{ height: "20%" }}
      />
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ width: 150, height: 150, borderRadius: 75, marginTop: -80 }}
          source={{
            uri: picture,
          }}
        />
      </View>
      <View style={{ alignItems: "center", margin: 15 }}>
        <Title style={{ fontSize: 30 }}>{name}</Title>
        <Text style={{ fontSize: 20, fontWeight: "300" }}>{position}</Text>
      </View>

      <Card
        style={styles.myCard}
        onPress={() => {
          Linking.openURL(`mailto:${email}`);
        }}
      >
        <View style={styles.cardContent}>
          <MaterialIcons
            name="email"
            style={{ marginRight: 10 }}
            size={32}
            color="#25D366"
          />
          <Text style={styles.myText}>{email}</Text>
        </View>
      </Card>

      <Card style={styles.myCard} onPress={() => openDialer()}>
        <View style={styles.cardContent}>
          <Entypo
            name="phone"
            style={{ marginRight: 10 }}
            size={32}
            color="#25D366"
          />
          <Text style={styles.myText}>{phone}</Text>
        </View>
      </Card>

      <Card style={styles.myCard}>
        <View style={styles.cardContent}>
          <MaterialIcons
            name="attach-money"
            style={{ marginRight: 10 }}
            size={32}
            color="#25D366"
          />
          <Text style={styles.myText}>{salary}</Text>
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
    primary: "#25D366",
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
