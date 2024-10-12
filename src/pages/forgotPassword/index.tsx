import { ImageBackground, View, Text } from "react-native";
import { ButtonComponent } from "../../components/ButtonComponent";
import { TextInputComponent } from "../../components/TextInputComponent";
import imgBg from "../../images/bg-1.jpg"
import { styles } from './styles'
import { userForgotPassword } from "../../http/hooks/user/userForgotPassword";
import { useState } from "react";


const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const { forgotPassword, forgotPasswordPending } = userForgotPassword()

    const fetchForgotPassword = () => {
        forgotPassword({ email })
    }

    return (
        <ImageBackground source={imgBg} style={styles.container}>
            <View style={styles.boxForgotPassword}>
                <Text style={styles.title}>Altere sua senha</Text>
                <TextInputComponent placeholder="EMAIL" icon="email" value={email} onChangeText={setEmail} />
                <ButtonComponent title="ENVIAR" isLoading={forgotPasswordPending} onPress={() => fetchForgotPassword()} />
            </View>
        </ImageBackground>
    );
};

export { ForgotPassword }