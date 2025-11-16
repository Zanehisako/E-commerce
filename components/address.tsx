import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Address({address}:{address:string}) {
    useEffect(() => {
        console.log("Address Component:", address);
    },[])
    return (
        <View>
            <Text style={{fontWeight:"bold"}}>{address}</Text>
        </View>
    )
}