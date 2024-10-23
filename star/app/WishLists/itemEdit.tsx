import React, { useState } from 'react';
import { Item } from '@/components/Types';
import { Image, StyleSheet, TextInput, View, TouchableOpacity, Text, Alert, Button, StatusBar, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/*
    route.params = {
        listID = passed in number of current list being edited
        item = {
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
    const [listId] = useState(route.params.listId);
    const [item, setItem] = useState(route.params.item);
    const [quantity, setQuantity] = useState(item.quantity);


    const changeQuant = (num: number) => {
        if (quantity + num >= 0) {
            setQuantity(quantity + num);
        }
    }

    const handlePress = () => {
        Linking.openURL(item.item_url);
    };

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View >
                        <Button title='Back Button' onPress={() => navigator.navigate('item', { listId: listId })} color={"red"} />
                    </View>
                    <View style={{ padding: 5 }} />
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.itemCard}>
                    <View style={styles.topHalf}>
                        <View style={{flex: 1}}>
                            <Image source={{ uri: item.image_url }} style={styles.image} />
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
                    <Text style={styles.description}>{item.description}</Text>
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
                <View style={{padding:10}}>
                    <Button title='save' onPress={() => console.log("would save")}  />
                </View>
            </View>
        </View>
    );
}

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
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
});
