import Banner from '@/components/Banner';
import CategoryCards from '@/components/CategoriesCards';
import ItemCard from '@/components/ItemCard';
import Phone from '@/types/phone';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LegendList } from "@legendapp/list";
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import supabase from '../supabaseClient';
import SearchBar from '@/components/SearchBar';
import SearchResult, { SearchItem } from "../searchPage";

export default function HomeScreen() {
  const [items, setItems] = useState<Phone[]>()
  const [searchItems, setSearchItems] = useState<SearchItem[]>()


  const getSearchItems = async (query: string) => {
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

  async function getItems() {

    try {
      //console.log('Getting items...',)

      const { data, error } = await supabase.from('items').select()

      if (error) { console.log("error:", error); throw error }

      //console.log('data:', data)

      const items = data?.map((object) => {
        return object as Phone
      })

      setItems(items)


    } catch (e) {
      console.log("error:", e)
    }
  }
  useEffect(() => {
    getItems()
  }, [])

  useEffect(() => {
    //console.log("items", items)
  }, [items])

  return (
    <ScrollView contentContainerStyle={{ gap: 15 }} style={styles.main}>
      <View style={styles.topBar}>
        <SearchBar queryFunction={getSearchItems} />
        <Ionicons style={styles.cartIcon} name='cart' size={20} onPress={
          () => router.push({
            pathname: "/cartPage",
          })
        } />
      </View>
      {searchItems?.length !== 0 && searchItems ? (
        <SearchResult searchItems={searchItems} />)
        : items !== undefined && (<>
          < Banner />
          <Text style={styles.categories}>Categories</Text>
          <CategoryCards />
          <LegendList
            data={items}
            renderItem={({ item }) => <ItemCard phone={item} />}
            keyExtractor={(item) => `${item.id}`}
            recycleItems
            numColumns={2}
            contentContainerStyle={{ gap: 20 }}
          ></LegendList>
        </>
        )
      }
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
    width: "100%",
    height: "100%",
    padding: 30,
    paddingTop: 70,
    gap: 20,
    backgroundColor: "white"
  },
  topBar: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    paddingRight: 50
  },
  categories: {
    fontSize: 20,
    fontWeight: "bold"
  },
  cartIcon: {
    alignSelf: "flex-start",
    backgroundColor: "#EFF1F3",
    padding: 15,
    borderRadius: 30
  }

});
