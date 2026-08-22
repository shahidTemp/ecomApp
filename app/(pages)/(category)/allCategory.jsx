import { SafeAreaView } from "react-native-safe-area-context";

import Categories from "@/components/home/catefories";

const AllCategory = () => (
  <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
    <Categories />
  </SafeAreaView>
);

export default AllCategory;
