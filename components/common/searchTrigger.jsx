import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, {
    Easing,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
} from "react-native-reanimated";

const SUGGESTIONS = [
    "Search for Groceries",
    "Search for Electronics",
    "Search for Medicines",
];

const CYCLE_INTERVAL = 2500;
const TRANSITION_DURATION = 220;
const EASING = Easing.bezier(0.4, 0, 0.2, 1);

export default function SearchTrigger() {
    const router = useRouter();
    const [index, setIndex] = useState(0);
    const [height, setHeight] = useState(0);
    const progress = useSharedValue(0);

    useEffect(() => {
        if (height === 0) return;
        const cycle = () => {
            progress.value = 0;
            progress.value = withSequence(
                withTiming(0.5, { duration: TRANSITION_DURATION, easing: EASING }, () => {
                    runOnJS(setIndex)((prev) => (prev + 1) % SUGGESTIONS.length);
                }),
                withTiming(1, { duration: TRANSITION_DURATION, easing: EASING }),
            );
        };
        const interval = setInterval(cycle, CYCLE_INTERVAL);
        return () => clearInterval(interval);
    }, [height, progress]);

    const animatedStyle = useAnimatedStyle(() => {
        "worklet";
        const p = progress.value;
        const translateY =
            p < 0.5
                ? interpolate(p, [0, 0.5], [0, -height], "clamp")
                : interpolate(p, [0.5, 1], [height, 0], "clamp");
        const opacity =
            p < 0.5
                ? interpolate(p, [0, 0.5], [1, 0], "clamp")
                : interpolate(p, [0.5, 1], [0, 1], "clamp");
        return { opacity, transform: [{ translateY }] };
    }, [height]);

    const handleTriggerPress = () => router.push("/search");
    const handleSearchPress = () =>
        router.push({
            pathname: "/search",
            params: { query: SUGGESTIONS[index] },
        });

    return (
        <View
            className="flex-row items-center bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 overflow-hidden"
            accessibilityRole="search"
            onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
        >
            <Pressable onPress={handleTriggerPress} className="flex-1">
                <Animated.Text
                    style={animatedStyle}
                    className="text-gray-500 text-base"
                >
                    {SUGGESTIONS[index]}
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
