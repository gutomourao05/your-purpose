import { z } from "zod";

export const CreateUserSchema = z.object({
    name: z.string().min(1, "Obrigatório"),
    email: z.string().email("Email inválido").min(1, "Obrigatório"),
    password: z.string().min(1, "Obrigatório"),
    confirmPassword: z.string().min(1, "Obrigatório"),

}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: "custom",
            path: ["confirmPassword"],
            message: "Senhas diferentes",
        });
    }
});;

export type CreateUserForm = z.infer<
    typeof CreateUserSchema
>;

export const CREATE_USER_DEFAULT_FORM_VALUES: CreateUserForm =
{
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}
