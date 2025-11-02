import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import SearchResult, { SearchItem } from "./searchPage";
import { useEffect, useState } from "react";
import supabase from "./supabaseClient";

export default function CategorySearchPage() {
  const { name }: { name: string } = useLocalSearchParams()
  const [searchItems, setSearchItems] = useState<SearchItem[]>()
  const getItems = async () => {
    console.log('category name:', name.trim().toLowerCase())
    const { data: itemsData, error: itemsError } = await supabase.from("items").select("*").eq("category", name.trim())
    if (itemsError) {
      alert(itemsError.message)
    } else {
      const items = itemsData as SearchItem[]
      console.log("category search items results :", items)
      setSearchItems(items)
    }
  }
  useEffect(() => {
    getItems()
  }, [])
  return (
    <ScrollView>
      {searchItems &&
        <SearchResult searchItems={searchItems} />
      }
    </ScrollView >
  )

}
