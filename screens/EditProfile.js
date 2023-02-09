import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ToastAndroid,
  TextInput,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
// import ImagePicker from 'react-native-image-crop-picker';
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { auth, db } from '../firebase'

import firebase from 'firebase'

import { Avatar, ListItem } from "react-native-elements";

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { useScrollToTop } from "@react-navigation/native";

import { doc, getDoc, collection} from "firebase/firestore"; 


export default function EditProfileScreen({ navigation }) {
  //   const { name, accountName, profileImage } = route.params;
  const ToastMessenger = () => {
    ToastAndroid.show("Edit Successfully", ToastAndroid.SHORT);
  };
  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  // const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)
  // const [userData, setUserData] = useState(null);
  const user = auth.currentUser;
  // const {userId} = route.params


  // const getUser = async() => {
  //   const currentUser = await 
  //   db.collection('users')
  //   .doc(user.uid)
  //   .get()
  //   .then((documentSnapshot) => {
  //     if (documentSnapshot.exists) {
  //       console.log('User Data', documentSnapshot.data());
  //       setUserData(documentSnapshot.data())

  //     }
  //   })

  // }
  // useEffect(() => {
  //   const unsubscribe = db
  //     .collection('users')
  //     .doc('J05Nom2GmUuBcShx9NCv')
  //     .onSnapshot(
  //       (documentSnapshot) =>
  //         setFullName(documentSnapshot.data()?.displayName) &
  //         setEmail(documentSnapshot.data()?.email) 
  //     )
  //   return unsubscribe
  // }, [])

  useEffect (() => {
    const getUser = async () => {
      // const docRef = collection('users')
      // const snapshots = await getDoc(docRef)
      // const docs = snapshots.docs.map((doc)=> doc.data()) 
      // const docSnap = await getDoc(docRef);
      // const docRef = doc(db, "users", "J05Nom2GmUuBcShx9NCv");
      // const docSnap = await getDoc(docRef)
      const citiesRef = db.collection('users');
      const snapshot = await citiesRef.get();
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        setFullName(user.displayName)
        setEmail(user.email)
      }); 
    }
      getUser();  
  }, []);

  // const updateProfile = async () => {
  //   const docRef = doc(db, "users", user.uid);
  //   await updateDoc(docRef, {
  //     displayName:fullName,
  //     email:email,
  //   })
  //   .then(()=>{
  //     alert("Your profile is updated");
  //   })
  // }

  // const getUser = async() => {
  //   const currentUser = await db
  //   .collection('users')
  //   .doc(user.uid)
  //   .get()
  //   .then((documentSnapshot) => {
  //     if( documentSnapshot.exists ) {
  //       console.log('User Data', documentSnapshot.data());
  //       setUserData(documentSnapshot.data());
  //     }
  //   })
  // }
    //  const docRef = doc(db, "users", "J05Nom2GmUuBcShx9NCv");
    //   const docSnap = await getDoc(docRef);
  // const q = query(collection(db, "users"), where(""))


  // const updateUser = () => {
  //   (async() => {
  //     const citiesRef = db.collection('users');
  //     const snapshot = await citiesRef.get();
  //     const userID = snapshot.doc.id
  //   db.collection("users")
  //   .doc(YpJfhbhAIpXswEjV9lbJ)
  //   .update({
  //     email:email,
  //     displayName:fullName,
  //   })
  //   .then(() => {
  //     console.log('User Updated!');
  //     Alert.alert(
  //       'Profile Updated!',
  //       'Your profile has been updated successfully.'
  //     );
  //   })
  //   })
    
  //     // setSubmitLoading(true)
  //     // db.collection('users')
  //     //   .doc(auth.currentUser.uid)
  //     //   .update({
  //     //     displayName: fullName,
  //     //     email: email,
  //     //   })
  //     //   .then(() => {
  //     //     alert("Your profile is updated");
  //     //   })
  //     // .then(() => clearInputFields())
  //     // .catch((error) => alert(error.message))
    
  //   // else {
  //   //   setSubmitLoading(false)
  //   //   alert('All fields are mandatory')
  //   // }
  // }

  const updateUser1 = () => {
    if (fullName && email) {
      setSubmitLoading(true)
      db.collection('users')
        .doc('YpJfhbhAIpXswEjV9lbJ')
        .update({
          email: email,
          displayName: fullName,
          
        })
        .then(() => clearInputFields())
        .catch((error) => alert(error.message))
    } else {
      setSubmitLoading(false)
      alert('All fields are mandatory')
    }
  }

  const clearInputFields = () => {
    alert('Updated Successfully')
    setEmail('')
    setFullName('')
    navigation.goBack()
    setSubmitLoading(false)
  }
  // const clearInputFields = () => {
  //   alert('Updated Successfully')
  //   setFullName('')
  //   setEmail('')
  //   navigation.goBack()
  //   setSubmitLoading(false)
  // }


  // useEffect( () =>{
  //   getUser();
  // }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageUrl(result.assets[0].uri)
    }
  };
  // useEffect(() => {
  //   const unsubscribe = db
  //     .collection('users')
  //     .doc(itemId)
  //     .onSnapshot(
  //       (snapshot) =>
  //         setFullName(snapshot.data()?.displayName) &
  //         setEmail(snapshot.data()?.email) &
  //         setImageUrl(snapshot.data()?.photoURL)
  //     )
  //   return unsubscribe
  // }, [])
  // const updateProfile = () => {
  //   if (fullName && email && imageUrl ) {
  //     setSubmitLoading(true)
  //     db.collection('users')
  //       .doc(itemId)
  //       .update({
  //         displayName:fullName,
  //         email:email,
  //         photoURL:imageUrl,
  //       })
  //       .then(() => clearInputFields())
  //       .catch((error) => alert(error.message))
  //   } else {
  //     setSubmitLoading(false)
  //     alert('All fields are mandatory')
  //   }
  // }
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  }

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );


  const bs = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.top}>
        <BottomSheet
          ref={bs}
          snapPoints={[330, 0]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />
        <Animated.View style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>

          {/* <Text style={{fontsize: 16, fontWeight: 'bold'}}>Edit Profile</Text>
        <TouchableOpacity onPress={() => {
          ToastMessenger();
          navigation.goBack()}}>
          <MaterialIcons name="done" size={24} color="green" />
        </TouchableOpacity> */}
          <View style={{ padding: 20, alignItems: "center" }}>
            <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
              <View style={{ paddingTop: 10 }}>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                <Avatar
                  style={{ height: 200, width: 200, paddingTop: 20 }}
                  size="medium"
                  rounded
                  source={{
                    uri: auth?.currentUser?.photoURL,
                  }}
                />

                <Text onPress={pickImage} style={{ color: "#00A86B" }}>
                  Change profile photo
                </Text>

              </View>
            </TouchableOpacity>

          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <View style={{ padding: 10 }}>
              {/* <Text
              style={{
                opacity: 0.5,
              }}
            >
              Name
            </Text> */}
              <TextInput
                style={{
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderColor: "#CDCDCD",
                  paddingTop: 5,
                }}
                label="name"
                onChangeText={(text) => setFullName(text)}
                placeholder="your name"
                value={fullName}
              />
            </View>

            <View style={{ padding: 10 }}>
              {/* <Text
                style={{
                  opacity: 0.5,
                }}
              >
                Username
              </Text> */}
              <TextInput
                placeholder='email'
                label="email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                //   defaultValue={accountName}
                style={{
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderColor: "#CDCDCD",
                  paddingTop: 5,
                }}
              />
            </View>

            <View style={{ padding: 10 }}>
              {/* <Text
                style={{
                  opacity: 0.5,
                }}
              >
                Phone Number
              </Text> */}
              {/* <TextInput
                placeholder="phonenumber"
                style={{
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderColor: "#CDCDCD",
                  paddingTop: 5,
                }}
              /> */}
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end", paddingTop: 20 }}>
            {/* <Button
              title="Done"
             
              onPress={updateUser}
              color="#00A86B"
            /> */}


            <TouchableOpacity style={{ backgroundColor: 'green', height: 50, margin: 20, justifyContent: 'center', alignItems: 'center', }}
              onPress={() => updateUser1()}>
              <Text style={{ color: 'white' }}>updateProfile</Text>

            </TouchableOpacity>

          </View>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="cancel" size={24} color="black" />
        <Text>Cancel Edit</Text>
        </TouchableOpacity> */}

        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  top: {
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
    width: '100%',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#2e64e5',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});