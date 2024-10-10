import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function AdminScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    // Basic validation to check if fields are empty
    if (!username || !password) {
      setErrorMessage('Both fields are required!');
    } else {
      setErrorMessage(''); // Clear any previous error message
      Alert.alert('Login Successful', `Welcome, ${username}!`);
      console.log('Login pressed:', { username, password });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>
      
      {/* Error message display */}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
});
