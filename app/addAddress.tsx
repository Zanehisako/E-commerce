import Address from "@/components/address";
import { UserProfile } from "@/types/user";
import { LegendList } from "@legendapp/list";
import { useContext, useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import { UserContext } from "./_layout";
import supabase from "./supabaseClient";

export interface AddressItem {
    id:string;
    user_id: string;
    country:string,
    wilaya:string,
    address: string;
    zip_code:string;
    created_at:string
}

export default function AddAddressPage() {
    const { userProfile,setUserProfile } = useContext(UserContext);
    const [addressItems, setAddressItems] = useState<AddressItem[]>()
    const [modalVisible, setModalVisible] = useState(false);
    const [newAddress, setNewAddress] = useState<AddressItem>()
    const [currentAddress, setCurrentAddress] = useState<AddressItem>()

    const getAddress = async () => {
        const { data, error } = await supabase.from('addresses').select('*').eq("user_id", userProfile?.id)
        if (error) {
            alert(error.message)
        } else if (data) {
            setAddressItems(data)
        }
    }
    const deleteAddress = async (addressItem: AddressItem) => {
        const { data, error } = await supabase.from('addresses').delete().eq("id", addressItem.id)
        if (error) {
            alert(error.message)
        } else {
            await getAddress()
        }
    }

    const addAddress = async (addressItem: AddressItem) => {
        const { data, error } = await supabase.from('addresses').insert({ user_id: userProfile?.id, country:addressItem.country ,wilaya:addressItem.wilaya,address:addressItem.address,zip_code:addressItem.zip_code })
        if (error) {
            alert(error.message)
        } else {
            await getAddress()
        }
    }
    const toggleSelect = async (newSelectedAddressItem: AddressItem) => {
    if (!userProfile) return;

    const { error } = await supabase
        .from('users')
        .update({ address: newSelectedAddressItem.id })
        .eq('id', userProfile.id);

    if (error) {
        alert(error.message);
        return;
    }

    // Safe update of your user context
    setUserProfile((prev: UserProfile) => prev ? { ...prev, address: newSelectedAddressItem.id } : prev);

    setCurrentAddress(newSelectedAddressItem);
};


    useEffect(() => {
        getAddress()
    }, [])
    useEffect(() => {
        console.log("Address", addressItems);
    }, [addressItems])
    useEffect(() => {
        console.log("Current Address:", currentAddress);
    }, [currentAddress])

    return (
        <View>
            <Modal
                animationType="slide"
                visible={modalVisible}
            >
                <View style={styles.modal}>
                    <Text>New Address:</Text>
                    {/* <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "100%", padding: 10 }}
                        value={newAddress}
                        onChangeText={setNewAddress}
                    /> */}
                    <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
                        <Button color="red" title="Close" onPress={() => setModalVisible(false)} />
                        <Button title="Add"
                            onPress={async () => {
                                if (newAddress !== undefined) {
                                    await addAddress(newAddress)
                                }
                                setModalVisible(false)
                            }
                            } /> </View>
                </View>
            </Modal>
            {addressItems !== undefined &&
                (
                    <LegendList
                        data={addressItems}
                        renderItem={({ item }) => <Address
                            address={item}
                            deleteSelf={deleteAddress}
                            isSelected={item === currentAddress}
                            toggleSelect={toggleSelect}
                        />}
                        keyExtractor={(item) => item.id}
                        numColumns={1}
                        contentContainerStyle={{ gap: 10 }}
                        extraData={currentAddress}//extraData tells it:➡️ “Hey, rerender children when currentAddress changes.”
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