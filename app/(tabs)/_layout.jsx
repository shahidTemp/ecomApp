import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#0984e4',
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
                backgroundColor: '#fff',
                height: 60,
            },
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => <Ionicons size={28} name={focused ? "home" : "home-outline"} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => <Ionicons size={28} name={focused ? "person" : "person-outline"} color={color} />,
                }}
            />
        </Tabs>
    );
}
