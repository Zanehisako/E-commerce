import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image"
import { CartItem } from "@/app/cartPage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";

interface props {
  cartItem: CartItem,
  addItem: (id: string) => Promise<void>,
  removeItem: (id: string) => Promise<void>,
  deleteItem: (id: string) => Promise<void>,
  getCount: (id: string) => Promise<number>,
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function CartItemCard({ cartItem, addItem, removeItem, deleteItem, getCount }: props) {
  const [count, setCount] = useState(cartItem.count)
  const [updateCount, setUpdateCount] = useState(false)

  const getNewCount = async () => {
    setCount(await getCount(cartItem.id))
    setUpdateCount(false)
  }

  useEffect(() => {
    getNewCount()
  }, [updateCount === true])
  return (
    <View style={styles.cartItemCard}>
      <Image style={styles.image} source={{ uri: cartItem.url }} cachePolicy={"memory-disk"} placeholder={{ blurhash }} contentFit="cover" transition={1000}></Image>
      <View style={styles.details}>
        <Text style={styles.mainText}>{cartItem.name}</Text>
        <Text style={styles.mainText}>${cartItem.price}</Text>
      </View>
      <View style={styles.itemCount}>
        <Ionicons name="trash-bin" size={14} onPress={() => deleteItem(cartItem.id)}></Ionicons>
        <View style={styles.addRemoveItem}>
          <Button onPress={async () => { await removeItem(cartItem.id); setUpdateCount(true) }} title="-" />
          <Text>{count}</Text>
          <Button onPress={async () => { await addItem(cartItem.id); setUpdateCount(true) }} title="+" />
        </View>
      </View>
    </View >
  )
}
const styles = StyleSheet.create((
  {
    cartItemCard: {
      flexDirection: "row",
      gap: 10,
    },
    details: {
      flexDirection: "column",
      gap: 5,
    },
    itemCount: {
      flexDirection: "column",
      gap: 5,
    },
    addRemoveItem: {
      flexDirection: "row",
      gap: 4,
    },
    image: { backgroundColor: "#EFF1F3", alignSelf: "center", borderRadius: 10, height: 70, width: 70, },
    mainText: { fontSize: 14, fontWeight: "bold", },
    subText: { fontSize: 12, fontWeight: "normal", },
  }
))
