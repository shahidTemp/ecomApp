import { Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchTrigger from '@/components/common/searchTrigger'
import { useTheme } from '@/lib/theme'

const Index = () => {
    const { theme } = useTheme()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={theme.bgcolor} style="auto" />
            <View className="px-4 pt-4 gap-4">
                <SearchTrigger />
                <Text>index</Text>
            </View>
        </SafeAreaView>
    )
}

export default Index