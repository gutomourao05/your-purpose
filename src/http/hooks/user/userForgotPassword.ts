import { useMutation } from "@tanstack/react-query";
import { NavigationProp, useNavigation } from "@react-navigation/native"
import AppConnection from "../../axios/AppConnection";
import Toast from "react-native-toast-message";
import { ResponseApi } from "../../types";
type MutationProps = {
    email: string;
};
export const userForgotPassword = () => {
    const navigation = useNavigation<NavigationProp<any>>()
    const {
        mutate: forgotPassword,
        isSuccess: forgotPasswordSuccess,
        isPending: forgotPasswordPending,
    } = useMutation({
        mutationFn: ({ email }: MutationProps) => AppConnection.get<ResponseApi<null>>(`/User/forgotPassword?email=${email}`),
        onSuccess: (response) => {

            const success = response.data.success

            if (!success) {
                Toast.show({
                    type: "error",
                    text1: response.data.message,
                })
                return
            }

            Toast.show({
                type: "success",
                text1: response.data.message,
            })

            navigation.navigate('Login')

        },
        onError: (error) => {
            Toast.show({
                type: "error",
                text1: error.message,
            })
        },
    });

    return { forgotPassword, forgotPasswordSuccess, forgotPasswordPending }
}

