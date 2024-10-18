import { useMutation, useQueryClient } from "@tanstack/react-query";
import AppConnection from "../../axios/AppConnection";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { removeNotifications } from "../../../utils/notifications";

type MutationProps = {
    id: string;
    arrayNotification: string[];
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
        onSuccess: async (response, { id, arrayNotification }) => {
            queryClient.invalidateQueries({
                queryKey: ["purposes"],
            });

            arrayNotification.map(async (notification) => {
                await removeNotifications(notification);
            })

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
