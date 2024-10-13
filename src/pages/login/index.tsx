import { ImageBackground, View, Text, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { ButtonComponent } from "../../components/ButtonComponent";
import { TextInputComponent } from "../../components/TextInputComponent";
import imgBg from "../../images/bg-1.jpg"
import { styles } from './styles'
import { useState } from "react";
import { useAuth } from "../../http/hooks/auth/useAuth";
import { set } from "react-hook-form";


const Login = () => {
    const navigation = useNavigation<NavigationProp<any>>()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login: loginUser, isLoading } = useAuth()

    const fetchLogin = () => {
        loginUser({
            user: { email, password }, onSuccess: () => {
                setEmail('')
                setPassword('')
            }
        })
    }

    return (
        <ImageBackground source={imgBg} style={styles.container}>
            <View style={styles.boxLogin}>
                <TextInputComponent placeholder="EMAIL" icon="email" value={email} onChangeText={setEmail} />
                <TextInputComponent placeholder="SENHA" icon="lock" isPassword value={password} onChangeText={setPassword} />
                <ButtonComponent title="ENTRAR" isLoading={isLoading} onPress={() => fetchLogin()} />
                <TouchableOpacity onPress={() => navigation.navigate('CreateUser')} activeOpacity={0.7}>
                    <Text style={styles.textForgotPassword}>Crie sua conta</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} activeOpacity={0.7}>
                    <Text style={styles.textForgotPassword}>Perdeu a senha?</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export { Login }