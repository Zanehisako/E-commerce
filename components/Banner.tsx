import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image"
import Phone from "@/types/phone";

import { LegendList, LegendListRef } from "@legendapp/list"
import { useEffect, useRef, useState } from "react";
import supabase from "@/app/supabaseClient";
import Animated from "react-native-reanimated";

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const bannerWidth = 350

export default function Banner() {
  const [banners, setbanners] = useState<string[]>([])
  const legendListRef = useRef<LegendListRef>(null)
  const scrollIndex = useRef<number>(0)


  function animateScroll() {
    if (banners.length > 0) {
      if (legendListRef.current) {
        console.log("animating scroll")
        console.log("scrollIndex:", scrollIndex.current)
        legendListRef.current.scrollToIndex({ index: scrollIndex.current, animated: true })

        setTimeout(() => {
        }, 5000);

        if (scrollIndex.current > banners.length) {
          scrollIndex.current = 0
        } else {
          scrollIndex.current += 1;
        }
      }
    }
  }

  async function getBanners() {

    //console.log('Downloading banners',)

    const { data, error } = await supabase.storage.from('images').list("banners")

    if (error) { console.log("error:", error); throw error }

    //console.log("banners data:", data)

    const names = data?.map((object) => {
      return object.name
    })

    const fr = new FileReader;
    //console.log("names.length", names.length)
    names.forEach(async (name) => {
      const { data, error } = await supabase.storage.from('images').download(`banners/${name}`)
      if (error) {
        throw error
      }
      if (data) {
        fr.readAsDataURL(data)
        fr.onload = () => {
          setbanners((prev) => [...prev, fr.result as string])
        }
      }
    })
  }

  useEffect(() => {
    getBanners()
  }, [])

  useEffect(() => {
    console.log("banners length:", banners.length)
    animateScroll()
  }, [banners])

  useEffect(() => {
    console.log("scroll index changed")
    animateScroll()
  }, [scrollIndex.current])

  return (
    <View style={{ height: 300, width: "100%" }}>
      {banners.length > 0 && (
        <LegendList
          ref={legendListRef}
          data={banners}
          renderItem={({ item }) => <Image style={styles.image} source={{ uri: item }} contentFit="fill" cachePolicy={"memory-disk"} placeholder={{ blurhash }} />
          }
          keyExtractor={(_item, i) => `${i}`}
          horizontal={true}
          recycleItems
          contentContainerStyle={{ gap: 20 }}
        ></LegendList >
      )
      }
      {/* {banners.length > 0 && banners.map((image, i) => { */}
      {/*   return <Image id={`${image}${i}`} style={styles.image} source={{ uri: image }} contentFit="contain" cachePolicy={"memory-disk"} placeholder={{ blurhash }} /> */}
      {/* }) */}
      {/* } */}
    </View>
  )
}
const styles = StyleSheet.create((
  {
    itemCard: {
      position: "relative", height: "100%"
    },
    image: { borderRadius: 20, height: 300, width: bannerWidth },
  }
))
