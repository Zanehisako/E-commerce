import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import SearchResult, { SearchItem } from "../searchPage";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import SearchBar from "@/components/SearchBar";

export default function SearchPage() {
  const [searchItems, setSearchItems] = useState<SearchItem[]>()
  const [query, setQuery] = useState<string>()
  const getItems = async (query: string) => {
    const { data: itemsData, error: itemsError } = await supabase.from("items").select("*").textSearch('name', `'${query}'`, { type: "websearch" })
    if (itemsError) {
      alert(itemsError.message)
    } else {
      const items = itemsData as SearchItem[]
      console.log("category search items results :", items)
      setSearchItems(items)
    }
  }
  return (
    <ScrollView>
      <SearchBar queryFunction={getItems} />
      {searchItems &&
        <SearchResult searchItems={searchItems} />
      }
    </ScrollView >
  )

}
