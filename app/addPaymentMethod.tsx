import RadioButton from "@/components/RadioButton";
import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";


export interface PaymentItem {
    id: string;
    user_id: string;
    country: string,
    wilaya: string,
    payment: string;
    zip_code: string;
    created_at: string
}

export default function AddPaymentPage() {
      const [checked, setChecked] = useState(false);
    //     const { userProfile,setUserProfile } = useContext(UserContext);
    //     const [paymentItems, setpaymentItems] = useState<string[]>()
    //     const [modalVisible, setModalVisible] = useState(false);
    //     const [newpayment, setNewpayment] = useState<string>()
    //     const [currentpayment, setCurrentpayment] = useState<string>()

    //     const getpayment = async () => {
    //         const { data, error } = await supabase.from('paymentes').select('*').eq("user_id", userProfile?.id)
    //         if (error) {
    //             alert(error.message)
    //         } else if (data) {
    //             setpaymentItems(data)
    //         }
    //     }
    //     const deletepayment = async (paymentItem: string) => {
    //         const { data, error } = await supabase.from('paymentes').delete().eq("id", paymentItem.id)
    //         if (error) {
    //             alert(error.message)
    //         } else {
    //             await getpayment()
    //         }
    //     }

    //     const addpayment = async (paymentItem: paymentItem) => {
    //         const { data, error } = await supabase.from('paymentes').insert({ user_id: userProfile?.id, country:paymentItem.country ,wilaya:paymentItem.wilaya,payment:paymentItem.payment,zip_code:paymentItem.zip_code })
    //         if (error) {
    //             alert(error.message)
    //         } else {
    //             await getpayment()
    //         }
    //     }
    //     const toggleSelect = async (newSelectedpaymentItem: paymentItem) => {
    //     if (!userProfile) return;

    //     const { error } = await supabase
    //         .from('users')
    //         .update({ payment: newSelectedpaymentItem.id })
    //         .eq('id', userProfile.id);

    //     if (error) {
    //         alert(error.message);
    //         return;
    //     }

    //     // Safe update of your user context
    //     setUserProfile((prev: UserProfile) => prev ? { ...prev, payment: newSelectedpaymentItem.id } : prev);

    //     setCurrentpayment(newSelectedpaymentItem);
    // };


    //     useEffect(() => {
    //         getpayment()
    //     }, [])
    //     useEffect(() => {
    //         console.log("payment", paymentItems);
    //     }, [paymentItems])
    //     useEffect(() => {
    //         console.log("Current payment:", currentpayment);
    //     }, [currentpayment])

    return (
        <Modal animationType="slide">
            <View style={styles.main}>
                <Text>New payment:</Text>
                <Text>Please select a payment method:</Text>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton
                        checked={checked}
                        onPress={() => setChecked(!checked)}
                    />
                    <Text>Credit Card</Text>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 20,
        gap: 10
    },
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