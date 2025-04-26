import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 70,
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="food-variant" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="analyze"
        options={{
          title: '',
          tabBarStyle: { display: 'none' },
          tabBarIcon: () => (
            <View style={{
              width: 56,
              height: 56,
              backgroundColor: '#7fff6c',
              borderRadius: 28,
              marginBottom: 30,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
              <MaterialCommunityIcons name="scan-helper" size={30} color="#000" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="format-list-bulleted" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 