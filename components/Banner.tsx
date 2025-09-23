import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image"
import Phone from "@/types/phone";

import { LegendList, LegendListRef } from "@legendapp/list"
import { useEffect, useRef, useState } from "react";
import supabase from "@/app/supabaseClient";
import Animated from "react-native-reanimated";

function useEffectAfterMount(effect: React.EffectCallback, deps?: React.DependencyList) {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      return effect();
    } else {
      hasMounted.current = true;
    }
  }, deps);
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const bannerWidth = 350

export default function Banner() {
  const [banners, setbanners] = useState<string[]>([])
  const legendListRef = useRef<LegendListRef>(null)
  const [scrollIndex, setScrollIndex] = useState<number>(0)
  const imagesLoaded = useRef<boolean>(false)


  function animateScroll() {
    if (banners.length > 0) {
      if (legendListRef.current) {
        // console.log("animating scroll")
        // console.log("scrollIndex:", scrollIndex)
        legendListRef.current.scrollToIndex({ index: scrollIndex, animated: true })
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

    //console.log("names.length", names.length)
    const getBanners = names.map(async (name) => {
      const { data, error } = await supabase.storage.from('images').download(`banners/${name}`)
      if (error) {
        throw error
      }
      return new Promise<string>((resolve) => {
        const fr = new FileReader;
        if (data) {
          fr.onload = () => {
            resolve(fr.result as string)
          }
          fr.readAsDataURL(data)
        }
      })
    })
    const results = await Promise.all(getBanners)
    setbanners(results)
    imagesLoaded.current = true
  }


  useEffect(() => {
    getBanners()
  }, [])

  // useEffect(() => {
  //   console.log("banners length:", banners.length)
  // }, [banners])

  useEffect(() => {
    //console.log("imagesLoaded")
    const interval = setInterval(() => {
      setScrollIndex(prev =>
        prev >= banners.length - 1 ? 0 : prev + 1
      )
    }, 5000) // Change every 3 seconds
    return () => clearInterval(interval) // Cleanup
  }, [imagesLoaded.current === true])

  useEffect(() => {
    if (imagesLoaded.current === true) {
      animateScroll()
    }
  }, [scrollIndex])



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
