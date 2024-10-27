import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
import SettingsScreen from './settings';
import UserScreen from './user';
import LoginScreen from './login';
import ItemSearch  from './ItemSearch';
import AdminList from './adminlist';
import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { CurrentUser } from '@/components/Currentuser';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <CurrentUser>
           <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors['light'].tint,
                    headerShown: false,
                }}
                >
      <Tabs
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="home-outline" color={color} size={size} />
                ), 
              }}
        


      />
            <Tabs
              name="login"
              component={LoginScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="home-outline" color={color} size={size} />
                ), 
              }}
        


      />

      <Tabs
        name="ItemSearch"
        component={ItemSearch}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ), 
        }}
      />

      <Tabs
        name="user"
        component={UserScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs
        name="settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings-outline" color={color} size={size} />
          ),
        }}
      />
                  <Tabs
        name="adminlist"
        component={AdminList} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
  </Tabs>
    </CurrentUser>
  );
}