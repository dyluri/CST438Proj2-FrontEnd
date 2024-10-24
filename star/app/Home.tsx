import { Image, StyleSheet, View, Text} from 'react-native';

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      {/* Centered Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/Wishlistimage.png')}
          style={styles.image}
        />
      </View>

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
