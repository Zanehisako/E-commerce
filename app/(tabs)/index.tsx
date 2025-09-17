import SearchBar from '@/components/SearchBar';
import { StyleSheet, View } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={styles.main}>
      <SearchBar />
    </View>
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
