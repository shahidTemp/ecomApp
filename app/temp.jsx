import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

const temp = () => {
    const { query } = useLocalSearchParams();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Search keyword</Text>
                <Text style={{ fontSize: 16, color: '#374151' }}>{query}</Text>
            </View>
        </SafeAreaView>
    );
};

export default temp;