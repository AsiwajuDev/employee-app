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

const CreateEmployee = ({ navigation, route }) => {
  //Get details to be Edited
  //Data is passed from route props in Profile page
  const getEditDetails = (type) => {
    if (route.params) {
      switch (type) {
        case "name":
          return route.params.name;
        case "phone":
          return route.params.phone;
        case "email":
          return route.params.email;
        case "salary":
          return route.params.salary;
        case "picture":
          return route.params.picture;
        case "position":
          return route.params.position;
      }
    }
    return "";
  };

  //Form Hooks to Set Initial and Update Values
  const [name, setName] = useState(getEditDetails("name"));
  const [phone, setPhone] = useState(getEditDetails("phone"));
  const [email, setEmail] = useState(getEditDetails("email"));
  const [salary, setSalary] = useState(getEditDetails("salary"));
  const [picture, setPicture] = useState(getEditDetails("picture"));
  const [position, setPosition] = useState(getEditDetails("position"));
  const [modal, setModal] = useState(false);

  //Used to set Keyboard view if needed
  const [enableShift, setEnableShift] = useState(false);

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

  //Method to Submit to Server
  const submitDetails = () => {
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
        navigation.navigate("Home");
        // Alert.alert("Pull screen to reload");
      })
      .catch((err) => {
        Alert.alert("Somethiing went wrong");
      });
  };

  const updateDetails = () => {
    fetch("https://employee-app-server.herokuapp.com/api/employee/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: route.params._id,
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
        Alert.alert(`${data.name} profile Updated`);
        navigation.navigate("Home");
        // Alert.alert("Pull screen to reload");
      })
      .catch((err) => {
        Alert.alert("Somethiing went wrong");
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
      })
      .catch((err) => {
        Alert.alert("Error uploading image");
      });
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={styles.root}
      enabled={enableShift}
    >
      <View>
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
          // onFocus={() => setEnableShift(true)}
          keyboardType="number-pad"
          mode="outlined"
          onChangeText={(text) => setSalary(text)}
        />

        <TextInput
          label="Position"
          style={styles.inputStyle}
          value={position}
          theme={theme}
          // onFocus={() => setEnableShift(true)}
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
        {route.params ? (
          <Button
            icon="content-save"
            mode="contained"
            style={styles.inputStyle}
            onPress={() => updateDetails()}
            theme={theme}
          >
            Update Employee Details
          </Button>
        ) : (
          <Button
            icon="content-save"
            mode="contained"
            style={styles.inputStyle}
            onPress={() => submitDetails()}
            theme={theme}
          >
            Save Employee Details
          </Button>
        )}

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
      </View>
    </KeyboardAvoidingView>
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
