import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Button } from 'react-native';

// This is temporary, to be deleted. 


type ItemProps = {
    item_name: string;
    list_id: number;
    item_url: string;
    image_url: string;
    price: number;
    quantity: number;
    description: string;
};

export const ItemComponent: React.FC<ItemProps> = ({
    item_name,
    list_id,
    item_url,
    image_url,
    price,
    quantity,
    description,
}) => {
    const truncatedName = item_name.length > 20 ? `${item_name.slice(0, 20)}...` : item_name;

    const handlePress = () => {
        Linking.openURL(item_url);
    };

    return (
        <View>
            <View style={styles.itemCard}>
                <View style={styles.topHalf}>
                    <Image source={{ uri: image_url }} style={styles.image} />
                    <View style={styles.details}>
                        <TouchableOpacity onPress={handlePress}>
                            <Text style={styles.itemName}>{truncatedName}</Text>
                        </TouchableOpacity>
                        <Text style={styles.price}>Price: ${price}</Text>
                        <Text style={styles.quantity}>Quantity: {quantity}</Text>
                    </View>
                </View>
                <Text style={styles.description}>{description}</Text>
            </View>
            <View>
                <View style={{display: "flex", flexDirection: "row"}}>
                    <View style={{flex: 1}}>
                        <Button title='-' onPress={() => console.log("remove")} color={"red"}/>
                    </View>
                    <Text style={{flex:2}}>quantity</Text>
                    <View style={{flex:1}}>
                        <Button title='+' onPress={() => console.log("remove")} color={"green"} />
                    </View>
                </View>
                <Button title='save' onPress={() => console.log("remove")} color={"green"} />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemCard: {
        flexDirection: 'row',
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
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
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
