import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    boxLogin: {
        gap: 16,
    },
    textForgotPassword: {
        color: '#FFF',
        textAlign: 'center',
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: -15
    }
})