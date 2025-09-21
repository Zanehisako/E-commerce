import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import LottieView from 'lottie-react-native';

export default function WelcomeScreen() {
  return (
    <Animated.View>
      <LottieView style={styles.animation} source={require('../assets/animations/shopping cart.json')} autoPlay loop />
      <Animated.Text>Login/Sign-Up</Animated.Text>
    </Animated.View>
  )

}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    padding: 30,
    gap: 20,
  },
  animation: {
    alignSelf: "center",
    width: "100%",
    height: "70%"
  },
  text: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
    padding: 30,
    borderRadius: 20,
    backgroundColor: "blue",
  }
})
