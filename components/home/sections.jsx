import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Carousel } from "react-native-reanimated-carousel";

import ProductCard from "@/components/common/productCard";
import ProductCardSkeleton from "@/components/common/productCardSkeleton";
import { getApi } from "@/lib/api";
import { useTheme } from "@/lib/theme";

const SLIDE_HEIGHT = 300;

const Sections = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getApi("section/all")
      .then((response) => {
        if (mounted) setSections(response?.data ?? []);
      })
      .catch((error) => console.error("Failed to load sections:", error))
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const openProduct = (item) => {
    const slug = item?.info?.slug;
    if (slug) router.push({ pathname: "/product/[slug]", params: { slug } });
  };

  const openBanner = (link) => {
    const slug = link?.split("/").filter(Boolean).pop();
    if (slug) router.push({ pathname: "/product/[slug]", params: { slug } });
  };

  const carouselWidth = width - 24; // parent has px-3

  if (isLoading) {
    return (
      <View style={styles.section}>
        <View style={styles.titleSkeleton} />
        <View style={styles.grid}>
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </View>
      </View>
    );
  }

  if (!sections.length) return null;

  return (
    <View style={styles.container}>
      {sections.map((section) => {
        const products = section.products_id ?? [];
        if (!products.length) return null;

        return (
          <View key={section._id} style={styles.section}>
            {section.banner_url ? (
              <Pressable
                onPress={() => openBanner(section.banner_Link)}
                disabled={!section.banner_Link}
                style={({ pressed }) => [styles.banner, pressed && styles.pressed]}
              >
                <Image
                  source={section.banner_url}
                  style={styles.bannerImage}
                  contentFit="cover"
                  cachePolicy="memory-disk"
                  transition={150}
                />
              </Pressable>
            ) : null}

            <View style={styles.header}>
              <View style={[styles.headerBar, { backgroundColor: theme.bgcolor }]} />
              <Text style={styles.headerTitle}>{section.name}</Text>
            </View>

            {section.display_type === "slide" ? (
              <Carousel
                loop={false}
                data={products}
                style={{ width: carouselWidth, height: SLIDE_HEIGHT }}
                itemSize={carouselWidth}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <ProductCard
                    item={item}
                    onPress={openProduct}
                    style={{ width: carouselWidth }}
                  />
                )}
              />
            ) : (
              <View style={styles.grid}>
                {products.map((item) => (
                  <ProductCard key={item._id} item={item} onPress={openProduct} />
                ))}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 28,
  },
  section: {
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerBar: {
    width: 4,
    height: 18,
    borderRadius: 2,
  },
  headerTitle: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "800",
  },
  banner: {
    width: "100%",
    height: 140,
    borderRadius: 14,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  pressed: {
    opacity: 0.85,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  titleSkeleton: {
    width: "40%",
    height: 20,
    borderRadius: 5,
    backgroundColor: "#e2e8f0",
  },
});

export default Sections;
