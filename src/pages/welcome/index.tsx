import { ImageBackground, View, Text } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"

import { ButtonComponent } from "../../components/ButtonComponent"
import imgBg from "../../images/bg-signIn.jpg"
import { styles } from './styles'
import { useEffect } from "react"
import { getToken } from "../../services/TokenService"
import useAuthStore from "../../http/store/useAuth"

const Welcome = () => {
    const navigation = useNavigation<NavigationProp<any>>()
    const { AddAuth } = useAuthStore()

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await getToken();

                if (storedToken) {
                    AddAuth()
                    navigation.navigate('Home')
                }
            } catch (error) { }
        };
        fetchToken();
    }, []);

    return (
        <ImageBackground source={imgBg} style={styles.container}>
            <View>
                <Text style={styles.title}>Bem vindo</Text>
                <Text style={styles.text}>Esse aplicativo foi desenvolvido para auxiliar no controle de seus propósitos com o senhor Jesus.</Text>
                <Text style={styles.text}>Tudo aqui foi feito para honra e glória do senhor Jesus.</Text>
            </View>
            <ButtonComponent title={"IR PARA LOGIN"} icon="arrow-forward" onPress={() => navigation.navigate('Login')} />
        </ImageBackground>
    )
}

export { Welcome }