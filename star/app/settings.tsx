import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import bcrypt from 'react-native-bcrypt';


const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const backEndURL = 'https://gentle-caverns-18774-60195da51722.herokuapp.com/newuser';

  const handleLogin = async () => {
    try {
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password:', err);
          return;
        }

        const requestUrl = `${backEndURL}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(hashedPassword)}`;
        const response = await fetch(requestUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: hashedPassword,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Registration successful', data);
        } else {
          console.log('Registration failed');
        }
      });
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