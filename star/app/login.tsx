import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import bcrypt from 'bcryptjs';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const user = 'dylan'
  const hashedPassword = '$2y$10$RIA6QIMAMN7oj0kk7gIILemhOobNlLFTY5gGgPxotkys5E1CbJ5GW';

  const handleLogin = async() => {
    if (username == user){
    const accepted = await bcrypt.compare(password, hashedPassword);
    
    if(accepted){
      console.log('Login Successful!');
    }
    else{
      console.log('Login Failed')
    }
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
