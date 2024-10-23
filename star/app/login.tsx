import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import bcrypt from 'react-native-bcrypt';
import axios from 'axios';



const backEndURL = 'https://gentle-caverns-18774-60195da51722.herokuapp.com/login';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');
  const [hashedPasswords, setHashedPasswords] = useState('');


  const checkPassword = async() => {
    const options = {
      method: 'PUT',
      url: 'https://gentle-caverns-18774-60195da51722.herokuapp.com/users?user_id=4'
    }

    try {
      try {
      const response = await axios.request(options);
      setHashedPasswords(response.data);
        for (var i = 0; i < hashedPasswords.length; i++) {
          if (hashedPasswords[i].username == username) {
            setHashedPassword(hashedPasswords[i].password);
            console.log(hashedPassword);
            try {
            // TODO Compare password input with Hashed pasword to ensure they are correct
            // if not give error and dont allow login
            } catch(error){
              //error
            }
          }
        }
      } catch (error) {
        console.error('no user with this username');
      }
    } catch (error) {
      console.error('error getting hashed password');
    }
  };

  const handleLogin = async() => {
    const options = {
      method: 'PUT',
      url: backEndURL,
      params: {
        'username':username,
        'password':hashedPassword
      }
    };
    try{
        //TODO
    } catch(error) {
      
    }

  }


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
};
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