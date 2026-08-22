import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Carousel } from "react-native-reanimated-carousel";

import { getApi } from "@/lib/api";
import { useTheme } from "@/lib/theme";

const Categories = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
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
    <View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={theme.bgcolor}
          style={styles.loader}
        />
      ) : categories.length ? (
        <Carousel
          loop={categories.length > 1}
          autoplay={categories.length > 1}
          data={categories}
          style={{ width: width - 24, height: 104 }}
          itemSize={70}
          autoplayInterval={2800}
          animation={{ type: "timing", duration: 450 }}
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
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    marginTop: 48,
  },
  card: {
    width: 64,
    height: 96,
    padding: 4,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  pressed: {
    opacity: 0.75,
  },
  image: {
    width: 56,
    height: 54,
    borderRadius: 9,
    backgroundColor: "#e2e8f0",
  },
  categoryName: {
    color: "#1e293b",
    fontSize: 10,
    fontWeight: "700",
    lineHeight: 12,
    marginTop: 5,
    textAlign: "center",
  },
  emptyText: {
    color: "#64748b",
    fontSize: 15,
    marginTop: 48,
    textAlign: "center",
  },
});

export default Categories;
