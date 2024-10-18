import React, { useCallback, useEffect, useMemo, useRef } from "react"
import { ActivityIndicator, FlatList, ImageBackground, SafeAreaView, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'
import { DrawerActions, NavigationProp, useNavigation } from "@react-navigation/native"
import { ButtonPlusComponent } from "../../components/ButtonPlusComponent"
import imgBg from "../../images/bg2.jpg"
import { styles } from './styles'
import { RegisterPurposeContent } from "../../components/RegisterPurpose"
import BottomSheet from "@gorhom/bottom-sheet"
import { Card } from "../../components/Card"
import { useFetchPurpose } from "../../http/hooks/purpose/useFetchPurpose"
import * as Notifications from 'expo-notifications';
import { requestNotificationPermissions } from "../../utils/notifications"

const Home = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const navigation = useNavigation<NavigationProp<any>>()

    const { purposes, isLoadingPurposes } = useFetchPurpose()

    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer())
    }

    const handleOpenBottomSheet = useCallback(() => {
        bottomSheetRef.current?.expand({ duration: 500 });
    }, []);
    const handleCloseBottomSheet = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    useEffect(() => {
        requestNotificationPermissions()
    }, [])

    return (
        <ImageBackground source={imgBg} style={isLoadingPurposes ? styles.containerLoading : styles.container} >
            {isLoadingPurposes ? <ActivityIndicator size={'large'} color={'#000'} /> : (
                <>
                    <SafeAreaView style={styles.header}>
                        <ButtonPlusComponent onPress={() => handleOpenBottomSheet()} />
                        <TouchableOpacity onPress={openDrawer}>
                            <MaterialIcons name="menu" size={36} color="#000" />
                        </TouchableOpacity>
                    </SafeAreaView>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={purposes?.length > 0 ? purposes.sort((a: any, b: any) => b.isActive - a.isActive) : []}
                        renderItem={({ item }) => <Card purpose={item} />}
                        contentContainerStyle={{ gap: 12 }}
                        keyExtractor={item => item.id}
                        style={{ marginBottom: 44 }}
                        onEndReached={() => { }}
                        onEndReachedThreshold={0.1}
                        onAccessibilityAction={() => purposes}
                    />

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
                </>
            )}
        </ImageBackground >
    )
}

export { Home }