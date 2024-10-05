import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    containerImagePerson: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: '#545454',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textLogout: {
        color: '#FFF',
        fontSize: 24
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
    }
})