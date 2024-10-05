import React from "react"
import { ImageBackground, SafeAreaView, TouchableOpacity } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'
import { DrawerActions, NavigationProp, useNavigation } from "@react-navigation/native"

import { ButtonPlusComponent } from "../../components/ButtonPlusComponent"
import imgBg from "../../images/bg2.jpg"
import { styles } from './styles'


const Home = () => {
    const navigation = useNavigation<NavigationProp<any>>()
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer())
    }
    return (
        <ImageBackground source={imgBg} style={styles.container}>
            <SafeAreaView style={styles.header}>
                <ButtonPlusComponent />
                <TouchableOpacity onPress={openDrawer}>
                    <MaterialIcons name="menu" size={36} color="#000" />
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    )
}

export { Home }