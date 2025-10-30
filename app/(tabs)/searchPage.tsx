import { View, ScrollView, StyleSheet, Text } from "react-native";
import supabase from "../supabaseClient";
import { useEffect, useState } from "react";
import SearchBar from '@/components/SearchBar';

import { Image } from "expo-image"

import { LegendList } from "@legendapp/list"


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

interface searchItem {
  id?: string,
  name?: string,
  price?: number,
  quantity?: number,
  url?: string,
  description?: string,
  created_at?: string,
}

export function SearchItemCard({ name, price, url }: searchItem) {

  return (
    <View style={styles.cartItemCard}>
      <Image style={styles.image} source={{ uri: url }} cachePolicy={"memory-disk"} placeholder={{ blurhash }} contentFit="cover" transition={1000}></Image>
      <View style={styles.details}>
        <Text style={styles.mainText}>{name}</Text>
        <Text style={styles.mainText}>${price}</Text>
      </View>
    </View >
  )
}

export default function SearchPage() {
  const [searchItems, setSearchItems] = useState<searchItem[]>()
  const queryFunction = async (query: string) => {
    const { data: itemsData, error: itemsError } = await supabase.from("items").select('*').eq('name', query)
    if (itemsError) {
      alert(itemsError.message)
    } else {
      console.log("items:", itemsData)
      const searchItemsDB = itemsData as searchItem[]
      setSearchItems(searchItemsDB)
    }
  }

  return (
    <ScrollView>
      <SearchBar queryFunction={queryFunction} />
      {searchItems !== undefined && (
        <LegendList
          data={searchItems}
          renderItem={({ item }) => <SearchItemCard name={item.name} price={item.price} url={item.url} />}
          keyExtractor={(item) => `${item.id}`}
          numColumns={1}
          contentContainerStyle={{ gap: 10 }}
        ></LegendList>
      )
      }
    </ScrollView>
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
