import RadioButton from "@/components/RadioButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Button, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserContext } from "../_layout";
import { AddressItem } from "../addAddress";
import { CartItem } from "../cartPage";
import { Item } from "../itemPage";
import supabase from "../supabaseClient";


export default function CheckoutScreen() {
    const { userProfile } = useContext(UserContext);
    const [currentAddress, setCurrentAddress] = useState<AddressItem>()
    const [item, setItem] = useState<Item>()
    const [cartItem, setCartItem] = useState<CartItem>()
    const cartItemId = "802cda27-6fc6-495c-b528-120c4fda23e1"
    const [paymentMethod, setPaymentMethod] = useState<string>("PayPal")
    const [addPaymentVisible, setAddPaymentMethodVisible] = useState<boolean>(false)
    const [checked, setChecked] = useState<string>('first');

    const getItem = async () => {
        const { data, error } = await supabase.from('cart_items').select("*").eq("id", cartItemId).limit(1).single()
        if (error) {
            alert(error.message)
        } else if (data) {
            setCartItem(data)
            const { data: itemData, error: itemError } = await supabase.from('items').select("*").eq("id", data.item_id).limit(1).single()
            if (itemError) {
                alert(itemError.message)
            } else if (itemData) {
                setItem(itemData)
            }
        }
    }

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
        getItem()
        getCurrentAddress()
    }, [])

    useEffect(() => {
        getCurrentAddress()
    }, [userProfile])

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
            <View style={styles.main}>
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
                <View>
                    <Text style={{ fontWeight: "bold" }}>Shipping Method</Text>
                    <View>
                        <Text>Standard Shipping - Free</Text>
                        <Text>Estimated delivery: 5-7 business days</Text>
                    </View>
                </View>
                <View>
                    <Text style={{ fontWeight: "bold" }}>Items'details</Text>
                    {item && cartItem && (
                        <View>
                            <Image style={styles.image} source={{ uri: item?.url }} />
                            <Text>{item?.name}</Text>
                            <Text>${item?.price}</Text>
                            <View style={{ flexDirection: "row", gap: 5 }}>
                                <Text>count:</Text>
                                <Text>{cartItem?.count}</Text>
                            </View>
                        </View>
                    )}
                </View>
                <Modal 
                presentationStyle="pageSheet"
                onRequestClose={()=>setAddPaymentMethodVisible(false)}
                allowSwipeDismissal={true}
                visible={addPaymentVisible}
                    animationType="slide" >
                    <View style={styles.main}>
                        <Text>New payment:</Text>
                        <Text>Please select a payment method:</Text>

                        <View style={styles.radiobutton}>
                            <RadioButton
                                checked={paymentMethod==="Credit Card"}
                                onPress={() => setPaymentMethod("Credit Card")}
                            />
                            <View style={{flexDirection:"row",alignItems:"center",}}>
                            <Ionicons name="card-outline" size={24} color="black" />
                            <Text>Credit Card</Text>
                            </View>
                        </View>

                        <View style={styles.radiobutton}>
                            <RadioButton
                                checked={paymentMethod==="PayPal"}
                                onPress={() => setPaymentMethod("PayPal")}
                            />

                            <View style={{flexDirection:"row",alignItems:"center",}}>
                            <Ionicons name="logo-paypal" size={24} color="black" />
                            <Text>PayPal</Text>
                            </View>
                        </View>

                        <View style={styles.radiobutton}>
                            <RadioButton
                                checked={paymentMethod==="Google Pay"}
                                onPress={() => setPaymentMethod("Google Pay")}
                            />
                            <View style={{flexDirection:"row",alignItems:"center",}}>
                            <Ionicons name="logo-google" size={24} color="black" />
                            <Text>Google Pay</Text>
                            </View>
                        </View>
                        <Button title="Close" onPress={() => setAddPaymentMethodVisible(false)}></Button>
                    </View>
                </Modal>
                <View>
                    <Text style={{ fontWeight: "bold" }}>Payment method</Text>
                    <TouchableOpacity onPress={() => {
                        //router.push("/addPaymentMethod")
                        setAddPaymentMethodVisible(true)
                    }}>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Text>{userProfile?.payment_method}</Text>
                            <Ionicons name="arrow-forward-outline" />
                        </View>
                    </TouchableOpacity>
                </View>
                {/* This is the container for the button that will be pushed to the bottom */}
                <View style={styles.bottomContainer}>
                    <View>
                        <Text style={{ fontWeight: "bold" }}>Total</Text>
                        {item && cartItem && (
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text>${item.price} x {cartItem.count} items</Text>
                                <Text>${item.price * cartItem.count}</Text>
                            </View>
                        )}
                    </View>
                    <TouchableOpacity style={{ backgroundColor: "blue", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 10 }} onPress={() => {
                        alert("Order placed successfully!")
                    }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    main: {
        flex: 1, // This makes the view take up the full screen height
        top: 50,
        padding: 15,
        gap: 20, // Increased gap for better spacing
        flexDirection: 'column', // Ensures children are laid out vertically
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    image: { borderRadius: 20, height: 100, width: 100 },
    bottomContainer: {
        marginTop: 'auto', // This pushes the container to the bottom
        marginBottom: 50, // Optional: adds some space from the bottom of the screen
    },
    radiobutton:{ flexDirection: "row", alignItems: "center",gap:5 }
})