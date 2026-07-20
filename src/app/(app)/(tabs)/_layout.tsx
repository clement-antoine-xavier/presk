import { Tabs } from 'expo-router';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="(news)"
        options={{
          title: 'News',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialDesignIcons
              name={focused ? 'newspaper-variant' : 'newspaper-variant-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialDesignIcons
              name={focused ? 'compass' : 'compass-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="conversations"
        options={{
          title: 'Conversations',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialDesignIcons
              name={focused ? 'message' : 'message-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          title: 'Communities',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialDesignIcons
              name={focused ? 'account-group' : 'account-group-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialDesignIcons
              name={focused ? 'account' : 'account-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
