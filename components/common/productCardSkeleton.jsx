import { useEffect } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const ProductCardSkeleton = () => {
  const { width } = useWindowDimensions();
  const shimmerX = useSharedValue(-width);

  useEffect(() => {
    shimmerX.value = withRepeat(
      withTiming(width, {
        duration: 1300,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [shimmerX, width]);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerX.value }, { rotate: "15deg" }],
  }));

  return (
    <View style={styles.card}>
      <View style={styles.imagePlaceholder} />

      <View style={styles.details}>
        <View style={[styles.placeholder, styles.titleLine]} />
        <View style={[styles.placeholder, styles.titleLineShort]} />
        <View style={[styles.placeholder, styles.priceLine]} />
        <View style={[styles.placeholder, styles.shippingLine]} />
      </View>

      <Animated.View pointerEvents="none" style={[styles.shimmer, shimmerStyle]}>
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0)",
            "rgba(255, 255, 255, 0.72)",
            "rgba(255, 255, 255, 0)",
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    height: 286,
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
  imagePlaceholder: {
    height: 172,
    backgroundColor: "#e2e8f0",
  },
  details: {
    gap: 7,
    height: 113,
    padding: 12,
  },
  placeholder: {
    borderRadius: 5,
    backgroundColor: "#e2e8f0",
  },
  titleLine: {
    width: "94%",
    height: 14,
  },
  titleLineShort: {
    width: "64%",
    height: 14,
  },
  priceLine: {
    width: "38%",
    height: 20,
  },
  shippingLine: {
    width: "58%",
    height: 12,
  },
  shimmer: {
    position: "absolute",
    top: -36,
    bottom: -36,
    width: 90,
  },
  gradient: {
    flex: 1,
  },
});

export default ProductCardSkeleton;
