import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const backEndURL = 'https://gentle-caverns-18774-60195da51722.herokuapp.com/login';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const storeUserID = async(userID: { toString: () => string; }) =>{
    try{
      await AsyncStorage.setItem('user_id', userID.toString());
      console.log('User ID Stored Succesfully;', userID)
    }catch(err){
      console.error('Failed To Store ID', err);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.put(
        `${backEndURL}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      );
      console.log(response.data.user_id);
      if (response.status == 200) {
        console.log('Login Successful')
      } else {
        console.log('Login Failed')
      }
    } catch (err) {
      console.error('Error during login:', err);
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
});

export default LoginScreen;