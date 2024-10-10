// AdminLayout.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminHomeScreen from './ahome';
import AdminSettingScreen from './adminsettings';
import Icon from 'react-native-vector-icons/Ionicons';

const AdminTab = createBottomTabNavigator();

export default function AdminLayout() {
  return (
    <AdminTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
      }}
    >
      <AdminTab.Screen
        name="ahome"
        component={AdminHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <AdminTab.Screen
        name="adminsettings"
        component={AdminSettingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </AdminTab.Navigator>
  );
}
