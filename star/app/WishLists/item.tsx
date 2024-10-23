import React, { useCallback, useEffect, useState } from 'react';
import { Item } from '@/components/Types';
import { Image, StyleSheet, TextInput, View, TouchableOpacity, Text, Alert, Button, StatusBar, ActivityIndicator, ScrollView, FlatList, Dimensions, Linking } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';


const { width } = Dimensions.get('window');

/*
    route.params = {
        listId = passed in number of current list being edited
    }

*/
export default function ItemScreen({ route, navigation }) {
    const navigator = useNavigation();
    console.log('Route Params:', route.params);
    // real edition

    // const [listId, setListId] = useState(route.params.listId);
    // Test mode 
    const [listId, setListId] = useState(3);


    const [isLoading, setLoading] = useState(true);
    const [listData, setListData] = useState([]);

    console.log('list id is', listId);

    const getItemsInList = async (listId: number) => {
        console.log("started");
        const url = `https://gentle-caverns-18774-60195da51722.herokuapp.com/items?list_id=${listId}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log(data);
            setListData(data);
            Toast.show({ type: 'error', text1: "Item added to list" });
        } catch (error) {
            Toast.show({ type: 'error', text1: "Error adding Item to list" });
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    const handlePress = (item) => {
        Linking.openURL(item.item_url);
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemBox}>
            <Image source={
                item.image_url
                    ? { uri: item.image_url }
                    : require('@/assets/images/QuestionBox.jpg')
            } style={styles.image} />
            <TouchableOpacity onPress={() => handlePress(item)}>
                <Text style={styles.itemName}>{item.item_name}</Text>
            </TouchableOpacity>
            {/* we should never see the not set, this is for old items in the db. */}
            <Text style={{fontSize:16}}> Quantity: {item.quantity ? item.quantity : "not set"}</Text>
            <Button title="Edit Item" onPress={() => navigator.navigate('itemEdit', {item: item})} />
            <View style={{padding:5}}/>
            <Button title="Remove Item" onPress={() => navigator.navigate('itemEdit')} color={'red'} />
        </View>
    );

    // Run getItemsInList when the page first loads
    useFocusEffect(
        useCallback(() => {
            getItemsInList(listId);
        }, [listId])
    );

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View >
                        <Button title='Back' onPress={() => navigator.navigate('item')} color={"red"} />
                    </View>
                </View>
            </View>
            {isLoading ? (
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#007BFF" />
                </View>
            ) : (
                <View style={{ alignItems: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <View >
                            <Text style={styles.title}>Here would  list name</Text>
                        </View>
                    </View>
                    <View style={styles.scrollView}>
                        {listData.length > 0 ? (
                            <FlatList
                                data={listData}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.item_id}
                                numColumns={2}
                            />
                        ) : (
                            <Text>You don't have any Items</Text>
                        )}
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center', justifyContent: 'flex-start', padding: 10 }}>
                        <Button title='Search For an Item!' onPress={() => navigator.navigate("ItemSearch")} color={'green'} />
                    </View>
                </View>
            )}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "100%",
        backgroundColor: '#f5f5f5',
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
    title: {
        fontSize: 30
    },
    itemBox: {
        flex: 1,
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        alignItems: 'center',
    },
    itemName: {
        fontSize: 16,
        textAlign: 'center',
        color: 'navy',
        textDecorationLine: 'underline',
    },
    scrollView: {
        width: width - 15,
        flex: 8,
        backgroundColor: '#f5e1e1',
        justifyContent: 'center',
        marginTop: 0,
    },
});
