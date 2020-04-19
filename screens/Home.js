import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, Alert } from "react-native";
import { Card, FAB } from "react-native-paper";

// import { data } from "../Data/dummyData";

const Home = ({ navigation }) => {
  // React hooks to set & update Data coming from Server and also load and update load state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //Refresh on screen pull
  const fetchData = () => {
    fetch("https://employee-app-server.herokuapp.com/api/employee/all")
      .then((res) => res.json())
      .then((results) => {
        setData(results);
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert("Somethiing went wrong");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Render data in Card List
  const renderDataList = (item) => {
    return (
      <Card
        style={styles.myCard}
        onPress={() => navigation.navigate("Profile", { item })}
      >
        <View style={styles.cardView}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 30 }}
            source={{
              uri: item.picture,
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.position} </Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderDataList(item);
        }}
        keyExtractor={(item) => `${item._id}`}
        onRefresh={() => fetchData()}
        refreshing={loading}
      />

      <FAB
        onPress={() => {
          navigation.navigate("Create");
        }}
        style={styles.fab}
        small={false}
        icon="plus"
        theme={{ colors: { accent: "#25D366" } }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  myCard: {
    margin: 5,
  },
  cardView: {
    flexDirection: "row",
    padding: 10,
  },
  text: {
    fontSize: 18,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;
