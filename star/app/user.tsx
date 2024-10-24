import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Button, TextInput, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';

export default function UserScreen() {
  const [listData, setListData] = useState([]);
  const [modalOneVisible, setModalOneVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');
  const [modalTwoVisible, setModalTwoVisible] = useState(false);
  const [warnings, setWarnings] = useState({ newUsername: '', newPassword: '', password: '', general: ''});
  const buttons = [{ id: '1', text: 'Confirm', onPress: () => commitAction() }, { id: '2', text: 'Cancel', onPress: () => closeModal() }];
  const url = 'https://gentle-caverns-18774-60195da51722.herokuapp.com/';
  // TODO: change user_id an username to dynamic from login
  const user_id = 27;
  const username = 'Pineapple';

  const openModal = ( option ) => {
    if (option == 1) {
      setModalOneVisible(true);
    } else {
      setModalTwoVisible(true);
    }
  }

  const closeModal = () => {
    setWarnings({ newUsername: '', newPassword: '', password: '', general: '' });
    if (modalOneVisible) {
      setModalOneVisible(false);
    } else {
      setModalTwoVisible(false);
    }
  }

  const deleteUser = async () => {
    if (password == '') {
      setWarnings({ ...warnings, password: '*Password is required to delete user.' });
      return;
    }
    setWarnings({ ...warnings, password: '' });

    const options = {
      method: 'DELETE',
      url: 'https://gentle-caverns-18774-60195da51722.herokuapp.com/logout',
      params: {
        'username': username,
        'password': password,
      }
    };
    try {
      const response = await axios.request(options);
      console.log('user deleted');
      closeModal();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  const updateUser = async () => {
    setWarnings({ newUsername: '', newPassword: '', password: '', general: '' });
  
    if (newUsername == '' && newPassword == '') {
      setWarnings({ ...warnings, general: '*At least one field must be filled out(new username or new password)' });
      return;
    }
  
    const params: { [key: string]: any } = {};
  
    if (newUsername != '') {
      if (newUsername.length > 3) {
        params['new_username'] = newUsername;
        setWarnings((prev) => ({ ...prev, newUsername: '' }));
      } else {
        setWarnings((prev) => ({ ...prev, newUsername: '*Username too short' }));
        return;
      }
    }
  
    if (newPassword != '') {
      if (newPassword.length > 3) {
        params['new_password'] = newPassword;
        setWarnings((prev) => ({ ...prev, newPassword: '' }));
      } else {
        setWarnings((prev) => ({ ...prev, newPassword: '*Password too short' }));
        return;
      }
    }
  
    if (password == '') {
      setWarnings((prev) => ({ ...prev, password: '*Password is required to update user.' }));
      return;
    }
  
    const options = {
      method: 'PUT',
      url: 'https://gentle-caverns-18774-60195da51722.herokuapp.com/users/update',
      params: {
        'username': username,
        'password': password,
        'new_username': params['new_username'] || '',
        'new_password': params['new_password'] || '',
      }
    };
  
    try {
      const response = await axios.request(options);
      console.log('user updated');
      closeModal();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }
  

  const commitAction = () => {
    if (newUsername.trim() == '') setNewUsername('');
    if (newPassword.trim() == '') setNewPassword('');

    if (modalOneVisible) {
      updateUser();
    } else {
      deleteUser();
    }
  }

  useEffect(() => {
        /*
        * Gets the users list form the database using our backend api
        */
        const fetchLists = async () => {
            const options = {
                method: 'GET',
                url: 'https://gentle-caverns-18774-60195da51722.herokuapp.com/lists',
                params: {
                    'user_id': user_id,
                }
            };
            try {
                const response = await axios.request(options);
                setListData(response.data || []);
            } catch (error) {
                console.error('Error fetching lists:', error);
            }
        };
        fetchLists();
  }, []);

  const renderLists = ({ item }) => (
    <View style={styles.listItem}>
        <Text> - {item.list_name}</Text>
    </View>
  );

  const renderButtons = ({ item }) => (
    <TouchableOpacity style={styles.buttons} onPress={item.onPress}>
      <Text style={styles.buttonText}>{item.text}</Text>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, {username}</Text>

      <View style={styles.line} />
      
      <Text style={styles.subHeader}>My Wishlists</Text>
      
      <View style={styles.whishlist}>
        {listData.length > 0 ? (
          <FlatList
            data={listData}
            renderItem={renderLists}
            keyExtractor={(item) => item.list_id.toString()}
            style={styles.flatList}
          />
          ) : (
            <View style={styles.listItem}>
              <Text>You don't have any lists</Text>
            </View>
          )
        }
      </View>

      <View style={styles.line} />

      <Text style={styles.subHeader}>Options</Text>
      <View>
        {/*edit to a button to pop up modal */}
        <TouchableOpacity style={styles.buttons} onPress={() => openModal(1)}>
                    <Text style={styles.buttonText}>Update Account</Text>
        </TouchableOpacity>
        {/*edit to a button to pop up modal */}
        <TouchableOpacity style={styles.buttons} onPress={() => openModal(0)}>
                    <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Updating Account */}
      <Modal
        visible={modalOneVisible}
        onRequestClose={closeModal}
        animationType='slide'
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.subHeader}>Update Account</Text>
            <Text>Update Username (Optional)</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="New Username"
              placeholderTextColor="#888"
              value={newUsername}
              onChangeText={(text) => setNewUsername(text)}
            />
            {warnings.newUsername ? <Text style={styles.errorText}>{warnings.newUsername}</Text> : null}
            <Text>Update Password (Optional)</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="New Password"
              placeholderTextColor="#888"
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
            {warnings.newPassword ? <Text style={styles.errorText}>{warnings.newPassword}</Text> : null}
            <Text>Confirmation Required</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Current Password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {warnings.password ? <Text style={styles.errorText}>{warnings.password}</Text> : null}
            {warnings.general ? <Text style={styles.errorText}>{warnings.general}</Text> : null}
            <FlatList
              data={buttons}
              renderItem={renderButtons}
              keyExtractor={(item) => item.id}
              style={styles.flatList}
              numColumns={2}
              columnWrapperStyle={styles.row}
            />
          </View>
        </View>
      </Modal>

      {/* Modal for Deleting Account */}
      <Modal
        visible={modalTwoVisible}
        onRequestClose={closeModal}
        animationType='slide'
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.subHeader}>Delete Account</Text>
            <Text>Confirmation Required</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {warnings.password ? <Text style={styles.errorText}>{warnings.password}</Text> : null}
            <FlatList
              data={buttons}
              renderItem={renderButtons}
              keyExtractor={(item) => item.id}
              style={styles.flatList}
              numColumns={2}
              columnWrapperStyle={styles.row}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  text: {
    fontSize: 30, 
    fontWeight: 'bold', 
  },
  subHeader: {
    fontSize: 18, 
    fontWeight: 'bold',
    margin: 5,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  inputBox: {
    height: 30,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttons: {
    backgroundColor: '#007BFF',
    marginVertical: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flatList: {
    flexGrow: 0,
    maxHeight: '50%',
  },
  whishlist: {
    height: '33%',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: '10%',
    backgroundColor: '#D3D3D3',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  line: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 10,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 10,
  }
});
