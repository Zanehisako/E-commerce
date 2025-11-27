import AnimatedButton from "@/components/AnimatedButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { UserContext } from "./_layout";
import supabase from "./supabaseClient";

export interface Item {
  id: string,
  name: string,
  category: string,
  description: string,
  url: string,
  price: number,
  raiting: number,
  numberOfReviews: number,
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function ItemPage() {
  const params = useLocalSearchParams();
  const id = params.id
  const [item, setItem] = useState<Item>()

  const { userProfile, setUserProfile } = useContext(UserContext);
  const getItem = async () => {
    try {
      console.log(`Getting details for id ${id}...`,)

      const { data, error } = await supabase.from('items').select().eq('id', id).limit(1)

      if (error) { console.log("error:", error); throw error }

      const item = data[0] as Item
      console.log("item:", item)
      setItem(item)

    } catch (e) {
      console.log("error:", e)
    }
  }


  const addToCart = async () => {
    try {
      console.log(`adding item to cart`,)


      const { data: cartData, error: cartError } = await supabase.from('cart_items').insert({ item_id: id, count: 1, user_id: userProfile?.id })
      if (cartError) { console.log("cartError:", cartError); throw cartError }
      console.log(`done adding item ${id} to cart`)

    } catch (e) {
      console.log("cartError:", e)
    }
  }

  useEffect(() => {
    getItem()
  }, [])

  return (
    <>
      {item !== undefined &&
        <ScrollView contentContainerStyle={styles.main}>
          <Image style={styles.image} source={{ uri: item.url }} contentFit="fill" cachePolicy={"memory-disk"} placeholder={{ blurhash }} ></Image>
          <View style={styles.namePriceDescriptionContainer}>
            <View style={styles.namePriceContainer}>
              <Text style={styles.bigText}>{item.name}</Text>
              <Text style={styles.bigText}>${item.price}</Text>
            </View>
            <Text style={styles.smallText}>{item.category}</Text>
          </View>
          <View style={styles.raitingContainer}>
            <Ionicons name="star" color={"yellow"} size={10}></Ionicons>
            <Text>{item.raiting}</Text>
            <Text style={styles.smallText}>{item.numberOfReviews}</Text>
          </View>
          <Text style={styles.bigText}>Description:</Text>
          <Text style={styles.smallText}>{item.description}</Text>
          <View style={{ gap: 10, flexDirection: "row", justifyContent: "center" }}>
            <AnimatedButton style={{ backgroundColor: "blue" }} text="Buy Now" onPress={async () => {

              const { data: insertData, error } = await supabase.from("cart_items").insert({ user_id: userProfile?.id, item_id: id, count: 1 })
              if (error) {
                alert(`error adding to cart:\n${error.message}`);
              }
              else {
                const { data: cartItemData, error } = await supabase.from("cart_items").select("id").eq("item_id", id).single()
                if (error) {
                  alert(`error getting cart item id:\n${error.message}`);
                } else {

                  const cartItemId = cartItemData.id
                  console.log("cartItemId:", cartItemId)

                  router.push({
                    pathname: "/checkoutScreen", params: {
                      cartItemId: cartItemId,
                    }
                  })
                }
              }
            }} />
            <AnimatedButton style={{ backgroundColor: "grey" }} text="Add to cart" onPress={async () => { await addToCart() }} />
          </View>
        </ScrollView >}
    </>
  )
}

const styles = StyleSheet.create({
  main: {
    padding: 30,
    gap: 30,
  },
  bigText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  smallText: {
    fontSize: 12,
    color: "grey"
  },
  namePriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  namePriceDescriptionContainer: {
    flexDirection: "column",
    gap: 5
  },
  raitingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 15,
    borderWidth: 1,
  },
  image: { borderRadius: 20, height: 300, width: 350 },
})
