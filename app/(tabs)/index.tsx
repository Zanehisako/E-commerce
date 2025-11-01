import SearchBar from '@/components/SearchBar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import ItemCard from '@/components/ItemCard';
import Phone from '@/types/phone';
import CategoryCards from '@/components/CategoriesCards';
import { LegendList } from "@legendapp/list"
import Banner from '@/components/Banner';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [items, setItems] = useState<Phone[]>()

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
        {/* <SearchBar /> */}
        <Ionicons style={styles.carIcon} name='cart' size={20} onPress={
          () => router.push({
            pathname: "/cartPage",
          })
        } />
      </View>
      <Banner />
      <Text style={styles.categories}>Categories</Text>
      <CategoryCards />
      {items !== undefined && (
        <LegendList
          data={items}
          renderItem={({ item }) => <ItemCard phone={item} />}
          keyExtractor={(item) => `${item.id}`}
          recycleItems
          numColumns={2}
          //style={styles.imagesHorizontallScroll}
          contentContainerStyle={{ gap: 20 }}
        ></LegendList>
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
  carIcon: {
    alignSelf: "center",
    backgroundColor: "#EFF1F3",
    padding: 15,
    borderRadius: 30
  }

});
