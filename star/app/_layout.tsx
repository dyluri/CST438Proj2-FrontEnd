import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
import SettingsScreen from './settings';
import UserScreen from './user';
import LoginScreen from './login';
import ItemSearch  from './ItemSearch';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ListScreen from './list';
import { CurrentUser } from '@/components/Currentuser';

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <CurrentUser>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="home-outline" color={color} size={size} />
                ), 
              }}
        


      />
            <Tab.Screen
              name="login"
              component={LoginScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="home-outline" color={color} size={size} />
                ), 
              }}
        


      />

      <Tab.Screen
        name="ItemSearch"
        component={ItemSearch}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ), 
        }}
      />

      <Tab.Screen
        name="list"
        component={ListScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />

{/* <Tab.Screen
        name="user"
        component={UserScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      /> */}

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
    </CurrentUser>
  );
}
