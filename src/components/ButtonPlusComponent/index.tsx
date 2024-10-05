import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { styles } from "./styles"
type Props = TouchableOpacityProps & {
}
const ButtonPlusComponent = ({ ...rest }: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.container}
            {...rest} >
            <MaterialIcons name="add" size={36} color="#FFF" />
        </TouchableOpacity >
    )
}

export { ButtonPlusComponent }