import { ImageBackground, View, Text, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { ButtonComponent } from "../../components/ButtonComponent";
import { TextInputComponent } from "../../components/TextInputComponent";
import imgBg from "../../images/bg-1.jpg"
import { styles } from './styles'
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CREATE_USER_DEFAULT_FORM_VALUES, CreateUserForm, CreateUserSchema } from "./CreateUserForm";
import { useCreateUser } from "../../http/hooks/user/useCreateUser";


const CreateUser = () => {
    const navigation = useNavigation<NavigationProp<any>>()

    const { saveUSer, isPendingUser } = useCreateUser()

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateUserForm>({
        resolver: zodResolver(CreateUserSchema),
        defaultValues: CREATE_USER_DEFAULT_FORM_VALUES,
    });


    const onSubmit = (data: CreateUserForm) => {
        saveUSer({ user: data, onSuccess: () => reset() })
    }

    return (
        <ImageBackground source={imgBg} style={styles.container}>
            <View style={styles.boxCreateUser}>
                <Text style={styles.title}>Crie sua conta</Text>
                <Controller control={control} name="name" render={({ field: { onChange, value, ...rest } }) => (
                    <>
                        <TextInputComponent placeholder="NOME" icon="person" {...rest} value={value} onChangeText={onChange} />
                        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
                    </>
                )} />
                <Controller control={control} name="email" render={({ field: { onChange, value, ...rest } }) => (
                    <>
                        <TextInputComponent placeholder="EMAIL" icon="email" value={value} onChangeText={onChange} {...rest} />
                        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
                    </>
                )} />
                <Controller control={control} name="password" render={({ field: { onChange, value, ...rest } }) => (
                    <>
                        <TextInputComponent placeholder="SENHA" icon="lock" isPassword {...rest} value={value} onChangeText={onChange} />
                        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
                    </>
                )} />

                <Controller control={control} name="confirmPassword" render={({ field: { onChange, value, ...rest } }) => (
                    <>
                        <TextInputComponent placeholder="CONFIRME A SENHA" icon="lock" isPassword {...rest} value={value} onChangeText={onChange} />
                        {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}</>
                )} />
                <ButtonComponent title="CADASTRAR" isLoading={isPendingUser} onPress={handleSubmit(onSubmit)} />
            </View>
        </ImageBackground>
    );
};

export { CreateUser }