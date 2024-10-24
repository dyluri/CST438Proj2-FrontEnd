import { UserContext } from '@/components/Currentuser';
import React, { useContext, useState } from 'react';
import { Image, StyleSheet, TextInput, View, TouchableOpacity, Text, Alert } from 'react-native';

export default function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const {username, userId } = useContext(UserContext);

  console.log(username, userId);
  const handleSearch = () => {
    if (searchTerm.trim()) {
      console.log('Searching for:', searchTerm);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.adsTextTop}>Place ads here</Text>
      {/* Centered Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/Wishlistimage.png')}
          style={styles.image}
        />
      </View>

      {/* Centered Search Bar
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={searchTerm} 
          onChangeText={(text) => setSearchTerm(text)} 
        />
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity> */}

      {/* Place Ads Here Text */}
      <Text style={styles.adsText}>Place ads here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f5f5f5', 
  },
  imageContainer: {
    marginBottom: 20, 
  },
  image: {
    width: 290,
    height: 178,
    resizeMode: 'contain', 
  },
  searchContainer: {
    width: '80%', 
  },
  searchInput: {
    height: 50, 
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10, 
    paddingHorizontal: 15, 
    backgroundColor: '#fff', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, 
  },
  searchButton: {
    marginTop: 20, 
    backgroundColor: '#007BFF', 
    paddingVertical: 10, 
    paddingHorizontal: 40, 
    borderRadius: 10, 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  searchButtonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold', 
    textAlign: 'center', 
  },
  adsText: {
    position: 'absolute', 
    bottom: 20, 
    fontSize: 14, 
    color: '#888', 
    textAlign: 'center', 
  },
  
});
