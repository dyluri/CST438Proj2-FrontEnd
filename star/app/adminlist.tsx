import React, { useContext, useState,useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { UserContext } from '@/components/Currentuser';
import axios from 'axios';

const backEndURL = 'https://gentle-caverns-18774-60195da51722.herokuapp.com/users';

const AdminList = ({ navigation }) => {
    const { username, userId } = useContext(UserContext);
    const [users, setUsers] = useState([]); 


    useEffect(() => {
        const fetchUsers = async () => {
            const options = {
                method: 'GET',
                url: backEndURL,
                params: { user_id: userId },
            };
            try {
                const response = await axios.request(options);
                setUsers(response.data || []);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };
        fetchUsers();
    }, []); 

    const renderUser = ({ item }) => (
        <View style={styles.userContainer}>
            <Text style={styles.userText}>ID: {item.user_id}</Text>
            <Text style={styles.userText}>Username: {item.username}</Text>
            <Text style={styles.userText}>Admin: {item.is_admin ? 'Yes' : 'No'}</Text>
        </View>
    );


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin User List</Text>
            {users.length > 0 ? (
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.user_id.toString()}
                    renderItem={renderUser}
                />
            ) : (
                <Text>No users found or you do not have admin permissions.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    userContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    userText: {
        fontSize: 16,
    },
});

export default AdminList;