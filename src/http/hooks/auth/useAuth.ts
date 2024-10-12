import { useMutation } from "@tanstack/react-query";
import AppConnection from "../../axios/AppConnection";
import Toast from "react-native-toast-message";
import { ResponseLoginApi } from "../../types";
import { AuthPostDto } from "../../Dtos/Auth/AuthPostoDto";
import { saveToken } from "../../../services/TokenService";
import { NavigationProp, useNavigation } from "@react-navigation/native"
import useAuthStore from "../../store/useAuth";
type MutationProps = {
    user: AuthPostDto;
};
export const useAuth = () => {
    const navigation = useNavigation<NavigationProp<any>>()
    const { AddAuth } = useAuthStore()
    const {
        mutate: login,
        isSuccess: loginSuccess,
        isError: isErrorOnLogin,
        isPending: isLoading,
    } = useMutation({
        mutationFn: ({ user }: MutationProps) => AppConnection.post<ResponseLoginApi>(`Auth/login`, user),
        onSuccess: (response, { user }) => {
            const token = response.data.token.data
            if (token) {
                saveToken(token)
                navigation.navigate('Home')
                AddAuth()
                return
            }

            Toast.show({
                type: "error",
                text1: response.data.token.message,
            })

        },
        onError: (error) => {
            Toast.show({
                type: "error",
                text1: "Ops... algo deu errado, tente novamente!",

            })
        },
    });

    return { login, loginSuccess, isErrorOnLogin, isLoading }
}

