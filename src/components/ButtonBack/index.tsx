import { MaterialIcons } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { TouchableOpacity, TouchableOpacityProps } from "react-native"

import { styles } from "./styles"

type Props = TouchableOpacityProps & {}

const ButtonBack = ({ ...rest }: Props) => {
    const navigation = useNavigation<NavigationProp<any>>()
    return (
        <TouchableOpacity {...rest} style={styles.buttonBack} activeOpacity={0.7} onPress={() => navigation.goBack()}>
            <MaterialIcons name={"arrow-back"} size={30} color="#FFF" />
        </TouchableOpacity>
    )
}

export { ButtonBack }

