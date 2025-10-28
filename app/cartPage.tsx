import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import supabase from "./supabaseClient";
import { useLocalSearchParams } from "expo-router";

export interface Item {
  name: string,
  category: string,
  description: string,
  url: string,
  price: number,
  raiting: number,
  numberOfReviews: number,
}

export default function CartPage() {

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
    } catch (e) {
      console.log("cartError:", e)
    }
  }

  useEffect(() => {
    getCartItems()
  }, [])

  return (
    <ScrollView></ScrollView>
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
