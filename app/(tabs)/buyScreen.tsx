import { ScrollView, StyleSheet, Text, View } from "react-native";

export function Address({address}:{address:string}) {
    return (
        <View>
        <Text>{address}</Text>
        </View>
    )
}

export default function name() {
    return (
        <ScrollView style={styles.main}>
            <View>
                <Text style={{fontWeight:"bold"}}>Shipping Address</Text>
                <Address address=""/>
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