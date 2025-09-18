import { Text, View } from "react-native";
import { Image } from "expo-image"
import { useEffect, useState } from "react";
import supabase from "@/app/supabaseClient";

export default function ItemCard({ name }: { name: string }) {
  const [source, setSource] = useState<string>()
  const getImageSource = async () => {
    const { data, error } = await supabase.storage.from("images/phones").download(name)
    if (error) {
      throw error;
    }
    const fr = new FileReader()
    fr.readAsDataURL(data)
    fr.onload = () => {
      //console.log("uri:", fr.result)
      setSource(fr.result as string)
    }

  }
  useEffect(() => {
    getImageSource()
  }, [])

  useEffect(() => {
    //console.log("image source:", source)
    console.log("image source changed")
  }, [source])

  return (
    <View style={{ position: "relative", height: "100%" }}>
      {source !== undefined &&
        <View>
          <Image style={{ borderRadius: 20, height: 400, width: 320 }} source={{ uri: source }}></Image>
          <Text style={{ fontSize: 14 }}>{name}</Text>
        </View>
      }
    </View>
  )
}
