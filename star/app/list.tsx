import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList, TouchableOpacity, Modal, Image } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export default function ListScreen() {
  const user_id = 10; 
  const [listName, setListName] = useState('');
  const [lists, setLists] = useState([]);
  const [items, setItems] = useState([]); 
  const [editingListId, setEditingListId] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false);

  const handleCreateList = async () => {
  };

  const handleDeleteList = async (list_id) => {
  };

  const fetchLists = async () => {
    try {
      const response = await axios.get('https://gentle-caverns-18774-60195da51722.herokuapp.com/lists', {
        params: { user_id },
      });
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  const fetchItemsForList = async (list_id) => {
    try {
      const response = await axios.get(`https://gentle-caverns-18774-60195da51722.herokuapp.com/items`, {
        params: { list_id },
      });
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
      Toast.show({ type: 'error', text1: 'Failed to fetch items' });
    }
  };

  const openItemModal = (list_id) => {
    setEditingListId(list_id);
    fetchItemsForList(list_id); 
    setModalVisible(true); 
  };

  useEffect(() => {
    fetchLists(); 
  }, []);

  const renderListItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.list_name}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => openItemModal(item.list_id)} style={styles.viewItemsButton}>
          <Text style={styles.viewItemsButtonText}>View Items</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteList(item.list_id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  
  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.image_url }} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.item_name}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter list name"
        value={listName}
        onChangeText={setListName}
      />
      <Button title="Create List" onPress={handleCreateList} />
      <FlatList
        data={lists}
        keyExtractor={(item) => item.list_id.toString()}
        renderItem={renderListItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text>No lists available</Text>}
      />
      
      {/* Modal for viewing items */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.item_id.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.itemListContainer}
              ListEmptyComponent={<Text>No items available</Text>}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Toast />
    </View>
  );
}

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
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewItemsButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  viewItemsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  itemListContainer: {
    paddingBottom: 20,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    marginLeft: 'auto',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
