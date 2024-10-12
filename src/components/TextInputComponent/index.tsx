import { useState } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { styles } from "./styles"
type Props = TextInputProps & {
    placeholder: string
    icon?: keyof typeof MaterialIcons.glyphMap
    isPassword?: boolean
}
const TextInputComponent = ({ placeholder, icon, isPassword = false, ...rest }: Props) => {
    const [showPassword, setShowPassword] = useState(isPassword)
    return (
        <View style={styles.container}>
            <MaterialIcons name={icon} size={20} color="#FFF" />
            <TextInput style={styles.input} placeholder={placeholder} {...rest} placeholderTextColor={'#FFF'} secureTextEntry={showPassword} />
            {isPassword && <MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} size={20} color="#FFF" onPress={() => setShowPassword(!showPassword)} />}
        </View>
    )
}
export { TextInputComponent }