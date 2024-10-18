import { useMutation } from "@tanstack/react-query";
import AppConnection from "../../axios/AppConnection";
import Toast from "react-native-toast-message";
import { ResponseLoginApi } from "../../types";
import { saveToken } from "../../../services/TokenService";
import { NavigationProp, useNavigation } from "@react-navigation/native"
import useAuthStore from "../../store/useAuth";
import { AuthPostDto } from "../../dtos/Auth/AuthPostoDto";
type MutationProps = {
    user: AuthPostDto;
    onSuccess?: () => void
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
        onSuccess: async (response, { user, onSuccess }) => {
            const token = response.data.token.data
            if (token) {
                AddAuth()
                await saveToken(token)
                navigation.navigate('Home')
                return
            }

            Toast.show({
                type: "error",
                text1: response.data.token.message,
            })

            onSuccess && onSuccess();

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

