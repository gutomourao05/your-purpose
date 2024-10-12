import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    imgQrCode: {
        width: 150,
        height: 150,
        backgroundColor: '#545454',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textCopy: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold'
    },

    buttonLogout: {
        backgroundColor: '#000',
        flexDirection: 'row',
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        borderRadius: 8
    },

    textLogout: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
})