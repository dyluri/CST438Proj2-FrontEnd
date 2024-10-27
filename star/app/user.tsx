import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Modal, Button, TextInput, FlatList, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import bcrypt from 'react-native-bcrypt';
import { UserContext } from '@/components/Currentuser';

export default function UserScreen() {
  const {userId, username, setUsername, setUserId} = useContext(UserContext);
  const [listData, setListData] = useState([]);
  const [modalOneVisible, setModalOneVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [hash, setHash] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');
  const [modalTwoVisible, setModalTwoVisible] = useState(false);
  const [warnings, setWarnings] = useState({ newUsernameT: '', newPasswordT: '', passwordT: '', generalT: ''});
  const buttons = [{ id: '1', text: 'Confirm', onPress: () => commitAction() }, { id: '2', text: 'Cancel', onPress: () => closeModal() }];
  // TODO: change user_id an username to dynamic from login

  const openModal = ( option ) => {
    if (option == 1) {
      setModalOneVisible(true);
    } else {
      setModalTwoVisible(true);
    }
  }

  const closeModal = () => {
    setWarnings({ newUsernameT: '', newPasswordT: '', passwordT: '', generalT: '' });
    setNewPassword('');
    setNewUsername('');
    setPassword('');
    if (modalOneVisible) {
      setModalOneVisible(false);
    } else {
      setModalTwoVisible(false);
    }
  }

  const logOut = async () => {
    const options = {
      method: 'PUT',
      url: 'https://gentle-caverns-18774-60195da51722.herokuapp.com/logout',
      params: {
        'username': username,
      }
    };
    try {
      const response = await axios.request(options);
      Toast.show({ type: 'success', text1: 'Logged Out' });
      setUsername('fail');
      setUserId(-1);
      closeModal();
    } catch (error) {
      console.error('Error loging out user:', error);
    }
  }

  const deleteUser = async () => {
    setWarnings({ ...warnings, passwordT: '' });
    if (password == '') {
      setWarnings({ ...warnings, passwordT: '*Password is required to delete user.' });
      return;
    }

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
      Toast.show({ type: 'success', text1: 'Account Deleted' });
      setUsername('fail');
      setUserId(-1);
      closeModal();
    } catch (error) {
      setWarnings({ ...warnings, passwordT: '*Incorrect Password.' });
      // console.error('Error deleting user:', error);
    }
  }

  const getHashPass = (newPassword) => {
    return new Promise((resolve, reject) => {
      const saltRounds = 10;
      bcrypt.hash(newPassword, saltRounds, (err, hashedPassword) => {
        if (err) {
          reject('Error hashing password: ' + err);
        } else {
          resolve(hashedPassword);
        }
      });
    });
  };  

  const updateUser = async () => {
    var pass = true;
    setWarnings({ newUsernameT: '', newPasswordT: '', passwordT: '', generalT: '' });
  
    if (newUsername == '' && newPassword == '') {
      setWarnings({ ...warnings, generalT: '*At least one field must be filled out(new username or new password)' });
      pass = false;
    }
  
    const params: { [key: string]: any } = {};
  
    if (newUsername != '') {
      if (newUsername.length > 3) {
        params['new_username'] = newUsername;
        setWarnings((prev) => ({ ...prev, newUsernameT: '' }));
        if (username == newUsername) {
          setWarnings((prev) => ({ ...prev, newUsernameT: '*Username needs to be different' }));
          pass = false;
        }
      } else {
        setWarnings((prev) => ({ ...prev, newUsernameT: '*Username too short' }));
        pass = false;
      }
    }
  
    if (newPassword != '') {
      if (newPassword.length > 3) {
        await getHashPass(newPassword).then((hashedPassword) => {
          setHash(hashedPassword);
        }).catch((error) => {
          console.error(error);
        });
        console.log(hash);
        params['new_password'] = hash;
        setWarnings((prev) => ({ ...prev, newPasswordT: '' }));
      } else {
        setWarnings((prev) => ({ ...prev, newPasswordT: '*Password too short' }));
        pass = false;
      }
    }
  
    if (password == '') {
      setWarnings((prev) => ({ ...prev, passwordT: '*Password is required to update user.' }));
      pass = false;
    }

    if (!pass) {
      return;
    }

    const options = {
      method: 'PUT',
      url: 'https://gentle-caverns-18774-60195da51722.herokuapp.com/users/update',
      params: {
        'username': username,
        'password': password,
        'new_username': params['new_username'],
        'new_password': params['new_password'],
      }
    };
    
    try {
      const response = await axios.request(options);
      if (newUsername != '') {
        setUsername(newUsername);
      }
      Toast.show({ type: 'success', text1: 'Profile updated succesfully' });
      closeModal();
    } catch (error) {
      if (error.response.status === 401) {
        setWarnings({ ...warnings, passwordT: '*Incorrect Password.' });
        return;
      }
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
                    'user_id': userId,
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
      <Text style={styles.text}>Hello, {username && username !== 'fail' ? username : "login to view profile"}</Text>

      <View style={styles.line} />
      
      {
        username !== 'fail' ? (
          <>
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
              )}
            </View>
            <View style={styles.line} />
            <View>
              <Text style={styles.subHeader}>Options</Text>
              <TouchableOpacity style={styles.buttons} onPress={() => openModal(1)}>
                <Text style={styles.buttonText}>Update Account</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttons} onPress={() => openModal(0)}>
                <Text style={styles.buttonText}>Delete Account</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttons} onPress={() => logOut()}>
                <Text style={styles.buttonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null
      }


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
            {warnings.newUsernameT ? <Text style={styles.errorText}>{warnings.newUsernameT}</Text> : null}
            <Text>Update Password (Optional)</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="New Password"
              placeholderTextColor="#888"
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
            {warnings.newPasswordT ? <Text style={styles.errorText}>{warnings.newPasswordT}</Text> : null}
            <Text>Confirmation Required</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Current Password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {warnings.passwordT ? <Text style={styles.errorText}>{warnings.passwordT}</Text> : null}
            {warnings.generalT ? <Text style={styles.errorText}>{warnings.generalT}</Text> : null}
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
            {warnings.passwordT ? <Text style={styles.errorText}>{warnings.passwordT}</Text> : null}
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
      <Toast/>
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
    textAlign: 'center'
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
    width: '80%',
    alignItems: 'center',
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
