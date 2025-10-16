import Banner from "@/components/Banner";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image"
import Ionicons from "@expo/vector-icons/Ionicons";

export interface itemInfo {
  name: string,
  category: string,
  description: string,
  imageURL: string,
  price: number,
  raiting: number,
  numberOfReviews: number,
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function ItemPage({ name, category, description, imageURL, raiting, price, numberOfReviews }: itemInfo) {
  return (
    <ScrollView style={styles.main}>
      <Image source={{ uri: imageURL }} contentFit="fill" cachePolicy={"memory-disk"} placeholder={{ blurhash }} ></Image>
      <View style={styles.namePriceDescriptionContainer}>
        <View style={styles.namePriceContainer}>
          <Text style={styles.bigText}>{name}</Text>
          <Text style={styles.bigText}>${price}</Text>
        </View>
        <Text style={styles.smallText}>{category}</Text>
      </View>
      <View style={styles.raitingContainer}>
        <Ionicons name="star" color={"yellow"} size={10}></Ionicons>
        <Text>{raiting}</Text>
        <Text style={styles.smallText}>{numberOfReviews}</Text>
      </View>
      <Text style={styles.bigText}>Description:</Text>
      <Text style={styles.smallText}>{description}</Text>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  main: {
    padding: 30,
    gap: 10,
  },
  bigText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  smallText: {
    fontSize: 12,
    color: "grey"
  },
  namePriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  namePriceDescriptionContainer: {
    flexDirection: "column",
    gap: 5
  },
  raitingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 15,
    borderWidth: 1,
  }
})
