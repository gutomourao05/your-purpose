import React from "react"
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"

import imgBg from "../../images/bg2.jpg"
import { styles } from './styles'
import { ButtonComponent } from "../../components/ButtonComponent"
import { TextInputComponent } from "../../components/TextInputComponent"
import { userChangePassword } from "../../http/hooks/user/userChangePassword"
import { CHANGE_PASSWORD_DEFAULT_FORM_VALUES, ChangePasswordForm, ChangePasswordSchema } from "./ChangePasswordForm"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { ButtonBack } from "../../components/ButtonBack"

const ChangePassword = () => {
    const navigation = useNavigation<NavigationProp<any>>()

    const { changePassword, changePasswordPending } = userChangePassword()

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ChangePasswordForm>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: CHANGE_PASSWORD_DEFAULT_FORM_VALUES,
    });


    const onSubmit = (data: ChangePasswordForm) => {
        changePassword({ data, onSuccess: () => reset() })
    }

    return (
        <ImageBackground source={imgBg} style={styles.container}>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} >
                <ScrollView style={{ marginBottom: 10 }} showsVerticalScrollIndicator={false} >
                    <ButtonBack />

                    <View style={styles.boxLogin}>
                        <Controller control={control} name="password" render={({ field: { onChange, value, ...rest } }) => (
                            <>
                                <TextInputComponent placeholder="SENHA ANTIGA" icon="lock" isPassword value={value} onChangeText={onChange} {...rest} />
                                {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
                            </>
                        )} />
                        <Controller control={control} name="newPassword" render={({ field: { onChange, value, ...rest } }) => (
                            <>
                                <TextInputComponent placeholder="NOVA SENHA" icon="lock" isPassword value={value} onChangeText={onChange} {...rest} />
                                {errors.newPassword && <Text style={styles.error}>{errors.newPassword.message}</Text>}
                            </>
                        )} />
                        <Controller control={control} name="confirmPassword" render={({ field: { onChange, value, ...rest } }) => (
                            <>
                                <TextInputComponent placeholder="CONFIRME A SENHA" icon="lock" isPassword value={value} onChangeText={onChange} {...rest} />
                                {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
                            </>
                        )} />
                        <ButtonComponent title="TROCAR SENHA" isLoading={changePasswordPending} onPress={handleSubmit(onSubmit)} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground >
    )
}

export { ChangePassword }