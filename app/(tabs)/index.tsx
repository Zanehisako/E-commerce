import SearchBar from '@/components/SearchBar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import ItemCard from '@/components/ItemCard';
import Phone from '@/types/phone';

export default function HomeScreen() {
  const [phones, setPhones] = useState<Phone[]>()

  async function getPhones() {

    try {
      console.log('Getting Phones...',)

      const { data, error } = await supabase.from('phones').select()

      if (error) { console.log("error:", error); throw error }

      console.log('data:', data)

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
    console.log("phones", phones)
  }, [phones])

  return (
    <ScrollView contentContainerStyle={{ gap: 15 }} style={styles.main}>
      <SearchBar />
      <Text style={styles.categories}>Categories</Text>
      <ScrollView contentContainerStyle={{ gap: 10 }} style={styles.imagesHorizontallScroll} horizontal={true}>
        {phones !== undefined && (
          phones.map((phone, i) => {
            return <ItemCard key={i} phone={phone}></ItemCard>
          })
        )
        }
      </ScrollView>
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
  imagesHorizontallScroll: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  categories: {
    fontSize: 20,
    fontWeight: "bold"
  }
});
