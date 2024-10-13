import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import bcrypt from 'react-native-bcrypt';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const backEndURL = ' https://gentle-caverns-18774-60195da51722.herokuapp.com/newuser'
  const handleLogin = async() => {
    try {
      
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // i need to replace placeholder, username and password 
      const requestUrl = `${backEndURL}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(hashedPassword)}`;

      const response = await fetch(backEndURL, {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: hashedPassword, 
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
      } else {
        console.log('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>sign up</Text>
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
      <Button title="Sign up" onPress={handleLogin} />
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

export default LoginScreen;