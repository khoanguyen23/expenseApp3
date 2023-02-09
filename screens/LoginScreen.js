import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  KeyboardAvoidingView
  , Pressable 
} from "react-native";
import { Input, Button, Image, Text} from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const signIn = () => {
    if (email && setEmail) {
      setSubmitLoading(true);
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => clearInputFields())
        .catch((error) => alert(error.message) & setSubmitLoading(false));
    } else {
      alert("All fields are mandatory");
      setSubmitLoading(false);
    }
  };
  const clearInputFields = () => {
    alert("Successfully Logged in");
    navigation.replace("Home");
    setSubmitLoading(false);
    setEmail("");
    setPassword("");
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Loading...",
    });
    if (!loading) {
      navigation.setOptions({
        title: "Login",
      });
    }
  }, [navigation, loading]);

  return (
    <>
      {!loading ? (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <StatusBar style="light" />
          <Image
            source={{
              uri: "https://res.cloudinary.com/dc5xcbmvp/image/upload/v1675657593/upload/logo_ifv5gc.png?fbclid=IwAR03Q7fp1hFXBZylM5txwliy4mY0l54ibrN9LlBWGZzjJ6drW04KT7ZeKjU",
            }}
            style={{ width: 200, height: 200, marginBottom: 30 }}
          />
          <View style={styles.inputContainer}>
            {/* <Input
              type='email'
              placeholder='Email'
              value={email}
              onChangeText={(text) => setEmail(text)}
            /> */}
            <TextInput
              style={styles.box}
              name="email"
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            {/* <Input
              type='password'
              secureTextEntry
              placeholder='Password'
              value={password}
              onChangeText={(text) => setPassword(text)}
              onSubmitEditing={signIn}
            /> */}
            <TextInput
              style={styles.box}
              name="password"
              secureTextEntry
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              onSubmitEditing={signIn}
            />
          </View>
          {/* <Button
            loading={submitLoading}
            containerStyle={styles.buttonLogin}
            color="#00A86B"
            title='Login'
            onPress={signIn}
            type='outline'
          /> */}
          <Pressable style={styles.buttonLogin} onPress={signIn}>
            <Text style={styles.text} >Login</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate("Register")}>
            <Text style={styles.textRegister} >Register</Text>
          </Pressable>
          {/* <Button
            onPress={() => navigation.navigate("Register")}
            containerStyle={styles.button}
            title="Register"
            type="outline"
          /> */}
          <View style={{ height: 50 }}></View>
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.container}>
          <StatusBar style="light" />
          <Image
            source={{
              uri: "https://static-s.aa-cdn.net/img/gp/20600011886807/to-aGJ31KLwqc9AWaBUyL6NLbpFwN9VEliX7nQ_AU48aO4jH6M1MltWKmThWJPndJg=s300?v=1",
            }}
            style={{ width: 100, height: 100, marginBottom: 50 }}
          />
          <Text h4>Loading...</Text>
        </View>
      )}
    </>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
    padding: 10,
    paddingTop: 120,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 300,
    marginTop: 10,
    color: "#00A68B",
    borderColor: "#00A68B",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    // elevation: 3,
    // backgroundColor:'#f194ff',
  },
  buttonLogin: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#00A68B",
    width: 300,
  },
  inputField: {
    padding: 10,
    fontSize: 15,
    width: "90%",
  },
  box: {
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  textRegister: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#00A68B",
    textAlign: "center",
    borderColor: "#00A68B",
    borderStyle: "solid",
  },
});
