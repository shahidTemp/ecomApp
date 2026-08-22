import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";

import { useTheme } from "@/lib/theme";

export default function NotFoundScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const brandColor = theme.bgcolor;
    const handleGoBack = () => {
        // Check if we can go back, otherwise go to home
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/");
        }
    };

    const handleOpenSitemap = () => {
        router.push("/_sitemap");
    };

    return (
        <LinearGradient
            colors={[brandColor, `${brandColor}99`, "#ffffff"]}
            locations={[0, 0.4, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="flex-1"
        >
            <StatusBar translucent backgroundColor="transparent" style="dark" />

            <View className="flex-1 items-center justify-center px-6">
                <View className="w-full max-w-sm rounded-3xl bg-white/90 px-6 py-10 items-center border border-white">
                    <Text style={{ color: brandColor }} className="text-6xl font-bold mb-3">404</Text>
                    <Text className="text-gray-900 text-2xl font-bold text-center mb-3">
                        Page not found
                    </Text>
                    <Text className="text-gray-600 text-base text-center leading-6 mb-8">
                        The page you are looking for does not exist or has been moved.
                    </Text>

                    <Pressable
                        onPress={handleGoBack}
                        style={{ backgroundColor: brandColor }}
                        className="px-6 py-4 rounded-2xl w-full"
                    >
                        <Text style={{ color: theme.color }} className="text-base font-semibold text-center">
                            Go Back
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={handleOpenSitemap}
                        style={{ borderColor: brandColor }}
                        className="bg-white px-6 py-4 rounded-2xl w-full border mt-3"
                    >
                        <Text style={{ color: brandColor }} className="text-base font-semibold text-center">
                            Sitemap
                        </Text>
                    </Pressable>
                </View>
            </View>
        </LinearGradient>
    );
}
