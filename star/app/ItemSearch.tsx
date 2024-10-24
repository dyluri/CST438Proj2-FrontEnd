import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, FlatList, TextInput, TouchableOpacity, Modal, Button } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const ItemSearch = () => {
    const user_id = 10; // TODO: Fetch current user ID dynamically
    const x_apiKey = 'I3LhyAtcw7WM4WpBJpDvbjuMza3S5I7V';
    const [searchTerm, setSearchTerm] = useState('');
    const [itemData, setItemData] = useState([]);
    const [listData, setListData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (item) => {
        setSelectedItem(item);
        getDescription(item);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
    };

    /*
    *   Uses the amazon keyword search API to lookup
    *   products that fit the 'keyword'
    */
    const handleSearch = async () => {
        if (searchTerm.trim()) {
            const options = {
                method: 'GET',
                url: 'https://get.scrapehero.com/amz/keyword-search/',
                params: {
                    'x-api-key': x_apiKey,
                    'keyword': searchTerm,
                    'country_code': 'US',
                }
            };
            try {
                const response = await axios.request(options);
                setItemData(response.data.search_results || []);
            } catch (error) {
                Toast.show({ type: 'error', text1: 'No Items Found' });
                console.log('Error fetching data:', error);
            }
        }
    };

    

    /*
    *   Uses the amazon product details API to get an
    *   items description. This is because the keyword api
    *   does not get the items description. also might slow down the progress.
    */
    const getDescription = async (item) => {
        const options = {
            method: 'GET',
            url: 'https://get.scrapehero.com/amz/product-details/',
            params: {
                'x-api-key': x_apiKey,
                'asin': item.asin,
            }
        };
        try {
            const response = await axios.request(options);
            return response.data.small_description;
        } catch (error) {
            console.error('Error fetching description:', error);
            return '';
        }
    };
    
    /*
    *   Handles the action of adding the item to a users
    *   wishlist.
    */
    const handleAddItem = async (list, item) => {
        const itemDescription = await getDescription(item);

        closeModal();
        
        if (!selectedItem) return; // Check if selectedItem is valid
        const truncatedName = item.name.length > 64 ? item.name.slice(0, 61) + '...' : item.name;
        const url = 'https://gentle-caverns-18774-60195da51722.herokuapp.com/items';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    item_name: truncatedName,
                    list_id: list.list_id,
                    item_url: item.product_url,
                    image_url: item.image_url,
                    price: parseInt(item.sale_price),
                    quantity: 1,
                    description: itemDescription,
                }),
            });
    
            const data = await response.json();
            //console.log('Item added:', data);
            closeModal();
            Toast.show({type: 'error', text1: "Item added to list"});
        } catch (error) {
            Toast.show({type: 'error', text1: "Error adding Item to list"});
            console.error('Error:', error);
        }
    };

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

    // Use useFocusEffect to fetch lists whenever the screen is focused
    useFocusEffect(
        React.useCallback(() => {
            fetchLists();
        }, [])
    );

    

    const renderItem = ({ item }) => (
        <View style={styles.itemBox}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <Text style={styles.itemName}> {item.name.slice(0, 30) + (item.name.length > 30 ? '...' : '')} </Text>
            <Button title="Add to List" onPress={() => openModal(item)} />
        </View>
    );

    const renderLists = ({ item }) => (
        <View style={styles.listItem}>
            <Text>{item.list_name}</Text>
            <Button title="ADD" onPress={() => handleAddItem(item,selectedItem)} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Item Search</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor="#888"
                    value={searchTerm}
                    onChangeText={(text) => setSearchTerm(text)}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
            {itemData.length > 0 ? (
                <FlatList
                    data={itemData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.asin}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                />
            ) : (
                <Text></Text>
            )}
            <Modal
                visible={modalVisible}
                onRequestClose={closeModal}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            Add {selectedItem?.name.slice(0, 20) + (selectedItem?.name.length > 20 ? '...' : '')} to:
                        </Text>
                        {listData.length > 0 ? (
                            <FlatList
                                data={listData}
                                renderItem={renderLists}
                                keyExtractor={(item) => item.list_id.toString()}
                            />
                        ) : (
                            <Text>You don't have any lists</Text>
                        )}
                        <Button title="Close" onPress={closeModal} />
                    </View>
                </View>
            </Modal>
            <Toast/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    searchContainer: {
        width: '90%',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchInput: {
        height: 50,
        width: '70%',
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
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 5,
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemBox: {
        flex: 1,
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    itemName: {
        fontSize: 16,
        textAlign: 'center',
    },
    row: {
        flex: 1,
        justifyContent: 'space-around',
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
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default ItemSearch;
