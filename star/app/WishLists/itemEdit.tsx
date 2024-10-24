import React, { useState } from 'react';
import { Item } from '@/components/Types';
import { Image, StyleSheet, TextInput, View, TouchableOpacity, Text, Alert, Button, StatusBar, Linking, Modal, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

/*
    route.params = {
        listID = passed in number of current list being edited
        item = {
            item_id: number;
            item_name: string;
            list_id: number;
            item_url: string;
            image_url: string;
            price: number;
            quantity: number;
            description: string;
        }
    }

*/

export default function DetailsScreen({ route, navigation }) {
    const navigator = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    const [listId] = useState(route.params.listId);
    const [item, setItem] = useState(route.params.item);
    const [quantity, setQuantity] = useState(item.quantity);
    const [description, setDescription] = useState(item.description);
    const [imageUrl, setImageUrl] = useState(item.image_url);
    const [itemUrl, setItemUrl] = useState(item.item_url);
    const [currentMod, setCurrentMod] = useState('');
    const [loading, setLoading] = useState(false);

    const saveItemToList = async () => {
        console.log("started");
        const url = `https://gentle-caverns-18774-60195da51722.herokuapp.com/items`;
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    item_id: item.item_id,
                    item_url: itemUrl,
                    image_url: imageUrl,
                    description: description,
                    quantity: quantity,
                }),
            });

            const data = await response.json();
            console.log(data);
            Toast.show({ type: 'error', text1: "Item has been updated!" });
        } catch (error) {
            Toast.show({ type: 'error', text1: "Error updating item" });
            console.error('Error:', error);
        } finally {
            navigator.navigate('item', {listId: listId});
        }
    };

    const changeQuant = (num: number) => {
        if (quantity + num >= 0) {
            setQuantity(quantity + num);
        }
    }

    const handlePress = () => {
        Linking.openURL(itemUrl);
    };

    const closeModal = () => {
        setModalVisible(false);
    }

    const openModal = (content: string) => {
        setCurrentMod(content);
        setModalVisible(true);
    }

    const renderItem = () => {
        if (currentMod == 'Product_Url') {
            return (
            <TextInput
                style={[styles.input, styles.inputText]}
                placeholder={itemUrl}
                value={itemUrl}
                onChangeText={setItemUrl}
                multiline={true}
            />
            )
        }
        if (currentMod == 'Description') {
            return (
                <TextInput
                    style={[styles.input, styles.inputText]}
                    placeholder={description}
                    value={description}
                    onChangeText={setDescription}
                    multiline={true}
                />
            );
        }
        console.log(currentMod);

        if (currentMod == 'Image_Url') {
            return (
            <TextInput
                style={[styles.input, styles.inputText]}
                placeholder={imageUrl}
                value={imageUrl}
                onChangeText={setImageUrl}
                multiline={true}
            />
            )
        }
        return(
            <View><Text>Fail</Text></View>
        );
    }

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View >
                        <Button title='Cancel' onPress={() => navigator.navigate('item', { listId: listId })} color={"red"} />
                    </View>
                    <View style={{ padding: 5 }} />
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.itemCard}>
                    <View style={styles.topHalf}>
                        <View style={{flex: 1}}>
                            <Image source={{ uri: imageUrl }} style={styles.image} />
                        </View>
                        <View style={styles.details}>
                            <TouchableOpacity onPress={handlePress}>
                                <Text style={styles.itemName}>{item.item_name}</Text>
                            </TouchableOpacity>
                            <Text style={styles.price}>Price: ${item.price}</Text>
                            <Text style={styles.quantity}>Date Added: {item.date}</Text>
                            <Text style={styles.quantity}>Total Cost: ${(item.price * quantity).toFixed(2)}</Text>
                        </View>
                    </View>
                    <Text style={styles.description}>{description}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", }}>
                    <View style={{ flex: 1}}>
                        <Button title='-' onPress={() => changeQuant(-1)} color={"red"} />
                    </View>
                    <Text style={{ flex: 2, textAlign: 'center', fontSize: 25 }}>{quantity}</Text>
                    <View style={{ flex: 1 }}>
                        <Button title='+' onPress={() => changeQuant(1)} color={"green"} />
                    </View>
                </View>

                <View style={{ padding: 10, flexDirection: 'row'}}>
                    <View style={{ flex: 1, marginHorizontal: 2 }}>
                        <Button title='Change Image Url' onPress={() => openModal('Image_Url')} />
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 2 }}>
                        <Button title='Change Product Url' onPress={() => openModal('Product_Url')} />
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 2 }}>
                        <Button title='Change Description' onPress={() => openModal('Description')} />
                    </View>
                </View> 
                <View style={{ padding: 10 }}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <Button title="save" onPress={saveItemToList} />
                    )}
                </View>
            </View>
            <Modal
                visible={isModalVisible}
                animationType='slide'
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Editing: {currentMod} </Text>
                        {renderItem()}
                        <Button title="Save" onPress={closeModal}/>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        marginHorizontal: 10,
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight,
        padding: 10,
    },
    imageContainer: {
        marginBottom: 20,
    },
    image: {
        width: 150,
        height: 178,
        resizeMode: 'contain',
    },
    itemCard: {
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        width: width - 30,
    },
    topHalf: {
        display: "flex",
        flexDirection: "row",
    },
    details: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 5,
    },
    price: {
        fontSize: 14,
        color: '#333',
    },
    quantity: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    description: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        width: '100%',
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        color: 'black',
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    inputText: {
        color: 'black',
    },
});
