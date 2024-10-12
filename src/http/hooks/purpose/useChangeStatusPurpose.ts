import { useMutation, useQueryClient } from "@tanstack/react-query";
import AppConnection from "../../axios/AppConnection";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

type MutationProps = {
    id: string;
    status: boolean;
};

export const useChangeStatusPurpose = () => {
    const queryClient = useQueryClient();

    const { mutate: changeStatusPurpose, isPending: isChangeStatusPurpose } = useMutation<
        void,
        AxiosError<unknown>,
        MutationProps,
        unknown
    >({
        mutationFn: ({ id, status }) => AppConnection.patch(`/purpose/changeStatus?id=${id}&status=${status}`),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["purposes"],
            });

            Toast.show({
                type: "success",
                text1: `Purpose alterado com sucesso!`,
            })
        },
        onError: (error) => {
            Toast.show({
                type: "error",
                text1: error.message,
            })
        },
    });

    return { changeStatusPurpose, isChangeStatusPurpose };
};
