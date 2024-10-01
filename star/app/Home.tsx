import React from 'react';
import { Image, StyleSheet, Platform, TextInput, View } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <ThemedView style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/Wishlistimage.png')}
            style={styles.image} // Apply the image style here
          />
        </ThemedView>
      }>
      {/* Centered Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#888" // Light gray color for placeholder
        />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center', // Center the image horizontally
    justifyContent: 'center', // Center the image vertically
    paddingTop: 20, // Add some padding at the top to ensure it's positioned correctly
  },
  image: {
    width: 290, // Set your desired width for the image
    height: 178, // Set your desired height for the image
    resizeMode: 'contain', // Make sure the image scales properly without background
  },
  searchContainer: {
    alignItems: 'center', // Center the search bar horizontally
    marginVertical: 20, // Add vertical margin for spacing
  },
  searchInput: {
    height: 40, // Height of the search bar
    width: '80%', // Width of the search bar, adjust as needed
    borderColor: 'gray', // Border color
    borderWidth: 1, // Border width
    borderRadius: 5, // Rounded corners
    paddingHorizontal: 10, // Padding inside the search bar
  },
});
