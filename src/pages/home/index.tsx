import React, { useCallback, useRef } from "react"
import { ImageBackground, SafeAreaView, TouchableOpacity } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'
import { DrawerActions, NavigationProp, useNavigation } from "@react-navigation/native"

import { ButtonPlusComponent } from "../../components/ButtonPlusComponent"
import imgBg from "../../images/bg2.jpg"
import { styles } from './styles'
import { RegisterPurposeContent } from "../../components/RegisterPurpose"
import BottomSheet from "@gorhom/bottom-sheet"

const Home = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const navigation = useNavigation<NavigationProp<any>>()
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer())
    }

    const handleOpenBottomSheet = useCallback(() => {
        bottomSheetRef.current?.expand({ duration: 500 });
    }, []);
    const handleCloseBottomSheet = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    return (
        <ImageBackground source={imgBg} style={styles.container}>
            <SafeAreaView style={styles.header}>
                <ButtonPlusComponent onPress={() => handleOpenBottomSheet()} />
                <TouchableOpacity onPress={openDrawer}>
                    <MaterialIcons name="menu" size={36} color="#000" />
                </TouchableOpacity>
            </SafeAreaView>

            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={['95%']}
                enablePanDownToClose={true}
                backgroundStyle={{ opacity: 0.7, backgroundColor: "#000" }}
                handleIndicatorStyle={{ backgroundColor: "#FFF", elevation: 1, zIndex: 99 }}
            >
                <RegisterPurposeContent handleSavePress={() => { handleCloseBottomSheet() }} />
            </BottomSheet>
        </ImageBackground>
    )
}

export { Home }