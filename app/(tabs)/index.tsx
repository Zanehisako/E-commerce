import SearchBar from '@/components/SearchBar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LegendList } from "@legendapp/list";
import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import supabase from '../supabaseClient';
import ItemCard from '@/components/ItemCard';

export default function HomeScreen() {
  const [imagesNames, setImagesNames] = useState<string[]>()

  async function downloadImage() {

    try {
      console.log('Downloading images',)

      const { data, error } = await supabase.storage.from('images').list("phones", {
        offset: 1//we skip the metadata about the folder so we only retrives the phones
      })

      if (error) { console.log("error:", error); throw error }

      const names = data?.map((object) => {
        return object.name
      })

      //console.log("names:", names)

      setImagesNames(names)


    } catch {

    }
  }
  useEffect(() => {
    downloadImage()
  }, [])

  useEffect(() => {
    console.log("imagesNames", imagesNames)
  }, [imagesNames])

  return (
    <View style={styles.main}>
      <SearchBar />
      <Text style={styles.categories}>Categories</Text>
      <ScrollView contentContainerStyle={{ gap: 20 }} style={styles.imagesHorizontallScroll} horizontal={true}>
        {imagesNames !== undefined && (
          imagesNames.map((name, i) => {
            return <ItemCard key={i} name={name}></ItemCard>
          })
        )
        }
      </ScrollView>
    </View >
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
    gap: 20
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
