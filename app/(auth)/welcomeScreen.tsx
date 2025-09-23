import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import LottieView from 'lottie-react-native';
import { useRouter } from "expo-router";
import AnimatedButton from "@/components/AnimatedButton";

export default function WelcomeScreen() {
  const router = useRouter()
  return (
    <Animated.View style={styles.main}>
      <LottieView style={styles.animation} source={require('../../assets/animations/shopping cart.json')} autoPlay loop />
      <Animated.Text style={styles.mainText}>Shopping reimagined</Animated.Text>
      <Animated.Text style={styles.extraText}>Experience a brand new way of shopping</Animated.Text>
      <AnimatedButton
        text="Get Started"
        textStyle={styles.getStartedText}
        onPress={() => router.push("/(auth)/loginPage")}
        style={styles.getStartedButton} />
      <Animated.Text
        onPress={() => router.push("/(auth)/signUpPage")}
        style={styles.signUpText}>I don't have an account</Animated.Text>
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
    backgroundColor: "white",
    gap: 15,
  },
  animation: {
    alignSelf: "center",
    width: "100%",
    height: "65%"
  },
  mainText: {
    alignSelf: "center",
    width: "100%",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  extraText: {
    alignSelf: "center",
    width: "70%",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "normal",
    color: "#7C7E80",
  },
  getStartedButton: {
    marginTop: 30,
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#2165EC",
  },
  getStartedText: {
    textAlign: "center",
    width: "100%",
    color: "white",
    fontWeight: "normal",
    fontSize: 18,
  },
  signUpText: {
    textAlign: "center",
    width: "100%",
    color: "#7C7E80",
    fontWeight: "normal",
    fontSize: 15,

  }
})
