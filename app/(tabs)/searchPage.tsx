import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import SearchResult, { SearchItem } from "../searchPage";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import SearchBar from "@/components/SearchBar";

export default function SearchPage() {
  const [searchItems, setSearchItems] = useState<SearchItem[]>()
  const getItems = async (query: string) => {
    //const { data: itemsData, error: itemsError } = await supabase.from("items").select("*").textSearch('name', `'${query}'`, { type: "websearch" })
    const { data: itemsData, error: itemsError } = await supabase.rpc('fuzzy_search_items', { query: query });
    if (itemsError) {
      alert(itemsError.message)
    } else {
      const items = itemsData as SearchItem[]
      console.log("category search items results :", items)
      setSearchItems(items)
    }
  }
  useEffect(() => {
    console.log("search items changed");
  }, [searchItems])
  return (
    <ScrollView style={styles.main}>
      <SearchBar queryFunction={getItems} />
      {searchItems &&
        <SearchResult searchItems={searchItems} />
      }
    </ScrollView >
  )

}
const styles = StyleSheet.create({
  main: {
    top: 50,
    gap: 10,
    padding: 10,
  }
})
