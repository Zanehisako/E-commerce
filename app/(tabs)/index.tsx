import SearchBar from '@/components/SearchBar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import ItemCard from '@/components/ItemCard';
import Phone from '@/types/phone';
import CategoryCards from '@/components/CategoriesCards';
import { LegendList } from "@legendapp/list"
import Banner from '@/components/Banner';

export default function HomeScreen() {
  const [phones, setPhones] = useState<Phone[]>()

  async function getPhones() {

    try {
      //console.log('Getting Phones...',)

      const { data, error } = await supabase.from('phones').select()

      if (error) { console.log("error:", error); throw error }

      //console.log('data:', data)

      const phones = data?.map((object) => {
        return object as Phone
      })

      setPhones(phones)


    } catch (e) {
      console.log("error:", e)
    }
  }
  useEffect(() => {
    getPhones()
  }, [])

  useEffect(() => {
    //console.log("phones", phones)
  }, [phones])

  return (
    <ScrollView contentContainerStyle={{ gap: 15 }} style={styles.main}>
      <SearchBar />
      <Banner />
      <Text style={styles.categories}>Categories</Text>
      <CategoryCards></CategoryCards>
      {phones !== undefined && (
        <LegendList
          data={phones}
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
  categories: {
    fontSize: 20,
    fontWeight: "bold"
  }
});
