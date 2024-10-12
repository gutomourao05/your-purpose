import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 8,
        paddingHorizontal: 16,
        color: '#FFF',
    },
    input: {
        flex: 1,
        fontSize: 20,
        color: '#FFF',
    }
})