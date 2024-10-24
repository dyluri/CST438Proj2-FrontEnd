import { DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import 'react-native-reanimated';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemScreen from './item';
import DetailsScreen from './itemEdit';
import ItemSearch from '../ItemSearch';
import ListScreen from './list';


const Stack = createNativeStackNavigator();


export default function RootLayout() {
    return (

            <Stack.Navigator
                initialRouteName='list'>
                <Stack.Screen
                    name="list"
                    component={ListScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="item"
                    component={ItemScreen}
                    options={{ headerShown: false, animation:'none' }}
                />
                <Stack.Screen
                    name="itemEdit"
                    component={DetailsScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ItemSearch"
                    component={ItemSearch}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>


    );
}