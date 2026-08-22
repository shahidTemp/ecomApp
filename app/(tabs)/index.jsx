import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import SearchTrigger from "@/components/common/searchTrigger";
import ModernCarousel from "@/components/home/carousel";
import Categories from "@/components/home/categories";
import { useTheme } from "@/lib/theme";

const Index = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={[theme.bgcolor, `${theme.bgcolor}10`, "#ffffff"]}
        locations={[0, 0.4, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1"
      >
        <StatusBar backgroundColor={theme.bgcolor} style="light" />
        <View className="px-3 gap-1">
          <SearchTrigger />
          <ModernCarousel />
          <Categories />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Index;
