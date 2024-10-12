import { useMutation, useQueryClient } from "@tanstack/react-query";
import AppConnection from "../../axios/AppConnection";
import { PurposePostDto } from "../../Dtos/Purposes/PurposePostDto";
import Toast from "react-native-toast-message";
import { ResponseApi } from "../../types";
import { PurposeDto } from "../../Dtos/Purposes/PurposeDto";
type MutationProps = {
    purpose: PurposePostDto;
    onSuccess?: () => void;
};
export const useCreatePurpose = () => {
    const queryClient = useQueryClient();

    const {
        mutate: savePurpose,
        isSuccess: isPurposeSaved,
        isPending: isPendingPurpose,
    } = useMutation({
        mutationFn: ({ purpose }: MutationProps) => {
            return AppConnection.post<ResponseApi<PurposeDto>>(`/purpose/create`, purpose)
        },
        onSuccess: (response, { onSuccess, purpose }) => {
            queryClient.invalidateQueries({
                queryKey: ["purposes"]
            });
            Toast.show({
                type: "success",
                text1: `Purpose ${purpose.name} criado com sucesso!`,
            })

            onSuccess && onSuccess();
        },
        onError: (error) => {
            Toast.show({
                type: "error",
                text1: error.message,
            })
        },
    });

    return { savePurpose, isPurposeSaved, isPendingPurpose }
}

