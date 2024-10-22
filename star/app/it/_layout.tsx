import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import 'react-native-reanimated';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemScreen from './item';
import DetailsScreen from './itemdetails';


const Stack = createNativeStackNavigator();


export default function RootLayout() {
    return (
        <NavigationContainer
            independent={true}>
            <ThemeProvider value={ DefaultTheme}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="item"
                        component={ItemScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="itemdetails"
                        component={DetailsScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </ThemeProvider>
        </NavigationContainer>

    );
}