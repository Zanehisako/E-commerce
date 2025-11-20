import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

export default function RadioButton({ checked,  onPress }: { checked: boolean; onPress: () => void }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Ionicons color={checked?"green":"grey"} name="checkmark-circle-outline" size={24}></Ionicons>
        </TouchableOpacity>
    )
}