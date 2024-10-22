import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export default function ListScreen() {
  const user_id = 10; 
  const [listName, setListName] = useState('');
  const [lists, setLists] = useState([]);
  const [editingListId, setEditingListId] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false); 

  const handleCreateList = async () => {
    if (!listName.trim()) {
      Toast.show({ type: 'error', text1: 'List name is required' });
      return;
    }

    try {
      await axios.post('https://gentle-caverns-18774-60195da51722.herokuapp.com/lists/add', {
        list_name: listName,
        user_id: user_id,
      });
      Toast.show({ type: 'success', text1: 'List created successfully!' });
      setListName(''); 
      fetchLists(); 
    } catch (error) {
      console.error('Error creating list:', error);
      Toast.show({ type: 'error', text1: 'Failed to create list' });
    }
  };

  const handleDeleteList = async (list_id) => {
    try {
      await axios.delete('https://gentle-caverns-18774-60195da51722.herokuapp.com/lists/delete', {
        data: { list_id, user_id },
      });
      Toast.show({ type: 'success', text1: 'List deleted successfully!' });
      fetchLists(); 
    } catch (error) {
      console.error('Error deleting list:', error);
      Toast.show({ type: 'error', text1: 'Failed to delete list' });
    }
  };

  const handleEditList = async () => {
    if (!listName.trim()) {
      Toast.show({ type: 'error', text1: 'List name is required' });
      return;
    }

    try {
      await axios.put('https://gentle-caverns-18774-60195da51722.herokuapp.com/lists/edit', {
        list_id: editingListId,
        list_name: listName,
        user_id: user_id,
      });
      Toast.show({ type: 'success', text1: 'List updated successfully!' });
      setListName(''); 
      setEditingListId(null); 
      setModalVisible(false); 
      fetchLists(); 
    } catch (error) {
      console.error('Error updating list:', error);
      Toast.show({ type: 'error', text1: 'Failed to update list' });
    }
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

  useEffect(() => {
    fetchLists(); 
  }, []);

  const renderListItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.list_name}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {
          setEditingListId(item.list_id);
          setListName(item.list_name); 
          setModalVisible(true); 
        }} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteList(item.list_id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>
      </View>
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
      
      {/* Modal for edit */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit List Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new list name"
              value={listName}
              onChangeText={setListName}
            />
            <Button title="Save Changes" onPress={handleEditList} />
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
  editButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  editButtonText: {
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
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
