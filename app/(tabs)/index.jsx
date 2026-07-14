import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <Text>index</Text>
            </View>
        </SafeAreaView>
    )
}

export default index