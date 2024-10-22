import React, { useState } from 'react';
import { Item } from '@/components/Types';
import { Image, StyleSheet, TextInput, View, TouchableOpacity, Text, Alert, Button, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/*
    route.params = {
        listID = passed in number of current list being edited
        items = array of items from this list id.
    }

*/
export default function ItemScreen({ route, navigation }) {
    const navigator = useNavigation();
    let listID = route.params 
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        if (searchTerm.trim()) {
            console.log('Searching for:', searchTerm);
        }
    };

    return (
        
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View >
                        <Text style={styles.title}>Here would be the list name</Text>
                    </View>
                    <View style={{ padding: 5 }} />
                </View>
            </View>
            <View style={styles.imageContainer}>
                <Button title='Search For an Item to add to this list!' onPress={() => navigator.navigate("itemdetails")}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "95%",
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
        width: 290,
        height: 178,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 30
    }
});
