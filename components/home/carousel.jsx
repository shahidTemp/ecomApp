import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { Carousel } from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";
import { useSettings } from "@/lib/theme";

const ModernCarousel = () => {
  const router = useRouter();
  const { settings } = useSettings();
  const { width } = useWindowDimensions();

  const banners = settings?.assets?.banners ?? [];

  if (!banners.length) return null;

  const carouselWidth = width - 24; // parent px-3 (12px each side)

  return (
    <Carousel
      loop
      autoplay
      data={banners}
      style={{ width: carouselWidth, height: carouselWidth * (7 / 20) }}
      animation={{ type: "timing", duration: 1000 }}
      autoplayInterval={3000}
      keyExtractor={(item) => item.img}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => item.link && router.replace(item.link)}
          disabled={!item.link}
          style={({ pressed }) => [styles.item, pressed && { opacity: 0.85 }]}
        >
          <Image
            source={item.img}
            style={styles.image}
            contentFit="cover"
            cachePolicy="memory-disk"
            transition={200}
          />
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ModernCarousel;
