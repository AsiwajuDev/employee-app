import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { Card } from "react-native-paper";

const Home = () => {
  const data = [
    { id: 1, name: "Lanre", position: "Web Dev" },
    { id: 2, name: "Asiwaju", position: "Android Dev" },
    { id: 3, name: "Tokunbo", position: "ML Dev" },
    { id: 4, name: "Kazeem", position: "iOS Dev" },
  ];

  const renderDataList = (item) => {
    return (
      <Card style={styles.myCard}>
        <View style={styles.cardView}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 30 }}
            source={{
              uri:
                "https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=521&q=80",
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
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderDataList(item);
        }}
        keyExtractor={(item) => `${item.id}`}
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
    padding: 6,
  },
  text: {
    fontSize: 18,
  },
});

export default Home;
