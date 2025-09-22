import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import LottieView from 'lottie-react-native';

export default function WelcomeScreen() {
  return (
    <Animated.View style={styles.main}>
      <LottieView style={styles.animation} source={require('../../assets/animations/shopping cart.json')} autoPlay loop />
      <Animated.Text style={styles.extraText}>Experience a brand new way of shopping!Get started now</Animated.Text>
      <Animated.Text style={styles.continueText}>Continue</Animated.Text>
    </Animated.View>
  )

}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    padding: 30,
    gap: 20,
    backgroundColor: "white"
  },
  animation: {
    alignSelf: "center",
    width: "100%",
    height: "70%"
  },
  extraText: {
    alignSelf: "center",
    width: "110%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 30,
  },
  continueText: {
    marginTop: 30,
    alignSelf: "center",
    width: "50%",
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: "#2165EC",
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
  }
})
