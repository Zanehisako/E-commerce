import AnimatedButton from "@/components/AnimatedButton";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import Animated from "react-native-reanimated";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import InfoTextInput from "@/components/InfoInput";

export default function InfoPage() {
  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [address, setAddress] = useState<string>()
  const [validate, setValidate] = useState<boolean>(false)
  return (
    <Animated.View style={styles.main}>
      <Ionicons name="arrow-back"
        onPress={async () => {
          console.log('going back')
          router.back()
        }}
        size={20}
        style={styles.backIcon} />
      <InfoTextInput validate={validate} placeholder="Enter your first name:" value={firstName} setValue={setFirstName} keyboardType="default" ></InfoTextInput>
      <InfoTextInput validate={validate} placeholder="Enter your last name:" value={lastName} setValue={setLastName} keyboardType="phone-pad" ></InfoTextInput>
      <InfoTextInput validate={validate} placeholder="Enter your address:" value={address} setValue={setAddress} ></InfoTextInput>
      <AnimatedButton
        text="Continue"
        style={styles.loginButton}
        onPress={async () => {
          setValidate(true)
          if (firstName || lastName || address) {
            router.push({
              pathname: "/(auth)/signUpPage",
              params: { firstName: firstName, lastName: lastName, address: address }
            })
          }
        }} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    position: "relative",
    flex: 1,
    flexDirection: "column",
    padding: 30,
    gap: 20,
    backgroundColor: "white",
    justifyContent: "center"
  },
  backIcon: {
    position: "absolute",
    top: "5%",
    left: "10%",
  },
  textInput: {
    width: "100%",
    height: 50,
    fontWeight: "normal",
    fontSize: 12,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#EFF1F3"
  },
  loginButton: {
    alignSelf: "center",
    backgroundColor: "#2165EC",
  }
})
