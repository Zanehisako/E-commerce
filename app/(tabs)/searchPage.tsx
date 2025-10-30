import { ScrollView } from "react-native";
import supabase from "../supabaseClient";
import { useState } from "react";
import SearchBar from '@/components/SearchBar';

export default function SearchPage() {
  const [query, setQuery] = useState<string>()
  return (
    <ScrollView>
      <SearchBar />
    </ScrollView>
  )
}
