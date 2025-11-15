import { router } from "expo-router";
import { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserContext } from "../_layout";

export function Address({address}:{address:string}) {
    return (
        <TouchableOpacity onPress={()=>{
            router.push("/addAddress")
        }}>
            <View>
                <Text>{address}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default function CheckoutScreen() {
    const { userProfile, setUserProfile } = useContext(UserContext);
    useEffect(() => {
        console.log("User Profile in Checkout Screen:", userProfile);
    },[])

    return (
        <ScrollView style={styles.main}>
            <View>
                <Text style={{fontWeight:"bold"}}>Shipping Address</Text>
                <Address address={userProfile?.address!}/>
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
    input:{
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    }
})