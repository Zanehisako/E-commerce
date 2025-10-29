import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import supabase from "./supabaseClient";
import { useLocalSearchParams } from "expo-router";
import CartItemCard from "@/components/CartItemCard";

import { LegendList } from "@legendapp/list"



interface cartItemDB {
  count: number,
  created_at: string,
  id: string,
  item_id: string,
  user_id: string,
}

export interface CartItem {
  id: string,
  name: string,
  url: string,
  price: number,
  count: number,
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>()

  const getItem = async (id: string) => {
    console.log(`getting items`,)

    const { data: itemData, error: itemError } = await supabase.from('items').select('id,name,url,price').eq('id', id).limit(1)
    if (itemError) { console.log("itemError:", itemError); throw itemError }
    console.log("item :", itemData)
    return itemData[0] as CartItem
    //setitemItems(itemData)
  }

  const getCartItems = async () => {
    try {
      console.log(`getting cart items`,)

      const { data: userData, error: userError } = await supabase.auth.getUser()
      if (userError) {
        alert(userError)
      }
      const user_id = userData.user?.id

      const { data: cartData, error: cartError } = await supabase.from('cart_items').select().eq('user_id', user_id)
      if (cartError) { console.log("cartError:", cartError); throw cartError }
      console.log("cart items:", cartData)
      const carItemsDB = cartData as cartItemDB[]
      var cartItems: CartItem[] = []
      for (const cartItemDB of carItemsDB) {
        const item = await getItem(cartItemDB.item_id)
        cartItems.push({ ...item, count: cartItemDB.count })
      }
      setCartItems(cartItems)
    } catch (e) {
      console.log("cartError:", e)
    }
  }

  useEffect(() => {
    getCartItems()
  }, [])

  return (
    <ScrollView>
      {cartItems !== undefined && (
        <LegendList
          data={cartItems}
          renderItem={({ item }) => <CartItemCard cartItem={item} />}
          keyExtractor={(item) => `${item.id}`}
          numColumns={1}
          contentContainerStyle={{ gap: 10 }}
        ></LegendList>
      )
      }
    </ScrollView>
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
