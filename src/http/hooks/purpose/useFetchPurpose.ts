import { useQuery } from "@tanstack/react-query";
import { PurposeDto } from "../../Dtos/Purposes/PurposeDto";
import AppConnection from "../../axios/AppConnection";
import { ResponseApi } from "../../types";
export const useFetchPurpose = () => {
    const {
        data,
        isLoading: isLoadingPurposes,
        isError: isErrorOnFetchPurposes,
    } = useQuery({
        queryKey: ["purposes"],
        queryFn: () => AppConnection.get<ResponseApi<Array<PurposeDto>>>(`/purpose/list`),
    });

    return {
        purposes: data?.data.data ?? [],
        total: data?.data.data.length ?? 0,
        isLoadingPurposes,
        isErrorOnFetchPurposes,
    };
};
