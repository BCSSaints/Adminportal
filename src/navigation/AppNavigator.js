import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ChurchCenterScreen from '../screens/ChurchCenterScreen';
import { TABS, COLORS, CHURCH_NAME } from '../config';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const tabConfig = TABS.find((t) => t.key === route.name);
        return {
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? tabConfig?.icon : `${tabConfig?.icon}-outline`}
              size={size}
              color={color}
            />
          ),
          tabBarActiveTintColor: COLORS.tabBarActive,
          tabBarInactiveTintColor: COLORS.tabBarInactive,
          tabBarStyle: {
            backgroundColor: COLORS.tabBar,
            borderTopColor: '#e0e0e0',
            borderTopWidth: 1,
            paddingBottom: 4,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
          },
          headerStyle: {
            backgroundColor: COLORS.header,
          },
          headerTintColor: COLORS.headerText,
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
          },
        };
      }}
    >
      {TABS.map((tab) => (
        <Tab.Screen
          key={tab.key}
          name={tab.key}
          component={ChurchCenterScreen}
          initialParams={{ path: tab.path }}
          options={{
            title: tab.label,
            headerTitle: tab.label === 'Home' ? CHURCH_NAME : tab.label,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
