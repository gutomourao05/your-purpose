import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFF',
        textAlign: 'center',
    },
    boxCreateUser: {
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