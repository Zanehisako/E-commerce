import { Text, View } from "react-native";
import { Image } from "expo-image"
import Phone from "@/types/phone";

export default function ItemCard({ phone }: { phone: Phone }) {
  return (
    <View style={{ position: "relative", height: "100%" }}>
      <View>
        <Image style={{ borderRadius: 20, height: 400, width: 320 }} source={{ uri: phone.url }}></Image>
        <Text style={{ fontSize: 14 }}>{phone.name}</Text>
      </View>
    </View>
  )
}
