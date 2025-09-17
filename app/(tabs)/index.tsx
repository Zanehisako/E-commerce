import SearchBar from '@/components/SearchBar';
import { StyleSheet, Text, View } from 'react-native';
import { LegendList } from "@legendapp/list";
import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import supabase from '../supabaseClient';

export default function HomeScreen() {
  const [imagesUrl, setImagesUrl] = useState<string[]>()
  async function downloadImage() {
    try {
      console.log('Downloading images',)
      const { data, error } = await supabase.storage.from('images').list("")
      if (error) { console.log("error:", error); throw error }
      const fr = new FileReader();
      //fr.readAsDataURL(data)
      console.log("data:", data)
      //fr.onload = () => { setImagesUrl(fr.result as string) }
    } catch {

    }
  }
  useEffect(() => {
    downloadImage()
  }, [])

  return (
    <View style={styles.main}>
      <SearchBar />
      <Text>Categories</Text>
      <View>
        <LegendList
          data={imagesUrl!}
          renderItem={({ item }) => <Image source={item}></Image>}
          keyExtractor={(item) => item}
          recycleItems
        ></LegendList>
      </View>
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
    padding: 30
  }
});
