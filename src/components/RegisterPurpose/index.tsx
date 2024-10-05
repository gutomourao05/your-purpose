import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet"
import Checkbox from 'expo-checkbox';
import { styles } from "./styles"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { REGISTER_PURPOSE_DEFAULT_FORM_VALUES, RegisterPurposeForm, RegisterPurposeSchema } from "./RegisterPurposeForm";

type Props = {
    handleSavePress: () => void
}
const RegisterPurposeContent = ({ handleSavePress }: Props) => {

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
    const onSubmit = (data: RegisterPurposeForm) => {
        let newDataInitial = ""
        let newDataFinal = ""
        const arrayDataInitial = data.initialData.split("/")
        const arrayTimeAlert = data.timeAlert.split(":")
        const arrayDataFinal = data.finalDate.split("/")

        if (!data.timeAlert) {
            newDataInitial = `${arrayDataInitial[2]}-${arrayDataInitial[1]}-${arrayDataInitial[0]}T00:00:00.000Z`
            newDataFinal = `${arrayDataFinal[2]}-${arrayDataFinal[1]}-${arrayDataFinal[0]}T00:00:00.000Z`

        } else {
            newDataInitial = `${arrayDataInitial[2]}-${arrayDataInitial[1]}-${arrayDataInitial[0]}T${arrayTimeAlert[0]}:${arrayTimeAlert[1]}:00.000Z`
            newDataFinal = `${arrayDataFinal[2]}-${arrayDataFinal[1]}-${arrayDataFinal[0]}T${arrayTimeAlert[0]}:${arrayTimeAlert[1]}:00.000Z`
        }
        handleSavePress()
        reset()
    }

    const withAlertValue = watch("withAlert");

    return (
        <BottomSheetView style={styles.contentContainer}>
            <KeyboardAvoidingView style={{ marginBottom: -200 }} behavior={Platform.OS === "ios" ? "padding" : "height"} enabled>
                <ScrollView scrollEnabled persistentScrollbar={true} showsVerticalScrollIndicator={true} nestedScrollEnabled={true}>
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
                            <Controller name="initialData" control={control} render={({ field: { value, onChange, ...rest } }) => (
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
                                    {!!errors.initialData && <Text style={styles.error}>{errors.initialData.message}</Text>}
                                </View>
                            )} />

                            <Controller name="finalDate" control={control} render={({ field: { onChange, value, ...rest } }) => (
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
                                    {!!errors.finalDate && <Text style={styles.error}>{errors.finalDate.message}</Text>}
                                </View>
                            )} />
                        </View>

                        <View style={{ display: "flex", flexDirection: "row", marginTop: 10, gap: 12 }}>
                            <View style={{ width: "48%", display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                                <Controller control={control} name="withAlert" render={({ field: { onChange, value, ...rest } }) => (
                                    <>
                                        <Checkbox color={withAlertValue ? "#000" : "#FFF"} style={styles.checkbox} value={value} onValueChange={onChange} {...rest} />
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
                            <Text style={styles.buttonText}>SALVAR</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView >

        </BottomSheetView >
    )
}

export { RegisterPurposeContent }
