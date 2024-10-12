import { useMutation } from "@tanstack/react-query";
import AppConnection from "../../axios/AppConnection";
import Toast from "react-native-toast-message";
import { ResponseApi } from "../../types";
import { UserPostDto } from "../../Dtos/Users/UserPostDto";
import { UserDto } from "../../Dtos/Users/UserDto";
import { NavigationProp, useNavigation } from "@react-navigation/native"
type MutationProps = {
    user: UserPostDto;
    onSuccess?: () => void;
};
export const useCreateUser = () => {
    const navigation = useNavigation<NavigationProp<any>>()
    const {
        mutate: saveUSer,
        isSuccess: isUserSaved,
        isPending: isPendingUser,
    } = useMutation({
        mutationFn: ({ user }: MutationProps) => AppConnection.post<ResponseApi<UserDto>>(`/user/create`, user),
        onSuccess: (response, { onSuccess }) => {
            if (response.data.success) {
                Toast.show({
                    type: "success",
                    text1: response.data.message,
                })
                onSuccess && onSuccess();
                navigation.navigate('Login')
            }
        },
        onError: (error) => {
            Toast.show({
                type: "error",
                text1: error.message,
            })
        },
    });

    return { saveUSer, isUserSaved, isPendingUser }
}

