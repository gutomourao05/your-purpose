import { useMutation, useQueryClient } from "@tanstack/react-query";
import AppConnection from "../../axios/AppConnection";
import { PurposePostDto } from "../../dtos/Purposes/PurposePostDto";
import Toast from "react-native-toast-message";
import { ResponseApi } from "../../types";
import { PurposeDto } from "../../dtos/Purposes/PurposeDto";
import { saveNotifications } from "../../../utils/notifications";
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
        mutationFn: async ({ purpose }: MutationProps) => {
            const arrayNotifications = await saveNotifications(purpose.startDate, purpose.endDate, `Notificação de ${purpose.name}`, `Você solicitou notificações sobre ${purpose.name}`);

            return await AppConnection.post<ResponseApi<PurposeDto>>(`/purpose/create`, {
                name: purpose.name,
                startDate: purpose.startDate,
                endDate: purpose.endDate,
                withAlert: purpose.withAlert,
                notifications: arrayNotifications
            })
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

