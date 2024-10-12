import { useMutation, useQueryClient } from "@tanstack/react-query";
import AppConnection from "../../axios/AppConnection";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

type MutationProps = {
    id: string;
};

export const useDeletePurpose = () => {
    const queryClient = useQueryClient();

    const { mutate: deletePurpose, isPending: isDeletingPurpose } = useMutation<
        void,
        AxiosError<unknown>,
        MutationProps,
        unknown
    >({
        mutationFn: ({ id }) => AppConnection.delete(`/purpose/delete?id=${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["purposes"],
            });

            Toast.show({
                type: "success",
                text1: `Purpose deletado com sucesso!`,
            })
        },
        onError: (error) => {
            Toast.show({
                type: "error",
                text1: error.message,
            })
        },
    });

    return { deletePurpose, isDeletingPurpose };
};
