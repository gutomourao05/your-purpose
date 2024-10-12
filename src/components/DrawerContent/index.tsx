import { SafeAreaView, Text, View, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { DrawerContentComponentProps } from "@react-navigation/drawer"
import { MaterialIcons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard';
import { NavigationProp, useNavigation } from "@react-navigation/native"

import qrCodePixImg from '../../images/qrcodePix.jpeg'

import { styles } from "./styles"
import Toast from "react-native-toast-message";
import { deleteToken } from "../../services/TokenService";
import useAuthStore from "../../http/store/useAuth";
const DrawerContent = (drawerProps: DrawerContentComponentProps) => {
    const navigation = useNavigation<NavigationProp<any>>()
    const { RemoveAuth } = useAuthStore()

    const textCopy = "00020126580014br.gov.bcb.pix0136bab28192-9124-45d5-9bdd-9ff696ab66975204000053039865802BR5919Jose Augusto Santos6008Brasilia620905054ebny6304AB17"

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(textCopy);
        Toast.show({
            type: 'success',
            text1: 'Texto copiado para a área de transferência',
        })
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.textCopy}>Ajude a manter o app</Text>
                <View style={styles.imgQrCode}>
                    <Image style={styles.imgQrCode} source={qrCodePixImg} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <Text style={styles.textCopy}>Pix copia e cola</Text>
                    <TouchableOpacity onPress={() => copyToClipboard()}>
                        <MaterialIcons name="content-copy" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ gap: 8 }}>
                <TouchableOpacity style={styles.buttonLogout} onPress={() => {
                    deleteToken();
                    RemoveAuth();
                    navigation.navigate('Login');
                }} activeOpacity={0.7}>
                    <Text style={styles.textLogout}>SAIR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonLogout} onPress={() => navigation.navigate('ChangePassword')} activeOpacity={0.7}>
                    <Text style={styles.textLogout}>TROCA SENHA</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export { DrawerContent }