import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView, StyleSheet, Text, View } from "react-native";


function CategoryCard({ name, iconName }: { name: string, iconName: keyof typeof Ionicons.glyphMap }) {
  return (
    <View style={{ flexDirection: "column", gap: 10 }} >
      <Ionicons style={styles.icon} name={iconName} size={20}></Ionicons>
      <Text style={styles.iconText}>{name}</Text>
    </View>
  )
}


export default function CategoryCards() {
  return (
    <ScrollView contentContainerStyle={{ gap: 10 }} style={styles.main} horizontal={true}>
      <CategoryCard name="Phone" iconName="phone-portrait" ></CategoryCard>
      <CategoryCard name="Laptop" iconName="laptop" ></CategoryCard>
      <CategoryCard name="Console" iconName="game-controller" ></CategoryCard>
      <CategoryCard name="Headset" iconName="headset" ></CategoryCard>
      <CategoryCard name="Camera" iconName="camera" ></CategoryCard>
      <CategoryCard name="Tv" iconName="tv" ></CategoryCard>
      <CategoryCard name="Pc" iconName="desktop" ></CategoryCard>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: 80
  },
  icon: {
    borderRadius: 20,
    padding: 15,
    backgroundColor: "#EFF1F3"
  },
  iconText: {
    fontSize: 12,
    alignSelf: "center",
    fontWeight: "500"
  }
})
