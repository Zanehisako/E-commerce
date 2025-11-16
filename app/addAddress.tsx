import Address from "@/components/address";
import { LegendList } from "@legendapp/list";
import { useContext, useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { UserContext } from "./_layout";
import supabase from "./supabaseClient";


export default function AddAddressPage() {
    const { userProfile} = useContext(UserContext);
    const [addressItems, setAddressItems] = useState<string[]>()
    const [modalVisible, setModalVisible] = useState(false);
    const [newAddress, setNewAddress] = useState("")

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

    const addAddress= async(address:string)=>{
        const { data, error } = await supabase.from('addresses').insert({ user_id: userProfile?.id, address: address })
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
            <Modal
            animationType="slide"
            visible={modalVisible}
            >
                <View style={styles.modal}>
                    <Text>New Address:</Text>
                    <TextInput 
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, width:"100%", padding:10}}
                    value={newAddress}
                    onChangeText={setNewAddress}
                    />
                    <View style={{flexDirection:"row",justifyContent:"space-around",width:"100%"}}>
                        <Button color="red" title="Close" onPress={() => setModalVisible(false)} />
                        <Button title="Add" 
                        onPress={async () => {
                            if (newAddress!=="") {
                            await addAddress(newAddress)
                            }
                            setModalVisible(false)}
                            } /> </View>
                </View>
            </Modal>
            {addressItems !== undefined &&
                (
                    <LegendList
                        data={addressItems}
                        renderItem={({ item }) => <Address address={item} deleteSelf={deleteAddress} />}
                        keyExtractor={(item) => `${item}`}
                        numColumns={1}
                        contentContainerStyle={{ gap: 10 }}
                    ></LegendList>
                )}
            <Button onPress={() => setModalVisible(true)} title="Add new address" />
        </View>
    )
}
const styles = StyleSheet.create({
    modal: {
        justifyContent: "center",
        alignContent: "center",
        padding: 20,
        gap: 10,
        height: "80%",
        width: "100%",
    },
    closeButton: {
        backgroundColor: "red",
    },
    addButton: {
        backgroundColor: "green",
    }
})