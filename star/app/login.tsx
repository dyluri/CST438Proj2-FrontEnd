import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import bcrypt from 'react-native-bcrypt';
import axios from 'axios';



const backEndURL = 'https://gentle-caverns-18774-60195da51722.herokuapp.com/login';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');
  React.useEffect(() => {
    axios.get(`${backEndURL}?username=${encodeURIComponent(username)}`).then((response) => {
      if(response.data && response.data.password){
        setHashedPassword(response.data.password);
        console.log('Fetched Hash', response.data.password);
      }else{
        console.log('User not found');
      }
    })
    .catch((error) =>{
      console.error('Error', error)
    });
  }, [username]);

  function handleLogin() {
    bcrypt.compare(password, hashedPassword, (err, match) => {
      if (err) {
        console.error('Error comparing passwords', err);
        return;
      }

      if (match) {
        console.log('Password match', match);
      } else {
        console.log('Password did not match');
      }
    });
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
