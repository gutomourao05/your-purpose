import { SafeAreaView, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { DrawerContentComponentProps } from "@react-navigation/drawer"
import { MaterialIcons } from '@expo/vector-icons'

import { styles } from "./styles"
const DrawerContent = (drawerProps: DrawerContentComponentProps) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerImagePerson}>
                <MaterialIcons name="person" size={98} color="#FFF" />
            </View>
            <TouchableOpacity style={styles.buttonLogout} onPress={() => drawerProps.navigation.closeDrawer()} activeOpacity={0.7}>
                <Text style={styles.textLogout}>SAIR</Text>
                <MaterialIcons name="logout" size={24} color="#FFF" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export { DrawerContent }