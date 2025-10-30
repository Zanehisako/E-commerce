import { ScrollView } from "react-native";
import supabase from "../supabaseClient";
import { useState } from "react";
import SearchBar from '@/components/SearchBar';

export default function SearchPage() {
  const queryFunction = async (query: string) => {
    const { data: itemsData, error: itemsError } = await supabase.from("items").select('*').eq('name', query)
    if (itemsError) {
      alert(itemsError.message)
    } else {
      console.log("items:", itemsData)
    }
  }
  return (
    <ScrollView>
      <SearchBar queryFunction={queryFunction} />
    </ScrollView>
  )
}
