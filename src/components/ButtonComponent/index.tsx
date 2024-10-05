import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { styles } from "./styles"
type Props = TouchableOpacityProps & {
    title: string
    isLoading?: boolean
    icon?: keyof typeof MaterialIcons.glyphMap
}
const ButtonComponent = ({ title, isLoading = false, ...rest }: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.container}
            {...rest} >
            {isLoading ? <ActivityIndicator color={'#000'} /> : <Text style={styles.title}>{title}</Text>}
            {rest.icon && <MaterialIcons name={rest.icon} size={24} color="#000" />}
        </TouchableOpacity >
    )
}

export { ButtonComponent }