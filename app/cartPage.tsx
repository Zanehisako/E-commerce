import CartItemCard from "@/components/CartItemCard";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import supabase from "./supabaseClient";

import { LegendList } from "@legendapp/list";



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
  item_id: string,
  url: string,
  price: number,
  count: number,
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>()

  const addItem = async (id: string) => {
    console.log(`adding item ${id}`,)

    const { data: cartItemData, error: cartItemError } = await supabase.from('cart_items').select('count').eq('id', id).limit(1)
    if (cartItemError) {
      alert(cartItemError.message)
    } else {

      const count = cartItemData[0].count

      const { data: itemData, error: itemError } = await supabase.from('cart_items').update({ 'count': count + 1 }).eq('id', id).limit(1)
      if (itemError) { console.log("itemError:", itemError); throw itemError }
      console.log(`${itemData}`)
      //setitemItems(itemData)
    }
  }
  const deleteItem = async (id: string) => {
    console.log(`Deleting item ${id}`,)


    const { data: itemData, error: itemError } = await supabase.from('cart_items').delete().eq('id', id)
    if (itemError) { console.log("itemError:", itemError); throw itemError }
    console.log(`${itemData}`)
    await getCartItems()
  }

  const removeItem = async (id: string) => {
    console.log(`removing item ${id}`,)

    const { data: cartItemData, error: cartItemError } = await supabase.from('cart_items').select('count').eq('id', id).limit(1)
    if (cartItemError) {
      alert(cartItemError.message)
    } else {
      console.log('item:', cartItemData)

      const count = cartItemData[0].count

      const { data: itemData, error: itemError } = await supabase.from('cart_items').update({ 'count': count - 1 }).eq('id', id).limit(1)
      if (itemError) { console.log("itemError:", itemError); throw itemError }
      console.log(`${itemData}`)
      //setitemItems(itemData)
    }
  }


  const getItem = async (id: string) => {
    console.log(`getting items`,)

    const { data: itemData, error: itemError } = await supabase.from('items').select('id,name,url,price').eq('id', id).limit(1)
    if (itemError) { console.log("itemError:", itemError); throw itemError }
    return itemData[0] as CartItem
    //setitemItems(itemData)
  }

  const getCount = async (id: string) => {
    console.log(`getting new count`,)

    const { data: itemData, error: itemError } = await supabase.from('cart_items').select('count').eq('id', id).limit(1)
    if (itemError) { console.log("itemError:", itemError); throw itemError }
    const newCount = itemData[0].count
    console.log('new count is :', newCount)
    return newCount
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
        cartItems.push({ ...item, id: cartItemDB.id, count: cartItemDB.count })
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
          renderItem={({ item }) => <CartItemCard addItem={addItem} removeItem={removeItem} deleteItem={deleteItem} getCount={getCount} cartItem={item} />}
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
