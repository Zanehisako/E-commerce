import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image"
import Phone from "@/types/phone";
import { router } from 'expo-router';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function ItemCard({ phone }: { phone: Phone }) {
  return (
    <TouchableOpacity onPress={() => router.push({
      pathname: "/itemPage",
      params: {
        id: phone.id
      }
    })}>
      <View style={styles.itemCard}>
        <Image style={styles.image} source={{ uri: phone.url }} cachePolicy={"memory-disk"} placeholder={{ blurhash }} contentFit="cover" transition={1000}></Image>
        <Text style={styles.nameText}>{phone.name}</Text>
        <Text style={styles.priceText}>${phone.price}</Text>
      </View >
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create((
  {
    itemCard: {
      position: "relative", height: "100%"
    },
    image: { backgroundColor: "#EFF1F3", alignSelf: "center", borderRadius: 20, height: 170, width: 170, },
    nameText: { fontSize: 16, fontWeight: "bold", alignSelf: "center" },
    priceText: { fontSize: 14, fontWeight: "normal", alignSelf: "center" }
  }
))
