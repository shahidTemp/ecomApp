import React, { useState, useEffect, useCallback } from 'react';
import { Pressable, View, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS, Easing } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useTheme } from "@/lib/theme";

const DEFAULT_SUGGESTIONS = ['Groceries', 'Electronics', 'Medicines', 'Fashion', 'Home Essentials'];
const CYCLE_INTERVAL_MS = 3000;
const ANIMATION_DURATION_MS = 400;

export default function SearchTrigger({ suggestions = DEFAULT_SUGGESTIONS, navigateTo = '/temp' }) {
    const router = useRouter();
    const { theme } = useTheme();
    const [displayIndex, setDisplayIndex] = useState(0);

    const indexRef = useSharedValue(0);
    const opacity = useSharedValue(1);
    const translateY = useSharedValue(0);

    const total = suggestions.length;

    const cycle = useCallback(() => {
        if (total <= 1) return;

        // Exit Animation
        opacity.value = withTiming(0, { duration: ANIMATION_DURATION_MS / 2, easing: Easing.out(Easing.ease) });
        translateY.value = withTiming(-12, { duration: ANIMATION_DURATION_MS / 2, easing: Easing.out(Easing.ease) }, 
            (finished) => {
                if (!finished) return;

                // Swap index & trigger state change
                const next = (indexRef.value + 1) % total;
                indexRef.value = next;
                runOnJS(setDisplayIndex)(next);

                // Reset position for entry
                translateY.value = 12;

                // Enter Animation
                opacity.value = withTiming(1, { duration: ANIMATION_DURATION_MS / 2, easing: Easing.out(Easing.ease) });
                translateY.value = withTiming(0, { duration: ANIMATION_DURATION_MS / 2, easing: Easing.out(Easing.ease) });
            }
        );
    }, [total]);

    useEffect(() => {
        if (total <= 1) return;
        const interval = setInterval(cycle, CYCLE_INTERVAL_MS);
        return () => clearInterval(interval);
    }, [cycle, total]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    const currentQuery = suggestions[displayIndex];

    return (
        <View style={{ borderColor: theme.bgcolor }} className="flex-row items-center border rounded-md pl-4 shadow-sm">
            <Pressable onPress={() => router.push(navigateTo)} className="flex-1 active:opacity-70 py-1">
                <Animated.Text style={animatedStyle} className="text-gray-400 text-base font-medium" numberOfLines={1}>
                    Search for {currentQuery}
                </Animated.Text>
            </Pressable>

            {/* সার্চ বাটনে ক্লিক করলে সরাসরি কিওয়ার্ডসহ নেভিগেশন (কোনো ফিল্টারিং ছাড়া) */}
            <Pressable
                onPress={() => router.push({ pathname: navigateTo, params: { query: currentQuery } })}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={{ backgroundColor: theme.bgcolor }}
                className="ml-3 rounded-md px-4 py-2"
            >
                <Text className="text-white text-sm font-semibold">Search</Text>
            </Pressable>
        </View>
    );
}