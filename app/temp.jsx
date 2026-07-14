import { View, Text } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

const temp = () => {
    return (<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View>
            <Text>temp</Text>
        </View>
    </SafeAreaView>
    )
}

export default temp