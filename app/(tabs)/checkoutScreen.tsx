import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserContext } from "../_layout";
import { AddressItem } from "../addAddress";
import supabase from "../supabaseClient";


export default function CheckoutScreen() {
    const { userProfile } = useContext(UserContext);
    const [currentAddress, setCurrentAddress] = useState<AddressItem>()

    const getCurrentAddress = async () => {
        console.log(`Fetching current address ${userProfile?.address}...`);
        const { data, error } = await supabase.from('addresses').select('*').eq("id", userProfile?.address).limit(1).single()
        if (error) {
            alert(error.message)
        } else if (data) {
            setCurrentAddress(data)
        }
    }
    useEffect(() => {
        getCurrentAddress()
    }, [])

    useEffect(() => {
        getCurrentAddress()
    }, [userProfile])

    return (
        <ScrollView style={styles.main}>
            <View>
                <Text style={{ fontWeight: "bold" }}>Shipping Address</Text>
                <TouchableOpacity onPress={() => {
                    router.push("/addAddress")
                }}>
                    <View>
                        <Text>{currentAddress?.address}</Text>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Text>{currentAddress?.country}</Text>
                            <Text>{currentAddress?.wilaya}</Text>
                            <Text>{currentAddress?.zip_code}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    main: {
        top: 50,
        padding: 15,
        gap: 15,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    }
})