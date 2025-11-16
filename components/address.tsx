import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Address({ address,deleteSelf }: { address: string,deleteSelf:(address:string)=>Promise<void> }) {
    useEffect(() => {
        console.log("Address Component:", address);
    }, [])
    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={{ fontWeight: "bold" }}>{address}</Text>
            <Ionicons name="trash-bin" color={"red"} onPress={()=>deleteSelf(address)}></Ionicons>
        </View>
    )
}