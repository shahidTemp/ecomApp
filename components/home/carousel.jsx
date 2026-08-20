import React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

import cimg1 from "@/assets/images/cimg1.jpg";
import cimg2 from "@/assets/images/cimg2.jpg";
import cimg3 from "@/assets/images/cimg3.jpg";
import cimg4 from "@/assets/images/cimg4.png";
import cimg5 from "@/assets/images/cimg5.jpg";
import cimg6 from "@/assets/images/cimg6.png";

const { width: screenWidth } = Dimensions.get("window");

const data = [
  {
    img: cimg1,
    url: "https://www.example.com",
  },
  {
    img: cimg2,
    url: "https://www.example.com",
  },
  {
    img: cimg3,
    url: "",
  },
  {
    img: cimg4,
    url: "",
  },
  {
    img: cimg5,
    url: "",
  },
  {
    img: cimg6,
    url: "",
  },
];

const ModernCarousel = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const handleItemPress = (item) => {
    if (item.url) {
      router.replace(item.url);
    }
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={screenWidth}
        height={screenWidth * 0.5}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={1000}
        autoPlayInterval={3000}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={item.url ? 0.7 : 1}
            onPress={() => handleItemPress(item)}
            style={styles.itemContainer}
            disabled={!item.url}
          >
            <Image
              // source={{ uri: item.image || item.img }}
              source={item.img}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  itemContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 12,
    marginVertical: 8,
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
