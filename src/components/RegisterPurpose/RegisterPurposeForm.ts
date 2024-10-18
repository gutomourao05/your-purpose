import { z } from "zod";

const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$/;

export const RegisterPurposeSchema = z.object({
    name: z.string().min(1, "Obrigatório"),
    startDate: z.string().regex(dateRegex, "DD/MM/AAAA"),
    endDate: z.string().regex(dateRegex, "DD/MM/AAAA"),
    withAlert: z.boolean(),
    timeAlert: z.string(),

}).superRefine((data, ctx) => {
    const [startDay, startMonth, startYear] = data.startDate.split("/").map(Number);
    const [endDay, endMonth, endYear] = data.endDate.split("/").map(Number);

    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();

    if (startYear < todayYear ||
        (startYear === todayYear && startMonth < todayMonth) ||
        (startYear === todayYear && startMonth === todayMonth && startDay < todayDay)) {
        ctx.addIssue({
            code: "custom",
            path: ["startDate"],
            message: "Menor que a data de hoje",
        });
    }

    if (endYear < startYear ||
        (endYear === startYear && endMonth < startMonth) ||
        (endYear === startYear && endMonth === startMonth && endDay < startDay)) {
        ctx.addIssue({
            code: "custom",
            path: ["endDate"],
            message: "Menor que a data de inicial",
        });
    }

    if (data.withAlert && !timeRegex.test(data.timeAlert)) {
        ctx.addIssue({
            code: "custom",
            path: ["timeAlert"],
            message: "HH:MM",
        });
    }
});

export type RegisterPurposeForm = z.infer<
    typeof RegisterPurposeSchema
>;

export const REGISTER_PURPOSE_DEFAULT_FORM_VALUES: RegisterPurposeForm =
{
    name: "",
    startDate: "",
    endDate: "",
    withAlert: false,
    timeAlert: "",
}
