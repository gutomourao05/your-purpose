import { ImageBackground, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { ButtonComponent } from "../../components/ButtonComponent";
import { TextInputComponent } from "../../components/TextInputComponent";
import imgBg from "../../images/bg-1.jpg"
import { styles } from './styles'


const Login = () => {
    const navigation = useNavigation<NavigationProp<any>>()
    return (
        <ImageBackground source={imgBg} style={styles.container}>
            <View style={styles.boxLogin}>
                <TextInputComponent placeholder="EMAIL" icon="email" />
                <TextInputComponent placeholder="SENHA" icon="lock" isPassword />
                <ButtonComponent title="ENTRAR" isLoading={false} onPress={() => navigation.navigate('Home')} />
            </View>
        </ImageBackground>
    );
};

export { Login }