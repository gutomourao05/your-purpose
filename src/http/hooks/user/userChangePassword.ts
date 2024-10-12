import { useMutation } from "@tanstack/react-query";
import { NavigationProp, useNavigation } from "@react-navigation/native"
import AppConnection from "../../axios/AppConnection";
import Toast from "react-native-toast-message";
import { ResponseApi } from "../../types";
import { deleteToken } from "../../../services/TokenService";

type ChangePasswordProps = {
    password: string;
    newPassword: string;
}
type MutationProps = {
    data: ChangePasswordProps;

    onSuccess?: () => void
};
export const userChangePassword = () => {
    const navigation = useNavigation<NavigationProp<any>>()
    const {
        mutate: changePassword,
        isSuccess: changePasswordSuccess,
        isPending: changePasswordPending,
    } = useMutation({
        mutationFn: ({ data }: MutationProps) => AppConnection.post<ResponseApi<null>>(`/User/changePassword`, data),
        onSuccess: async (response, { onSuccess }) => {

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

            onSuccess && onSuccess();
            await deleteToken();
            navigation.navigate('Login')

        },
        onError: (error) => {
            Toast.show({
                type: "error",
                text1: error.message,
            })
        },
    });

    return { changePassword, changePasswordSuccess, changePasswordPending }
}

