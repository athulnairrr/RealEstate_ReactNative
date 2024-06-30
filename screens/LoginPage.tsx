import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Alert, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Firebase_auth } from '../components/Firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const auth = Firebase_auth;
  const navigation = useNavigation(); // Obtain navigation object

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      // Reset the navigation stack to have only the Home screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
    } catch (error) {
      console.log(error);
      Alert.alert('Sign-in Failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      Alert.alert('Check your email');
      // Reset the navigation stack to have only the Home screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
    } catch (error) {
      console.log(error);
      Alert.alert('Sign-up Failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <ImageBackground
    //   source={require('../assets/Home.jpg')}
    //   style={styles.backgroundImage}
    //   resizeMode="cover"
    // >
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            value={email}
            style={[styles.input, isEmailFocused && styles.inputFocused]}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
          />
          <TextInput
            secureTextEntry={true}
            value={password}
            style={[styles.input, isPasswordFocused && styles.inputFocused]}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View style = {styles.btnContainer}>
              <TouchableOpacity style={styles.btn} onPress={signIn}>
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={signUp}>
                <Text style={styles.btnText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAvoidingView>
      </View>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  btnContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 5,

  },
  btn: {
    width: '60%',
    padding: 20,
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 10,
    backgroundColor: '#F5F5DC', // Beige color
    borderWidth: 1,
    borderColor: 'black', // Border color
  },
  btnText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 3, // Adjust the value as needed
  },
  
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  inputFocused: {
    borderWidth: 1,
    borderColor: '#ee8456',
    borderRadius: 5,
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
});
