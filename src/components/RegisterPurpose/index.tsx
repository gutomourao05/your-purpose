import { ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet"
import { Checkbox } from 'expo-checkbox';
import { styles } from "./styles"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { REGISTER_PURPOSE_DEFAULT_FORM_VALUES, RegisterPurposeForm, RegisterPurposeSchema } from "./RegisterPurposeForm";
import { useCreatePurpose } from "../../http/hooks/purpose/useCreatePurpose";
import { formatDate } from "../../utils/formatDateWithAlert";

type Props = {
    handleSavePress: () => void
}

const RegisterPurposeContent = ({ handleSavePress }: Props) => {
    const { savePurpose, isPendingPurpose } = useCreatePurpose()
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<RegisterPurposeForm>({
        resolver: zodResolver(RegisterPurposeSchema),
        defaultValues: REGISTER_PURPOSE_DEFAULT_FORM_VALUES,
    });
    const onSubmit = async (data: RegisterPurposeForm) => {
        const startDate = formatDate(data.startDate, data.timeAlert);
        const endDate = formatDate(data.endDate, data.timeAlert);
        savePurpose({
            purpose: {
                name: data.name,
                startDate: startDate,
                endDate: endDate,
                withAlert: data.withAlert,
                notifications: []
            }, onSuccess: () => {
                reset();
                handleSavePress();
            }
        })
    }

    const withAlertValue = watch("withAlert");

    return (
        <BottomSheetView style={styles.contentContainer}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView style={{ marginBottom: -235 }} showsVerticalScrollIndicator={false}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Cadastre seu propósito</Text>
                            <Text style={styles.titleSmall}>Em nome de Jesus</Text>
                        </View>
                        <View style={styles.body}>
                            <View>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field: { onChange, value, ...rest } }) => (
                                        <View >
                                            <Text style={styles.label}>Nome</Text>
                                            <BottomSheetTextInput
                                                placeholder="Dê um nome para o propósito"
                                                placeholderTextColor={"gray"}
                                                style={styles.input}
                                                value={value}
                                                onChangeText={onChange}
                                                {...rest}
                                            />
                                            {!!errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
                                        </View>
                                    )} />
                            </View>
                            <View style={{ width: "100%", display: "flex", flexDirection: "row", marginTop: 4, gap: 12 }}>
                                <Controller name="startDate" control={control} render={({ field: { value, onChange, ...rest } }) => (
                                    <View style={{ width: "48%" }} >
                                        <Text style={styles.label}>Data inicial</Text>
                                        <BottomSheetTextInput
                                            placeholder="DD/MM/AAAA"
                                            placeholderTextColor={"gray"}
                                            style={styles.inputDate}
                                            value={value}
                                            onChangeText={onChange}
                                            {...rest}
                                        />
                                        {!!errors.startDate && <Text style={styles.error}>{errors.startDate.message}</Text>}
                                    </View>
                                )} />

                                <Controller name="endDate" control={control} render={({ field: { onChange, value, ...rest } }) => (
                                    <View style={{ width: "48%" }}>
                                        <Text style={styles.label}>Data final</Text>
                                        <BottomSheetTextInput
                                            placeholder="DD/MM/AAAA"
                                            placeholderTextColor={"gray"}
                                            style={styles.inputDate}
                                            value={value}
                                            onChangeText={onChange}
                                            {...rest}
                                        />
                                        {!!errors.endDate && <Text style={styles.error}>{errors.endDate.message}</Text>}
                                    </View>
                                )} />
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", marginTop: 10, gap: 12 }}>
                                <View style={{ width: "48%", display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                                    <Controller control={control} name="withAlert" render={({ field: { onChange, value, ...rest } }) => (
                                        <>
                                            <Checkbox
                                                color={withAlertValue ? "#000" : "#FFF"}
                                                style={styles.checkbox}
                                                value={value}
                                                onValueChange={onChange} {...rest} />
                                            <Text style={styles.labelCheckbox}>Deseja ativar alerta?</Text></>
                                    )} />
                                </View>

                                <Controller name="timeAlert" control={control} render={({ field: { value, onChange, ...rest } }) => (
                                    <View style={{ width: "48%" }}>
                                        <Text style={styles.label}>Hora alerta</Text>
                                        <BottomSheetTextInput
                                            placeholder="HH:MM"
                                            placeholderTextColor={"gray"}
                                            style={styles.inputDate}
                                            editable={withAlertValue}
                                            value={value}
                                            onChangeText={(value) => onChange(value)}
                                            {...rest}
                                        />
                                        {!!errors.timeAlert && <Text style={styles.error}>{errors.timeAlert.message}</Text>}
                                    </View>
                                )} />
                            </View>

                            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleSubmit(onSubmit)}>
                                {isPendingPurpose ? <ActivityIndicator color={'#000'} size={'large'} /> : <Text style={styles.buttonText}>SALVAR</Text>}
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </KeyboardAvoidingView >

        </BottomSheetView >
    )
}

export { RegisterPurposeContent }
