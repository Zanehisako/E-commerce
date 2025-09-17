import { StyleSheet, TextInput, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";

export default function SearchBar() {
  const [seachText, setSearchText] = useState<string>("")
  return (
    <View style={styles.SearchBar}>
      <Ionicons style={styles.SearchIcon} name="search" size={24}></Ionicons>
      <TextInput style={styles.SearchTextInput} onChangeText={setSearchText} placeholder="search..." value={seachText}></TextInput>
    </View>
  );
}
const styles = StyleSheet.create({
  SearchBar: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 20,
  },
  SearchTextInput: {
    width: "100%",
    height: "100%",
    color: "#111111",
    alignSelf: "center"
  },
  SearchIcon: {
    alignSelf: "center"
  }
})
