import { AddressItem } from "@/app/addAddress";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Checkbox } from "expo-checkbox";
import { Text, View } from "react-native";

interface AddressProps {
    address: AddressItem;
    deleteSelf:(address:AddressItem)=>Promise<void>
    isSelected:boolean
    toggleSelect:(newSelectedAddress:AddressItem)=>void
}

export default function Address({ address,deleteSelf,isSelected,toggleSelect }: AddressProps) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Checkbox 
            value={isSelected}
            onValueChange={()=>toggleSelect(address)}
            color={isSelected?"blue":"#ccc"}
            />
            <View>
            <Text>{address.country}</Text>
            <Text>{address.wilaya}</Text>
            <Text style={{ fontWeight: "bold" }}>{address.address}</Text>
            <Text style={{ fontWeight: "bold" }}>{address.zip_code}</Text>
            </View>
            <Ionicons name="trash-bin" color={"red"} onPress={()=>deleteSelf(address)}></Ionicons>
        </View>
    )
}