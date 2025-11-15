import { useState } from "react";
import { Button, TextInput, View } from "react-native";

export default function AddAddressPage(){
    const [address,setAddress]= useState("")
    return (
        <View>
            <TextInput onChangeText={setAddress} value={address}/>
            <Button onPress={()=>console.log(address)} title="Add new address"/>
        </View>
    )
}