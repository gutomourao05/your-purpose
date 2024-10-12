import { z } from "zod";

export const ChangePasswordSchema = z.object({
    password: z.string().min(1, "Obrigatório"),
    newPassword: z.string().min(1, "Obrigatório"),
    confirmPassword: z.string().min(1, "Obrigatório"),

}).superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
        ctx.addIssue({
            code: "custom",
            path: ["confirmPassword"],
            message: "Senhas diferentes",
        });
    }
});;

export type ChangePasswordForm = z.infer<
    typeof ChangePasswordSchema
>;

export const CHANGE_PASSWORD_DEFAULT_FORM_VALUES: ChangePasswordForm =
{
    password: "",
    newPassword: "",
    confirmPassword: "",
}
