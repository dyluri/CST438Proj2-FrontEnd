import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './user_login/Home';
import SettingsScreen from './settings';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AdminScreen from './admin';

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
      }}
    >
      {/* <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ), 
        }}
      /> */}

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
        name="settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
