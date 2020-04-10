import React, { useState } from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import { TextInput, Button } from "react-native-paper";

const CreateEmployee = () => {
  //Form Hooks to Set Initial and Update Values
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [picture, setPicture] = useState("");
  const [modal, setModal] = useState(false);

  return (
    <View style={styles.root}>
      <TextInput
        label="Name"
        style={styles.inputStyle}
        value={name}
        theme={theme}
        mode="outlined"
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        label="Email"
        style={styles.inputStyle}
        keyboardType="email-address"
        value={email}
        theme={theme}
        mode="outlined"
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        label="Phone"
        style={styles.inputStyle}
        value={phone}
        theme={theme}
        keyboardType="number-pad"
        mode="outlined"
        onChangeText={(text) => setPhone(text)}
      />

      <TextInput
        label="Salary"
        style={styles.inputStyle}
        value={salary}
        theme={theme}
        mode="outlined"
        onChangeText={(text) => setSalary(text)}
      />

      <Button
        icon="upload"
        mode="contained"
        style={styles.inputStyle}
        onPress={() => setModal(true)}
        theme={theme}
      >
        Upload Image
      </Button>

      <Button
        icon="content-save"
        mode="contained"
        style={styles.inputStyle}
        onPress={() => console.log("Saved")}
        theme={theme}
      >
        Save
      </Button>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonView}>
            <Button
              icon="camera"
              mode="contained"
              onPress={() => console.log("Camera Button Clicked")}
              theme={theme}
            >
              Camera
            </Button>

            <Button
              icon="image-area"
              mode="contained"
              onPress={() => console.log("Gallery Button Clicked")}
              theme={theme}
            >
              Gallery
            </Button>
          </View>

          <Button
            icon="close"
            onPress={() => {
              setModal(false);
            }}
            theme={theme}
          >
            Cancel
          </Button>
        </View>
      </Modal>
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
  inputStyle: {
    margin: 5,
  },
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "#fff",
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default CreateEmployee;
