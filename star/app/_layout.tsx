import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './user_login/Home';
import SettingsScreen from './user';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AdminScreen from './admin';
import UserScreen from './user';

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
      }}
    >

<Tab.Screen
        name="admin"
        component={AdminScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="user"
        component={UserScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
