import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const CreateEmployee = (navigation) => {
  //Form Hooks to Set Initial and Update Values
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [picture, setPicture] = useState("");
  const [position, setPosition] = useState("");
  const [modal, setModal] = useState(false);

  //Methid to Access Gallery
  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };

        handleUpload(newFile);
      }
    } else {
      Alert.alert("You need to give up permission to work");
      navigation.navigate("Home");
    }
  };

  //Method to Access camera
  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);

    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };

        handleUpload(newFile);
      }
    } else {
      Alert.alert("You need to give up permission to work");
    }
  };

  //Method to Submit
  const submitData = () => {
    fetch("https://employee-app-server.herokuapp.com/api/employee/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        salary,
        picture,
        position,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.name} saved`);
      });
  };

  //Method to Upload Image to Cloudinary
  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "employeeApp");
    data.append("cloud_name", "asiwajudev");

    fetch("https://api.cloudinary.com/v1_1/asiwajudev/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPicture(data.url);
        setModal(false);
      });
  };

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView>
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

        <TextInput
          label="Position"
          style={styles.inputStyle}
          value={position}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setPosition(text)}
        />

        <Button
          icon={picture == "" ? "upload" : "check"}
          mode="contained"
          style={styles.inputStyle}
          onPress={() => setModal(true)}
          theme={theme}
        >
          {picture == "" ? "Upload Image" : "Upload Completed"}
        </Button>

        <Button
          icon="content-save"
          mode="contained"
          style={styles.inputStyle}
          onPress={() => submitData()}
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
                onPress={() => pickFromCamera()}
                theme={theme}
              >
                Camera
              </Button>

              <Button
                icon="image-area"
                mode="contained"
                onPress={() => pickFromGallery()}
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
      </KeyboardAvoidingView>
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
