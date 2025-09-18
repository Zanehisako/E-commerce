import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image"
import Phone from "@/types/phone";

import { LegendList } from "@legendapp/list"
import { useEffect, useState } from "react";
import supabase from "@/app/supabaseClient";

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function Banner() {
  const [images, setImages] = useState<string[]>([])

  async function downloadImages(images: string[]) {

  }

  async function getImages() {

    console.log('Downloading images',)

    const { data, error } = await supabase.storage.from('images').list("banners")

    if (error) { console.log("error:", error); throw error }

    console.log("banners data:", data)

    const names = data?.map((object) => {
      return object.name
    })

    const fr = new FileReader;
    console.log("names.length", names.length)
    names.forEach(async (name) => {
      const { data, error } = await supabase.storage.from('images').download(`banners/${name}`)
      if (error) {
        throw error
      }
      if (data) {
        fr.readAsDataURL(data)
        fr.onload = () => {
          setImages((prev) => [...prev, fr.result as string])
        }
      }
    })
  }

  useEffect(() => {
    getImages()
  }, [])
  useEffect(() => {
    console.log("banners length:", images.length)
  }, [images])
  return (
    <ScrollView style={{ height: 300, width: "100%" }}>
      {images.length > 0 && (
        <LegendList
          data={images}
          renderItem={({ item }) => <Image style={styles.image} source={{ uri: item }} contentFit="fill" cachePolicy={"memory-disk"} placeholder={{ blurhash }} />
          }
          keyExtractor={(_item, i) => `${i}`}
          horizontal={true}
          recycleItems
          contentContainerStyle={{ gap: 20 }}
        ></LegendList >
      )
      }
      {/* {images.length > 0 && images.map((image, i) => { */}
      {/*   return <Image id={`${image}${i}`} style={styles.image} source={{ uri: image }} contentFit="contain" cachePolicy={"memory-disk"} placeholder={{ blurhash }} /> */}
      {/* }) */}
      {/* } */}
    </ScrollView>
  )
}
const styles = StyleSheet.create((
  {
    itemCard: {
      position: "relative", height: "100%"
    },
    image: { borderRadius: 20, height: 300, width: 350 },
  }
))
