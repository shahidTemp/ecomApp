import { Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useTheme } from '@/lib/theme'

const Index = () => {
    const { theme } = useTheme()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={theme.bgcolor} style="auto" />
            <View>
                <Text>index</Text>
            </View>
        </SafeAreaView>
    )
}

export default Index