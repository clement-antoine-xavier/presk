import { Tabs } from 'expo-router';
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="(news)"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size, }) =>
            <MaterialDesignIcons name={focused ? "newspaper-variant" : "newspaper-variant-outline"} color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size, }) =>
            <MaterialDesignIcons name={focused ? "compass" : "compass-outline"} color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size, }) =>
            <MaterialDesignIcons name={focused ? "account-multiple" : "account-multiple-outline"} color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size, }) =>
            <MaterialDesignIcons name={focused ? "account-group" : "account-group-outline"} color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size, }) =>
            <MaterialDesignIcons name={focused ? "account" : "account-outline"} color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
