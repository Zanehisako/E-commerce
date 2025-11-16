import Address from "@/components/address";
import { LegendList } from "@legendapp/list";
import { useContext, useEffect, useState } from "react";
import { Button, View } from "react-native";
import { UserContext } from "./_layout";
import supabase from "./supabaseClient";


export default function AddAddressPage() {
    const { userProfile} = useContext(UserContext);
    const [addressItems, setAddressItems] = useState<string[]>()
    const getAddress = async () => {
        const { data, error } = await supabase.from('addresses').select('address').eq("user_id", userProfile?.id)
        if (error) {
            alert(error.message)
        } else if (data) {
            const addresses = data.map((item) => item.address)
            setAddressItems(addresses)
        }
    }
    const deleteAddress = async(address:string)=>{
        const { data, error } = await supabase.from('addresses').delete().eq("address", address).eq("user_id", userProfile?.id)
        if (error) {
            alert(error.message)
        } else {
            await getAddress()
        }
    }

    useEffect(() => {
        getAddress()
    }, [])
    useEffect(() => {
        console.log("Address", addressItems);
    }, [addressItems !== undefined])

    return (
        <View>
            {addressItems !== undefined &&
                (
                    <LegendList
                        data={addressItems}
                        renderItem={({ item }) => <Address address={item} deleteSelf={deleteAddress}/>}
                        keyExtractor={(item) => `${item}`}
                        numColumns={1}
                        contentContainerStyle={{ gap: 10 }}
                    ></LegendList>
                )}
            <Button onPress={() => { }} title="Add new address" />
        </View>
    )
}