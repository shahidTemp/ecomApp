import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

const AllProduct = () => {
  const { category } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>{category}</Text>
      </View>
    </SafeAreaView>
  );
};

export default AllProduct;
