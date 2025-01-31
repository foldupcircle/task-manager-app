import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
      >
      {/* Ignore this Screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      {/* Ignore this Screen */}
      <Tabs.Screen
        name="completed-tasks"
        options={{
          title: 'Completed Tasks',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'checkmark' : 'checkmark-outline'} color={color} />
          ),
        }}
      />
      
    </Tabs>
  );
}
// Completed Tasks Tab - No need for it right now
{/* <Tabs.Screen
        name="completed-tasks"
        options={{
          title: 'Completed Tasks',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'checkmark' : 'checkmark-outline'} color={color} />
          ),
        }}
      /> */}
