import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image"
import Phone from "@/types/phone";

export default function ItemCard({ phone }: { phone: Phone }) {
  return (
    <View style={styles.itemCard}>
      <Image style={styles.image} source={{ uri: phone.url }}></Image>
      <Text style={styles.nameText}>{phone.name}</Text>
      <Text style={styles.priceText}>${phone.price}</Text>
    </View >
  )
}
const styles = StyleSheet.create((
  {
    itemCard: {
      position: "relative", height: "100%"
    },
    image: { backgroundColor: "#EFF1F3", borderRadius: 20, height: 400, width: 320 },
    nameText: { fontSize: 16, fontWeight: "bold", alignSelf: "center" },
    priceText: { fontSize: 14, fontWeight: "normal", alignSelf: "center" }
  }
))
