import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { CurrentUser } from '@/components/Currentuser';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TabLayout() {
    return (
        <CurrentUser>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors['light'].tint,
                    headerShown: false,
                }}
                >
                <Tabs.Screen
                    name="index"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="home-outline" color={color} size={size} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="login"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="home-outline" color={color} size={size} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="WishLists"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="person-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="ItemSearch"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="search" color={color} size={size} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="settings"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="settings-outline" color={color} size={size} />
                        ),
                    }}
                />
            </Tabs>
        </CurrentUser>
    );
}