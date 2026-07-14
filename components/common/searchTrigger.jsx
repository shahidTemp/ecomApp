import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SUGGESTIONS = [
    "Search for Groceries",
    "Search for Electronics",
    "Search for Medicines",
];

const CYCLE_INTERVAL = 2500;
const TRANSITION_DURATION = 220;

export default function SearchTrigger() {
    const router = useRouter();
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (containerHeight === 0) return;

        const interval = setInterval(() => {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -1,
                    duration: TRANSITION_DURATION,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: TRANSITION_DURATION,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setSuggestionIndex((prev) => (prev + 1) % SUGGESTIONS.length);
                slideAnim.setValue(1);
                opacityAnim.setValue(0);

                Animated.parallel([
                    Animated.timing(slideAnim, {
                        toValue: 0,
                        duration: TRANSITION_DURATION,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 1,
                        duration: TRANSITION_DURATION,
                        useNativeDriver: true,
                    }),
                ]).start();
            });
        }, CYCLE_INTERVAL);

        return () => clearInterval(interval);
    }, [slideAnim, opacityAnim, containerHeight]);

    const handleTriggerPress = () => {
        router.push("/search");
    };

    const handleSearchPress = () => {
        router.push({
            pathname: "/search",
            params: { query: SUGGESTIONS[suggestionIndex] },
        });
    };

    return (
        <View
            className="flex-row items-center bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 overflow-hidden"
            accessibilityRole="search"
            onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
        >
            <Pressable onPress={handleTriggerPress} className="flex-1">
                <Animated.Text
                    style={{
                        transform: [
                            {
                                translateY: slideAnim.interpolate({
                                    inputRange: [-1, 0, 1],
                                    outputRange: [-containerHeight, 0, containerHeight],
                                }),
                            },
                        ],
                        opacity: opacityAnim,
                    }}
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
