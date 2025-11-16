import Ionicons from "@expo/vector-icons/Ionicons";
import { Checkbox } from "expo-checkbox";
import { Text, View } from "react-native";

interface AddressProps {
    address: string;
    deleteSelf:(address:string)=>Promise<void>
    isSelected:boolean
    toggleSelect:(newSelectedAddress:string)=>void
}

export default function Address({ address,deleteSelf,isSelected,toggleSelect }: AddressProps) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Checkbox 
            value={isSelected}
            onValueChange={()=>toggleSelect(address)}
            color={isSelected?"blue":"#ccc"}
            />
            <Text style={{ fontWeight: "bold" }}>{address}</Text>
            <Ionicons name="trash-bin" color={"red"} onPress={()=>deleteSelf(address)}></Ionicons>
        </View>
    )
}