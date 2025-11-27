import RadioButton from "@/components/RadioButton";
import { UserProfile } from "@/types/user";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Button, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserContext } from "./_layout";
import { AddressItem } from "./addAddress";
import { CartItem } from "./cartPage";
import { Item } from "./itemPage";
import supabase from "./supabaseClient";


export default function CheckoutScreen() {
    const { userProfile, setUserProfile } = useContext(UserContext);
    const [currentAddress, setCurrentAddress] = useState<AddressItem>()
    const [items, setItems] = useState<Item[]>()
    const [cartItems, setCartItems] = useState<CartItem[]>()
    const [paymentMethod, setPaymentMethod] = useState<string>("PayPal")
    const [addPaymentVisible, setAddPaymentMethodVisible] = useState<boolean>(false)
    const [totalPrice, setTotalPrice] = useState(0.0);
    const items_count = cartItems?.reduce((total, item) => total + item.count, 0);
    const params = useLocalSearchParams();
    const { cartItemId } = params; // Destructure the parameters you expect

    const getUserProfile = async () => {
        const user_id = (await supabase.auth.getUser()).data.user?.id
        console.log("user_id:", user_id)
        const { data, error } = await supabase.from('users').select('*').eq('id', user_id).single();
        if (error) {
            alert("Error fetching user profile:" + error.message);
        } else if (data) {
            const userData = data as UserProfile;
            console.log("Fetched user profile:", userData);
            setUserProfile(userData);
        }
    }

    const getCartItems = async () => {
        const { data, error } = await supabase.from('cart_items').select("*").eq("id", cartItemId)
        if (error) {
            alert(error.message)
        } else if (data) {
            setCartItems(data)
        }
    }
    const getItems = async () => {
        var items = []
        var total_price = 0.0;
        for (let i = 0; i < (cartItems?.length || 0); i++) {
            const cartItem = cartItems?.[i];
            if (cartItem) {
                const { data: itemData, error: itemError } = await supabase.from('items').select("*").eq("id", cartItem.item_id).limit(1).single()
                if (itemError) {
                    alert(itemError.message)
                } else if (itemData) {
                    items.push(itemData)
                    total_price += (itemData.price * cartItem.count);
                }
            }
        }
        setTotalPrice(total_price)
        setItems(items)
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
    const updatePayment = async () => {
        const { error } = await supabase.from("users").update({ payment_method: paymentMethod }).eq("id", userProfile?.id)
        if (error) {
            alert(error.message)
        } else {
            alert("Payment method updated successfully")
            await getUserProfile()
        }
    }
    const addOrder = async () => {
        console.log(`Placing order...`);
        const { data, error } = await supabase.from("orders").insert({
            user_id: userProfile?.id,
            cart_items: cartItems?.map((item) => item.id),
            count: items_count,
            price: totalPrice,
            address_id: currentAddress?.id,
            payment_method: paymentMethod,
        })
        if (error) {
            alert(error.message)
        } else {
            console.log("Order placed:", data)
            console.log("Deleting cart items...", cartItems)
            if (cartItems) {
                const ids = cartItems?.map((item) => item.id)
                console.log("Deleting cart items with ids:", ids)
                const { data, error } = await supabase.from("cart_items").delete().in("id", ids)
                if (error) {
                    alert(error.message)
                } else {
                    alert("Order placed successfully")
                }
            }
        }
    }
    useEffect(() => {
        console.log("id", cartItemId)
        getCartItems()
        getCurrentAddress()
    }, [])

    useEffect(() => {
        getItems()
    }, [cartItems])

    useEffect(() => {
        getCurrentAddress()
    }, [userProfile])

    useEffect(() => {
        updatePayment()
    }, [paymentMethod])

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
                    {items && cartItems && (
                        <View style={{ gap: 10 }}>
                            {items.map((item, index) => {
                                const cartItem = cartItems.find(ci => ci.item_id === item.id);
                                return (
                                    <View key={item.id} >
                                        <Image style={styles.image} source={{ uri: item.url }} />
                                        <View>
                                            <Text>{item.name}</Text>
                                            <View style={{ flexDirection: "row", gap: 5 }}>
                                                <Text>${item.price}</Text>
                                                <View style={{ flexDirection: "row", gap: 5 }}>
                                                    <Text>count:</Text>
                                                    <Text>{cartItem?.count}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>)
                            })}
                            <View style={{ flexDirection: "row", gap: 5 }}>
                                <Text style={{ fontWeight: "bold" }}>total count:</Text>
                                <Text>{items_count}</Text>
                            </View>
                        </View>
                    )}
                </View>
                <Modal
                    presentationStyle="pageSheet"
                    onRequestClose={() => setAddPaymentMethodVisible(false)}
                    allowSwipeDismissal={true}
                    visible={addPaymentVisible}
                    animationType="slide" >
                    <View style={styles.main}>
                        <Text>New payment:</Text>
                        <Text>Please select a payment method:</Text>

                        <View style={styles.radiobutton}>
                            <RadioButton
                                checked={paymentMethod === "Credit Card"}
                                onPress={() => setPaymentMethod("Credit Card")}
                            />
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Ionicons name="card-outline" size={24} color="black" />
                                <Text>Credit Card</Text>
                            </View>
                        </View>

                        <View style={styles.radiobutton}>
                            <RadioButton
                                checked={paymentMethod === "PayPal"}
                                onPress={() => setPaymentMethod("PayPal")}
                            />

                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Ionicons name="logo-paypal" size={24} color="black" />
                                <Text>PayPal</Text>
                            </View>
                        </View>

                        <View style={styles.radiobutton}>
                            <RadioButton
                                checked={paymentMethod === "Google Pay"}
                                onPress={() => setPaymentMethod("Google Pay")}
                            />
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
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
                    <View style={{ gap: 10 }}>
                        <Text style={{ fontWeight: "bold" }}>Total</Text>
                        {items && cartItems && items.map((item, index) => {
                            const cartItem = cartItems.find(ci => ci.item_id === item.id);
                            return (
                                <View key={item.id} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
                                    <Text>${item.price} x {cartItem?.count}</Text>
                                    <Text>${totalPrice}</Text>
                                </View>)
                        })}
                    </View>
                    <TouchableOpacity style={{ backgroundColor: "blue", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 10 }} onPress={async () => {
                        await addOrder()
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
    radiobutton: { flexDirection: "row", alignItems: "center", gap: 5 }
})