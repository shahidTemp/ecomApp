import { Image, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { Carousel } from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";
import { useSettings } from "@/lib/theme";

const ModernCarousel = () => {
  const router = useRouter();
  const { settings } = useSettings();
  const { width } = useWindowDimensions();

  const data = (settings?.assets?.banners ?? []).map(({ img, link }) => ({ img, url: link }));

  if (!data.length) return null;

  const carouselWidth = width - 24; // parent px-3 (12px each side)

  return (
    <Carousel
      loop
      style={{ width: carouselWidth, height: carouselWidth * 0.5 }}
      autoplay
      data={data}
      animation={{ type: "timing", duration: 1000 }}
      autoplayInterval={3000}
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={item.url ? 0.7 : 1}
          onPress={() => item.url && router.replace(item.url)}
          style={styles.itemContainer}
          disabled={!item.url}
        >
          <Image source={{ uri: item.img }} style={styles.image} resizeMode="cover" />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginHorizontal: 6, // 12px gap between items
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ModernCarousel;
