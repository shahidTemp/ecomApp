import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SUGGESTIONS = [
    "Search for Groceries",
    "Search for Electronics",
    "Search for Medicines",
];

const CYCLE_INTERVAL = 2500;
const FADE_DURATION = 200;

export default function SearchTrigger() {
    const navigation = useNavigation();
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: FADE_DURATION,
                useNativeDriver: true,
            }).start(() => {
                if (!isMounted.current) return;

                setSuggestionIndex((prev) => (prev + 1) % SUGGESTIONS.length);

                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: FADE_DURATION,
                    useNativeDriver: true,
                }).start();
            });
        }, CYCLE_INTERVAL);

        return () => clearInterval(interval);
    }, [fadeAnim]);

    const handleTriggerPress = () => {
        navigation.navigate("SearchScreen");
    };

    const handleSearchPress = () => {
        navigation.navigate("SearchScreen", {
            query: SUGGESTIONS[suggestionIndex],
        });
    };

    return (
        <View
            className="flex-row items-center bg-gray-100 border border-gray-300 rounded-xl px-4 py-3"
            accessibilityRole="search"
        >
            <Pressable onPress={handleTriggerPress} className="flex-1">
                <Animated.Text
                    style={{ opacity: fadeAnim }}
                    className="text-gray-500 text-base"
                >
                    {SUGGESTIONS[suggestionIndex]}
                </Animated.Text>
            </Pressable>

            <Pressable
                onPress={handleSearchPress}
                className="p-2"
                hitSlop={8}
                accessibilityLabel="Search"
            >
                <Ionicons name="search" size={20} color="#666" />
            </Pressable>
        </View>
    );
}
