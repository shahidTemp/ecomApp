import { Link } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/lib/theme'

const profile = () => {
    const { theme } = useTheme()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Profile</Text>
                <Text style={styles.subtitle}>Tap below to open a temporary route.</Text>

                <Link href="/_sitemap" asChild>
                    <Pressable style={[styles.button, { backgroundColor: theme.bgcolor }]}>
                        <Text style={[styles.buttonText, { color: theme.color }]}>Go to _sitemap route</Text>
                    </Pressable>
                </Link>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#f8fafc',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#475569',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 999,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
})

export default profile