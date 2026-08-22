import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/lib/theme";

const ProductCard = ({ item, onPress, style }) => {
  const { theme } = useTheme();
  const product = item ?? {};
  const name = product.info?.name || "Unnamed product";
  const price = product.pricing?.price;
  const image = product.images?.[0];
  const inStock = product.inventory?.inStock !== false;
  const badge = product.info?.badge;
  const hasFreeShipping = product.visibility?.isShippingFree;

  return (
    <Pressable
      accessibilityLabel={name}
      accessibilityRole={onPress ? "button" : undefined}
      disabled={!onPress}
      onPress={onPress ? () => onPress(item) : undefined}
      style={({ pressed }) => [styles.card, style, pressed && styles.pressed]}
    >
      <View style={styles.imageContainer}>
        {image ? (
          <Image
            source={image}
            accessibilityLabel={`${name} image`}
            style={styles.image}
            contentFit="cover"
            cachePolicy="memory-disk"
            transition={150}
          />
        ) : (
          <View style={styles.imageFallback}>
            <Ionicons name="image-outline" size={34} color="#94a3b8" />
          </View>
        )}

        {badge ? (
          <View style={[styles.badge, { backgroundColor: theme.bgcolor }]}>
            <Text style={[styles.badgeText, { color: theme.color }]} numberOfLines={1}>
              {badge}
            </Text>
          </View>
        ) : null}

        {!inStock ? (
          <View style={styles.stockOverlay}>
            <Text style={styles.stockOverlayText}>Out of stock</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <Text style={[styles.price, { color: theme.bgcolor }]}>
          {Number.isFinite(Number(price))
            ? `৳${Number(price).toLocaleString("en-BD")}`
            : "Price unavailable"}
        </Text>

        {inStock && hasFreeShipping ? (
          <View style={styles.shippingRow}>
            <Ionicons name="car-outline" size={14} color="#16a34a" />
            <Text style={styles.shippingText}>Free shipping</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  imageContainer: {
    height: 172,
    position: "relative",
    backgroundColor: "#f1f5f9",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    maxWidth: "70%",
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  stockOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.5)",
  },
  stockOverlayText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
  },
  details: {
    gap: 7,
    padding: 12,
  },
  name: {
    minHeight: 40,
    color: "#1e293b",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: "800",
  },
  shippingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  shippingText: {
    color: "#16a34a",
    fontSize: 11,
    fontWeight: "600",
  },
});

export default ProductCard;
