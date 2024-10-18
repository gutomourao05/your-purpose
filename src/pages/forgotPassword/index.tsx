import { ImageBackground, View, Text, KeyboardAvoidingView, ScrollView, Platform, Keyboard, SafeAreaView } from "react-native";
import { ButtonComponent } from "../../components/ButtonComponent";
import { TextInputComponent } from "../../components/TextInputComponent";
import imgBg from "../../images/bg-1.jpg"
import { styles } from './styles'
import { userForgotPassword } from "../../http/hooks/user/userForgotPassword";
import { useState } from "react";
import { ButtonBack } from "../../components/ButtonBack";

const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const { forgotPassword, forgotPasswordPending } = userForgotPassword()

    const fetchForgotPassword = () => {
        forgotPassword({ email })
    }

    return (
        <ImageBackground source={imgBg} style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} >
                <ScrollView showsVerticalScrollIndicator={false} >
                    <ButtonBack />
                    <View style={styles.boxForgotPassword}>
                        <Text style={styles.title}>Recuperar senha</Text>
                        <TextInputComponent placeholder="EMAIL" icon="email" value={email} onChangeText={setEmail} />
                        <ButtonComponent title="ENVIAR" isLoading={forgotPasswordPending} onPress={() => fetchForgotPassword()} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground >
    );
};

export { ForgotPassword }