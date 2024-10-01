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
            style={styles.image} 
          />
        </ThemedView>
      }>
      {}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#888"
        />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingTop: 20, 
  },
  image: {
    width: 290, 
    height: 178, 
    resizeMode: 'contain', 
  },
  searchContainer: {
    alignItems: 'center', 
    marginVertical: 20,
  },
  searchInput: {
    height: 40,
    width: '80%', 
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 5, 
    paddingHorizontal: 10, 
  },
});
