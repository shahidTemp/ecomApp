import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Carousel } from "react-native-reanimated-carousel";

import { getApi } from "@/lib/api";
import { useTheme } from "@/lib/theme";

const AllCategory = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getApi("category/all")
      .then((response) => {
        if (mounted) setCategories(response?.data ?? []);
      })
      .catch((error) => console.error("Failed to load categories:", error))
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>EXPLORE</Text>
        <Text style={styles.title}>Shop by category</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator color={theme.bgcolor} style={styles.loader} />
      ) : categories.length ? (
        <Carousel
          loop={categories.length > 1}
          autoplay={categories.length > 1}
          data={categories}
          style={styles.carousel}
          itemSize={136}
          autoplayInterval={2800}
          animation={{ type: "timing", duration: 450 }}
          renderWindowSize={3}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/allProduct",
                  params: { category: item.slug },
                })
              }
              style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            >
              <Image
                source={item.image_url}
                style={styles.image}
                contentFit="cover"
                cachePolicy="memory-disk"
              />
              <Text style={styles.categoryName} numberOfLines={2}>
                {item.name}
              </Text>
            </Pressable>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No categories available.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
  },
  eyebrow: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  title: {
    color: "#0f172a",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 4,
  },
  carousel: {
    width: "100%",
    height: 174,
    paddingHorizontal: 16,
  },
  loader: {
    marginTop: 48,
  },
  card: {
    width: 124,
    height: 164,
    padding: 8,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  pressed: {
    opacity: 0.75,
  },
  image: {
    width: 108,
    height: 112,
    borderRadius: 13,
    backgroundColor: "#e2e8f0",
  },
  categoryName: {
    color: "#1e293b",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 9,
    textAlign: "center",
  },
  emptyText: {
    color: "#64748b",
    fontSize: 15,
    marginTop: 48,
    textAlign: "center",
  },
});

export default AllCategory;
